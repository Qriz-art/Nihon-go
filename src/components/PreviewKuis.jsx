"use client";

import { useEffect, useState } from "react";
import Ikon from "./Ikon";
import { soalKosakata } from "@/lib/quiz";

const SOAL_TETAP = [
  {
    pertanyaan: "Apa arti kosakata berikut?",
    teksBesar: "ありがとう",
    opsi: ["Selamat pagi", "Terima kasih", "Permisi", "Sampai jumpa"],
    jawaban: 1,
    penjelasan: "ありがとう (arigatou) berarti terima kasih. Bentuk sopannya ありがとうございます.",
  },
  {
    pertanyaan: "Bahasa Jepang dari \"sekolah\" adalah...",
    teksBesar: null,
    opsi: ["がっこう", "せんせい", "としょかん", "でんしゃ"],
    jawaban: 0,
    penjelasan: "学校 (がっこう / gakkou) berarti sekolah.",
  },
  {
    pertanyaan: "Bagaimana cara membaca karakter ini?",
    teksBesar: "き",
    opsi: ["ka", "ko", "ki", "ku"],
    jawaban: 2,
    penjelasan: "き dibaca ki. Contoh kata: きって (kitte) = perangko.",
  },
];

export default function PreviewKuis() {
  const [soal, setSoal] = useState(SOAL_TETAP);
  const [indeks, setIndeks] = useState(0);
  const [pilihan, setPilihan] = useState(null);
  const [skor, setSkor] = useState(0);
  const [selesai, setSelesai] = useState(false);

  // Ambil variasi soal dari data lokal hanya di browser (aman untuk hidrasi)
  useEffect(() => {
    try {
      const acak = soalKosakata({ jumlah: 3, mode: "jp-id" });
      if (acak.length === 3) setSoal(acak);
    } catch {
      // biarkan pakai soal tetap
    }
  }, []);

  const sekarang = soal[indeks];

  const jawab = (i) => {
    if (pilihan !== null) return;
    setPilihan(i);
    if (i === sekarang.jawaban) setSkor((s) => s + 1);
  };

  const lanjut = () => {
    if (indeks + 1 >= soal.length) {
      setSelesai(true);
      return;
    }
    setIndeks((i) => i + 1);
    setPilihan(null);
  };

  const ulang = () => {
    setIndeks(0);
    setPilihan(null);
    setSkor(0);
    setSelesai(false);
  };

  if (selesai) {
    return (
      <div className="card p-6 sm:p-8 text-center animate-pop">
        <span className="mx-auto flex items-center justify-center w-14 h-14 rounded-2xl bg-success-light text-success">
          <Ikon nama="PartyPopper" className="w-7 h-7" />
        </span>
        <h3 className="mt-4 text-lg font-bold">
          Selesai! Skor kamu {skor}/{soal.length}
        </h3>
        <p className="mt-1 text-sm text-muted">
          Itu baru 3 soal. Ada 5 mode kuis dengan puluhan soal yang menunggu di halaman
          Kuis.
        </p>
        <button type="button" onClick={ulang} className="btn btn-ghost px-4 py-2.5 mt-4">
          <Ikon nama="RotateCcw" className="w-4 h-4" />
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center justify-between text-xs font-semibold text-muted mb-3">
        <span>
          Soal {indeks + 1} / {soal.length}
        </span>
        <span className="chip bg-surface text-navy border-border">
          Skor {skor}
        </span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden mb-5">
        <div
          className="h-1.5 rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((indeks + (pilihan !== null ? 1 : 0)) / soal.length) * 100}%` }}
        />
      </div>

      <p className="text-sm font-semibold text-muted">{sekarang.pertanyaan}</p>

      {sekarang.teksBesar && (
        <div className="my-4 flex items-center justify-center">
          <span className="jp text-4xl sm:text-5xl font-bold tracking-wide">
            {sekarang.teksBesar}
          </span>
        </div>
      )}

      <div className="grid gap-2 mt-4">
        {sekarang.opsi.map((o, i) => {
          const benar = i === sekarang.jawaban;
          const dipilih = pilihan === i;
          let kelas = "border-border bg-white hover:border-primary/50";
          if (pilihan !== null) {
            if (benar) kelas = "border-success bg-success-light text-success";
            else if (dipilih) kelas = "border-danger bg-danger-light text-danger";
            else kelas = "border-border bg-white opacity-60";
          }
          return (
            <button
              key={o}
              type="button"
              onClick={() => jawab(i)}
              disabled={pilihan !== null}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all ${kelas}`}
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current text-xs shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="jp flex-1">{o}</span>
              {pilihan !== null && benar && <Ikon nama="Check" className="w-4 h-4" />}
              {pilihan !== null && dipilih && !benar && <Ikon nama="X" className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {pilihan !== null && (
        <div className="mt-4 rounded-xl bg-surface p-3.5 text-sm animate-fade-in">
          <p className="font-semibold flex items-center gap-1.5">
            <Ikon nama="Lightbulb" className="w-4 h-4 text-accent" />
            {pilihan === sekarang.jawaban ? "Tepat!" : "Belum tepat"}
          </p>
          <p className="mt-1 text-muted leading-relaxed">{sekarang.penjelasan}</p>
          <button type="button" onClick={lanjut} className="btn btn-navy px-4 py-2 mt-3 text-sm">
            {indeks + 1 >= soal.length ? "Lihat hasil" : "Soal berikutnya"}
            <Ikon nama="ArrowRight" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
