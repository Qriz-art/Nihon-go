const WARNA = {
  primary: "bg-primary",
  navy: "bg-navy",
  biru: "bg-blue",
  emas: "bg-accent",
  hijau: "bg-success",
};

export default function ProgressBar({
  nilai = 0,
  warna = "primary",
  tinggi = "h-2",
  className = "",
  tampilkanLabel = false,
}) {
  const persen = Math.max(0, Math.min(100, Math.round(nilai)));
  return (
    <div className={className}>
      <div className={`w-full ${tinggi} rounded-full bg-surface overflow-hidden`}>
        <div
          className={`${tinggi} rounded-full ${WARNA[warna] || WARNA.primary} progress-animated transition-all duration-500`}
          style={{ width: `${persen}%` }}
        />
      </div>
      {tampilkanLabel && (
        <div className="mt-1 text-xs font-semibold text-muted">{persen}%</div>
      )}
    </div>
  );
}
