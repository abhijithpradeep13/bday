import { useEffect, useState } from "react";
import minion1 from "../assets/minion1.png";
import minion2 from "../assets/minion2.png";
import minion3 from "../assets/minion3.png";
import minion4 from "../assets/minion4.png";
import minion5 from "../assets/minion5.png";

const minionImages = [minion1, minion2, minion3, minion4, minion5];

function FloatingImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Generate random floating images
    const floatingImages = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      image: minionImages[i % minionImages.length],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 40 + 60, // Between 60-100px
      duration: Math.random() * 6 + 8, // Between 8-14s
      delay: Math.random() * 2,
      opacity: Math.random() * 0.3 + 0.2, // Between 0.2-0.5
    }));
    setImages(floatingImages);
  }, []);

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden", zIndex: 1 }}>
      <style>{`
        @keyframes float-drift {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: ${images[0]?.opacity || 0.3};
          }
          25% {
            transform: translateY(-40px) translateX(20px) rotate(90deg);
            opacity: ${images[0]?.opacity || 0.3};
          }
          50% {
            transform: translateY(-60px) translateX(-30px) rotate(180deg);
            opacity: ${images[0]?.opacity || 0.3};
          }
          75% {
            transform: translateY(-40px) translateX(40px) rotate(270deg);
            opacity: ${images[0]?.opacity || 0.3};
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(360deg);
            opacity: ${images[0]?.opacity || 0.3};
          }
        }
        
        .floating-image {
          position: absolute;
          object-fit: contain;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.3));
        }
      `}</style>
      
      {images.map((img) => (
        <img
          key={img.id}
          src={img.image}
          alt="floating minion"
          className="floating-image"
          style={{
            left: `${img.left}%`,
            top: `${img.top}%`,
            width: img.size,
            height: img.size,
            transform: "translate(-50%, -50%)",
            opacity: img.opacity,
            animation: `float-drift ${img.duration}s ease-in-out ${img.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default FloatingImages;
