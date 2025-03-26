"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

// Mock data for service history
const serviceHistoryData = {
  "1": [
    {
      id: "1",
      service: "Oil Change",
      date: "2023-12-15",
      mileage: "45,000",
      cost: "$45.99",
    },
    {
      id: "3",
      service: "Brake Pad Replacement",
      date: "2023-11-20",
      mileage: "44,500",
      cost: "$220.00",
    },
    {
      id: "5",
      service: "Transmission Fluid Change",
      date: "2023-10-05",
      mileage: "43,000",
      cost: "$120.00",
    },
    {
      id: "7",
      service: "Tire Rotation",
      date: "2023-08-20",
      mileage: "42,000",
      cost: "$25.00",
    },
  ],
  "2": [
    {
      id: "2",
      service: "Tire Rotation",
      date: "2023-12-01",
      mileage: "32,500",
      cost: "$25.00",
    },
    {
      id: "4",
      service: "Air Filter Replacement",
      date: "2023-11-10",
      mileage: "32,000",
      cost: "$15.99",
    },
    {
      id: "6",
      service: "Oil Change",
      date: "2023-09-15",
      mileage: "30,000",
      cost: "$35.99",
    },
    {
      id: "8",
      service: "Brake Inspection",
      date: "2023-07-10",
      mileage: "28,000",
      cost: "$0.00",
    },
  ],
}

export function VehicleServiceHistory({ vehicleId }: { vehicleId: string }) {
  const [services, setServices] = useState(serviceHistoryData[vehicleId as keyof typeof serviceHistoryData] || [])

  const handleDelete = (id: string) => {
    const deletedService = services.find((service) => service.id === id)
    setServices(services.filter((service) => service.id !== id))
    toast("Service deleted", {
      description: "The service has been deleted successfully.",
      action: {
        label: "Undo",
        onClick: () => {
          if (deletedService) {
            setServices((prev) => [...prev, deletedService])
            toast("Service restored")
          }
        },
      },
    })
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden md:table-cell">Mileage</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead className="text-right w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length > 0 ? (
            services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.service}</TableCell>
                <TableCell className="hidden md:table-cell">{service.date}</TableCell>
                <TableCell className="hidden md:table-cell">{service.mileage}</TableCell>
                <TableCell>{service.cost}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the service record. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(service.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No service history found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

