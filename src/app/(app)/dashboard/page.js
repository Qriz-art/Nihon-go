"use client";

import Link from "next/link";
import Ikon from "@/components/Ikon";
import Pill from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import StatCard from "@/components/StatCard";
import EmptyState from "@/components/EmptyState";
import { useProgress } from "@/lib/progress";
import { LEVELS, SEMUA_PELAJARAN, TIPE_LESSON } from "@/data/level";
import { KOSAKATA } from "@/data/kosakata";
import { GRAMMAR } from "@/data/grammar";
import { KANJI } from "@/data/kanji";
import { HIRAGANA, KATAKANA } from "@/data/huruf";
import { KAIWA } from "@/data/kaiwa";
import { MEMBACA } from "@/data/membaca";

const TIPE_WARNA = {
  merah: "bg-primary-light text-primary-dark",
  navy: "bg-navy/10 text-navy",
  biru: "bg-blue-light text-blue",
  emas: "bg-accent-light text-accent",
  hijau: "bg-success-light text-success",
  ungu: "bg-blue-light text-navy",
};

function waktuRelatif(iso) {
  try {
    const lalu = new Date(iso);
    const detik = Math.floor((Date.now() - lalu.getTime()) / 1000);
    if (detik < 60) return "baru saja";
    if (detik < 3600) return `${Math.floor(detik / 60)} menit lalu`;
    if (detik < 86400) return `${Math.floor(detik / 3600)} jam lalu`;
    return `${Math.floor(detik / 86400)} hari lalu`;
  } catch {
    return "";
  }
}

