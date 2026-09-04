import DateRangeSelect, {
  type DateRangeValue,
} from "@/components/ui/custom/DateRangeSelect";
import { useState } from "react";

export function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    from_date: null,
    to_date: null,
  });

  console.log(dateRange);

  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Base page để quản lý dashboard.
      </p>

      <DateRangeSelect value={dateRange} onChange={setDateRange} />
    </section>
  );
}
