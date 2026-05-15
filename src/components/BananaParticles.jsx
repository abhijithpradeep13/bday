import { motion } from "framer-motion";

export default function BananaParticles({ count = 15 }) {
  const bananas = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 6,
    size: Math.random() * 1.5 + 0.8,
    rotation: Math.random() * 360,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {bananas.map((b) => (
        <motion.div
          key={b.id}
          initial={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            opacity: 0,
            rotate: b.rotation,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            top: `${b.y - 120}%`,
            left: `${b.x + (Math.random() - 0.5) * 30}%`,
            rotate: [b.rotation, b.rotation + 720],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            fontSize: `${b.size * 24}px`,
            userSelect: "none",
            filter: "drop-shadow(0 0 2px rgba(255, 200, 50, 0.5))",
          }}
        >
          🍌
        </motion.div>
      ))}
    </div>
  );
}
