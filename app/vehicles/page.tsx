import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { VehicleList } from "@/components/vehicle-list"
import { PlusCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Vehicles",
  description: "Manage your vehicles",
}

export default function VehiclesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Vehicles</h1>
          <p className="text-muted-foreground">Manage your vehicles and their details.</p>
        </div>
        <Link href="/vehicles/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Vehicle
          </Button>
        </Link>
      </div>

      <VehicleList />
    </div>
  )
}

