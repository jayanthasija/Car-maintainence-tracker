"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for service history
const serviceHistory = [
  {
    id: "1",
    vehicle: "Toyota Camry",
    service: "Oil Change",
    date: "2023-12-15",
    mileage: "45,000",
    cost: "$45.99",
  },
  {
    id: "2",
    vehicle: "Honda Civic",
    service: "Tire Rotation",
    date: "2023-12-01",
    mileage: "32,500",
    cost: "$25.00",
  },
  {
    id: "3",
    vehicle: "Toyota Camry",
    service: "Brake Pad Replacement",
    date: "2023-11-20",
    mileage: "44,500",
    cost: "$220.00",
  },
  {
    id: "4",
    vehicle: "Honda Civic",
    service: "Air Filter Replacement",
    date: "2023-11-10",
    mileage: "32,000",
    cost: "$15.99",
  },
  {
    id: "5",
    vehicle: "Toyota Camry",
    service: "Transmission Fluid Change",
    date: "2023-10-05",
    mileage: "43,000",
    cost: "$120.00",
  },
  {
    id: "6",
    vehicle: "Honda Civic",
    service: "Oil Change",
    date: "2023-09-15",
    mileage: "30,000",
    cost: "$35.99",
  },
  {
    id: "7",
    vehicle: "Toyota Camry",
    service: "Tire Rotation",
    date: "2023-08-20",
    mileage: "42,000",
    cost: "$25.00",
  },
  {
    id: "8",
    vehicle: "Honda Civic",
    service: "Brake Inspection",
    date: "2023-07-10",
    mileage: "28,000",
    cost: "$0.00",
  },
]

// Mock data for service frequency
const serviceFrequency = [
  {
    service: "Oil Change",
    count: 3,
    averageCost: "$40.99",
    lastPerformed: "2023-12-15",
  },
  {
    service: "Tire Rotation",
    count: 2,
    averageCost: "$25.00",
    lastPerformed: "2023-08-20",
  },
  {
    service: "Brake Service",
    count: 2,
    averageCost: "$110.00",
    lastPerformed: "2023-11-20",
  },
  {
    service: "Air Filter Replacement",
    count: 1,
    averageCost: "$15.99",
    lastPerformed: "2023-11-10",
  },
  {
    service: "Transmission Fluid Change",
    count: 1,
    averageCost: "$120.00",
    lastPerformed: "2023-10-05",
  },
]

export function ServiceHistoryReport() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("all")

  const filteredHistory =
    selectedVehicle === "all"
      ? serviceHistory
      : serviceHistory.filter((item) => item.vehicle.toLowerCase().includes(selectedVehicle.toLowerCase()))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Service History</CardTitle>
        <CardDescription>View your service history and frequency</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="history">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="frequency">Frequency</TabsTrigger>
            </TabsList>

            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vehicles</SelectItem>
                <SelectItem value="toyota camry">Toyota Camry</SelectItem>
                <SelectItem value="honda civic">Honda Civic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="history">
            <div className="w-full overflow-auto max-h-[250px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Vehicle</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Mileage</TableHead>
                    <TableHead className="hidden md:table-cell">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.vehicle}</TableCell>
                      <TableCell>{item.service}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.mileage}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="frequency">
            <div className="w-full overflow-auto max-h-[250px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead className="hidden md:table-cell">Avg. Cost</TableHead>
                    <TableHead className="hidden md:table-cell">Last Performed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceFrequency.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.service}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.count}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{item.averageCost}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.lastPerformed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

