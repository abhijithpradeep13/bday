import { motion } from "framer-motion";

export default function LightningEffect({ active = false }) {
  if (!active) return null;

  const strikes = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.3,
    x: Math.random() * 80 + 10,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 45 }}>
      {strikes.map((s) => (
        <motion.div
          key={s.id}
          animate={{
            opacity: [0, 0.8, 0, 0.6, 0],
            boxShadow: [
              "none",
              `inset 0 0 400px 200px rgba(255, 255, 255, 0.4), inset 0 0 80px 40px rgba(200, 200, 255, 0.3)`,
              "none",
              `inset 0 0 300px 150px rgba(255, 255, 255, 0.3)`,
              "none",
            ],
          }}
          transition={{
            duration: 0.6,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            zIndex: 45,
          }}
        />
      ))}

      {/* Screen flashes */}
      <motion.div
        animate={{
          opacity: [0, 0.3, 0, 0.2, 0],
        }}
        transition={{
          duration: 0.6,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeOut",
        }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(200, 200, 255, 0.1)",
          zIndex: 44,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
