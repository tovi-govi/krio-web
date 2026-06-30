import krioLogo from "@/assets/krio-logo.svg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-11 w-[52px] shrink-0 items-center justify-center">
        <img
          src={krioLogo}
          alt=""
          className="h-full w-full object-contain drop-shadow-sm"
          aria-hidden
        />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
        Krio-<span className="text-secondary">H</span>
        <sub className="text-[0.7em] text-secondary">2</sub>
        <span className="text-secondary">O</span>
      </span>
    </a>
  );
}
