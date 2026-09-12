// Pembuat soal kuis dari data lokal

import { KOSAKATA } from "@/data/kosakata";
import { HIRAGANA, KATAKANA } from "@/data/huruf";
import { KANJI } from "@/data/kanji";
import { MEMBACA } from "@/data/membaca";
import { SOAL_GRAMMAR, SOAL_LENGKAP_KALIMAT } from "@/data/soal";

export function acak(array) {
  const hasil = [...array];
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

export function ambilSoal(array, jumlah) {
  return acak(array).slice(0, jumlah);
}

// Kunci unik sebuah entri data (dipakai untuk mencegah duplikat saat menggabung pool)
function kunci(entri) {
  return entri.id ?? entri.char ?? entri.kanji ?? entri.jepang ?? entri.soal;
}

// Ambil soal dari `sumber`. Jika jumlahnya kurang dari yang diminta, lengkapi
// dari `semua` supaya pengguna tetap mendapat jumlah soal yang ia pilih.
export function ambilDenganCadangan(sumber, semua, jumlah) {
  if (sumber.length >= jumlah) return ambilSoal(sumber, jumlah);
  const terpakai = new Set(sumber.map(kunci));
  const cadangan = semua.filter((x) => !terpakai.has(kunci(x)));
  return ambilSoal([...sumber, ...cadangan], jumlah);
}

// Buat pilihan salah yang tidak duplikat dengan jawaban benar
function buatOpsi(benar, kandidat, jumlah = 4) {
  const unik = [...new Set(kandidat.filter((k) => k !== benar))];
  const salah = acak(unik).slice(0, jumlah - 1);
  const opsi = acak([benar, ...salah]);
  return { opsi, jawaban: opsi.indexOf(benar) };
}

// ======================= KOSAKATA =======================
export function soalKosakata({ jumlah = 10, mode = "campur", level = 0 } = {}) {
  const sumber = level ? KOSAKATA.filter((k) => k.level === level) : KOSAKATA;
  const dipilih = ambilDenganCadangan(sumber, KOSAKATA, jumlah);

  return dipilih.map((k, i) => {
    const arah =
      mode === "jp-id" ? "jp-id" : mode === "id-jp" ? "id-jp" : i % 2 === 0 ? "jp-id" : "id-jp";

    if (arah === "jp-id") {
      const { opsi, jawaban } = buatOpsi(
        k.arti,
        KOSAKATA.map((x) => x.arti)
      );
      return {
        id: `kosakata-${k.id}-${i}`,
        tipe: "Kosakata",
        kategori: k.kategori,
        level: k.level,
        pertanyaan: "Apa arti kosakata berikut?",
        teksBesar: k.jepang,
        audio: k.jepang,
        opsi,
        jawaban,
        penjelasan: `${k.jepang} (${k.romaji}) berarti "${k.arti}". Contoh: ${k.contohJp} — ${k.contohId}`,
      };
    }

    const { opsi, jawaban } = buatOpsi(
      k.jepang,
      KOSAKATA.map((x) => x.jepang)
    );
    return {
      id: `kosakata-${k.id}-${i}`,
      tipe: "Kosakata",
      kategori: k.kategori,
      level: k.level,
      pertanyaan: `Bahasa Jepang dari "${k.arti}" adalah...`,
      teksBesar: null,
      audio: k.jepang,
      opsi,
      jawaban,
      penjelasan: `"${k.arti}" dalam bahasa Jepang adalah ${k.jepang} (${k.romaji}). Contoh: ${k.contohJp}`,
    };
  });
}

// ======================= HURUF =======================
export function soalHuruf({ jumlah = 10, tipe = "hiragana", mode = "romaji" } = {}) {
  const pool = tipe === "katakana" ? KATAKANA : tipe === "keduanya" ? [...HIRAGANA, ...KATAKANA] : HIRAGANA;
  const hurufDasar = pool.filter((h) => h.jenis === "dasar");
  const sumber = hurufDasar.length ? hurufDasar : pool;
  const dipilih = ambilDenganCadangan(sumber, pool, jumlah);

  return dipilih.map((h, i) => {
    if (mode === "karakter") {
      const { opsi, jawaban } = buatOpsi(
        h.char,
        pool.map((x) => x.char)
      );
      return {
        id: `huruf-${h.char}-${i}`,
        tipe: "Huruf",
        kategori: h.tipe === "hiragana" ? "Hiragana" : "Katakana",
        pertanyaan: `Pilih karakter ${h.tipe === "hiragana" ? "hiragana" : "katakana"} untuk "${h.romaji}"`,
        teksBesar: null,
        audio: h.char,
        opsi,
        jawaban,
        penjelasan: `${h.romaji} ditulis ${h.char}. Contoh kata: ${h.word} (${h.wordMeaning}).`,
      };
    }

    const { opsi, jawaban } = buatOpsi(
      h.romaji,
      pool.map((x) => x.romaji)
    );
    return {
      id: `huruf-${h.char}-${i}`,
      tipe: "Huruf",
      kategori: h.tipe === "hiragana" ? "Hiragana" : "Katakana",
      pertanyaan: "Bagaimana cara membaca karakter ini?",
      teksBesar: h.char,
      audio: h.char,
      opsi,
      jawaban,
      penjelasan: `${h.char} dibaca "${h.romaji}". Contoh kata: ${h.word} (${h.wordMeaning}).`,
    };
  });
}

// ======================= GRAMMAR =======================
export function soalGrammar({ jumlah = 10, level = 0 } = {}) {
  const dasar = SOAL_GRAMMAR.filter((s) => (level ? s.level === level : true));
  const pool = [...dasar, ...SOAL_LENGKAP_KALIMAT];
  const dipilih = ambilDenganCadangan(pool, [...SOAL_GRAMMAR, ...SOAL_LENGKAP_KALIMAT], jumlah);

  return dipilih.map((s, i) => {
    const opsiAcak = acak(s.opsi);
    const jawabanBaru = opsiAcak.indexOf(s.opsi[s.jawaban]);
    return {
      id: `grammar-${i}-${s.soal.slice(0, 8)}`,
      tipe: "Grammar",
      kategori: s.topik || "Tata Bahasa",
      level: s.level,
      pertanyaan: "Pilih jawaban yang paling tepat",
      teksBesar: s.soal,
      audio: null,
      opsi: opsiAcak,
      jawaban: jawabanBaru,
      penjelasan: s.penjelasan,
    };
  });
}

// ======================= KANJI =======================
export function soalKanji({ jumlah = 10, mode = "campur", level = 0 } = {}) {
  const sumber = level ? KANJI.filter((k) => k.level === level) : KANJI;
  const dipilih = ambilDenganCadangan(sumber, KANJI, jumlah);

  return dipilih.map((k, i) => {
    const arah = mode === "arti" ? "arti" : mode === "bacaan" ? "bacaan" : i % 2 === 0 ? "arti" : "bacaan";

    if (arah === "arti") {
      const { opsi, jawaban } = buatOpsi(
        k.arti,
        KANJI.map((x) => x.arti)
      );
      return {
        id: `kanji-${k.id}-${i}`,
        tipe: "Kanji",
        kategori: `Level ${k.level}`,
        level: k.level,
        pertanyaan: "Apa arti kanji berikut?",
        teksBesar: k.kanji,
        audio: k.kosakata[0]?.jp ?? k.kanji,
        opsi,
        jawaban,
        penjelasan: `${k.kanji} berarti "${k.arti}". Bacaan on: ${k.onyomi.join("、") || "-"}, kun: ${k.kunyomi.join("、") || "-"}.`,
      };
    }

    const bacaanBenar = k.onyomi[0] || k.kunyomi[0] || k.kanji;
    const semuaBacaan = KANJI.flatMap((x) => [x.onyomi[0], x.kunyomi[0]]).filter(Boolean);
    const { opsi, jawaban } = buatOpsi(bacaanBenar, semuaBacaan);
    return {
      id: `kanji-${k.id}-${i}`,
      tipe: "Kanji",
      kategori: `Level ${k.level}`,
      level: k.level,
      pertanyaan: `Pilih salah satu bacaan kanji berikut`,
      teksBesar: k.kanji,
      audio: k.kosakata[0]?.jp ?? k.kanji,
      opsi,
      jawaban,
      penjelasan: `${k.kanji} dibaca ${bacaanBenar}. Artinya "${k.arti}". Contoh: ${k.kosakata[0]?.jp} (${k.kosakata[0]?.arti}).`,
    };
  });
}

// ======================= MEMBACA =======================
export function soalMembaca({ jumlah = 10, level = 0 } = {}) {
  const sumber = level ? MEMBACA.filter((m) => m.level === level) : MEMBACA;
  const kumpulkan = (daftar) =>
    daftar.flatMap((teks) =>
      teks.pertanyaan.map((p, idx) => ({ id: `${teks.id}-${idx}`, teks, p, idx }))
    );

  const pool = kumpulkan(sumber.length ? sumber : MEMBACA);
  const semua = kumpulkan(MEMBACA);
  const dipilih = ambilDenganCadangan(pool, semua, jumlah);

  return dipilih.map(({ teks, p, idx }) => {
    const opsiAcak = acak(p.opsi);
    const jawabanBaru = opsiAcak.indexOf(p.opsi[p.jawaban]);
    return {
      id: `membaca-${teks.id}-${idx}`,
      tipe: "Membaca",
      kategori: teks.topik,
      level: teks.level,
      pertanyaan: p.q,
      teksBesar: null,
      konteks: teks.judul,
      audio: null,
      opsi: opsiAcak,
      jawaban: jawabanBaru,
      penjelasan: p.penjelasan,
    };
  });
}

// ======================= CAMPURAN =======================
export function soalCampuran({ jumlah = 10, level = 0 } = {}) {
  const bagian = Math.ceil(jumlah / 5);
  const gabungan = [
    ...soalKosakata({ jumlah: bagian, level }),
    ...soalGrammar({ jumlah: bagian, level }),
    ...soalKanji({ jumlah: bagian, level }),
    ...soalHuruf({ jumlah: bagian, tipe: "keduanya" }),
    ...soalMembaca({ jumlah: bagian, level }),
  ];
  return ambilSoal(gabungan, jumlah).map((s, i) => ({ ...s, id: `${s.id}-mix${i}` }));
}

export const MODE_KUIS = {
  kosakata: {
    nama: "Kuis Kosakata",
    deskripsi: "Jepang → Indonesia dan Indonesia → Jepang.",
    ikon: "BookOpen",
  },
  huruf: {
    nama: "Kuis Hiragana / Katakana",
    deskripsi: "Tebak romaji atau pilih karakter yang benar.",
    ikon: "Languages",
  },
  grammar: {
    nama: "Kuis Tata Bahasa",
    deskripsi: "Pilih partikel, lengkapi kalimat, dan pahami pola.",
    ikon: "Braces",
  },
  kanji: {
    nama: "Kuis Kanji",
    deskripsi: "Tebak arti dan bacaan kanji.",
    ikon: "SquareKanji",
  },
  campuran: {
    nama: "Kuis Campuran",
    deskripsi: "Kombinasi semua materi dengan tingkat kesulitan pilihan.",
    ikon: "Shuffle",
  },
};

export function buatSoal({ mode, jumlah, level, opsiMode }) {
  switch (mode) {
    case "kosakata":
      return soalKosakata({ jumlah, level, mode: opsiMode });
    case "huruf":
      return soalHuruf({ jumlah, tipe: opsiMode || "hiragana" });
    case "grammar":
      return soalGrammar({ jumlah, level });
    case "kanji":
      return soalKanji({ jumlah, level, mode: opsiMode });
    case "campuran":
    default:
      return soalCampuran({ jumlah, level });
  }
}
