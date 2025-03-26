"use client"

import { ScheduleCalendar } from "@/components/schedule-calendar"

export default function SchedulePageClient() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Maintenance Schedule</h1>
        <p className="text-muted-foreground">View and manage your upcoming maintenance tasks.</p>
      </div>

      <ScheduleCalendar />
    </div>
  )
}

