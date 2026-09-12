"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Ikon from "@/components/Ikon";
import Pill, { PillLevel } from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { useProgress } from "@/lib/progress";
import { LEVELS, TIPE_LESSON, getLevelBySlug } from "@/data/level";

const IKON_TIPE = {
  huruf: "Languages",
  kosakata: "BookOpen",
  grammar: "Braces",
  kanji: "BookType",
  kaiwa: "MessagesSquare",
  membaca: "BookMarked",
  kuis: "Target",
};

export default function LevelDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const level = getLevelBySlug(slug);
  const p = useProgress();

  if (!level) {
    return (
      <EmptyState
        ikon="CircleHelp"
        judul="Level tidak ditemukan"
        deskripsi={`Tidak ada level dengan nama "${slug}". Pilih level yang tersedia di halaman jalur belajar.`}
        aksi={
          <Link href="/belajar" className="btn btn-primary px-4 py-2.5 text-sm">
            Kembali ke jalur belajar
          </Link>
        }
      />
    );
  }

  const semua = level.units.flatMap((u) => u.lessons);
  const selesai = semua.filter((l) => p.pelajaranSelesai.includes(l.id)).length;
  const persen = semua.length ? (selesai / semua.length) * 100 : 0;

  // Buka pelajaran pertama yang belum selesai
  const berikutnya = semua.find((l) => !p.pelajaranSelesai.includes(l.id)) || semua[0];

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/belajar"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary"
        >
          <Ikon nama="ChevronLeft" className="w-4 h-4" />
          Semua level
        </Link>
      </div>

      <PageHeader
        judul={`Level ${level.id} — ${level.nama}`}
        deskripsi={level.ringkasan}
        ikon="Route"
        aksi={<PillLevel level={level.id} />}
      >
        <div className="card p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="jp flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-light text-primary-dark text-2xl font-bold">
              {level.kanji}
            </span>
            <div className="flex-1 min-w-[12rem]">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-semibold">Progress level ini</span>
                <span className="text-muted text-xs">
                  {p.hydrated ? selesai : 0} / {semua.length} pelajaran
                </span>
              </div>
              <ProgressBar
                nilai={p.hydrated ? persen : 0}
                warna={level.id === 1 ? "hijau" : level.id === 2 ? "biru" : "emas"}
              />
            </div>
            {berikutnya && (
              <Link
                href={`${TIPE_LESSON[berikutnya.tipe]?.href || "/belajar"}#${berikutnya.id}`}
                className="btn btn-primary px-4 py-2.5 text-sm shrink-0"
              >
                <Ikon nama="Play" className="w-4 h-4" />
                Lanjutkan
              </Link>
            )}
          </div>
        </div>
      </PageHeader>

      <div className="space-y-6">
        {level.units.map((unit, idx) => {
          const selesaiUnit = unit.lessons.filter((l) =>
            p.pelajaranSelesai.includes(l.id)
          ).length;
          const unitSelesai = selesaiUnit === unit.lessons.length;

          return (
            <section key={unit.id} className="card p-5 animate-fade-in">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold shrink-0 ${
                      unitSelesai
                        ? "bg-success text-white"
                        : "bg-navy/10 text-navy"
                    }`}
                  >
                    {unitSelesai ? (
                      <Ikon nama="Check" className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </span>
                  <div>
                    <h2 className="font-bold leading-tight">{unit.judul}</h2>
                    <p className="text-sm text-muted mt-0.5">{unit.deskripsi}</p>
                  </div>
                </div>
                <Pill warna={unitSelesai ? "hijau" : "netral"}>
                  {selesaiUnit}/{unit.lessons.length} selesai
                </Pill>
              </div>

              <ul className="space-y-2">
                {unit.lessons.map((lesson) => {
                  const selesaiIni = p.pelajaranSelesai.includes(lesson.id);
                  const tipe = TIPE_LESSON[lesson.tipe] || {};
                  return (
                    <li
                      key={lesson.id}
                      id={lesson.id}
                      className={`scroll-mt-24 rounded-xl border p-3.5 transition-colors ${
                        selesaiIni
                          ? "border-success/30 bg-success-light/40"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${
                            selesaiIni ? "bg-success text-white" : "bg-surface text-navy"
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
                          <div className="mt-2.5 flex flex-wrap items-center gap-3">
                            <Link
                              href={`${tipe.href || "/belajar"}#${lesson.id}`}
                              className="btn btn-ghost px-3 py-1.5 text-xs"
                            >
                              <Ikon nama="ArrowRight" className="w-3.5 h-3.5" />
                              Buka materi
                            </Link>
                            <button
                              type="button"
                              onClick={() => p.selesaikanPelajaran(lesson)}
                              className={`btn px-3 py-1.5 text-xs ${
                                selesaiIni ? "btn-ghost" : "btn-navy"
                              }`}
                            >
                              <Ikon
                                nama={selesaiIni ? "RotateCcw" : "Check"}
                                className="w-3.5 h-3.5"
                              />
                              {selesaiIni ? "Batalkan" : "Tandai selesai"}
                            </button>
                            <span className="flex items-center gap-1.5 text-xs text-muted">
                              <Ikon nama="Clock" className="w-3.5 h-3.5" />
                              {lesson.durasi} menit
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Navigasi antar level */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {LEVELS.filter((lv) => lv.id < level.id).slice(-1).map((lv) => (
          <Link
            key={lv.id}
            href={`/belajar/${lv.slug}`}
            className="btn btn-ghost px-4 py-2.5 text-sm"
          >
            <Ikon nama="ChevronLeft" className="w-4 h-4" />
            Level {lv.id} — {lv.nama}
          </Link>
        ))}
        {LEVELS.filter((lv) => lv.id > level.id).slice(0, 1).map((lv) => (
          <Link
            key={lv.id}
            href={`/belajar/${lv.slug}`}
            className="btn btn-navy px-4 py-2.5 text-sm ml-auto"
          >
            Level {lv.id} — {lv.nama}
            <Ikon nama="ChevronRight" className="w-4 h-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
