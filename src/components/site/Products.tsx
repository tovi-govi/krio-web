import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { useRevealOnScroll } from "./useRevealOnScroll";
import { SceneCanvas } from "./three/SceneCanvas";
import { BottleModel } from "./three/BottleModel";
import bottle200mlUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_200ml.glb?url";
import bottle500mlUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_500ml.glb?url";
import bottle1LUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_1litre.glb?url";
import bottle2LUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_2litre.glb?url";
import bottle20LUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_20litre.glb?url";
import { motion, AnimatePresence } from "framer-motion";

const SIZES = [
  {
    size: "200 ml",
    use: "On-the-go sip",
    desc: "Perfect for events, offices, and single-serve hydration. Slim, convenient, and refreshing.",
    color: "#EAF6FF",
    accent: "#005CB9",
  },
  {
    size: "500 ml",
    use: "Everyday carry",
    desc: "The ideal personal bottle for daily use. Light enough for your bag, big enough to matter.",
    color: "#EAF6FF",
    accent: "#005CB9",
  },
  {
    size: "1 Litre",
    use: "Desk & travel",
    desc: "A balanced size for your workstation or travel bag. Keeps you hydrated through the day.",
    color: "#EAF6FF",
    accent: "#003B8F",
  },
  {
    size: "2 Litre",
    use: "Family table",
    desc: "Made for the dining table and family routines. Generous, affordable, always fresh.",
    color: "#F0FFF4",
    accent: "#67B346",
  },
  {
    size: "20 L Jar",
    use: "Home & office",
    desc: "Our flagship jar for homes and offices. Reliable supply for dispenser systems.",
    color: "#F0FFF4",
    accent: "#67B346",
  },
];

const BADGES = ["BIS compliant", "Advanced purification", "Safe packaging"];

type BottleModelOption = {
  model: string;
  scale: number;
  rotation: [number, number, number];
};

const MODEL_OPTIONS: BottleModelOption[] = [
  { model: bottle200mlUrl, scale: 0.24, rotation: [-1.25, 0, 0.04] },
  { model: bottle500mlUrl, scale: 0.32, rotation: [-1.3, 0, 0.06] },
  { model: bottle1LUrl, scale: 0.37, rotation: [-1.4, 0, 0.08] },
  { model: bottle2LUrl, scale: 0.37, rotation: [-1.18, 0, 0.1] },
  { model: bottle20LUrl, scale: 0.50, rotation: [-1.0, 0, 0.14] },
];

export function Products() {
  const { isVisible, ref } = useRevealOnScroll<HTMLElement>();
  const [active, setActive] = useState(2);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setActive((a) => (a - 1 + SIZES.length) % SIZES.length);
  };

  const next = () => {
    setDirection(1);
    setActive((a) => (a + 1) % SIZES.length);
  };

  const activateSize = (index: number) => {
    setDirection(index >= active ? 1 : -1);
    setActive(index);
  };

  return (
    <section ref={ref} id="products" className="relative overflow-hidden bg-background py-24">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
          <ScrollReveal show={isVisible}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our product range
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Pick the bottle that fits the day.
            </h2>
          </ScrollReveal>

          <ScrollReveal show={isVisible} delay={0.08} className="max-w-xl lg:justify-self-end">
            <p className="text-base leading-relaxed text-muted-foreground">
              From compact event bottles to daily family packs and office jars, every Krio-H2O size
              follows the same purification, packing and delivery standard.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <ScrollReveal show={isVisible} delay={0.1} exitDelay={0.06} axis="x" amount={-28}>
            <div className="relative min-h-[460px] overflow-hidden rounded-2xl border border-primary/15 bg-gradient-water shadow-card">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_25%,oklch(0.56_0.15_218/0.18),transparent)]" />
              <div className="relative h-full min-h-[460px] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: direction * 120 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 120 }}
                    transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                  >
                    <SceneCanvas className="relative h-full w-full" camera={{ position: [0, 0.7, 6], fov: 28 }}>
                      <BottleModel
                        modelUrl={MODEL_OPTIONS[active].model}
                        scale={MODEL_OPTIONS[active].scale}
                        rotation={MODEL_OPTIONS[active].rotation}
                      />
                    </SceneCanvas>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent p-6">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {BADGES.map((badge) => (
                      <div
                        key={badge}
                        className="flex min-h-12 items-center gap-2 rounded-xl border border-white/60 bg-card/85 px-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur"
                      >
                        <Check className="h-4 w-4 flex-none text-secondary" />
                        <span>{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal show={isVisible} delay={0.16} axis="x" amount={28}>
            <div className="flex h-full flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border bg-card p-6 shadow-card"
                  style={{ borderColor: `${SIZES[active].accent}35` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-[0.18em]"
                        style={{ color: SIZES[active].accent }}
                      >
                        {SIZES[active].use}
                      </div>
                      <div className="mt-2 font-display text-5xl font-extrabold tracking-tight text-foreground">
                        {SIZES[active].size}
                      </div>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: SIZES[active].color, color: SIZES[active].accent }}
                    >
                      Available
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {SIZES[active].desc}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Hyderabad & Telangana
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prev}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-accent"
                        aria-label="Previous product size"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={next}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-accent"
                        aria-label="Next product size"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <ul className="mt-4 grid flex-1 gap-2">
                {SIZES.map((size, i) => (
                  <motion.li key={size.size} whileHover={{ x: 3 }} className="list-none">
                    <button
                      type="button"
                      onClick={() => activateSize(i)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                        i === active
                          ? "border-primary/30 bg-primary/7 shadow-sm"
                          : "border-border bg-card/80 hover:border-secondary/30 hover:bg-card"
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className="font-display text-xl font-bold tabular-nums"
                          style={{ color: i === active ? SIZES[active].accent : "#cbd5e1" }}
                        >
                          0{i + 1}
                        </span>
                        <span>
                          <span className="block font-display text-base font-bold text-foreground">
                            {size.size}
                          </span>
                          <span className="block text-xs text-muted-foreground">{size.use}</span>
                        </span>
                      </span>

                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          i === active ? "bg-secondary" : "bg-border"
                        }`}
                        aria-hidden
                      />
                    </button>
                    {i === active ? (
                      <motion.div layoutId="active-size-line" className="mx-4 h-px bg-gradient-primary">
                        {null}
                      </motion.div>
                    ) : null}
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
