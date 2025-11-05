// src/components/Quotes.jsx
import React, { useState } from "react";
import "./Quotes.css";
import bgImg from "../assets/quoto.png";
import { BASE_URL } from "../api";

export default function Quotes() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getQuote = async () => {
    setLoading(true);
    setError(null);
    setQuote(null);

    try {
      const url = `${BASE_URL}/api/quote`;
      const res = await fetch(url);
      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.error || `Failed (${res.status})`);
      }
      const json = await res.json();
      setQuote(json.quote ?? json);
    } catch (err) {
      setError(err.message || "Could not fetch quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quotes-card">
      <div
        className="quotes-bg"
        style={{ backgroundImage: `url(${bgImg})` }}
        aria-hidden
      />
      <div className="quotes-content">
        <h2 className="quotes-title">Motivational Quote</h2>

        <div className="controls">
          <button
            className="quotes-btn"
            onClick={getQuote}
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? "Loading…" : "New Quote"}
          </button>
        </div>

        <div className="quotes-box">
          {loading && <p className="muted">Fetching inspiration…</p>}
          {error && <p className="error">{error}</p>}
          {quote ? (
            <blockquote className="quote animate-quote">{quote}</blockquote>
          ) : (
            !loading && (
              <p className="muted">
                Click “New Quote” to get a short motivational line.
              </p>
            )
          )}
        </div>

        <footer className="quotes-footer muted">
          Keep going — small steps every day.
        </footer>
      </div>
    </div>
  );
}
