import { motion } from "framer-motion";

export default function CartoonMinion({ x = 0, y = 0, size = 60, delay = 0, action = "idle" }) {
  const minionVariants = {
    idle: {
      y: [0, -8, 0],
      rotate: [0, 1, -1, 0],
      transition: { duration: 3, delay, repeat: Infinity, ease: "easeInOut" },
    },
    wave: {
      rotate: [0, 5, 10, 5, 0],
      transition: { duration: 1.5, delay, repeat: Infinity, ease: "easeInOut" },
    },
    celebrate: {
      y: [0, -20, 0],
      rotate: [0, -10, 10, -5, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 0.8, delay, repeat: Infinity, ease: "easeInOut" },
    },
    panic: {
      x: [0, -5, 5, -5, 0],
      y: [0, -3, 0, -3, 0],
      transition: { duration: 0.5, delay, repeat: Infinity, ease: "easeInOut" },
    },
    bounce: {
      y: [0, -12, 0],
      transition: { duration: 0.6, delay, repeat: Infinity, ease: "easeOut" },
    },
  };

  const currentVariant = minionVariants[action] || minionVariants.idle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, ...currentVariant }}
      exit={{ opacity: 0, scale: 0.5 }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        perspective: 1000,
      }}
    >
      {/* Body */}
      <svg viewBox="0 0 40 60" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE135" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="goggleGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E90FF" stopOpacity="0.7" />
          </radialGradient>
          <filter id="minion-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main body cylinder */}
        <ellipse cx="20" cy="28" rx="14" ry="18" fill="url(#bodyGradient)" filter="url(#minion-shadow)" />

        {/* Head */}
        <circle cx="20" cy="18" r="10" fill="url(#bodyGradient)" />

        {/* Left goggle */}
        <circle cx="15" cy="16" r="5" fill="url(#goggleGradient)" opacity="0.9" />
        <circle cx="15" cy="16" r="4.5" fill="none" stroke="#333" strokeWidth="0.5" />
        <circle cx="14" cy="15" r="1.5" fill="white" opacity="0.7" />

        {/* Right goggle */}
        <circle cx="25" cy="16" r="5" fill="url(#goggleGradient)" opacity="0.9" />
        <circle cx="25" cy="16" r="4.5" fill="none" stroke="#333" strokeWidth="0.5" />
        <circle cx="24" cy="15" r="1.5" fill="white" opacity="0.7" />

        {/* Goggle connector */}
        <line x1="20" y1="14" x2="20" y2="16" stroke="#333" strokeWidth="0.5" />

        {/* Smile */}
        <path
          d="M 18 20 Q 20 21 22 20"
          stroke="#333"
          strokeWidth="0.7"
          fill="none"
          strokeLinecap="round"
        />

        {/* Left arm */}
        <rect x="6" y="25" width="4" height="12" rx="2" fill="url(#bodyGradient)" />
        <circle cx="8" cy="37" r="2.5" fill="url(#bodyGradient)" />

        {/* Right arm */}
        <rect x="30" y="25" width="4" height="12" rx="2" fill="url(#bodyGradient)" />
        <circle cx="32" cy="37" r="2.5" fill="url(#bodyGradient)" />

        {/* Left leg */}
        <rect x="12" y="45" width="4" height="12" rx="2" fill="url(#bodyGradient)" />
        <circle cx="14" cy="57" r="2.5" fill="url(#bodyGradient)" />

        {/* Right leg */}
        <rect x="24" y="45" width="4" height="12" rx="2" fill="url(#bodyGradient)" />
        <circle cx="26" cy="57" r="2.5" fill="url(#bodyGradient)" />

        {/* Overalls strap left */}
        <rect x="8" y="26" width="1.5" height="16" fill="#333" opacity="0.4" />

        {/* Overalls strap right */}
        <rect x="30.5" y="26" width="1.5" height="16" fill="#333" opacity="0.4" />

        {/* Overall pocket detail */}
        <rect x="18" y="32" width="4" height="5" fill="none" stroke="#333" strokeWidth="0.5" opacity="0.3" />
      </svg>

      {/* Floating glow */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 10px rgba(255, 225, 53, 0.3)",
            "0 0 20px rgba(255, 225, 53, 0.6)",
            "0 0 10px rgba(255, 225, 53, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}
