import Link from "next/link";
import Ikon from "@/components/Ikon";
import Pill from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import PreviewKuis from "@/components/PreviewKuis";
import { LEVELS } from "@/data/level";
import { KENAPA_NIHONGO, STATISTIK_ILUSTRATIF } from "@/data/gamifikasi";
import { KOSAKATA } from "@/data/kosakata";
import { KANJI } from "@/data/kanji";
import { KAIWA } from "@/data/kaiwa";
import { HIRAGANA } from "@/data/huruf";

const NAV_PUBLIK = [
  { href: "/belajar", label: "Belajar" },
  { href: "/kuis", label: "Latihan" },
  { href: "/tes", label: "Tes" },
  { href: "/progress", label: "Progress" },
];

const PREVIEW_MATERI = [
  {
    href: "/huruf",
    ikon: "Languages",
    judul: "Huruf Jepang",
    label: "Hiragana & Katakana",
    deskripsi:
      "Semua karakter hiragana dan katakana lengkap dengan romaji, contoh kata, dan tombol pengucapan.",
    contoh: HIRAGANA.slice(0, 8),
    isContohHuruf: true,
    warna: "merah",
  },
  {
    href: "/kosakata",
    ikon: "BookOpen",
    judul: "Kosakata",
    label: `${KOSAKATA.length} entri contoh`,
    deskripsi:
      "Kosakata per kategori dengan furigana, romaji, arti, contoh kalimat, dan terjemahannya.",
    warna: "biru",
  },
  {
    href: "/kanji",
    ikon: "BookType",
    judul: "Kanji",
    label: `${KANJI.length} kanji bertahap`,
    deskripsi:
      "Onyomi, kunyomi, arti, contoh kosakata, dan latihan membaca kanji dari level dasar.",
    contoh: KANJI.slice(0, 8).map((k) => k.kanji),
    isContohKanji: true,
    warna: "emas",
  },
  {
    href: "/kaiwa",
    ikon: "MessagesSquare",
    judul: "Kaiwa",
    label: `${KAIWA.length} situasi percakapan`,
    deskripsi:
      "Dialog dua tokoh dengan romaji, terjemahan, tombol audio per kalimat, dan kuis pemahaman.",
    warna: "hijau",
  },
];

const WARNA_IKON = {
  merah: "bg-primary-light text-primary-dark",
  biru: "bg-blue-light text-blue",
  emas: "bg-accent-light text-accent",
  hijau: "bg-success-light text-success",
  navy: "bg-navy/10 text-navy",
};

const ALUR = [
  { ikon: "Sparkles", judul: "Mulai dari huruf", deskripsi: "Kuasai hiragana dan katakana dengan audio dan latihan mengenali karakter." },
  { ikon: "Library", judul: "Bangun kosakata", deskripsi: "Pelajari kata per kategori, tandai yang sudah dikuasai, dan ulangi lewat flashcard." },
  { ikon: "Braces", judul: "Pahami pola kalimat", deskripsi: "Pola tata bahasa dijelaskan dalam bahasa Indonesia dengan rumus dan contoh." },
  { ikon: "Target", judul: "Uji dengan kuis", deskripsi: "Lima mode kuis dengan pembahasan, skor, dan riwayat tersimpan di browser." },
];

