// Data gamifikasi: badge, XP, dan statistik ilustratif

export const BADGES = [
  {
    id: "hajimemashite",
    nama: "Hajimemashite",
    deskripsi: "Menyelesaikan pelajaran pertama.",
    ikon: "Sparkles",
    kriteria: { tipe: "pelajaran", jumlah: 1 },
  },
  {
    id: "hiragana-master",
    nama: "Hiragana Master",
    deskripsi: "Menandai 20 huruf hiragana sebagai sudah dipelajari.",
    ikon: "PenTool",
    kriteria: { tipe: "huruf", tipeHuruf: "hiragana", jumlah: 20 },
  },
  {
    id: "katakana-master",
    nama: "Katakana Master",
    deskripsi: "Menandai 20 huruf katakana sebagai sudah dipelajari.",
    ikon: "Languages",
    kriteria: { tipe: "huruf", tipeHuruf: "katakana", jumlah: 20 },
  },
  {
    id: "kotoba-collector",
    nama: "Kotoba Collector",
    deskripsi: "Menandai 25 kosakata sebagai sudah dipelajari.",
    ikon: "BookOpen",
    kriteria: { tipe: "kosakata", jumlah: 25 },
  },
  {
    id: "kotoba-hunter",
    nama: "Kotoba Hunter",
    deskripsi: "Menandai 75 kosakata sebagai sudah dipelajari.",
    ikon: "Library",
    kriteria: { tipe: "kosakata", jumlah: 75 },
  },
  {
    id: "kanji-explorer",
    nama: "Kanji Explorer",
    deskripsi: "Menyelesaikan 10 kartu kanji.",
    ikon: "SquareKanji",
    kriteria: { tipe: "kanji", jumlah: 10 },
  },
  {
    id: "grammar-starter",
    nama: "Grammar Starter",
    deskripsi: "Mempelajari 5 pola tata bahasa.",
    ikon: "Braces",
    kriteria: { tipe: "grammar", jumlah: 5 },
  },
  {
    id: "quiz-rookie",
    nama: "Quiz Rookie",
    deskripsi: "Menyelesaikan kuis pertama.",
    ikon: "Target",
    kriteria: { tipe: "kuis", jumlah: 1 },
  },
  {
    id: "quiz-master",
    nama: "Quiz Master",
    deskripsi: "Menyelesaikan 10 sesi kuis.",
    ikon: "Trophy",
    kriteria: { tipe: "kuis", jumlah: 10 },
  },
  {
    id: "consistent-learner",
    nama: "Consistent Learner",
    deskripsi: "Belajar 3 hari berturut-turut.",
    ikon: "Flame",
    kriteria: { tipe: "streak", jumlah: 3 },
  },
  {
    id: "week-warrior",
    nama: "Week Warrior",
    deskripsi: "Belajar 7 hari berturut-turut.",
    ikon: "CalendarCheck",
    kriteria: { tipe: "streak", jumlah: 7 },
  },
  {
    id: "xp-500",
    nama: "Gojuu Nen",
    deskripsi: "Mengumpulkan 500 XP.",
    ikon: "Zap",
    kriteria: { tipe: "xp", jumlah: 500 },
  },
];

// Aturan perolehan XP
export const XP = {
  pelajaranSelesai: 20,
  hurufDipahami: 2,
  kosakataDipahami: 2,
  kanjiDikuasai: 5,
  grammarDipelajari: 8,
  kaiwaSelesai: 15,
  membacaSelesai: 20,
  jawabanBenarKuis: 5,
  kuisSelesai: 10,
  targetHarian: 50,
};

// Statistik ilustratif untuk landing page (bukan klaim data pengguna nyata)
export const STATISTIK_ILUSTRATIF = [
  { label: "Materi pelajaran", nilai: "60+", keterangan: "Tersusun dalam 3 level" },
  { label: "Karakter huruf", nilai: "200+", keterangan: "Hiragana & katakana" },
  { label: "Kosakata contoh", nilai: "150+", keterangan: "Dengan contoh kalimat" },
  { label: "Pola tata bahasa", nilai: "20+", keterangan: "Pemula sampai menengah" },
];

export const KENAPA_NIHONGO = [
  {
    ikon: "Route",
    judul: "Jalur belajar berjenjang",
    deskripsi:
      "Dari hiragana sampai kalimat majemuk, semuanya tersusun dalam unit dan pelajaran yang jelas.",
  },
  {
    ikon: "Volume2",
    judul: "Latihan pengucapan",
    deskripsi:
      "Setiap huruf, kosakata, dan dialog punya tombol audio yang membaca dengan pelafalan Jepang.",
  },
  {
    ikon: "Brain",
    judul: "Kuis yang benar-benar berfungsi",
    deskripsi:
      "Lima mode kuis dengan pembahasan jawaban, skor, dan riwayat hasil tersimpan di browser.",
  },
  {
    ikon: "Flame",
    judul: "Progress & streak",
    deskripsi:
      "XP, level pengguna, badge, dan target harian membantu menjaga kebiasaan belajar.",
  },
  {
    ikon: "BookMarked",
    judul: "Materi berbahasa Indonesia",
    deskripsi:
      "Penjelasan grammar ditulis dalam bahasa Indonesia, lengkap dengan romaji dan furigana.",
  },
  {
    ikon: "Smartphone",
    judul: "Nyaman di HP maupun desktop",
    deskripsi:
      "Sidebar di layar lebar, navigasi bawah di HP, dan kartu yang menyesuaikan ukuran layar.",
  },
];
