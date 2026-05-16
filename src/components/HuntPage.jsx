import { useState } from "react";
import { CLUES } from "../constants";
import StarField from "./StarField";
import FloatingParticles from "./FloatingParticles";
import TreasureMap from "./TreasureMap";
import ClueModal from "./ClueModal";
import { handleButtonClick } from "../utils/buttonEffects";

function HuntPage({ onComplete, initialSolved = [] }) {
  const [solvedClues, setSolvedClues] = useState(initialSolved);
  const [activeClue, setActiveClue] = useState(null);
  const [showComplete, setShowComplete] = useState(false);

  const handleSolve = (id) => {
    if (!solvedClues.includes(id)) {
      const next = [...solvedClues, id];
      setSolvedClues(next);
      if (next.length === CLUES.length) {
        setTimeout(() => setShowComplete(true), 1500);
      }
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #0f0726 0%, #060418 50%, #000 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Georgia', serif",
    }}>
      <StarField />
      <FloatingParticles count={20} />

      {/* Header */}
      <div style={{ textAlign: "center", paddingTop: "clamp(1.5rem, 4vw, 3rem)", position: "relative", zIndex: 5 }}>
        <div style={{
          display: "inline-flex",
          gap: 8,
          alignItems: "center",
          background: "rgba(255,215,0,0.1)",
          border: "1px solid rgba(255,215,0,0.3)",
          borderRadius: 20,
          padding: "6px 16px",
          marginBottom: "1rem",
        }}>
          <span style={{ color: "#FFD700", fontSize: "0.8rem", letterSpacing: "0.15em" }}>MINIONLAND TREASURE HUNT</span>
        </div>

        <h1 style={{
          fontSize: "clamp(1.8rem, 6vw, 3rem)",
          color: "white",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          textShadow: "0 0 40px rgba(255,215,0,0.3)",
        }}>
          The Royal Map 🗺️
        </h1>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
          {solvedClues.length} of {CLUES.length} clues solved
        </p>

        {/* Progress bar */}
        <div style={{
          width: "min(300px, 80vw)",
          margin: "1rem auto",
          height: 6,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 3,
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${(solvedClues.length / CLUES.length) * 100}%`,
            background: "linear-gradient(to right, #9B59B6, #FFD700)",
            borderRadius: 3,
            transition: "width 0.6s ease",
            boxShadow: "0 0 10px rgba(255,215,0,0.5)",
          }} />
        </div>
      </div>

      {/* Map */}
      <div style={{ padding: "1rem 1rem 2rem", position: "relative", zIndex: 5 }}>
        <TreasureMap solvedClues={solvedClues} onSelectClue={setActiveClue} />

        {/* Legend */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(0.8rem, 3vw, 1.5rem)",
          marginTop: "1rem",
          flexWrap: "wrap",
        }}>
          {[["🔒", "Locked", "rgba(255,255,255,0.3)"], ["✨", "Unlocked", "#FFD700"], ["✅", "Solved", "#1ABC9C"]].map(([icon, label, color]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: "1rem" }}>{icon}</span>
              <span style={{ color, fontSize: "0.8rem" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clue modal */}
      {activeClue && (
        <ClueModal
          clue={activeClue}
          isSolved={solvedClues.includes(activeClue.id)}
          onClose={() => setActiveClue(null)}
          onSolve={handleSolve}
        />
      )}

      {/* All complete overlay */}
      {showComplete && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.95)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
          animation: "fadeSlideUp 0.8s ease",
        }}>
          <StarField />
          <div style={{ textAlign: "center", position: "relative", zIndex: 5, padding: "2rem" }}>
            <div style={{ fontSize: "5rem", marginBottom: "1rem", animation: "bounce-gentle 2s infinite" }}>🏆</div>
            <h2 style={{
              color: "#FFD700",
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              fontFamily: "'Georgia', serif",
              textShadow: "0 0 40px rgba(255,215,0,0.6)",
              marginBottom: "1rem",
            }}>
              All clues solved!
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem", fontSize: "1.1rem" }}>
              The vault awaits, Your Majesty. Are you ready?
            </p>
            <button
              onClick={(e) => { handleButtonClick(e); onComplete(); }}
              style={{
                padding: "1rem 3rem",
                background: "linear-gradient(135deg, #FFD700, #F39C12)",
                border: "none",
                borderRadius: 50,
                color: "#0d0a2e",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
                animation: "pulse-glow 2s infinite",
                boxShadow: "0 0 40px rgba(255,215,0,0.5)",
              }}
            >
              Open the Vault 🚪✨
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.2); }
          50% { box-shadow: 0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.4); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

export default HuntPage;
