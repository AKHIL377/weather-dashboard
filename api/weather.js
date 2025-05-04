export default async function handler(req, res) {
    const { city } = req.query;
    const apiKey = process.env.WEATHER_KEY;
  
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  