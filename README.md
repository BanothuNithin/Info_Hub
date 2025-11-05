# InfoHub — ByteXL Coding Challenge

>A small full-stack single-page app that brings together three utilities: Weather info, Currency conversion (INR → USD/EUR), and a Motivational Quote generator.

This repository contains two folders:

- `Server/` — Node.js + Express backend with simple APIs (mocked exchange rates by default).
- `client/` — Vite + React frontend (development server proxies `/api` to the backend).

## Features

- Weather Information (mocked)
- Currency Conversion (INR → USD/EUR) — currently uses a mock backend implementation for reliability; easy to switch to a real provider
- Motivational Quote Generator (mocked list)
- Single-page app with tab navigation, loading & error states

## Quick start (Windows PowerShell)

1. Start the backend

```powershell
cd Server
npm install
# run with nodemon (dev) or node
npm run dev   # if nodemon is configured
# OR
node index.js
```

The backend starts on port `4000` by default.

2. Start the frontend

```powershell
cd client
npm install
npm run dev
```

Vite dev server will start (default port 5173). The Vite config proxies `/api` requests to `http://localhost:4000`, so frontend fetches may call `/api/...` directly.

3. Open the app

Visit: http://localhost:5173

## API Endpoints (backend)

- GET /api/weather?city={city}
	- Returns mocked weather info for the requested city.

- GET /api/convert?from=INR&to=USD&amount=100
	- Converts amount using mocked rates (when using the mock controller). Response shape:
		{
			result: number,
			info: { rate: number, timestamp: number },
			source: string
		}

- GET /api/quote
	- Returns a random motivational quote object: { text, author }

## Notes on the currency provider

- The challenge accepts either real API integration or mock data. This repo currently uses a mocked implementation (see `Server/controllers/converterController.js`) for reliability during demos. To switch to a live provider:
	- Replace the mock logic with a fetch to a provider (e.g. exchangerate.host or another free API).
	- Make sure to handle provider errors and return a consistent JSON shape.

## Deployment

- Frontend (client) can be deployed to Vercel. Connect the GitHub repo and set the root to `/client`.
- Backend (Server) can be deployed to Railway / Render / Heroku / Fly. Ensure `PORT` env var is used by the server (it already reads `process.env.PORT`).
- For an integrated deployment, you can also deploy the frontend as static assets and host the backend on a separate service and update the client to call the deployed backend URL (or set up environment-specific proxies).

## Troubleshooting

- 502 / Bad Gateway when calling `/api/convert`:
	- Ensure the backend is running and listening on the expected port (default 4000).
	- Check server logs for errors (the controller will return 502 when an external provider fails if you are using a live provider).
	- For local development the Vite dev server proxies `/api` to `http://localhost:4000` (see `client/vite.config.js`).

- "File differs only in casing" TypeScript/Vite error:
	- This can happen when the repo has both `Client` and `client` folders or stale artifacts. On Windows the file system is case-insensitive but tooling can get confused.
	- Fix: standardize on one folder name (this project uses `client`), remove the other folder if present, delete `node_modules` folders, then reinstall.

## Project structure

- Server/
	- controllers/
		- converterController.js
		- weatherController.js
		- quoteController.js
	- routes/
		- converterRoutes.js
		- weatherRoutes.js
		- quoteRoutes.js
	- index.js

- client/
	- src/
		- components/
			- Weather.jsx
			- Converter.jsx
			- Quote.jsx
		- main.jsx
		- App.jsx
	- vite.config.js (contains `/api` proxy to backend)

# Info_Hub


