// Utility for button click effects - sounds and visuals

export const playClickSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;
  
  // Create a harmonic two-note chime sound
  // First note - higher pitch
  const osc1 = audioContext.createOscillator();
  const gain1 = audioContext.createGain();
  
  osc1.connect(gain1);
  gain1.connect(audioContext.destination);
  
  osc1.frequency.setValueAtTime(1047, now); // C6 note
  gain1.gain.setValueAtTime(0.3, now);
  gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
  
  osc1.start(now);
  osc1.stop(now + 0.4);
  
  // Second note - lower pitch, starts after first
  const osc2 = audioContext.createOscillator();
  const gain2 = audioContext.createGain();
  
  osc2.connect(gain2);
  gain2.connect(audioContext.destination);
  
  osc2.frequency.setValueAtTime(784, now + 0.1); // G5 note
  gain2.gain.setValueAtTime(0, now + 0.1);
  gain2.gain.linearRampToValueAtTime(0.25, now + 0.15);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
  
  osc2.start(now + 0.1);
  osc2.stop(now + 0.5);
};

export const createClickSparkles = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div");
    sparkle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 8px;
      height: 8px;
      background: radial-gradient(circle, #FFD700, #F39C12);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
    `;
    
    const angle = (Math.PI * 2 * i) / 8;
    const velocity = 4 + Math.random() * 3;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(sparkle);
    
    let px = x, py = y;
    let lvx = vx, lvy = vy;
    const startTime = Date.now();
    const duration = 500;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      if (progress >= 1) {
        document.body.removeChild(sparkle);
        return;
      }
      
      px += lvx;
      py += lvy;
      lvy += 0.15; // gravity
      
      sparkle.style.left = px + "px";
      sparkle.style.top = py + "px";
      sparkle.style.opacity = 1 - progress;
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
};

export const createScreenFlash = () => {
  const flash = document.createElement("div");
  flash.style.cssText = `
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.4), transparent);
    pointer-events: none;
    z-index: 9998;
    animation: flashPulse 0.3s ease-out forwards;
  `;
  
  const style = document.createElement("style");
  style.textContent = `
    @keyframes flashPulse {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(flash);
  
  setTimeout(() => {
    document.body.removeChild(flash);
    document.head.removeChild(style);
  }, 300);
};

export const handleButtonClick = (event) => {
  createClickSparkles(event);
  createScreenFlash();
};
