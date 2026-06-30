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

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:hidden">
          {FEATURED_CUSTOMERS.map((c, i) => {
            const delay = 0.08 + i * 0.06;
            const exitDelay = (FEATURED_CUSTOMERS.length - 1 - i) * 0.02;

            return (
              <ScrollReveal
                key={c.name}
                show={isVisible}
                delay={delay}
                exitDelay={exitDelay}
                fromScale
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.16)" }}
                className="flex h-28 cursor-default flex-col items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-center shadow-soft backdrop-blur"
              >
                {c.logo && (
                  <span className="flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-white px-3 py-2">
                    <img
                      src={c.logo}
                      alt={`${c.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className={`max-h-8 w-auto max-w-full object-contain ${c.logoClassName ?? ""}`}
                    />
                  </span>
                )}
                {c.monogram && (
                  <span className="flex h-12 w-full items-center justify-center rounded-lg bg-white px-3 py-2 text-[#5b2f16]">
                    <span className="flex items-center gap-2">
                      <span className="font-display text-xl font-extrabold leading-none">
                        {c.monogram}
                      </span>
                      <span className="h-6 w-px bg-[#d6a75f]" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">
                        {c.label}
                      </span>
                    </span>
                  </span>
                )}
                <span className="text-xs font-semibold leading-tight text-white/90">{c.name}</span>
              </ScrollReveal>
            );
          })}
        </div>

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

        <ScrollReveal
          show={isVisible}
          delay={0.44}
          exitDelay={0.04}
          className="mx-auto mt-8 max-w-5xl lg:hidden"
        >
          <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {ADDITIONAL_CUSTOMERS.map((customer) => (
              <li
                key={customer.name}
                className="flex min-h-14 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] px-3 py-2 font-semibold leading-tight text-white/90"
              >
                {customer.logo && (
                  <span className="flex h-10 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white px-2 py-1.5">
                    <img
                      src={customer.logo}
                      alt={`${customer.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className={`max-h-7 w-auto max-w-full object-contain ${customer.logoClassName ?? ""}`}
                    />
                  </span>
                )}
                <span>{customer.name}</span>
              </li>
            ))}
          </ul>
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
