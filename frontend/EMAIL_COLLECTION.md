# Email Collection Implementation Strategy

In order to store email collections (e.g. from your landing page `frontend/app/page.tsx` and custom forms), you need a backend endpoint that will reliably collect form submissions without dropping them.

## 1. Setting up a Next.js Server Action / API Route
You need an API route like `frontend/app/api/subscribe/route.ts` that will intercept the user's string input from `e.target.value`.

```tsx
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // If using Vercel Postgres

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid Email", status: 400 });
    }
    
    // Using a SQL Query internally (must be deployed securely)
    await sql`INSERT INTO early_access (email, created_at) VALUES (${email}, NOW())`;
    
    // Alternatively, you could use Resend/SendGrid to immediately email yourself a notification
    
    return NextResponse.json({ success: true, message: "Stored effectively" }, { status: 200 });
    
  } catch (error) {
     return NextResponse.json({ error: "Server Error", status: 500 });
  }
}
```

## 2. Using Resend (Recommended over Databases for Landing Pages)
Often times for a waitlist landing page, instead of provisioning a full PostgreSQL relational database merely to hold an array of strings natively at first, you can utilize the `resend.com` library to directly push those emails directly to the Hackshare founding team instantly.

```bash
npm i resend
```

```tsx
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();
  try {
    const data = await resend.emails.send({
      from: 'HackShare Waitlist <onboarding@resend.dev>',
      to: ['your_actual_email@kostly.dev'],
      subject: 'New Hackshare Page Registration!',
      html: `<strong>You have a new waitlist lead:</strong> ${email}`,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
```

## 3. Hooking the API to the Frontend

Inside your client component `frontend/app/page.tsx`, hook up your synthetic React payload `setSubmitted()`:

```tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        
        if (response.ok) {
           setSubmitted(true);
        } else {
           console.error("Failed to store email");
        }
      } catch (err) {
        console.error("Network Error", err);
      }
    }
  };
```

### Alternatives
If you'd like a totally unmanaged "No-Code" backend for this exact task:
1. **Typeform / Tally**: Embed a basic Typeform directly into the component.
2. **Mailchimp / Loops**: Both give you an endpoint URL `POST https://api.loops.so/...` directly out of the box that handles the collection arrays.