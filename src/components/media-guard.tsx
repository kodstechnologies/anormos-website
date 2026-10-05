import { ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

/** Site-wide deterrent: warns when someone tries to save or capture images and videos. */
export function MediaGuard() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isMedia = (t: EventTarget | null) => t instanceof Element && !!t.closest("img, video, picture, canvas, svg image, [data-media], .media-shield");
    const warn = (e: Event) => { e.preventDefault(); e.stopPropagation(); setOpen(true); };
    const onContext = (e: MouseEvent) => { if (isMedia(e.target) || document.elementsFromPoint(e.clientX, e.clientY).some((el) => isMedia(el))) warn(e); };
    const onDrag = (e: DragEvent) => { if (isMedia(e.target)) warn(e); };
    const isEditable = (t: EventTarget | null) => t instanceof HTMLElement && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
    const onClipboard = (e: ClipboardEvent) => { if (!isEditable(e.target)) { e.preventDefault(); e.stopPropagation(); } };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const capture = k === "printscreen" || (e.metaKey && e.shiftKey && ["3", "4", "5", "s"].includes(k)) || (e.ctrlKey && k === "s") || (e.metaKey && k === "s");
      if (capture) {
        warn(e);
        setHidden(true);
        void navigator.clipboard?.writeText("Content protected by Anormos.").catch(() => {});
        window.setTimeout(() => setHidden(false), 1500);
      }
    };
    const onBlur = () => setHidden(true);
    const onFocus = () => setHidden(false);
    const onVisibilityChange = () => setHidden(document.visibilityState !== "visible");
    const onKeyUp = (e: KeyboardEvent) => { if (e.key === "PrintScreen") onKey(e); };
    document.addEventListener("contextmenu", onContext, true);
    document.addEventListener("dragstart", onDrag, true);
    document.addEventListener("copy", onClipboard, true);
    document.addEventListener("cut", onClipboard, true);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("keyup", onKeyUp, true);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onBlur);
    window.addEventListener("pageshow", onFocus);
    return () => {
      document.removeEventListener("contextmenu", onContext, true);
      document.removeEventListener("dragstart", onDrag, true);
      document.removeEventListener("copy", onClipboard, true);
      document.removeEventListener("cut", onClipboard, true);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("keyup", onKeyUp, true);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onBlur);
      window.removeEventListener("pageshow", onFocus);
    };
  }, []);

  useEffect(() => { document.documentElement.classList.toggle("media-hidden", hidden); }, [hidden]);

  return <>
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-md rounded-3xl p-8 text-center [font-family:Urbanist,sans-serif]">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive"><ShieldAlert /></span>
      <DialogTitle className="text-2xl font-medium">You are violating Anormos privacy</DialogTitle>
      <DialogDescription className="text-sm leading-relaxed">
        Saving pictures, videos or text is not allowed. Screenshots and screen recordings of this website are not permitted. All content is the property of Anormos and its group companies.
      </DialogDescription>
      <Button onClick={() => setOpen(false)} className="mx-auto mt-2 rounded-full px-8">I understand</Button>
    </DialogContent>
  </Dialog></>;
}
