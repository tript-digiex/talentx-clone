import Tabs, { TABS_VARIANT } from "@/components/ui/custom/Tabs";
import { CategoryTab } from "@/features/settings/components/category/CategoryTab";
import { EvaluationTab } from "@/features/settings/components/evaluation/EvaluationTab";
import { HolidaysTab } from "@/features/settings/components/holidays/HolidaysTab";
import { ProfileTab } from "@/features/settings/components/profile/ProfileTab";
import {
  SETTINGS_TABS,
  SETTINGS_TABS_ITEMS,
} from "@/features/settings/types/settings.constants";
import { useState } from "react";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>(SETTINGS_TABS.EVALUATION);

  return (
    <section>
      <Tabs
        className="border-b"
        items={SETTINGS_TABS_ITEMS}
        value={activeTab}
        onChange={setActiveTab}
        variant={TABS_VARIANT.UNDERLINE}
      />

      <div className="mt-6">
        {activeTab === SETTINGS_TABS.EVALUATION && <EvaluationTab />}
        {activeTab === SETTINGS_TABS.CATEGORY && <CategoryTab />}
        {activeTab === SETTINGS_TABS.HOLIDAYS && <HolidaysTab />}
        {activeTab === SETTINGS_TABS.PROFILE && <ProfileTab />}
      </div>
    </section>
  );
}
