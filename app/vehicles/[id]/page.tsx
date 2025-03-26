import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehicleServiceHistory } from "@/components/vehicle-service-history"
import { VehicleUpcomingMaintenance } from "@/components/vehicle-upcoming-maintenance"
import { ArrowLeft, Car, Edit } from "lucide-react"

export const metadata: Metadata = {
  title: "Vehicle Details",
  description: "View vehicle details and maintenance history",
}

export default function VehicleDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the vehicle data based on the ID
  const vehicle = {
    id: params.id,
    name: params.id === "1" ? "Toyota Camry" : "Honda Civic",
    year: params.id === "1" ? "2018" : "2020",
    make: params.id === "1" ? "Toyota" : "Honda",
    model: params.id === "1" ? "Camry" : "Civic",
    licensePlate: params.id === "1" ? "ABC-1234" : "XYZ-5678",
    vin: params.id === "1" ? "1HGCM82633A123456" : "5YJSA1E11GF123456",
    mileage: params.id === "1" ? "45,000" : "32,500",
    alerts: params.id === "1" ? 2 : 1,
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/vehicles">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{vehicle.name}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Vehicle Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 w-full bg-muted mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <Car className="h-24 w-24 text-muted-foreground/50" />
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="font-medium">Year</dt>
                <dd className="text-muted-foreground">{vehicle.year}</dd>
              </div>
              <div>
                <dt className="font-medium">Make</dt>
                <dd className="text-muted-foreground">{vehicle.make}</dd>
              </div>
              <div>
                <dt className="font-medium">Model</dt>
                <dd className="text-muted-foreground">{vehicle.model}</dd>
              </div>
              <div>
                <dt className="font-medium">License Plate</dt>
                <dd className="text-muted-foreground">{vehicle.licensePlate}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-medium">VIN</dt>
                <dd className="text-muted-foreground">{vehicle.vin}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-medium">Current Mileage</dt>
                <dd className="text-muted-foreground">{vehicle.mileage}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="history">
              <TabsList className="mb-4">
                <TabsTrigger value="history">Service History</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Maintenance</TabsTrigger>
              </TabsList>
              <TabsContent value="history">
                <VehicleServiceHistory vehicleId={vehicle.id} />
              </TabsContent>
              <TabsContent value="upcoming">
                <VehicleUpcomingMaintenance vehicleId={vehicle.id} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

