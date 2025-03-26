import type { Metadata } from "next"
import { CostReport } from "@/components/cost-report"
import { ServiceHistoryReport } from "@/components/service-history-report"

export const metadata: Metadata = {
  title: "Reports",
  description: "View maintenance reports and history",
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">View maintenance reports and service history.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CostReport />
        <ServiceHistoryReport />
      </div>
    </div>
  )
}

