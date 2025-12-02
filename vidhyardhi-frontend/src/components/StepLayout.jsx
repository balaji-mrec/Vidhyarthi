import React from "react";
import { Link } from "react-router-dom";

/**
 * items = [{ id, label, href }]
 * activeId = id of currently active item (optional)
 * title = sidebar title
 */
export default function StepLayout({ title, items = [], activeId, children }) {
  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      <aside style={{ width: 300, borderRight: "1px solid #e6e6e6", padding: 16, background: "#fafafa" }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((it) => (
            <li key={it.id} style={{ marginBottom: 8 }}>
              {/* use Link so URLs change */}
              <Link
                to={it.href}
                style={{
                  display: "block",
                  padding: "8px 12px",
                  borderRadius: 6,
                  textDecoration: "none",
                  color: activeId === it.id ? "#fff" : "#222",
                  background: activeId === it.id ? "#00bfa5" : "transparent",
                }}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>{children}</main>
    </div>
  );
}
