import { useState, useEffect } from "react";

const styles = `

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .tp-root {
    min-height: 100vh;
    background: #0a0c0b;
    font-family: 'DM Sans', sans-serif;
    color: #e8e4dc;
  }

  /* NAV */
  .tp-nav {
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
  .tp-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 600;
    color: #e8e4dc;
  }
  .tp-logo span { color: #4ecb8e; }
  .tp-nav-tag {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232,228,220,0.3);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 5px 14px;
    border-radius: 1px;
  }

  /* ── PICK DESTINATION ── */
  .tp-pick-page { padding: 56px 48px 80px; }

  .tp-page-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4ecb8e;
    font-weight: 500;
    margin-bottom: 14px;
  }
  .tp-page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 300;
    color: #e8e4dc;
    margin-bottom: 12px;
    line-height: 1.05;
  }
  .tp-page-subtitle {
    font-size: 14px;
    color: rgba(232,228,220,0.4);
    font-weight: 300;
    margin-bottom: 48px;
    max-width: 400px;
    line-height: 1.7;
  }

  /* DEST LIST */
  .tp-dest-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 800px;
  }
  .tp-dest-row {
    display: grid;
    grid-template-columns: 72px 1fr auto;
    align-items: center;
    gap: 24px;
    background: #111410;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 24px 28px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.25s;
  }
  .tp-dest-row:hover {
    background: #141714;
    border-color: rgba(78,203,142,0.18);
  }
  .tp-dest-row:hover .tp-plan-label { color: #4ecb8e; }

  .tp-dest-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: rgba(232,228,220,0.12);
    line-height: 1;
  }
  .tp-dest-info-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: #e8e4dc;
    margin-bottom: 4px;
  }
  .tp-dest-info-desc {
    font-size: 13px;
    color: rgba(232,228,220,0.38);
    font-weight: 300;
    line-height: 1.5;
  }
  .tp-dest-right { text-align: right; }
  .tp-dest-price {
    font-size: 17px;
    color: #4ecb8e;
    font-weight: 400;
    letter-spacing: -0.01em;
    margin-bottom: 6px;
  }
  .tp-plan-label {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: rgba(232,228,220,0.28);
    text-transform: uppercase;
    transition: color 0.2s;
  }

  /* ── TRIP PLAN PAGE ── */
  .tp-plan-page { padding: 56px 48px 80px; }

  .tp-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(232,228,220,0.5);
    padding: 9px 18px;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    border-radius: 1px;
    letter-spacing: 0.05em;
    transition: all 0.2s;
    margin-bottom: 56px;
  }
  .tp-back-btn:hover {
    background: rgba(255,255,255,0.04);
    color: #e8e4dc;
  }

  .tp-plan-header {
    margin-bottom: 64px;
  }
  .tp-plan-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4ecb8e;
    font-weight: 500;
    margin-bottom: 14px;
  }
  .tp-plan-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(40px, 6vw, 70px);
    font-weight: 300;
    color: #e8e4dc;
    line-height: 1.0;
    margin-bottom: 12px;
  }
  .tp-plan-title em {
    font-style: italic;
    color: rgba(232,228,220,0.35);
  }
  .tp-plan-meta {
    font-size: 14px;
    color: rgba(232,228,220,0.4);
    font-weight: 300;
  }

  /* DAY CARDS */
  .tp-days-wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 2px;
  }
  .tp-day-card {
    background: #111410;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 32px;
    position: relative;
    overflow: hidden;
  }
  .tp-day-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #4ecb8e;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
  }
  .tp-day-card:hover::before { transform: scaleX(1); }

  .tp-day-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 56px;
    font-weight: 300;
    color: rgba(78,203,142,0.1);
    line-height: 1;
    margin-bottom: 4px;
    letter-spacing: -0.02em;
  }
  .tp-day-label {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(232,228,220,0.3);
    margin-bottom: 24px;
    font-weight: 500;
  }
  .tp-activity-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .tp-activity-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 14px;
    color: rgba(232,228,220,0.6);
    font-weight: 300;
    line-height: 1.4;
  }
  .tp-activity-item:last-child { border-bottom: none; }
  .tp-activity-line {
    width: 1px;
    height: 16px;
    background: rgba(78,203,142,0.3);
    flex-shrink: 0;
    margin-top: 3px;
  }

  /* PRICE FOOTER */
  .tp-plan-footer {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 24px;
    margin-top: 48px;
    padding: 28px 32px;
    background: #111410;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .tp-footer-label {
    font-size: 12px;
    color: rgba(232,228,220,0.35);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 6px;
  }
  .tp-footer-dest {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: #e8e4dc;
  }
  .tp-footer-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: #4ecb8e;
    letter-spacing: -0.02em;
    text-align: right;
  }
  .tp-footer-price small {
    font-size: 13px;
    color: rgba(232,228,220,0.3);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    display: block;
    letter-spacing: 0;
    margin-top: 2px;
  }

  /* LOADING */
  .tp-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
  }
  .tp-loading-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
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
    .tp-nav { padding: 20px 24px; }
    .tp-pick-page, .tp-plan-page { padding: 40px 24px 60px; }
    .tp-dest-row { grid-template-columns: 48px 1fr; }
    .tp-dest-right { display: none; }
  }
`;

