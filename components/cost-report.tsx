"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data for cost reports
const monthlyData = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 240 },
  { name: "Apr", total: 80 },
  { name: "May", total: 320 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 180 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 450 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
]

const categoryData = [
  { name: "Oil Changes", total: 180 },
  { name: "Tires", total: 320 },
  { name: "Brakes", total: 240 },
  { name: "Filters", total: 60 },
  { name: "Fluids", total: 120 },
  { name: "Other", total: 280 },
]

const vehicleData = [
  { name: "Toyota Camry", total: 780 },
  { name: "Honda Civic", total: 420 },
]

export function CostReport() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Maintenance Costs</CardTitle>
        <CardDescription>View your maintenance costs by different categories</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="vehicle">By Vehicle</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="pt-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip formatter={(value) => [`$${value}`, "Cost"]} labelFormatter={(label) => `Month: ${label}`} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="category" className="pt-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Cost"]}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="vehicle" className="pt-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={vehicleData} layout="vertical">
                <XAxis
                  type="number"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip formatter={(value) => [`$${value}`, "Cost"]} labelFormatter={(label) => `Vehicle: ${label}`} />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

