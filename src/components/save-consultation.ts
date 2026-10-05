import { supabase } from "@/integrations/supabase/client";

/** Saves a platform consultation request as an enquiry. */
export async function saveConsultation(platform: string, form: Record<string, string>, phoneCountry: string) {
  const { name = "", email = "", phone = "", organisation, hospital, ...rest } = form;
  const details = Object.entries(rest).filter(([, v]) => String(v ?? "").trim()).map(([k, v]) => `${k}: ${v}`).join("\n");
  const { error } = await supabase.from("enquiries").insert({
    source: `${typeof window !== "undefined" ? window.location.pathname : ""} · ${platform} consultation`.slice(0, 200),
    topic: `${platform} platform`,
    name: name.trim().slice(0, 120),
    email: email.trim().slice(0, 255),
    organisation: (organisation ?? hospital ?? "").trim().slice(0, 200) || null,
    phone_country: phoneCountry,
    phone: phone.trim().slice(0, 30) || null,
    message: details.slice(0, 2000) || null,
  });
  return !error;
}
