"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

type MaintenanceItem = {
  id: string
  service: string
  status: "overdue" | "due-soon" | "scheduled"
  dueText: string
  lastMileage: number
  mileageAgo: number
}

export function UpcomingMaintenance() {
  const { toast } = useToast()
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([
    {
      id: "1",
      service: "Oil Change",
      status: "overdue",
      dueText: "Due 5 days ago",
      lastMileage: 42500,
      mileageAgo: 2789,
    },
    {
      id: "2",
      service: "Tire Rotation",
      status: "due-soon",
      dueText: "Due in 2 weeks",
      lastMileage: 40000,
      mileageAgo: 5289,
    },
    {
      id: "3",
      service: "Brake Inspection",
      status: "scheduled",
      dueText: "Due in 1 month",
      lastMileage: 35000,
      mileageAgo: 10289,
    },
  ])

  const handleComplete = (id: string, service: string) => {
    // Remove the item from the list
    const completedItem = maintenanceItems.find((item) => item.id === id)
    setMaintenanceItems(maintenanceItems.filter((item) => item.id !== id))

    // Show toast with undo button
    toast({
      title: "Service marked as completed",
      description: `${service} has been marked as completed.`,
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (completedItem) {
              setMaintenanceItems((prev) => [...prev, completedItem])
              toast({
                title: "Service restored",
                description: `${service} has been restored to your upcoming list.`,
              })
            }
          }}
        >
          Undo
        </Button>
      ),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Maintenance</CardTitle>
        <CardDescription>Services that are due soon based on your schedule</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {maintenanceItems.map((item) => (
          <div key={item.id} className="rounded-lg border p-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{item.service}</h3>
                  <Badge
                    variant={
                      item.status === "overdue" ? "destructive" : item.status === "due-soon" ? "warning" : "default"
                    }
                    className="rounded-sm"
                  >
                    {item.status === "overdue" ? "Overdue" : item.status === "due-soon" ? "Due Soon" : "Scheduled"}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarClock className="mr-1 h-4 w-4" />
                  {item.dueText}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Last completed at {item.lastMileage.toLocaleString()} miles ({item.mileageAgo.toLocaleString()} miles
                  ago)
                </p>
              </div>
              <div>
                <Button size="sm" onClick={() => handleComplete(item.id, item.service)}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark Complete
                </Button>
              </div>
            </div>
          </div>
        ))}

        {maintenanceItems.length === 0 && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No upcoming maintenance items.</p>
            <Button className="mt-4" variant="outline">
              Add Maintenance Reminder
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

