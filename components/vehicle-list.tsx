"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { toast } from "sonner"
import { Edit, Trash2, Car, AlertCircle, PlusCircle } from "lucide-react"

const initialVehicles = [
  {
    id: "1",
    name: "Toyota Camry",
    year: "2018",
    make: "Toyota",
    model: "Camry",
    licensePlate: "ABC-1234",
    mileage: "45,000",
    alerts: 2,
  },
  {
    id: "2",
    name: "Honda Civic",
    year: "2020",
    make: "Honda",
    model: "Civic",
    licensePlate: "XYZ-5678",
    mileage: "32,500",
    alerts: 1,
  },
]

export function VehicleList() {
  const [vehicles, setVehicles] = useState(initialVehicles)

  // Update the handleDelete function to properly remove the vehicle and show toast with undo option
  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
    toast("Vehicle deleted", {
      description: "The vehicle has been deleted successfully.",
      action: {
        label: "Undo",
        onClick: () => {
          const deletedVehicle = initialVehicles.find((vehicle) => vehicle.id === id)
          if (deletedVehicle) {
            setVehicles((prev) => [...prev, deletedVehicle])
            toast("Vehicle restored")
          }
        },
      },
    })
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-40 w-full bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-20 w-20 text-muted-foreground/50" />
                </div>
                {vehicle.alerts > 0 && (
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    {vehicle.alerts} alerts
                  </Badge>
                )}
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-base md:text-lg font-semibold">{vehicle.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs md:text-sm">
                  <div>
                    <p className="font-medium">License Plate</p>
                    <p className="text-muted-foreground">{vehicle.licensePlate}</p>
                  </div>
                  <div>
                    <p className="font-medium">Mileage</p>
                    <p className="text-muted-foreground">{vehicle.mileage}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-3 md:p-4 pt-0">
              <Link href={`/vehicles/${vehicle.id}`}>
                <Button variant="outline" size="sm" className="text-xs md:text-sm">
                  View Details
                </Button>
              </Link>
              <div className="flex gap-1 md:gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the vehicle and all associated records. This action cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(vehicle.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center p-4 md:p-8 text-center">
          <Car className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold">No vehicles found</h3>
          <p className="text-sm text-muted-foreground mb-4">Add your first vehicle to start tracking maintenance.</p>
          <Link href="/vehicles/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

