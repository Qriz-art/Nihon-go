"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Ikon from "./Ikon";
import SearchDialog from "./SearchDialog";
import { MENU } from "@/lib/nav";
import { useProgress } from "@/lib/progress";

export default function Topbar() {
  const pathname = usePathname();
  const {
    nama,
    setNama,
    xp,
    streak,
    targetHarian,
    setTargetHarian,
    resetProgress,
    hydrated,
    levelPengguna,
  } = useProgress();

  const [cariBuka, setCariBuka] = useState(false);
  const [menuBuka, setMenuBuka] = useState(false);
  const [profilBuka, setProfilBuka] = useState(false);
  const [namaDraft, setNamaDraft] = useState("");

  useEffect(() => {
    setMenuBuka(false);
    setProfilBuka(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCariBuka(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const simpanNama = (e) => {
    e.preventDefault();
    setNama(namaDraft.trim());
    setProfilBuka(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
          <button
            type="button"
            onClick={() => setMenuBuka(true)}
            aria-label="Buka menu"
            className="lg:hidden p-2 -ml-2 text-navy"
          >
            <Ikon nama="Menu" className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white font-jp font-bold">
              日
            </span>
            <span className="font-bold">Nihon-go</span>
          </Link>

          <button
            type="button"
            onClick={() => setCariBuka(true)}
            className="hidden sm:flex items-center gap-2 w-full max-w-sm rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted hover:border-primary/40 transition-colors"
          >
            <Ikon nama="Search" className="w-4 h-4" />
            <span>Cari materi, kosakata, kanji...</span>
            <kbd className="ml-auto text-[10px] font-semibold border border-border rounded px-1.5 py-0.5">
              Ctrl K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setCariBuka(true)}
            aria-label="Cari"
            className="sm:hidden p-2 text-navy"
          >
            <Ikon nama="Search" className="w-5 h-5" />
          </button>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden sm:inline-flex chip bg-accent-light text-accent border-accent-light">
              <Ikon nama="Zap" className="w-3.5 h-3.5" />
              {hydrated ? xp : 0} XP
            </span>
            <span className="hidden sm:inline-flex chip bg-primary-light text-primary-dark border-primary-light">
              <Ikon nama="Flame" className="w-3.5 h-3.5" />
              {hydrated ? streak : 0} hari
            </span>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfilBuka((v) => !v);
                  setNamaDraft(nama);
                }}
                aria-label="Menu profil"
                className="flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-3 py-1 hover:border-primary/40 transition-colors"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-navy text-white text-xs font-bold uppercase">
                  {(hydrated ? nama : "P").slice(0, 1)}
                </span>
                <span className="hidden sm:block text-sm font-semibold max-w-[7rem] truncate">
                  {hydrated ? nama : "Pelajar"}
                </span>
              </button>

              {profilBuka && (
                <>
                  <button
                    type="button"
                    aria-label="Tutup menu profil"
                    onClick={() => setProfilBuka(false)}
                    className="fixed inset-0 z-40 cursor-default"
                  />
                  <div className="absolute right-0 mt-2 w-72 card shadow-xl p-4 z-50 animate-pop">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">
                      Profil belajar
                    </p>
                    <p className="mt-1 text-lg font-bold">Level {hydrated ? levelPengguna : 1}</p>
                    <p className="text-xs text-muted">
                      {hydrated ? xp : 0} XP terkumpul
                    </p>

                    <form onSubmit={simpanNama} className="mt-3">
                      <label className="text-xs font-semibold text-muted" htmlFor="nama">
                        Nama panggilan
                      </label>
                      <div className="flex gap-2 mt-1">
                        <input
                          id="nama"
                          value={namaDraft}
                          onChange={(e) => setNamaDraft(e.target.value)}
                          placeholder="Pelajar"
                          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                        <button type="submit" className="btn btn-navy px-3 py-2 text-sm">
                          Simpan
                        </button>
                      </div>
                    </form>

                    <div className="mt-3">
                      <label className="text-xs font-semibold text-muted" htmlFor="target">
                        Target XP harian
                      </label>
                      <select
                        id="target"
                        value={targetHarian}
                        onChange={(e) => setTargetHarian(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary bg-white"
                      >
                        <option value={30}>Santai — 30 XP</option>
                        <option value={50}>Reguler — 50 XP</option>
                        <option value={80}>Serius — 80 XP</option>
                        <option value={120}>Intensif — 120 XP</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        resetProgress();
                        setProfilBuka(false);
                      }}
                      className="mt-4 w-full btn btn-ghost px-3 py-2 text-sm text-danger"
                    >
                      <Ikon nama="Trash2" className="w-4 h-4" />
                      Reset seluruh progress
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <SearchDialog buka={cariBuka} tutup={() => setCariBuka(false)} />

      {/* Drawer menu untuk layar kecil */}
      {menuBuka && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setMenuBuka(false)}
            className="absolute inset-0 bg-navy/40"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-card border-r border-border p-4 overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold">Menu</span>
              <button
                type="button"
                onClick={() => setMenuBuka(false)}
                aria-label="Tutup"
                className="p-1 text-muted"
              >
                <Ikon nama="X" className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-1">
              {MENU.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                      pathname === item.href
                        ? "bg-primary-light text-primary-dark"
                        : "text-navy/80 hover:bg-surface"
                    }`}
                  >
                    <Ikon nama={item.ikon} className="w-[18px] h-[18px]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
