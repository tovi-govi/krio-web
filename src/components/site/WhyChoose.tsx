import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useRevealOnScroll } from "./useRevealOnScroll";
import { SceneCanvas } from "./three/SceneCanvas";
import { DropletIcon3D, ShieldIcon3D, TruckIcon3D, HeadphonesIcon3D } from "./three/AnimatedIcons3D";

const FEATURES = [
  {
    Icon3D: DropletIcon3D,
    title: "Pure & Mineral Balanced",
    body: "Multi-stage purification keeps essential minerals intact for naturally great taste.",
    color: "#005CB9",
    accent: "primary",
  },
  {
    Icon3D: ShieldIcon3D,
    title: "Hygienic & Safe",
    body: "Sealed and packed in a sanitised environment — safety you can see and taste.",
    color: "#003B8F",
    accent: "primary",
  },
  {
    Icon3D: TruckIcon3D,
    title: "Consistent Quality",
    body: "Every batch meets strict BIS standards. No surprises, just clean water.",
    color: "#67B346",
    accent: "secondary",
  },
  {
    Icon3D: HeadphonesIcon3D,
    title: "Reliable Service",
    body: "On-time delivery and friendly customer support across Telangana.",
    color: "#67B346",
    accent: "secondary",
  },
];

export function WhyChoose() {
  const { isVisible, ref } = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} id="why" className="relative bg-gradient-water py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,oklch(0.56_0.15_218/0.06),transparent)]" />

      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal show={isVisible} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why choose Krio-H₂O
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Built around four
            <br /> non-negotiables.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ Icon3D, title, body, color }, i) => {
            const delay = 0.08 + i * 0.1;
            const exitDelay = (FEATURES.length - 1 - i) * 0.025;

            return (
              <ScrollReveal
                key={title}
                show={isVisible}
                delay={delay}
                exitDelay={exitDelay}
                whileHover={{ y: -8, boxShadow: "var(--shadow-glow)" }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 shadow-card cursor-default backdrop-blur"
              >
                {/* Glassmorphism tint */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent" />

                {/* 3D icon */}
                <div className="mb-2 h-24 w-full">
                  <SceneCanvas
                    className="h-full w-full"
                    camera={{ position: [0, 0, 1.8], fov: 50 }}
                  >
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[3, 4, 3]} intensity={2.5} color={color} />
                    <pointLight position={[-2, -1, 2]} intensity={0.8} color="#EAF6FF" />
                    <Icon3D />
                  </SceneCanvas>
                </div>

                <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>

                {/* Bottom accent line */}
                <div className="pointer-events-none absolute inset-x-6 bottom-0 h-[2px] rounded-t-full bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover ripple */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${color}15 0%, transparent 70%)`,
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
