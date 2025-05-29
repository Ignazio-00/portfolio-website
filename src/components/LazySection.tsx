import React, { ReactNode } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
  animationClass?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "100px",
  fallback,
  animationClass = "animate-fade-in-up",
}) => {
  const { elementRef, isVisible, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${className} ${
        hasIntersected ? animationClass : "opacity-0"
      } transition-all duration-700`}
    >
      {isVisible
        ? children
        : fallback || <div style={{ minHeight: "200px" }} />}
    </div>
  );
};

export default LazySection;
