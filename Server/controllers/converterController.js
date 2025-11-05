import fetch from "node-fetch";

export const convertCurrency = async (req, res, next) => {
  try {
    const from = (req.query.from || "INR").toUpperCase();
    const to = (req.query.to || "USD").toUpperCase();
    const amount = parseFloat(req.query.amount) || 1;

    if (!from || !to) {
      res.status(400);
      throw new Error("from and to parameters required");
    }

    // Mock conversion rates
    const rates = {
      USD: 0.012, // 1 INR = 0.012 USD
      EUR: 0.011, // 1 INR = 0.011 EUR
    };

    const rate = rates[to];
    if (!rate) {
      res.status(400);
      throw new Error("Unsupported currency");
    }

    const result = amount * rate;

    return res.json({
      result: parseFloat(result.toFixed(2)),
      info: {
        rate: rate,
        timestamp: Date.now(),
      },
      source: "mock data",
    });
  } catch (err) {
    next(err);
  }
};
