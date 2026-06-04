import { useEffect, useRef, useState } from "react";

export function useRevealOnScroll<T extends HTMLElement>(revealPoint = 0.78) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastVisible = false;

    const update = () => {
      frame = 0;

      if (!ref.current) {
        return;
      }

      const top = ref.current.getBoundingClientRect().top;
      const revealLine = window.innerHeight * revealPoint;
      let nextVisible = lastVisible;

      if (!lastVisible && top <= revealLine) {
        nextVisible = true;
      }


      if (nextVisible !== lastVisible) {
        lastVisible = nextVisible;
        setIsVisible(nextVisible);
      }
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [revealPoint]);

  return { isVisible, ref };
}
