"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Ikon from "@/components/Ikon";
import Pill, { PillLevel } from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import PageHeader from "@/components/PageHeader";
import AudioButton from "@/components/AudioButton";
import EmptyState from "@/components/EmptyState";
import { useProgress } from "@/lib/progress";
import { KAIWA, KATEGORI_KAIWA } from "@/data/kaiwa";

export default function KaiwaPage() {
  const p = useProgress();
  const [kategori, setKategori] = useState("Semua");
  const [level, setLevel] = useState(0);
  const [cari, setCari] = useState("");
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const ada = KAIWA.find((k) => k.id === hash);
    if (ada) setDetail(ada);
  }, []);

  const hasil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return KAIWA.filter((k) => {
      const cocokKategori = kategori === "Semua" || k.kategori === kategori;
      const cocokLevel = !level || k.level === level;
      const cocokCari =
        !q ||
        k.judul.toLowerCase().includes(q) ||
        k.deskripsi.toLowerCase().includes(q) ||
        k.dialog.some((d) => d.jp.includes(cari.trim()) || d.id.toLowerCase().includes(q));
      return cocokKategori && cocokLevel && cocokCari;
    });
  }, [kategori, level, cari]);

  const persen = KAIWA.length ? (p.kaiwaSelesai.length / KAIWA.length) * 100 : 0;

  return (
    <div>
      <PageHeader
        judul="Kaiwa"
        deskripsi="Latihan percakapan sehari-hari dalam bentuk dialog dua tokoh, lengkap dengan romaji, terjemahan, audio per kalimat, dan kuis pemahaman."
        ikon="MessagesSquare"
      />

      <div className="card p-4 sm:p-5 mb-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[14rem]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">Percakapan yang diselesaikan</span>
              <span className="text-xs text-muted">
                {p.hydrated ? p.kaiwaSelesai.length : 0} / {KAIWA.length}
              </span>
            </div>
            <ProgressBar nilai={p.hydrated ? persen : 0} warna="hijau" />
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-5 mb-5 space-y-3">
        <div className="relative">
          <Ikon
            nama="Search"
            className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari situasi, mis. “restoran”, “stasiun”, “cuaca”..."
            className="w-full rounded-xl border border-border bg-white pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { v: 0, l: "Semua level" },
            { v: 1, l: "Pemula" },
            { v: 2, l: "Dasar" },
            { v: 3, l: "Menengah" },
          ].map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setLevel(o.v)}
              className={`btn px-3.5 py-2 text-xs ${level === o.v ? "btn-primary" : "btn-ghost"}`}
            >
              {o.l}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setKategori("Semua")}
            className={`chip ${
              kategori === "Semua"
                ? "bg-navy text-white border-navy"
                : "bg-white text-navy border-border"
            }`}
          >
            Semua situasi
          </button>
          {KATEGORI_KAIWA.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKategori(k)}
              className={`chip ${
                kategori === k
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-border"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {hasil.length === 0 ? (
        <EmptyState
          ikon="MessagesSquare"
          judul="Percakapan tidak ditemukan"
          deskripsi="Coba ubah kategori, level, atau kata kunci pencarian."
          aksi={
            <button
              type="button"
              onClick={() => {
                setKategori("Semua");
                setLevel(0);
                setCari("");
              }}
              className="btn btn-primary px-4 py-2.5 text-sm"
            >
              Reset filter
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {hasil.map((k) => {
            const selesai = p.kaiwaSelesai.includes(k.id);
            return (
              <article
                key={k.id}
                className={`card p-5 card-hover flex flex-col ${
                  selesai ? "border-success/40" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Pill warna="hijau">{k.kategori}</Pill>
                    <PillLevel level={k.level} />
                    {selesai && (
                      <Pill warna="hijau">
                        <Ikon nama="Check" className="w-3 h-3" />
                        Selesai
                      </Pill>
                    )}
                  </div>
                </div>

                <h2 className="mt-3 font-bold">{k.judul}</h2>
                <p className="mt-1 text-sm text-muted leading-relaxed">{k.deskripsi}</p>

                <div className="mt-4 space-y-1.5">
                  {k.dialog.slice(0, 2).map((d, i) => (
                    <div
                      key={i}
                      className={`rounded-xl border border-border bg-surface p-2.5 ${
                        i === 1 ? "ml-8" : "mr-8"
                      }`}
                    >
                      <p className="text-[11px] font-bold text-muted">{d.speaker}</p>
                      <p className="jp text-sm leading-snug">{d.jp}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted mt-auto pt-4">
                  <span className="flex items-center gap-1.5">
                    <Ikon nama="Users" className="w-3.5 h-3.5" />
                    {k.pemain.length} tokoh
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ikon nama="MessageCircle" className="w-3.5 h-3.5" />
                    {k.dialog.length} kalimat
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ikon nama="ClipboardCheck" className="w-3.5 h-3.5" />
                    {k.kuis.length} soal
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setDetail(k)}
                  className="btn btn-navy px-4 py-2.5 text-sm mt-4"
                >
                  <Ikon nama="Play" className="w-4 h-4" />
                  Buka percakapan
                </button>
              </article>
            );
          })}
        </div>
      )}

      {detail && (
        <DialogKaiwa
          data={detail}
          onTutup={() => setDetail(null)}
          onSelesai={() => p.tandaiKaiwa(detail.id)}
          selesai={p.kaiwaSelesai.includes(detail.id)}
        />
      )}

      <div className="card p-5 mt-6">
        <h2 className="font-bold flex items-center gap-2">
          <Ikon nama="Lightbulb" className="w-4 h-4 text-accent" />
          Tips latihan percakapan
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-muted leading-relaxed">
          <li>Dengarkan satu kalimat, lalu ulangi dengan keras sebelum lanjut ke kalimat berikutnya.</li>
          <li>Sembunyikan romaji setelah kamu mulai nyaman membaca hiragana dan katakana.</li>
          <li>
            Ganti nama tokoh dengan namamu sendiri agar dialog terasa lebih nyata saat
            dilatih bersama teman.
          </li>
        </ul>
        <Link href="/kuis" className="btn btn-ghost px-4 py-2.5 text-sm mt-4">
          <Ikon nama="Target" className="w-4 h-4" />
          Uji dengan kuis campuran
        </Link>
      </div>
    </div>
  );
}

