import React, { useState } from "react";
import Weather from "./components/Weather";
import Converter from "./components/Converter";
import Quotes from "./components/Quotes";
import "./styles.css";

export default function App() {
  const [tab, setTab] = useState("weather");

  return (
    <div className="app">
      <header>
        <h1>InfoHub</h1>
        <p className="subtitle">
          <span>Weather</span>
          <span>·</span>
          <span>Currency</span>
          <span>·</span>
          <span>Quotes</span>
        </p>
      </header>

      <nav className="tabs" role="tablist" aria-label="InfoHub navigation">
        
        <button
          role="tab"
          aria-selected={tab === "converter"}
          onClick={() => setTab("converter")}
          className={tab === "converter" ? "active" : ""}
        >
          Converter
        </button>
        <button
          role="tab"
          aria-selected={tab === "weather"}
          onClick={() => setTab("weather")}
          className={tab === "weather" ? "active" : ""}
        >
          Weather
        </button>
        <button
          role="tab"
          aria-selected={tab === "quotes"}
          onClick={() => setTab("quotes")}
          className={tab === "quotes" ? "active" : ""}
        >
          Quotes
        </button>
      </nav>

      <main>
        {tab === "weather" && <Weather />}
        {tab === "converter" && <Converter />}
        {tab === "quotes" && <Quotes />}
      </main>

      <footer>
        <small>· InfoHub — Nithin</small>
      </footer>
    </div>
  );
}
