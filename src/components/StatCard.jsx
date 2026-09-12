import Ikon from "./Ikon";

const WARNA_IKON = {
  merah: "bg-primary-light text-primary-dark",
  navy: "bg-navy/10 text-navy",
  biru: "bg-blue-light text-blue",
  emas: "bg-accent-light text-accent",
  hijau: "bg-success-light text-success",
};

export default function StatCard({
  ikon = "Star",
  label,
  nilai,
  keterangan,
  warna = "merah",
}) {
  return (
    <div className="card p-4 sm:p-5 card-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-bold leading-tight">{nilai}</p>
          {keterangan && <p className="mt-1 text-xs text-muted">{keterangan}</p>}
        </div>
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
            WARNA_IKON[warna] || WARNA_IKON.merah
          }`}
        >
          <Ikon nama={ikon} className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
}
