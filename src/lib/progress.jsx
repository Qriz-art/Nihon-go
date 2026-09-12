"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BADGES, XP } from "@/data/gamifikasi";

const STORAGE_KEY = "nihongo:progress:v1";

const DEFAULT_STATE = {
  nama: "Pelajar",
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  pelajaranSelesai: [],
  hurufDipahami: { hiragana: [], katakana: [] },
  kosakataDipahami: [],
  kanjiDikuasai: [],
  grammarDipelajari: [],
  kaiwaSelesai: [],
  membacaSelesai: [],
  favorit: [],
  riwayatKuis: [],
  badge: [],
  aktivitas: [],
  targetHarian: XP.targetHarian,
};

const ProgressContext = createContext(null);

function hariIni() {
  return new Date().toISOString().slice(0, 10);
}

function selisihHari(a, b) {
  const d1 = new Date(`${a}T00:00:00`);
  const d2 = new Date(`${b}T00:00:00`);
  return Math.round((d2 - d1) / 86400000);
}

function tambahUnik(list, nilai) {
  return list.includes(nilai) ? list : [...list, nilai];
}

function hitungBadge(state) {
  return BADGES.filter((badge) => {
    const { tipe, jumlah, tipeHuruf } = badge.kriteria;
    switch (tipe) {
      case "pelajaran":
        return state.pelajaranSelesai.length >= jumlah;
      case "huruf":
        return (state.hurufDipahami[tipeHuruf] || []).length >= jumlah;
      case "kosakata":
        return state.kosakataDipahami.length >= jumlah;
      case "kanji":
        return state.kanjiDikuasai.length >= jumlah;
      case "grammar":
        return state.grammarDipelajari.length >= jumlah;
      case "kuis":
        return state.riwayatKuis.length >= jumlah;
      case "streak":
        return state.streak >= jumlah;
      case "xp":
        return state.xp >= jumlah;
      default:
        return false;
    }
  }).map((b) => b.id);
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Muat data dari localStorage setelah komponen terpasang di browser
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          ...DEFAULT_STATE,
          ...parsed,
          hurufDipahami: {
            ...DEFAULT_STATE.hurufDipahami,
            ...(parsed.hurufDipahami || {}),
          },
        });
      }
    } catch {
      // abaikan data rusak, gunakan default
    }
    setHydrated(true);
  }, []);

  // Simpan setiap ada perubahan (hanya setelah hidrasi)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage bisa gagal pada mode private
    }
  }, [state, hydrated]);

  const update = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      const badge = hitungBadge(next);
      const badgeBaru = badge.filter((b) => !prev.badge.includes(b));
      const hasil = { ...next, badge };
      if (badgeBaru.length) {
        const namaBaru = BADGES.filter((b) => badgeBaru.includes(b.id)).map((b) => b.nama);
        return {
          ...hasil,
          aktivitas: [
            ...hasil.aktivitas,
            {
              tipe: "badge",
              label: `Badge baru: ${namaBaru.join(", ")}`,
              xp: 0,
              waktu: new Date().toISOString(),
            },
          ].slice(-30),
        };
      }
      return hasil;
    });
  }, []);

  // Catat aktivitas: perbarui streak + tambah XP + tulis riwayat
  const catatAktivitas = useCallback(
    (prev, { label, xp = 0, tipe = "belajar" }) => {
      const today = hariIni();
      let streak = prev.streak;
      if (prev.lastStudyDate !== today) {
        if (prev.lastStudyDate && selisihHari(prev.lastStudyDate, today) === 1) {
          streak = prev.streak + 1;
        } else {
          streak = 1;
        }
      }
      return {
        ...prev,
        streak,
        lastStudyDate: today,
        xp: Math.max(0, prev.xp + xp),
        aktivitas: [
          ...prev.aktivitas,
          { tipe, label, xp, waktu: new Date().toISOString() },
        ].slice(-30),
      };
    },
    []
  );

  // Menandai pelajaran selesai; memanggil ulang akan membatalkannya.
  const selesaikanPelajaran = useCallback(
    (lesson) => {
      update((prev) => {
        const sudahAda = prev.pelajaranSelesai.includes(lesson.id);
        const next = sudahAda
          ? {
              ...prev,
              pelajaranSelesai: prev.pelajaranSelesai.filter((id) => id !== lesson.id),
            }
          : {
              ...prev,
              pelajaranSelesai: tambahUnik(prev.pelajaranSelesai, lesson.id),
            };
        return catatAktivitas(next, {
          label: `${sudahAda ? "Membatalkan" : "Menyelesaikan"} pelajaran: ${lesson.judul}`,
          xp: sudahAda ? -XP.pelajaranSelesai : XP.pelajaranSelesai,
          tipe: "pelajaran",
        });
      });
    },
    [update, catatAktivitas]
  );

  const tandaiHuruf = useCallback(
    (tipe, char) => {
      update((prev) => {
        const sudahAda = prev.hurufDipahami[tipe].includes(char);
        const next = sudahAda
          ? {
              ...prev,
              hurufDipahami: {
                ...prev.hurufDipahami,
                [tipe]: prev.hurufDipahami[tipe].filter((c) => c !== char),
              },
            }
          : {
              ...prev,
              hurufDipahami: {
                ...prev.hurufDipahami,
                [tipe]: [...prev.hurufDipahami[tipe], char],
              },
            };
        return catatAktivitas(next, {
          label: `${sudahAda ? "Membatalkan" : "Mempelajari"} huruf ${char}`,
          xp: sudahAda ? -XP.hurufDipahami : XP.hurufDipahami,
          tipe: "huruf",
        });
      });
    },
    [update, catatAktivitas]
  );

  // Tandai banyak huruf sekaligus dalam satu pembaruan state
  const tandaiHurufBanyak = useCallback(
    (tipe, chars) => {
      if (!chars.length) return;
      update((prev) => {
        const baru = chars.filter((c) => !prev.hurufDipahami[tipe].includes(c));
        if (!baru.length) return prev;
        const next = {
          ...prev,
          hurufDipahami: {
            ...prev.hurufDipahami,
            [tipe]: [...prev.hurufDipahami[tipe], ...baru],
          },
        };
        return catatAktivitas(next, {
          label: `Mempelajari ${baru.length} huruf sekaligus`,
          xp: baru.length * XP.hurufDipahami,
          tipe: "huruf",
        });
      });
    },
    [update, catatAktivitas]
  );

  const tandaiKosakata = useCallback(
    (id) => {
      update((prev) => {
        const sudahAda = prev.kosakataDipahami.includes(id);
        const next = sudahAda
          ? {
              ...prev,
              kosakataDipahami: prev.kosakataDipahami.filter((k) => k !== id),
            }
          : {
              ...prev,
              kosakataDipahami: [...prev.kosakataDipahami, id],
            };
        return catatAktivitas(next, {
          label: `${sudahAda ? "Membatalkan" : "Mempelajari"} kosakata`,
          xp: sudahAda ? -XP.kosakataDipahami : XP.kosakataDipahami,
          tipe: "kosakata",
        });
      });
    },
    [update, catatAktivitas]
  );

  const tandaiKanji = useCallback(
    (id) => {
      update((prev) => {
        const sudahAda = prev.kanjiDikuasai.includes(id);
        const next = sudahAda
          ? { ...prev, kanjiDikuasai: prev.kanjiDikuasai.filter((k) => k !== id) }
          : { ...prev, kanjiDikuasai: [...prev.kanjiDikuasai, id] };
        return catatAktivitas(next, {
          label: `${sudahAda ? "Membatalkan" : "Menguasai"} kanji`,
          xp: sudahAda ? -XP.kanjiDikuasai : XP.kanjiDikuasai,
          tipe: "kanji",
        });
      });
    },
    [update, catatAktivitas]
  );

  const tandaiGrammar = useCallback(
    (id) => {
      update((prev) => {
        const sudahAda = prev.grammarDipelajari.includes(id);
        const next = sudahAda
          ? { ...prev, grammarDipelajari: prev.grammarDipelajari.filter((g) => g !== id) }
          : { ...prev, grammarDipelajari: [...prev.grammarDipelajari, id] };
        return catatAktivitas(next, {
          label: `${sudahAda ? "Membatalkan" : "Mempelajari"} pola tata bahasa`,
          xp: sudahAda ? -XP.grammarDipelajari : XP.grammarDipelajari,
          tipe: "grammar",
        });
      });
    },
    [update, catatAktivitas]
  );

  const tandaiKaiwa = useCallback(
    (id) => {
      update((prev) => {
        const sudahAda = prev.kaiwaSelesai.includes(id);
        const next = sudahAda
          ? { ...prev, kaiwaSelesai: prev.kaiwaSelesai.filter((k) => k !== id) }
          : { ...prev, kaiwaSelesai: [...prev.kaiwaSelesai, id] };
        return catatAktivitas(next, {
          label: `${sudahAda ? "Membatalkan" : "Menyelesaikan"} latihan kaiwa`,
          xp: sudahAda ? -XP.kaiwaSelesai : XP.kaiwaSelesai,
          tipe: "kaiwa",
        });
      });
    },
    [update, catatAktivitas]
  );

  const tandaiMembaca = useCallback(
    (id) => {
      update((prev) => {
        const sudahAda = prev.membacaSelesai.includes(id);
        const next = sudahAda
          ? { ...prev, membacaSelesai: prev.membacaSelesai.filter((m) => m !== id) }
          : { ...prev, membacaSelesai: [...prev.membacaSelesai, id] };
        return catatAktivitas(next, {
          label: `${sudahAda ? "Membatalkan" : "Menyelesaikan"} latihan membaca`,
          xp: sudahAda ? -XP.membacaSelesai : XP.membacaSelesai,
          tipe: "membaca",
        });
      });
    },
    [update, catatAktivitas]
  );

  const toggleFavorit = useCallback(
    (id) => {
      update((prev) => ({
        ...prev,
        favorit: prev.favorit.includes(id)
          ? prev.favorit.filter((f) => f !== id)
          : [...prev.favorit, id],
      }));
    },
    [update]
  );

  const simpanHasilKuis = useCallback(
    (hasil) => {
      update((prev) => {
        const next = {
          ...prev,
          riwayatKuis: [
            { ...hasil, waktu: new Date().toISOString() },
            ...prev.riwayatKuis,
          ].slice(0, 50),
        };
        return catatAktivitas(next, {
          label: `Kuis ${hasil.nama}: ${hasil.benar}/${hasil.total} benar`,
          xp: XP.kuisSelesai + hasil.benar * XP.jawabanBenarKuis,
          tipe: "kuis",
        });
      });
    },
    [update, catatAktivitas]
  );

  const setNama = useCallback(
    (nama) => update((prev) => ({ ...prev, nama: nama || "Pelajar" })),
    [update]
  );

  const setTargetHarian = useCallback(
    (nilai) => update((prev) => ({ ...prev, targetHarian: Number(nilai) || XP.targetHarian })),
    [update]
  );

  const resetProgress = useCallback(() => {
    setState(DEFAULT_STATE);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // abaikan
    }
  }, []);

  const nilai = useMemo(() => {
    const totalMateri =
      state.pelajaranSelesai.length +
      state.hurufDipahami.hiragana.length +
      state.hurufDipahami.katakana.length +
      state.kosakataDipahami.length +
      state.kanjiDikuasai.length +
      state.grammarDipelajari.length +
      state.kaiwaSelesai.length +
      state.membacaSelesai.length;

    const levelPengguna = Math.floor(state.xp / 200) + 1;
    const xpLevelIni = state.xp % 200;
    const xpUntukNaik = 200;

    return {
      ...state,
      hydrated,
      totalMateri,
      levelPengguna,
      xpLevelIni,
      xpUntukNaik,
      persenLevel: Math.round((xpLevelIni / xpUntukNaik) * 100),
    };
  }, [state, hydrated]);

  const api = useMemo(
    () => ({
      ...nilai,
      selesaikanPelajaran,
      tandaiHuruf,
      tandaiHurufBanyak,
      tandaiKosakata,
      tandaiKanji,
      tandaiGrammar,
      tandaiKaiwa,
      tandaiMembaca,
      toggleFavorit,
      simpanHasilKuis,
      setNama,
      setTargetHarian,
      resetProgress,
    }),
    [
      nilai,
      selesaikanPelajaran,
      tandaiHuruf,
      tandaiHurufBanyak,
      tandaiKosakata,
      tandaiKanji,
      tandaiGrammar,
      tandaiKaiwa,
      tandaiMembaca,
      toggleFavorit,
      simpanHasilKuis,
      setNama,
      setTargetHarian,
      resetProgress,
    ]
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress harus dipakai di dalam ProgressProvider");
  }
  return ctx;
}

export { STORAGE_KEY, DEFAULT_STATE };
