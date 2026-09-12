"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Ikon from "./Ikon";
import { MENU_MOBILE } from "@/lib/nav";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-card/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-stretch">
        {MENU_MOBILE.map((item) => {
          const aktif = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                  aktif ? "text-primary" : "text-muted hover:text-navy"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-9 h-7 rounded-lg ${
                    aktif ? "bg-primary-light" : ""
                  }`}
                >
                  <Ikon nama={item.ikon} className="w-[18px] h-[18px]" />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
