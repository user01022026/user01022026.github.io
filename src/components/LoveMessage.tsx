import { Heart } from "lucide-react";
import HeartExplosion from "./HeartExplosion";

const LoveMessage = () => {
  return (
    <>
      <HeartExplosion />
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-background/80 backdrop-blur-sm">
        <div className="text-center animate-bounce-in">
          <div className="flex justify-center mb-6">
            <Heart 
              size={80} 
              className="text-accent animate-pulse-heart" 
              fill="currentColor"
            />
          </div>
          <h1 className="font-romantic text-5xl md:text-7xl text-primary mb-4">
            Ich liebe dich, Minu!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Du machst mich zum glücklichsten Menschen der Welt 💕
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                size={24}
                className="text-primary animate-pulse-heart"
                style={{ animationDelay: `${i * 0.2}s` }}
                fill="currentColor"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoveMessage;
