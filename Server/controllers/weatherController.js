import fetch from "node-fetch";

export const getWeather = async (req, res, next) => {
  try {
    const city = (req.query.city || "").trim();
    if (!city) {
      res.status(400);
      throw new Error("City parameter required");
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (apiKey) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`;
      const r = await fetch(url);
      if (!r.ok) {
        res.status(r.status);
        throw new Error("OpenWeather API Error");
      }
      const data = await r.json();
      return res.json({ source: "openweathermap", data });
    }

    // Mock fallback
    res.json({
      source: "mock",
      data: {
        name: city,
        main: { temp: 27.3, humidity: 55 },
        weather: [{ main: "Clear", description: "Sunny sky" }],
      },
    });
  } catch (err) {
    next(err);
  }
};
