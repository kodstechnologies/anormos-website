import { geoGraticule10, geoOrthographic, geoPath, type GeoProjection } from "d3-geo";
import { useEffect, useRef } from "react";
import world from "@/data/world.json";

export type Office = {
  id: "bengaluru" | "dubai" | "kuwait";
  city: string;
  country: string;
  region: string;
  coordinates: string;
  lat: number;
  lon: number;
  timeZone: string;
  address: string[];
  phone: string;
};

export const offices: Office[] = [
  { id: "bengaluru", city: "Bengaluru", country: "India", region: "South Asia", coordinates: "12.9141° N · 77.5206° E", lat: 12.9141, lon: 77.5206, timeZone: "Asia/Kolkata", address: ["46, BEML Layout, RR Nagar", "Bengaluru, Karnataka 560098"], phone: "+91 63 64 63 63 60" },
  { id: "dubai", city: "Dubai", country: "UAE", region: "Middle East", coordinates: "25.1585° N · 55.2972° E", lat: 25.1585, lon: 55.2972, timeZone: "Asia/Dubai", address: ["Al Meydan Road, Nad Al Sheba", "P.O. Box 9305, Dubai, UAE"], phone: "+91 99166 55166" },
  { id: "kuwait", city: "Kuwait City", country: "Kuwait", region: "Middle East", coordinates: "29.0825° N · 48.1303° E", lat: 29.0825, lon: 48.1303, timeZone: "Asia/Kuwait", address: ["Naife Al Dabbous, Fahaheel, 4th Floor", "P.O. Box 46009, Kuwait"], phone: "+965 996 996 40" },
];

export const defaultOffice: Office = offices[0] ?? { id: "bengaluru", city: "Bengaluru", country: "India", region: "South Asia", coordinates: "12.9141° N · 77.5206° E", lat: 12.9141, lon: 77.5206, timeZone: "Asia/Kolkata", address: ["46, BEML Layout, RR Nagar", "Bengaluru, Karnataka 560098"], phone: "+91 63 64 63 63 60" };

type WorldData = GeoJSON.FeatureCollection<GeoJSON.Geometry>;

function shortestTurn(current: number, target: number) {
  return current + ((((target - current) % 360) + 540) % 360) - 180;
}

function visibleOnGlobe(projection: GeoProjection, office: Office) {
  const rotation = projection.rotate();
  const lambda = (office.lon + rotation[0]) * Math.PI / 180;
  const phi = office.lat * Math.PI / 180;
  const centerPhi = -rotation[1] * Math.PI / 180;
  return Math.sin(phi) * Math.sin(centerPhi) + Math.cos(phi) * Math.cos(centerPhi) * Math.cos(lambda) > 0;
}