export default function DashboardPage() {
  const p = useProgress();

  const totalHuruf = HIRAGANA.length + KATAKANA.length;

  const kategori = [
    {
      label: "Huruf",
      ikon: "Languages",
      warna: "merah",
      selesai: p.hurufDipahami.hiragana.length + p.hurufDipahami.katakana.length,
      total: totalHuruf,
      href: "/huruf",
    },
    {
      label: "Kosakata",
      ikon: "BookOpen",
      warna: "biru",
      selesai: p.kosakataDipahami.length,
      total: KOSAKATA.length,
      href: "/kosakata",
    },
    {
      label: "Tata Bahasa",
      ikon: "Braces",
      warna: "navy",
      selesai: p.grammarDipelajari.length,
      total: GRAMMAR.length,
      href: "/grammar",
    },
    {
      label: "Kanji",
      ikon: "BookType",
      warna: "emas",
      selesai: p.kanjiDikuasai.length,
      total: KANJI.length,
      href: "/kanji",
    },
    {
      label: "Kaiwa",
      ikon: "MessagesSquare",
      warna: "hijau",
      selesai: p.kaiwaSelesai.length,
      total: KAIWA.length,
      href: "/kaiwa",
    },
    {
      label: "Membaca",
      ikon: "BookMarked",
      warna: "ungu",
      selesai: p.membacaSelesai.length,
      total: MEMBACA.length,
      href: "/membaca",
    },
  ];

  const totalSemua = kategori.reduce((n, k) => n + k.total, 0);
  const selesaiSemua = kategori.reduce((n, k) => n + k.selesai, 0);
  const persenTotal = totalSemua ? (selesaiSemua / totalSemua) * 100 : 0;

  const pelajaranBerikutnya =
    SEMUA_PELAJARAN.find((l) => !p.pelajaranSelesai.includes(l.id)) || null;

  const levelAktif =
    LEVELS.find((lv) =>
      lv.units.some((u) => u.lessons.some((l) => !p.pelajaranSelesai.includes(l.id)))
    ) || LEVELS[LEVELS.length - 1];

  const aktivitasBelajar = p.hydrated
    ? p.aktivitas.filter((a) => a.tipe !== "badge").slice(-4).reverse()
    : [];

  const kuisTerakhir = p.riwayatKuis[0] || null;
  const rekomendasi = SEMUA_PELAJARAN.filter(
    (l) => !p.pelajaranSelesai.includes(l.id)
  ).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* ===== Sapaan ===== */}
      <section className="card relative overflow-hidden p-6 sm:p-8 animate-fade-in">
        <div className="absolute inset-0 pattern-seigaiha opacity-60 pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <Pill warna="merah">
              <Ikon nama="Flame" className="w-3.5 h-3.5" />
              Streak {p.hydrated ? p.streak : 0} hari
            </Pill>
            <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
              おかえりなさい、{p.hydrated ? p.nama : "Pelajar"}!
            </h1>
            <p className="mt-2 text-sm text-muted max-w-xl leading-relaxed">
              {pelajaranBerikutnya
                ? "Lanjutkan dari tempat kamu berhenti, atau pilih materi lain sesuai suasana hati hari ini."
                : "Semua pelajaran sudah kamu tandai selesai. Saatnya memperkuat dengan kuis dan tes kemampuan."}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {pelajaranBerikutnya && (
                <Link
                  href={`${TIPE_LESSON[pelajaranBerikutnya.tipe]?.href || "/belajar"}#${pelajaranBerikutnya.id}`}
                  className="btn btn-primary px-5 py-3"
                >
                  <Ikon nama="Play" className="w-4 h-4" />
                  Lanjutkan belajar
                </Link>
              )}
              <Link href="/kuis" className="btn btn-ghost px-5 py-3">
                <Ikon nama="Target" className="w-4 h-4" />
                Kerjakan kuis
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-72 shrink-0 rounded-2xl border border-border bg-white/70 backdrop-blur p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold">Level {p.hydrated ? p.levelPengguna : 1}</span>
              <span className="text-muted text-xs">
                {p.hydrated ? p.xp : 0} XP
              </span>
            </div>
            <ProgressBar
              nilai={p.hydrated ? p.persenLevel : 0}
              warna="primary"
              className="mt-3"
            />
            <p className="mt-2 text-xs text-muted">
              {p.hydrated ? p.xpLevelIni : 0} / {p.xpUntukNaik} XP menuju level
              berikutnya
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted mb-2">
                <span>Target harian</span>
                <span className="font-semibold text-navy">
                  {Math.min(p.hydrated ? p.xp : 0, p.targetHarian)} / {p.targetHarian} XP
                </span>
              </div>
              <ProgressBar
                nilai={
                  p.targetHarian
                    ? Math.min(((p.hydrated ? p.xp : 0) / p.targetHarian) * 100, 100)
                    : 0
                }
                warna="emas"
                tinggi="h-1.5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Statistik ===== */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          ikon="Layers"
          label="Progress keseluruhan"
          nilai={`${p.hydrated ? Math.round(persenTotal) : 0}%`}
          keterangan={`${p.hydrated ? selesaiSemua : 0} dari ${totalSemua} materi`}
          warna="merah"
        />
        <StatCard
          ikon="Star"
          label="Level saat ini"
          nilai={`Level ${p.hydrated ? p.levelPengguna : 1}`}
          keterangan={levelAktif.nama}
          warna="navy"
        />
        <StatCard
          ikon="Flame"
          label="Streak belajar"
          nilai={`${p.hydrated ? p.streak : 0} hari`}
          keterangan="Belajar berurutan"
          warna="emas"
        />
        <StatCard
          ikon="CircleCheck"
          label="Materi selesai"
          nilai={p.hydrated ? p.totalMateri : 0}
          keterangan={`${p.hydrated ? p.pelajaranSelesai.length : 0} pelajaran ditandai selesai`}
          warna="hijau"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ===== Progress per kategori ===== */}
        <section className="lg:col-span-2 card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Progress per kategori</h2>
            <Link href="/progress" className="text-xs font-semibold text-primary hover:underline">
              Lihat detail
            </Link>
          </div>

          <div className="space-y-4">
            {kategori.map((k) => {
              const persen = k.total ? (k.selesai / k.total) * 100 : 0;
              return (
                <Link
                  key={k.label}
                  href={k.href}
                  className="block rounded-xl p-2 -m-2 hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${TIPE_WARNA[k.warna]}`}
                    >
                      <Ikon nama={k.ikon} className="w-4.5 h-4.5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">{k.label}</span>
                        <span className="text-xs text-muted">
                          {p.hydrated ? k.selesai : 0} / {k.total}
                        </span>
                      </div>
                      <ProgressBar
                        nilai={p.hydrated ? persen : 0}
                        warna={k.warna === "ungu" ? "navy" : k.warna}
                        tinggi="h-1.5"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ===== Aktivitas & kuis ===== */}
        <section className="space-y-6">
          <div className="card p-5">
            <h2 className="font-bold mb-3">Aktivitas terakhir</h2>
            {aktivitasBelajar.length === 0 ? (
              <p className="text-sm text-muted leading-relaxed">
                Belum ada aktivitas. Mulai dari{" "}
                <Link href="/huruf" className="text-primary font-semibold hover:underline">
                  halaman huruf
                </Link>{" "}
                atau{" "}
                <Link href="/kosakata" className="text-primary font-semibold hover:underline">
                  kosakata
                </Link>
                .
              </p>
            ) : (
              <ul className="space-y-3">
                {aktivitasBelajar.map((a, i) => (
                  <li key={`${a.waktu}-${i}`} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-surface text-muted shrink-0 mt-0.5">
                      <Ikon
                        nama={a.tipe === "kuis" ? "Target" : "CheckCircle2"}
                        className="w-3.5 h-3.5"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug">{a.label}</p>
                      <p className="text-xs text-muted mt-0.5">
                        {waktuRelatif(a.waktu)}
                        {a.xp ? ` • +${a.xp} XP` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card p-5">
            <h2 className="font-bold mb-3">Statistik kuis</h2>
            {kuisTerakhir ? (
              <>
                <p className="text-3xl font-bold text-primary">
                  {kuisTerakhir.persen}%
                </p>
                <p className="text-sm text-muted mt-1">
                  {kuisTerakhir.nama} • {kuisTerakhir.benar}/{kuisTerakhir.total} benar
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {p.riwayatKuis.length} sesi kuis tersimpan
                </p>
                <Link href="/progress" className="btn btn-ghost px-4 py-2 mt-4 text-sm w-full">
                  Lihat riwayat lengkap
                </Link>
              </>
            ) : (
              <div className="text-sm text-muted">
                <p className="leading-relaxed">
                  Belum ada hasil kuis tersimpan.
                </p>
                <Link href="/kuis" className="btn btn-navy px-4 py-2 mt-3 text-sm w-full">
                  Kerjakan kuis pertama
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ===== Rekomendasi ===== */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Rekomendasi pelajaran berikutnya</h2>
          <Link href="/belajar" className="text-xs font-semibold text-primary hover:underline">
            Semua pelajaran
          </Link>
        </div>

        {rekomendasi.length === 0 ? (
          <EmptyState
            ikon="PartyPopper"
            judul="Semua pelajaran sudah selesai"
            deskripsi="Hebat! Sekarang saatnya memperkuat ingatan lewat kuis campuran dan tes kemampuan."
            aksi={
              <>
                <Link href="/kuis" className="btn btn-primary px-4 py-2.5 text-sm">
                  Kerjakan kuis
                </Link>
                <Link href="/tes" className="btn btn-ghost px-4 py-2.5 text-sm">
                  Ikuti tes kemampuan
                </Link>
              </>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rekomendasi.map((l) => {
              const tipe = TIPE_LESSON[l.tipe] || {};
              return (
                <Link
                  key={l.id}
                  href={`${tipe.href || "/belajar"}#${l.id}`}
                  className="card card-hover p-5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${TIPE_WARNA[tipe.color] || TIPE_WARNA.navy}`}
                    >
                      <Ikon
                        nama={
                          { huruf: "Languages", kosakata: "BookOpen", grammar: "Braces", kanji: "BookType", kaiwa: "MessagesSquare", membaca: "BookMarked", kuis: "Target" }[
                            l.tipe
                          ] || "BookOpen"
                        }
                        className="w-5 h-5"
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm leading-tight truncate">
                        {l.judul}
                      </h3>
                      <p className="text-xs text-muted mt-0.5">
                        {l.levelNama} • {l.unitJudul.split("—")[0].trim()}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{l.ringkasan}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Ikon nama="Clock" className="w-3.5 h-3.5" />
                      {l.durasi} menit
                    </span>
                    <span className="chip bg-surface text-navy border-border">
                      {tipe.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ===== Jalur belajar ===== */}
      <section className="card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Daftar jalur belajar</h2>
          <Link href="/belajar" className="text-xs font-semibold text-primary hover:underline">
            Buka jalur lengkap
          </Link>
        </div>

        <div className="space-y-5">
          {LEVELS.map((lv) => {
            const semua = lv.units.flatMap((u) => u.lessons);
            const selesai = semua.filter((l) => p.pelajaranSelesai.includes(l.id)).length;
            const persen = semua.length ? (selesai / semua.length) * 100 : 0;
            return (
              <div key={lv.id}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <span className="jp flex items-center justify-center w-7 h-7 rounded-lg bg-navy/10 text-navy text-sm font-bold">
                      {lv.kanji}
                    </span>
                    <span className="font-semibold">{lv.nama}</span>
                    <Pill warna="netral">{lv.units.length} unit</Pill>
                  </div>
                  <span className="text-xs text-muted">
                    {p.hydrated ? selesai : 0} / {semua.length} pelajaran
                  </span>
                </div>
                <ProgressBar
                  nilai={p.hydrated ? persen : 0}
                  warna={lv.id === 1 ? "hijau" : lv.id === 2 ? "biru" : "emas"}
                />
                <div className="mt-2 text-xs text-muted truncate">
                  {lv.units.map((u) => u.judul.split("—")[1]?.trim() || u.judul).join(" · ")}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
