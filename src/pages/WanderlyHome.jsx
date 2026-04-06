import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const styles = `

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .wh-root {
    min-height: 100vh;
    background: #0a0c0b;
    font-family: 'DM Sans', sans-serif;
    color: #e8e4dc;
    overflow-x: hidden;
  }

  /* HERO NAV */
  .wh-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 48px;
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10,12,11,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .wh-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #e8e4dc;
  }
  .wh-logo span { color: #4ecb8e; }
  .wh-nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }
  .wh-nav-links a {
    color: rgba(232,228,220,0.55);
    text-decoration: none;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: color 0.25s;
  }
  .wh-nav-links a:hover { color: #e8e4dc; }

  /* HERO */
  .wh-hero {
    position: relative;
    padding: 100px 48px 80px;
    overflow: hidden;
  }
  .wh-hero-bg {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 60% 50% at 70% 40%, rgba(78,203,142,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(255,180,100,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
  .wh-hero-eyebrow {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #4ecb8e;
    margin-bottom: 20px;
    font-weight: 500;
  }
  .wh-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 7vw, 88px);
    font-weight: 300;
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: #e8e4dc;
    margin-bottom: 24px;
    max-width: 700px;
  }
  .wh-hero-title em {
    font-style: italic;
    color: rgba(232,228,220,0.45);
  }
  .wh-hero-sub {
    font-size: 15px;
    color: rgba(232,228,220,0.5);
    font-weight: 300;
    max-width: 420px;
    line-height: 1.7;
    margin-bottom: 48px;
  }

  /* SEARCH */
  .wh-search-wrap {
    display: flex;
    gap: 0;
    max-width: 540px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 4px;
    overflow: hidden;
    background: rgba(255,255,255,0.03);
    transition: border-color 0.25s;
  }
  .wh-search-wrap:focus-within {
    border-color: rgba(78,203,142,0.4);
  }
  .wh-search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 16px 20px;
    font-size: 14px;
    color: #e8e4dc;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
  }
  .wh-search-input::placeholder { color: rgba(232,228,220,0.3); }
  .wh-search-btn {
    padding: 16px 28px;
    background: #4ecb8e;
    border: none;
    color: #0a0c0b;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: background 0.2s;
  }
  .wh-search-btn:hover { background: #3db87a; }
  .wh-search-btn:disabled { background: #2a7a52; cursor: not-allowed; }
  .wh-search-clear {
    background: transparent;
    border: none;
    color: rgba(232,228,220,0.4);
    padding: 0 12px;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s;
  }
  .wh-search-clear:hover { color: #e8e4dc; }

  /* STATS STRIP */
  .wh-stats {
    display: flex;
    gap: 48px;
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .wh-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: #e8e4dc;
  }
  .wh-stat-label {
    font-size: 11px;
    color: rgba(232,228,220,0.4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 4px;
  }

  /* SECTION */
  .wh-section {
    padding: 0 48px 80px;
  }
  .wh-section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  .wh-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: #e8e4dc;
  }
  .wh-section-count {
    font-size: 12px;
    color: rgba(232,228,220,0.35);
    letter-spacing: 0.08em;
  }

  /* GRID */
  .wh-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2px;
  }

  /* CARD */
  .wh-card {
    position: relative;
    background: #111410;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 32px;
    cursor: pointer;
    transition: background 0.25s, border-color 0.25s;
    overflow: hidden;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .wh-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(78,203,142,0.04) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .wh-card:hover { background: #141714; border-color: rgba(78,203,142,0.2); }
  .wh-card:hover::before { opacity: 1; }

  .wh-card-index {
    font-size: 10px;
    letter-spacing: 0.15em;
    color: rgba(232,228,220,0.2);
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .wh-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 300;
    color: #e8e4dc;
    line-height: 1.15;
    margin-bottom: 12px;
  }
  .wh-card-desc {
    font-size: 13px;
    color: rgba(232,228,220,0.42);
    line-height: 1.6;
    font-weight: 300;
    flex: 1;
    margin-bottom: 24px;
  }
  .wh-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .wh-card-price {
    font-size: 18px;
    font-weight: 400;
    color: #4ecb8e;
    letter-spacing: -0.01em;
  }
  .wh-card-price span {
    font-size: 11px;
    color: rgba(232,228,220,0.3);
    margin-left: 4px;
    font-weight: 300;
  }
  .wh-card-arrow {
    width: 32px;
    height: 32px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, border-color 0.2s;
    font-size: 13px;
    color: rgba(232,228,220,0.5);
  }
  .wh-card:hover .wh-card-arrow {
    background: #4ecb8e;
    border-color: #4ecb8e;
    color: #0a0c0b;
  }

  /* LOADING */
  .wh-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
  }
  .wh-loading-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: rgba(232,228,220,0.3);
    letter-spacing: 0.05em;
    animation: pulse 1.8s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
  }

  /* EMPTY */
  .wh-empty {
    text-align: center;
    padding: 80px 0;
    color: rgba(232,228,220,0.3);
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    font-style: italic;
  }

  /* FOOTER */
  .wh-footer {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 32px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .wh-footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    color: rgba(232,228,220,0.3);
  }
  .wh-footer-copy {
    font-size: 12px;
    color: rgba(232,228,220,0.2);
  }
`;

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

