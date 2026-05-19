import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StarField from "./StarField";
import FloatingParticles from "./FloatingParticles";

const lines = [
  "In the year 2025...",
  "Far far away in minionland....",
  "There took place a coronation of a Great Queen.",
  "Let's see the story of the reign of that great queen....",
];

export default function StoryIntro({ onComplete }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | waiting | fading | transitioning

  const currentLine = lines[currentLineIndex];
  const typingSpeed = 100; // milliseconds per character

  // Typewriter effect - continuously type each character
  useEffect(() => {
    if (phase !== "typing" || displayedText === currentLine) {
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + currentLine[prev.length]);
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, currentLine, phase]);

  // When typing completes, transition to waiting phase
  useEffect(() => {
    if (phase === "typing" && displayedText === currentLine) {
      setPhase("waiting");
    }
  }, [displayedText, currentLine, phase]);

  // After waiting, start fading
  useEffect(() => {
    if (phase === "waiting") {
      const waitTimer = setTimeout(() => {
        setPhase("fading");
      }, 1000); // Wait 1 second after typing completes

      return () => clearTimeout(waitTimer);
    }
  }, [phase]);

  // When fading is complete, move to next line or finish
  useEffect(() => {
    if (phase === "fading") {
      const fadeTimer = setTimeout(() => {
        if (currentLineIndex < lines.length - 1) {
          // Move to next line
          setCurrentLineIndex((prev) => prev + 1);
          setDisplayedText("");
          setPhase("typing");
        } else {
          // All lines complete
          onComplete();
        }
      }, 500); // Fade out duration

      return () => clearTimeout(fadeTimer);
    }
  }, [phase, currentLineIndex, onComplete]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #0f0726 0%, #060418 50%, #000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      {/* Star Field Background */}
      <StarField />
      
      {/* Floating Particles Background */}
      <FloatingParticles count={20} />

      {/* Center Text Container */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          maxWidth: "800px",
        }}
        animate={{
          opacity: phase === "fading" ? 0 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#FFD700",
            lineHeight: "1.5",
            textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
            letterSpacing: "1px",
            minHeight: "100px",
          }}
        >
          {displayedText}
          {phase === "typing" && displayedText !== currentLine && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ marginLeft: "4px" }}
            >
              |
            </motion.span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
