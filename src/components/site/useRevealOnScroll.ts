import { useEffect, useRef, useState } from "react";

export function useRevealOnScroll<T extends HTMLElement>(revealPoint = 0.78) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // A revealPoint of 0.78 means it triggers when the element enters 78% of the viewport from the top.
    // That means the bottom margin is -22% of the viewport height.
    const bottomMarginPercent = Math.round((1 - revealPoint) * 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once revealed, it stays revealed
        }
      },
      {
        rootMargin: `0px 0px -${bottomMarginPercent}% 0px`,
        threshold: 0,
      },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [revealPoint]);

  return { isVisible, ref };
}
