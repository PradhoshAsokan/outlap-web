import { NextResponse } from 'next/server';

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

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ endpoint: string }> }
) {
  const { endpoint } = await params;
  const openf1Endpoint = OPENF1_MAP[endpoint];

  if (!openf1Endpoint) {
    return NextResponse.json({ status: "Error", message: "Invalid endpoint" }, { status: 404 });
  }

  try {
    const response = await fetch(`https://api.openf1.org/v1/${openf1Endpoint}?session_key=latest`, {
      headers: {
        'User-Agent': 'Outlap/1.0 (Next.js Edge Runtime)'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: "Error", message: `OpenF1 returned ${response.status} for ${endpoint}` },
        { status: response.status }
      );
    }
    
    let data = await response.json();

    if (endpoint === 'car_data' && Array.isArray(data)) {
      data = data.slice(-50);
    }

    return NextResponse.json({ source: "OpenF1 API (Internal)", status: "Success", data });
  } catch (error: any) {
    return NextResponse.json({ status: "Error", message: error.message || `Failed to fetch ${endpoint}` }, { status: 500 });
  }
}
