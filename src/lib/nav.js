export const MENU = [
  { href: "/dashboard", label: "Dashboard", ikon: "LayoutDashboard", grup: "utama" },
  { href: "/belajar", label: "Jalur Belajar", ikon: "Route", grup: "utama" },
  { href: "/huruf", label: "Huruf", ikon: "Languages", grup: "materi" },
  { href: "/kosakata", label: "Kosakata", ikon: "BookOpen", grup: "materi" },
  { href: "/grammar", label: "Grammar", ikon: "Braces", grup: "materi" },
  { href: "/kanji", label: "Kanji", ikon: "BookType", grup: "materi" },
  { href: "/kaiwa", label: "Kaiwa", ikon: "MessagesSquare", grup: "materi" },
  { href: "/membaca", label: "Membaca", ikon: "BookMarked", grup: "materi" },
  { href: "/kuis", label: "Kuis", ikon: "Target", grup: "latihan" },
  { href: "/tes", label: "Tes Kemampuan", ikon: "ClipboardCheck", grup: "latihan" },
  { href: "/progress", label: "Progress", ikon: "Trophy", grup: "latihan" },
];

// Menu ringkas untuk bottom navigation di layar kecil
export const MENU_MOBILE = [
  { href: "/dashboard", label: "Beranda", ikon: "LayoutDashboard" },
  { href: "/belajar", label: "Belajar", ikon: "Route" },
  { href: "/kosakata", label: "Kosakata", ikon: "BookOpen" },
  { href: "/kuis", label: "Kuis", ikon: "Target" },
  { href: "/progress", label: "Progress", ikon: "Trophy" },
];

export const GRUP_MENU = [
  { key: "utama", label: "Utama" },
  { key: "materi", label: "Materi" },
  { key: "latihan", label: "Latihan" },
];
