import { useMemo, useState } from "react";
import {
  Building2,
  Check,
  Droplets,
  FlaskConical,
  ShieldCheck,
  ThumbsUp,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useRevealOnScroll } from "./useRevealOnScroll";

const SAFE_PARAMETERS = [
  "Lead not detectable",
  "Arsenic not detectable",
  "Mercury not detectable",
  "Pesticides not detectable",
  "Coliform bacteria absent",
  "Salmonella absent",
  "Vibrio cholerae absent",
  "Total plate count within limit",
];

const RESULTS = [
  {
    key: "ph",
    label: "PH",
    value: "7.03",
    note: "Balanced for everyday drinking",
    icon: Droplets,
    accent: "primary",
  },
  {
    key: "tds",
    label: "TDS",
    value: "85 mg/L",
    note: "Light mineral profile with clean taste",
    icon: FlaskConical,
    accent: "primary",
  },
  {
    key: "coliform",
    label: "Total coliform",
    value: "Absent",
    note: "Microbiological safety checked",
    icon: ShieldCheck,
    accent: "secondary",
  },
  {
    key: "ecoli",
    label: "E. coli",
    value: "Absent",
    note: "Batch tested before dispatch",
    icon: FlaskConical,
    accent: "secondary",
  },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Safe for families" },
  { icon: Building2, label: "Ideal for offices" },
  { icon: Droplets, label: "Trusted quality" },
  { icon: Truck, label: "Hygienically packed" },
  { icon: ThumbsUp, label: "Refreshing taste" },
];

export function QualityCheck() {
  const { isVisible, ref } = useRevealOnScroll<HTMLElement>();
  const [activeKey, setActiveKey] = useState(RESULTS[0].key);
  const activeResult = useMemo(
    () => RESULTS.find((result) => result.key === activeKey) ?? RESULTS[0],
    [activeKey],
  );
  const ActiveIcon = activeResult.icon;

  return (
    <section ref={ref} id="quality" className="relative overflow-hidden bg-gradient-water py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_80%_20%,oklch(0.56_0.15_218/0.10),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_12%_92%,oklch(0.47_0.15_145/0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal show={isVisible} className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Quality promise
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Lab-checked water,
            <br />
            <span className="text-muted-foreground">ready for daily trust.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_1.45fr]">
          <ScrollReveal
            show={isVisible}
            delay={0.08}
            axis="x"
            amount={-24}
            className="relative overflow-hidden rounded-2xl border border-secondary/25 bg-card/90 p-5 shadow-card backdrop-blur"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-soft">
                <FlaskConical className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Tested safe parameters
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                  As per FSSR 2.10.8 standards
                </h3>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {SAFE_PARAMETERS.map((parameter, index) => (
                <motion.div
                  key={parameter}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.14 + index * 0.035, duration: 0.35 }}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-primary/15 bg-muted/65 px-3 text-sm text-foreground"
                >
                  <Check className="h-4 w-4 flex-none text-secondary" />
                  <span>{parameter}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal
            show={isVisible}
            delay={0.14}
            axis="x"
            amount={24}
            className="grid gap-5 rounded-2xl border border-primary/20 bg-card/65 p-5 shadow-card backdrop-blur lg:grid-cols-[0.95fr_1fr]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Key quality results
              </p>
              <h3 className="mt-3 max-w-sm font-display text-3xl font-bold leading-tight text-foreground">
                Tap a result to inspect the promise.
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {RESULTS.map((result) => {
                  const Icon = result.icon;
                  const selected = result.key === activeKey;

                  return (
                    <button
                      key={result.key}
                      type="button"
                      onClick={() => setActiveKey(result.key)}
                      className={`min-h-24 rounded-xl border p-3 text-left shadow-sm transition-all duration-200 ${
                        selected
                          ? "border-primary bg-primary text-primary-foreground shadow-glow"
                          : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-primary/25"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <div className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] opacity-80">
                        {result.label}
                      </div>
                      <div className="mt-1 font-display text-lg font-extrabold">{result.value}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.div
              key={activeResult.key}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28 }}
              className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-white/70 bg-background/80 p-6 text-center shadow-soft"
            >
              <span
                className={`flex h-24 w-24 items-center justify-center rounded-full ${
                  activeResult.accent === "secondary"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <ActiveIcon className="h-11 w-11" />
              </span>
              <p
                className={`mt-6 text-xs font-semibold uppercase tracking-[0.22em] ${
                  activeResult.accent === "secondary" ? "text-secondary" : "text-primary"
                }`}
              >
                {activeResult.label}
              </p>
              <div className="mt-2 font-display text-5xl font-extrabold tracking-tight text-foreground">
                {activeResult.value}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{activeResult.note}</p>
            </motion.div>
          </ScrollReveal>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST_POINTS.map(({ icon: Icon, label }, index) => (
            <ScrollReveal
              key={label}
              show={isVisible}
              delay={0.18 + index * 0.04}
              whileHover={{ y: -3, boxShadow: "var(--shadow-card)" }}
              className="flex min-h-20 items-center gap-3 rounded-2xl border border-primary/15 bg-card/90 px-5 shadow-card backdrop-blur"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-secondary/12 text-secondary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-semibold text-foreground">{label}</span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
