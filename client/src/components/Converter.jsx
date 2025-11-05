// src/components/Converter.jsx
import React, { useState } from "react";
import coinImg from "../assets/coin.png";
import "./Converter.css";
import { buildUrl } from "../api";

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
      // build endpoint using helper (handles local proxy vs remote BASE_URL)
      const url = `${buildUrl(`/convert`)}?from=INR&to=${encodeURIComponent(
        to
      )}&amount=${encodeURIComponent(amount)}`;

      const res = await fetch(url);
      const text = await res.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }

      if (!res.ok) {
        const serverMsg =
          (body && body.error) ||
          (body && body.message) ||
          JSON.stringify(body) ||
          `Server ${res.status}`;
        throw new Error(serverMsg);
      }

      const payload = (body && (body.data ?? body)) ?? body;
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
