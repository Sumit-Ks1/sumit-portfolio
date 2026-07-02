"use client";

import { useEffect, useRef } from "react";

type MeshNode = { x: number; y: number; vx: number; vy: number; r: number };
type Packet = { a: number; b: number; t: number; v: number };
type Ripple = { x: number; y: number; t: number };

const LINK_DIST = 120;
const POINTER_DIST = 150;

export default function PeerNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nodes: MeshNode[] = [];
    let packets: Packet[] = [];
    let ripples: Ripple[] = [];
    let raf = 0;
    let last = 0;
    let spawnIn = 1.2;
    let inView = true;
    const pointer = { x: -1e4, y: -1e4, on: false };

    let accent = "#ff5d1f";
    let ink = "#ececef";
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = cs.getPropertyValue("--accent").trim() || accent;
      ink = cs.getPropertyValue("--fg").trim() || ink;
    };
    readColors();

    // both theme tokens are 6-digit hex, so this is all we need
    const rgba = (hex: string, a: number) => {
      const n = parseInt(hex.slice(1), 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };

    const seed = () => {
      const count = Math.round(Math.min(64, Math.max(22, (w * h) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16,
        r: 1.1 + Math.random() * 1.7,
      }));
      packets = [];
      ripples = [];
    };

    const drawFrame = (dt: number) => {
      ctx.clearRect(0, 0, w, h);

      if (dt > 0) {
        for (const n of nodes) {
          if (pointer.on) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 160 * 160 && d2 > 1) {
              const d = Math.sqrt(d2);
              const pull = (1 - d / 160) * 60;
              n.vx += (dx / d) * pull * dt;
              n.vy += (dy / d) * pull * dt;
            }
          }
          const sp = Math.hypot(n.vx, n.vy);
          if (sp > 28) {
            n.vx = (n.vx / sp) * 28;
            n.vy = (n.vy / sp) * 28;
          }
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < -24) n.x = w + 24;
          else if (n.x > w + 24) n.x = -24;
          if (n.y < -24) n.y = h + 24;
          else if (n.y > h + 24) n.y = -24;
        }

        spawnIn -= dt;
        if (spawnIn <= 0 && nodes.length > 1) {
          const a = Math.floor(Math.random() * nodes.length);
          let best = -1;
          let bestD = Infinity;
          for (let j = 0; j < nodes.length; j++) {
            if (j === a) continue;
            const dx = nodes[a].x - nodes[j].x;
            const dy = nodes[a].y - nodes[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < bestD) {
              bestD = d2;
              best = j;
            }
          }
          if (best >= 0 && bestD < LINK_DIST * LINK_DIST * 2.6) {
            packets.push({ a, b: best, t: 0, v: 0.8 + Math.random() * 0.7 });
          }
          spawnIn = 1.4 + Math.random() * 2.2;
        }

        for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          p.t += dt * p.v;
          if (p.t >= 1) {
            ripples.push({ x: nodes[p.b].x, y: nodes[p.b].y, t: 0 });
            packets.splice(i, 1);
          }
        }
        for (let i = ripples.length - 1; i >= 0; i--) {
          ripples[i].t += dt * 1.6;
          if (ripples[i].t >= 1) ripples.splice(i, 1);
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            ctx.strokeStyle = rgba(ink, (1 - Math.sqrt(d2) / LINK_DIST) * 0.32);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (pointer.on) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_DIST * POINTER_DIST) {
            ctx.strokeStyle = rgba(accent, (1 - Math.sqrt(d2) / POINTER_DIST) * 0.5);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = rgba(ink, 0.55);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (pointer.on) {
        ctx.fillStyle = rgba(accent, 0.9);
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of packets) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        const e = p.t * p.t * (3 - 2 * p.t);
        const x = a.x + (b.x - a.x) * e;
        const y = a.y + (b.y - a.y) * e;
        const tr = Math.max(0, e - 0.12);
        ctx.strokeStyle = rgba(accent, 0.45);
        ctx.beginPath();
        ctx.moveTo(a.x + (b.x - a.x) * tr, a.y + (b.y - a.y) * tr);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = rgba(accent, 0.28);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(accent, 0.95);
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const r of ripples) {
        ctx.strokeStyle = rgba(accent, (1 - r.t) * 0.5);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3 + r.t * 26, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.lineWidth = 1;
    };

    const step = (ts: number) => {
      raf = 0;
      if (document.hidden || !inView) {
        last = 0;
        return;
      }
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
      last = ts;
      drawFrame(dt);
      raf = requestAnimationFrame(step);
    };

    const kick = () => {
      if (!raf && !reduceMotion && inView && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(step);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduceMotion) drawFrame(0);
    };

    const burst = (x: number, y: number) => {
      if (!nodes.length) return;
      let src = 0;
      let srcD = Infinity;
      nodes.forEach((n, i) => {
        const d = (n.x - x) ** 2 + (n.y - y) ** 2;
        if (d < srcD) {
          srcD = d;
          src = i;
        }
      });
      ripples.push({ x: nodes[src].x, y: nodes[src].y, t: 0 });
      const targets = nodes
        .map((_, i) => i)
        .filter((i) => i !== src)
        .sort((i, j) => {
          const di = (nodes[i].x - nodes[src].x) ** 2 + (nodes[i].y - nodes[src].y) ** 2;
          const dj = (nodes[j].x - nodes[src].x) ** 2 + (nodes[j].y - nodes[src].y) ** 2;
          return di - dj;
        })
        .slice(0, 3);
      for (const t of targets) {
        packets.push({ a: src, b: t, t: 0, v: 1.1 + Math.random() * 0.6 });
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.on =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };

    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest("a, button, input, textarea, [role='dialog']")) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) burst(x, y);
    };

    const mo = new MutationObserver(() => {
      readColors();
      if (reduceMotion) drawFrame(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let io: IntersectionObserver | undefined;
    if (!reduceMotion) {
      io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        kick();
      });
      io.observe(canvas);
      document.addEventListener("visibilitychange", kick);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown);
      kick();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", kick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
