import { useState, useEffect } from "react";

const styles = `

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sb-root {
    min-height: 100vh;
    background: #0a0c0b;
    font-family: 'DM Sans', sans-serif;
    color: #e8e4dc;
  }

  /* NAV */
  .sb-nav {
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
  .sb-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 600;
    color: #e8e4dc;
  }
  .sb-logo span { color: #4ecb8e; }

  /* ── SEARCH PAGE ── */
  .sb-search-page { padding: 56px 48px 80px; }

  .sb-page-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4ecb8e;
    font-weight: 500;
    margin-bottom: 14px;
  }
  .sb-page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 300;
    color: #e8e4dc;
    margin-bottom: 48px;
  }

  /* FILTER BAR */
  .sb-filter-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 48px;
    flex-wrap: wrap;
  }
  .sb-filter-chip {
    padding: 8px 18px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: rgba(232,228,220,0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.06em;
    cursor: pointer;
    border-radius: 1px;
    transition: all 0.2s;
  }
  .sb-filter-chip.active {
    background: #4ecb8e;
    border-color: #4ecb8e;
    color: #0a0c0b;
  }
  .sb-filter-chip:hover:not(.active) {
    border-color: rgba(255,255,255,0.25);
    color: #e8e4dc;
  }

  /* GRID */
  .sb-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2px;
  }

  /* DESTINATION CARD */
  .sb-dest-card {
    background: #111410;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 28px;
    transition: background 0.2s, border-color 0.25s;
    position: relative;
    overflow: hidden;
  }
  .sb-dest-card:hover {
    background: #141714;
    border-color: rgba(78,203,142,0.18);
  }
  .sb-dest-card-idx {
    font-size: 10px;
    letter-spacing: 0.15em;
    color: rgba(232,228,220,0.18);
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .sb-dest-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
    color: #e8e4dc;
    margin-bottom: 10px;
    line-height: 1.15;
  }
  .sb-dest-desc {
    font-size: 13px;
    color: rgba(232,228,220,0.4);
    line-height: 1.65;
    font-weight: 300;
    margin-bottom: 24px;
    min-height: 56px;
  }
  .sb-dest-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 20px;
  }
  .sb-dest-price {
    font-size: 20px;
    font-weight: 400;
    color: #4ecb8e;
    letter-spacing: -0.01em;
  }
  .sb-dest-price small {
    font-size: 11px;
    color: rgba(232,228,220,0.28);
    margin-left: 4px;
    font-weight: 300;
  }
  .sb-book-btn {
    padding: 9px 20px;
    background: transparent;
    border: 1px solid rgba(78,203,142,0.4);
    color: #4ecb8e;
    font-size: 12px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    border-radius: 1px;
    letter-spacing: 0.06em;
    transition: all 0.2s;
  }
  .sb-book-btn:hover {
    background: #4ecb8e;
    color: #0a0c0b;
    border-color: #4ecb8e;
  }

  /* ── BOOKING PAGE ── */
  .sb-booking-page {
    padding: 56px 48px 80px;
    max-width: 860px;
    margin: 0 auto;
  }
  .sb-back-btn {
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
    margin-bottom: 48px;
  }
  .sb-back-btn:hover {
    background: rgba(255,255,255,0.04);
    color: #e8e4dc;
  }

  .sb-booking-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 48px;
    align-items: start;
  }

  .sb-booking-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 300;
    color: #e8e4dc;
    margin-bottom: 8px;
    line-height: 1.1;
  }
  .sb-booking-subtitle {
    font-size: 14px;
    color: rgba(232,228,220,0.4);
    font-weight: 300;
    margin-bottom: 40px;
  }

  /* FORM */
  .sb-form-section {
    margin-bottom: 36px;
  }
  .sb-form-section-label {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(232,228,220,0.3);
    margin-bottom: 16px;
    font-weight: 500;
  }
  .sb-input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .sb-input-group { display: flex; flex-direction: column; gap: 8px; }
  .sb-input-group label {
    font-size: 12px;
    color: rgba(232,228,220,0.45);
    font-weight: 300;
    letter-spacing: 0.03em;
  }
  .sb-input {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 1px;
    padding: 13px 16px;
    font-size: 14px;
    color: #e8e4dc;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .sb-input:focus { border-color: rgba(78,203,142,0.4); }
  .sb-input::placeholder { color: rgba(232,228,220,0.2); }

  /* SUMMARY CARD */
  .sb-summary-card {
    background: #111410;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 32px;
    border-radius: 1px;
    position: sticky;
    top: 96px;
  }
  .sb-summary-label {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(232,228,220,0.3);
    margin-bottom: 20px;
  }
  .sb-summary-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 300;
    color: #e8e4dc;
    margin-bottom: 24px;
    line-height: 1.1;
  }
  .sb-summary-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 20px 0;
  }
  .sb-summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-size: 13px;
  }
  .sb-summary-row-label { color: rgba(232,228,220,0.4); font-weight: 300; }
  .sb-summary-row-val { color: #e8e4dc; }
  .sb-summary-total {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .sb-summary-total-label { font-size: 12px; color: rgba(232,228,220,0.4); }
  .sb-summary-total-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: #4ecb8e;
    letter-spacing: -0.02em;
  }
  .sb-confirm-btn {
    width: 100%;
    padding: 16px;
    background: #4ecb8e;
    border: none;
    color: #0a0c0b;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    border-radius: 1px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    transition: background 0.2s;
    margin-top: 24px;
  }
  .sb-confirm-btn:hover { background: #3db87a; }
  .sb-confirm-note {
    text-align: center;
    font-size: 11px;
    color: rgba(232,228,220,0.22);
    margin-top: 10px;
  }

  /* CONFIRMED STATE */
  .sb-confirmed {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    padding: 40px;
  }
  .sb-confirmed-icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(78,203,142,0.1);
    border: 1px solid rgba(78,203,142,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin-bottom: 32px;
  }
  .sb-confirmed-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 44px;
    font-weight: 300;
    color: #e8e4dc;
    margin-bottom: 12px;
  }
  .sb-confirmed-subtitle {
    font-size: 15px;
    color: rgba(232,228,220,0.45);
    font-weight: 300;
    margin-bottom: 40px;
    max-width: 400px;
  }
  .sb-confirmed-dest {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-style: italic;
    color: #4ecb8e;
    margin-bottom: 40px;
  }

  /* LOADING */
  .sb-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
  }
  .sb-loading-text {
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
    .sb-nav { padding: 20px 24px; }
    .sb-search-page { padding: 40px 24px 60px; }
    .sb-booking-page { padding: 40px 24px 60px; }
    .sb-booking-layout { grid-template-columns: 1fr; }
    .sb-summary-card { position: static; }
    .sb-input-row { grid-template-columns: 1fr; }
  }
`;

