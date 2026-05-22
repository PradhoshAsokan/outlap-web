export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch drivers and constructors for the current season
    const [driversRes, constructorsRes] = await Promise.all([
      fetch("https://api.jolpi.ca/ergast/f1/2026/drivers.json"),
      fetch("https://api.jolpi.ca/ergast/f1/2026/constructors.json")
    ]);

    const driversData = await driversRes.json();
    const constructorsData = await constructorsRes.json();

    return new Response(JSON.stringify({ 
      status: "Success", 
      data: {
        drivers: driversData.MRData.DriverTable.Drivers,
        constructors: constructorsData.MRData.ConstructorTable.Constructors
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ status: "Error", message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
