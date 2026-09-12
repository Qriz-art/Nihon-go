"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Ikon from "@/components/Ikon";
import Pill from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import PageHeader from "@/components/PageHeader";
import AudioButton from "@/components/AudioButton";
import LatihanPilihan from "@/components/LatihanPilihan";
import { useProgress } from "@/lib/progress";
import { HIRAGANA, KATAKANA, JENIS_HURUF, KELOMPOK_HURUF } from "@/data/huruf";

const TAB = [
  { key: "hiragana", label: "Hiragana", jp: "ひらがな", ikon: "Feather" },
  { key: "katakana", label: "Katakana", jp: "カタカナ", ikon: "Layers" },
];

export default function HurufPage() {
  const p = useProgress();
  const [tipe, setTipe] = useState("hiragana");
  const [jenis, setJenis] = useState("semua");
  const [grup, setGrup] = useState("smua");
  const [mode, setMode] = useState("jelajah");
  const [modeLatihan, setModeLatihan] = useState("romaji");
  const [disorot, setDisorot] = useState(null);

  const semuaTipe = tipe === "hiragana" ? HIRAGANA : KATAKANA;

  // Dukungan tautan dalam (mis. dari pencarian: /huruf#あ)
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const ada = [...HIRAGANA, ...KATAKANA].find((h) => h.char === hash);
    if (!ada) return;
    setTipe(ada.tipe);
    setJenis("semua");
    setGrup("smua");
    setDisorot(ada.char);
    const t = window.setTimeout(() => {
      document.getElementById(`huruf-${ada.char}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 180);
    const t2 = window.setTimeout(() => setDisorot(null), 2600);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  const daftar = useMemo(() => {
    let hasil = semuaTipe;
    if (jenis !== "semua") hasil = hasil.filter((h) => h.jenis === jenis);
    if (grup !== "smua") hasil = hasil.filter((h) => h.group === grup);
    return hasil;
  }, [semuaTipe, jenis, grup]);

  const grupTersedia = useMemo(
    () => KELOMPOK_HURUF.filter((g) => semuaTipe.some((h) => h.group === g)),
    [semuaTipe]
  );

  const dipelajari = p.hurufDipahami[tipe] || [];
  const persen = semuaTipe.length ? (dipelajari.length / semuaTipe.length) * 100 : 0;

  const buatSoal = useCallback(() => {
    const pool = daftar.length ? daftar : semuaTipe;
    if (!pool.length) return { kosong: true };
    const sumber = semuaTipe;
    const benar = pool[Math.floor(Math.random() * pool.length)];

    if (modeLatihan === "romaji") {
      const opsi = new Set([benar.romaji]);
      while (opsi.size < 4 && opsi.size < sumber.length) {
        opsi.add(sumber[Math.floor(Math.random() * sumber.length)].romaji);
      }
      const arr = [...opsi].sort(() => Math.random() - 0.5);
      return {
        pertanyaan: "Bagaimana cara membaca karakter ini?",
        teksBesar: benar.char,
        audio: benar.char,
        opsi: arr,
        jawaban: arr.indexOf(benar.romaji),
        penjelasan: `${benar.char} dibaca "${benar.romaji}". Contoh kata: ${benar.word} (${benar.wordMeaning}).`,
      };
    }

    const opsi = new Set([benar.char]);
    while (opsi.size < 4 && opsi.size < sumber.length) {
      opsi.add(sumber[Math.floor(Math.random() * sumber.length)].char);
    }
    const arr = [...opsi].sort(() => Math.random() - 0.5);
    return {
      pertanyaan: `Pilih karakter untuk "${benar.romaji}"`,
      teksBesar: null,
      audio: benar.char,
      opsi: arr,
      jawaban: arr.indexOf(benar.char),
      penjelasan: `${benar.romaji} ditulis ${benar.char}. Contoh kata: ${benar.word} (${benar.wordMeaning}).`,
    };
  }, [daftar, semuaTipe, modeLatihan]);

  const tandaiSemua = () => {
    const belum = daftar.filter((h) => !dipelajari.includes(h.char)).map((h) => h.char);
    p.tandaiHurufBanyak(tipe, belum);
  };

  return (
    <div>
      <PageHeader
        judul="Huruf Jepang"
        deskripsi="Pelajari hiragana dan katakana lengkap dengan romaji, contoh kata, dan tombol pengucapan. Tandai karakter yang sudah kamu kuasai."
        ikon="Languages"
      />

      {/* Tab utama */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {TAB.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => {
              setTipe(t.key);
              setGrup("smua");
              setJenis("semua");
            }}
            className={`btn px-4 py-2.5 text-sm ${
              tipe === t.key ? "btn-primary" : "btn-ghost"
            }`}
          >
            <Ikon nama={t.ikon} className="w-4 h-4" />
            <span className="jp">{t.jp}</span>
            <span>{t.label}</span>
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("jelajah")}
            className={`btn px-3.5 py-2.5 text-sm ${mode === "jelajah" ? "btn-navy" : "btn-ghost"}`}
          >
            <Ikon nama="LayoutGrid" className="w-4 h-4" />
            Jelajah
          </button>
          <button
            type="button"
            onClick={() => setMode("latihan")}
            className={`btn px-3.5 py-2.5 text-sm ${mode === "latihan" ? "btn-navy" : "btn-ghost"}`}
          >
            <Ikon nama="Target" className="w-4 h-4" />
            Latihan
          </button>
        </div>
      </div>

      {/* Progress huruf */}
      <div className="card p-4 sm:p-5 mb-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[14rem]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">
                Progress {tipe === "hiragana" ? "hiragana" : "katakana"}
              </span>
              <span className="text-xs text-muted">
                {p.hydrated ? dipelajari.length : 0} / {semuaTipe.length} karakter
              </span>
            </div>
            <ProgressBar nilai={p.hydrated ? persen : 0} warna="primary" />
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={tandaiSemua} className="btn btn-ghost px-3.5 py-2 text-xs">
              <Ikon nama="Check" className="w-3.5 h-3.5" />
              Tandai semua di filter ini
            </button>
          </div>
        </div>
      </div>

      {mode === "latihan" ? (
        <div className="space-y-4">
          <div className="card p-4">
            <p className="text-sm font-semibold mb-3">Pilih jenis latihan</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setModeLatihan("romaji")}
                className={`btn px-3.5 py-2 text-xs ${
                  modeLatihan === "romaji" ? "btn-primary" : "btn-ghost"
                }`}
              >
                Tebak romaji (lihat huruf)
              </button>
              <button
                type="button"
                onClick={() => setModeLatihan("karakter")}
                className={`btn px-3.5 py-2 text-xs ${
                  modeLatihan === "karakter" ? "btn-primary" : "btn-ghost"
                }`}
              >
                Tebak huruf (lihat romaji)
              </button>
            </div>
          </div>

          {/* Filter juga berlaku saat latihan */}
          <div className="card p-4">
            <p className="text-sm font-semibold mb-2">Batasi soal dari kelompok</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setGrup("smua")}
                className={`chip ${
                  grup === "smua" ? "bg-navy text-white border-navy" : "bg-surface text-navy border-border"
                }`}
              >
                Semua
              </button>
              {grupTersedia.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrup(g)}
                  className={`chip ${
                    grup === g ? "bg-navy text-white border-navy" : "bg-surface text-navy border-border"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <LatihanPilihan
            key={`${tipe}-${grup}-${jenis}-${modeLatihan}`}
            buatSoal={buatSoal}
            judul={`Latihan ${tipe === "hiragana" ? "hiragana" : "katakana"}`}
            subjudul={`${daftar.length} karakter dalam filter ini`}
          />
        </div>
      ) : (
        <>
          {/* Filter jenis */}
          <div className="flex flex-wrap gap-2 mb-3">
            {[{ key: "semua", label: "Semua" }, ...JENIS_HURUF].map((j) => (
              <button
                key={j.key}
                type="button"
                onClick={() => setJenis(j.key)}
                className={`btn px-3.5 py-2 text-xs ${
                  jenis === j.key ? "btn-navy" : "btn-ghost"
                }`}
              >
                {j.label}
              </button>
            ))}
          </div>

          {/* Filter kelompok */}
          <div className="flex flex-wrap gap-2 mb-5">
            <button
              type="button"
              onClick={() => setGrup("smua")}
              className={`chip ${
                grup === "smua" ? "bg-primary text-white border-primary" : "bg-white text-navy border-border"
              }`}
            >
              A–Z
            </button>
            {grupTersedia.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGrup(g)}
                className={`chip ${
                  grup === g ? "bg-primary text-white border-primary" : "bg-white text-navy border-border"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {daftar.length === 0 ? (
            <div className="card p-8 text-center text-sm text-muted">
              Tidak ada karakter untuk kombinasi filter ini.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {daftar.map((h) => {
                const sudah = dipelajari.includes(h.char);
                return (
                  <article
                    key={`${h.tipe}-${h.char}`}
                    id={`huruf-${h.char}`}
                    className={`card p-4 text-center card-hover scroll-mt-24 transition-all ${
                      sudah ? "border-success/40 bg-success-light/30" : ""
                    } ${disorot === h.char ? "ring-2 ring-primary border-primary" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <Pill warna="netral">{h.group}</Pill>
                      <AudioButton teks={h.char} ukuran="kecil" />
                    </div>

                    <p className="jp mt-3 text-4xl font-bold leading-none">{h.char}</p>
                    <p className="mt-2 text-sm font-bold text-primary">{h.romaji}</p>

                    <div className="mt-3 rounded-lg bg-surface px-2 py-1.5 text-left">
                      <p className="jp text-[13px] font-semibold leading-snug">{h.word}</p>
                      <p className="text-[11px] text-muted">{h.wordMeaning}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => p.tandaiHuruf(h.tipe, h.char)}
                      className={`btn w-full mt-3 px-3 py-1.5 text-[11px] ${
                        sudah ? "btn-ghost" : "btn-navy"
                      }`}
                    >
                      <Ikon nama={sudah ? "Check" : "Plus"} className="w-3 h-3" />
                      {sudah ? "Sudah dipelajari" : "Tandai dipelajari"}
                    </button>
                  </article>
                );
              })}
            </div>
          )}

          {/* Catatan baca */}
          <div className="card p-5 mt-6">
            <h2 className="font-bold flex items-center gap-2">
              <Ikon nama="Lightbulb" className="w-4 h-4 text-accent" />
              Catatan belajar huruf
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted leading-relaxed">
              <li>
                <span className="font-semibold text-navy">Partikel は dibaca “wa”</span>{" "}
                dan <span className="font-semibold text-navy">を dibaca “o”</span> ketika
                dipakai sebagai partikel.
              </li>
              <li>
                Dakuten（゛）mengubah bunyi menjadi bergetar: か (ka) → が (ga), さ (sa)
                → ざ (za).
              </li>
              <li>
                Handakuten（゜）hanya dipakai pada baris H: は (ha) → ぱ (pa).
              </li>
              <li>
                Kombinasi besar + huruf kecil seperti き + ゃ menghasilkan satu bunyi: きゃ
                (kya).
              </li>
              <li>
                Katakana dipakai untuk kata serapan: コーヒー (koohii) = kopi, テレビ
                (terebi) = televisi.
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
