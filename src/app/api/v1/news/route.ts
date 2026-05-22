import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    console.log("Diagnostic: News fetch starting");
    const rssResponse = await fetch("https://www.autosport.com/rss/f1/news", {
      headers: {
        'User-Agent': 'Outlap/1.0 (Next.js Edge Runtime)'
      }
    });
    
    if (!rssResponse.ok) {
      return NextResponse.json({ 
        status: "Error", 
        message: `Fetch failed: ${rssResponse.status}`,
        debug: "Fetch was not OK"
      }, { status: 500 });
    }

    const xmlText = await rssResponse.text();
    console.log("Diagnostic: XML received, length:", xmlText.length);

    // Simple return for testing connectivity first
    return NextResponse.json({ 
      status: "Success", 
      message: "Connectivity test successful",
      xmlLength: xmlText.length,
      preview: xmlText.substring(0, 100)
    });

  } catch (error: any) {
    console.error("Diagnostic: Crash detected:", error);
    return new Response(JSON.stringify({
      status: "Error",
      message: "CATCH_BLOCK_TRIGGERED",
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
      hint: "Check if fetch or processing failed"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
