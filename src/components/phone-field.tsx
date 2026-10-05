import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import { hasFlag } from "country-flag-icons";
import * as Flags from "country-flag-icons/react/3x2";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
export const phoneCountries = getCountries()
  .map((country) => ({ country, name: countryNames.of(country) ?? country, callingCode: `+${getCountryCallingCode(country)}` }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function CountryFlag({ country }: { country: CountryCode }) {
  const Flag = hasFlag(country) ? Flags[country as keyof typeof Flags] : undefined;
  return Flag ? <Flag aria-hidden="true" className="h-3.5 w-5 shrink-0 rounded-[1px]" /> : <span aria-hidden="true" className="h-3.5 w-5 bg-muted" />;
}

export function callingCodeOf(country: CountryCode) {
  return `+${getCountryCallingCode(country)}`;
}

/** Phone number input with a country picker showing flag and dialling code. */
export function PhoneField({ id, country, onCountryChange, value, onChange, className, inputClassName, required }: {
  id?: string;
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
  required?: boolean;
}) {
  return <div className={cn("flex h-11 items-stretch overflow-hidden rounded-xl border border-input bg-background", className)}>
    <Select value={country} onValueChange={(next) => onCountryChange(next as CountryCode)}>
      <SelectTrigger aria-label="Country code" className="h-full w-[112px] shrink-0 rounded-none border-0 border-r border-inherit bg-transparent px-3 shadow-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="z-[200] max-h-80">
        {phoneCountries.map((item) => <SelectItem key={item.country} value={item.country}>
          <span className="inline-flex items-center gap-2"><CountryFlag country={item.country} /><span>{item.callingCode}</span><span className="sr-only">{item.name}</span></span>
        </SelectItem>)}
      </SelectContent>
    </Select>
    <input id={id} type="tel" inputMode="tel" autoComplete="tel-national" required={required} value={value} maxLength={20}
      onChange={(event) => onChange(event.target.value.replace(/[^\d\s-]/g, ""))}
      placeholder="98765 43210" className={cn("min-w-0 flex-1 bg-transparent px-3 text-sm outline-none", inputClassName)} />
  </div>;
}
