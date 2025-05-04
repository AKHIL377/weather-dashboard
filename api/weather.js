export default async function handler(req, res) {
    const { city } = req.query;
    const apiKey = process.env.WEATHER_KEY;
  
    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }
  
    if (!apiKey) {
      return res.status(500).json({ error: "API key not found in environment variables" });
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        return res.status(200).json(data);
      } else {
        return res.status(response.status).json({ error: data.message });
      }
    } catch (err) {
      return res.status(500).json({ error: "Server error", message: err.message });
    }
  }
  