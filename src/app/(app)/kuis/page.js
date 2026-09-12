"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Ikon from "@/components/Ikon";
import Pill from "@/components/Pill";
import PageHeader from "@/components/PageHeader";
import KuisEngine from "@/components/KuisEngine";
import { useProgress } from "@/lib/progress";
import { MODE_KUIS, buatSoal } from "@/lib/quiz";

const IKON_MODE = {
  kosakata: "BookOpen",
  huruf: "Languages",
  grammar: "Braces",
  kanji: "BookType",
  campuran: "Shuffle",
};

const SUB_MODE = {
  kosakata: [
    { v: "campur", l: "Campur dua arah" },
    { v: "jp-id", l: "Jepang → Indonesia" },
    { v: "id-jp", l: "Indonesia → Jepang" },
  ],
  huruf: [
    { v: "hiragana", l: "Hiragana" },
    { v: "katakana", l: "Katakana" },
    { v: "keduanya", l: "Hiragana + Katakana" },
  ],
  kanji: [
    { v: "campur", l: "Campur (arti & bacaan)" },
    { v: "arti", l: "Tebak arti" },
    { v: "bacaan", l: "Tebak bacaan" },
  ],
};

export default function KuisPage() {
  const p = useProgress();
  const [mode, setMode] = useState("kosakata");
  const [jumlah, setJumlah] = useState(10);
  const [level, setLevel] = useState(0);
  const [subMode, setSubMode] = useState("campur");
  const [soal, setSoal] = useState(null);
  const [namaKuis, setNamaKuis] = useState("");

  const mulai = () => {
    const hasil = buatSoal({
      mode,
      jumlah,
      level,
      opsiMode: subMode,
    });
    setSoal(hasil);
    setNamaKuis(
      `${MODE_KUIS[mode].nama}${level ? ` — Level ${level}` : ""}`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ulangi = useCallback(() => {
    setSoal(null);
    setTimeout(() => mulai(), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, jumlah, level, subMode]);

  const simpan = useCallback(
    (hasil) => {
      p.simpanHasilKuis(hasil);
    },
    [p]
  );

  if (soal) {
    return (
      <div>
        <KuisEngine
          key={`${mode}-${jumlah}-${level}-${subMode}-${soal[0]?.id || "x"}`}
          soal={soal}
          namaKuis={namaKuis}
          onSelesai={simpan}
          onUlangi={ulangi}
          onKuisLain={() => setSoal(null)}
          kembaliHref="/belajar"
          kembaliLabel="Kembali ke jalur belajar"
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        judul="Kuis Interaktif"
        deskripsi="Pilih kategori dan jumlah soal, jawab pertanyaannya, lalu lihat pembahasan setiap jawaban. Skor dan riwayatmu tersimpan otomatis di browser."
        ikon="Target"
        aksi={
          <Link href="/tes" className="btn btn-ghost px-4 py-2.5 text-sm">
            <Ikon nama="ClipboardCheck" className="w-4 h-4" />
            Tes kemampuan
          </Link>
        }
      />

      {/* Riwayat singkat */}
      {p.hydrated && p.riwayatKuis.length > 0 && (
        <div className="card p-4 sm:p-5 mb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-light text-accent">
                <Ikon nama="Trophy" className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-sm">
                  Skor terakhir: {p.riwayatKuis[0].persen}%
                </p>
                <p className="text-xs text-muted">
                  {p.riwayatKuis[0].nama} • {p.riwayatKuis[0].benar}/
                  {p.riwayatKuis[0].total} benar
                </p>
              </div>
            </div>
            <Link href="/progress" className="btn btn-ghost px-3.5 py-2 text-xs">
              Lihat semua riwayat
            </Link>
          </div>
        </div>
      )}

      {/* Pilih mode */}
      <section className="mb-6">
        <h2 className="font-bold mb-3">1. Pilih mode kuis</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(MODE_KUIS).map(([key, m]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setMode(key);
                setSubMode(SUB_MODE[key]?.[0]?.v || "campur");
              }}
              className={`card p-4 text-left transition-all ${
                mode === key
                  ? "border-primary ring-1 ring-primary/30"
                  : "hover:border-primary/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
                    mode === key ? "bg-primary text-white" : "bg-surface text-navy"
                  }`}
                >
                  <Ikon nama={IKON_MODE[key]} className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-sm">{m.nama}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{m.deskripsi}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Pengaturan */}
      <section className="card p-5 sm:p-6 mb-6 space-y-5">
        <div>
          <h2 className="font-bold mb-3">2. Jumlah soal</h2>
          <div className="flex flex-wrap gap-2">
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setJumlah(n)}
                className={`btn px-4 py-2.5 text-sm ${jumlah === n ? "btn-primary" : "btn-ghost"}`}
              >
                {n} soal
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-3">3. Tingkat kesulitan</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { v: 0, l: "Campur semua level" },
              { v: 1, l: "Pemula" },
              { v: 2, l: "Dasar" },
              { v: 3, l: "Menengah" },
            ].map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => setLevel(o.v)}
                className={`btn px-4 py-2.5 text-sm ${level === o.v ? "btn-navy" : "btn-ghost"}`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        {SUB_MODE[mode] && (
          <div>
            <h2 className="font-bold mb-3">4. Variasi soal</h2>
            <div className="flex flex-wrap gap-2">
              {SUB_MODE[mode].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setSubMode(o.v)}
                  className={`btn px-4 py-2.5 text-sm ${
                    subMode === o.v ? "btn-navy" : "btn-ghost"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-1">
          <button type="button" onClick={mulai} className="btn btn-primary px-6 py-3">
            <Ikon nama="Play" className="w-4 h-4" />
            Mulai kuis
          </button>
        </div>
      </section>

      {/* Cara kerja */}
      <section className="card p-5 sm:p-6">
        <h2 className="font-bold mb-3">Cara kerja kuis di Nihon-go</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              ikon: "ListChecks",
              judul: "Soal dibuat dari data lokal",
              teks: "Pertanyaan diambil dari kumpulan huruf, kosakata, tata bahasa, kanji, dan bacaan di aplikasi ini.",
            },
            {
              ikon: "Lightbulb",
              judul: "Ada pembahasan jawaban",
              teks: "Setelah menjawab, kamu langsung melihat alasan jawaban benarnya beserta contoh penggunaannya.",
            },
            {
              ikon: "TrendingUp",
              judul: "Hasil tersimpan",
              teks: "Skor, persentase, dan rincian jawaban disimpan di riwayat lokal untuk melihat perkembanganmu.",
            },
          ].map((c) => (
            <div key={c.judul}>
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface text-navy">
                <Ikon nama={c.ikon} className="w-4.5 h-4.5" />
              </span>
              <p className="mt-3 font-semibold text-sm">{c.judul}</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">{c.teks}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Pill warna="merah">Pembahasan setiap soal</Pill>
          <Pill warna="biru">Riwayat lokal</Pill>
          <Pill warna="emas">XP per jawaban benar</Pill>
          <Pill warna="hijau">Bisa diulang kapan saja</Pill>
        </div>
      </section>
    </div>
  );
}
