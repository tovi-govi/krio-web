import { Logo } from "./Logo";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Logo />
          <p className="text-sm italic text-muted-foreground">
            "Every drop we deliver is a promise of health &amp; trust."
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/permalink.php?story_fbid=pfbid082rmj4QgQUXEq1YKdQJsmuEbCF89qryoqBmjJ2vxRj9hsnoZr58zK8o1dqjZyDJcl&id=61550982209611"
            target="_blank"
            rel="noreferrer"
            aria-label="Krio-H₂O on Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-soft"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/krio_h2o"
            target="_blank"
            rel="noreferrer"
            aria-label="Krio-H₂O on Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-soft"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Krio-H₂O. Hayathnagar, Hyderabad.
        </p>
      </div>
    </footer>
  );
}
