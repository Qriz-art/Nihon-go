# Nihon-go

**Mulai dari huruf, berkembang menjadi percakapan.**

Platform belajar bahasa Jepang berbahasa Indonesia: hiragana, katakana, kosakata, tata
bahasa, kanji, kaiwa, membaca, kuis interaktif, dan tes kemampuan.

Dibuat dengan **Next.js (App Router, JavaScript)** dan **Tailwind CSS v4**.

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build produksi
npm start       # jalankan hasil build
npm run lint    # ESLint
```

## Halaman

| Rute | Isi |
| --- | --- |
| `/` | Landing page: hero, pilihan level, preview materi, preview kuis |
| `/dashboard` | Sapaan, progress, streak, rekomendasi pelajaran, aktivitas |
| `/belajar` | Jalur belajar 3 level beserta unit dan pelajaran |
| `/belajar/[slug]` | Detail level (`pemula`, `dasar`, `menengah`) |
| `/huruf` | Hiragana & katakana: grid karakter, filter, audio, mode latihan |
| `/kosakata` | Kosakata per kategori: pencarian, filter, flashcard, favorit |
| `/grammar` | 20+ pola tata bahasa dengan rumus, contoh, dan catatan kesalahan |
| `/kanji` | Kanji bertahap: onyomi, kunyomi, contoh kosakata, latihan |
| `/kaiwa` | Dialog percakapan dengan romaji, terjemahan, dan kuis pemahaman |
| `/membaca` | Teks bertingkat dengan furigana, kosakata, grammar, dan soal |
| `/kuis` | Lima mode kuis dengan pembahasan dan skor akhir |
| `/tes` | Tes kemampuan dengan timer opsional dan rekomendasi materi |
| `/progress` | XP, level, streak, badge, riwayat belajar, statistik kuis |

## Struktur proyek

```
src/
  app/            # rute App Router (landing di page.js, aplikasi di grup (app))
  components/     # komponen UI reusable (Sidebar, KuisEngine, AudioButton, ...)
  data/           # data pembelajaran dalam bentuk array/object JavaScript
  lib/            # progress context, generator soal, audio, pencarian, navigasi
```

## Data yang tersedia

Semua angka dihitung dari `src/data/`, jadi UI ikut berubah saat data ditambah.

| Data | Jumlah |
| --- | --- |
| Karakter hiragana & katakana | 208 (dasar, dakuten, kombinasi) |
| Kosakata | 211 entri dalam 23 kategori |
| Pola tata bahasa | 22 pola + 38 butir soal pola |
| Kanji | 60 (level 1: 23, level 2: 17, level 3: 20) |
| Dialog kaiwa | 12 situasi, 60 baris dialog |
| Teks membaca | 9 teks, 27 soal pemahaman |
| Jalur belajar | 3 level, 13 unit, 54 pelajaran |

## Catatan teknis

- **Data lokal.** Semua materi berasal dari `src/data/` — tidak ada API eksternal.
- **Progress di browser.** XP, streak, badge, favorit, dan riwayat kuis disimpan di
  `localStorage` lewat `ProgressProvider` (`src/lib/progress.jsx`). Struktur state
  dipisah dari UI sehingga mudah dipindahkan ke database seperti Supabase nanti.
- **Bebas hydration error.** Semua pembacaan `localStorage`, `location.hash`, dan
  `sessionStorage` dilakukan di dalam `useEffect`, dan soal acak dibuat setelah komponen
  terpasang di browser.
- **Audio.** Memakai Web Speech API (`ja-JP`). Jika browser tidak mendukung, tombol audio
  berubah menjadi nonaktif dengan penjelasan, bukan tombol palsu.
- **Bukan tes resmi.** Label level seperti N5/N4 merujuk pada *materi yang terinspirasi
  level JLPT*, bukan sertifikasi resmi.
- **Gambar pratinjau saat dibagikan.** `public/Poster-n.jpg` (2278×1280) dipakai sebagai
  `og:image` dan `twitter:image`. Agar gambarnya benar-benar muncul saat tautan di-share ke WhatsApp,
  Facebook, atau X, alamat situs harus bisa diakses publik: set `NEXT_PUBLIC_SITE_URL`
  (contoh `https://nihon-go.com`) saat deploy. Kalau tidak diisi, nilai bawaannya
  `https://nihon-go-pearl.vercel.app`, sehingga gambar akan gagal dimuat bila domain berbeda.
  Setelah mengubah gambar, bersihkan cache crawler (Facebook Sharing Debugger atau
  `?v=2` di URL) karena banyak platform menyimpan pratinjau lama.
