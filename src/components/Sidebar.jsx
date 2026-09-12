"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Ikon from "./Ikon";
import { MENU, GRUP_MENU } from "@/lib/nav";
import { useProgress } from "@/lib/progress";
import ProgressBar from "./ProgressBar";

export default function Sidebar({ ciut, setCiut }) {
  const pathname = usePathname();
  const { levelPengguna, persenLevel, totalMateri, streak, hydrated } = useProgress();

  const aktif = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside
      className={`hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col border-r border-border bg-card transition-all duration-300 ${
        ciut ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
        <Link href="/" className="flex items-center gap-2 min-w-0" title="Nihon-go">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white font-jp text-lg font-bold shrink-0">
            日
          </span>
          {!ciut && (
            <span className="min-w-0">
              <span className="block font-bold leading-none">Nihon-go</span>
              <span className="block text-[11px] text-muted mt-0.5 truncate">
                Belajar bahasa Jepang
              </span>
            </span>
          )}
        </Link>
        {!ciut && (
          <button
            type="button"
            onClick={() => setCiut(true)}
            aria-label="Ciutkan sidebar"
            className="ml-auto text-muted hover:text-navy"
          >
            <Ikon nama="ChevronLeft" className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {GRUP_MENU.map((grup) => {
          const items = MENU.filter((m) => m.grup === grup.key);
          return (
            <div key={grup.key} className="mb-4">
              {!ciut && (
                <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-muted">
                  {grup.label}
                </p>
              )}
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={ciut ? item.label : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        aktif(item.href)
                          ? "bg-primary-light text-primary-dark"
                          : "text-navy/75 hover:bg-surface hover:text-navy"
                      } ${ciut ? "justify-center" : ""}`}
                    >
                      <Ikon nama={item.ikon} className="w-[18px] h-[18px] shrink-0" />
                      {!ciut && <span className="truncate">{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      {ciut ? (
        <div className="p-3 border-t border-border">
          <button
            type="button"
            onClick={() => setCiut(false)}
            aria-label="Buka sidebar"
            className="w-full flex justify-center text-muted hover:text-navy py-2"
          >
            <Ikon nama="ChevronRight" className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-3 border-t border-border">
          <div className="rounded-2xl bg-surface p-3">
            <div className="flex items-center justify-between text-xs font-semibold text-navy">
              <span>Level {hydrated ? levelPengguna : 1}</span>
              <span className="flex items-center gap-1 text-primary">
                <Ikon nama="Flame" className="w-3.5 h-3.5" />
                {hydrated ? streak : 0} hari
              </span>
            </div>
            <ProgressBar nilai={hydrated ? persenLevel : 0} warna="primary" className="mt-2" />
            <p className="mt-2 text-[11px] text-muted">
              {hydrated ? totalMateri : 0} materi selesai
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
