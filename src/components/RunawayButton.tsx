import { useState, useRef, useCallback, useEffect } from "react";

interface RunawayButtonProps {
  children: React.ReactNode;
}

const RunawayButton = ({ children }: RunawayButtonProps) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [hasMoved, setHasMoved] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = useCallback(() => {
    const newX = Math.random() * 70 + 10;
    const newY = Math.random() * 70 + 10;
    
    setPosition({ x: newX, y: newY });
    setHasMoved(true);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    moveButton();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const button = buttonRef.current.getBoundingClientRect();
      const centerX = button.left + button.width / 2;
      const centerY = button.top + button.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      if (distance < 120) {
        moveButton();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [moveButton]);

  if (hasMoved) {
    return (
      <button
        ref={buttonRef}
        className="btn-no cursor-pointer select-none fixed z-50"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        onTouchStart={handleTouchStart}
        onClick={(e) => e.preventDefault()}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      className="btn-no cursor-pointer select-none"
      onMouseEnter={moveButton}
      onTouchStart={handleTouchStart}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
};

export default RunawayButton;
