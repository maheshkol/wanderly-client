import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const styles = `

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .dd-root {
    min-height: 100vh;
    background: #0a0c0b;
    font-family: 'DM Sans', sans-serif;
    color: #e8e4dc;
  }

  /* NAV */
  .dd-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 48px;
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10,12,11,0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .dd-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 600;
    color: #e8e4dc;
    text-decoration: none;
  }
  .dd-logo span { color: #4ecb8e; }
  .dd-back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(232,228,220,0.6);
    padding: 8px 18px;
    border-radius: 2px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.04em;
  }
  .dd-back-btn:hover {
    background: rgba(255,255,255,0.04);
    color: #e8e4dc;
    border-color: rgba(255,255,255,0.2);
  }

  /* HERO IMAGE */
  .dd-hero-img {
    width: 100%;
    height: 420px;
    object-fit: cover;
    display: block;
    filter: brightness(0.7);
  }
  .dd-hero-placeholder {
    width: 100%;
    height: 320px;
    background: #111410;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dd-hero-placeholder-inner {
    text-align: center;
  }
  .dd-hero-icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.2;
  }

  /* CONTENT LAYOUT */
  .dd-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 64px 48px 80px;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 80px;
    align-items: start;
  }

  /* LEFT COL */
  .dd-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4ecb8e;
    margin-bottom: 16px;
    font-weight: 500;
  }
  .dd-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(40px, 5vw, 64px);
    font-weight: 300;
    line-height: 1.05;
    color: #e8e4dc;
    margin-bottom: 24px;
    letter-spacing: -0.01em;
  }
  .dd-description {
    font-size: 15px;
    color: rgba(232,228,220,0.55);
    line-height: 1.8;
    font-weight: 300;
    max-width: 520px;
    margin-bottom: 60px;
  }

  /* ITINERARY */
  .dd-itinerary-label {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(232,228,220,0.3);
    margin-bottom: 32px;
    font-weight: 500;
  }
  .dd-days {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .dd-day {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 0;
    position: relative;
  }
  .dd-day:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 99px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255,255,255,0.06);
  }
  .dd-day-label {
    padding: 20px 0;
    font-size: 11px;
    font-weight: 500;
    color: rgba(232,228,220,0.3);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .dd-day-body {
    border-left: 1px solid rgba(255,255,255,0.08);
    padding: 20px 0 20px 32px;
    position: relative;
  }
  .dd-day-body::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 26px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ecb8e;
  }
  .dd-activity {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    font-size: 14px;
    color: rgba(232,228,220,0.65);
    font-weight: 300;
  }
  .dd-activity-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(232,228,220,0.25);
    flex-shrink: 0;
  }

  /* RIGHT COL — BOOKING CARD */
  .dd-booking-card {
    position: sticky;
    top: 96px;
    background: #111410;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 36px;
    border-radius: 2px;
  }
  .dd-price-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232,228,220,0.3);
    margin-bottom: 8px;
  }
  .dd-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 46px;
    font-weight: 300;
    color: #4ecb8e;
    line-height: 1;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }
  .dd-price-sub {
    font-size: 12px;
    color: rgba(232,228,220,0.3);
    font-weight: 300;
    margin-bottom: 32px;
  }
  .dd-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 24px 0;
  }
  .dd-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    font-size: 13px;
    color: rgba(232,228,220,0.5);
    font-weight: 300;
  }
  .dd-feature-icon {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }
  .dd-cta-btn {
    width: 100%;
    padding: 16px;
    background: #4ecb8e;
    border: none;
    color: #0a0c0b;
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    border-radius: 2px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: background 0.2s;
    margin-top: 28px;
  }
  .dd-cta-btn:hover { background: #3db87a; }
  .dd-cta-note {
    text-align: center;
    font-size: 11px;
    color: rgba(232,228,220,0.25);
    margin-top: 12px;
  }

  /* LOADING / ERROR */
  .dd-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    gap: 16px;
  }
  .dd-state-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 300;
    color: rgba(232,228,220,0.3);
    font-style: italic;
    animation: pulse 1.8s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
  }

  @media (max-width: 780px) {
    .dd-content {
      grid-template-columns: 1fr;
      gap: 40px;
      padding: 40px 24px 60px;
    }
    .dd-nav { padding: 20px 24px; }
    .dd-booking-card { position: static; }
  }
`;

const itinerary = [
  {
    day: "Day 1",
    activities: ["Arrival & hotel check-in", "Local neighbourhood exploration", "Welcome dinner"]
  },
  {
    day: "Day 2",
    activities: ["Main landmark visits", "Guided food walk", "Sunset viewpoint"]
  },
  {
    day: "Day 3",
    activities: ["Leisure morning", "Shopping & souvenirs", "Return journey"]
  }
];

function useWanderlyFonts() {
  useEffect(() => {
    const id = "wanderly-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

export default function DestinationDetail() {
  useWanderlyFonts();
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/destinations/${id}`)
      .then(res => res.json())
      .then(data => {
        setDestination(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <style>{styles}</style>
      <div className="dd-root">

        {/* NAV */}
        <nav className="dd-nav">
          <a className="dd-logo" href="/">Wander<span>ly</span></a>
          <button className="dd-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </nav>

        {loading && (
          <div className="dd-state">
            <p className="dd-state-text">Loading destination…</p>
          </div>
        )}

        {!loading && !destination && (
          <div className="dd-state">
            <p className="dd-state-text">Destination not found</p>
          </div>
        )}

        {!loading && destination && (
          <>
            {/* HERO IMAGE */}
            {destination.image ? (
              <img
                className="dd-hero-img"
                src={destination.image}
                alt={destination.name}
              />
            ) : (
              <div className="dd-hero-placeholder">
                <div className="dd-hero-placeholder-inner">
                  <div className="dd-hero-icon">🌍</div>
                </div>
              </div>
            )}

            {/* MAIN CONTENT */}
            <div className="dd-content">

              {/* LEFT: INFO + ITINERARY */}
              <div>
                <p className="dd-eyebrow">Destination Guide</p>
                <h1 className="dd-title">{destination.name}</h1>
                <p className="dd-description">{destination.description}</p>

                <p className="dd-itinerary-label">Suggested Itinerary · 3 Days</p>
                <div className="dd-days">
                  {itinerary.map((d, i) => (
                    <div className="dd-day" key={i}>
                      <div className="dd-day-label">{d.day}</div>
                      <div className="dd-day-body">
                        {d.activities.map((a, j) => (
                          <div className="dd-activity" key={j}>
                            <span className="dd-activity-dot" />
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: BOOKING CARD */}
              <div>
                <div className="dd-booking-card">
                  <p className="dd-price-label">Starting from</p>
                  <p className="dd-price">
                    ₹{(destination.price || 0).toLocaleString("en-IN")}
                  </p>
                  <p className="dd-price-sub">per person · all inclusive</p>

                  <div className="dd-divider" />

                  <div className="dd-feature">
                    <div className="dd-feature-icon">✈</div>
                    Flight + Hotel included
                  </div>
                  <div className="dd-feature">
                    <div className="dd-feature-icon">🗺</div>
                    Guided 3-day itinerary
                  </div>
                  <div className="dd-feature">
                    <div className="dd-feature-icon">📞</div>
                    24/7 travel support
                  </div>

                  <button
                    className="dd-cta-btn"
                    onClick={() => navigate("/search")}
                  >
                    Plan This Trip →
                  </button>
                  <p className="dd-cta-note">No payment required to plan</p>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}
