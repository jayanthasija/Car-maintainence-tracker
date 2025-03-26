"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Edit, MoreHorizontal, Trash2, FileText } from "lucide-react"

const initialServices = [
  {
    id: "1",
    vehicle: "Toyota Camry",
    service: "Oil Change",
    date: "2023-12-15",
    mileage: "45,000",
    cost: "$45.99",
    notes: "Used synthetic oil",
  },
  {
    id: "2",
    vehicle: "Honda Civic",
    service: "Tire Rotation",
    date: "2023-12-01",
    mileage: "32,500",
    cost: "$25.00",
    notes: "",
  },
  {
    id: "3",
    vehicle: "Toyota Camry",
    service: "Brake Pad Replacement",
    date: "2023-11-20",
    mileage: "44,500",
    cost: "$220.00",
    notes: "Replaced front brake pads",
  },
  {
    id: "4",
    vehicle: "Honda Civic",
    service: "Air Filter Replacement",
    date: "2023-11-10",
    mileage: "32,000",
    cost: "$15.99",
    notes: "",
  },
  {
    id: "5",
    vehicle: "Toyota Camry",
    service: "Transmission Fluid Change",
    date: "2023-10-05",
    mileage: "43,000",
    cost: "$120.00",
    notes: "",
  },
  {
    id: "6",
    vehicle: "Honda Civic",
    service: "Oil Change",
    date: "2023-09-15",
    mileage: "30,000",
    cost: "$35.99",
    notes: "Used conventional oil",
  },
]

export function ServiceList() {
  const [services, setServices] = useState(initialServices)

  const handleDelete = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
    toast("Service deleted", {
      description: "The service has been deleted successfully.",
      action: {
        label: "Undo",
        onClick: () => {
          const deletedService = initialServices.find((service) => service.id === id)
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
            <TableHead className="w-[120px]">Vehicle</TableHead>
            <TableHead>Service</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden md:table-cell">Mileage</TableHead>
            <TableHead className="hidden md:table-cell">Cost</TableHead>
            <TableHead className="text-right w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length > 0 ? (
            services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.vehicle}</TableCell>
                <TableCell>{service.service}</TableCell>
                <TableCell className="hidden md:table-cell">{service.date}</TableCell>
                <TableCell className="hidden md:table-cell">{service.mileage}</TableCell>
                <TableCell className="hidden md:table-cell">{service.cost}</TableCell>
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
                      <Link href={`/services/${service.id}`}>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </Link>
                     
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
              <TableCell colSpan={6} className="h-24 text-center">
                No services found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

