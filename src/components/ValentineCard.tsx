import { useState } from "react";
import { Heart } from "lucide-react";
import FloatingHeart from "./FloatingHeart";
import RunawayButton from "./RunawayButton";
import LoveMessage from "./LoveMessage";

const ValentineCard = () => {
  const [showLove, setShowLove] = useState(false);

  // Generate random floating hearts
  const floatingHearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 30 + 15,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  if (showLove) {
    return <LoveMessage />;
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--gradient-romantic)" }}
    >
      {/* Floating background hearts */}
      {floatingHearts.map((heart) => (
        <FloatingHeart
          key={heart.id}
          size={heart.size}
          className={heart.id % 2 === 0 ? "animate-float" : "animate-float-reverse"}
          style={{
            left: heart.left,
            top: heart.top,
            opacity: heart.opacity,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            color: heart.id % 3 === 0 ? "hsl(0, 84%, 60%)" : "hsl(340, 82%, 65%)",
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Big heart icon */}
        <div className="flex justify-center mb-8">
          <Heart 
            size={100} 
            className="text-accent animate-pulse-heart drop-shadow-lg" 
            fill="currentColor"
          />
        </div>

        {/* Main question */}
        <h1 className="font-romantic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-12 leading-tight drop-shadow-sm">
          Do you want to be my Valentine, Minu?
        </h1>

        {/* Decorative hearts */}
        <div className="flex justify-center gap-3 mb-12">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              size={20}
              className="text-primary"
              fill="currentColor"
              style={{ opacity: 0.5 + i * 0.1 }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => setShowLove(true)}
            className="btn-valentine"
          >
            Ja! 💕
          </button>
          
          <RunawayButton>
            Nein 😢
          </RunawayButton>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 opacity-30">
        <Heart size={60} className="text-accent" fill="currentColor" />
      </div>
      <div className="absolute top-8 right-8 opacity-30">
        <Heart size={45} className="text-primary" fill="currentColor" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-30">
        <Heart size={50} className="text-primary" fill="currentColor" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-30">
        <Heart size={55} className="text-accent" fill="currentColor" />
      </div>
    </div>
  );
};

export default ValentineCard;
