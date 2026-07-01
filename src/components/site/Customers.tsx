import associateLogo from "@/assets/customers/associate.webp";
import androbimLogo from "@/assets/customers/androbim.svg";
import bajajLogo from "@/assets/customers/bajaj.svg";
import dilsukhnagarLogo from "@/assets/customers/Dilshuknagar ps.svg";
import digitLogo from "@/assets/customers/digit.svg";
import equitasLogo from "@/assets/customers/equitas.jpg";
import euronicsLogo from "@/assets/customers/euronics.svg";
import finsolLogo from "@/assets/customers/finsol.svg";
import hdfcLogo from "@/assets/customers/hdfc.svg";
import impulseLogo from "@/assets/customers/Impulse jr.svg";
import licLogo from "@/assets/customers/lic.svg";
import piramalFinanceLogo from "@/assets/customers/parimal finance.svg";
import pnbHousingLogo from "@/assets/customers/PNB housing.svg";
import ravindraBharathiLogo from "@/assets/customers/Ravindhra bharathi.svg";
import velocityLogo from "@/assets/customers/Velocity.svg";
import xiusLogo from "@/assets/customers/xius-logo.svg";
import { LogoLoop, type LogoItem } from "./LogoLoop";
import { ScrollReveal } from "./ScrollReveal";
import { useRevealOnScroll } from "./useRevealOnScroll";

type Customer = {
  name: string;
  logo?: string;
  logoClassName?: string;
  monogram?: string;
  label?: string;
};

const FEATURED_CUSTOMERS: Customer[] = [
  { name: "HDFC Bank", logo: hdfcLogo },
  { name: "Equitas Small Finance Bank", logo: equitasLogo, logoClassName: "scale-[2.4]" },
  { name: "Bajaj Home Finance", logo: bajajLogo },
  { name: "Digit Insurance", logo: digitLogo },
  { name: "LIC of India", logo: licLogo },
  { name: "DP Chocolates", monogram: "DP", label: "Chocolates" },
  { name: "Associated Projects Infra Pvt. Ltd.", logo: associateLogo },
];

const ADDITIONAL_CUSTOMERS: Customer[] = [
  { name: "Piramal Finance", logo: piramalFinanceLogo },
  { name: "Finsol", logo: finsolLogo },
  { name: "Euronics", logo: euronicsLogo },
  { name: "Velocity", logo: velocityLogo },
  { name: "Dilsukhnagar Public School", logo: dilsukhnagarLogo },
  { name: "Androbim Pvt. Ltd.", logo: androbimLogo },
  { name: "PNB Housing", logo: pnbHousingLogo },
  { name: "Impulse Jr. College", logo: impulseLogo },
  { name: "XIUS Corp Pvt. Ltd.", logo: xiusLogo },
  { name: "Ravindra Bharathi Schools", logo: ravindraBharathiLogo },
  { name: "Lani Health Care" },
  { name: "Anusha Properties LLP" },
  { name: "Air Dart Express" },
];

const TRUSTED_ORGANISATIONS = FEATURED_CUSTOMERS.length + ADDITIONAL_CUSTOMERS.length;

const CUSTOMER_LOGOS: LogoItem[] = [...FEATURED_CUSTOMERS, ...ADDITIONAL_CUSTOMERS]
  .filter((customer): customer is Customer & { logo: string } => Boolean(customer.logo))
  .map((customer) => ({
    alt: `${customer.name} logo`,
    className: customer.logoClassName,
    src: customer.logo,
    title: customer.name,
  }));

const STATS = [
  { v: `${TRUSTED_ORGANISATIONS}+`, l: "Trusted brands" },
  { v: "5", l: "Pack sizes" },
  { v: "100%", l: "BIS compliant" },
  { v: "24/7", l: "Customer care" },
];

export function Customers() {
  const { isVisible, ref } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={ref}
      id="customers"
      className="relative overflow-hidden border-y border-primary/10 bg-primary py-24 text-primary-foreground"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-95" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal show={isVisible} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
            Our key customers
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Serving trusted organisations
            <br /> across Telangana.
          </h2>
        </ScrollReveal>

        <ScrollReveal
          show={isVisible}
          delay={0.12}
          exitDelay={0.04}
          className="mx-auto mt-12 max-w-6xl overflow-hidden py-8 lg:hidden"
        >
          <LogoLoop
            logos={CUSTOMER_LOGOS}
            speed={50}
            direction="left"
            logoHeight={52}
            gap={28}
            hoverSpeed={14}
            scaleOnHover
            fadeOut
            fadeOutColor="#004c8f"
            ariaLabel="Customer logos"
            renderItem={(item) => {
              if (!("src" in item)) return null;

              return (
                <span className="flex h-16 w-36 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white px-3 py-2 shadow-soft">
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    title={item.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className={`max-h-10 w-auto max-w-full object-contain ${item.className ?? ""}`}
                  />
                </span>
              );
            }}
          />
        </ScrollReveal>

        <ScrollReveal
          show={isVisible}
          delay={0.12}
          exitDelay={0.04}
          className="mx-auto mt-12 hidden max-w-6xl overflow-hidden py-8 lg:block"
        >
          <LogoLoop
            logos={CUSTOMER_LOGOS}
            speed={72}
            direction="left"
            logoHeight={78}
            gap={42}
            hoverSpeed={18}
            scaleOnHover
            fadeOut
            fadeOutColor="#004c8f"
            ariaLabel="Customer logos"
            renderItem={(item) => {
              if (!("src" in item)) return null;

              return (
                <span className="flex h-24 w-52 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white px-5 py-4 shadow-soft">
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    title={item.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className={`max-h-14 w-auto max-w-full object-contain ${item.className ?? ""}`}
                  />
                </span>
              );
            }}
          />
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/10 sm:grid-cols-4">
          {STATS.map((s, i) => {
            const delay = 0.22 + i * 0.07;
            const exitDelay = (STATS.length - 1 - i) * 0.025;

            return (
              <ScrollReveal
                key={s.l}
                show={isVisible}
                delay={delay}
                exitDelay={exitDelay}
                fromScale
                className="bg-primary/35 px-6 py-8 text-center backdrop-blur"
              >
                <div className="font-display text-3xl font-extrabold md:text-4xl">{s.v}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
                  {s.l}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
