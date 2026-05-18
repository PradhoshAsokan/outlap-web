import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const response = await fetch("https://api.jolpi.ca/ergast/f1/2026/constructorStandings.json", {
      next: { revalidate: 3600 }
    });
    const data = await response.json();
    return NextResponse.json({ source: "Jolpica API (Internal)", status: "Success", data });
  } catch (error) {
    return NextResponse.json({ status: "Error", message: "Failed to fetch constructors" }, { status: 500 });
  }
}
