import "./globals.css";
import Providers from "@/components/Providers";

// Alamat publik situs. Gambar pratinjau saat dibagikan ke media sosial diambil
// dari alamat ini, jadi WAJIB diisi domain aslinya saat sudah deploy.
// Set lewat environment variable NEXT_PUBLIC_SITE_URL (contoh: https://nihon-go.com).
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nihon-go-pearl.vercel.app"
).replace(/\/+$/, "");

// Gambar yang dipakai saat tautan dibagikan ke WhatsApp, Facebook, X, Telegram, dll.
const GAMBAR_SHARE = {
  url: "/Poster-n.jpg",
  width: 2278,
  height: 1280,
  alt: "Nihon-go — belajar bahasa Jepang dari huruf sampai percakapan",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nihon-go — Belajar Bahasa Jepang dari Huruf sampai Percakapan",
    template: "%s | Nihon-go",
  },
  description:
    "Nihon-go adalah platform belajar bahasa Jepang berbahasa Indonesia: hiragana, katakana, kosakata, tata bahasa, kanji, kaiwa, membaca, kuis interaktif, dan tes kemampuan dengan progress tersimpan di browser.",
  keywords: [
    "belajar bahasa jepang",
    "belajar huruf jepang",
    "hiragana",
    "katakana",
    "kosakata bahasa jepang",
    "tata bahasa jepang",
    "kanji dasar",
    "kaiwa",
    "percakapan bahasa jepang",
    "latihan membaca bahasa jepang",
    "kuis bahasa jepang",
    "tes bahasa jepang online",
    "materi jlpt n5",
    "belajar jepang pemula",
    "nihongo",
  ],
  authors: [{ name: "Nihon-go" }],
  creator: "Nihon-go",
  publisher: "Nihon-go",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Nihon-go",
    title: "Nihon-go — Mulai dari huruf, berkembang menjadi percakapan.",
    description:
      "Belajar bahasa Jepang bertahap: huruf, kosakata, tata bahasa, kanji, kaiwa, membaca, dan kuis interaktif.",
    inLanguage: "id",
    images: [GAMBAR_SHARE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nihon-go — Belajar Bahasa Jepang Bertahap",
    description:
      "Platform belajar bahasa Jepang berbahasa Indonesia dengan materi pemula sampai menengah.",
    images: [GAMBAR_SHARE],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nihon-go",
    alternateName: "Nihon-go — Belajar Bahasa Jepang",
    url: siteUrl,
    description:
      "Platform belajar bahasa Jepang berbahasa Indonesia dengan materi huruf, kosakata, tata bahasa, kanji, kaiwa, membaca, kuis, dan tes kemampuan.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["id", "ja"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
    image: `${siteUrl}/Poster-n.jpg`,
    featureList: [
      "Hiragana dan katakana lengkap dengan latihan",
      "Kosakata dengan contoh kalimat dan audio",
      "20+ pola tata bahasa berbahasa Indonesia",
      "Kanji bertahap dengan onyomi dan kunyomi",
      "Latihan percakapan (kaiwa) dengan dialog",
      "Latihan membaca bertingkat",
      "Kuis interaktif dengan pembahasan",
      "Tes kemampuan dan rekomendasi materi",
      "Progress, XP, streak, dan badge tersimpan di browser",
    ],
  };

  return (
    <html lang="id">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
