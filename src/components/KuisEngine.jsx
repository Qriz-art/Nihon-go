"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Ikon from "./Ikon";
import AudioButton from "./AudioButton";
import ProgressBar from "./ProgressBar";

export default function KuisEngine({
  soal = [],
  namaKuis = "Kuis",
  onSelesai,
  onUlangi,
  onKuisLain,
  batasDetik = 0,
  kembaliHref = "/belajar",
  kembaliLabel = "Kembali belajar materi",
}) {
  const [indeks, setIndeks] = useState(0);
  const [pilihan, setPilihan] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [selesai, setSelesai] = useState(false);
  const [sisa, setSisa] = useState(batasDetik);
  const [waktuHabis, setWaktuHabis] = useState(false);
  const sudahLapor = useRef(false);

  const total = soal.length;
  const sekarang = soal[indeks];
  const benar = riwayat.filter((r) => r.benar).length;

  // Timer opsional
  useEffect(() => {
    if (!batasDetik || selesai) return;
    if (sisa <= 0) {
      setWaktuHabis(true);
      setSelesai(true);
      return;
    }
    const t = window.setTimeout(() => setSisa((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [batasDetik, sisa, selesai]);

  useEffect(() => {
    if (!selesai || sudahLapor.current || !onSelesai) return;
    sudahLapor.current = true;
    onSelesai({
      nama: namaKuis,
      benar,
      total,
      persen: total ? Math.round((benar / total) * 100) : 0,
    });
  }, [selesai, benar, total, namaKuis, onSelesai]);

  if (!total) {
    return (
      <div className="card p-8 text-center">
        <p className="text-sm text-muted">
          Belum ada soal yang bisa dibuat dari pilihan ini. Coba pilih level atau kategori
          lain.
        </p>
      </div>
    );
  }

  if (selesai) {
    const persen = Math.round((benar / total) * 100);
    const pesan =
      persen >= 90
        ? "Luar biasa! Kamu sudah sangat menguasai materi ini."
        : persen >= 70
          ? "Bagus! Sedikit lagi menuju sempurna."
          : persen >= 50
            ? "Cukup baik. Ulangi materi yang masih salah, lalu coba lagi."
            : "Jangan menyerah. Baca ulang materinya, lalu ulangi kuis ini.";

    return (
      <div className="space-y-4 animate-fade-in">
        <div className="card p-6 sm:p-8 text-center">
          {waktuHabis && (
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-danger-light px-3 py-1 text-xs font-semibold text-danger">
              <Ikon nama="Timer" className="w-3.5 h-3.5" />
              Waktu habis — kuis dihentikan otomatis
            </p>
          )}
          <span
            className={`mx-auto flex items-center justify-center w-16 h-16 rounded-2xl ${
              persen >= 70
                ? "bg-success-light text-success"
                : persen >= 50
                  ? "bg-accent-light text-accent"
                  : "bg-danger-light text-danger"
            }`}
          >
            <Ikon nama={persen >= 70 ? "PartyPopper" : "Target"} className="w-8 h-8" />
          </span>

          <h2 className="mt-4 text-2xl font-bold">{persen}%</h2>
          <p className="text-sm text-muted mt-1">
            {namaKuis} • {benar} benar dari {total} soal
          </p>
          <p className="text-sm mt-3 max-w-md mx-auto leading-relaxed">{pesan}</p>

          <div className="mt-5 max-w-xs mx-auto">
            <ProgressBar
              nilai={persen}
              warna={persen >= 70 ? "hijau" : persen >= 50 ? "emas" : "primary"}
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {onUlangi && (
              <button type="button" onClick={onUlangi} className="btn btn-primary px-4 py-2.5 text-sm">
                <Ikon nama="RotateCcw" className="w-4 h-4" />
                Ulangi kuis
              </button>
            )}
            {onKuisLain && (
              <button type="button" onClick={onKuisLain} className="btn btn-navy px-4 py-2.5 text-sm">
                <Ikon nama="Target" className="w-4 h-4" />
                Pilih kuis lain
              </button>
            )}
            <Link href={kembaliHref} className="btn btn-ghost px-4 py-2.5 text-sm">
              <Ikon nama="ArrowLeft" className="w-4 h-4" />
              {kembaliLabel}
            </Link>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-bold mb-3">Rincian jawaban</h3>
          <ul className="space-y-3">
            {riwayat.map((r, i) => (
              <li
                key={`${r.soal.id}-${i}`}
                className={`rounded-xl border p-3.5 ${
                  r.benar ? "border-success/30 bg-success-light/40" : "border-danger/30 bg-danger-light/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${
                      r.benar ? "bg-success text-white" : "bg-danger text-white"
                    }`}
                  >
                    <Ikon nama={r.benar ? "Check" : "X"} className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold flex flex-wrap items-center gap-2">
                      <span className="jp">{r.soal.teksBesar || r.soal.pertanyaan}</span>
                      <span className="chip bg-white text-muted border-border">
                        {r.soal.tipe}
                      </span>
                    </p>
                    {r.soal.teksBesar && (
                      <p className="text-xs text-muted mt-1">{r.soal.pertanyaan}</p>
                    )}
                    <p className="text-xs mt-1.5">
                      <span className="text-muted">Jawabanmu: </span>
                      <span className={r.benar ? "text-success font-semibold" : "text-danger font-semibold"}>
                        {r.soal.opsi[r.dipilih]}
                      </span>
                    </p>
                    {!r.benar && (
                      <p className="text-xs mt-1">
                        <span className="text-muted">Jawaban benar: </span>
                        <span className="text-success font-semibold">
                          {r.soal.opsi[r.soal.jawaban]}
                        </span>
                      </p>
                    )}
                    <p className="text-xs text-muted mt-1.5 leading-relaxed">
                      {r.soal.penjelasan}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const jawab = (i) => {
    if (pilihan !== null) return;
    setPilihan(i);
    setRiwayat((r) => [...r, { soal: sekarang, dipilih: i, benar: i === sekarang.jawaban }]);
  };

  const lanjut = () => {
    if (indeks + 1 >= total) {
      setSelesai(true);
      return;
    }
    setIndeks((i) => i + 1);
    setPilihan(null);
  };

  const sudahDijawab = pilihan !== null;
  const benarIni = sudahDijawab && pilihan === sekarang.jawaban;

  return (
    <div className="space-y-4">
      <div className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="chip bg-surface text-navy border-border">{namaKuis}</span>
            <span className="chip bg-surface text-muted border-border">{sekarang.tipe}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {batasDetik > 0 && (
              <span
                className={`chip border ${
                  sisa <= 30
                    ? "bg-danger-light text-danger border-danger-light"
                    : "bg-surface text-navy border-border"
                }`}
              >
                <Ikon nama="Timer" className="w-3.5 h-3.5" />
                {String(Math.floor(Math.max(sisa, 0) / 60)).padStart(2, "0")}:
                {String(Math.max(sisa, 0) % 60).padStart(2, "0")}
              </span>
            )}
            <span className="chip bg-success-light text-success border-success-light">
              Benar {benar}
            </span>
            <span className="font-semibold text-muted">
              Soal {indeks + 1} / {total}
            </span>
          </div>
        </div>
        <ProgressBar nilai={(indeks / total) * 100} warna="primary" tinggi="h-1.5" />
      </div>

      <div className="card p-5 sm:p-7">
        <p className="text-sm font-semibold text-muted">{sekarang.pertanyaan}</p>

        {sekarang.konteks && (
          <p className="text-xs text-muted mt-1">Dari bacaan: {sekarang.konteks}</p>
        )}

        {sekarang.teksBesar && (
          <div className="my-5 flex items-center justify-center gap-3">
            <span className="jp text-3xl sm:text-5xl font-bold tracking-wide text-center">
              {sekarang.teksBesar}
            </span>
            {sekarang.audio && <AudioButton teks={sekarang.audio} />}
          </div>
        )}

        <div className="grid gap-2.5 sm:grid-cols-2 mt-5">
          {sekarang.opsi.map((o, i) => {
            const benarOpsi = i === sekarang.jawaban;
            const dipilih = pilihan === i;
            let kelas = "border-border bg-white hover:border-primary/60";
            if (sudahDijawab) {
              if (benarOpsi) kelas = "border-success bg-success-light text-success";
              else if (dipilih) kelas = "border-danger bg-danger-light text-danger";
              else kelas = "border-border bg-white opacity-55";
            }
            return (
              <button
                key={`${o}-${i}`}
                type="button"
                onClick={() => jawab(i)}
                disabled={sudahDijawab}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all ${kelas}`}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current text-[11px] shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="jp flex-1">{o}</span>
                {sudahDijawab && benarOpsi && <Ikon nama="CheckCircle2" className="w-4.5 h-4.5" />}
                {sudahDijawab && dipilih && !benarOpsi && <Ikon nama="XCircle" className="w-4.5 h-4.5" />}
              </button>
            );
          })}
        </div>

        {sudahDijawab && (
          <div
            className={`mt-5 rounded-xl p-4 animate-fade-in ${
              benarIni ? "bg-success-light/60" : "bg-danger-light/40"
            }`}
          >
            <p
              className={`font-bold flex items-center gap-2 ${
                benarIni ? "text-success" : "text-danger"
              }`}
            >
              <Ikon nama={benarIni ? "CheckCircle2" : "XCircle"} className="w-4.5 h-4.5" />
              {benarIni ? "Jawaban benar!" : "Jawaban belum tepat"}
            </p>
            <p className="mt-1.5 text-sm text-muted leading-relaxed">
              {sekarang.penjelasan}
            </p>
            <button type="button" onClick={lanjut} className="btn btn-navy px-4 py-2.5 mt-3 text-sm">
              {indeks + 1 >= total ? "Lihat hasil akhir" : "Soal berikutnya"}
              <Ikon nama="ArrowRight" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
