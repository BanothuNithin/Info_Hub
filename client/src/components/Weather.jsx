// src/components/Weather.jsx
import React, { useState, useEffect } from "react";
import "../styles.css"; // keep if you use a global stylesheet
import "./Weather.css"; // new CSS for the weather component
import cloudImg from "../assets/cloud.png";

export default function Weather() {
  const [city, setCity] = useState("Hyderabad");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Optionally fetch initial city on mount
  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, []);

  const fetchWeather = async () => {
    if (!city || city.trim() === "") {
      setError("Please enter a city");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(
        `/api/weather?city=${encodeURIComponent(city.trim())}`
      );
      if (!res.ok) {
        // try to parse JSON error body
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.error || `Failed (${res.status})`);
      }
      const json = await res.json();
      // the modular backend returns { source: ..., data: {...} } for real provider
      const payload = json.data || json;
      setData(payload);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card weather-card">
      <h2>Weather</h2>

      <div className="row controls">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City (e.g., Hyderabad)"
        />
        <button onClick={fetchWeather}>Get</button>
      </div>

      <div className="weather-visual">
        {/* Animated clouds — multiple for depth */}
        <div className="clouds">
          <img src={cloudImg} alt="cloud" className="cloud c1" />
          <img src={cloudImg} alt="cloud" className="cloud c2" />
          <img src={cloudImg} alt="cloud" className="cloud c3" />
        </div>

        {/* Weather summary overlay */}
        <div className="weather-overlay">
          {loading && <p className="muted">Loading…</p>}
          {error && <p className="error">{error}</p>}
          {data ? (
            <div className="result">
              <h3>{data.name ?? data.city ?? "—"}</h3>
              <p className="big-temp"> {data.main?.temp ?? "—"} °C</p>
              <p>Humidity: {data.main?.humidity ?? "—"}%</p>
              <p className="muted">{data.weather?.[0]?.description ?? "—"}</p>
            </div>
          ) : (
            !loading && <p className="muted">Click Get to fetch weather</p>
          )}
        </div>
      </div>
    </div>
  );
}
