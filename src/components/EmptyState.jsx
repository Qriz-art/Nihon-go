import Ikon from "./Ikon";

export default function EmptyState({
  ikon = "Inbox",
  judul = "Belum ada data",
  deskripsi,
  aksi,
}) {
  return (
    <div className="card p-8 sm:p-12 text-center animate-fade-in">
      <span className="mx-auto flex items-center justify-center w-14 h-14 rounded-2xl bg-surface text-muted">
        <Ikon nama={ikon} className="w-7 h-7" />
      </span>
      <h3 className="mt-4 text-base font-bold">{judul}</h3>
      {deskripsi && (
        <p className="mt-1.5 text-sm text-muted max-w-md mx-auto leading-relaxed">
          {deskripsi}
        </p>
      )}
      {aksi && <div className="mt-5 flex flex-wrap justify-center gap-2">{aksi}</div>}
    </div>
  );
}
