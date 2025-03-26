"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Car, ChevronDown, Plus } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

type Vehicle = {
  id: string
  name: string
  make: string
  model: string
  year: number
}

export function VehicleSelector() {
  const { toast } = useToast()
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: "1", name: "My Honda Civic", make: "Honda", model: "Civic", year: 2019 },
    { id: "2", name: "Family SUV", make: "Toyota", model: "RAV4", year: 2021 },
  ])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehicles[0])

  // New vehicle form state
  const [newVehicleName, setNewVehicleName] = useState("")
  const [newVehicleMake, setNewVehicleMake] = useState("")
  const [newVehicleModel, setNewVehicleModel] = useState("")
  const [newVehicleYear, setNewVehicleYear] = useState("")
  const [formError, setFormError] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!newVehicleName || !newVehicleMake || !newVehicleModel || !newVehicleYear) {
      setFormError("All fields are required")
      return
    }

    const yearValue = Number.parseInt(newVehicleYear)
    if (isNaN(yearValue) || yearValue < 1900 || yearValue > new Date().getFullYear() + 1) {
      setFormError("Please enter a valid year")
      return
    }

    // Add new vehicle
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name: newVehicleName,
      make: newVehicleMake,
      model: newVehicleModel,
      year: yearValue,
    }

    setVehicles([...vehicles, newVehicle])
    setSelectedVehicle(newVehicle)

    // Reset form
    setNewVehicleName("")
    setNewVehicleMake("")
    setNewVehicleModel("")
    setNewVehicleYear("")
    setFormError("")
    setIsDialogOpen(false)

    toast({
      title: "Vehicle added",
      description: `${newVehicle.name} has been added to your vehicles.`,
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Car className="mr-2 h-4 w-4" />
            {selectedVehicle.name}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Your Vehicles</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {vehicles.map((vehicle) => (
            <DropdownMenuItem
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              className={selectedVehicle.id === vehicle.id ? "bg-muted" : ""}
            >
              {vehicle.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a New Vehicle</DialogTitle>
                <DialogDescription>Enter the details of your vehicle to add it to your account.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddVehicle} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="vehicle-name">Vehicle Name</Label>
                  <Input
                    id="vehicle-name"
                    placeholder="My Car"
                    value={newVehicleName}
                    onChange={(e) => setNewVehicleName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="vehicle-make">Make</Label>
                    <Input
                      id="vehicle-make"
                      placeholder="Toyota"
                      value={newVehicleMake}
                      onChange={(e) => setNewVehicleMake(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="vehicle-model">Model</Label>
                    <Input
                      id="vehicle-model"
                      placeholder="Camry"
                      value={newVehicleModel}
                      onChange={(e) => setNewVehicleModel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vehicle-year">Year</Label>
                  <Input
                    id="vehicle-year"
                    type="number"
                    placeholder="2023"
                    value={newVehicleYear}
                    onChange={(e) => setNewVehicleYear(e.target.value)}
                  />
                </div>
                {formError && <p className="text-sm text-destructive">{formError}</p>}
                <DialogFooter>
                  <Button type="submit">Add Vehicle</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

