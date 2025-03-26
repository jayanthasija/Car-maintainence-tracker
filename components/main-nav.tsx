"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">Car Maintenance Tracker</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/vehicles"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/vehicles") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Vehicles
        </Link>
        <Link
          href="/services"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/services") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Services
        </Link>
        <Link
          href="/reminders"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/reminders") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Reminders
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </nav>
    </div>
  )
}

