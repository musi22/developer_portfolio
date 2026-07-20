"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode, MouseEvent, KeyboardEvent } from "react";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  maxTilt?: number;
  glare?: boolean;
  role?: string;
  tabIndex?: number;
  "aria-label"?: string;
}

export default function Tilt3D({
  children,
  className,
  onClick,
  onKeyDown,
  maxTilt = 10,
  glare = true,
  role,
  tabIndex,
  "aria-label": ariaLabel,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), springConfig);
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              transformPerspective: 900,
            }
      }
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
      {glare && !prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(34,211,238,0.14), transparent 60%)`
            ),
            transition: "opacity 0.3s ease",
            transform: "translateZ(1px)",
          }}
        />
      )}
    </motion.div>
  );
}
