"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Ikon from "@/components/Ikon";
import Pill, { PillLevel } from "@/components/Pill";
import ProgressBar from "@/components/ProgressBar";
import PageHeader from "@/components/PageHeader";
import AudioButton from "@/components/AudioButton";
import EmptyState from "@/components/EmptyState";
import LatihanPilihan from "@/components/LatihanPilihan";
import { useProgress } from "@/lib/progress";
import { KANJI } from "@/data/kanji";

const WARNA_KESULITAN = { Mudah: "hijau", Sedang: "emas", Sulit: "bahaya" };

export default function KanjiPage() {
  const p = useProgress();
  const [cari, setCari] = useState("");
  const [level, setLevel] = useState(0);
  const [kesulitan, setKesulitan] = useState("Semua");
  const [mode, setMode] = useState("daftar");
  const [modeLatihan, setModeLatihan] = useState("arti");
  const [detail, setDetail] = useState(null);

  // Tautan dalam dari pencarian: /kanji#kj12
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const ada = KANJI.find((k) => k.id === hash);
    if (ada) setDetail(ada);
  }, []);

  const hasil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return KANJI.filter((k) => {
      const cocokLevel = !level || k.level === level;
      const cocokKesulitan = kesulitan === "Semua" || k.kesulitan === kesulitan;
      const cocokCari =
        !q ||
        k.kanji.includes(cari.trim()) ||
        k.arti.toLowerCase().includes(q) ||
        k.onyomi.join(" ").toLowerCase().includes(q) ||
        k.kunyomi.join(" ").toLowerCase().includes(q);
      return cocokLevel && cocokKesulitan && cocokCari;
    });
  }, [cari, level, kesulitan]);

  const persen = KANJI.length ? (p.kanjiDikuasai.length / KANJI.length) * 100 : 0;

  const buatSoal = useCallback(() => {
    const pool = hasil.length ? hasil : KANJI;
    if (!pool.length) return { kosong: true };
    const benar = pool[Math.floor(Math.random() * pool.length)];

    if (modeLatihan === "arti") {
      const opsi = new Set([benar.arti]);
      while (opsi.size < 4 && opsi.size < KANJI.length) {
        opsi.add(KANJI[Math.floor(Math.random() * KANJI.length)].arti);
      }
      const arr = [...opsi].sort(() => Math.random() - 0.5);
      return {
        pertanyaan: "Apa arti kanji berikut?",
        teksBesar: benar.kanji,
        audio: benar.kosakata[0]?.jp ?? benar.kanji,
        opsi: arr,
        jawaban: arr.indexOf(benar.arti),
        penjelasan: `${benar.kanji} berarti "${benar.arti}". On: ${benar.onyomi.join("、") || "-"} • Kun: ${benar.kunyomi.join("、") || "-"}.`,
      };
    }

    if (modeLatihan === "bacaan") {
      const bacaanBenar = benar.onyomi[0] || benar.kunyomi[0] || benar.kanji;
      const kandidat = KANJI.flatMap((k) => [k.onyomi[0], k.kunyomi[0]]).filter(Boolean);
      const opsi = new Set([bacaanBenar]);
      while (opsi.size < 4 && opsi.size < kandidat.length) {
        opsi.add(kandidat[Math.floor(Math.random() * kandidat.length)]);
      }
      const arr = [...opsi].sort(() => Math.random() - 0.5);
      return {
        pertanyaan: "Pilih salah satu bacaan kanji berikut",
        teksBesar: benar.kanji,
        audio: benar.kosakata[0]?.jp ?? benar.kanji,
        opsi: arr,
        jawaban: arr.indexOf(bacaanBenar),
        penjelasan: `${benar.kanji} dibaca ${bacaanBenar} dan berarti "${benar.arti}". Contoh: ${benar.kosakata[0]?.jp} (${benar.kosakata[0]?.arti}).`,
      };
    }

    // Mode pilih kanji yang sesuai arti
    const opsi = new Set([benar.kanji]);
    while (opsi.size < 4 && opsi.size < KANJI.length) {
      opsi.add(KANJI[Math.floor(Math.random() * KANJI.length)].kanji);
    }
    const arr = [...opsi].sort(() => Math.random() - 0.5);
    return {
      pertanyaan: `Pilih kanji yang berarti "${benar.arti}"`,
      teksBesar: null,
      audio: benar.kosakata[0]?.jp ?? benar.kanji,
      opsi: arr,
      jawaban: arr.indexOf(benar.kanji),
      penjelasan: `Kanji untuk "${benar.arti}" adalah ${benar.kanji}. Contoh: ${benar.kosakata[0]?.jp} (${benar.kosakata[0]?.arti}).`,
    };
  }, [hasil, modeLatihan]);

  return (
    <div>
      <PageHeader
        judul="Kanji"
        deskripsi="Belajar kanji bertahap: onyomi, kunyomi, arti, contoh kosakata, dan contoh kalimat. Tandai kanji yang sudah kamu kuasai."
        ikon="BookType"
        aksi={
          <Link href="/kuis" className="btn btn-navy px-4 py-2.5 text-sm">
            <Ikon nama="Target" className="w-4 h-4" />
            Kuis kanji
          </Link>
        }
      />

      <div className="card p-4 sm:p-5 mb-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[14rem]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">Kanji yang sudah dikuasai</span>
              <span className="text-xs text-muted">
                {p.hydrated ? p.kanjiDikuasai.length : 0} / {KANJI.length}
              </span>
            </div>
            <ProgressBar nilai={p.hydrated ? persen : 0} warna="emas" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("daftar")}
              className={`btn px-3.5 py-2.5 text-sm ${mode === "daftar" ? "btn-navy" : "btn-ghost"}`}
            >
              <Ikon nama="LayoutGrid" className="w-4 h-4" />
              Daftar kanji
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
      </div>

      <div className="card p-4 sm:p-5 mb-5 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Ikon
              nama="Search"
              className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari kanji, arti, atau bacaan..."
              className="w-full rounded-xl border border-border bg-white pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary jp"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { v: 0, l: "Semua level" },
              { v: 1, l: "Level 1" },
              { v: 2, l: "Level 2" },
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
            {["Semua", "Mudah", "Sedang", "Sulit"].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKesulitan(k)}
                className={`btn px-3.5 py-2 text-xs ${
                  kesulitan === k ? "btn-navy" : "btn-ghost"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>

      {mode === "latihan" ? (
        <div className="space-y-4">
          <div className="card p-4">
            <p className="text-sm font-semibold mb-3">Jenis latihan kanji</p>
            <div className="flex flex-wrap gap-2">
              {[
                { v: "arti", l: "Tebak arti kanji" },
                { v: "bacaan", l: "Tebak bacaan (onyomi/kunyomi)" },
                { v: "pilih", l: "Pilih kanji sesuai arti" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setModeLatihan(o.v)}
                  className={`btn px-3.5 py-2 text-xs ${
                    modeLatihan === o.v ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          <LatihanPilihan
            key={modeLatihan}
            buatSoal={buatSoal}
            judul="Latihan kanji"
            subjudul={`${hasil.length} kanji dalam filter ini`}
          />
        </div>
      ) : hasil.length === 0 ? (
        <EmptyState
          ikon="Search"
          judul="Kanji tidak ditemukan"
          deskripsi="Coba ubah kata kunci, level, atau tingkat kesulitan."
          aksi={
            <button
              type="button"
              onClick={() => {
                setCari("");
                setLevel(0);
                setKesulitan("Semua");
              }}
              className="btn btn-primary px-4 py-2.5 text-sm"
            >
              Reset filter
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {hasil.map((k) => {
            const sudah = p.kanjiDikuasai.includes(k.id);
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => setDetail(k)}
                className={`card p-4 text-center card-hover transition-all ${
                  sudah ? "border-success/40 bg-success-light/30" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <Pill warna={WARNA_KESULITAN[k.kesulitan] || "netral"}>
                    {k.kesulitan}
                  </Pill>
                  {sudah && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-success text-white">
                      <Ikon nama="Check" className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="jp mt-3 text-4xl font-bold leading-none">{k.kanji}</p>
                <p className="mt-2 text-sm font-semibold text-primary">{k.arti}</p>
                <p className="jp mt-1 text-[11px] text-muted truncate">
                  {k.kunyomi[0] || k.onyomi[0] || "—"}
                </p>
                <p className="mt-2 text-[11px] text-muted">{k.stroke} goresan</p>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail kanji */}
      {detail && (
        <div className="fixed inset-0 z-[55] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <button
            type="button"
            aria-label="Tutup detail"
            onClick={() => setDetail(null)}
            className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]"
          />
          <div className="relative w-full sm:max-w-2xl max-h-[88vh] overflow-y-auto card rounded-b-none sm:rounded-3xl animate-slide-up">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center gap-3">
              <span className="jp flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white text-2xl font-bold shrink-0">
                {detail.kanji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold leading-tight">{detail.arti}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <PillLevel level={detail.level} />
                  <Pill warna={WARNA_KESULITAN[detail.kesulitan] || "netral"}>
                    {detail.kesulitan}
                  </Pill>
                  <Pill warna="netral">{detail.stroke} goresan</Pill>
                </div>
              </div>
              <AudioButton teks={detail.kosakata[0]?.jp ?? detail.kanji} />
              <button
                type="button"
                onClick={() => setDetail(null)}
                aria-label="Tutup"
                className="p-1 text-muted hover:text-navy"
              >
                <Ikon nama="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-light bg-blue-light/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue">
                    Onyomi (音読み)
                  </p>
                  <p className="jp mt-1.5 text-lg font-semibold">
                    {detail.onyomi.join("、") || "—"}
                  </p>
                </div>
                <div className="rounded-xl border border-accent/30 bg-accent-light/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">
                    Kunyomi (訓読み)
                  </p>
                  <p className="jp mt-1.5 text-lg font-semibold">
                    {detail.kunyomi.join("、") || "—"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-2">Contoh kosakata</h3>
                <ul className="space-y-2">
                  {detail.kosakata.map((k) => (
                    <li
                      key={k.jp}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-3.5 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="jp text-sm font-semibold">{k.jp}</p>
                        <p className="jp text-[11px] text-muted">{k.furigana}</p>
                        <p className="text-xs text-muted mt-0.5">{k.arti}</p>
                      </div>
                      <AudioButton teks={k.jp} ukuran="kecil" />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-2">Contoh kalimat</h3>
                <div className="rounded-xl bg-surface p-4">
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="jp text-base font-semibold">{detail.contoh.jp}</p>
                      <p className="jp text-xs text-muted mt-1">{detail.contoh.furigana}</p>
                      <p className="text-sm text-muted mt-1.5">{detail.contoh.id}</p>
                    </div>
                    <AudioButton teks={detail.contoh.jp} ukuran="kecil" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => p.tandaiKanji(detail.id)}
                  className={`btn px-4 py-2.5 text-sm ${
                    p.kanjiDikuasai.includes(detail.id) ? "btn-ghost" : "btn-primary"
                  }`}
                >
                  <Ikon
                    nama={p.kanjiDikuasai.includes(detail.id) ? "Check" : "Plus"}
                    className="w-4 h-4"
                  />
                  {p.kanjiDikuasai.includes(detail.id)
                    ? "Sudah dikuasai"
                    : "Tandai sudah dikuasai"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDetail(null);
                    setMode("latihan");
                  }}
                  className="btn btn-navy px-4 py-2.5 text-sm"
                >
                  <Ikon nama="Target" className="w-4 h-4" />
                  Latihan dengan kanji ini
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
