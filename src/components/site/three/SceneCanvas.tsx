import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";

const GL_PROPS = { antialias: true, alpha: true, powerPreference: "high-performance" as const };
const CANVAS_STYLE = { background: "transparent" };
const DPR: [number, number] = [1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)];

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
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShouldRender(entry.isIntersecting),
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stable camera reference — only recreate if props actually change
  const stableCamera = useMemo(() => camera, [camera?.position?.[0], camera?.position?.[1], camera?.position?.[2], camera?.fov]);

  return (
    <div ref={ref} className={className}>
      {shouldRender && (
        <Canvas
          camera={stableCamera}
          shadows={shadows}
          frameloop="always"
          dpr={DPR}
          gl={GL_PROPS}
          style={CANVAS_STYLE}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      )}
    </div>
  );
}
