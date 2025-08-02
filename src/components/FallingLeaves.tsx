// src/components/FallingLeaves.tsx
import React, { useEffect, useState } from "react";

const FallingLeaves = ({ count = 30 }) => {
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map(() => ({
      id: crypto.randomUUID(),
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      size: 16 + Math.random() * 24,
      rotate: Math.random() * 360,
      opacity: 0.4 + Math.random() * 0.6,
    }));
    setLeaves(generated);
  }, [count]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute animate-fall"
          style={{
            left: `${leaf.left}%`,
            animationDuration: `${leaf.animationDuration}s`,
            animationDelay: `${leaf.delay}s`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            opacity: leaf.opacity,
            transform: `rotate(${leaf.rotate}deg)`,
          }}
        >
          <div className="w-full h-full text-pink-400 text-xl">
            🌸
          </div>
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
