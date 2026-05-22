
export async function GET() {
  try {
    const response = await fetch("https://api.jolpi.ca/ergast/f1/2026/driverStandings.json", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      return new Response(JSON.stringify({ 
        status: "Error", 
        message: `Jolpica returned ${response.status}` 
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ 
      source: "Jolpica API (Stability Patch)", 
      status: "Success", 
      data 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ 
      status: "Error", 
      message: error.message || "Failed to fetch standings" 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
