import React from "react";

export default function FluidSurface({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  function follow(event: React.PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const surface = event.currentTarget;
    const rect = surface.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width)
    );
    const y = Math.max(
      0,
      Math.min(1, (event.clientY - rect.top) / rect.height)
    );
    surface.style.setProperty("--pointer-x", `${x * 100}%`);
    surface.style.setProperty("--pointer-y", `${y * 100}%`);
    surface.style.setProperty("--drift-x", `${(x - 0.5) * 22}px`);
    surface.style.setProperty("--drift-y", `${(y - 0.5) * 18}px`);
  }
  function reset(event: React.PointerEvent<HTMLDivElement>) {
    const surface = event.currentTarget;
    surface.style.setProperty("--pointer-x", "50%");
    surface.style.setProperty("--pointer-y", "50%");
    surface.style.setProperty("--drift-x", "0px");
    surface.style.setProperty("--drift-y", "0px");
  }
  return (
    <div
      className={`fluid-surface ${className}`}
      onPointerMove={follow}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}
