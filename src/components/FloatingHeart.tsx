import { Heart } from "lucide-react";

interface FloatingHeartProps {
  style?: React.CSSProperties;
  size?: number;
  className?: string;
  filled?: boolean;
}

const FloatingHeart = ({ style, size = 24, className = "", filled = true }: FloatingHeartProps) => {
  return (
    <Heart
      size={size}
      className={`absolute text-primary ${className}`}
      style={style}
      fill={filled ? "currentColor" : "none"}
      strokeWidth={filled ? 0 : 2}
    />
  );
};

export default FloatingHeart;