const itineraryTemplate = [
  {
    num: "01",
    day: "Day 1",
    activities: ["Arrival & hotel check-in", "Local neighbourhood walk", "Welcome dinner at a local restaurant"]
  },
  {
    num: "02",
    day: "Day 2",
    activities: ["Morning visit to main landmarks", "Guided cultural experience", "Sunset at scenic viewpoint"]
  },
  {
    num: "03",
    day: "Day 3",
    activities: ["Leisure morning & local shopping", "Last-minute sightseeing", "Evening departure"]
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

export default function TripPlanner() {
  useWanderlyFonts();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/destinations")
      .then(res => res.json())
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (dest) => setSelected(dest);
  const handleBack = () => setSelected(null);

  return (
    <>
      <style>{styles}</style>
      <div className="tp-root">

        {/* NAV */}
        <nav className="tp-nav">
          <div className="tp-logo">Wander<span>ly</span></div>
          <div className="tp-nav-tag">Trip Planner</div>
        </nav>

        {/* PICK DESTINATION */}
        {!selected && (
          <div className="tp-pick-page">
            <p className="tp-page-eyebrow">Plan Your Journey</p>
            <h1 className="tp-page-title">Where do you<br />want to go?</h1>
            <p className="tp-page-subtitle">
              Choose a destination and we'll craft a personalised 3-day itinerary for you.
            </p>

            {loading ? (
              <div className="tp-loading">
                <p className="tp-loading-text">Finding destinations…</p>
              </div>
            ) : (
              <div className="tp-dest-list">
                {destinations.map((d, i) => (
                  <div
                    key={d._id}
                    className="tp-dest-row"
                    onClick={() => handleSelect(d)}
                  >
                    <div className="tp-dest-num">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="tp-dest-info-name">{d.name}</div>
                      <div className="tp-dest-info-desc">{d.description}</div>
                    </div>
                    <div className="tp-dest-right">
                      <div className="tp-dest-price">₹{(d.price || 0).toLocaleString("en-IN")}</div>
                      <div className="tp-plan-label">Plan trip →</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TRIP PLAN */}
        {selected && (
          <div className="tp-plan-page">
            <button className="tp-back-btn" onClick={handleBack}>← All Destinations</button>

            <div className="tp-plan-header">
              <p className="tp-plan-eyebrow">Your Itinerary · 3 Days</p>
              <h1 className="tp-plan-title">
                {selected.name}<br />
                <em>Trip Plan</em>
              </h1>
              <p className="tp-plan-meta">A curated day-by-day guide</p>
            </div>

            <div className="tp-days-wrap">
              {itineraryTemplate.map((d) => (
                <div key={d.num} className="tp-day-card">
                  <div className="tp-day-num">{d.num}</div>
                  <div className="tp-day-label">{d.day}</div>
                  <ul className="tp-activity-list">
                    {d.activities.map((a, i) => (
                      <li key={i} className="tp-activity-item">
                        <span className="tp-activity-line" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="tp-plan-footer">
              <div>
                <div className="tp-footer-label">Destination</div>
                <div className="tp-footer-dest">{selected.name}</div>
              </div>
              <div>
                <div className="tp-footer-price">
                  ₹{(selected.price || 0).toLocaleString("en-IN")}
                  <small>per person</small>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
