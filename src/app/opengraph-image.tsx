import { ImageResponse } from "next/og";
import { contact, site } from "@/data/profile";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0a0a0b",
          color: "#ececef",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", color: "#9c9ca7" }}>sks_ / portfolio</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#ff5d1f" }}>
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 99,
                background: "#ff5d1f",
              }}
            />
            <div style={{ display: "flex" }}>open to SDE roles · 2027</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 31, color: "#9c9ca7", marginTop: 18 }}>
            Spring Boot backends · Next.js frontends · systems end to end
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#9c9ca7",
          }}
        >
          <div style={{ display: "flex" }}>github.com/{contact.githubHandle}</div>
          <div style={{ display: "flex" }}>VIT Bhopal · B.Tech CSE</div>
        </div>
      </div>
    ),
    size
  );
}
