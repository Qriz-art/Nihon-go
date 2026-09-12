"use client";

import { useState } from "react";
import Link from "next/link";
import Ikon from "@/components/Ikon";
import Pill, { PillLevel } from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import PageHeader from "@/components/PageHeader";
import { useProgress } from "@/lib/progress";
import { LEVELS, TIPE_LESSON } from "@/data/level";

const IKON_TIPE = {
  huruf: "Languages",
  kosakata: "BookOpen",
  grammar: "Braces",
  kanji: "BookType",
  kaiwa: "MessagesSquare",
  membaca: "BookMarked",
  kuis: "Target",
};

export default function BelajarPage() {
  const p = useProgress();
  const [buka, setBuka] = useState(() => LEVELS.map((_, i) => i === 0));

  const toggle = (i) =>
    setBuka((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div>
      <PageHeader
        judul="Jalur Belajar"
        deskripsi="Tiga level bertahap dengan unit dan pelajaran yang bisa ditandai selesai. Semua progress tersimpan di browser kamu."
        ikon="Route"
        aksi={
          <Link href="/dashboard" className="btn btn-ghost px-4 py-2.5 text-sm">
            <Ikon nama="LayoutDashboard" className="w-4 h-4" />
            Dashboard
          </Link>
        }
      />

      {/* Ringkasan */}
      <section className="grid gap-4 sm:grid-cols-3 mb-6">
        {LEVELS.map((lv) => {
          const semua = lv.units.flatMap((u) => u.lessons);
          const selesai = semua.filter((l) => p.pelajaranSelesai.includes(l.id)).length;
          const persen = semua.length ? (selesai / semua.length) * 100 : 0;
          return (
            <div key={lv.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="jp flex items-center justify-center w-9 h-9 rounded-xl bg-navy/10 text-navy font-bold">
                    {lv.kanji}
                  </span>
                  <div>
                    <p className="font-bold leading-tight">{lv.nama}</p>
                    <p className="text-xs text-muted">{lv.durasi}</p>
                  </div>
                </div>
                <span className="text-sm font-bold">
                  {p.hydrated ? Math.round(persen) : 0}%
                </span>
              </div>
              <ProgressBar
                nilai={p.hydrated ? persen : 0}
                warna={lv.id === 1 ? "hijau" : lv.id === 2 ? "biru" : "emas"}
                className="mt-3"
              />
              <p className="mt-2 text-xs text-muted">
                {p.hydrated ? selesai : 0} / {semua.length} pelajaran selesai
              </p>
            </div>
          );
        })}
      </section>

      {/* Daftar level */}
      <div className="space-y-5">
        {LEVELS.map((lv, i) => {
          const semua = lv.units.flatMap((u) => u.lessons);
          const selesai = semua.filter((l) => p.pelajaranSelesai.includes(l.id)).length;
          const persen = semua.length ? (selesai / semua.length) * 100 : 0;

          return (
            <section key={lv.id} className="card overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface/60 transition-colors"
              >
                <span className="jp flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-light text-primary-dark text-xl font-bold shrink-0">
                  {lv.kanji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold">Level {lv.id} — {lv.nama}</h2>
                    <PillLevel level={lv.id} />
                  </div>
                  <p className="mt-1 text-sm text-muted line-clamp-2">{lv.ringkasan}</p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <ProgressBar
                      nilai={p.hydrated ? persen : 0}
                      warna={lv.id === 1 ? "hijau" : lv.id === 2 ? "biru" : "emas"}
                      tinggi="h-1.5"
                      className="flex-1 max-w-xs"
                    />
                    <span className="text-xs text-muted shrink-0">
                      {p.hydrated ? selesai : 0}/{semua.length}
                    </span>
                  </div>
                </div>
                <Ikon
                  nama="ChevronDown"
                  className={`w-5 h-5 text-muted shrink-0 transition-transform ${
                    buka[i] ? "rotate-180" : ""
                  }`}
                />
              </button>

              {buka[i] && (
                <div className="border-t border-border divide-y divide-border animate-fade-in">
                  {lv.units.map((unit) => (
                    <div key={unit.id} className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-semibold text-sm">{unit.judul}</h3>
                          <p className="text-xs text-muted mt-0.5">{unit.deskripsi}</p>
                        </div>
                        <Pill warna="netral">
                          {unit.lessons.filter((l) => p.pelajaranSelesai.includes(l.id)).length}
                          /{unit.lessons.length}
                        </Pill>
                      </div>

                      <ul className="space-y-2">
                        {unit.lessons.map((lesson) => {
                          const selesaiIni = p.pelajaranSelesai.includes(lesson.id);
                          const tipe = TIPE_LESSON[lesson.tipe] || {};
                          return (
                            <li
                              key={lesson.id}
                              className={`rounded-xl border p-3 transition-colors ${
                                selesaiIni
                                  ? "border-success/30 bg-success-light/40"
                                  : "border-border hover:border-primary/40"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${
                                    selesaiIni
                                      ? "bg-success text-white"
                                      : "bg-surface text-navy"
                                  }`}
                                >
                                  <Ikon
                                    nama={selesaiIni ? "Check" : IKON_TIPE[lesson.tipe] || "BookOpen"}
                                    className="w-4 h-4"
                                  />
                                </span>

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-semibold text-sm">{lesson.judul}</p>
                                    <Pill warna="netral">{tipe.label}</Pill>
                                  </div>
                                  <p className="mt-1 text-xs text-muted leading-relaxed">
                                    {lesson.ringkasan}
                                  </p>
                                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                                    <span className="flex items-center gap-1.5">
                                      <Ikon nama="Clock" className="w-3.5 h-3.5" />
                                      {lesson.durasi} menit
                                    </span>
                                    <Link
                                      href={`${tipe.href || "/belajar"}#${lesson.id}`}
                                      className="font-semibold text-primary hover:underline"
                                    >
                                      Buka materi
                                    </Link>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => p.selesaikanPelajaran(lesson)}
                                  className={`btn px-3 py-2 text-xs shrink-0 ${
                                    selesaiIni ? "btn-ghost" : "btn-navy"
                                  }`}
                                >
                                  <Ikon
                                    nama={selesaiIni ? "RotateCcw" : "Check"}
                                    className="w-3.5 h-3.5"
                                  />
                                  <span className="hidden sm:inline">
                                    {selesaiIni ? "Batalkan" : "Selesai"}
                                  </span>
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