export default function WanderlyHome() {
  useWanderlyFonts();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");

  // Load all cached destinations on mount
  useEffect(() => {
    fetch("http://localhost:5000/destinations")
      .then((res) => res.json())
      .then((data) => { setDestinations(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  // Live search — hits backend which checks DB then fetches from web
  const handleSearch = async () => {
    const q = searchVal.trim();
    if (!q) return;
    setSearching(true);
    setSearchError("");
    setSearchResult(null);
    try {
      const res = await fetch(`http://localhost:5000/destinations/search?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      if (!res.ok) {
        setSearchError(json.error || "Destination not found.");
      } else {
        setSearchResult(json.data);
        setDestinations((prev) => {
          const exists = prev.find((d) => d._id === json.data._id);
          return exists
            ? prev.map((d) => d._id === json.data._id ? json.data : d)
            : [json.data, ...prev];
        });
      }
    } catch (err) {
      setSearchError("Connection error — is your server running?");
    } finally {
      setSearching(false);
    }
  };

  const handleClear = () => {
    setSearchVal("");
    setSearchResult(null);
    setSearchError("");
  };

  const filtered = searchResult
    ? [searchResult]
    : destinations.filter((d) =>
        d.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        (d.description || "").toLowerCase().includes(searchVal.toLowerCase())
      );

  return (
    <>
      <style>{styles}</style>
      <div className="wh-root">

        {/* NAV */}
        <nav className="wh-nav">
          <div className="wh-logo">Wander<span>ly</span></div>
          <ul className="wh-nav-links">
            <li><a href="#">Destinations</a></li>
            <li><a href="#">Experiences</a></li>
            <li><a href="#">Plan</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>

        {/* HERO */}
        <section className="wh-hero">
          <div className="wh-hero-bg" />
          <p className="wh-hero-eyebrow">Curated Travel Experiences</p>
          <h1 className="wh-hero-title">
            Discover the world,<br />
            <em>on your terms</em>
          </h1>
          <p className="wh-hero-sub">
            Hand-picked destinations crafted for those who travel with intention. Where will you go next?
          </p>

          <div className="wh-search-wrap">
            <input
              className="wh-search-input"
              placeholder="Search any destination e.g. Goa, Paris, Bali..."
              value={searchVal}
              onChange={(e) => { setSearchVal(e.target.value); setSearchResult(null); setSearchError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {searchVal && (
              <button className="wh-search-clear" onClick={handleClear}>✕</button>
            )}
            <button className="wh-search-btn" onClick={handleSearch} disabled={searching}>
              {searching ? "Searching..." : "Search"}
            </button>
          </div>
          {searchError && (
            <p style={{ marginTop: 12, fontSize: 13, color: "#f87c7c" }}>{searchError}</p>
          )}
          {searching && (
            <p style={{ marginTop: 12, fontSize: 13, color: "rgba(232,228,220,0.5)", fontStyle: "italic" }}>
              Fetching live travel data…
            </p>
          )}

          <div className="wh-stats">
            <div>
              <div className="wh-stat-num">{destinations.length}+</div>
              <div className="wh-stat-label">Destinations</div>
            </div>
            <div>
              <div className="wh-stat-num">12k+</div>
              <div className="wh-stat-label">Travellers</div>
            </div>
            <div>
              <div className="wh-stat-num">4.9</div>
              <div className="wh-stat-label">Avg. Rating</div>
            </div>
          </div>
        </section>

        {/* DESTINATIONS GRID */}
        <section className="wh-section">
          <div className="wh-section-header">
            <h2 className="wh-section-title">
              {searchResult ? `Results for "${searchResult.name}"` : searchVal ? "Search Results" : "All Destinations"}
            </h2>
            <span className="wh-section-count">
              {filtered.length} place{filtered.length !== 1 ? "s" : ""}
              {searchResult && searchResult.searchCount > 1 ? ` · searched ${searchResult.searchCount}×` : ""}
            </span>
          </div>

          {loading ? (
            <div className="wh-loading">
              <p className="wh-loading-text">Curating experiences…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="wh-empty">No destinations found</div>
          ) : (
            <div className="wh-grid">
              {filtered.map((d, i) => (
                <div
                  key={d._id}
                  className="wh-card"
                  onClick={() => navigate("/destination/" + d._id)}
                >
                  <div className="wh-card-index">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="wh-card-name">{d.name}</h3>
                    <p className="wh-card-desc">{d.description}</p>
                  </div>
                  <div className="wh-card-footer">
                    <div className="wh-card-price">
                      ₹{(d.price || 0).toLocaleString("en-IN")}
                      <span>/ person</span>
                    </div>
                    <div className="wh-card-arrow">→</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="wh-footer">
          <div className="wh-footer-logo">Wanderly</div>
          <div className="wh-footer-copy">© 2025 Wanderly. All rights reserved.</div>
        </footer>

      </div>
    </>
  );
}
