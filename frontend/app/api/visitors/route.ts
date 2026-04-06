import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  // Try to parse an optional pageId from the requested JSON body (defaulting to 1 for the main site)
  let pageId = 1;
  try {
    const text = await req.text();
    if (text) {
      const body = JSON.parse(text);
      pageId = body.pageId || 1;
    }
  } catch (e) {
    // defaults to 1 if no body or fail to parse
  }

  const { data, error } = await supabase.rpc('increment_visitor_count', { row_id: pageId });

  if (error) {
    console.error('Error incrementing visitor:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count: data });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageId = parseInt(searchParams.get('pageId') || '1', 10);

  const { data, error } = await supabase
    .from('site_stats')
    .select('visitors')
    .eq('id', pageId)
    .single();

  if (error) {
    console.error('Error getting visitors:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count: data.visitors });
}
