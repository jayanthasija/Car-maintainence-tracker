import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, Car, FileText, History, BarChart3, Bell, Wrench } from "lucide-react"
import { UpcomingMaintenance } from "@/components/upcoming-maintenance"
import { MaintenanceHistory } from "@/components/maintenance-history"
import { MileageTracker } from "@/components/mileage-tracker"
import { VehicleSelector } from "@/components/vehicle-selector"

export default function Home() {
  return (
    <div className="container px-4 py-6 mx-auto max-w-full md:max-w-7xl overflow-x-hidden">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Car Maintenance Dashboard</h1>
            <p className="text-muted-foreground">Track, manage, and stay on top of your vehicle maintenance</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/add-service">
                <Wrench className="mr-2 h-4 w-4" />
                Log Service
              </Link>
            </Button>
            <VehicleSelector />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Mileage</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,289 mi</div>
              <p className="text-xs text-muted-foreground">+350 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Services</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Oil change due in 2 weeks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450</div>
              <p className="text-xs text-muted-foreground">+$180 from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="upcoming" className="py-2">
              <Bell className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="py-2">
              <History className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="mileage" className="py-2">
              <Car className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Mileage</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="py-2">
              <FileText className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-6">
            <UpcomingMaintenance />
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <MaintenanceHistory />
          </TabsContent>
          <TabsContent value="mileage" className="mt-6">
            <MileageTracker />
          </TabsContent>
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Store and access important vehicle documents</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Owner's Manual</p>
                        <p className="text-sm text-muted-foreground">PDF • 4.2 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Insurance Policy</p>
                        <p className="text-sm text-muted-foreground">PDF • 1.8 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Last Service Receipt</p>
                        <p className="text-sm text-muted-foreground">PDF • 0.5 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <Button className="w-full">Upload New Document</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

