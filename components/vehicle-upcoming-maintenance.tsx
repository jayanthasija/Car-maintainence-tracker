"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle2, Clock } from "lucide-react"

// Mock data for upcoming maintenance
const upcomingMaintenanceData = {
  "1": [
    {
      id: "1",
      service: "Oil Change",
      dueDate: "2024-01-15",
      daysLeft: 5,
      mileage: "48,000",
      estimatedCost: "$45.99",
    },
    {
      id: "3",
      service: "Air Filter Replacement",
      dueDate: "2024-02-01",
      daysLeft: 22,
      mileage: "48,500",
      estimatedCost: "$15.99",
    },
    {
      id: "5",
      service: "Transmission Fluid Change",
      dueDate: "2024-03-10",
      daysLeft: 60,
      mileage: "50,000",
      estimatedCost: "$120.00",
    },
  ],
  "2": [
    {
      id: "2",
      service: "Tire Rotation",
      dueDate: "2024-01-20",
      daysLeft: 10,
      mileage: "35,000",
      estimatedCost: "$25.00",
    },
    {
      id: "4",
      service: "Brake Inspection",
      dueDate: "2024-02-15",
      daysLeft: 36,
      mileage: "36,000",
      estimatedCost: "$0.00",
    },
  ],
}

export function VehicleUpcomingMaintenance({ vehicleId }: { vehicleId: string }) {
  const [maintenance, setMaintenance] = useState(
    upcomingMaintenanceData[vehicleId as keyof typeof upcomingMaintenanceData] || [],
  )

  const markComplete = (id: string) => {
    setMaintenance(maintenance.filter((item) => item.id !== id))
    toast("Service marked as complete", {
      description: "The service has been marked as completed.",
    })
  }

  return (
    <div className="space-y-3">
      {maintenance.length > 0 ? (
        maintenance.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm md:text-base">{item.service}</h3>
                    <Badge variant={item.daysLeft <= 7 ? "destructive" : "outline"} className="w-fit">
                      <Clock className="mr-1 h-3 w-3" />
                      {item.daysLeft} days left
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Due: {item.dueDate}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Mileage: {item.mileage}</p>
                  <p className="text-xs md:text-sm font-medium">Est. Cost: {item.estimatedCost}</p>
                </div>
                <div className="flex sm:flex-col justify-between p-3 md:p-4 bg-muted/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs md:text-sm"
                    onClick={() => markComplete(item.id)}
                  >
                    <CheckCircle2 className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-4 md:p-8 text-center">
          <Clock className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <h3 className="text-base md:text-lg font-semibold">No upcoming maintenance</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            There are no maintenance tasks scheduled for this vehicle.
          </p>
        </div>
      )}
    </div>
  )
}

