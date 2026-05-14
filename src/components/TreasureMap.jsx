import { CLUES } from "../constants";

function TreasureMap({ solvedClues, onSelectClue }) {
  const nodes = CLUES.map((c) => ({
    ...c,
    unlocked: c.id === 1 || solvedClues.includes(c.id - 1),
    solved: solvedClues.includes(c.id),
  }));

  const mapW = 400;
  const mapH = 400;
  const toX = (pct) => (pct / 100) * mapW;
  const toY = (pct) => (pct / 100) * mapH;

  const paths = [
    [nodes[0], nodes[1]],
    [nodes[1], nodes[2]],
    [nodes[2], nodes[3]],
    [nodes[3], nodes[4]],
  ];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 420, margin: "0 auto" }}>
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

        {/* Connecting paths */}
        {paths.map(([from, to], i) => {
          const x1 = toX(from.nodePos.x) + 24;
          const y1 = toY(from.nodePos.y) + 24;
          const x2 = toX(to.nodePos.x) + 24;
          const y2 = toY(to.nodePos.y) + 24;
          const solved = from.solved;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
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
              onClick={() => node.unlocked && onSelectClue(node)}
            >
              {/* Outer glow ring */}
              {node.unlocked && (
                <circle
                  cx={24} cy={24} r={32}
                  fill="none"
                  stroke={node.solved ? "#FFD700" : node.color}
                  strokeWidth={1}
                  opacity={0.3}
                  style={{ animation: "pulse-ring 2s ease-in-out infinite" }}
                />
              )}

              {/* Main circle */}
              <circle
                cx={24} cy={24} r={22}
                fill={node.solved ? "#FFD70020" : node.unlocked ? `${node.color}20` : "rgba(30,20,60,0.8)"}
                stroke={node.solved ? "#FFD700" : node.unlocked ? node.color : "rgba(255,255,255,0.15)"}
                strokeWidth={node.solved || node.unlocked ? 2 : 1}
                filter={node.unlocked ? "url(#glow)" : "none"}
              />

              {/* Icon or lock */}
              <text
                x={24} y={30}
                textAnchor="middle"
                fontSize="20"
                style={{ userSelect: "none" }}
              >
                {node.solved ? "✅" : node.unlocked ? node.icon : "🔒"}
              </text>

              {/* Label */}
              <text
                x={24} y={54}
                textAnchor="middle"
                fill={node.solved ? "#FFD700" : node.unlocked ? "white" : "rgba(255,255,255,0.3)"}
                fontSize="9"
                fontWeight={node.unlocked ? "bold" : "normal"}
                style={{ fontFamily: "Georgia, serif" }}
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