function DialogKaiwa({ data, onTutup, onSelesai, selesai }) {
  const [tampilRomaji, setTampilRomaji] = useState(true);
  const [tampilArti, setTampilArti] = useState(true);
  const [jawaban, setJawaban] = useState({});
  const [dinilai, setDinilai] = useState(false);

  const benar = data.kuis.filter((q, i) => jawaban[i] === q.jawaban).length;

  return (
    <div className="fixed inset-0 z-[55] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        aria-label="Tutup dialog"
        onClick={onTutup}
        className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]"
      />
      <div className="relative w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto card rounded-b-none sm:rounded-3xl animate-slide-up">
        <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-success-light text-success shrink-0">
              <Ikon nama="MessagesSquare" className="w-5 h-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold leading-tight">{data.judul}</h2>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <Pill warna="hijau">{data.kategori}</Pill>
                <PillLevel level={data.level} />
              </div>
            </div>
            <button
              type="button"
              onClick={onTutup}
              aria-label="Tutup"
              className="p-1 text-muted hover:text-navy"
            >
              <Ikon nama="X" className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              onClick={() => setTampilRomaji((v) => !v)}
              className={`btn px-3 py-1.5 text-xs ${tampilRomaji ? "btn-navy" : "btn-ghost"}`}
            >
              <Ikon nama={tampilRomaji ? "Eye" : "EyeOff"} className="w-3.5 h-3.5" />
              Romaji
            </button>
            <button
              type="button"
              onClick={() => setTampilArti((v) => !v)}
              className={`btn px-3 py-1.5 text-xs ${tampilArti ? "btn-navy" : "btn-ghost"}`}
            >
              <Ikon nama={tampilArti ? "Eye" : "EyeOff"} className="w-3.5 h-3.5" />
              Terjemahan
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6">
          <p className="text-sm text-muted leading-relaxed">{data.deskripsi}</p>

          {/* Dialog */}
          <div className="space-y-3">
            {data.dialog.map((d, i) => {
              const kiri = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`flex ${kiri ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[78%] rounded-2xl border p-3.5 ${
                      kiri
                        ? "bg-surface border-border rounded-tl-md"
                        : "bg-blue-light/60 border-blue-light rounded-tr-md"
                    }`}
                  >
                    <p className="text-[11px] font-bold text-muted mb-1">{d.speaker}</p>
                    <p className="jp text-base leading-relaxed">{d.jp}</p>
                    {tampilRomaji && (
                      <p className="text-xs text-blue mt-1.5">{d.romaji}</p>
                    )}
                    {tampilArti && (
                      <p className="text-sm text-muted mt-1.5">{d.id}</p>
                    )}
                    <div className="mt-2 flex justify-end">
                      <AudioButton teks={d.jp} ukuran="kecil" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Kuis pemahaman */}
          <div className="rounded-2xl border border-border p-4">
            <h3 className="font-bold flex items-center gap-2">
              <Ikon nama="ClipboardCheck" className="w-4 h-4 text-primary" />
              Kuis pemahaman dialog
            </h3>

            <div className="mt-4 space-y-5">
              {data.kuis.map((q, qi) => (
                <div key={qi}>
                  <p className="text-sm font-semibold">
                    {qi + 1}. {q.q}
                  </p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {q.opsi.map((o, oi) => {
                      const dipilih = jawaban[qi] === oi;
                      const benarIni = oi === q.jawaban;
                      let kelas = "border-border bg-white hover:border-primary/50";
                      if (dinilai) {
                        if (benarIni) kelas = "border-success bg-success-light text-success";
                        else if (dipilih) kelas = "border-danger bg-danger-light text-danger";
                        else kelas = "border-border bg-white opacity-60";
                      } else if (dipilih) {
                        kelas = "border-navy bg-navy/8 text-navy";
                      }
                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={dinilai}
                          onClick={() => setJawaban((s) => ({ ...s, [qi]: oi }))}
                          className={`rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all ${kelas}`}
                        >
                          {o}
                        </button>
                      );
                    })}
                  </div>
                  {dinilai && (
                    <p className="mt-2 text-xs text-muted leading-relaxed">
                      <span className="font-semibold text-navy">Pembahasan: </span>
                      {q.penjelasan}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {!dinilai ? (
              <button
                type="button"
                disabled={Object.keys(jawaban).length < data.kuis.length}
                onClick={() => setDinilai(true)}
                className="btn btn-primary px-4 py-2.5 text-sm mt-4"
              >
                <Ikon nama="Check" className="w-4 h-4" />
                Periksa jawaban
              </button>
            ) : (
              <div className="mt-4 rounded-xl bg-surface p-4">
                <p className="font-bold">
                  Skor kamu {benar}/{data.kuis.length} (
                  {Math.round((benar / data.kuis.length) * 100)}%)
                </p>
                <p className="text-xs text-muted mt-1">
                  {benar === data.kuis.length
                    ? "Sempurna! Kamu memahami dialog ini dengan baik."
                    : "Baca ulang dialognya, lalu tekan “Ulangi kuis” untuk mencoba lagi."}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setJawaban({});
                      setDinilai(false);
                    }}
                    className="btn btn-ghost px-3.5 py-2 text-sm"
                  >
                    <Ikon nama="RotateCcw" className="w-4 h-4" />
                    Ulangi kuis
                  </button>
                  <button
                    type="button"
                    onClick={onSelesai}
                    className={`btn px-3.5 py-2 text-sm ${selesai ? "btn-ghost" : "btn-primary"}`}
                  >
                    <Ikon nama={selesai ? "Check" : "Plus"} className="w-4 h-4" />
                    {selesai ? "Sudah diselesaikan" : "Tandai selesai"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