export default function LandingPage() {
  const totalPelajaran = LEVELS.reduce(
    (n, lv) => n + lv.units.reduce((m, u) => m + u.lessons.length, 0),
    0
  );

  return (
    <div className="min-h-screen">
      {/* ============ NAVBAR ============ */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white font-jp text-lg font-bold">
                日
              </span>
              <span className="leading-none">
                <span className="block font-bold">Nihon-go</span>
                <span className="block text-[11px] text-muted mt-0.5">
                  日本語を学ぼう
                </span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-6">
              {NAV_PUBLIK.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-navy/75 hover:bg-surface hover:text-navy transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/dashboard"
                className="btn btn-ghost px-4 py-2 text-sm hidden sm:inline-flex"
              >
                Dashboard
              </Link>
              <Link href="/belajar" className="btn btn-primary px-4 py-2 text-sm">
                Mulai Belajar
                <Ikon nama="ArrowRight" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-seigaiha opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-slide-up">
              <Pill warna="merah">
                <Ikon nama="Sparkles" className="w-3.5 h-3.5" />
                Platform belajar bahasa Jepang
              </Pill>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-balance">
                Belajar bahasa Jepang,{" "}
                <span className="text-primary">satu langkah setiap hari.</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-xl">
                <span className="font-semibold text-navy">
                  Mulai dari huruf, berkembang menjadi percakapan.
                </span>{" "}
                Nihon-go menyusun materi hiragana, katakana, kosakata, tata bahasa, kanji,
                kaiwa, dan membaca dalam jalur belajar yang jelas untuk pemula sampai
                menengah.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/dashboard" className="btn btn-primary px-5 py-3">
                  Mulai Belajar
                  <Ikon nama="ArrowRight" className="w-4 h-4" />
                </Link>
                <Link href="/belajar" className="btn btn-ghost px-5 py-3">
                  <Ikon nama="Route" className="w-4 h-4" />
                  Lihat jalur belajar
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <Ikon nama="Check" className="w-4 h-4 text-success" />
                  {totalPelajaran} pelajaran tersusun
                </span>
                <span className="flex items-center gap-2">
                  <Ikon nama="Volume2" className="w-4 h-4 text-blue" />
                  Audio pengucapan
                </span>
                <span className="flex items-center gap-2">
                  <Ikon nama="Smartphone" className="w-4 h-4 text-primary" />
                  Nyaman di HP
                </span>
              </div>
            </div>

            {/* Visual kartu belajar */}
            <div className="relative">
              <div className="absolute -top-6 -left-4 w-40 h-40 rounded-full bg-primary-light/70 blur-2xl" />
              <div className="absolute -bottom-6 right-0 w-44 h-44 rounded-full bg-blue-light/70 blur-2xl" />

              <div className="relative grid gap-4">
                <div className="card p-5 shadow-sm animate-slide-up">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold">Hiragana dasar</span>
                    <Pill warna="netral">A–O</Pill>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {HIRAGANA.slice(0, 5).map((h) => (
                      <div
                        key={h.char}
                        className="rounded-xl border border-border bg-surface py-2.5 text-center"
                      >
                        <span className="jp block text-xl font-bold">{h.char}</span>
                        <span className="block text-[10px] text-muted mt-0.5">
                          {h.romaji}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="card p-4 animate-slide-up delay-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-light text-accent">
                        <Ikon nama="BookType" className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-bold">Kanji hari ini</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="jp text-4xl font-bold leading-none">日</span>
                      <span className="text-xs text-muted pb-1">
                        ひ・ニチ — hari
                      </span>
                    </div>
                  </div>

                  <div className="card p-4 animate-slide-up delay-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-light text-primary-dark">
                        <Ikon nama="Flame" className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-bold">Streak</span>
                    </div>
                    <p className="text-2xl font-bold leading-none">7 hari</p>
                    <ProgressBar nilai={70} warna="primary" className="mt-2.5" />
                  </div>
                </div>

                <div className="card p-4 flex items-center gap-3 animate-slide-up delay-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-light text-blue shrink-0">
                    <Ikon nama="MessagesSquare" className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">Contoh percakapan</p>
                    <p className="jp text-sm font-semibold truncate">
                      すみません、駅はどこですか。
                    </p>
                    <p className="text-xs text-muted truncate">
                      Permisi, di mana stasiun?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PILIHAN LEVEL ============ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Pilih level belajarmu
            </h2>
            <p className="mt-2 text-sm text-muted max-w-2xl">
              Tiga level bertahap. Setiap level berisi unit, dan setiap unit berisi
              beberapa pelajaran yang bisa langsung dikerjakan.
            </p>
          </div>
          <Link href="/belajar" className="btn btn-ghost px-4 py-2.5 text-sm shrink-0">
            Semua level
            <Ikon nama="ChevronRight" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {LEVELS.map((lv, i) => {
            const jumlahPelajaran = lv.units.reduce((n, u) => n + u.lessons.length, 0);
            const warna = lv.id === 1 ? "hijau" : lv.id === 2 ? "biru" : "emas";
            return (
              <Link
                key={lv.id}
                href={`/belajar/${lv.slug}`}
                className={`card card-hover p-5 animate-slide-up delay-${i + 1}`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl jp text-2xl font-bold ${
                      WARNA_IKON[warna === "hijau" ? "hijau" : warna === "biru" ? "biru" : "emas"]
                    }`}
                  >
                    {lv.kanji}
                  </span>
                  <Pill
                    warna={lv.id === 1 ? "hijau" : lv.id === 2 ? "biru" : "emas"}
                  >
                    Level {lv.id}
                  </Pill>
                </div>
                <h3 className="mt-4 text-lg font-bold">{lv.nama}</h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed min-h-[3.5rem]">
                  {lv.ringkasan}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <Ikon nama="Layers" className="w-3.5 h-3.5" />
                    {lv.units.length} unit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ikon nama="ListChecks" className="w-3.5 h-3.5" />
                    {jumlahPelajaran} pelajaran
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ikon nama="Clock" className="w-3.5 h-3.5" />
                    {lv.durasi}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============ PREVIEW MATERI ============ */}
      <section className="bg-surface/70 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Materi yang bisa langsung dicoba
          </h2>
          <p className="mt-2 text-sm text-muted max-w-2xl">
            Setiap halaman materi punya pencarian, filter, penanda “sudah dipelajari”,
            dan audio. Tidak ada halaman kosong bertuliskan “segera hadir”.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {PREVIEW_MATERI.map((m, i) => (
              <Link
                key={m.href}
                href={m.href}
                className={`card card-hover p-5 animate-slide-up delay-${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
                      WARNA_IKON[m.warna]
                    }`}
                  >
                    <Ikon nama={m.ikon} className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold leading-tight">{m.judul}</h3>
                    <p className="text-xs text-muted">{m.label}</p>
                  </div>
                  <Ikon
                    nama="ArrowUpRight"
                    className="w-4 h-4 text-muted ml-auto shrink-0"
                  />
                </div>

                <p className="mt-3 text-sm text-muted leading-relaxed">{m.deskripsi}</p>

                {m.isContohHuruf && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {m.contoh.map((h) => (
                      <span
                        key={h.char}
                        className="jp rounded-lg border border-border bg-white px-2.5 py-1 text-base font-bold"
                      >
                        {h.char}
                      </span>
                    ))}
                  </div>
                )}

                {m.isContohKanji && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {m.contoh.map((k) => (
                      <span
                        key={k}
                        className="jp rounded-lg border border-border bg-white px-2.5 py-1 text-base font-bold"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                )}

                {m.href === "/kosakata" && (
                  <div className="mt-4 rounded-xl border border-border bg-white p-3">
                    <p className="jp text-sm font-semibold">
                      {KOSAKATA[0].jepang}{" "}
                      <span className="text-xs text-muted">
                        ({KOSAKATA[0].romaji})
                      </span>
                    </p>
                    <p className="text-xs text-muted mt-0.5">{KOSAKATA[0].arti}</p>
                  </div>
                )}

                {m.href === "/kaiwa" && (
                  <div className="mt-4 space-y-1.5">
                    {KAIWA[0].dialog.slice(0, 2).map((d, idx) => (
                      <div
                        key={idx}
                        className={`rounded-xl border border-border bg-white p-2.5 ${
                          idx === 1 ? "ml-6" : "mr-6"
                        }`}
                      >
                        <p className="text-[11px] font-bold text-muted">{d.speaker}</p>
                        <p className="jp text-sm">{d.jp}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ALUR BELAJAR ============ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Bagaimana alurnya?
        </h2>
        <p className="mt-2 text-sm text-muted max-w-2xl">
          Empat tahap sederhana yang berulang. Kamu bisa mulai dari mana saja, tapi
          mengikuti urutannya membuat materi lebih mudah menempel.
        </p>
        <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ALUR.map((a, i) => (
            <li key={a.judul} className={`card p-5 animate-slide-up delay-${i + 1}`}>
              <div className="flex items-center justify-between">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy/10 text-navy">
                  <Ikon nama={a.ikon} className="w-5 h-5" />
                </span>
                <span className="text-2xl font-bold text-border">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-bold">{a.judul}</h3>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">{a.deskripsi}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ KENAPA NIHON-GO ============ */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Kenapa belajar dengan Nihon-go?
          </h2>
          <p className="mt-2 text-sm text-white/70 max-w-2xl">
            Semua fitur di bawah ini benar-benar berfungsi di dalam aplikasi, bukan hanya
            daftar fitur di halaman promosi.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KENAPA_NIHONGO.map((k) => (
              <div
                key={k.judul}
                className="rounded-2xl border border-white/12 bg-white/6 p-5"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/12 text-white">
                  <Ikon nama={k.ikon} className="w-5 h-5" />
                </span>
                <h3 className="mt-4 font-bold">{k.judul}</h3>
                <p className="mt-1.5 text-sm text-white/70 leading-relaxed">
                  {k.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PREVIEW KUIS ============ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <Pill warna="biru">
              <Ikon nama="Target" className="w-3.5 h-3.5" />
              Kuis interaktif
            </Pill>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
              Coba satu kuis sekarang, tanpa perlu daftar
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Ini contoh kuis kosakata yang benar-benar bisa dijawab. Setelah menjawab,
              kamu akan langsung melihat pembahasan jawabannya. Di halaman Kuis tersedia
              lima mode dengan pilihan jumlah soal, tingkat kesulitan, skor akhir, dan
              riwayat hasil.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Kuis kosakata dua arah: Jepang → Indonesia dan sebaliknya.",
                "Kuis hiragana & katakana: tebak romaji atau pilih karakter.",
                "Kuis tata bahasa: pilih partikel dan lengkapi kalimat.",
                "Kuis kanji: tebak arti dan bacaan.",
                "Kuis campuran dengan tingkat kesulitan pilihan.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <Ikon nama="CircleCheck" className="w-4.5 h-4.5 text-success shrink-0 mt-0.5" />
                  <span className="text-muted">{t}</span>
                </li>
              ))}
            </ul>

            <Link href="/kuis" className="btn btn-navy px-5 py-3 mt-6">
              Buka halaman kuis
              <Ikon nama="ArrowRight" className="w-4 h-4" />
            </Link>
          </div>

          <PreviewKuis />
        </div>
      </section>

      {/* ============ STATISTIK ============ */}
      <section className="border-y border-border bg-surface/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATISTIK_ILUSTRATIF.map((s) => (
              <div key={s.label} className="card p-5">
                <p className="text-3xl font-bold text-primary">{s.nilai}</p>
                <p className="mt-1 font-semibold">{s.label}</p>
                <p className="text-xs text-muted mt-0.5">{s.keterangan}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted">
            Angka di atas menggambarkan isi materi yang tersedia di aplikasi ini, bukan
            klaim jumlah pengguna. Nihon-go bukan lembaga sertifikasi resmi dan tidak
            terafiliasi dengan JLPT.
          </p>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="card relative overflow-hidden p-8 sm:p-12 text-center">
          <div className="absolute inset-0 pattern-seigaiha opacity-70 pointer-events-none" />
          <div className="relative">
            <span className="jp text-4xl font-bold text-primary">はじめましょう</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
              Mari mulai pelajaran pertamamu hari ini
            </h2>
            <p className="mt-3 text-sm text-muted max-w-xl mx-auto leading-relaxed">
              Pilih level, ikuti unit satu per satu, dan biarkan progress kamu tersimpan
              otomatis di browser. Kamu bisa berhenti kapan saja dan melanjutkan nanti.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/dashboard" className="btn btn-primary px-6 py-3">
                Mulai Belajar
                <Ikon nama="ArrowRight" className="w-4 h-4" />
              </Link>
              <Link href="/huruf" className="btn btn-ghost px-6 py-3">
                <Ikon nama="Languages" className="w-4 h-4" />
                Kenali huruf dulu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white font-jp text-lg font-bold">
                  日
                </span>
                <span className="font-bold">Nihon-go</span>
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                Mulai dari huruf, berkembang menjadi percakapan.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold mb-3">Belajar</p>
              <ul className="space-y-2 text-sm text-muted">
                {[
                  ["/belajar", "Jalur Belajar"],
                  ["/huruf", "Huruf Jepang"],
                  ["/kosakata", "Kosakata"],
                  ["/grammar", "Tata Bahasa"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-primary">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold mb-3">Latihan</p>
              <ul className="space-y-2 text-sm text-muted">
                {[
                  ["/kanji", "Kanji"],
                  ["/kaiwa", "Kaiwa"],
                  ["/membaca", "Membaca"],
                  ["/kuis", "Kuis Interaktif"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-primary">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold mb-3">Kemajuan</p>
              <ul className="space-y-2 text-sm text-muted">
                {[
                  ["/dashboard", "Dashboard"],
                  ["/tes", "Tes Kemampuan"],
                  ["/progress", "Progress & Badge"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-primary">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-9 pt-6 border-t border-border text-xs text-muted flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p>© {new Date().getFullYear()} Nihon-go. Materi belajar bahasa Jepang.</p>
            <p>
              Progress disimpan lokal di browser kamu. Bukan tes resmi JLPT.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
