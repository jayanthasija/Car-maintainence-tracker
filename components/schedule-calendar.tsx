"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle2, ChevronLeft, ChevronRight, Clock } from "lucide-react"

// Mock data for scheduled maintenance
const scheduledMaintenance = [
  {
    id: "1",
    vehicle: "Toyota Camry",
    service: "Oil Change",
    date: new Date(2024, 0, 15), // January 15, 2024
    mileage: "48,000",
    estimatedCost: "$45.99",
  },
  {
    id: "2",
    vehicle: "Honda Civic",
    service: "Tire Rotation",
    date: new Date(2024, 0, 20), // January 20, 2024
    mileage: "35,000",
    estimatedCost: "$25.00",
  },
  {
    id: "3",
    vehicle: "Toyota Camry",
    service: "Air Filter Replacement",
    date: new Date(2024, 1, 1), // February 1, 2024
    mileage: "48,500",
    estimatedCost: "$15.99",
  },
  {
    id: "4",
    vehicle: "Honda Civic",
    service: "Brake Inspection",
    date: new Date(2024, 1, 15), // February 15, 2024
    mileage: "36,000",
    estimatedCost: "$0.00",
  },
  {
    id: "5",
    vehicle: "Toyota Camry",
    service: "Transmission Fluid Change",
    date: new Date(2024, 2, 10), // March 10, 2024
    mileage: "50,000",
    estimatedCost: "$120.00",
  },
]

export function ScheduleCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState(scheduledMaintenance)

  // Function to get events for the selected date
  const getEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return []

    return events.filter(
      (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  // Function to check if a date has events
  const hasEvents = (day: Date) => {
    if (!day) return false

    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  const markComplete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
    toast("Service marked as complete", {
      description: "The service has been marked as completed.",
    })
  }

  const selectedDateEvents = getEventsForDate(date)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader className="p-3 md:p-6">
          <CardTitle className="text-base md:text-lg">Calendar</CardTitle>
          <CardDescription className="text-xs md:text-sm">Select a date to view scheduled maintenance</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: hasEvents,
            }}
            modifiersClassNames={{
              hasEvent: "bg-primary/10 font-bold text-primary",
            }}
            components={{
              DayContent: ({ day }) => {
                // Add a check to ensure day is defined before accessing its methods
                if (!day) return null

                return (
                  <div className="relative">
                    {day.getDate()}
                    {hasEvents(day) && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </div>
                )
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between p-3 md:p-6">
          <div>
            <CardTitle className="text-base md:text-lg">Scheduled Maintenance</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {date
                ? date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                : "Select a date"}
            </CardDescription>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                if (date) {
                  const newDate = new Date(date)
                  newDate.setDate(newDate.getDate() - 1)
                  setDate(newDate)
                }
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous day</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                if (date) {
                  const newDate = new Date(date)
                  newDate.setDate(newDate.getDate() + 1)
                  setDate(newDate)
                }
              }}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next day</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-1 p-3 md:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-sm md:text-base">{event.service}</h3>
                          <Badge variant="outline" className="w-fit">
                            <Clock className="mr-1 h-3 w-3" />
                            {event.date.toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">Vehicle: {event.vehicle}</p>
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">Mileage: {event.mileage}</p>
                        <p className="text-xs md:text-sm font-medium">Est. Cost: {event.estimatedCost}</p>
                      </div>
                      <div className="flex sm:flex-col justify-between p-3 md:p-4 bg-muted/50">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs md:text-sm"
                          onClick={() => markComplete(event.id)}
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
          ) : (
            <div className="flex flex-col items-center justify-center p-4 md:p-8 text-center">
              <Clock className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <h3 className="text-base md:text-lg font-semibold">No maintenance scheduled</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                There are no maintenance tasks scheduled for this date.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

