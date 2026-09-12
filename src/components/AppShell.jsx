"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomNav from "./BottomNav";

export default function AppShell({ children }) {
  const [ciut, setCiut] = useState(false);

  useEffect(() => {
    try {
      const tersimpan = window.localStorage.getItem("nihongo:sidebar");
      if (tersimpan === "ciut") setCiut(true);
    } catch {
      // abaikan
    }
  }, []);

  const ubahCiut = (nilai) => {
    setCiut(nilai);
    try {
      window.localStorage.setItem("nihongo:sidebar", nilai ? "ciut" : "buka");
    } catch {
      // abaikan
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar ciut={ciut} setCiut={ubahCiut} />
      <div
        className={`transition-[padding] duration-300 ${ciut ? "lg:pl-20" : "lg:pl-64"}`}
      >
        <Topbar />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-28 lg:pb-12">
          {children}
        </main>
        <footer className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 lg:pb-10 text-xs text-muted">
          Nihon-go — materi belajar bahasa Jepang berbahasa Indonesia. Hasil latihan
          disimpan di browser kamu.
        </footer>
      </div>
      <BottomNav />
    </div>
  );
}
