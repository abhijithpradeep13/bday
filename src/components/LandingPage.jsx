import { useState, useEffect } from "react";
import { STORY_SCENES } from "../constants";
import StarField from "./StarField";
import FloatingParticles from "./FloatingParticles";

function LandingPage({ onStart }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentScene < STORY_SCENES.length - 1) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrentScene((s) => s + 1);
          setVisible(true);
        }, 500);
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowButton(true), 800);
      return () => clearTimeout(timer);
    }
  }, [currentScene]);

  const scene = STORY_SCENES[currentScene];

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #0d0a2e 0%, #060418 60%, #000 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Georgia', serif",
    }}>
      <StarField />
      <FloatingParticles />

      {/* Progress dots */}
      <div style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
        {STORY_SCENES.map((_, i) => (
          <div key={i} style={{
            width: i === currentScene ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: i === currentScene ? scene.color : "rgba(255,255,255,0.2)",
            transition: "all 0.4s ease",
            boxShadow: i === currentScene ? `0 0 10px ${scene.color}` : "none",
          }} />
        ))}
      </div>

      {/* Scene content */}
      <div style={{
        textAlign: "center",
        padding: "2rem",
        maxWidth: 600,
        position: "relative",
        zIndex: 5,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s ease",
      }}>
        {/* Emoji with glow */}
        <div style={{
          fontSize: "clamp(64px, 15vw, 100px)",
          marginBottom: "1.5rem",
          filter: `drop-shadow(0 0 30px ${scene.color}80)`,
          animation: "bounce-gentle 3s ease-in-out infinite",
          display: "block",
        }}>
          {scene.emoji}
        </div>

        {/* Decorative line */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem", justifyContent: "center" }}>
          <div style={{ height: 1, width: 40, background: `linear-gradient(to right, transparent, ${scene.color})` }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: scene.color, boxShadow: `0 0 10px ${scene.color}` }} />
          <div style={{ height: 1, width: 40, background: `linear-gradient(to left, transparent, ${scene.color})` }} />
        </div>

        <h1 style={{
          fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
          fontWeight: "bold",
          color: scene.color,
          marginBottom: "1rem",
          textShadow: `0 0 30px ${scene.color}60`,
          lineHeight: 1.3,
        }}>
          {scene.title}
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 3vw, 1.2rem)",
          color: "rgba(255,255,255,0.8)",
          lineHeight: 1.8,
          fontStyle: "italic",
        }}>
          {scene.text}
        </p>

        {/* Final scene button */}
        {scene.final && showButton && (
          <div style={{ marginTop: "3rem", animation: "fadeSlideUp 0.8s ease forwards" }}>
            <button
              onClick={onStart}
              style={{
                padding: "1rem 2.5rem",
                fontSize: "1.2rem",
                fontFamily: "'Georgia', serif",
                fontWeight: "bold",
                color: "#0d0a2e",
                background: "linear-gradient(135deg, #FFD700, #F39C12)",
                border: "none",
                borderRadius: 50,
                cursor: "pointer",
                animation: "pulse-glow 2s ease-in-out infinite",
                boxShadow: "0 0 40px rgba(255,215,0,0.5)",
                transition: "transform 0.2s ease",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              Begin Treasure Hunt 🗺️
            </button>

            <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "1rem", fontSize: "0.85rem" }}>
              Five clues await, Your Majesty
            </p>
          </div>
        )}
      </div>

      {/* Skip button */}
      {!scene.final && (
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => {
              setCurrentScene(STORY_SCENES.length - 1);
              setVisible(true);
            }, 400);
          }}
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            padding: "0.5rem 1rem",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20,
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontSize: "0.8rem",
            zIndex: 10,
          }}
        >
          Skip intro →
        </button>
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

export default LandingPage;
