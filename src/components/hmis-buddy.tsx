import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, X } from "lucide-react";

export type TourStep = {
  /** value of the data-tour attribute of the element to explain; omit for a floating step */
  target?: string;
  title: string;
  text: string;
};

type Props = { steps: TourStep[]; accent: string; roleLabel: string; guideName?: string; topInset?: number };

type Box = { top: number; left: number; width: number; height: number };

const CARD_W = 340;
const GAP = 18;

export function HmisBuddy({ steps, accent, roleLabel, guideName = "Ora", topInset = 96 }: Props) {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [talking, setTalking] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [box, setBox] = useState<Box | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number; side: "left" | "right" | "below" }>({ top: 120, left: 40, side: "right" });
  const advance = useRef<number | null>(null);

  const current = steps[Math.min(step, steps.length - 1)];
  const line = current?.text ?? "";

  useEffect(() => { setStep(0); setPlaying(true); }, [steps]);

  /* locate + follow the highlighted element */
  const measure = useCallback(() => {
    const key = current?.target;
    if (!key) { setBox(null); return; }
    const el = document.querySelector<HTMLElement>(`[data-tour="${key}"]`);
    if (!el) { setBox(null); return; }
    const r = el.getBoundingClientRect();
    const visibleTop = Math.max(topInset, r.top);
    const visibleBottom = Math.min(window.innerHeight - 12, r.bottom);
    if (visibleBottom <= visibleTop) { setBox(null); return; }
    setBox({ top: visibleTop, left: r.left, width: r.width, height: visibleBottom - visibleTop });
  }, [current?.target, topInset]);

  useLayoutEffect(() => {
    if (!open) return;
    const key = current?.target;
    const el = key ? document.querySelector<HTMLElement>(`[data-tour="${key}"]`) : null;
    if (el) {
      const r = el.getBoundingClientRect();
      const needsScroll = r.top < topInset + 12 || r.bottom > window.innerHeight - 80;
      if (needsScroll) {
        const targetTop = window.scrollY + r.top - topInset - 20;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
      }
    }
    measure();
    const id = window.setTimeout(measure, 450);
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, [open, step, measure, current?.target, topInset]);

  /* place the speech card next to the highlight */
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const narrow = vw < 900;
    if (!box || narrow) {
      setPos({ top: vh - 260, left: Math.max(12, vw - CARD_W - 90), side: "right" });
      return;
    }
    const spaceRight = vw - (box.left + box.width);
    let side: "left" | "right" | "below" = "right";
    let left = box.left + box.width + GAP + 70;
    if (spaceRight < CARD_W + 110) {
      if (box.left > CARD_W + 110) { side = "left"; left = box.left - CARD_W - GAP - 70; }
      else { side = "below"; left = Math.min(Math.max(12, box.left), vw - CARD_W - 90); }
    }
    const rawTop = side === "below" ? box.top + box.height + GAP : box.top + box.height / 2 - 90;
    const top = Math.min(Math.max(topInset + 12, rawTop), vh - 240);
    setPos({ top, left, side });
  }, [box, topInset]);

  /* typewriter */
  useEffect(() => {
    if (!open) return;
    setTyped("");
    setTalking(true);
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setTyped(line.slice(0, index));
      if (index >= line.length) { window.clearInterval(id); setTalking(false); }
    }, 16);
    return () => window.clearInterval(id);
  }, [line, open]);

  /* auto-advance */
  useEffect(() => {
    if (!open || talking || !playing) return;
    if (step >= steps.length - 1) return;
    advance.current = window.setTimeout(() => setStep((s) => s + 1), 3600);
    return () => { if (advance.current) window.clearTimeout(advance.current); };
  }, [talking, open, playing, step, steps.length]);

  if (!open) {
    return (
      <button
        type="button" onClick={() => { setOpen(true); setStep(0); setPlaying(true); }}
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full px-4 py-3 text-[11px] font-medium text-white shadow-xl"
        style={{ background: accent }}
      >
        <BuddyFace accent="#ffffff" talking={false} size={22} /> Ask {guideName} to tour the dashboard
      </button>
    );
  }

  return (
    <>
      {/* highlight ring over the feature being explained */}
      {box && (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[55] rounded-xl transition-all duration-500 ease-out"
          style={{
            top: box.top - 8, left: box.left - 8, width: box.width + 16, height: box.height + 16,
            border: `2px solid ${accent}`,
            boxShadow: `0 0 0 9999px rgba(8,14,24,.42), 0 0 28px ${accent}80`,
          }}
        />
      )}

      {/* Ora + speech card, travelling to the highlighted feature */}
      <div
        className="pointer-events-none fixed z-[60] flex items-start gap-3 transition-all duration-500 ease-out"
        style={{ top: pos.top, left: pos.left, width: CARD_W + 78 }}
      >
        {pos.side === "left" && <SpeechCard {...{ current, typed, talking, accent, roleLabel, guideName, step, steps, setStep, playing, setPlaying, setOpen }} />}
        <div className="mt-6 shrink-0 animate-[hmis-buddy-float_3.4s_ease-in-out_infinite]">
          <BuddyFace accent={accent} talking={talking} size={66} />
        </div>
        {pos.side !== "left" && <SpeechCard {...{ current, typed, talking, accent, roleLabel, guideName, step, steps, setStep, playing, setPlaying, setOpen }} />}
      </div>
    </>
  );
}

