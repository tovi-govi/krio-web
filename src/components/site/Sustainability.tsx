import { motion } from "framer-motion";
import { Leaf, Recycle, Sun, Droplets } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useRevealOnScroll } from "./useRevealOnScroll";
import { SceneCanvas } from "./three/SceneCanvas";
import { Globe3D } from "./three/Globe3D";

const PILLARS = [
  {
    icon: Recycle,
    title: "Recyclable Packaging",
    body: "All bottles and jars are made from fully recyclable PET and HDPE plastics.",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    body: "Our purification process minimises water waste with efficient reverse osmosis systems.",
  },
  {
    icon: Sun,
    title: "Energy Conscious",
    body: "We continuously optimise our plant operations to reduce our carbon footprint.",
  },
  {
    icon: Leaf,
    title: "Green Commitment",
    body: "Every delivery is planned to reduce transportation emissions across Telangana.",
  },
];

export function Sustainability() {
  const { isVisible, ref } = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} id="sustainability" className="relative bg-background py-24 overflow-hidden">
      {/* Deep green radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_50%,oklch(0.47_0.15_145/0.07),transparent)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Globe 3D */}
          <ScrollReveal show={isVisible} axis="x" amount={-32}>
            <div className="relative">
              <motion.div
                className="absolute -inset-8 rounded-full bg-secondary/8 blur-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <SceneCanvas
                className="h-[400px] w-full"
                camera={{ position: [0, 0, 3.2], fov: 45 }}
              >
                <Globe3D />
              </SceneCanvas>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <ScrollReveal show={isVisible} axis="x" amount={32}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Our commitment
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Water today.
                <br />
                <span className="text-secondary">Planet tomorrow.</span>
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Sustainability isn't just a word for us — it's built into every step of our process.
                From eco-conscious packaging to energy-efficient purification, we're committed to
                protecting the planet that gives us water.
              </p>
            </ScrollReveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, body }, i) => (
                <ScrollReveal
                  key={title}
                  show={isVisible}
                  delay={0.1 + i * 0.08}
                  whileHover={{ y: -3 }}
                  className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-card group cursor-default"
                >
                  <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{title}</div>
                    <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{body}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
