# Supabase Setup Instructions

You need to run these SQL commands in your Supabase project's SQL Editor to set up the proper tables for your Waitlist and Visitors features.

## 1. Create the `waitlist` table

```sql
CREATE TABLE IF NOT EXISTS public.waitlist (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## 2. Create the `site_stats` table for tracking overall visitors

```sql
CREATE TABLE IF NOT EXISTS public.site_stats (
    id SERIAL PRIMARY KEY,
    visitors INT DEFAULT 0 NOT NULL
);

-- Insert both root page (id=1) and campaign page (id=2) counters to start tracking
INSERT INTO public.site_stats (id, visitors)
VALUES 
  (1, 35),
  (2, 35)
ON CONFLICT DO NOTHING;
```

## 3. Create the increment RPC function

This allows our API route to atomically increment the counter without race conditions!

```sql
CREATE OR REPLACE FUNCTION increment_visitor_count(row_id int)
RETURNS int
LANGUAGE sql
AS $$
  UPDATE public.site_stats
  SET visitors = visitors + 1
  WHERE id = row_id
  RETURNING visitors;
$$;
```

Once run, your endpoints at `/api/waitlist` and `/api/visitors` will work with real database persistence!
