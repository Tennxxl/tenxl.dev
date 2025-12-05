"use client"

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, className = '', speed = 10 }) => {
  return (
    <span 
      className={`shiny-text ${className}`}
      style={{ '--animation-duration': `${speed}s` } as React.CSSProperties}
      data-text={text}
    >
      {text}
    </span>
  );
};

export default ShinyText;

