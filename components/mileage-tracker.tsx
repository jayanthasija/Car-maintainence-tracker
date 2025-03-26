"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type MileageEntry = {
  id: string
  date: string
  mileage: number
}

export function MileageTracker() {
  const { toast } = useToast()
  const [mileage, setMileage] = useState("")
  const [date, setDate] = useState("")
  const [error, setError] = useState("")
  const [entries, setEntries] = useState<MileageEntry[]>([
    { id: "1", date: "2023-07-01", mileage: 38000 },
    { id: "2", date: "2023-08-15", mileage: 40000 },
    { id: "3", date: "2023-10-01", mileage: 42000 },
    { id: "4", date: "2023-11-15", mileage: 43500 },
    { id: "5", date: "2023-12-30", mileage: 45289 },
  ])

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!mileage || !date) {
      setError("Please enter both mileage and date")
      return
    }

    const mileageValue = Number.parseInt(mileage)
    if (isNaN(mileageValue) || mileageValue <= 0) {
      setError("Mileage must be a positive number")
      return
    }

    // Check if new mileage is greater than the last entry
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1]
      if (mileageValue <= lastEntry.mileage) {
        setError("New mileage must be greater than the last recorded mileage")
        return
      }
    }

    // Add new entry
    const newEntry = {
      id: Date.now().toString(),
      date,
      mileage: mileageValue,
    }

    setEntries([...entries, newEntry])
    setMileage("")
    setDate("")
    setError("")

    toast({
      title: "Mileage updated",
      description: `New mileage of ${mileageValue.toLocaleString()} miles has been recorded.`,
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

  const chartData = entries.map((entry) => ({
    date: formatDate(entry.date),
    mileage: entry.mileage,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mileage Tracker</CardTitle>
        <CardDescription>Track your vehicle's mileage over time</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="mileage" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="current-mileage">Current Mileage</Label>
            <Input
              id="current-mileage"
              type="number"
              min="1"
              placeholder="Enter current mileage"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onClick={(e) => {
                // This ensures the date picker opens when clicking anywhere in the input
                const target = e.target as HTMLInputElement
                target.showPicker()
              }}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit">Update Mileage</Button>
        </form>

        <div className="border rounded-md">
          <div className="bg-muted px-4 py-2 border-b">
            <h3 className="font-medium">Recent Entries</h3>
          </div>
          <div className="divide-y">
            {entries
              .slice()
              .reverse()
              .slice(0, 5)
              .map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-medium">{entry.mileage.toLocaleString()} miles</p>
                    <p className="text-sm text-muted-foreground">{formatDate(entry.date)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

