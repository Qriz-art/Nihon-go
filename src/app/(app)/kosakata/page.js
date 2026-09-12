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
import { KOSAKATA, KATEGORI_KOSAKATA } from "@/data/kosakata";

const IKON_KATEGORI = {
  Salam: "Waves",
  Perkenalan: "IdCard",
  Angka: "ListOrdered",
  Waktu: "Clock",
  "Hari dan Bulan": "CalendarDays",
  Keluarga: "Users",
  Sekolah: "GraduationCap",
  Rumah: "Feather",
  Makanan: "UtensilsCrossed",
  Minuman: "Coffee",
  Belanja: "ShoppingBasket",
  Transportasi: "Train",
  Tempat: "MapPin",
  Cuaca: "CloudSun",
  Perasaan: "HeartPulse",
  "Aktivitas Sehari-hari": "Repeat",
  "Kata Kerja": "Ruler",
  "Kata Sifat": "Sparkles",
  Pekerjaan: "IdCard",
  Hobi: "Puzzle",
  Tubuh: "HeartPulse",
  Alam: "Sprout",
  "Kosakata Menengah": "Layers",
};

export default function KosakataPage() {
  const p = useProgress();
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [level, setLevel] = useState(0);
  const [hanyaFavorit, setHanyaFavorit] = useState(false);
  const [mode, setMode] = useState("daftar");
  const [urut, setUrut] = useState("default");

  // Tangkap kata kunci dari pencarian global
  useEffect(() => {
    try {
      const q = window.sessionStorage.getItem("nihongo:cari");
      if (q) {
        setCari(q);
        window.sessionStorage.removeItem("nihongo:cari");
      }
    } catch {
      // abaikan
    }
  }, []);

  const hasil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    let arr = KOSAKATA.filter((k) => {
      const cocokKategori = kategori === "Semua" || k.kategori === kategori;
      const cocokLevel = !level || k.level === level;
      const cocokFavorit = !hanyaFavorit || p.favorit.includes(k.id);
      const cocokCari =
        !q ||
        k.jepang.includes(cari.trim()) ||
        k.romaji.toLowerCase().includes(q) ||
        k.arti.toLowerCase().includes(q) ||
        k.furigana.includes(cari.trim());
      return cocokKategori && cocokLevel && cocokFavorit && cocokCari;
    });

    if (urut === "az") arr = [...arr].sort((a, b) => a.arti.localeCompare(b.arti));
    if (urut === "level") arr = [...arr].sort((a, b) => a.level - b.level);
    return arr;
  }, [cari, kategori, level, hanyaFavorit, urut, p.favorit]);

  const dipelajari = p.kosakataDipahami;
  const persen = KOSAKATA.length ? (dipelajari.length / KOSAKATA.length) * 100 : 0;

  return (
    <div>
      <PageHeader
        judul="Kosakata"
        deskripsi={`${KOSAKATA.length} entri kosakata dalam ${KATEGORI_KOSAKATA.length} kategori, lengkap dengan furigana, romaji, arti, contoh kalimat, dan terjemahan.`}
        ikon="BookOpen"
        aksi={
          <Link href="/kuis" className="btn btn-navy px-4 py-2.5 text-sm">
            <Ikon nama="Target" className="w-4 h-4" />
            Kuis kosakata
          </Link>
        }
      />

      {/* Progress */}
      <div className="card p-4 sm:p-5 mb-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[14rem]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">Kosakata yang sudah dipelajari</span>
              <span className="text-xs text-muted">
                {p.hydrated ? dipelajari.length : 0} / {KOSAKATA.length}
              </span>
            </div>
            <ProgressBar nilai={p.hydrated ? persen : 0} warna="biru" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-primary-light text-primary-dark border-primary-light">
              <Ikon nama="Heart" className="w-3.5 h-3.5" />
              {p.hydrated ? p.favorit.length : 0} favorit
            </span>
            <button
              type="button"
              onClick={() => setHanyaFavorit((v) => !v)}
              className={`btn px-3.5 py-2 text-xs ${hanyaFavorit ? "btn-primary" : "btn-ghost"}`}
            >
              <Ikon nama="Heart" className="w-3.5 h-3.5" />
              {hanyaFavorit ? "Menampilkan favorit" : "Hanya favorit"}
            </button>
          </div>
        </div>
      </div>

      {/* Kontrol */}
      <div className="card p-4 sm:p-5 mb-5 space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Ikon
              nama="Search"
              className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari kata Jepang, romaji, atau arti Indonesia..."
              className="w-full rounded-xl border border-border bg-white pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value={0}>Semua level</option>
              <option value={1}>Level 1 — Pemula</option>
              <option value={2}>Level 2 — Dasar</option>
              <option value={3}>Level 3 — Menengah</option>
            </select>

            <select
              value={urut}
              onChange={(e) => setUrut(e.target.value)}
              className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="default">Urutan asli</option>
              <option value="az">A–Z arti</option>
              <option value="level">Menurut level</option>
            </select>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("daftar")}
                className={`btn px-3.5 py-2.5 text-sm ${mode === "daftar" ? "btn-navy" : "btn-ghost"}`}
              >
                <Ikon nama="LayoutGrid" className="w-4 h-4" />
                Daftar
              </button>
              <button
                type="button"
                onClick={() => setMode("flashcard")}
                className={`btn px-3.5 py-2.5 text-sm ${mode === "flashcard" ? "btn-navy" : "btn-ghost"}`}
              >
                <Ikon nama="Layers" className="w-4 h-4" />
                Flashcard
              </button>
            </div>
          </div>
        </div>

        {/* Filter kategori */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
            Kategori
          </p>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => setKategori("Semua")}
              className={`chip ${
                kategori === "Semua"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-navy border-border"
              }`}
            >
              Semua ({KOSAKATA.length})
            </button>
            {KATEGORI_KOSAKATA.map((k) => {
              const jumlah = KOSAKATA.filter((x) => x.kategori === k).length;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKategori(k)}
                  className={`chip ${
                    kategori === k
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-navy border-border"
                  }`}
                >
                  <Ikon nama={IKON_KATEGORI[k] || "BookOpen"} className="w-3.5 h-3.5" />
                  {k} ({jumlah})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {mode === "flashcard" ? (
        <FlashcardKosakata
          daftar={hasil}
          p={p}
          onReset={() => {
            setCari("");
            setKategori("Semua");
            setLevel(0);
            setHanyaFavorit(false);
          }}
        />
      ) : hasil.length === 0 ? (
        <EmptyState
          ikon="Search"
          judul="Tidak ada kosakata yang cocok"
          deskripsi="Coba ubah kata kunci, kategori, atau level. Kamu juga bisa menonaktifkan filter favorit."
          aksi={
            <button
              type="button"
              onClick={() => {
                setCari("");
                setKategori("Semua");
                setLevel(0);
                setHanyaFavorit(false);
              }}
              className="btn btn-primary px-4 py-2.5 text-sm"
            >
              <Ikon nama="RotateCcw" className="w-4 h-4" />
              Reset filter
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {hasil.map((k) => {
            const sudah = dipelajari.includes(k.id);
            const favorit = p.favorit.includes(k.id);
            return (
              <article
                key={k.id}
                id={k.id}
                className={`card p-5 card-hover flex flex-col ${
                  sudah ? "border-success/40" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Pill warna="netral">
                      <Ikon
                        nama={IKON_KATEGORI[k.kategori] || "BookOpen"}
                        className="w-3 h-3"
                      />
                      {k.kategori}
                    </Pill>
                    <PillLevel level={k.level} />
                  </div>
                  <button
                    type="button"
                    onClick={() => p.toggleFavorit(k.id)}
                    aria-label={favorit ? "Hapus dari favorit" : "Tandai favorit"}
                    className={`p-1.5 rounded-lg transition-colors ${
                      favorit ? "text-primary bg-primary-light" : "text-muted hover:text-primary"
                    }`}
                  >
                    <Ikon nama="Heart" className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="jp text-xl font-bold leading-snug">{k.jepang}</p>
                    {k.furigana && k.furigana !== k.jepang && (
                      <p className="jp text-xs text-muted mt-0.5">{k.furigana}</p>
                    )}
                    <p className="text-sm text-primary font-semibold mt-1">{k.romaji}</p>
                  </div>
                  <AudioButton teks={k.jepang} />
                </div>

                <p className="mt-3 text-sm font-semibold">{k.arti}</p>

                <div className="mt-3 mb-3 rounded-xl bg-surface p-3">
                  <p className="jp text-sm leading-snug">{k.contohJp}</p>
                  <p className="text-xs text-muted mt-1">{k.contohId}</p>
                </div>

                <button
                  type="button"
                  onClick={() => p.tandaiKosakata(k.id)}
                  className={`btn w-full mt-auto px-3 py-2 text-xs ${
                    sudah ? "btn-ghost" : "btn-navy"
                  }`}
                >
                  <Ikon nama={sudah ? "Check" : "Plus"} className="w-3.5 h-3.5" />
                  {sudah ? "Sudah dipelajari" : "Tandai sudah dipelajari"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FlashcardKosakata({ daftar, p, onReset }) {
  const [indeks, setIndeks] = useState(0);
  const [buka, setBuka] = useState(false);
  const [acak, setAcak] = useState(false);
  const [daftarAcak, setDaftarAcak] = useState([]);

  const sumber = acak && daftarAcak.length ? daftarAcak : daftar;
  const kartu = sumber[Math.min(indeks, Math.max(sumber.length - 1, 0))];

  useEffect(() => {
    setIndeks(0);
    setBuka(false);
  }, [daftar, acak]);

  if (!kartu) {
    return (
      <EmptyState
        ikon="Layers"
        judul="Kartu tidak tersedia"
        deskripsi="Tidak ada kosakata pada filter ini. Ubah filter lalu coba lagi."
        aksi={
          <button type="button" onClick={onReset} className="btn btn-primary px-4 py-2.5 text-sm">
            Reset filter
          </button>
        }
      />
    );
  }

  const sudah = p.kosakataDipahami.includes(kartu.id);
  const favorit = p.favorit.includes(kartu.id);

  const geser = (arah) => {
    setBuka(false);
    setIndeks((i) => {
      const baru = i + arah;
      if (baru < 0) return sumber.length - 1;
      if (baru >= sumber.length) return 0;
      return baru;
    });
  };

  const kocok = () => {
    const arr = [...daftar];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setDaftarAcak(arr);
    setAcak(true);
    setIndeks(0);
    setBuka(false);
  };

  return (
    <div className="space-y-4">
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={kocok} className="btn btn-ghost px-3.5 py-2 text-sm">
          <Ikon nama="Shuffle" className="w-4 h-4" />
          Kocok kartu
        </button>
        <button
          type="button"
          onClick={() => {
            setAcak(false);
            setIndeks(0);
            setBuka(false);
          }}
          className="btn btn-ghost px-3.5 py-2 text-sm"
        >
          <Ikon nama="RotateCcw" className="w-4 h-4" />
          Urutan asli
        </button>
        <span className="text-sm text-muted ml-auto">
          Kartu {indeks + 1} dari {sumber.length}
        </span>
      </div>

      <div className="mx-auto max-w-xl">
        <button
          type="button"
          onClick={() => setBuka((v) => !v)}
          className="w-full card p-8 text-center card-hover min-h-[16rem] flex flex-col items-center justify-center"
        >
          <Pill warna="netral">{kartu.kategori}</Pill>
          <p className="jp text-4xl font-bold mt-5">{kartu.jepang}</p>
          {kartu.furigana && kartu.furigana !== kartu.jepang && (
            <p className="jp text-sm text-muted mt-1">{kartu.furigana}</p>
          )}

          {buka ? (
            <div className="mt-5 w-full animate-fade-in">
              <p className="text-lg font-bold text-primary">{kartu.arti}</p>
              <p className="text-xs text-muted mt-1">{kartu.romaji}</p>
              <div className="mt-4 rounded-xl bg-surface p-3 text-left">
                <p className="jp text-sm">{kartu.contohJp}</p>
                <p className="text-xs text-muted mt-1">{kartu.contohId}</p>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-xs text-muted flex items-center gap-1.5">
              <Ikon nama="Eye" className="w-3.5 h-3.5" />
              Klik kartu untuk melihat arti
            </p>
          )}
        </button>

        <div className="flex items-center justify-between gap-2 mt-4">
          <button
            type="button"
            onClick={() => geser(-1)}
            className="btn btn-ghost px-4 py-2.5 text-sm"
          >
            <Ikon nama="ChevronLeft" className="w-4 h-4" />
            Sebelumnya
          </button>

          <div className="flex items-center gap-2">
            <AudioButton teks={kartu.jepang} />
            <button
              type="button"
              onClick={() => p.toggleFavorit(kartu.id)}
              aria-label="Favorit"
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
                favorit
                  ? "bg-primary-light text-primary border-primary-light"
                  : "bg-white text-muted border-border hover:text-primary"
              }`}
            >
              <Ikon nama="Heart" className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => geser(1)}
            className="btn btn-navy px-4 py-2.5 text-sm"
          >
            Berikutnya
            <Ikon nama="ChevronRight" className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => p.tandaiKosakata(kartu.id)}
          className={`btn w-full mt-3 px-4 py-2.5 text-sm ${sudah ? "btn-ghost" : "btn-primary"}`}
        >
          <Ikon nama={sudah ? "Check" : "Plus"} className="w-4 h-4" />
          {sudah ? "Sudah dipelajari" : "Tandai sudah dipelajari"}
        </button>
      </div>
    </div>
  );
}
