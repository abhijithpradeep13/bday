import { CLUES } from "../constants";
import { playClickSound, createClickSparkles } from "../utils/buttonEffects";

function TreasureMap({ solvedClues, onSelectClue }) {
  const nodes = CLUES.map((c) => ({
    ...c,
    unlocked: c.id === 1 || solvedClues.includes(c.id - 1),
    solved: solvedClues.includes(c.id),
  }));

  const mapW = 1300;
  const mapH = 520;
  const toX = (pct) => (pct / 100) * mapW;
  const toY = (pct) => (pct / 100) * mapH;

  const paths = [
    [nodes[0], nodes[1]],
    [nodes[1], nodes[2]],
    [nodes[2], nodes[3]],
    [nodes[3], nodes[4]],
  ];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 1430, margin: "0 auto" }}>
      <svg
        viewBox={`0 0 ${mapW} ${mapH}`}
        style={{ width: "100%", overflow: "visible" }}
      >
        {/* Map background texture */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Connecting wavy paths */}
        {paths.map(([from, to], i) => {
          const x1 = toX(from.nodePos.x) + 24;
          const y1 = toY(from.nodePos.y) + 24;
          const x2 = toX(to.nodePos.x) + 24;
          const y2 = toY(to.nodePos.y) + 24;
          
          // Create wavy path with multiple cubic Bézier curves
          const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const waveCount = 2;
          const waveHeight = 25;
          const segments = waveCount * 2;
          
          let pathData = `M ${x1} ${y1}`;
          
          for (let j = 0; j < segments; j++) {
            const t1 = j / segments;
            const t2 = (j + 1) / segments;
            
            const px1 = x1 + (x2 - x1) * t1;
            const py1 = y1 + (y2 - y1) * t1;
            const px2 = x1 + (x2 - x1) * t2;
            const py2 = y1 + (y2 - y1) * t2;
            
            const midT = (t1 + t2) / 2;
            const midX = x1 + (x2 - x1) * midT;
            const midY = y1 + (y2 - y1) * midT;
            
            // Perpendicular offset for wave
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const perpX = -dy / len;
            const perpY = dx / len;
            
            // Alternate wave direction
            const waveDir = j % 2 === 0 ? 1 : -1;
            const controlX = midX + perpX * waveHeight * waveDir;
            const controlY = midY + perpY * waveHeight * waveDir;
            
            pathData += ` C ${px1 + perpX * waveHeight * waveDir * 0.5} ${py1 + perpY * waveHeight * waveDir * 0.5}, ${controlX} ${controlY}, ${px2} ${py2}`;
          }
          
          const solved = from.solved;
          
          return (
            <path
              key={i}
              d={pathData}
              fill="none"
              stroke={solved ? "#FFD700" : "rgba(255,255,255,0.15)"}
              strokeWidth={solved ? 2.5 : 1.5}
              strokeDasharray={solved ? "none" : "6 4"}
              style={{
                filter: solved ? "drop-shadow(0 0 6px #FFD700)" : "none",
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const cx = toX(node.nodePos.x);
          const cy = toY(node.nodePos.y);
          return (
            <g
              key={node.id}
              transform={`translate(${cx}, ${cy})`}
              style={{ cursor: node.unlocked ? "pointer" : "default" }}
              onClick={(e) => {
                if (node.unlocked) {
                  playClickSound();
                  createClickSparkles({ currentTarget: e.target });
                  onSelectClue(node);
                }
              }}
            >
              {/* Outer glow ring */}
              {node.unlocked && (
                <circle
                  cx={24} cy={24} r={48}
                  fill="none"
                  stroke={node.solved ? "#FFD700" : node.color}
                  strokeWidth={1}
                  opacity={0.3}
                  style={{ animation: "pulse-ring 2s ease-in-out infinite" }}
                />
              )}

              {/* Main circle */}
              <circle
                cx={24} cy={24} r={33}
                fill={node.solved ? "#FFD70020" : node.unlocked ? `${node.color}20` : "rgba(30,20,60,0.8)"}
                stroke={node.solved ? "#FFD700" : node.unlocked ? node.color : "rgba(255,255,255,0.15)"}
                strokeWidth={node.solved || node.unlocked ? 2 : 1}
                filter={node.unlocked ? "url(#glow)" : "none"}
              />

              {/* Icon or lock */}
              <text
                x={24} y={36}
                textAnchor="middle"
                fontSize="30"
                style={{ userSelect: "none" }}
              >
                {node.solved ? "✅" : node.unlocked ? node.icon : "🔒"}
              </text>

              {/* Label */}
              <text
                x={24} y={69}
                textAnchor="middle"
                fill={node.solved ? "#FFD700" : node.unlocked ? "white" : "rgba(255,255,255,0.3)"}
                fontSize="14"
                fontWeight={node.unlocked ? "bold" : "normal"}
                style={{ fontFamily: "'Comic Neue', cursive" }}
              >
                {node.solved ? "Solved!" : node.unlocked ? `Clue ${node.id}` : "Locked"}
              </text>
            </g>
          );
        })}
      </svg>
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { r: 28; opacity: 0.3; }
          50% { r: 34; opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}

export default TreasureMap;
