"use client";

import { useEffect, useRef, useState } from "react";
import Ikon from "./Ikon";
import { useProgress } from "@/lib/progress";
import { BADGES } from "@/data/gamifikasi";

export default function BadgeToast() {
  const { badge, hydrated } = useProgress();
  const [antrian, setAntrian] = useState([]);
  const sebelumnya = useRef(null);

  useEffect(() => {
    if (!hydrated) return;
    if (sebelumnya.current === null) {
      sebelumnya.current = badge;
      return;
    }
    const baru = badge.filter((b) => !sebelumnya.current.includes(b));
    sebelumnya.current = badge;
    if (baru.length) setAntrian((q) => [...q, ...baru]);
  }, [badge, hydrated]);

  useEffect(() => {
    if (!antrian.length) return;
    const t = window.setTimeout(() => setAntrian((q) => q.slice(1)), 4500);
    return () => window.clearTimeout(t);
  }, [antrian]);

  if (!antrian.length) return null;
  const data = BADGES.find((b) => b.id === antrian[0]);
  if (!data) return null;

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 left-4 sm:left-auto z-50 sm:w-80 animate-pop">
      <div className="flex items-start gap-3 rounded-2xl border border-accent/30 bg-white p-4 shadow-xl">
        <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent-light text-accent shrink-0">
          <Ikon nama={data.ikon} className="w-6 h-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-accent">
            Badge terbuka
          </p>
          <p className="font-bold leading-tight">{data.nama}</p>
          <p className="text-xs text-muted mt-0.5">{data.deskripsi}</p>
        </div>
        <button
          type="button"
          onClick={() => setAntrian((q) => q.slice(1))}
          aria-label="Tutup notifikasi"
          className="text-muted hover:text-navy"
        >
          <Ikon nama="X" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
