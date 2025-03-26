"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar, Trash2, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type MaintenanceRecord = {
  id: string
  service: string
  date: string
  mileage: number
  cost: number
  notes: string
  shop: string
}

export function MaintenanceHistory() {
  const { toast } = useToast()
  const [records, setRecords] = useState<MaintenanceRecord[]>([
    {
      id: "1",
      service: "Oil Change",
      date: "2023-12-15",
      mileage: 42500,
      cost: 65,
      notes: "Used synthetic oil. Replaced oil filter.",
      shop: "Quick Lube",
    },
    {
      id: "2",
      service: "Tire Rotation",
      date: "2023-10-20",
      mileage: 40000,
      cost: 30,
      notes: "All tires in good condition. Pressure adjusted.",
      shop: "Discount Tire",
    },
    {
      id: "3",
      service: "Brake Inspection",
      date: "2023-08-05",
      mileage: 35000,
      cost: 120,
      notes: "Front brake pads replaced. Rotors in good condition.",
      shop: "Auto Care Center",
    },
  ])

  const handleDelete = (id: string, service: string) => {
    const recordToDelete = records.find((record) => record.id === id)
    setRecords(records.filter((record) => record.id !== id))

    toast({
      title: "Service record deleted",
      description: `${service} record has been deleted.`,
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (recordToDelete) {
              setRecords((prev) =>
                [...prev, recordToDelete].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
              )
              toast({
                title: "Service record restored",
                description: `${service} record has been restored.`,
              })
            }
          }}
        >
          Undo
        </Button>
      ),
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance History</CardTitle>
        <CardDescription>View and manage your past maintenance records</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {records.map((record) => (
          <div key={record.id} className="rounded-lg border p-4">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{record.service}</h3>
                  <Badge variant="outline" className="rounded-sm">
                    ${record.cost}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {formatDate(record.date)} • {record.mileage.toLocaleString()} miles
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {record.shop} - {record.notes}
                </p>
              </div>
              <div className="flex gap-2 self-start">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{record.service} Details</DialogTitle>
                      <DialogDescription>Completed on {formatDate(record.date)}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm">Date</h4>
                          <p>{formatDate(record.date)}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Mileage</h4>
                          <p>{record.mileage.toLocaleString()} miles</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm">Cost</h4>
                          <p>${record.cost}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Shop</h4>
                          <p>{record.shop}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Notes</h4>
                        <p className="text-sm">{record.notes}</p>
                      </div>
                    </div>
                    {/* Removed Edit Record button */}
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the {record.service} record from {formatDate(record.date)}. This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(record.id, record.service)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}

        {records.length === 0 && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No maintenance records found.</p>
            <Button className="mt-4" variant="outline">
              Add Service Record
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

