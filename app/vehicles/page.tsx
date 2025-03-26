"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Car, Pencil, Plus, Trash2 } from "lucide-react"

type Vehicle = {
  id: string
  name: string
  make: string
  model: string
  year: number
  licensePlate?: string
  vin?: string
  purchaseDate?: string
}

export default function VehiclesPage() {
  const { toast } = useToast()
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      name: "My Honda Civic",
      make: "Honda",
      model: "Civic",
      year: 2019,
      licensePlate: "ABC-1234",
      vin: "1HGCM82633A123456",
      purchaseDate: "2019-06-15",
    },
    {
      id: "2",
      name: "Family SUV",
      make: "Toyota",
      model: "RAV4",
      year: 2021,
      licensePlate: "XYZ-9876",
      vin: "JTMRJREV0JD123456",
      purchaseDate: "2021-03-10",
    },
  ])

  // Form state
  const [vehicleName, setVehicleName] = useState("")
  const [vehicleMake, setVehicleMake] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [vehicleYear, setVehicleYear] = useState("")
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState("")
  const [vehicleVin, setVehicleVin] = useState("")
  const [vehiclePurchaseDate, setVehiclePurchaseDate] = useState("")
  const [formError, setFormError] = useState("")
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const resetForm = () => {
    setVehicleName("")
    setVehicleMake("")
    setVehicleModel("")
    setVehicleYear("")
    setVehicleLicensePlate("")
    setVehicleVin("")
    setVehiclePurchaseDate("")
    setFormError("")
    setEditingVehicle(null)
  }

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setVehicleName(vehicle.name)
    setVehicleMake(vehicle.make)
    setVehicleModel(vehicle.model)
    setVehicleYear(vehicle.year.toString())
    setVehicleLicensePlate(vehicle.licensePlate || "")
    setVehicleVin(vehicle.vin || "")
    setVehiclePurchaseDate(vehicle.purchaseDate || "")
    setIsDialogOpen(true)
  }

  const handleDeleteVehicle = (id: string, name: string) => {
    const deletedVehicle = vehicles.find((v) => v.id === id)
    setVehicles(vehicles.filter((v) => v.id !== id))

    toast({
      title: "Vehicle deleted",
      description: `${name} has been removed from your vehicles.`,
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (deletedVehicle) {
              setVehicles((prev) => [...prev, deletedVehicle])
              toast({
                title: "Vehicle restored",
                description: `${name} has been restored to your vehicles.`,
              })
            }
          }}
        >
          Undo
        </Button>
      ),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!vehicleName || !vehicleMake || !vehicleModel || !vehicleYear) {
      setFormError("Name, make, model, and year are required")
      return
    }

    const yearValue = Number.parseInt(vehicleYear)
    if (isNaN(yearValue) || yearValue < 1900 || yearValue > new Date().getFullYear() + 1) {
      setFormError("Please enter a valid year")
      return
    }

    if (editingVehicle) {
      // Update existing vehicle
      const updatedVehicles = vehicles.map((v) =>
        v.id === editingVehicle.id
          ? {
              ...v,
              name: vehicleName,
              make: vehicleMake,
              model: vehicleModel,
              year: yearValue,
              licensePlate: vehicleLicensePlate,
              vin: vehicleVin,
              purchaseDate: vehiclePurchaseDate,
            }
          : v,
      )

      setVehicles(updatedVehicles)
      toast({
        title: "Vehicle updated",
        description: `${vehicleName} has been updated.`,
      })
    } else {
      // Add new vehicle
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        name: vehicleName,
        make: vehicleMake,
        model: vehicleModel,
        year: yearValue,
        licensePlate: vehicleLicensePlate,
        vin: vehicleVin,
        purchaseDate: vehiclePurchaseDate,
      }

      setVehicles([...vehicles, newVehicle])
      toast({
        title: "Vehicle added",
        description: `${vehicleName} has been added to your vehicles.`,
      })
    }

    resetForm()
    setIsDialogOpen(false)
  }

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl overflow-x-hidden">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Vehicles</h1>
            <p className="text-muted-foreground">Manage your vehicles and their details</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingVehicle ? "Edit Vehicle" : "Add a New Vehicle"}</DialogTitle>
                <DialogDescription>
                  {editingVehicle
                    ? "Update your vehicle information below."
                    : "Enter the details of your vehicle to add it to your account."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="vehicle-name">Vehicle Name</Label>
                  <Input
                    id="vehicle-name"
                    placeholder="My Car"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="vehicle-make">Make</Label>
                    <Input
                      id="vehicle-make"
                      placeholder="Toyota"
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="vehicle-model">Model</Label>
                    <Input
                      id="vehicle-model"
                      placeholder="Camry"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vehicle-year">Year</Label>
                  <Input
                    id="vehicle-year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    placeholder="2023"
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vehicle-license">License Plate (Optional)</Label>
                  <Input
                    id="vehicle-license"
                    placeholder="ABC-1234"
                    value={vehicleLicensePlate}
                    onChange={(e) => setVehicleLicensePlate(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vehicle-vin">VIN (Optional)</Label>
                  <Input
                    id="vehicle-vin"
                    placeholder="1HGCM82633A123456"
                    value={vehicleVin}
                    onChange={(e) => setVehicleVin(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vehicle-purchase-date">Purchase Date (Optional)</Label>
                  <Input
                    id="vehicle-purchase-date"
                    type="date"
                    value={vehiclePurchaseDate}
                    onChange={(e) => setVehiclePurchaseDate(e.target.value)}
                    onClick={(e) => {
                      // This ensures the date picker opens when clicking anywhere in the input
                      const target = e.target as HTMLInputElement
                      target.showPicker()
                    }}
                  />
                </div>
                {formError && <p className="text-sm text-destructive">{formError}</p>}
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setIsDialogOpen(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">{editingVehicle ? "Update Vehicle" : "Add Vehicle"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{vehicle.name}</CardTitle>
                    <CardDescription>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </CardDescription>
                  </div>
                  <Car className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">License Plate</p>
                      <p className="text-sm text-muted-foreground">{vehicle.licensePlate || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">VIN</p>
                      <p className="text-sm text-muted-foreground">{vehicle.vin || "Not specified"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Purchase Date</p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.purchaseDate ? new Date(vehicle.purchaseDate).toLocaleDateString() : "Not specified"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditVehicle(vehicle)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete {vehicle.name} from your vehicles. All maintenance records for this
                        vehicle will remain in your history.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteVehicle(vehicle.id, vehicle.name)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

