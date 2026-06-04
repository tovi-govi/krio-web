import { ScrollReveal } from "./ScrollReveal";
import { useRevealOnScroll } from "./useRevealOnScroll";
import { SceneCanvas } from "./three/SceneCanvas";
import { EyeIcon3D, TargetIcon3D } from "./three/AnimatedIcons3D";
import { motion } from "framer-motion";

export function About() {
  const { isVisible, ref } = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} id="about" className="bg-background py-24 overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-start">
        <ScrollReveal show={isVisible}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About us</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            A simple promise:
            <br />
            <span className="text-muted-foreground">water you can trust.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Krio-H₂O is committed to delivering safe, high-quality drinking water with a focus on
            reliability, hygiene and sustainability. We pair advanced multi-stage purification with
            strict quality standards — so every drop that reaches you stays pure and refreshing.
          </p>

          {/* Impact stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { val: "10+", label: "Brands served" },
              { val: "5", label: "Pack sizes" },
              { val: "100%", label: "BIS compliant" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="rounded-xl border border-border bg-card p-4 text-center shadow-card"
              >
                <div className="font-display text-2xl font-extrabold text-primary">{s.val}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid gap-6">
          <ScrollReveal
            show={isVisible}
            delay={0.12}
            exitDelay={0.04}
            whileHover={{ y: -4, boxShadow: "var(--shadow-glow)" }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card overflow-hidden relative group"
          >
            {/* 3D eye icon */}
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 flex-none">
                <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 2], fov: 45 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[3, 3, 3]} intensity={2} color="#005CB9" />
                  <EyeIcon3D />
                </SceneCanvas>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-display text-lg font-bold text-foreground">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To become a trusted leader in drinking water solutions across Telangana and beyond.
                </p>
              </div>
            </div>
            {/* hover shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ transform: "skewX(-15deg)" }}
            />
          </ScrollReveal>

          <ScrollReveal
            show={isVisible}
            delay={0.24}
            whileHover={{ y: -4, boxShadow: "var(--shadow-glow)" }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card overflow-hidden relative group"
          >
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 flex-none">
                <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 2], fov: 45 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[3, 3, 3]} intensity={2} color="#67B346" />
                  <TargetIcon3D />
                </SceneCanvas>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-display text-lg font-bold text-foreground">Our Mission</h3>
                <ul className="mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {[
                    "Provide safe and pure drinking water",
                    "Maintain high-quality standards",
                    "Ensure reliable, timely supply",
                    "Promote eco-friendly practices",
                  ].map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-secondary" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ transform: "skewX(-15deg)" }}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
