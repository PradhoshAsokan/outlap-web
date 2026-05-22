import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({ 
    status: "Success", 
    message: "Outlap API is reachable",
    timestamp: new Date().toISOString(),
    runtime: "Edge"
  });
}
