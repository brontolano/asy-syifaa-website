"use client";

import React from "react";

type SummaryCardProps = {
  title: string;
  value: string | number;
  icon?: string;
  subtitle?: string;
  hint?: string;
  tone?: "default" | "success" | "warn" | "danger" | "info";
};

const toneColor: Record<NonNullable<SummaryCardProps["tone"]>, string> = {
  default: "var(--text)",
  success: "var(--success-fg)",
  warn: "var(--warn-fg)",
  danger: "var(--danger-fg)",
  info: "var(--accent-ink)"
};

export default function SummaryCard({
  title,
  value,
  icon = "📌",
  subtitle,
  hint,
  tone = "default"
}: SummaryCardProps) {
  return (
    <article
      className="asf-card"
      style={{
        padding: "0.85rem 0.95rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
        minHeight: "112px"
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.74rem",
          color: "var(--text-muted)",
          fontWeight: 800,
          letterSpacing: "0.04em",
          textTransform: "uppercase"
        }}
      >
        {icon} {title}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "1.45rem",
          lineHeight: 1.1,
          fontWeight: 800,
          color: toneColor[tone]
        }}
      >
        {value}
      </p>
      {subtitle ? (
        <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>
          {subtitle}
        </p>
      ) : null}
      {hint ? (
        <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--text-muted)" }}>
          {hint}
        </p>
      ) : null}
    </article>
  );
}
