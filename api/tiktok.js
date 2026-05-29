export default async function handler(req, res) {
  // CORS configuration if needed (though usually same-origin for Vercel)
  res.setHeader('Access-Control-Allow-Origin', '*');

  const secUid = 'MS4wLjABAAAAqB08cUbXaDWqbD6MCga2RbGTuhfO2EsHayBYx08NDrN7IE3jQuRDNNN6YwyfH6_6';
  const url = `https://tiktok-api23.p.rapidapi.com/api/user/posts?secUid=${secUid}&count=6&cursor=0`;
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || '1b7e081da1msh2637ee32f1c4bbcp178934jsna99aa242a548'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data && data.data && data.data.itemList) {
        // Map down to only what the frontend needs
        const videos = data.data.itemList.map(item => ({
            id: item.id,
            desc: item.desc || "Video de Inmigración",
            cover: item.video?.originCover || item.video?.cover || "",
            duration: item.video?.duration || 0,
        }));
        return res.status(200).json({ success: true, videos });
    } else {
        // Fallback to static videos if API limit reached or format changed
        console.warn("API returned invalid data format. Using fallbacks.");
        return res.status(200).json({ success: true, videos: getFallbackVideos() });
    }
  } catch (error) {
    console.error("TikTok API Error:", error);
    // Serve fallbacks instead of crashing the frontend
    return res.status(200).json({ success: true, videos: getFallbackVideos() });
  }
}

function getFallbackVideos() {
  return [
    {
      id: "7645071694134119693",
      desc: "Defensa de Deportación en 1 Minuto",
      cover: ""
    },
    {
      id: "7644627078997970207",
      desc: "¿Cómo solicitar Asilo Político?",
      cover: ""
    },
    {
      id: "7644242137311137037",
      desc: "Reunificación Familiar en Texas",
      cover: ""
    }
  ];
}
