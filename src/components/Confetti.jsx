import { motion } from "framer-motion";

export default function Confetti({ burst = false }) {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.3,
    duration: Math.random() * 2 + 2.5,
    angle: Math.random() * 360,
    distance: Math.random() * 150 + 100,
    size: Math.random() * 6 + 4,
    type: ["🎉", "🎊", "🎈", "✨", "⭐"][Math.floor(Math.random() * 5)],
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 100 }}>
      {confettiPieces.map((p) => {
        const xDist = Math.cos((p.angle * Math.PI) / 180) * p.distance;
        const yDist = Math.sin((p.angle * Math.PI) / 180) * p.distance;

        return (
          <motion.div
            key={p.id}
            initial={{
              left: "50%",
              top: "50%",
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              left: `calc(50% + ${xDist}px)`,
              top: `calc(50% + ${yDist}px)`,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 360 * 2],
              y: yDist * 0.5,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
            }}
            style={{
              position: "fixed",
              fontSize: p.size,
              filter: "drop-shadow(0 0 2px rgba(255,200,50,0.7))",
            }}
          >
            {p.type}
          </motion.div>
        );
      })}
    </div>
  );
}
