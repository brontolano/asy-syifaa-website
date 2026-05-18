"use client";

import React from "react";

type WidgetErrorBoundaryProps = {
  title: string;
  children: React.ReactNode;
};

type WidgetErrorBoundaryState = {
  hasError: boolean;
};

export default class WidgetErrorBoundary extends React.Component<WidgetErrorBoundaryProps, WidgetErrorBoundaryState> {
  constructor(props: WidgetErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Tetap log untuk observability browser, tapi jangan blok widget lain.
    console.error("WidgetErrorBoundary:", this.props.title, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <article className="asf-card" style={{ padding: "0.9rem" }}>
          <p style={{ margin: 0, fontWeight: 700 }}>{this.props.title}</p>
          <p style={{ margin: "0.3rem 0 0", fontSize: "0.82rem", color: "var(--danger-fg)" }}>
            Widget gagal dirender. Modul lain tetap berjalan.
          </p>
        </article>
      );
    }
    return this.props.children;
  }
}
