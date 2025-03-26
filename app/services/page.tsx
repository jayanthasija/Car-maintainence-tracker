import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ServiceList } from "@/components/service-list"
import { PlusCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Services",
  description: "Manage your maintenance services",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Track and manage your vehicle maintenance services.</p>
        </div>
        <Link href="/services/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <ServiceList />
    </div>
  )
}

