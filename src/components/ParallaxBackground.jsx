import { motion } from "framer-motion";

export default function ParallaxBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }}>
      {/* Far background - slowest */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 30%, rgba(255,215,0,0.1) 0%, transparent 50%)",
          zIndex: 1,
        }}
      />

      {/* Mid layer - medium speed */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 70% 60%, rgba(155,89,182,0.08) 0%, transparent 40%)",
          zIndex: 2,
        }}
      />

      {/* Floating lights */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [Math.sin(i) * 100, Math.cos(i) * 100],
            x: [Math.cos(i) * 100, Math.sin(i) * 100],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          style={{
            position: "absolute",
            width: 40 + i * 10,
            height: 40 + i * 10,
            borderRadius: "50%",
            background: [
              "rgba(255, 215, 0, 0.1)",
              "rgba(155, 89, 182, 0.1)",
              "rgba(26, 188, 156, 0.1)",
              "rgba(231, 76, 60, 0.1)",
              "rgba(243, 156, 18, 0.1)",
              "rgba(155, 89, 182, 0.1)",
              "rgba(26, 188, 156, 0.1)",
              "rgba(255, 215, 0, 0.1)",
            ][i],
            filter: "blur(30px)",
            left: `${(i % 3) * 30}%`,
            top: `${Math.floor(i / 3) * 40}%`,
          }}
        />
      ))}

      {/* Ambient light pulse */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
