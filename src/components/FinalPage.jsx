import { useState } from "react";
import StarField from "./StarField";
import FloatingParticles from "./FloatingParticles";
import VaultDoor from "./VaultDoor";
import MemoryGallery from "./MemoryGallery";

function FinalPage() {
  const [phase, setPhase] = useState("vault"); // vault | password | opening | reveal | gallery
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shake, setShake] = useState(false);

  const VALID_ANSWERS = ["nandana", "the queen", "you", "love", "friendship", "nandana herself"];

  const handlePassword = () => {
    const norm = password.trim().toLowerCase();
    if (VALID_ANSWERS.some((v) => norm.includes(v) || v.includes(norm.split(" ")[0]))) {
      setPhase("opening");
      setTimeout(() => setPhase("reveal"), 2500);
      setTimeout(() => setPhase("gallery"), 5500);
    } else {
      setShake(true);
      setPasswordError("The minions shake their heads... try thinking about what makes Minionland truly special. 💛");
      setTimeout(() => setShake(false), 600);
    }
  };

  if (phase === "gallery") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #1a0f0a 0%, #0d0408 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Georgia', serif",
      }}>
        <StarField />
        <FloatingParticles colors={["#FFD700", "#F39C12", "#FFEAA7", "#FFF"]} />

        {/* Big birthday reveal */}
        <div style={{
          textAlign: "center",
          paddingTop: "clamp(2rem, 6vw, 4rem)",
          paddingBottom: "2rem",
          position: "relative",
          zIndex: 5,
        }}>
          <div style={{ fontSize: "clamp(3rem, 10vw, 6rem)", animation: "bounce-gentle 2s infinite", marginBottom: "1rem" }}>
            🎂
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 7vw, 4rem)",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #FFD700, #F39C12, #FFD700)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite",
            marginBottom: "0.5rem",
            textShadow: "none",
          }}>
            HAPPY BIRTHDAY
          </h1>
          <h1 style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #FFD700, #FFEAA7, #FFD700)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 2s linear infinite",
            marginBottom: "1.5rem",
          }}>
            NANDANA 💛
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            maxWidth: 500,
            margin: "0 auto 1rem",
            lineHeight: 1.8,
            fontStyle: "italic",
          }}>
            You solved every clue. You faced every challenge. You saved Minionland.
          </p>
          <p style={{
            color: "#FFD700",
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            fontWeight: "bold",
            textShadow: "0 0 20px rgba(255,215,0,0.5)",
          }}>
            The kingdom is better with its Queen. 👑
          </p>

          {/* Confetti effect */}
          <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: "-20px",
                fontSize: "1.5rem",
                animation: `floatUp ${Math.random() * 3 + 3}s ${Math.random() * 2}s linear infinite`,
              }}>
                {["🌟", "✨", "💛", "🎉", "🍌", "👑"][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
        </div>

        <MemoryGallery />

        {/* Final message */}
        <div style={{
          textAlign: "center",
          padding: "3rem 2rem",
          position: "relative",
          zIndex: 5,
        }}>
          <div style={{
            maxWidth: 500,
            margin: "0 auto",
            background: "rgba(255,215,0,0.05)",
            border: "1px solid rgba(255,215,0,0.2)",
            borderRadius: 20,
            padding: "2rem",
          }}>
            <p style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.1rem",
              lineHeight: 2,
              fontStyle: "italic",
              marginBottom: "1rem",
            }}>
              "Thanks for another year in the story."
            </p>
            <p style={{
              color: "#FFD700",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
            }}>
              — With love, from your loyal minion 💛
            </p>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: "2rem" }}>
            🍌 No bananas were harmed in this treasure hunt. 🍌
          </p>
        </div>

        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes floatUp {
            0% { transform: translateY(0px) translateX(0px); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(-120px) translateX(var(--drift, 20px)); opacity: 0; }
          }
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #0d0a2e 0%, #000 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Georgia', serif",
      padding: "2rem 1rem",
    }}>
      <StarField />
      <FloatingParticles count={15} />

      {phase === "opening" && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "black",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "goldFlood 2s ease forwards",
          animationDelay: "0.5s",
        }}>
          <div style={{
            fontSize: "clamp(3rem, 10vw, 6rem)",
            animation: "spin-slow 2s linear",
            filter: "drop-shadow(0 0 40px #FFD700)",
          }}>
            ✨
          </div>
        </div>
      )}

      {phase === "reveal" && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse at center, #FFD70040 0%, #F39C1220 40%, transparent 70%)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "fadeSlideUp 0.5s ease",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "6rem", animation: "bounce-gentle 1s infinite" }}>🎂</div>
            <h1 style={{ color: "#FFD700", fontSize: "3rem", animation: "pulse-glow 1s infinite" }}>
              Unlocking...
            </h1>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", position: "relative", zIndex: 5, width: "100%", maxWidth: 480 }}>
        {/* Vault header */}
        <div style={{
          display: "inline-flex",
          gap: 8,
          alignItems: "center",
          background: "rgba(255,215,0,0.1)",
          border: "1px solid rgba(255,215,0,0.3)",
          borderRadius: 20,
          padding: "6px 16px",
          marginBottom: "1.5rem",
        }}>
          <span style={{ color: "#FFD700", fontSize: "0.8rem", letterSpacing: "0.15em" }}>THE ROYAL VAULT</span>
        </div>

        <h1 style={{
          fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
          color: "white",
          marginBottom: "2rem",
          textShadow: "0 0 30px rgba(255,215,0,0.3)",
        }}>
          One Last Challenge 🔐
        </h1>

        <VaultDoor isOpen={phase === "opening" || phase === "reveal"} onAnimComplete={() => {}} />

        <div style={{ marginTop: "2.5rem" }}>
          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "1.1rem",
            marginBottom: "0.75rem",
            fontStyle: "italic",
          }}>
            "What is the most precious treasure in Minionland?"
          </p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
            (Hint: It's been here all along 💛)
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePassword()}
              placeholder="Enter the final answer..."
              style={{
                padding: "1rem 1.2rem",
                borderRadius: 12,
                border: `2px solid ${shake ? "#E74C3C" : "rgba(255,215,0,0.3)"}`,
                background: "rgba(255,255,255,0.05)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                fontFamily: "'Georgia', serif",
                textAlign: "center",
                animation: shake ? "shakeX 0.4s ease" : "none",
              }}
            />
            <button
              onClick={handlePassword}
              style={{
                padding: "1rem",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #FFD700, #F39C12)",
                color: "#0d0a2e",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
                boxShadow: "0 0 20px rgba(255,215,0,0.3)",
                transition: "opacity 0.2s",
              }}
            >
              Open the Vault ✨
            </button>
          </div>

          {passwordError && (
            <p style={{
              marginTop: "1rem",
              color: "#E74C3C",
              fontSize: "0.85rem",
              lineHeight: 1.5,
              animation: "fadeSlideUp 0.3s ease",
            }}>
              {passwordError}
            </p>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes goldFlood {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.2); }
          50% { box-shadow: 0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.4); }
        }
      `}</style>
    </div>
  );
}

export default FinalPage;
