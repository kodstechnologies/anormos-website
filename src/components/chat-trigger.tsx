import { Button, type ButtonProps } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry-modal";

/** Call-to-action button that opens the enquiry form. */
export function ChatTrigger({ children, prompt, onClick, ...props }: ButtonProps & { prompt?: string }) {
  const { openEnquiry } = useEnquiry();
  return <Button {...props} onClick={(event) => {
    onClick?.(event);
    if (!event.defaultPrevented) openEnquiry({ title: event.currentTarget.textContent || prompt });
  }}>{children}</Button>;
}
