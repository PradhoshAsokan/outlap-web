export async function GET() {
  try {
    const rssResponse = await fetch("https://www.autosport.com/rss/f1/news", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!rssResponse.ok) {
      return new Response(JSON.stringify({ 
        status: "Error", 
        message: `External fetch failed: ${rssResponse.status}` 
      }), {
        status: rssResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
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

    return new Response(JSON.stringify({ 
      source: "Outlap API (Internal)", 
      status: "Success", 
      data: items.slice(0, 12) 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ 
      status: "Error", 
      message: error.message || "Internal Server Error" 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
