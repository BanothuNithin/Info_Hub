// src/components/Converter.jsx
import React, { useState } from "react";
import coinImg from "../assets/coin.png"; // put coin.png here
import "./Converter.css";

export default function Converter() {
  const [amount, setAmount] = useState(100);
  const [to, setTo] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const convert = async () => {
    setError(null);
    setResult(null);

    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const url = `/api/convert?from=INR&to=${encodeURIComponent(
        to
      )}&amount=${encodeURIComponent(amount)}`;
      console.log("Fetching:", url);

      const res = await fetch(url);
      const text = await res.text(); // read raw body
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }

      console.log("Response status:", res.status, "body:", body);

      if (!res.ok) {
        // try to show a helpful error
        const serverMsg =
          (body && body.error) ||
          (body && body.message) ||
          JSON.stringify(body);
        throw new Error(serverMsg || `Server ${res.status}`);
      }

      // normalize shape: backend returns { source, data } OR direct data
      const payload = (body && (body.data ?? body)) ?? body;

      // If exchangerate.host style (payload.result) keep it, else try to map
      setResult(payload);
    } catch (err) {
      console.error("Convert error:", err);
      setError(err.message || "Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="converter-card">
      <h2 className="converter-title">💱 Currency Converter</h2>

      <div className="converter-top">
        <div className="coin-wrap" aria-hidden>
          <img
            src={coinImg}
            alt="coin"
            className={`coin ${loading ? "spin" : ""}`}
          />
        </div>

        <div className="converter-info">
          <div className="controls-row">
            <input
              type="number"
              className="amount-input"
              value={amount}
              min="0"
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="to-select"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <button
              className="convert-btn"
              onClick={convert}
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? "Converting…" : "Convert"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}
        </div>
      </div>

      {result && (
        <div className="convert-result">
          <p className="rate">
            Rate:{" "}
            {result.info?.rate
              ? Number(result.info.rate).toFixed(4)
              : result.result
              ? (result.result / Number(amount)).toFixed(4)
              : "—"}
          </p>

          <p className="converted">Converted: {result.result ?? "—"}</p>
          <small className="muted">
            Source: {result?.source ?? "exchange provider"}
          </small>
        </div>
      )}
    </div>
  );
}
