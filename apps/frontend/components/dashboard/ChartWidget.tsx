"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";

type ChartWidgetProps = {
  title: string;
  subtitle?: string;
  type: "bar" | "line" | "donut";
  data: Array<Record<string, string | number>>;
  xKey?: string;
  yKey?: string;
  dataKey?: string;
  colors?: string[];
  height?: number;
};

const DEFAULT_COLORS = ["#1f6b43", "#245f82", "#8f3e58", "#7a5b2f", "#4c4383", "#2e5b67"];

export default function ChartWidget({
  title,
  subtitle,
  type,
  data,
  xKey = "label",
  yKey = "value",
  dataKey = "value",
  colors = DEFAULT_COLORS,
  height = 260
}: ChartWidgetProps) {
  const empty = !Array.isArray(data) || data.length === 0;

  return (
    <article className="asf-card" style={{ padding: "0.95rem" }}>
      <div style={{ marginBottom: "0.65rem" }}>
        <h3 style={{ margin: 0, fontSize: "0.94rem" }}>{title}</h3>
        {subtitle ? (
          <p style={{ margin: "0.24rem 0 0", fontSize: "0.78rem", color: "var(--text-muted)" }}>
            {subtitle}
          </p>
        ) : null}
      </div>

      {empty ? (
        <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
          Data belum tersedia.
        </p>
      ) : (
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            {type === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Bar dataKey={yKey} fill={colors[0]} radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : null}

            {type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={yKey}
                  stroke={colors[0]}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            ) : null}

            {type === "donut" ? (
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={data}
                  dataKey={dataKey}
                  nameKey={xKey}
                  innerRadius={56}
                  outerRadius={94}
                  paddingAngle={2}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${String(entry[xKey])}-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            ) : null}
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}
