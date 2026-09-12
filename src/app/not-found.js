import Link from "next/link";
import Ikon from "@/components/Ikon";

const TAUTAN = [
  { href: "/dashboard", label: "Dashboard", ikon: "LayoutDashboard" },
  { href: "/belajar", label: "Jalur Belajar", ikon: "Route" },
  { href: "/huruf", label: "Huruf Jepang", ikon: "Languages" },
  { href: "/kosakata", label: "Kosakata", ikon: "BookOpen" },
  { href: "/kuis", label: "Kuis", ikon: "Target" },
  { href: "/progress", label: "Progress", ikon: "Trophy" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 pattern-seigaiha opacity-60 pointer-events-none" />

      <div className="relative w-full max-w-xl text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="jp text-5xl font-bold text-primary">四</span>
          <span className="jp text-5xl font-bold text-navy">〇</span>
          <span className="jp text-5xl font-bold text-accent">四</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Alamat yang kamu buka tidak ada di Nihon-go. Mungkin salah ketik, atau
          halamannya sudah dipindahkan. Coba salah satu tautan di bawah ini —
          どうぞ.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <Link href="/" className="btn btn-primary px-5 py-3">
            <Ikon nama="ArrowLeft" className="w-4 h-4" />
            Kembali ke beranda
          </Link>
          <Link href="/belajar" className="btn btn-ghost px-5 py-3">
            <Ikon nama="Route" className="w-4 h-4" />
            Mulai belajar
          </Link>
        </div>

        <div className="mt-10 card p-5 text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-muted mb-3">
            Halaman populer
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {TAUTAN.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm font-semibold hover:border-primary/40 transition-colors"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface text-navy shrink-0">
                    <Ikon nama={t.ikon} className="w-4 h-4" />
                  </span>
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
