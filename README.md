# Wanderly — Frontend

React frontend for the Wanderly travel web app. Features a dark luxury UI with live destination search, trip planning, and booking flow. Connects to the Wanderly backend API.

---

## Tech Stack

- **React** — UI framework
- **React Router DOM** — client-side routing
- **Google Fonts** — Cormorant Garamond + DM Sans
- **CSS-in-JS** — scoped styles via injected style tags

---

## Features

- Search any destination and get live travel data
- Browse all previously searched destinations
- Destination detail page with suggested itinerary
- Trip planner with day-by-day itinerary view
- Booking flow with traveller details and price calculation
- Fully responsive dark luxury design

---

## Project Structure

```
client/
├── public/
├── src/
│   ├── pages/
│   │   ├── WanderlyHome.jsx       # Homepage with search
│   │   ├── DestinationDetail.jsx  # Single destination page
│   │   ├── SearchAndBooking.jsx   # Browse + booking flow
│   │   └── TripPlanner.jsx        # Trip planner
│   ├── config.js                  # API base URL config
│   ├── App.js                     # Routes
│   └── index.js                   # Entry point
├── .env.production                # Production env (not committed)
├── .gitignore
└── package.json
```

---

## Getting Started Locally

**1. Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/wanderly-client.git
cd wanderly-client
```

**2. Install dependencies**
```bash
npm install
```

**3. Make sure the backend is running**

The backend should be running at `http://localhost:5000`.
See [wanderly-server](https://github.com/YOUR_USERNAME/wanderly-server) for setup.

**4. Start the app**
```bash
npm start
```

App runs at `http://localhost:3000`

---

## Environment Variables

Create a `.env.production` file (for production builds only — do not commit):

```
REACT_APP_API_URL=https://wanderly-server.onrender.com
```

For local development, the app defaults to `http://localhost:5000` automatically via `src/config.js`.

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `WanderlyHome` | Homepage with search and destination grid |
| `/destination/:id` | `DestinationDetail` | Single destination with itinerary |
| `/search` | `SearchAndBooking` | Browse all destinations + booking |
| `/plan` | `TripPlanner` | Select destination and view trip plan |

---

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Add New Project
3. Import this repo
4. Add environment variable in Vercel dashboard:
   ```
   REACT_APP_API_URL = https://wanderly-server.onrender.com
   ```
5. Click Deploy

Vercel auto-deploys on every push to `main`.

---

## Backend Repo

[wanderly-server](https://github.com/YOUR_USERNAME/wanderly-server)

---

## Live Demo

Frontend: `https://wanderly-client.vercel.app`

---

## License

MIT
