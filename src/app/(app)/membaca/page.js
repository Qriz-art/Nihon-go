"use client";

import { useEffect, useMemo, useState } from "react";
import Ikon from "@/components/Ikon";
import Pill, { PillLevel } from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import PageHeader from "@/components/PageHeader";
import AudioButton from "@/components/AudioButton";
import EmptyState from "@/components/EmptyState";
import { useProgress } from "@/lib/progress";
import { MEMBACA } from "@/data/membaca";

export default function MembacaPage() {
  const p = useProgress();
  const [level, setLevel] = useState(0);
  const [cari, setCari] = useState("");
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const ada = MEMBACA.find((m) => m.id === hash);
    if (ada) setDetail(ada);
  }, []);

  const hasil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return MEMBACA.filter((m) => {
      const cocokLevel = !level || m.level === level;
      const cocokCari =
        !q ||
        m.judul.toLowerCase().includes(q) ||
        m.topik.toLowerCase().includes(q) ||
        m.teks.some((t) => t.jp.includes(cari.trim()));
      return cocokLevel && cocokCari;
    });
  }, [level, cari]);

  const persen = MEMBACA.length ? (p.membacaSelesai.length / MEMBACA.length) * 100 : 0;

  return (
    <div>
      <PageHeader
        judul="Membaca"
        deskripsi="Teks pendek bertingkat dengan furigana, romaji, terjemahan, daftar kosakata penting, penjelasan grammar, dan pertanyaan pemahaman."
        ikon="BookMarked"
      />

      <div className="card p-4 sm:p-5 mb-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[14rem]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">Teks yang sudah dibaca</span>
              <span className="text-xs text-muted">
                {p.hydrated ? p.membacaSelesai.length : 0} / {MEMBACA.length}
              </span>
            </div>
            <ProgressBar nilai={p.hydrated ? persen : 0} warna="navy" />
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-5 mb-5 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Ikon
            nama="Search"
            className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari topik bacaan, mis. “cuaca”, “liburan”, “sekolah”..."
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
      </div>

      {hasil.length === 0 ? (
        <EmptyState
          ikon="BookMarked"
          judul="Bacaan tidak ditemukan"
          deskripsi="Coba ubah level atau kata kunci pencarian."
          aksi={
            <button
              type="button"
              onClick={() => {
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
          {hasil.map((m) => {
            const selesai = p.membacaSelesai.includes(m.id);
            return (
              <article
                key={m.id}
                className={`card p-5 card-hover flex flex-col ${
                  selesai ? "border-success/40" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <Pill warna="navy">{m.topik}</Pill>
                  <PillLevel level={m.level} />
                  {selesai && (
                    <Pill warna="hijau">
                      <Ikon nama="Check" className="w-3 h-3" />
                      Selesai
                    </Pill>
                  )}
                </div>

                <h2 className="mt-3 font-bold">{m.judul}</h2>
                <p className="mt-1 text-sm text-muted leading-relaxed">{m.deskripsi}</p>

                <div className="mt-4 rounded-xl bg-surface p-3.5">
                  <p className="jp text-sm leading-relaxed line-clamp-3">
                    {m.teks.map((t) => t.jp).join("")}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted mt-auto pt-4">
                  <span className="flex items-center gap-1.5">
                    <Ikon nama="Feather" className="w-3.5 h-3.5" />
                    {m.teks.length} kalimat
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ikon nama="BookOpen" className="w-3.5 h-3.5" />
                    {m.kosakata.length} kosakata
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ikon nama="ClipboardCheck" className="w-3.5 h-3.5" />
                    {m.pertanyaan.length} soal
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setDetail(m)}
                  className="btn btn-navy px-4 py-2.5 text-sm mt-4"
                >
                  <Ikon nama="BookOpen" className="w-4 h-4" />
                  Baca dan kerjakan
                </button>
              </article>
            );
          })}
        </div>
      )}

      {detail && (
        <DetailBacaan
          data={detail}
          onTutup={() => setDetail(null)}
          onSelesai={() => p.tandaiMembaca(detail.id)}
          selesai={p.membacaSelesai.includes(detail.id)}
        />
      )}
    </div>
  );
}

function DetailBacaan({ data, onTutup, onSelesai, selesai }) {
  const [tampilFurigana, setTampilFurigana] = useState(true);
  const [tampilRomaji, setTampilRomaji] = useState(false);
  const [tampilArti, setTampilArti] = useState(false);
  const [jawaban, setJawaban] = useState({});
  const [dinilai, setDinilai] = useState(false);

  const benar = data.pertanyaan.filter((q, i) => jawaban[i] === q.jawaban).length;
  const persen = Math.round((benar / data.pertanyaan.length) * 100);

  return (
    <div className="fixed inset-0 z-[55] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        aria-label="Tutup bacaan"
        onClick={onTutup}
        className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]"
      />
      <div className="relative w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto card rounded-b-none sm:rounded-3xl animate-slide-up">
        <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-navy/10 text-navy shrink-0">
              <Ikon nama="BookMarked" className="w-5 h-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold leading-tight">{data.judul}</h2>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <Pill warna="navy">{data.topik}</Pill>
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
            {[
              { v: tampilFurigana, set: setTampilFurigana, l: "Furigana" },
              { v: tampilRomaji, set: setTampilRomaji, l: "Romaji" },
              { v: tampilArti, set: setTampilArti, l: "Terjemahan" },
            ].map((t) => (
              <button
                key={t.l}
                type="button"
                onClick={() => t.set((x) => !x)}
                className={`btn px-3 py-1.5 text-xs ${t.v ? "btn-navy" : "btn-ghost"}`}
              >
                <Ikon nama={t.v ? "Eye" : "EyeOff"} className="w-3.5 h-3.5" />
                {t.l}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 space-y-6">
          <p className="text-sm text-muted leading-relaxed">{data.deskripsi}</p>

          {/* Teks */}
          <div className="space-y-3">
            {data.teks.map((t, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-4">
                <div className="flex items-start gap-3">
                  <p className="jp text-lg leading-relaxed flex-1">{t.jp}</p>
                  <AudioButton teks={t.jp} ukuran="kecil" />
                </div>
                {tampilFurigana && (
                  <p className="jp text-sm text-muted mt-2">{t.furigana}</p>
                )}
                {tampilRomaji && <p className="text-sm text-blue mt-1.5">{t.romaji}</p>}
                {tampilArti && (
                  <p className="text-sm text-muted mt-2 pt-2 border-t border-border">
                    {t.id}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Kosakata penting */}
          <div>
            <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
              <Ikon nama="BookOpen" className="w-4 h-4 text-primary" />
              Kosakata penting
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {data.kosakata.map((k) => (
                <div
                  key={k.jp}
                  className="flex items-center justify-between gap-2 rounded-xl bg-surface px-3.5 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="jp text-sm font-semibold">{k.jp}</p>
                    <p className="text-xs text-muted">{k.arti}</p>
                  </div>
                  <AudioButton teks={k.jp} ukuran="kecil" />
                </div>
              ))}
            </div>
          </div>

          {/* Grammar */}
          <div>
            <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
              <Ikon nama="Braces" className="w-4 h-4 text-blue" />
              Penjelasan grammar pada teks
            </h3>
            <ul className="space-y-2">
              {data.grammar.map((g) => (
                <li key={g.pola} className="rounded-xl border border-blue-light bg-blue-light/40 p-3.5">
                  <p className="jp font-semibold text-sm">{g.pola}</p>
                  <p className="text-sm text-muted mt-1">{g.penjelasan}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Pertanyaan */}
          <div className="rounded-2xl border border-border p-4">
            <h3 className="font-bold flex items-center gap-2">
              <Ikon nama="ClipboardCheck" className="w-4 h-4 text-primary" />
              Pertanyaan pemahaman
            </h3>

            <div className="mt-4 space-y-5">
              {data.pertanyaan.map((q, qi) => (
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
                disabled={Object.keys(jawaban).length < data.pertanyaan.length}
                onClick={() => setDinilai(true)}
                className="btn btn-primary px-4 py-2.5 text-sm mt-4"
              >
                <Ikon nama="Check" className="w-4 h-4" />
                Periksa jawaban
              </button>
            ) : (
              <div className="mt-4 rounded-xl bg-surface p-4">
                <p className="font-bold">
                  Skor latihan: {benar}/{data.pertanyaan.length} ({persen}%)
                </p>
                <p className="text-xs text-muted mt-1">
                  {persen >= 80
                    ? "Bagus! Pemahaman bacaanmu sudah kuat."
                    : "Coba baca ulang teksnya dengan furigana dimatikan, lalu ulangi pertanyaannya."}
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
                    Ulangi latihan
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
