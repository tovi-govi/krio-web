import { MapPin, Phone, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import splash from "@/assets/water-splash.jpg";

export function Contact() {
  return (
    <section id="contact" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:grid-cols-5">
          <div className="relative hidden lg:col-span-2 lg:block">
            <img
              src={splash}
              alt="Fresh water pouring into a glass"
              width={1280}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 via-primary/10 to-transparent" />
          </div>

          <div className="p-8 sm:p-12 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Get in touch
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Order water,
              <br /> any size, anytime.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Call us to schedule a one-time delivery or set up a regular subscription for your
              home, office or event.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ContactRow icon={<MapPin className="h-4 w-4" />} label="Hayathnagar, Hyderabad" />
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label="9666 049 292"
                href="tel:9666049292"
              />
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label="9666 049 898"
                href="tel:9666049898"
              />
              <ContactRow
                icon={<Globe className="h-4 w-4" />}
                label="krioh2o.com"
                href="https://krioh2o.com"
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                <a href="tel:9666049292">
                  Call to order <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-secondary/25 hover:border-secondary/45 hover:bg-accent/70"
              >
                <a href="https://wa.me/919666049292" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const Comp: any = href ? "a" : "div";
  return (
    <Comp
      href={href}
      className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-secondary/35 hover:text-secondary"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
        {icon}
      </span>
      {label}
    </Comp>
  );
}
