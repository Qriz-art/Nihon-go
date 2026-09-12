"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Ikon from "@/components/Ikon";
import Pill, { PillLevel } from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import PageHeader from "@/components/PageHeader";
import AudioButton from "@/components/AudioButton";
import EmptyState from "@/components/EmptyState";
import { useProgress } from "@/lib/progress";
import { GRAMMAR } from "@/data/grammar";

export default function GrammarPage() {
  const p = useProgress();
  const [cari, setCari] = useState("");
  const [level, setLevel] = useState(0);
  const [terbuka, setTerbuka] = useState(null);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const ada = GRAMMAR.find((g) => g.id === hash);
    if (!ada) return;
    setTerbuka(hash);
    const t = window.setTimeout(() => {
      document.getElementById(`grammar-${hash}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 180);
    return () => window.clearTimeout(t);
  }, []);

  const hasil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return GRAMMAR.filter((g) => {
      const cocokLevel = !level || g.level === level;
      const cocokCari =
        !q ||
        g.nama.toLowerCase().includes(q) ||
        g.pola.toLowerCase().includes(q) ||
        g.penjelasan.toLowerCase().includes(q) ||
        g.rumus.toLowerCase().includes(q);
      return cocokLevel && cocokCari;
    });
  }, [cari, level]);

  const persen = GRAMMAR.length ? (p.grammarDipelajari.length / GRAMMAR.length) * 100 : 0;

  return (
    <div>
      <PageHeader
        judul="Tata Bahasa"
        deskripsi="Pola tata bahasa dijelaskan dalam bahasa Indonesia: rumus, fungsi, contoh kalimat, dan catatan kesalahan yang umum terjadi."
        ikon="Braces"
        aksi={
          <Link href="/kuis" className="btn btn-navy px-4 py-2.5 text-sm">
            <Ikon nama="Target" className="w-4 h-4" />
            Latihan pola
          </Link>
        }
      />

      <div className="card p-4 sm:p-5 mb-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[14rem]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">Pola yang sudah dipelajari</span>
              <span className="text-xs text-muted">
                {p.hydrated ? p.grammarDipelajari.length : 0} / {GRAMMAR.length}
              </span>
            </div>
            <ProgressBar nilai={p.hydrated ? persen : 0} warna="navy" />
          </div>
        </div>
      </div>

      <div className="card p-4 mb-5 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Ikon
            nama="Search"
            className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari pola, mis. “partikel”, “て”, “ことができます”..."
            className="w-full rounded-xl border border-border bg-white pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { v: 0, l: "Semua level" },
            { v: 1, l: "Level 1 — Pemula" },
            { v: 2, l: "Level 2 — Dasar" },
            { v: 3, l: "Level 3 — Menengah" },
          ].map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setLevel(o.v)}
              className={`btn px-3.5 py-2 text-xs ${level === o.v ? "btn-primary" : "btn-ghost"}`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      {hasil.length === 0 ? (
        <EmptyState
          ikon="Search"
          judul="Pola tidak ditemukan"
          deskripsi="Coba kata kunci lain, misalnya “partikel”, “bentuk”, atau “pengandaian”."
          aksi={
            <button
              type="button"
              onClick={() => {
                setCari("");
                setLevel(0);
              }}
              className="btn btn-primary px-4 py-2.5 text-sm"
            >
              Reset filter
            </button>
          }
        />
      ) : (
        <div className="space-y-4">
          {hasil.map((g) => {
            const sudah = p.grammarDipelajari.includes(g.id);
            const buka = terbuka === g.id;
            return (
              <article
                key={g.id}
                id={`grammar-${g.id}`}
                className={`card overflow-hidden scroll-mt-24 ${sudah ? "border-success/40" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setTerbuka(buka ? null : g.id)}
                  className="w-full flex items-start gap-4 p-5 text-left hover:bg-surface/50 transition-colors"
                >
                  <span className="jp flex items-center justify-center w-12 h-12 rounded-2xl bg-navy/10 text-navy text-lg font-bold shrink-0">
                    {g.pola.slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold">{g.nama}</h2>
                      <PillLevel level={g.level} />
                      {sudah && (
                        <Pill warna="hijau">
                          <Ikon nama="Check" className="w-3 h-3" />
                          Sudah dipelajari
                        </Pill>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted">{g.pola}</p>
                    {!buka && (
                      <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                        {g.penjelasan}
                      </p>
                    )}
                  </div>
                  <Ikon
                    nama="ChevronDown"
                    className={`w-5 h-5 text-muted shrink-0 transition-transform ${
                      buka ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {buka && (
                  <div className="border-t border-border p-5 space-y-5 animate-fade-in">
                    {/* Rumus */}
                    <div className="rounded-xl border border-blue-light bg-blue-light/50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-blue">
                        Rumus pola
                      </p>
                      <p className="jp mt-1.5 font-semibold text-base">{g.rumus}</p>
                    </div>

                    {/* Penjelasan */}
                    <div>
                      <h3 className="text-sm font-bold mb-1.5">Penjelasan</h3>
                      <p className="text-sm text-muted leading-relaxed">{g.penjelasan}</p>
                    </div>

                    {/* Fungsi */}
                    <div>
                      <h3 className="text-sm font-bold mb-2">Fungsi penggunaan</h3>
                      <ul className="space-y-2">
                        {g.fungsi.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                            <Ikon
                              nama="CircleCheck"
                              className="w-4 h-4 text-success shrink-0 mt-0.5"
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contoh */}
                    <div>
                      <h3 className="text-sm font-bold mb-2">Contoh kalimat</h3>
                      <div className="space-y-2.5">
                        {g.contoh.map((c, i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-border bg-white p-3.5"
                          >
                            <div className="flex items-start gap-3">
                              <div className="min-w-0 flex-1">
                                <p className="jp text-base font-semibold leading-snug">
                                  {c.jp}
                                </p>
                                {c.furigana && (
                                  <p className="jp text-xs text-muted mt-1">{c.furigana}</p>
                                )}
                                <p className="text-xs text-primary mt-1">{c.romaji}</p>
                                <p className="text-sm text-muted mt-1.5">{c.id}</p>
                              </div>
                              <AudioButton teks={c.jp} ukuran="kecil" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Catatan */}
                    <div className="rounded-xl border border-accent/30 bg-accent-light/50 p-4">
                      <h3 className="text-sm font-bold flex items-center gap-2 text-accent">
                        <Ikon nama="AlertTriangle" className="w-4 h-4" />
                        Kesalahan yang sering terjadi
                      </h3>
                      <ul className="mt-2 space-y-1.5">
                        {g.catatan.map((c) => (
                          <li key={c} className="text-sm text-muted leading-relaxed flex gap-2">
                            <span className="text-accent">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contoh tambahan */}
                    <div>
                      <h3 className="text-sm font-bold mb-2">Contoh tambahan</h3>
                      <ul className="space-y-1.5">
                        {g.tambahan.map((t, i) => (
                          <li
                            key={i}
                            className="flex items-start justify-between gap-3 rounded-lg bg-surface px-3 py-2"
                          >
                            <div>
                              <p className="jp text-sm font-semibold">{t.jp}</p>
                              <p className="text-xs text-muted mt-0.5">{t.id}</p>
                            </div>
                            <AudioButton teks={t.jp} ukuran="kecil" />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Aksi */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => p.tandaiGrammar(g.id)}
                        className={`btn px-4 py-2.5 text-sm ${sudah ? "btn-ghost" : "btn-primary"}`}
                      >
                        <Ikon nama={sudah ? "Check" : "Plus"} className="w-4 h-4" />
                        {sudah ? "Sudah dipelajari" : "Tandai sudah dipelajari"}
                      </button>
                      <Link href="/kuis" className="btn btn-navy px-4 py-2.5 text-sm">
                        <Ikon nama="Target" className="w-4 h-4" />
                        Latihan pola ini
                      </Link>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
