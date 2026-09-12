"use client";

import Link from "next/link";
import Ikon from "@/components/Ikon";
import Pill from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { useProgress } from "@/lib/progress";
import { BADGES } from "@/data/gamifikasi";
import { LEVELS } from "@/data/level";
import { KOSAKATA } from "@/data/kosakata";
import { HIRAGANA, KATAKANA } from "@/data/huruf";
import { KANJI } from "@/data/kanji";
import { GRAMMAR } from "@/data/grammar";
import { KAIWA } from "@/data/kaiwa";
import { MEMBACA } from "@/data/membaca";

function waktuLengkap(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function ProgressPage() {
  const p = useProgress();

  const kategori = [
    { label: "Huruf", selesai: p.hurufDipahami.hiragana.length + p.hurufDipahami.katakana.length, total: HIRAGANA.length + KATAKANA.length, warna: "primary" },
    { label: "Kosakata", selesai: p.kosakataDipahami.length, total: KOSAKATA.length, warna: "biru" },
    { label: "Tata Bahasa", selesai: p.grammarDipelajari.length, total: GRAMMAR.length, warna: "navy" },
    { label: "Kanji", selesai: p.kanjiDikuasai.length, total: KANJI.length, warna: "emas" },
    { label: "Kaiwa", selesai: p.kaiwaSelesai.length, total: KAIWA.length, warna: "hijau" },
    { label: "Membaca", selesai: p.membacaSelesai.length, total: MEMBACA.length, warna: "navy" },
  ];

  const totalMateri = kategori.reduce((n, k) => n + k.total, 0);
  const selesaiMateri = kategori.reduce((n, k) => n + k.selesai, 0);
  const persenTotal = totalMateri ? (selesaiMateri / totalMateri) * 100 : 0;

  const favorit = KOSAKATA.filter((k) => p.favorit.includes(k.id));
  const rataKuis = p.riwayatKuis.length
    ? Math.round(
        p.riwayatKuis.reduce((n, r) => n + r.persen, 0) / p.riwayatKuis.length
      )
    : 0;

  const badgeTerbuka = p.hydrated ? p.badge : [];

  return (
    <div>
      <PageHeader
        judul="Progress & Pencapaian"
        deskripsi="Ringkasan semua yang sudah kamu pelajari: XP, streak, badge, riwayat belajar, favorit, dan statistik kuis. Semua data tersimpan di browser kamu."
        ikon="Trophy"
        aksi={
          <Link href="/dashboard" className="btn btn-ghost px-4 py-2.5 text-sm">
            <Ikon nama="LayoutDashboard" className="w-4 h-4" />
            Dashboard
          </Link>
        }
      />

      {/* Ringkasan */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          ikon="Zap"
          label="Total XP"
          nilai={p.hydrated ? p.xp : 0}
          keterangan={`Level ${p.hydrated ? p.levelPengguna : 1}`}
          warna="emas"
        />
        <StatCard
          ikon="Flame"
          label="Streak"
          nilai={`${p.hydrated ? p.streak : 0} hari`}
          keterangan="Belajar berturut-turut"
          warna="merah"
        />
        <StatCard
          ikon="Award"
          label="Badge terbuka"
          nilai={`${badgeTerbuka.length} / ${BADGES.length}`}
          keterangan="Kumpulkan semuanya"
          warna="navy"
        />
        <StatCard
          ikon="Target"
          label="Rata-rata kuis"
          nilai={p.hydrated ? `${rataKuis}%` : "0%"}
          keterangan={`${p.hydrated ? p.riwayatKuis.length : 0} sesi dikerjakan`}
          warna="hijau"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ringkasan belajar */}
        <section className="lg:col-span-2 space-y-6">
          <div className="card p-5 sm:p-6">
            <h2 className="font-bold mb-4">Progress keseluruhan</h2>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-bold text-primary">
                {p.hydrated ? Math.round(persenTotal) : 0}%
              </span>
              <span className="text-xs text-muted">
                {p.hydrated ? selesaiMateri : 0} / {totalMateri} materi
              </span>
            </div>
            <ProgressBar nilai={p.hydrated ? persenTotal : 0} warna="primary" tinggi="h-2.5" />

            <div className="mt-5 space-y-3.5">
              {kategori.map((k) => {
                const persen = k.total ? (k.selesai / k.total) * 100 : 0;
                return (
                  <div key={k.label}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-semibold">{k.label}</span>
                      <span className="text-xs text-muted">
                        {p.hydrated ? k.selesai : 0} / {k.total}
                      </span>
                    </div>
                    <ProgressBar
                      nilai={p.hydrated ? persen : 0}
                      warna={k.warna}
                      tinggi="h-1.5"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Checklist unit */}
          <div className="card p-5 sm:p-6">
            <h2 className="font-bold mb-4">Checklist unit</h2>
            <div className="space-y-5">
              {LEVELS.map((lv) => (
                <div key={lv.id}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="jp flex items-center justify-center w-7 h-7 rounded-lg bg-navy/10 text-navy font-bold text-sm">
                      {lv.kanji}
                    </span>
                    <span className="font-semibold text-sm">Level {lv.id} — {lv.nama}</span>
                  </div>
                  <ul className="space-y-2">
                    {lv.units.map((u) => {
                      const selesai = u.lessons.filter((l) =>
                        p.pelajaranSelesai.includes(l.id)
                      ).length;
                      const lengkap = selesai === u.lessons.length;
                      return (
                        <li
                          key={u.id}
                          className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${
                            lengkap ? "border-success/40 bg-success-light/40" : "border-border"
                          }`}
                        >
                          <span
                            className={`flex items-center justify-center w-6 h-6 rounded-lg shrink-0 ${
                              lengkap ? "bg-success text-white" : "bg-surface text-muted"
                            }`}
                          >
                            <Ikon nama={lengkap ? "Check" : "Minus"} className="w-3.5 h-3.5" />
                          </span>
                          <span className="min-w-0 flex-1 text-sm truncate">{u.judul}</span>
                          <span className="text-xs text-muted shrink-0">
                            {p.hydrated ? selesai : 0}/{u.lessons.length}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div className="card p-5 sm:p-6">
            <h2 className="font-bold mb-1">Badge pencapaian</h2>
            <p className="text-sm text-muted mb-4">
              {badgeTerbuka.length} dari {BADGES.length} badge sudah terbuka.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {BADGES.map((b) => {
                const terbuka = badgeTerbuka.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 ${
                      terbuka ? "border-accent/40 bg-accent-light/40" : "border-border opacity-70"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
                        terbuka ? "bg-accent text-white" : "bg-surface text-muted"
                      }`}
                    >
                      <Ikon nama={terbuka ? b.ikon : "Lock"} className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold">{b.nama}</p>
                      <p className="text-xs text-muted mt-0.5 leading-relaxed">
                        {b.deskripsi}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Kolom kanan */}
        <section className="space-y-6">
          <div className="card p-5">
            <h2 className="font-bold mb-3">Level & XP</h2>
            <div className="flex items-end justify-between text-sm mb-2">
              <span className="font-bold text-lg">Level {p.hydrated ? p.levelPengguna : 1}</span>
              <span className="text-muted text-xs">{p.hydrated ? p.xp : 0} XP</span>
            </div>
            <ProgressBar nilai={p.hydrated ? p.persenLevel : 0} warna="primary" />
            <p className="text-xs text-muted mt-2">
              {p.hydrated ? p.xpLevelIni : 0} / {p.xpUntukNaik} XP menuju level berikutnya
            </p>

            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-semibold">Target harian</span>
                <span className="text-xs text-muted">{p.targetHarian} XP</span>
              </div>
              <ProgressBar
                nilai={
                  p.targetHarian ? Math.min(((p.hydrated ? p.xp : 0) / p.targetHarian) * 100, 100) : 0
                }
                warna="emas"
                tinggi="h-1.5"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {[30, 50, 80, 120].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => p.setTargetHarian(n)}
                    className={`btn px-3 py-1.5 text-xs ${
                      p.targetHarian === n ? "btn-navy" : "btn-ghost"
                    }`}
                  >
                    {n} XP
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-bold mb-3">Materi favorit</h2>
            {favorit.length === 0 ? (
              <p className="text-sm text-muted leading-relaxed">
                Belum ada kosakata favorit. Tekan ikon hati di halaman{" "}
                <Link href="/kosakata" className="text-primary font-semibold hover:underline">
                  Kosakata
                </Link>{" "}
                untuk menyimpannya di sini.
              </p>
            ) : (
              <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {favorit.map((k) => (
                  <li key={k.id} className="rounded-xl bg-surface px-3.5 py-2.5">
                    <p className="jp text-sm font-semibold">{k.jepang}</p>
                    <p className="text-xs text-muted">{k.arti}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card p-5">
            <h2 className="font-bold mb-3">Riwayat belajar</h2>
            {p.hydrated && p.aktivitas.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {[...p.aktivitas].reverse().map((a, i) => (
                  <li key={`${a.waktu}-${i}`} className="flex items-start gap-3">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5 ${
                        a.tipe === "badge"
                          ? "bg-accent-light text-accent"
                          : "bg-surface text-muted"
                      }`}
                    >
                      <Ikon
                        nama={a.tipe === "badge" ? "Award" : "CheckCircle2"}
                        className="w-3.5 h-3.5"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm leading-snug">{a.label}</p>
                      <p className="text-xs text-muted mt-0.5">
                        {waktuLengkap(a.waktu)}
                        {a.xp ? ` • +${a.xp} XP` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted leading-relaxed">
                Belum ada riwayat. Mulai satu pelajaran untuk melihat aktivitasmu di sini.
              </p>
            )}
          </div>

          <div className="card p-5">
            <h2 className="font-bold mb-3">Statistik kuis</h2>
            {p.hydrated && p.riwayatKuis.length > 0 ? (
              <>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Pill warna="emas">{p.riwayatKuis.length} sesi</Pill>
                  <Pill warna="hijau">Rata-rata {rataKuis}%</Pill>
                  <Pill warna="merah">
                    Terbaik{" "}
                    {Math.max(...p.riwayatKuis.map((r) => r.persen))}%
                  </Pill>
                </div>
                <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {p.riwayatKuis.map((r, i) => (
                    <li
                      key={i}
                      className="rounded-xl bg-surface px-3.5 py-2.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{r.nama}</p>
                        <p className="text-xs text-muted">
                          {r.benar}/{r.total} benar • {waktuLengkap(r.waktu)}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-primary shrink-0">
                        {r.persen}%
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <EmptyState
                ikon="Target"
                judul="Belum ada hasil kuis"
                deskripsi="Kerjakan satu sesi kuis atau tes kemampuan untuk melihat statistik di sini."
                aksi={
                  <Link href="/kuis" className="btn btn-primary px-4 py-2.5 text-sm">
                    Mulai kuis
                  </Link>
                }
              />
            )}
          </div>

          <div className="card p-5">
            <h2 className="font-bold mb-2">Kelola data belajar</h2>
            <p className="text-sm text-muted leading-relaxed">
              Semua progress disimpan di <code className="text-navy">localStorage</code>{" "}
              browser kamu. Menghapus data akan mengosongkan XP, streak, badge, favorit,
              dan riwayat kuis.
            </p>
            <button
              type="button"
              onClick={() => p.resetProgress()}
              className="btn btn-ghost px-4 py-2.5 text-sm mt-3 text-danger"
            >
              <Ikon nama="Trash2" className="w-4 h-4" />
              Reset semua progress
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
