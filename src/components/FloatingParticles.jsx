import { useRef } from "react";

function FloatingParticles({ count = 30, colors = ["#FFD700", "#9B59B6", "#F39C12", "#1ABC9C", "#E74C3C"] }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      drift: (Math.random() - 0.5) * 40,
    }))
  ).current;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.6,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: `floatUp ${p.duration}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-120px) translateX(var(--drift, 20px)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default FloatingParticles;
