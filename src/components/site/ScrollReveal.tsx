import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  amount?: number;
  as?: "div" | "li";
  axis?: "x" | "y";
  children: ReactNode;
  className?: string;
  delay?: number;
  exitDelay?: number;
  fromScale?: boolean;
  show: boolean;
  whileHover?: MotionProps["whileHover"];
};

export function ScrollReveal({
  amount = 28,
  as = "div",
  axis = "y",
  children,
  className,
  delay = 0,
  exitDelay = 0,
  fromScale = false,
  show,
  whileHover,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const canMove = !shouldReduceMotion;
  const hiddenX = axis === "x" && canMove ? amount : 0;
  const hiddenY = axis === "y" && canMove ? amount : 0;
  const hiddenScale = fromScale && canMove ? 0.92 : 1;
  const transition = show
    ? { duration: shouldReduceMotion ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] as const }
    : {
        duration: shouldReduceMotion ? 0 : 0.36,
        delay: exitDelay,
        ease: [0.4, 0, 0.2, 1] as const,
      };
  const props = {
    animate: show ? "visible" : "hidden",
    className,
    initial: "hidden",
    transition,
    variants: {
      hidden: { opacity: 0, scale: hiddenScale, x: hiddenX, y: hiddenY },
      visible: { opacity: 1, scale: 1, x: 0, y: 0 },
    },
    whileHover,
  };

  if (as === "li") {
    return <motion.li {...props}>{children}</motion.li>;
  }

  return <motion.div {...props}>{children}</motion.div>;
}
