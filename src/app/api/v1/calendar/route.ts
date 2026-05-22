import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const response = await fetch("https://api.jolpi.ca/ergast/f1/2026.json", {
      headers: {
        'User-Agent': 'Outlap/1.0 (Next.js Edge Runtime)'
      }
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { status: "Error", message: `Jolpica returned ${response.status} for calendar` },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json({ source: "Jolpica API (Internal)", status: "Success", data });
  } catch (error: any) {
    return NextResponse.json({ status: "Error", message: error.message || "Failed to fetch calendar" }, { status: 500 });
  }
}
