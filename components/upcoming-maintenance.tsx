"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { CheckCircle2, Clock } from "lucide-react"

const upcomingServices = [
  {
    id: "1",
    vehicle: "Toyota Camry",
    service: "Oil Change",
    dueDate: "2024-01-15",
    daysLeft: 5,
    mileage: "48,000",
    estimatedCost: "$45.99",
  },
  {
    id: "2",
    vehicle: "Honda Civic",
    service: "Tire Rotation",
    dueDate: "2024-01-20",
    daysLeft: 10,
    mileage: "35,000",
    estimatedCost: "$25.00",
  },
  {
    id: "3",
    vehicle: "Toyota Camry",
    service: "Air Filter Replacement",
    dueDate: "2024-02-01",
    daysLeft: 22,
    mileage: "48,500",
    estimatedCost: "$15.99",
  },
]

export function UpcomingMaintenance() {
  const markComplete = (id: string) => {
    toast("Service marked as complete", {
      description: "The service has been marked as completed.",
    })
  }

  return (
    <div className="space-y-3">
      {upcomingServices.map((service) => (
        <Card key={service.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 p-3 md:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm md:text-base">{service.service}</h3>
                  <Badge variant={service.daysLeft <= 7 ? "destructive" : "outline"} className="w-fit">
                    <Clock className="mr-1 h-3 w-3" />
                    {service.daysLeft} days left
                  </Badge>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Vehicle: {service.vehicle}</p>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Due: {service.dueDate}</p>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Mileage: {service.mileage}</p>
                <p className="text-xs md:text-sm font-medium">Est. Cost: {service.estimatedCost}</p>
              </div>
              <div className="flex sm:flex-col justify-between p-3 md:p-4 bg-muted/50">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs md:text-sm"
                  onClick={() => markComplete(service.id)}
                >
                  <CheckCircle2 className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                  Complete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

