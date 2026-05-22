export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify({ 
    status: "Success", 
    message: "Minimal Outlap API is reachable",
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
