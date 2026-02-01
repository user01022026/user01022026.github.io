import { useState, useRef, useCallback, useEffect } from "react";

interface RunawayButtonProps {
  children: React.ReactNode;
}

const RunawayButton = ({ children }: RunawayButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = useCallback(() => {
    if (!buttonRef.current || !containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();
    
    const maxX = window.innerWidth - button.width - 40;
    const maxY = window.innerHeight - button.height - 40;
    
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    // Ensure button stays visible
    newX = Math.max(20, Math.min(newX, maxX));
    newY = Math.max(20, Math.min(newY, maxY));
    
    // Calculate offset from original position
    const originalRect = containerRef.current.getBoundingClientRect();
    const offsetX = newX - originalRect.left;
    const offsetY = newY - originalRect.top;
    
    setPosition({ x: offsetX, y: offsetY });
  }, []);

  const handleMouseEnter = () => {
    moveButton();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    moveButton();
  };

  // Also move on mouse getting close
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const button = buttonRef.current.getBoundingClientRect();
      const centerX = button.left + button.width / 2;
      const centerY = button.top + button.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      // Move if mouse is within 100px
      if (distance < 100) {
        moveButton();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [moveButton]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        className="btn-no cursor-pointer select-none"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          position: position.x !== 0 || position.y !== 0 ? "fixed" : "relative",
          left: position.x !== 0 || position.y !== 0 ? 0 : undefined,
          top: position.x !== 0 || position.y !== 0 ? 0 : undefined,
          zIndex: 100,
        }}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
        onClick={(e) => e.preventDefault()}
      >
        {children}
      </button>
    </div>
  );
};

export default RunawayButton;