export function ContactGlobe({ selectedId, onSelect }: { selectedId: Office["id"]; onSelect: (id: Office["id"]) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedRef = useRef(selectedId);
  const onSelectRef = useRef(onSelect);

  selectedRef.current = selectedId;
  onSelectRef.current = onSelect;

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const projection = geoOrthographic().clipAngle(90).precision(0.25);
    const path = geoPath(projection, context);
    const sphere = { type: "Sphere" } as const;
    const graticule = geoGraticule10();
    let width = 0;
    let height = 0;
    let radius = 0;
    let frame = 0;
    let previous = performance.now();
    let lastInteraction = previous;
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let startRotation: [number, number, number] = [0, 0, 0];
    let focusedId: Office["id"] | null = selectedRef.current;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(width * 0.42, height * 0.41, 330);
      projection.translate([width / 2, height / 2]).scale(radius);
    };

    const drawMarker = (office: Office) => {
      if (!visibleOnGlobe(projection, office)) return;
      const position = projection([office.lon, office.lat]);
      if (!position) return;
      const [x, y] = position;
      const selected = selectedRef.current === office.id;
      const pulse = 0.5 + Math.sin(performance.now() / 360) * 0.5;

      if (selected) {
        context.beginPath();
        context.arc(x, y, 13 + pulse * 5, 0, Math.PI * 2);
        context.strokeStyle = `rgba(116, 232, 220, ${0.42 - pulse * 0.18})`;
        context.lineWidth = 1.25;
        context.stroke();
      }

      context.beginPath();
      context.arc(x, y, selected ? 5.5 : 4, 0, Math.PI * 2);
      context.fillStyle = "rgb(128, 239, 226)";
      context.shadowColor = "rgba(128, 239, 226, .9)";
      context.shadowBlur = selected ? 18 : 10;
      context.fill();
      context.shadowBlur = 0;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      context.save();
      context.beginPath();
      path(sphere);
      const ocean = context.createRadialGradient(width * 0.42, height * 0.34, radius * 0.08, width / 2, height / 2, radius);
      ocean.addColorStop(0, "rgb(24, 48, 57)");
      ocean.addColorStop(0.62, "rgb(9, 25, 33)");
      ocean.addColorStop(1, "rgb(3, 11, 17)");
      context.fillStyle = ocean;
      context.fill();
      context.clip();

      context.beginPath();
      path(graticule);
      context.strokeStyle = "rgba(178, 215, 218, .13)";
      context.lineWidth = 0.65;
      context.stroke();

      context.beginPath();
      path(world as WorldData);
      context.fillStyle = "rgb(102, 132, 137)";
      context.fill();
      context.strokeStyle = "rgba(218, 235, 233, .52)";
      context.lineWidth = 0.62;
      context.stroke();

      const shine = context.createLinearGradient(width * 0.22, height * 0.18, width * 0.72, height * 0.8);
      shine.addColorStop(0, "rgba(255, 255, 255, .11)");
      shine.addColorStop(0.42, "rgba(255, 255, 255, 0)");
      shine.addColorStop(1, "rgba(0, 0, 0, .24)");
      context.fillStyle = shine;
      context.fillRect(width / 2 - radius, height / 2 - radius, radius * 2, radius * 2);
      context.restore();

      context.beginPath();
      path(sphere);
      context.strokeStyle = "rgba(206, 233, 232, .38)";
      context.lineWidth = 1;
      context.stroke();

      offices.forEach(drawMarker);
    };

    const tick = (time: number) => {
      const delta = Math.min((time - previous) / 1000, 0.05);
      previous = time;
      const selected = offices.find((office) => office.id === selectedRef.current) ?? defaultOffice;
      const rotation = projection.rotate();

      if (!dragging && focusedId !== selectedRef.current) {
        focusedId = selectedRef.current;
        lastInteraction = time;
      }

      if (!dragging && time - lastInteraction < 3600) {
        const targetLon = shortestTurn(rotation[0], -selected.lon);
        const targetLat = Math.max(-55, Math.min(55, -selected.lat));
        const ease = 1 - Math.exp(-4.5 * delta);
        projection.rotate([
          rotation[0] + (targetLon - rotation[0]) * ease,
          rotation[1] + (targetLat - rotation[1]) * ease,
          0,
        ]);
      } else if (!dragging) {
        projection.rotate([rotation[0] + delta * 2.4, rotation[1], 0]);
      }

      draw();
      frame = requestAnimationFrame(tick);
    };

    const pointerDown = (event: PointerEvent) => {
      dragging = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      const rotation = projection.rotate();
      startRotation = [rotation[0], rotation[1], rotation[2]];
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const pointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      moved ||= Math.abs(dx) + Math.abs(dy) > 4;
      projection.rotate([
        startRotation[0] + dx * 0.28,
        Math.max(-75, Math.min(75, startRotation[1] - dy * 0.28)),
        0,
      ]);
    };

    const pointerUp = (event: PointerEvent) => {
      dragging = false;
      lastInteraction = performance.now();
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      if (moved) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const closest = offices
        .filter((office) => visibleOnGlobe(projection, office))
        .map((office) => ({ office, position: projection([office.lon, office.lat]) }))
        .filter((item): item is { office: Office; position: [number, number] } => Array.isArray(item.position))
        .map((item) => ({ office: item.office, distance: Math.hypot(item.position[0] - x, item.position[1] - y) }))
        .sort((a, b) => a.distance - b.distance)[0];
      if (closest && closest.distance < 28) onSelectRef.current(closest.office.id);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] size-full touch-none cursor-grab" aria-label="Rotating Earth showing Anormos offices in Bengaluru, Dubai, and Kuwait City" />;
}