import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function WanderlyHome() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  // Fetch data
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(`${API_URL}/destinations`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setDestinations(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔍 Filter logic (LIVE SEARCH)
  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "#0a0f0d",
        color: "#e8f0ec",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      {/* HEADER */}
      <h1 style={{ color: "#1D9E75" }}>Wanderly 🌍</h1>

      {/* SEARCH BAR */}
      <input
        placeholder="Search destinations..."
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #333",
          marginTop: 10,
          width: "100%",
          maxWidth: 400,
          background: "#111",
          color: "#fff",
        }}
      />

      {/* GRID */}
      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.length === 0 ? (
          <p>No destinations found</p>
        ) : (
          filtered.map((d) => (
            <div
              key={d._id}
              onClick={() => navigate("/destination/" + d._id)}
              style={{
                background: "#111a15",
                border: "1px solid rgba(232,240,236,0.1)",
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  height: 160,
                  background: "#162219",
                  position: "relative",
                }}
              >
                {d.image ? (
                  <img
                    src={d.image}
                    alt={d.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 40,
                    }}
                  >
                    🌍
                  </div>
                )}

                {/* PRICE BADGE */}
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "#1D9E75",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                  }}
                >
                  ₹{d.price}
                </span>
              </div>

              {/* CONTENT */}
              <div style={{ padding: 16 }}>
                <h3 style={{ margin: 0 }}>{d.name}</h3>

                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(232,240,236,0.6)",
                    marginTop: 6,
                  }}
                >
                  {d.description}
                </p>

                <div
                  style={{
                    marginTop: 12,
                    fontSize: 12,
                    color: "#1D9E75",
                  }}
                >
                  Explore →
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
