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

export async function GET(
  request: Request,
  { params }: { params: { endpoint: string } }
) {
  const endpoint = params.endpoint;
  const openf1Endpoint = OPENF1_MAP[endpoint];

  if (!openf1Endpoint) {
    return NextResponse.json({ status: "Error", message: "Invalid endpoint" }, { status: 404 });
  }

  try {
    const response = await fetch(`https://api.openf1.org/v1/${openf1Endpoint}?session_key=latest`, {
      next: { revalidate: 2 } // Very short cache for "live" data
    });
    let data = await response.json();

    if (endpoint === 'car_data' && Array.isArray(data)) {
      data = data.slice(-50);
    }

    return NextResponse.json({ source: "OpenF1 API (Internal)", status: "Success", data });
  } catch (error) {
    return NextResponse.json({ status: "Error", message: `Failed to fetch ${endpoint}` }, { status: 500 });
  }
}
