"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 120,
  },
  {
    name: "Feb",
    total: 0,
  },
  {
    name: "Mar",
    total: 240,
  },
  {
    name: "Apr",
    total: 80,
  },
  {
    name: "May",
    total: 320,
  },
  {
    name: "Jun",
    total: 0,
  },
  {
    name: "Jul",
    total: 180,
  },
  {
    name: "Aug",
    total: 0,
  },
  {
    name: "Sep",
    total: 450,
  },
  {
    name: "Oct",
    total: 0,
  },
  {
    name: "Nov",
    total: 0,
  },
  {
    name: "Dec",
    total: 0,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Cost"]} labelFormatter={(label) => `Month: ${label}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

