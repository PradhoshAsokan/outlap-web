export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ endpoint: string }> }
) {
  const OPENF1_MAP: Record<string, string> = {
    'telemetry': 'intervals',
    'car_data': 'car_data',
    'positions': 'position',
    'session_results': 'session_result',
    'race-control': 'race_control',
    'weather': 'weather',
    'stints': 'stints',
    'radio': 'team_radio',
    'pits': 'pit',
    'sessions': 'sessions'
  };

  const { endpoint } = await params;
  const openf1Endpoint = OPENF1_MAP[endpoint];

  if (!openf1Endpoint) {
    return new Response(JSON.stringify({ status: "Error", message: "Invalid endpoint" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const response = await fetch(`https://api.openf1.org/v1/${openf1Endpoint}?session_key=latest`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ status: "Error", message: `OpenF1 returned ${response.status}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
    
    let data = await response.json();

    if (endpoint === 'car_data' && Array.isArray(data)) {
      data = data.slice(-50);
    }

    return new Response(JSON.stringify({ source: "Outlap API (Internal)", status: "Success", data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ status: "Error", message: error.message || `Failed to fetch ${endpoint}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  });
}
