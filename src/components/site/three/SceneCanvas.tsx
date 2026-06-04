import { Suspense, lazy, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useIsMobile } from "@/hooks/use-mobile";

interface SceneCanvasProps {
  children: React.ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  shadows?: boolean;
}

export function SceneCanvas({
  children,
  className = "",
  camera = { position: [0, 0, 4], fov: 45 },
  shadows = false,
}: SceneCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // On small screens we avoid mounting a full WebGL canvas to save memory/battery.
  if (isMobile) {
    return <div ref={ref} className={className} aria-hidden />;
  }

  return (
    <div ref={ref} className={className}>
      {visible && (
        <Canvas
          camera={camera}
          shadows={shadows}
          dpr={[1, Math.min(window.devicePixelRatio, 1.2)]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      )}
    </div>
  );
}
