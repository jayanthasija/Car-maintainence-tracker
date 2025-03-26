"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Calendar, Car, Filter, Plus, Search } from "lucide-react"

type ServiceRecord = {
  id: string
  service: string
  date: string
  mileage: number
  cost: number
  notes: string
  shop: string
  vehicle: string
}

export default function ServicesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [vehicleFilter, setVehicleFilter] = useState("all")
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all")
  const [dateRangeFilter, setDateRangeFilter] = useState("all")

  const [records, setRecords] = useState<ServiceRecord[]>([
    {
      id: "1",
      service: "Oil Change",
      date: "2023-12-15",
      mileage: 42500,
      cost: 65,
      notes: "Used synthetic oil. Replaced oil filter.",
      shop: "Quick Lube",
      vehicle: "My Honda Civic",
    },
    {
      id: "2",
      service: "Tire Rotation",
      date: "2023-10-20",
      mileage: 40000,
      cost: 30,
      notes: "All tires in good condition. Pressure adjusted.",
      shop: "Discount Tire",
      vehicle: "My Honda Civic",
    },
    {
      id: "3",
      service: "Brake Inspection",
      date: "2023-08-05",
      mileage: 35000,
      cost: 120,
      notes: "Front brake pads replaced. Rotors in good condition.",
      shop: "Auto Care Center",
      vehicle: "My Honda Civic",
    },
    {
      id: "4",
      service: "Oil Change",
      date: "2023-11-10",
      mileage: 25000,
      cost: 85,
      notes: "Full synthetic oil change with premium filter.",
      shop: "Dealer Service",
      vehicle: "Family SUV",
    },
    {
      id: "5",
      service: "Tire Replacement",
      date: "2023-09-15",
      mileage: 22000,
      cost: 650,
      notes: "Replaced all four tires with all-season tires.",
      shop: "Tire Center",
      vehicle: "Family SUV",
    },
  ])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const filterRecords = () => {
    return records.filter((record) => {
      // Search term filter
      const searchMatch =
        record.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.notes.toLowerCase().includes(searchTerm.toLowerCase())

      // Vehicle filter
      const vehicleMatch = vehicleFilter === "all" || record.vehicle === vehicleFilter

      // Service type filter
      const serviceMatch = serviceTypeFilter === "all" || record.service === serviceTypeFilter

      // Date range filter
      let dateMatch = true
      const recordDate = new Date(record.date)
      const now = new Date()

      if (dateRangeFilter === "last-month") {
        const lastMonth = new Date()
        lastMonth.setMonth(now.getMonth() - 1)
        dateMatch = recordDate >= lastMonth
      } else if (dateRangeFilter === "last-3-months") {
        const last3Months = new Date()
        last3Months.setMonth(now.getMonth() - 3)
        dateMatch = recordDate >= last3Months
      } else if (dateRangeFilter === "last-year") {
        const lastYear = new Date()
        lastYear.setFullYear(now.getFullYear() - 1)
        dateMatch = recordDate >= lastYear
      }

      return searchMatch && vehicleMatch && serviceMatch && dateMatch
    })
  }

  const filteredRecords = filterRecords()

  // Get unique service types for filter
  const serviceTypes = Array.from(new Set(records.map((record) => record.service)))

  // Get unique vehicles for filter
  const vehicles = Array.from(new Set(records.map((record) => record.vehicle)))

  // Calculate total costs
  const totalCost = filteredRecords.reduce((sum, record) => sum + record.cost, 0)

  // Group by service type for chart
  const serviceTypeCosts: Record<string, number> = {}
  filteredRecords.forEach((record) => {
    if (serviceTypeCosts[record.service]) {
      serviceTypeCosts[record.service] += record.cost
    } else {
      serviceTypeCosts[record.service] = record.cost
    }
  })

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service History</h1>
            <p className="text-muted-foreground">View and analyze your maintenance service records</p>
          </div>
          <Button asChild>
            <Link href="/add-service">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Link>
          </Button>
        </div>

        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services, shops, or notes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger className="w-[180px]">
                  <Car className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle} value={vehicle}>
                      {vehicle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="analysis">Cost Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>Service Records</CardTitle>
                  <CardDescription>
                    {filteredRecords.length} records found • Total: ${totalCost.toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredRecords.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No service records found matching your filters.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredRecords.map((record) => (
                        <div
                          key={record.id}
                          className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
                        >
                          <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{record.service}</h3>
                              <span className="text-sm text-muted-foreground">{record.vehicle}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-4 w-4" />
                              {formatDate(record.date)} • {record.mileage.toLocaleString()} miles
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {record.shop} - {record.notes}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0 md:ml-4 md:text-right">
                            <div className="font-medium">${record.cost.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                  <CardDescription>Breakdown of maintenance costs by service type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <div className="grid gap-4">
                      {Object.entries(serviceTypeCosts).map(([service, cost]) => (
                        <div key={service} className="grid gap-2">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">{service}</div>
                            <div>${cost.toFixed(2)}</div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${(cost / totalCost) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">Total Expenses</div>
                        <div className="font-semibold">${totalCost.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

