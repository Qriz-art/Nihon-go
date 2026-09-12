"use client";

import { useEffect, useState } from "react";
import Ikon from "./Ikon";
import { ucapkan, speechTersedia, siapkanSuara } from "@/lib/audio";

export default function AudioButton({
  teks,
  label = "Dengarkan pengucapan",
  ukuran = "normal",
  className = "",
  judul,
}) {
  const [didukung, setDidukung] = useState(true);
  const [berbunyi, setBerbunyi] = useState(false);

  useEffect(() => {
    setDidukung(speechTersedia());
    return siapkanSuara();
  }, []);

  const klik = () => {
    const berhasil = ucapkan(teks);
    if (!berhasil) {
      setDidukung(false);
      return;
    }
    setBerbunyi(true);
    window.setTimeout(() => setBerbunyi(false), 900);
  };

  const kelas =
    ukuran === "kecil"
      ? "w-8 h-8"
      : ukuran === "besar"
        ? "w-12 h-12"
        : "w-9 h-9";

  if (!didukung) {
    return (
      <span
        title="Browser ini belum mendukung pembacaan suara (Web Speech API)"
        className={`inline-flex items-center justify-center rounded-full bg-surface text-muted/70 cursor-not-allowed ${kelas} ${className}`}
      >
        <Ikon nama="Volume2" className="w-4 h-4" />
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={klik}
      aria-label={label}
      title={judul || label}
      className={`inline-flex items-center justify-center rounded-full border transition-all ${
        berbunyi
          ? "bg-primary text-white border-primary scale-105"
          : "bg-white text-navy border-border hover:border-primary hover:text-primary"
      } ${kelas} ${className}`}
    >
      <Ikon
        nama={berbunyi ? "Volume2" : "Play"}
        className={ukuran === "kecil" ? "w-3.5 h-3.5" : "w-4 h-4"}
      />
    </button>
  );
}
