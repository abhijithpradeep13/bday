import { useState } from "react";
import { handleButtonClick } from "../utils/buttonEffects";

function ClueModal({ clue, onClose, onSolve, isSolved }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showReward, setShowReward] = useState(isSolved);
  const [shake, setShake] = useState(false);

  const errorMessages = [
    "❌ Even the bananas are disappointed.",
    "❌ The minions are confused.",
    "❌ Incorrect. Try again, Your Majesty.",
    "❌ The storm is laughing at us right now.",
    "❌ Kevin says no. Kevin is rarely wrong.",
  ];

  const handleSubmit = () => {
    const normalized = input.trim().toLowerCase();
    if (normalized === clue.answer.toLowerCase()) {
      setShowReward(true);
      setError("");
      onSolve(clue.id);
    } else {
      setShake(true);
      setError(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "1rem",
      animation: "fadeSlideUp 0.3s ease",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #0d0a2e 0%, #1a0f3e 100%)",
        border: `2px solid ${clue.color}40`,
        borderRadius: 24,
        padding: "clamp(1.5rem, 4vw, 2.5rem)",
        maxWidth: 520,
        width: "100%",
        position: "relative",
        boxShadow: `0 0 60px ${clue.color}30`,
        animation: "scaleIn 0.3s ease",
      }}>
        {/* Close */}
        <button onClick={(e) => { handleButtonClick(e); onClose(); }} style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "rgba(255,255,255,0.1)",
          border: "none",
          borderRadius: "50%",
          width: 32,
          height: 32,
          color: "white",
          cursor: "pointer",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
        onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
        >✕</button>

        {!showReward ? (
          <>
            {/* Level badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${clue.color}20`,
              border: `1px solid ${clue.color}40`,
              borderRadius: 20,
              padding: "4px 14px",
              marginBottom: "1.5rem",
            }}>
              <span style={{ fontSize: "1.2rem" }}>{clue.icon}</span>
              <span style={{ color: clue.color, fontSize: "0.85rem", fontWeight: "bold", letterSpacing: "0.1em" }}>
                CLUE {clue.id} OF 5
              </span>
            </div>

            <h2 style={{
              color: "white",
              fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
              lineHeight: 1.5,
              marginBottom: "1rem",
              fontFamily: "'Comic Neue', cursive",
            }}>
              {clue.question}
            </h2>

            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: "1.5rem", fontStyle: "italic" }}>
              💡 Hint: {clue.hint}
            </p>

            <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Your answer..."
                style={{
                  padding: "0.9rem 1.2rem",
                  borderRadius: 12,
                  border: `2px solid ${shake ? "#E74C3C" : `${clue.color}40`}`,
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  fontFamily: "'Comic Neue', cursive",
                  transition: "border-color 0.2s ease",
                  animation: shake ? "shakeX 0.4s ease" : "none",
                }}
                autoFocus
              />
              <button
                onClick={(e) => { handleButtonClick(e); handleSubmit(); }}
                style={{
                  padding: "0.9rem",
                  borderRadius: 12,
                  border: "none",
                  background: `linear-gradient(135deg, ${clue.color}, ${clue.color}aa)`,
                  color: "#0d0a2e",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontFamily: "'Comic Neue', cursive",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.opacity = "0.85"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                Submit Answer ✨
              </button>
            </div>

            {error && (
              <p style={{
                marginTop: "1rem",
                color: "#E74C3C",
                fontSize: "0.9rem",
                textAlign: "center",
                animation: "fadeSlideUp 0.3s ease",
              }}>
                {error}
              </p>
            )}
          </>
        ) : (
          // Reward view
          <div style={{ textAlign: "center", animation: "fadeSlideUp 0.5s ease" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem", animation: "bounce-gentle 2s ease-in-out infinite" }}>
              🎉
            </div>
            <h2 style={{
              color: clue.color,
              fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
              fontFamily: "'Comic Neue', cursive",
              marginBottom: "1rem",
              textShadow: `0 0 20px ${clue.color}60`,
            }}>
              {clue.rewardTitle}
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.8,
              fontSize: "1rem",
              fontStyle: "italic",
              marginBottom: "2rem",
            }}>
              {clue.rewardText}
            </p>
            <button
              onClick={(e) => { handleButtonClick(e); onClose(); }}
              style={{
                padding: "0.8rem 2rem",
                borderRadius: 50,
                border: `2px solid ${clue.color}`,
                background: "transparent",
                color: clue.color,
                cursor: "pointer",
                fontSize: "1rem",
                fontFamily: "'Comic Neue', cursive",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.target.style.background = clue.color; e.target.style.color = "#0d0a2e"; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = clue.color; }}
            >
              {isSolved || clue.id === 5 ? "Return to Map ✨" : "Onward! →"}
            </button>
          </div>
        )}
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
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

export default ClueModal;
