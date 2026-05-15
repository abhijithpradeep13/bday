import { motion } from "framer-motion";

export default function SparkleEffect({ x = 50, y = 50, count = 12, color = "#FFD700" }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i / count) * Math.PI * 2,
    delay: Math.random() * 0.2,
  }));

  return (
    <div style={{ position: "fixed", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 50 }}>
      {sparkles.map((s) => {
        const distance = 80;
        const xOffset = Math.cos(s.angle) * distance;
        const yOffset = Math.sin(s.angle) * distance;

        return (
          <motion.div
            key={s.id}
            initial={{
              left: `${x}%`,
              top: `${y}%`,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              left: `calc(${x}% + ${xOffset}px)`,
              top: `calc(${y}% + ${yOffset}px)`,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: s.delay,
              ease: "easeOut",
            }}
            style={{
              position: "fixed",
              fontSize: "1.2rem",
            }}
          >
            ✨
          </motion.div>
        );
      })}
    </div>
  );
}
