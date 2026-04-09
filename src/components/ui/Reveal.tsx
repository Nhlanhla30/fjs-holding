"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const directions = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { x: 32, y: 0 },
    right: { x: -32, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={
        hasAnimated
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...directions[direction] }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
