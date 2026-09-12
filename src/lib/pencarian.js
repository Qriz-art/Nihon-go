import { MENU } from "./nav";
import { LEVELS } from "@/data/level";
import { KOSAKATA } from "@/data/kosakata";
import { GRAMMAR } from "@/data/grammar";
import { KANJI } from "@/data/kanji";
import { KAIWA } from "@/data/kaiwa";
import { MEMBACA } from "@/data/membaca";
import { SEMUA_HURUF } from "@/data/huruf";

export const INDEX = [
  ...MENU.map((m) => ({
    tipe: "Halaman",
    label: m.label,
    sub: "Menu utama",
    href: m.href,
    kunci: m.label.toLowerCase(),
  })),
  ...LEVELS.flatMap((lv) =>
    lv.units.flatMap((unit) =>
      unit.lessons.map((l) => ({
        tipe: "Pelajaran",
        label: l.judul,
        sub: `${lv.nama} • ${unit.judul}`,
        href: `/belajar/${lv.slug}#${l.id}`,
        kunci: `${l.judul} ${unit.judul} ${lv.nama}`.toLowerCase(),
      }))
    )
  ),
  ...GRAMMAR.map((g) => ({
    tipe: "Grammar",
    label: g.nama,
    sub: g.pola,
    href: `/grammar#${g.id}`,
    kunci: `${g.nama} ${g.pola} ${g.rumus}`.toLowerCase(),
  })),
  ...KANJI.map((k) => ({
    tipe: "Kanji",
    label: `${k.kanji} — ${k.arti}`,
    sub: `On: ${k.onyomi.join("、") || "-"}`,
    href: `/kanji#${k.id}`,
    kunci: `${k.kanji} ${k.arti} ${k.onyomi.join(" ")} ${k.kunyomi.join(" ")}`.toLowerCase(),
  })),
  ...KAIWA.map((k) => ({
    tipe: "Kaiwa",
    label: k.judul,
    sub: k.kategori,
    href: `/kaiwa#${k.id}`,
    kunci: `${k.judul} ${k.kategori} ${k.deskripsi}`.toLowerCase(),
  })),
  ...MEMBACA.map((m) => ({
    tipe: "Membaca",
    label: m.judul,
    sub: m.topik,
    href: `/membaca#${m.id}`,
    kunci: `${m.judul} ${m.topik}`.toLowerCase(),
  })),
  ...KOSAKATA.map((k) => ({
    tipe: "Kosakata",
    label: `${k.jepang} — ${k.arti}`,
    sub: `${k.kategori} • ${k.romaji}`,
    href: `/kosakata#cari`,
    kunci: `${k.jepang} ${k.romaji} ${k.arti} ${k.kategori}`.toLowerCase(),
    cari: k.arti,
  })),
  ...SEMUA_HURUF.map((h) => ({
    tipe: "Huruf",
    label: `${h.char} — ${h.romaji}`,
    sub: `${h.tipe === "hiragana" ? "Hiragana" : "Katakana"} • ${h.group}`,
    href: `/huruf#${h.char}`,
    kunci: `${h.char} ${h.romaji} ${h.tipe} ${h.group}`.toLowerCase(),
  })),
];

export function cariKonten(kueri, batas = 14) {
  const q = kueri.trim().toLowerCase();
  if (!q) return [];
  const cocok = INDEX.filter((item) => item.kunci.includes(q));
  // Prioritaskan yang diawali kata kunci
  cocok.sort((a, b) => {
    const aAwal = a.kunci.startsWith(q) ? 0 : 1;
    const bAwal = b.kunci.startsWith(q) ? 0 : 1;
    return aAwal - bAwal;
  });
  return cocok.slice(0, batas);
}
