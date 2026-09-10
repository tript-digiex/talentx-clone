import { CountriesSection } from "./CountriesSection";
import { HolidaysSection } from "./HolidaysSection";

export const HolidaysTab = () => {
  return (
    <div className="flex gap-4">
      <CountriesSection />
      <HolidaysSection />
    </div>
  );
};
