import { motion } from "framer-motion";

export default function MagicalExplosion({ x = 50, y = 50, color = "#FFD700", trigger = false }) {
  const explosionParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * Math.PI * 2,
    distance: Math.random() * 200 + 100,
    delay: Math.random() * 0.1,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 60 }}>
      {/* Center burst */}
      {trigger && (
        <>
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: `${x}%`,
              top: `${y}%`,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: color,
              filter: `blur(20px)`,
              transform: "translate(-50%, -50%)",
              zIndex: 60,
            }}
          />

          {/* Shockwave ring */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: `${x}%`,
              top: `${y}%`,
              width: 150,
              height: 150,
              borderRadius: "50%",
              border: `3px solid ${color}`,
              transform: "translate(-50%, -50%)",
              zIndex: 59,
            }}
          />

          {/* Particles */}
          {explosionParticles.map((p) => {
            const xDist = Math.cos(p.angle) * p.distance;
            const yDist = Math.sin(p.angle) * p.distance;

            return (
              <motion.div
                key={p.id}
                initial={{
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  left: `calc(${x}% + ${xDist}px)`,
                  top: `calc(${y}% + ${yDist}px)`,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: p.delay,
                  ease: "easeOut",
                }}
                style={{
                  position: "fixed",
                  fontSize: "1.2rem",
                  filter: "drop-shadow(0 0 5px rgba(255,215,0,0.8))",
                }}
              >
                ✨
              </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
}
