import { useEffect } from "react";

function VaultDoor({ isOpen, onAnimComplete }) {
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(onAnimComplete, 2000);
      return () => clearTimeout(t);
    }
  }, [isOpen, onAnimComplete]);

  return (
    <div style={{
      width: "min(280px, 70vw)",
      height: "min(360px, 80vw)",
      position: "relative",
      margin: "0 auto",
    }}>
      {/* Door frame */}
      <div style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #2C1810, #4A2C1A)",
        border: "6px solid #8B6914",
        borderRadius: 8,
        boxShadow: "0 0 40px rgba(139,105,20,0.5), inset 0 0 20px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
        transformOrigin: "left center",
        animation: isOpen ? "vaultOpen 1.5s ease-in-out forwards" : "none",
      }}>
        {/* Vault rings */}
        {[60, 80, 100].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: s + "%",
            height: s + "%",
            border: "3px solid rgba(139,105,20,0.5)",
            borderRadius: "50%",
          }} />
        ))}

        {/* Handle */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 60,
          height: 60,
          background: "radial-gradient(circle, #FFD700, #8B6914)",
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(255,215,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}>
          🔐
        </div>
      </div>

      {/* Golden light behind door */}
      {isOpen && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,215,0,0.8), transparent)",
          animation: "goldFlood 1.5s ease forwards",
          pointerEvents: "none",
        }} />
      )}
      
      <style>{`
        @keyframes vaultOpen {
          0% { transform: perspective(800px) rotateY(0deg); }
          100% { transform: perspective(800px) rotateY(-85deg); }
        }
        @keyframes goldFlood {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default VaultDoor;
