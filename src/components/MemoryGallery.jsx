import { MEMORIES } from "../constants";

function MemoryGallery() {
  return (
    <div style={{ padding: "2rem 1rem" }}>
      <h2 style={{
        textAlign: "center",
        color: "#FFD700",
        fontFamily: "'Georgia', serif",
        fontSize: "clamp(1.5rem, 4vw, 2rem)",
        marginBottom: "0.5rem",
        textShadow: "0 0 20px rgba(255,215,0,0.5)",
      }}>
        Memory Gallery 📸
      </h2>
      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", marginBottom: "2rem", fontSize: "0.9rem" }}>
        Treasures from the kingdom's archives
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 40vw), 1fr))",
        gap: "clamp(1rem, 3vw, 1.5rem)",
        maxWidth: 680,
        margin: "0 auto",
      }}>
        {MEMORIES.map((mem, i) => (
          <div
            key={i}
            style={{
              background: "white",
              padding: "clamp(0.8rem, 2vw, 1.2rem)",
              paddingBottom: "clamp(2.5rem, 5vw, 3rem)",
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              transform: `rotate(${mem.rotate}deg)`,
              animation: `float-card ${4 + i * 0.5}s ${i * 0.3}s ease-in-out infinite`,
              "--rot": `${mem.rotate}deg`,
              cursor: "default",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(0deg) scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${mem.rotate}deg)`}
          >
            {/* Photo area */}
            <div style={{
              width: "100%",
              paddingTop: "75%",
              background: `linear-gradient(135deg, ${["#FFD70020", "#9B59B620", "#E74C3C20", "#1ABC9C20", "#F39C1220", "#9B59B620"][i]}, ${["#F39C1220", "#FFD70020", "#9B59B620", "#FFD70020", "#E74C3C20", "#1ABC9C20"][i]})`,
              borderRadius: 2,
              marginBottom: "0.75rem",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(2rem, 6vw, 3rem)",
              }}>
                {["👑", "⚔️", "🍌", "💛", "🌟", "🗺️"][i]}
              </div>
            </div>

            <p style={{
              fontWeight: "bold",
              fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
              color: "#333",
              marginBottom: "4px",
              fontFamily: "'Georgia', serif",
            }}>
              {mem.caption}
            </p>
            <p style={{
              fontSize: "clamp(0.65rem, 1.8vw, 0.75rem)",
              color: "#666",
              fontStyle: "italic",
              lineHeight: 1.4,
            }}>
              {mem.text}
            </p>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes float-card {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-8px) rotate(var(--rot, 0deg)); }
        }
      `}</style>
    </div>
  );
}

export default MemoryGallery;
