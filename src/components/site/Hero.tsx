import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Leaf, Droplets } from "lucide-react";
import heroBg from "@/assets/hero-bg.mp4";
import waterSplash from "@/assets/water-splash.jpg";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

// Animated wave SVG component
function AnimatedWave() {
  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-24 md:h-32">
        <motion.path
          initial={{
            d: "M0,60L60,65C120,70,240,80,360,80C480,80,600,70,720,64C840,58,960,58,1080,63C1200,68,1320,78,1380,83L1440,88L1440,120L0,120Z",
          }}
          animate={{
            d: [
              "M0,60L60,65C120,70,240,80,360,80C480,80,600,70,720,64C840,58,960,58,1080,63C1200,68,1320,78,1380,83L1440,88L1440,120L0,120Z",
              "M0,70L60,64C120,58,240,48,360,50C480,52,600,66,720,72C840,78,960,72,1080,65C1200,58,1320,54,1380,52L1440,50L1440,120L0,120Z",
              "M0,60L60,65C120,70,240,80,360,80C480,80,600,70,720,64C840,58,960,58,1080,63C1200,68,1320,78,1380,83L1440,88L1440,120L0,120Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          fill="white"
        />
      </svg>
    </div>
  );
}

// Floating droplets background
const FLOATING_DROPS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + i * 7.5}%`,
  delay: i * 0.4,
  duration: 3 + (i % 4),
  size: 4 + (i % 3) * 4,
}));

function FloatingDroplets() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {FLOATING_DROPS.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-blue-300/20 backdrop-blur-sm border border-blue-200/30"
          style={{
            left: d.left,
            bottom: "15%",
            width: d.size,
            height: d.size,
          }}
          animate={{ y: [0, -120, -240], opacity: [0, 0.7, 0], scale: [0.5, 1, 0.3] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const canUseVideo =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canUseVideo) return;
    const loadVideo = () => setShowVideo(true);
    const idleWindow = window as Window &
      typeof globalThis & {
        cancelIdleCallback?: (id: number) => void;
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      };
    const canUseIdleCallback = typeof idleWindow.requestIdleCallback === "function";
    const idleId = canUseIdleCallback
      ? idleWindow.requestIdleCallback?.(loadVideo, { timeout: 1200 })
      : window.setTimeout(loadVideo, 600);
    return () => {
      if (canUseIdleCallback && idleWindow.cancelIdleCallback && idleId !== undefined) {
        idleWindow.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) void video.play();
        else video.pause();
      },
      { threshold: 0.2 },
    );
    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0) void video.play();
    };
    observer.observe(video);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [showVideo]);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-24 min-h-screen">
      {/* Background image */}
      <img
        src={waterSplash}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />

      {/* Background video */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={waterSplash}
          disablePictureInPicture
          className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover md:block"
          aria-hidden
        >
          <source src={heroBg} type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/96 via-background/82 to-secondary/15" />

      {/* Water-inspired radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,oklch(0.56_0.15_218/0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_30%_60%,oklch(0.47_0.15_145/0.08),transparent)]" />

      {/* Floating droplets */}
      <FloatingDroplets />

      <motion.div
        style={{ opacity }}
        className="relative mx-auto max-w-7xl flex flex-col md:flex-row md:items-center gap-12 px-6 pb-32 pt-16 md:pt-24"
      >
        {/* Left: text */}
        <motion.div style={{ y: textY }}>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-background/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary backdrop-blur"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-secondary"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Wellness in every drop
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.22}
            className="mt-6 text-balance font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            Pure water.
            <br />
            <motion.span
              className="bg-gradient-primary bg-clip-text text-transparent inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              style={{ backgroundSize: "200% 200%" }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Honest promise.
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.36}
            className="mt-6 max-w-lg text-lg text-muted-foreground"
          >
            Krio-H₂O delivers clean, mineral-balanced drinking water across Telangana — from a
            single 200&nbsp;ml bottle to a 20&nbsp;L home jar. Hygienically packed, consistently
            tested, reliably delivered.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.48}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary shadow-glow hover:opacity-95 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
            >
              <a href="#contact">
                <span className="relative z-10 flex items-center gap-2">
                  Order water{" "}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/20 bg-background/75 backdrop-blur hover:border-secondary/40 hover:bg-accent/70 transition-all duration-300"
            >
              <a href="#products">Explore range</a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.6}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> BIS compliant
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-secondary" /> Eco-friendly packaging
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Droplets className="h-4 w-4 text-primary/60" /> Trusted by HDFC, LIC, Bajaj &amp;
              more
            </div>
          </motion.div>
        </motion.div>

        {/* Right: bubbles visual */}
      </motion.div>

      {/* Animated wave divider */}
      <AnimatedWave />
    </section>
  );
}
