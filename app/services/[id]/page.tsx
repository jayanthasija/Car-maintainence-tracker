import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit } from "lucide-react"

export const metadata: Metadata = {
  title: "Service Details",
  description: "View service details",
}

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the service data based on the ID
  const service = {
    id: params.id,
    vehicle: params.id === "1" || params.id === "3" || params.id === "5" ? "Toyota Camry" : "Honda Civic",
    service:
      params.id === "1"
        ? "Oil Change"
        : params.id === "2"
          ? "Tire Rotation"
          : params.id === "3"
            ? "Brake Pad Replacement"
            : params.id === "4"
              ? "Air Filter Replacement"
              : params.id === "5"
                ? "Transmission Fluid Change"
                : "Oil Change",
    date:
      params.id === "1"
        ? "2023-12-15"
        : params.id === "2"
          ? "2023-12-01"
          : params.id === "3"
            ? "2023-11-20"
            : params.id === "4"
              ? "2023-11-10"
              : params.id === "5"
                ? "2023-10-05"
                : "2023-09-15",
    mileage:
      params.id === "1"
        ? "45,000"
        : params.id === "2"
          ? "32,500"
          : params.id === "3"
            ? "44,500"
            : params.id === "4"
              ? "32,000"
              : params.id === "5"
                ? "43,000"
                : "30,000",
    cost:
      params.id === "1"
        ? "$45.99"
        : params.id === "2"
          ? "$25.00"
          : params.id === "3"
            ? "$220.00"
            : params.id === "4"
              ? "$15.99"
              : params.id === "5"
                ? "$120.00"
                : "$35.99",
    notes: params.id === "1" ? "Used synthetic oil" : params.id === "3" ? "Replaced front brake pads" : "",
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/services">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{service.service}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>
            Details for the {service.service} performed on {service.date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4 text-sm md:text-base">
            <div>
              <dt className="font-medium">Vehicle</dt>
              <dd className="text-muted-foreground">{service.vehicle}</dd>
            </div>
            <div>
              <dt className="font-medium">Service Type</dt>
              <dd className="text-muted-foreground">{service.service}</dd>
            </div>
            <div>
              <dt className="font-medium">Date</dt>
              <dd className="text-muted-foreground">{service.date}</dd>
            </div>
            <div>
              <dt className="font-medium">Mileage</dt>
              <dd className="text-muted-foreground">{service.mileage}</dd>
            </div>
            <div>
              <dt className="font-medium">Cost</dt>
              <dd className="text-muted-foreground">{service.cost}</dd>
            </div>
            <div className="col-span-2">
              <dt className="font-medium">Notes</dt>
              <dd className="text-muted-foreground">{service.notes || "No notes provided"}</dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Link href="/services">
            <Button variant="outline">Back to Services</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

