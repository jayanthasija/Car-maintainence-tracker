"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AddServicePage() {
  const { toast } = useToast()
  const router = useRouter()

  const [serviceType, setServiceType] = useState("")
  const [date, setDate] = useState("")
  const [mileage, setMileage] = useState("")
  const [cost, setCost] = useState("")
  const [shop, setShop] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!serviceType) newErrors.serviceType = "Service type is required"
    if (!date) newErrors.date = "Date is required"

    if (!mileage) {
      newErrors.mileage = "Mileage is required"
    } else if (isNaN(Number.parseInt(mileage)) || Number.parseInt(mileage) <= 0) {
      newErrors.mileage = "Mileage must be a positive number"
    }

    if (!cost) {
      newErrors.cost = "Cost is required"
    } else if (isNaN(Number.parseFloat(cost)) || Number.parseFloat(cost) < 0) {
      newErrors.cost = "Cost must be a valid number"
    }

    if (!shop) newErrors.shop = "Shop name is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    toast({
      title: "Service record added",
      description: "Your service record has been successfully added.",
    })

    // Reset form after success
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <div className="container px-4 py-6 mx-auto max-w-2xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add Service Record</CardTitle>
          <CardDescription>Log a new maintenance or repair service for your vehicle</CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Service Record Added</h3>
              <p className="text-center text-muted-foreground mb-6">
                Your service record has been successfully added to your maintenance history.
              </p>
              <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="service-type">Service Type</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger id="service-type" className={errors.serviceType ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oil-change">Oil Change</SelectItem>
                    <SelectItem value="tire-rotation">Tire Rotation</SelectItem>
                    <SelectItem value="brake-service">Brake Service</SelectItem>
                    <SelectItem value="battery-replacement">Battery Replacement</SelectItem>
                    <SelectItem value="air-filter">Air Filter Replacement</SelectItem>
                    <SelectItem value="transmission">Transmission Service</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.serviceType && <p className="text-sm text-destructive">{errors.serviceType}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date">Service Date</Label>
                <Input
                  id="date"
                  type="date"
                  max={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={errors.date ? "border-destructive" : ""}
                  onClick={(e) => {
                    // This ensures the date picker opens when clicking anywhere in the input
                    const target = e.target as HTMLInputElement
                    target.showPicker()
                  }}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    min="1"
                    placeholder="45000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className={errors.mileage ? "border-destructive" : ""}
                  />
                  {errors.mileage && <p className="text-sm text-destructive">{errors.mileage}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="75.00"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className={errors.cost ? "border-destructive" : ""}
                  />
                  {errors.cost && <p className="text-sm text-destructive">{errors.cost}</p>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="shop">Shop / Service Provider</Label>
                <Input
                  id="shop"
                  placeholder="Quick Lube"
                  value={shop}
                  onChange={(e) => setShop(e.target.value)}
                  className={errors.shop ? "border-destructive" : ""}
                />
                {errors.shop && <p className="text-sm text-destructive">{errors.shop}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional details about the service..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Please fix the errors above before submitting.</AlertDescription>
                </Alert>
              )}
            </form>
          )}
        </CardContent>
        {!isSuccess && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Service Record"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

