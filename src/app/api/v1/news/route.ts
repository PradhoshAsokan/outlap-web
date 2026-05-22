import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // Remove 'next: { revalidate }' to test if it's causing the crash
    const rssResponse = await fetch("https://www.autosport.com/rss/f1/news", {
      headers: {
        'User-Agent': 'Outlap/1.0 (Next.js Edge Runtime)'
      }
    });
    
    if (!rssResponse.ok) {
      return NextResponse.json(
        { status: "Error", message: `External RSS source returned ${rssResponse.status}` },
        { status: rssResponse.status }
      );
    }

    const xmlText = await rssResponse.text();
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemContent = match[1];
      const title = itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] || 
                    itemContent.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const link = itemContent.match(/<link>([\s\S]*?)<\/link>/)?.[1];
      const pubDate = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1];
      const imageUrl = itemContent.match(/<enclosure url="([\s\S]*?)"/)?.[1];
      const isF1 = title?.match(/F1|Formula 1|Verstappen|Hamilton|Leclerc|Norris|Grand Prix|GP/i);
      
      if (title && link && isF1) {
        items.push({
          title: title.trim(),
          link: link.trim(),
          date: pubDate ? new Date(pubDate).toLocaleDateString() : 'Recent',
          image: imageUrl || null
        });
      }
    }

    return NextResponse.json({ 
      source: "Autosport F1 RSS (Internal - No Cache)", 
      status: "Success", 
      data: items.slice(0, 12) 
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "Error", message: error.message || "Failed to fetch news" },
      { status: 500 }
    );
  }
}
