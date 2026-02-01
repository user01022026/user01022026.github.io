import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface ExplodingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
}

const HeartExplosion = () => {
  const [hearts, setHearts] = useState<ExplodingHeart[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(340, 82%, 52%)",
      "hsl(0, 84%, 60%)",
      "hsl(340, 82%, 65%)",
      "hsl(350, 100%, 70%)",
      "hsl(330, 100%, 75%)",
    ];

    const newHearts: ExplodingHeart[] = [];
    
    for (let i = 0; i < 50; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 15,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-fall"
          style={{
            left: `${heart.x}%`,
            top: `-${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <Heart
            size={heart.size}
            fill={heart.color}
            color={heart.color}
          />
        </div>
      ))}
    </div>
  );
};

export default HeartExplosion;
