"use client";

import { useCallback, useEffect, useState } from "react";
import Ikon from "./Ikon";
import AudioButton from "./AudioButton";

export default function LatihanPilihan({ buatSoal, judul = "Latihan", subjudul, kosongPesan }) {
  const [soal, setSoal] = useState(null);
  const [pilihan, setPilihan] = useState(null);
  const [benar, setBenar] = useState(0);
  const [dijawab, setDijawab] = useState(0);

  const muatSoal = useCallback(() => {
    const baru = buatSoal();
    setSoal(baru);
    setPilihan(null);
  }, [buatSoal]);

  useEffect(() => {
    muatSoal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (soal === null) {
    return (
      <div className="card p-6 text-center">
        <p className="text-sm text-muted">Menyiapkan latihan...</p>
      </div>
    );
  }

  if (soal.kosong) {
    return (
      <div className="card p-6 text-center">
        <p className="text-sm text-muted">
          {kosongPesan || "Belum ada karakter pada filter ini. Ubah filter untuk mulai berlatih."}
        </p>
      </div>
    );
  }

  const jawab = (i) => {
    if (pilihan !== null) return;
    setPilihan(i);
    setDijawab((d) => d + 1);
    if (i === soal.jawaban) setBenar((b) => b + 1);
  };

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <p className="font-bold text-sm">{judul}</p>
          {subjudul && <p className="text-xs text-muted mt-0.5">{subjudul}</p>}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="chip bg-success-light text-success border-success-light">
            Benar {benar}
          </span>
          <span className="chip bg-surface text-navy border-border">
            Dijawab {dijawab}
          </span>
        </div>
      </div>

      <p className="text-sm font-semibold text-muted">{soal.pertanyaan}</p>

      <div className="my-4 flex items-center justify-center gap-3">
        {soal.teksBesar && (
          <span className="jp text-4xl sm:text-5xl font-bold tracking-wide">
            {soal.teksBesar}
          </span>
        )}
        {soal.audio && <AudioButton teks={soal.audio} ukuran="besar" />}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {soal.opsi.map((o, i) => {
          const benarIni = i === soal.jawaban;
          const dipilih = pilihan === i;
          let kelas = "border-border bg-white hover:border-primary/50";
          if (pilihan !== null) {
            if (benarIni) kelas = "border-success bg-success-light text-success";
            else if (dipilih) kelas = "border-danger bg-danger-light text-danger";
            else kelas = "border-border bg-white opacity-60";
          }
          return (
            <button
              key={`${o}-${i}`}
              type="button"
              onClick={() => jawab(i)}
              disabled={pilihan !== null}
              className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all jp ${kelas}`}
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current text-[11px] shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{o}</span>
              {pilihan !== null && benarIni && <Ikon nama="Check" className="w-4 h-4" />}
              {pilihan !== null && dipilih && !benarIni && (
                <Ikon nama="X" className="w-4 h-4" />
              )}
            </button>
          );
        })}
      </div>

      {pilihan !== null && (
        <div className="mt-4 rounded-xl bg-surface p-4 animate-fade-in">
          <p className="font-semibold text-sm flex items-center gap-1.5">
            <Ikon
              nama={pilihan === soal.jawaban ? "CheckCircle2" : "Lightbulb"}
              className={`w-4 h-4 ${
                pilihan === soal.jawaban ? "text-success" : "text-accent"
              }`}
            />
            {pilihan === soal.jawaban ? "Tepat!" : "Belum tepat"}
          </p>
          <p className="mt-1.5 text-sm text-muted leading-relaxed">{soal.penjelasan}</p>
          <button type="button" onClick={muatSoal} className="btn btn-navy px-4 py-2 mt-3 text-sm">
            Soal berikutnya
            <Ikon nama="ArrowRight" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
