export async function GET() {
  const result: any = {
    step: "INIT",
    error: null
  };

  try {
    result.step = "FETCH_START";
    const rssResponse = await fetch("https://www.autosport.com/rss/f1/news", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/xml, text/xml, */*'
      }
    });
    
    result.step = "FETCH_COMPLETE";
    result.status = rssResponse.status;
    result.ok = rssResponse.ok;

    if (!rssResponse.ok) {
      return new Response(JSON.stringify({ 
        status: "Error", 
        message: `External fetch returned ${rssResponse.status}`,
        debug: result 
      }), {
        status: 200, // Return 200 so we can see the JSON debug info
        headers: { 'Content-Type': 'application/json' }
      });
    }

    result.step = "READING_TEXT";
    const xmlText = await rssResponse.text();
    
    return new Response(JSON.stringify({ 
      status: "Success", 
      message: "Connectivity test successful",
      xmlLength: xmlText.length,
      debug: result
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ 
      status: "Error", 
      step: result.step,
      message: error.message || "Unknown error",
      stack: error.stack,
      type: error.constructor.name
    }), {
      status: 200, // Return 200 to bypass Cloudflare 500 page
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
