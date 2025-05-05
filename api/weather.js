export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = process.env.WEATHER_KEY;  // Fetch the API key from environment variables

  try {
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // Fetch weather data from OpenWeatherMap API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    // Check if the city is found
    if (data.cod !== 200) {
      return res.status(data.cod).json({ error: data.message });
    }

    // Return the weather data
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
