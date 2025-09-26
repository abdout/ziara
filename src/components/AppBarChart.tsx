"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Mon", total: 2000 },
  { name: "Tue", total: 1800 },
  { name: "Wed", total: 2200 },
  { name: "Thu", total: 2700 },
  { name: "Fri", total: 3100 },
  { name: "Sat", total: 2900 },
  { name: "Sun", total: 2500 },
];

export default function AppBarChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Bar dataKey="total" fill="#adfa1d" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}