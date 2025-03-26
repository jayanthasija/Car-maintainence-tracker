"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
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
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Settings, Trash2 } from "lucide-react"

type Reminder = {
  id: string
  title: string
  description: string
  type: string
  date?: string
  mileage?: number
  recurring: boolean
  interval?: string
  enabled: boolean
}

export default function RemindersPage() {
  const { toast } = useToast()
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Oil Change",
      description: "Regular oil change with synthetic oil",
      type: "mileage",
      mileage: 48000,
      recurring: true,
      interval: "3000",
      enabled: true,
    },
    {
      id: "2",
      title: "Tire Rotation",
      description: "Rotate tires for even wear",
      type: "mileage",
      mileage: 50000,
      recurring: true,
      interval: "5000",
      enabled: true,
    },
    {
      id: "3",
      title: "Annual Inspection",
      description: "State vehicle inspection",
      type: "date",
      date: "2024-06-15",
      recurring: true,
      interval: "year",
      enabled: true,
    },
    {
      id: "4",
      title: "Insurance Renewal",
      description: "Car insurance policy renewal",
      type: "date",
      date: "2024-04-10",
      recurring: true,
      interval: "year",
      enabled: true,
    },
  ])

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("mileage")
  const [date, setDate] = useState("")
  const [mileage, setMileage] = useState("")
  const [recurring, setRecurring] = useState(false)
  const [interval, setInterval] = useState("")
  const [formError, setFormError] = useState("")
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null)

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setType("mileage")
    setDate("")
    setMileage("")
    setRecurring(false)
    setInterval("")
    setFormError("")
    setEditingReminder(null)
  }

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder)
    setTitle(reminder.title)
    setDescription(reminder.description)
    setType(reminder.type)
    setDate(reminder.date || "")
    setMileage(reminder.mileage ? reminder.mileage.toString() : "")
    setRecurring(reminder.recurring)
    setInterval(reminder.interval || "")
  }

  const handleDeleteReminder = (id: string, title: string) => {
    const deletedReminder = reminders.find((r) => r.id === id)
    setReminders(reminders.filter((r) => r.id !== id))

    toast({
      title: "Reminder deleted",
      description: `${title} reminder has been deleted.`,
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (deletedReminder) {
              setReminders((prev) => [...prev, deletedReminder])
              toast({
                title: "Reminder restored",
                description: `${title} reminder has been restored.`,
              })
            }
          }}
        >
          Undo
        </Button>
      ),
    })
  }

  const handleToggleReminder = (id: string, enabled: boolean) => {
    setReminders(reminders.map((r) => (r.id === id ? { ...r, enabled } : r)))

    const reminder = reminders.find((r) => r.id === id)
    if (reminder) {
      toast({
        title: enabled ? "Reminder enabled" : "Reminder disabled",
        description: `${reminder.title} reminder has been ${enabled ? "enabled" : "disabled"}.`,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title) {
      setFormError("Title is required")
      return
    }

    if (type === "mileage" && !mileage) {
      setFormError("Mileage is required for mileage-based reminders")
      return
    }

    if (type === "date" && !date) {
      setFormError("Date is required for date-based reminders")
      return
    }

    if (recurring && !interval) {
      setFormError("Interval is required for recurring reminders")
      return
    }

    const newReminder: Reminder = {
      id: editingReminder ? editingReminder.id : Date.now().toString(),
      title,
      description,
      type,
      date: type === "date" ? date : undefined,
      mileage: type === "mileage" ? Number.parseInt(mileage) : undefined,
      recurring,
      interval: recurring ? interval : undefined,
      enabled: true,
    }

    if (editingReminder) {
      // Update existing reminder
      setReminders(reminders.map((r) => (r.id === editingReminder.id ? newReminder : r)))

      toast({
        title: "Reminder updated",
        description: `${title} reminder has been updated.`,
      })
    } else {
      // Add new reminder
      setReminders([...reminders, newReminder])

      toast({
        title: "Reminder created",
        description: `${title} reminder has been created.`,
      })
    }

    resetForm()
  }

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Maintenance Reminders</h1>
            <p className="text-muted-foreground">Set up and manage reminders for upcoming maintenance</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingReminder ? "Edit Reminder" : "Create New Reminder"}</DialogTitle>
                <DialogDescription>
                  {editingReminder
                    ? "Update your maintenance reminder details."
                    : "Set up a new maintenance reminder for your vehicle."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Oil Change" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Details about this maintenance task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Reminder Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mileage">Mileage-based</SelectItem>
                      <SelectItem value="date">Date-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {type === "mileage" ? (
                  <div className="grid gap-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="50000"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch id="recurring" checked={recurring} onCheckedChange={setRecurring} />
                  <Label htmlFor="recurring">Recurring Reminder</Label>
                </div>

                {recurring && (
                  <div className="grid gap-2">
                    <Label htmlFor="interval">{type === "mileage" ? "Mileage Interval" : "Time Interval"}</Label>
                    {type === "mileage" ? (
                      <Input
                        id="interval"
                        type="number"
                        placeholder="3000"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                      />
                    ) : (
                      <Select value={interval} onValueChange={setInterval}>
                        <SelectTrigger id="interval">
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="month">Monthly</SelectItem>
                          <SelectItem value="quarter">Quarterly</SelectItem>
                          <SelectItem value="half-year">Every 6 Months</SelectItem>
                          <SelectItem value="year">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}

                {formError && <p className="text-sm text-destructive">{formError}</p>}
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingReminder ? "Update Reminder" : "Create Reminder"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className={!reminder.enabled ? "opacity-70" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CardTitle>{reminder.title}</CardTitle>
                    {reminder.type === "mileage" ? (
                      <Badge variant="secondary" className="rounded-sm">
                        Mileage
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="rounded-sm">
                        Date
                      </Badge>
                    )}
                  </div>
                  <Switch
                    checked={reminder.enabled}
                    onCheckedChange={(checked) => handleToggleReminder(reminder.id, checked)}
                  />
                </div>
                <CardDescription>{reminder.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {reminder.type === "mileage" ? (
                    <div className="flex items-center text-sm">
                      <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>At {reminder.mileage?.toLocaleString()} miles</span>
                      {reminder.recurring && reminder.interval && (
                        <span className="ml-1">
                          (every {Number.parseInt(reminder.interval).toLocaleString()} miles)
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{reminder.date && new Date(reminder.date).toLocaleDateString()}</span>
                      {reminder.recurring && reminder.interval && (
                        <span className="ml-1">
                          ({reminder.interval === "month" && "monthly"}
                          {reminder.interval === "quarter" && "quarterly"}
                          {reminder.interval === "half-year" && "every 6 months"}
                          {reminder.interval === "year" && "yearly"})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditReminder(reminder)}>
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
                        This will permanently delete the {reminder.title} reminder.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteReminder(reminder.id, reminder.title)}
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

