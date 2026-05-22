// Testing without 'edge' runtime to see if OpenNext handles Node.js runtime better
export async function GET() {
  return new Response(JSON.stringify({ 
    status: "Success", 
    message: "Minimal Outlap API is reachable (Node.js Runtime Test)",
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
