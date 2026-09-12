"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Ikon from "@/components/Ikon";
import Pill from "@/components/Pill";
import PageHeader from "@/components/PageHeader";
import KuisEngine from "@/components/KuisEngine";
import { useProgress } from "@/lib/progress";
import { soalHuruf, soalKosakata, soalGrammar, soalCampuran } from "@/lib/quiz";

const JENIS_TES = [
  {
    key: "hiragana",
    nama: "Tes Hiragana",
    ikon: "Feather",
    deskripsi: "Menguji kemampuan membaca dan mengenali huruf hiragana.",
    sumber: "huruf",
  },
  {
    key: "katakana",
    nama: "Tes Katakana",
    ikon: "Layers",
    deskripsi: "Menguji kemampuan membaca huruf katakana dan kata serapan.",
    sumber: "huruf",
  },
  {
    key: "kosakata",
    nama: "Tes Kosakata",
    ikon: "BookOpen",
    deskripsi: "Menguji penguasaan kosakata dasar hingga menengah.",
    sumber: "kosakata",
  },
  {
    key: "grammar",
    nama: "Tes Tata Bahasa",
    ikon: "Braces",
    deskripsi: "Menguji pemahaman partikel, pola kalimat, dan bentuk kata kerja.",
    sumber: "grammar",
  },
  {
    key: "campuran",
    nama: "Tes Campuran",
    ikon: "Puzzle",
    deskripsi: "Kombinasi huruf, kosakata, tata bahasa, kanji, dan membaca.",
    sumber: "campuran",
  },
];

const REKOMENDASI = {
  hiragana: [
    { min: 85, teks: "Kamu sudah cukup baik dalam membaca hiragana." },
    { min: 60, teks: "Disarankan mengulang kelompok huruf yang masih sering keliru di halaman Huruf." },
    { min: 0, teks: "Mulai lagi dari hiragana dasar dan tandai huruf yang sudah kamu kuasai." },
  ],
  katakana: [
    { min: 85, teks: "Kemampuan membaca katakana kamu sudah kuat." },
    { min: 60, teks: "Latih kembali katakana kombinasi dan dakuten, lalu ulangi tes ini." },
    { min: 0, teks: "Pelajari katakana dasar terlebih dahulu sebelum kata serapan." },
  ],
  kosakata: [
    { min: 85, teks: "Kosakata dasarmu sudah baik. Coba naik ke kosakata tingkat menengah." },
    { min: 60, teks: "Disarankan mengulang kategori kosakata yang paling sering salah." },
    { min: 0, teks: "Mulai dari kategori Salam, Angka, dan Waktu, lalu tandai kata yang sudah dikuasai." },
  ],
  grammar: [
    { min: 85, teks: "Pemahaman tata bahasamu kuat. Lanjutkan ke pola kalimat majemuk." },
    { min: 60, teks: "Disarankan mengulang materi partikel は, を, dan に karena pola ini paling sering keliru." },
    { min: 0, teks: "Pelajari kembali pola です dan ます sebelum masuk ke partikel." },
  ],
  campuran: [
    { min: 85, teks: "Kemampuanmu merata di semua kategori. Coba lanjutkan ke unit berikutnya." },
    { min: 60, teks: "Coba lanjutkan ke unit berikutnya sambil mengulang kategori dengan skor terendah." },
    { min: 0, teks: "Mulai dari Unit 1 di jalur belajar, lalu ulangi tes ini setelah beberapa pelajaran." },
  ],
};

const WARNA_KEMAMPUAN = {
  hijau: "bg-success-light text-success",
  biru: "bg-blue-light text-blue",
  emas: "bg-accent-light text-accent",
  bahaya: "bg-danger-light text-danger",
};

function kategoriKemampuan(persen) {
  if (persen >= 85) return { label: "Mahir", warna: "hijau", ikon: "Award" };
  if (persen >= 70) return { label: "Baik", warna: "biru", ikon: "TrendingUp" };
  if (persen >= 50) return { label: "Cukup", warna: "emas", ikon: "Target" };
  return { label: "Perlu latihan", warna: "bahaya", ikon: "Lightbulb" };
}

