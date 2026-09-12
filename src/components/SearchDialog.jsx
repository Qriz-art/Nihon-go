"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Ikon from "./Ikon";
import { cariKonten } from "@/lib/pencarian";

const CONTOH = [
  { kata: "hiragana", tipe: "Materi" },
  { kata: "partikel", tipe: "Grammar" },
  { kata: "salam", tipe: "Kosakata" },
  { kata: "kanji", tipe: "Kanji" },
  { kata: "restoran", tipe: "Kaiwa" },
  { kata: "cuaca", tipe: "Membaca" },
];

export default function SearchDialog({ buka, tutup }) {
  const [kueri, setKueri] = useState("");
  const [aktif, setAktif] = useState(0);
  const router = useRouter();
  const inputRef = useRef(null);

  const hasil = useMemo(() => cariKonten(kueri), [kueri]);

  const pilih = useCallback(
    (item) => {
      if (item.tipe === "Kosakata") {
        try {
          window.sessionStorage.setItem("nihongo:cari", item.cari || "");
        } catch {
          // abaikan
        }
      }
      tutup();
      router.push(item.href);
    },
    [router, tutup]
  );

  useEffect(() => {
    if (buka) {
      setKueri("");
      setAktif(0);
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [buka]);

  useEffect(() => {
    if (!buka) return;
    const onKey = (e) => {
      if (e.key === "Escape") tutup();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setAktif((i) => Math.min(i + 1, Math.max(hasil.length - 1, 0)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setAktif((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && hasil[aktif]) {
        pilih(hasil[aktif]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buka, hasil, aktif, tutup, pilih]);

  if (!buka) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Tutup pencarian"
        onClick={tutup}
        className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]"
      />
      <div className="relative w-full max-w-xl card shadow-2xl overflow-hidden animate-pop">
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Ikon nama="Search" className="w-5 h-5 text-muted shrink-0" />
          <input
            ref={inputRef}
            value={kueri}
            onChange={(e) => {
              setKueri(e.target.value);
              setAktif(0);
            }}
            placeholder="Cari materi, kosakata, kanji, atau dialog..."
            className="w-full py-4 bg-transparent outline-none text-sm placeholder:text-muted"
          />
          <kbd className="hidden sm:block text-[10px] font-semibold text-muted border border-border rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {!kueri && (
            <div className="p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                Coba cari
              </p>
              <div className="flex flex-wrap gap-2">
                {CONTOH.map((c) => (
                  <button
                    key={c.kata}
                    type="button"
                    onClick={() => setKueri(c.kata)}
                    className="chip bg-surface text-navy border-border hover:border-primary hover:text-primary"
                  >
                    {c.kata}
                  </button>
                ))}
              </div>
            </div>
          )}

          {kueri && hasil.length === 0 && (
            <div className="p-6 text-center text-sm text-muted">
              Tidak ada hasil untuk “{kueri}”. Coba kata lain seperti “partikel” atau
              “cuaca”.
            </div>
          )}

          <ul>
            {hasil.map((item, i) => (
              <li key={`${item.href}-${i}`}>
                <button
                  type="button"
                  onMouseEnter={() => setAktif(i)}
                  onClick={() => pilih(item)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    i === aktif ? "bg-surface" : "hover:bg-surface"
                  }`}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-light text-primary-dark shrink-0">
                    <Ikon nama="ChevronRight" className="w-4 h-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold truncate">
                      {item.label}
                    </span>
                    <span className="block text-xs text-muted truncate">{item.sub}</span>
                  </span>
                  <span className="chip bg-surface text-muted border-border shrink-0">
                    {item.tipe}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
