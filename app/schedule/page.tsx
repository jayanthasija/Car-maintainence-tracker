import type { Metadata } from "next"
import SchedulePageClient from "./SchedulePageClient"

export const metadata: Metadata = {
  title: "Maintenance Schedule",
  description: "View and manage your maintenance schedule",
}

export default function SchedulePage() {
  return <SchedulePageClient />
}