export default function TesPage() {
  const p = useProgress();
  const [jenis, setJenis] = useState("hiragana");
  const [level, setLevel] = useState(0);
  const [jumlah, setJumlah] = useState(10);
  const [pakaiTimer, setPakaiTimer] = useState(false);
  const [soal, setSoal] = useState(null);
  const [namaTes, setNamaTes] = useState("");
  const [hasil, setHasil] = useState(null);

  const buat = () => {
    const levelSoal = jenis === "hiragana" || jenis === "katakana" ? 0 : level;
    let s;
    switch (jenis) {
      case "hiragana":
        s = soalHuruf({ jumlah, tipe: "hiragana" });
        break;
      case "katakana":
        s = soalHuruf({ jumlah, tipe: "katakana" });
        break;
      case "kosakata":
        s = soalKosakata({ jumlah, level: levelSoal });
        break;
      case "grammar":
        s = soalGrammar({ jumlah, level: levelSoal });
        break;
      default:
        s = soalCampuran({ jumlah, level: levelSoal });
    }
    return s;
  };

  const mulai = () => {
    setHasil(null);
    setSoal(buat());
    setNamaTes(
      `${JENIS_TES.find((j) => j.key === jenis).nama}${level ? ` — Level ${level}` : ""}`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ulangi = useCallback(() => {
    setHasil(null);
    setSoal(null);
    window.setTimeout(() => {
      setSoal(buat());
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jenis, level, jumlah]);

  const simpan = useCallback(
    (h) => {
      setHasil(h);
      p.simpanHasilKuis({ ...h, nama: `Tes — ${namaTes}` });
    },
    [p, namaTes]
  );

  const jenisAktif = JENIS_TES.find((j) => j.key === jenis);

  if (soal) {
    const k = hasil ? kategoriKemampuan(hasil.persen) : null;
    const daftarRekomendasi = REKOMENDASI[jenis] || REKOMENDASI.campuran;
    const rekomendasi = hasil
      ? daftarRekomendasi.find((r) => hasil.persen >= r.min)?.teks
      : null;

    return (
      <div className="space-y-4">
        {hasil && (
          <section className="card p-5 sm:p-6 animate-fade-in">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`flex items-center justify-center w-12 h-12 rounded-2xl ${WARNA_KEMAMPUAN[k.warna]}`}
              >
                <Ikon nama={k.ikon} className="w-6 h-6" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-muted">
                  Hasil {namaTes}
                </p>
                <p className="text-xl font-bold">
                  {k.label} — {hasil.persen}%
                </p>
              </div>
              <Pill warna={k.warna} className="ml-auto">
                {hasil.benar}/{hasil.total} benar
              </Pill>
            </div>

            <div className="mt-4 rounded-xl bg-surface p-4">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Ikon nama="Lightbulb" className="w-4 h-4 text-accent" />
                Rekomendasi materi
              </p>
              <p className="text-sm text-muted mt-1.5 leading-relaxed">{rekomendasi}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {jenis === "hiragana" || jenis === "katakana" ? (
                  <Link href="/huruf" className="btn btn-ghost px-3.5 py-2 text-xs">
                    <Ikon nama="Languages" className="w-3.5 h-3.5" />
                    Buka halaman Huruf
                  </Link>
                ) : null}
                {jenis === "kosakata" ? (
                  <Link href="/kosakata" className="btn btn-ghost px-3.5 py-2 text-xs">
                    <Ikon nama="BookOpen" className="w-3.5 h-3.5" />
                    Buka halaman Kosakata
                  </Link>
                ) : null}
                {jenis === "grammar" ? (
                  <Link href="/grammar" className="btn btn-ghost px-3.5 py-2 text-xs">
                    <Ikon nama="Braces" className="w-3.5 h-3.5" />
                    Buka halaman Tata Bahasa
                  </Link>
                ) : null}
                <Link href="/belajar" className="btn btn-ghost px-3.5 py-2 text-xs">
                  <Ikon nama="Route" className="w-3.5 h-3.5" />
                  Buka jalur belajar
                </Link>
              </div>
            </div>
          </section>
        )}

        <KuisEngine
          key={`${jenis}-${level}-${jumlah}-${pakaiTimer ? "t" : "n"}-${soal[0]?.id || "x"}`}
          soal={soal}
          namaKuis={namaTes}
          batasDetik={pakaiTimer ? Math.max(jumlah * 30, 120) : 0}
          onSelesai={simpan}
          onUlangi={ulangi}
          onKuisLain={() => {
            setSoal(null);
            setHasil(null);
          }}
          kembaliHref="/progress"
          kembaliLabel="Lihat progress dan riwayat"
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        judul="Tes Kemampuan"
        deskripsi="Ukur pemahamanmu pada satu bidang tertentu, lalu dapatkan rekomendasi materi yang perlu diperkuat. Soal diambil acak dari data lokal."
        ikon="ClipboardCheck"
        aksi={
          <Link href="/kuis" className="btn btn-ghost px-4 py-2.5 text-sm">
            <Ikon nama="Target" className="w-4 h-4" />
            Kuis biasa
          </Link>
        }
      />

      <div className="card p-4 mb-5 border-blue-light bg-blue-light/40">
        <p className="text-sm flex items-start gap-2">
          <Ikon nama="Info" className="w-4 h-4 text-blue shrink-0 mt-0.5" />
          <span className="text-muted leading-relaxed">
            Nihon-go bukan lembaga sertifikasi resmi. Jika kamu melihat label level di
            aplikasi ini, itu merujuk pada <strong>materi yang terinspirasi level JLPT</strong>{" "}
            (seperti N5 atau N4), bukan tes JLPT resmi.
          </span>
        </p>
      </div>

      <section className="mb-6">
        <h2 className="font-bold mb-3">1. Pilih jenis tes</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {JENIS_TES.map((j) => (
            <button
              key={j.key}
              type="button"
              onClick={() => {
                setJenis(j.key);
                setHasil(null);
              }}
              className={`card p-4 text-left transition-all ${
                jenis === j.key ? "border-primary ring-1 ring-primary/30" : "hover:border-primary/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
                    jenis === j.key ? "bg-primary text-white" : "bg-surface text-navy"
                  }`}
                >
                  <Ikon nama={j.ikon} className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-sm">{j.nama}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{j.deskripsi}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="card p-5 sm:p-6 mb-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <h2 className="font-bold mb-3">2. Pilih level</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { v: 0, l: "Campur" },
                { v: 1, l: "Pemula" },
                { v: 2, l: "Dasar" },
                { v: 3, l: "Menengah" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setLevel(o.v)}
                  disabled={jenisAktif.sumber === "huruf"}
                  className={`btn px-3.5 py-2 text-sm disabled:opacity-40 ${
                    level === o.v ? "btn-navy" : "btn-ghost"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
            {jenisAktif.sumber === "huruf" && (
              <p className="mt-2 text-xs text-muted">
                Tes huruf selalu mencakup semua karakter pada jenis huruf tersebut.
              </p>
            )}
          </div>

          <div>
            <h2 className="font-bold mb-3">3. Jumlah soal</h2>
            <div className="flex flex-wrap gap-2">
              {[5, 10, 20, 30].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setJumlah(n)}
                  className={`btn px-3.5 py-2 text-sm ${jumlah === n ? "btn-primary" : "btn-ghost"}`}
                >
                  {n} soal
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-3">4. Timer (opsional)</h2>
          <button
            type="button"
            onClick={() => setPakaiTimer((v) => !v)}
            className={`btn px-4 py-2.5 text-sm ${pakaiTimer ? "btn-primary" : "btn-ghost"}`}
          >
            <Ikon nama="Timer" className="w-4 h-4" />
            {pakaiTimer
              ? `Timer aktif — ${Math.max(jumlah * 30, 120) / 60} menit`
              : "Tanpa timer"}
          </button>
          <p className="mt-2 text-xs text-muted">
            Waktu dihitung 30 detik per soal (minimal 2 menit). Kalau waktu habis, tes
            dihentikan otomatis dan jawaban yang sudah diisi tetap dinilai.
          </p>
        </div>

        <div className="pt-1">
          <button type="button" onClick={mulai} className="btn btn-primary px-6 py-3">
            <Ikon nama="Play" className="w-4 h-4" />
            Mulai tes
          </button>
        </div>
      </section>

      {p.hydrated && p.riwayatKuis.length > 0 && (
        <section className="card p-5">
          <h2 className="font-bold mb-3">Hasil tes & kuis terakhir</h2>
          <ul className="space-y-2">
            {p.riwayatKuis.slice(0, 5).map((r, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{r.nama}</p>
                  <p className="text-xs text-muted">
                    {r.benar}/{r.total} benar
                  </p>
                </div>
                <span
                  className={`chip ${
                    r.persen >= 70
                      ? "bg-success-light text-success border-success-light"
                      : r.persen >= 50
                        ? "bg-accent-light text-accent border-accent-light"
                        : "bg-danger-light text-danger border-danger-light"
                  }`}
                >
                  {r.persen}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
