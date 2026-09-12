const WARNA = {
  netral: "bg-surface text-navy border-border",
  merah: "bg-primary-light text-primary-dark border-primary-light",
  navy: "bg-navy/8 text-navy border-navy/15",
  biru: "bg-blue-light text-blue border-blue-light",
  emas: "bg-accent-light text-accent border-accent-light",
  hijau: "bg-success-light text-success border-success-light",
  bahaya: "bg-danger-light text-danger border-danger-light",
  putih: "bg-white/15 text-white border-white/25",
};

export default function Pill({ children, warna = "netral", className = "" }) {
  return (
    <span className={`chip ${WARNA[warna] || WARNA.netral} ${className}`}>{children}</span>
  );
}

export function PillLevel({ level, className = "" }) {
  const map = {
    1: { label: "Pemula", warna: "hijau" },
    2: { label: "Dasar", warna: "biru" },
    3: { label: "Menengah", warna: "emas" },
  };
  const data = map[level] || map[1];
  return (
    <Pill warna={data.warna} className={className}>
      {data.label}
    </Pill>
  );
}
