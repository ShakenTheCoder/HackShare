# Visitors Tracking implementation Strategy

To successfully implement a dynamic tracking feature that incrementally updates visitors for each page load in real time, you will need a centralized database solution, typically coupled with an API route or real-time pub-sub infrastructure depending on how "real-time" the numbers must be.

Here is the most robust and standard way to implement a global incrementing visitors counter in a Next.js (App Router) environment interacting with Vercel KV (Redis):

## 1. Setup Vercel KV (Redis cache)
Because Vercel serverless functions are ephemeral, storing a simple counter in memory (`let views = 0`) won't work — it will reset endlessly. You need a fast, low-latency datastore.

1. Go to your Vercel Dashboard -> Storage -> **Create Database** -> **Vercel KV**.
2. Link the database to your `.env` variables in your local environment and your Vercel project respectively:
```sh
npm i @vercel/kv
```

## 2. Setting Up The API increment Route
Create an API route at `frontend/app/api/visitors/route.ts`:

```tsx
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Vercel KV gracefully handles the increment
    // It creates the 'page_views' key automatically if it does not exist
    const views = await kv.incr('page_views');
    
    // Add baseline (e.g. + 34) if you want it to look like baseline traffic. 
    return NextResponse.json({ count: views + 34 }); 
  } catch (error) {
    return NextResponse.json({ count: 35 }, { status: 500 });
  }
}

export async function GET() {
  try {
     const views = await kv.get('page_views');
     return NextResponse.json({ count: Number(views || 0) + 35 });
  } catch (error) {
     return NextResponse.json({ count: 35 }, { status: 500 });
  }
}
```

## 3. Hooking the frontend React component
Inside your `app/page.tsx`, `app/about/page.tsx`, and `app/kostly-campaign/page.tsx`, update the `useEffect()` handling your `visitors` state:

```tsx
  const [visitors, setVisitors] = useState(35);

  useEffect(() => {
    // We send a POST request to forcefully increment the number when the user hits the page
    fetch('/api/visitors', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
         if (data.count) setVisitors(data.count);
      });
  }, []);
```

### Note on "Real-Time" WebSockets
If you want the number to actively animate or jump up *while the user is currently staring at the screen* without reloading the page, you would need to use a Pub/Sub WebSocket service like **Pusher**, **Ably**, or **Supabase Realtime**.

In a WebSocket application:
1. `useEffect()` subscribes to a channel (e.g., `visitors-channel`).
2. Whenever someone accesses the site, the server emits a broadcast event.
3. The component receives an `on('update')` event and sets `setVisitors(newCount)`.