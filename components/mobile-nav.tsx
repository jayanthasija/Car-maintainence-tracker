"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
    },
    {
      href: "/vehicles",
      label: "Vehicles",
    },
    {
      href: "/services",
      label: "Services",
    },
    {
      href: "/reminders",
      label: "Reminders",
    },
  ]

  return (
    <div className="flex w-full items-center justify-between md:hidden">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold">Car Maintenance</span>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <div className="px-7">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
              <span className="font-bold">Car Maintenance Tracker</span>
            </Link>
          </div>
          <div className="flex flex-col space-y-3 p-7">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground",
                  pathname === route.href && "text-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <div className="p-7">
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

