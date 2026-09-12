// Jalur belajar Nihon-go: level → unit → pelajaran

export const LEVELS = [
  {
    id: 1,
    nama: "Pemula",
    slug: "pemula",
    kanji: "初",
    ringkasan: "Mulai dari nol: mengenal huruf, salam, angka, dan kalimat sederhana.",
    durasi: "±6 jam materi",
    units: [
      {
        id: "u1",
        judul: "Unit 1 — Pengenalan Bahasa Jepang",
        deskripsi: "Memahami struktur dasar bahasa Jepang dan cara penulisan.",
        lessons: [
          { id: "l1-1", judul: "Pengenalan Bahasa Jepang", tipe: "kosakata", ref: "Salam", durasi: 10, ringkasan: "Struktur kalimat, jenis huruf, dan cara belajar yang efektif." },
          { id: "l1-2", judul: "Hiragana Dasar", tipe: "huruf", ref: "hiragana", durasi: 25, ringkasan: "46 huruf hiragana dasar dari あ sampai ん." },
          { id: "l1-3", judul: "Hiragana Kombinasi", tipe: "huruf", ref: "hiragana", durasi: 15, ringkasan: "きゃ, しゅ, ちょ dan kombinasi lain." },
          { id: "l1-4", judul: "Latihan Huruf Pertama", tipe: "kuis", ref: "huruf", durasi: 10, ringkasan: "Kuis mengenali hiragana dasar." },
        ],
      },
      {
        id: "u2",
        judul: "Unit 2 — Katakana",
        deskripsi: "Membaca kata serapan dan nama asing dengan katakana.",
        lessons: [
          { id: "l1-5", judul: "Katakana Dasar", tipe: "huruf", ref: "katakana", durasi: 25, ringkasan: "46 huruf katakana dasar dan penggunaannya." },
          { id: "l1-6", judul: "Katakana Kombinasi", tipe: "huruf", ref: "katakana", durasi: 15, ringkasan: "Kombinasi katakana untuk bunyi asing." },
          { id: "l1-7", judul: "Dakuten & Handakuten", tipe: "huruf", ref: "katakana", durasi: 15, ringkasan: "が, ざ, ぱ dan variasi bunyi." },
        ],
      },
      {
        id: "u3",
        judul: "Unit 3 — Salam & Ungkapan Dasar",
        deskripsi: "Ungkapan yang langsung dipakai setiap hari.",
        lessons: [
          { id: "l1-8", judul: "Salam Sehari-hari", tipe: "kosakata", ref: "Salam", durasi: 15, ringkasan: "Ohayou, konnichiwa, arigatou, dan lainnya." },
          { id: "l1-9", judul: "Kaiwa: Salam Pagi", tipe: "kaiwa", ref: "kw1", durasi: 12, ringkasan: "Dialog salam di gerbang sekolah." },
          { id: "l1-10", judul: "Perkenalan Diri", tipe: "kosakata", ref: "Perkenalan", durasi: 15, ringkasan: "Cara memperkenalkan nama dan asal." },
          { id: "l1-11", judul: "Kaiwa: Perkenalan Pertama", tipe: "kaiwa", ref: "kw2", durasi: 12, ringkasan: "Dialog perkenalan di acara pertukaran bahasa." },
        ],
      },
      {
        id: "u4",
        judul: "Unit 4 — Angka, Waktu & Tanggal",
        deskripsi: "Menyebut angka, jam, hari, dan bulan.",
        lessons: [
          { id: "l1-12", judul: "Angka Jepang", tipe: "kosakata", ref: "Angka", durasi: 15, ringkasan: "1 sampai 10.000 dan cara membacanya." },
          { id: "l1-13", judul: "Waktu & Jam", tipe: "kosakata", ref: "Waktu", durasi: 15, ringkasan: "Menyatakan jam, menit, dan waktu relatif." },
          { id: "l1-14", judul: "Hari & Bulan", tipe: "kosakata", ref: "Hari dan Bulan", durasi: 15, ringkasan: "Nama hari dan nama bulan dalam bahasa Jepang." },
          { id: "l1-15", judul: "Kuis Kosakata Dasar", tipe: "kuis", ref: "kosakata", durasi: 10, ringkasan: "Uji kosakata salam, angka, dan waktu." },
        ],
      },
      {
        id: "u5",
        judul: "Unit 5 — Kehidupan Sehari-hari",
        deskripsi: "Kosakata sekitar rumah, makanan, dan kegiatan harian.",
        lessons: [
          { id: "l1-16", judul: "Keluarga & Orang Terdekat", tipe: "kosakata", ref: "Keluarga", durasi: 15, ringkasan: "Sebutan anggota keluarga sendiri dan orang lain." },
          { id: "l1-17", judul: "Makanan & Minuman", tipe: "kosakata", ref: "Makanan", durasi: 15, ringkasan: "Kosakata makanan, minuman, dan rasa." },
          { id: "l1-18", judul: "Tempat Umum", tipe: "kosakata", ref: "Tempat", durasi: 15, ringkasan: "Stasiun, rumah sakit, bank, dan lainnya." },
          { id: "l1-19", judul: "Membaca: Rutinitas Pagi", tipe: "membaca", ref: "mb1", durasi: 15, ringkasan: "Teks pendek tentang kebiasaan pagi." },
          { id: "l1-20", judul: "Kanji Pertama: 日月火水木金土", tipe: "kanji", ref: "kanji", durasi: 20, ringkasan: "Kanji dasar yang muncul di kalender." },
        ],
      },
    ],
  },
  {
    id: 2,
    nama: "Dasar",
    slug: "dasar",
    kanji: "基",
    ringkasan: "Menyusun kalimat sendiri dengan partikel, kata sifat, dan bentuk kata kerja.",
    durasi: "±8 jam materi",
    units: [
      {
        id: "u6",
        judul: "Unit 6 — Partikel Inti",
        deskripsi: "Bagian terpenting bahasa Jepang: partikel.",
        lessons: [
          { id: "l2-1", judul: "Partikel は dan が", tipe: "grammar", ref: "g3", durasi: 20, ringkasan: "Membedakan topik dan subjek." },
          { id: "l2-2", judul: "Partikel を", tipe: "grammar", ref: "g4", durasi: 15, ringkasan: "Menandai objek langsung kata kerja." },
          { id: "l2-3", judul: "Partikel に dan で", tipe: "grammar", ref: "g5", durasi: 20, ringkasan: "Tujuan, waktu, tempat aksi, dan alat." },
          { id: "l2-4", judul: "Partikel の, も, と, へ", tipe: "grammar", ref: "g6", durasi: 20, ringkasan: "Kepemilikan, 'juga', 'dan', dan arah." },
          { id: "l2-5", judul: "Kuis Partikel", tipe: "kuis", ref: "grammar", durasi: 12, ringkasan: "Latihan memilih partikel yang tepat." },
        ],
      },
      {
        id: "u7",
        judul: "Unit 7 — Bentuk Sopan",
        deskripsi: "Pola です dan ます beserta variasi negatif dan lampaunya.",
        lessons: [
          { id: "l2-6", judul: "Pola です", tipe: "grammar", ref: "g1", durasi: 15, ringkasan: "Kalimat nomina dan kata sifat な." },
          { id: "l2-7", judul: "Pola ます", tipe: "grammar", ref: "g2", durasi: 15, ringkasan: "Kata kerja sopan untuk tindakan sehari-hari." },
          { id: "l2-8", judul: "Bentuk Negatif ません", tipe: "grammar", ref: "g8", durasi: 15, ringkasan: "Menyatakan 'tidak melakukan'." },
          { id: "l2-9", judul: "Bentuk Lampau ました", tipe: "grammar", ref: "g9", durasi: 15, ringkasan: "Menceritakan kegiatan yang sudah selesai." },
        ],
      },
      {
        id: "u8",
        judul: "Unit 8 — Kata Sifat & Bentuk て",
        deskripsi: "Mendeskripsikan benda dan menyambung tindakan.",
        lessons: [
          { id: "l2-10", judul: "Kata Sifat い dan な", tipe: "grammar", ref: "g10", durasi: 20, ringkasan: "Dua jenis kata sifat dan cara memakainya." },
          { id: "l2-11", judul: "Bentuk て", tipe: "grammar", ref: "g11", durasi: 25, ringkasan: "Dasar ています, てください, dan てもいいです." },
          { id: "l2-12", judul: "Kata Kerja Kelompok Dasar", tipe: "kosakata", ref: "Kata Kerja", durasi: 20, ringkasan: "Kosakata kata kerja paling sering dipakai." },
          { id: "l2-13", judul: "Kata Sifat Sehari-hari", tipe: "kosakata", ref: "Kata Sifat", durasi: 15, ringkasan: "Kosakata sifat untuk mendeskripsikan hal." },
        ],
      },
      {
        id: "u9",
        judul: "Unit 9 — Kaiwa & Dokkai Dasar",
        deskripsi: "Percakapan situasional dan bacaan pendek.",
        lessons: [
          { id: "l2-14", judul: "Di Kelas", tipe: "kaiwa", ref: "kw3", durasi: 12, ringkasan: "Bertanya kepada guru dengan sopan." },
          { id: "l2-15", judul: "Di Toko & Restoran", tipe: "kaiwa", ref: "kw5", durasi: 15, ringkasan: "Memesan makanan dan menanyakan harga." },
          { id: "l2-16", judul: "Bertanya Arah", tipe: "kaiwa", ref: "kw7", durasi: 15, ringkasan: "Menanyakan jalan menuju stasiun." },
          { id: "l2-17", judul: "Membaca: Belanja & Cuaca", tipe: "membaca", ref: "mb3", durasi: 20, ringkasan: "Dua teks pendek dengan kosakata belanja dan cuaca." },
          { id: "l2-18", judul: "Kanji Umum", tipe: "kanji", ref: "kanji", durasi: 25, ringkasan: "人大小学生校時食飲." },
        ],
      },
    ],
  },
  {
    id: 3,
    nama: "Menengah",
    slug: "menengah",
    kanji: "中",
    ringkasan: "Bentuk biasa, pengandaian, pengalaman, dan percakapan situasional.",
    durasi: "±10 jam materi",
    units: [
      {
        id: "u10",
        judul: "Unit 10 — Bentuk Biasa (普通形)",
        deskripsi: "Kunci untuk berbicara natural dan memahami tata bahasa lanjutan.",
        lessons: [
          { id: "l3-1", judul: "Bentuk ない", tipe: "grammar", ref: "g12", durasi: 20, ringkasan: "Negatif santai dan dasar bentuk biasa." },
          { id: "l3-2", judul: "Pola と思います", tipe: "grammar", ref: "g16", durasi: 20, ringkasan: "Menyampaikan pendapat dan dugaan." },
          { id: "l3-3", judul: "Pola たり〜たりします", tipe: "grammar", ref: "g21", durasi: 20, ringkasan: "Menyebut beberapa tindakan sekaligus." },
        ],
      },
      {
        id: "u11",
        judul: "Unit 11 — Kemampuan & Pengalaman",
        deskripsi: "Menyatakan bisa melakukan dan pernah melakukan sesuatu.",
        lessons: [
          { id: "l3-4", judul: "Pola ことができます", tipe: "grammar", ref: "g14", durasi: 20, ringkasan: "Menyatakan kemampuan." },
          { id: "l3-5", judul: "Pola たことがあります", tipe: "grammar", ref: "g15", durasi: 20, ringkasan: "Menceritakan pengalaman." },
          { id: "l3-6", judul: "Pola たいです", tipe: "grammar", ref: "g13", durasi: 15, ringkasan: "Menyatakan keinginan sendiri." },
          { id: "l3-7", judul: "Kuis Grammar Menengah", tipe: "kuis", ref: "grammar", durasi: 12, ringkasan: "Latihan pola menengah." },
        ],
      },
      {
        id: "u12",
        judul: "Unit 12 — Kalimat Majemuk",
        deskripsi: "Menghubungkan sebab, akibat, dan pengandaian.",
        lessons: [
          { id: "l3-8", judul: "Pola ので", tipe: "grammar", ref: "g17", durasi: 20, ringkasan: "Menyatakan sebab dengan halus." },
          { id: "l3-9", judul: "Pola のに", tipe: "grammar", ref: "g18", durasi: 20, ringkasan: "Menyatakan pertentangan dan kekecewaan." },
          { id: "l3-10", judul: "Pola なら, ば, たら", tipe: "grammar", ref: "g19", durasi: 25, ringkasan: "Tiga cara menyatakan pengandaian." },
          { id: "l3-11", judul: "Pola そうです / ようです", tipe: "grammar", ref: "g20", durasi: 20, ringkasan: "Menyatakan dugaan dan informasi." },
        ],
      },
      {
        id: "u13",
        judul: "Unit 13 — Situasi & Kanji Menengah",
        deskripsi: "Percakapan situasional, dokkai, dan kanji level menengah.",
        lessons: [
          { id: "l3-12", judul: "Percakapan di Kantor", tipe: "kaiwa", ref: "kw11", durasi: 15, ringkasan: "Melaporkan pekerjaan dengan bahasa sopan." },
          { id: "l3-13", judul: "Membuat Janji", tipe: "kaiwa", ref: "kw10", durasi: 15, ringkasan: "Mengatur waktu pertemuan dengan teman." },
          { id: "l3-14", judul: "Membaca: Pengalaman di Jepang", tipe: "membaca", ref: "mb7", durasi: 25, ringkasan: "Teks menengah dengan pola 〜てくれました dan 〜からこそ." },
          { id: "l3-15", judul: "Kanji Menengah", tipe: "kanji", ref: "kanji", durasi: 25, ringkasan: "Kanji dengan goresan lebih rumit." },
          { id: "l3-16", judul: "Keigo Dasar", tipe: "grammar", ref: "g22", durasi: 20, ringkasan: "Bahasa sopan untuk situasi formal." },
        ],
      },
    ],
  },
];

export const TIPE_LESSON = {
  huruf: { label: "Huruf", href: "/huruf", color: "merah" },
  kosakata: { label: "Kosakata", href: "/kosakata", color: "navy" },
  grammar: { label: "Tata Bahasa", href: "/grammar", color: "biru" },
  kanji: { label: "Kanji", href: "/kanji", color: "emas" },
  kaiwa: { label: "Kaiwa", href: "/kaiwa", color: "hijau" },
  membaca: { label: "Membaca", href: "/membaca", color: "ungu" },
  kuis: { label: "Kuis", href: "/kuis", color: "merah" },
};

export const SEMUA_PELAJARAN = LEVELS.flatMap((lv) =>
  lv.units.flatMap((unit) =>
    unit.lessons.map((lesson) => ({
      ...lesson,
      level: lv.id,
      levelNama: lv.nama,
      unitId: unit.id,
      unitJudul: unit.judul,
    }))
  )
);

export function getLevelBySlug(slug) {
  return LEVELS.find((lv) => lv.slug === slug);
}

export function getLessonById(id) {
  return SEMUA_PELAJARAN.find((l) => l.id === id);
}
