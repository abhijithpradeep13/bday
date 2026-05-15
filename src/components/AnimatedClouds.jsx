import { motion } from "framer-motion";

export default function AnimatedClouds({ count = 5, color = "rgba(255,255,255,0.1)" }) {
  const clouds = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 30,
    delay: i * 0.5,
    duration: 40 + Math.random() * 20,
    size: Math.random() * 40 + 50,
    opacity: Math.random() * 0.4 + 0.2,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          initial={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            opacity: 0,
          }}
          animate={{
            left: ["100%", "-20%"],
            opacity: [0, c.opacity, c.opacity, 0],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: c.size,
            height: c.size / 2,
          }}
        >
          <svg viewBox="0 0 100 50" style={{ width: "100%", height: "100%" }}>
            <defs>
              <radialGradient id={`cloud-grad-${c.id}`} cx="50%" cy="30%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </radialGradient>
            </defs>

            {/* Cloud shapes */}
            <circle cx="15" cy="30" r="18" fill={`url(#cloud-grad-${c.id})`} />
            <circle cx="35" cy="20" r="25" fill={`url(#cloud-grad-${c.id})`} />
            <circle cx="65" cy="25" r="22" fill={`url(#cloud-grad-${c.id})`} />
            <circle cx="85" cy="32" r="18" fill={`url(#cloud-grad-${c.id})`} />

            {/* Connecting blob */}
            <ellipse cx="50" cy="38" rx="35" ry="12" fill={`url(#cloud-grad-${c.id})`} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
