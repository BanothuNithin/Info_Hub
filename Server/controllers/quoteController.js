const QUOTES = [
  "Push yourself, because no one else is going to do it for you.",
  "The best time to start was yesterday. The next best time is now.",
  "Don’t stop until you’re proud.",
  "Hard work beats talent when talent doesn’t work hard.",
  "The future depends on what you do today.",
];

export const getQuote = (req, res, next) => {
  try {
    const idx = Math.floor(Math.random() * QUOTES.length);
    res.json({ quote: QUOTES[idx] });
  } catch (err) {
    next(err);
  }
};
