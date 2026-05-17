import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rssResponse = await fetch("https://www.autosport.com/rss/f1/news", {
      next: { revalidate: 600 } // Cache for 10 minutes
    });
    
    if (!rssResponse.ok) {
      throw new Error(`Failed to fetch RSS feed: ${rssResponse.statusText}`);
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
      source: "Autosport F1 RSS (Internal)", 
      status: "Success", 
      data: items.slice(0, 12) 
    });
  } catch (error) {
    console.error("News API Error:", error);
    return NextResponse.json(
      { status: "Error", message: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
