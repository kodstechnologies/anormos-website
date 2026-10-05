import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function PageTransitionLoader() {
  const [isMounted, setIsMounted] = useState(false);
  const isNavigating = useRouterState({
    select: (state) => state.status === "pending",
  });
  useEffect(() => setIsMounted(true), []);
  const isActive = isMounted && isNavigating;

  return (
    <div
      className={`page-transition-loader ${isActive ? "is-active" : ""}`}
      aria-hidden={!isActive}
      aria-label="Loading page"
      role="status"
    >
      <span className="page-transition-mark" aria-hidden="true" />
    </div>
  );
}