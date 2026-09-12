// Helper audio memakai Web Speech API.
// Tidak ada file audio palsu: kalau browser tidak mendukung, fungsi
// mengembalikan false sehingga UI bisa menampilkan pesan yang jujur.

const LANG = "ja-JP";

export function speechTersedia() {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function pilihSuara(voices) {
  if (!voices || !voices.length) return null;
  return (
    voices.find((v) => v.lang === LANG) ||
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("ja")) ||
    null
  );
}

/**
 * Ucapkan teks bahasa Jepang.
 * @returns {boolean} true jika berhasil meminta pemutaran.
 */
export function ucapkan(teks, opsi = {}) {
  if (!speechTersedia() || !teks) return false;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(teks);
    u.lang = LANG;
    u.rate = opsi.rate ?? 0.85;
    u.pitch = opsi.pitch ?? 1;
    u.volume = opsi.volume ?? 1;

    const voices = synth.getVoices();
    const suara = pilihSuara(voices);
    if (suara) u.voice = suara;

    synth.speak(u);
    return true;
  } catch {
    return false;
  }
}

// Sebagian browser memuat daftar suara secara asinkron.
export function siapkanSuara() {
  if (!speechTersedia()) return () => {};
  const muat = () => window.speechSynthesis.getVoices();
  muat();
  window.speechSynthesis.onvoiceschanged = muat;
  return () => {
    window.speechSynthesis.onvoiceschanged = null;
  };
}