function SpeechCard({
  current, typed, talking, accent, roleLabel, guideName, step, steps, setStep, playing, setPlaying, setOpen,
}: {
  current: TourStep | undefined; typed: string; talking: boolean; accent: string; roleLabel: string; guideName: string;
  step: number; steps: TourStep[]; setStep: (fn: (s: number) => number) => void;
  playing: boolean; setPlaying: (fn: (p: boolean) => boolean) => void; setOpen: (v: boolean) => void;
}) {
  return (
    <div className="pointer-events-auto relative w-[min(78vw,340px)] rounded-2xl border border-hmis-line bg-white p-4 shadow-2xl">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[9px] uppercase tracking-[0.18em]" style={{ color: accent }}>
          {guideName} · guiding {roleLabel}
        </span>
        <button type="button" aria-label="Close guide" onClick={() => setOpen(false)} className="text-black/35 hover:text-black">
          <X className="size-3.5" />
        </button>
      </div>
      <p className="mt-2 text-[13px] font-semibold text-hmis-ink">{current?.title}</p>
      <p className="mt-1.5 min-h-[72px] text-[12.5px] leading-relaxed text-black/70">
        {typed}
        {talking && <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse align-middle" style={{ background: accent }} />}
      </p>
      <div className="mt-3 flex items-center justify-between border-t border-hmis-line pt-3">
        <span className="text-[10px] text-black/40">{step + 1} / {steps.length}</span>
        <div className="flex items-center gap-1">
          <button type="button" aria-label={playing ? "Pause tour" : "Play tour"} onClick={() => setPlaying((p) => !p)}
            className="grid size-7 place-items-center rounded-md border border-hmis-line text-black/50">
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
          <button type="button" aria-label="Previous" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="grid size-7 place-items-center rounded-md border border-hmis-line text-black/50 disabled:opacity-30">
            <ChevronLeft className="size-3.5" />
          </button>
          {step >= steps.length - 1 ? (
            <button type="button" aria-label="Replay tour" onClick={() => setStep(() => 0)}
              className="grid size-7 place-items-center rounded-md border border-hmis-line text-black/50">
              <RotateCcw className="size-3.5" />
            </button>
          ) : (
            <button type="button" aria-label="Next" onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className="grid size-7 place-items-center rounded-md text-white" style={{ background: accent }}>
              <ChevronRight className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function BuddyFace({ accent, talking, size }: { accent: string; talking: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <radialGradient id="ora-body" cx="35%" cy="28%">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".85" />
          <stop offset="1" stopColor={accent} />
        </radialGradient>
      </defs>
      <circle cx="40" cy="42" r="26" fill="url(#ora-body)" />
      <circle cx="40" cy="42" r="26" fill="none" stroke={accent} strokeOpacity=".45" strokeWidth="1.5" />
      <line x1="40" y1="16" x2="40" y2="9" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="7" r="3.4" fill={accent}>
        <animate attributeName="r" values="3.4;4.4;3.4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <g fill="#0b1220">
        <ellipse cx="31" cy="39" rx="3.1" ry="3.6">
          <animate attributeName="ry" values="3.6;0.4;3.6" dur="4.2s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="49" cy="39" rx="3.1" ry="3.6">
          <animate attributeName="ry" values="3.6;0.4;3.6" dur="4.2s" repeatCount="indefinite" />
        </ellipse>
      </g>
      <ellipse cx="40" cy="51" rx={talking ? 5.5 : 6.5} ry={talking ? 4.2 : 1.8} fill="#0b1220" opacity=".8">
        {talking && <animate attributeName="ry" values="1.6;4.6;2.2;4.2;1.6" dur="0.55s" repeatCount="indefinite" />}
      </ellipse>
      <circle cx="12" cy="46" r="5" fill={accent} opacity=".85">
        <animateTransform attributeName="transform" type="rotate" values="-18 12 46;14 12 46;-18 12 46" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="68" cy="46" r="5" fill={accent} opacity=".85">
        <animateTransform attributeName="transform" type="rotate" values="16 68 46;-12 68 46;16 68 46" dur="2.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