// ── SEARCH RESULTS ──────────────────────────────────────────────────

function SearchResults({ onBook }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="sb-search-page">
      <p className="sb-page-eyebrow">Explore the World</p>
      <h1 className="sb-page-title">All Destinations</h1>

      <div className="sb-filter-bar">
        {["All", "Beach", "Mountain", "City", "Heritage"].map((f, i) => (
          <button key={f} className={`sb-filter-chip ${i === 0 ? "active" : ""}`}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="sb-loading">
          <p className="sb-loading-text">Discovering destinations…</p>
        </div>
      ) : (
        <div className="sb-grid">
          {destinations.map((d, i) => (
            <div key={d._id} className="sb-dest-card">
              <div className="sb-dest-card-idx">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="sb-dest-name">{d.name}</h3>
              <p className="sb-dest-desc">{d.description}</p>
              <div className="sb-dest-footer">
                <div className="sb-dest-price">
                  ₹{(d.price || 0).toLocaleString("en-IN")}
                  <small>/ person</small>
                </div>
                <button className="sb-book-btn" onClick={() => onBook(d)}>
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── BOOKING FLOW ────────────────────────────────────────────────────

function BookingFlow({ destination, onBack }) {
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", travellers: "1", date: "" });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  if (confirmed) {
    return (
      <div className="sb-booking-page">
        <div className="sb-confirmed">
          <div className="sb-confirmed-icon">✓</div>
          <h2 className="sb-confirmed-title">Booking Confirmed</h2>
          <p className="sb-confirmed-subtitle">
            Your journey has been reserved. A confirmation will be sent to {form.email || "your email"}.
          </p>
          <p className="sb-confirmed-dest">{destination.name}</p>
          <button className="sb-back-btn" onClick={onBack}>← Browse More Destinations</button>
        </div>
      </div>
    );
  }

  return (
    <div className="sb-booking-page">
      <button className="sb-back-btn" onClick={onBack}>← Back to Destinations</button>

      <div className="sb-booking-layout">

        {/* FORM */}
        <div>
          <h2 className="sb-booking-title">Complete Your Booking</h2>
          <p className="sb-booking-subtitle">{destination.description}</p>

          <div className="sb-form-section">
            <p className="sb-form-section-label">Personal Details</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="sb-input-row">
                <div className="sb-input-group">
                  <label>Full Name</label>
                  <input className="sb-input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
                </div>
                <div className="sb-input-group">
                  <label>Email</label>
                  <input className="sb-input" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                </div>
              </div>
              <div className="sb-input-row">
                <div className="sb-input-group">
                  <label>Phone</label>
                  <input className="sb-input" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                </div>
                <div className="sb-input-group">
                  <label>No. of Travellers</label>
                  <input className="sb-input" name="travellers" type="number" min="1" max="20" value={form.travellers} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="sb-form-section">
            <p className="sb-form-section-label">Travel Dates</p>
            <div className="sb-input-group">
              <label>Departure Date</label>
              <input className="sb-input" name="date" type="date" value={form.date} onChange={handleChange} style={{ colorScheme: "dark" }} />
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div>
          <div className="sb-summary-card">
            <p className="sb-summary-label">Trip Summary</p>
            <h3 className="sb-summary-name">{destination.name}</h3>
            <div className="sb-summary-divider" />
            <div className="sb-summary-row">
              <span className="sb-summary-row-label">Base price</span>
              <span className="sb-summary-row-val">₹{(destination.price || 0).toLocaleString("en-IN")}</span>
            </div>
            <div className="sb-summary-row">
              <span className="sb-summary-row-label">Travellers</span>
              <span className="sb-summary-row-val">× {form.travellers}</span>
            </div>
            <div className="sb-summary-row">
              <span className="sb-summary-row-label">Taxes & fees</span>
              <span className="sb-summary-row-val">Included</span>
            </div>
            <div className="sb-summary-total">
              <span className="sb-summary-total-label">Total</span>
              <span className="sb-summary-total-price">
                ₹{((destination.price || 0) * parseInt(form.travellers || 1)).toLocaleString("en-IN")}
              </span>
            </div>
            <button className="sb-confirm-btn" onClick={() => setConfirmed(true)}>
              Confirm Booking →
            </button>
            <p className="sb-confirm-note">No payment required now</p>
          </div>
        </div>

      </div>
    </div>
  );
}

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

// ── MAIN EXPORT ─────────────────────────────────────────────────────

export default function App() {
  useWanderlyFonts();
  const [page, setPage] = useState("search");
  const [selected, setSelected] = useState(null);

  const handleBook = (dest) => { setSelected(dest); setPage("booking"); };
  const handleBack = () => { setPage("search"); setSelected(null); };

  return (
    <>
      <style>{styles}</style>
      <div className="sb-root">
        <nav className="sb-nav">
          <div className="sb-logo">Wander<span>ly</span></div>
        </nav>
        {page === "search" && <SearchResults onBook={handleBook} />}
        {page === "booking" && selected && <BookingFlow destination={selected} onBack={handleBack} />}
      </div>
    </>
  );
}
