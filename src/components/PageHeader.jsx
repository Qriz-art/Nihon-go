import Ikon from "./Ikon";

export default function PageHeader({ judul, deskripsi, ikon, children, aksi }) {
  return (
    <header className="mb-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {ikon && (
            <span className="hidden sm:flex items-center justify-center w-11 h-11 rounded-2xl bg-primary-light text-primary-dark shrink-0">
              <Ikon nama={ikon} className="w-6 h-6" />
            </span>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
              {judul}
            </h1>
            {deskripsi && (
              <p className="mt-1.5 text-sm text-muted max-w-2xl leading-relaxed">
                {deskripsi}
              </p>
            )}
          </div>
        </div>
        {aksi && <div className="flex items-center gap-2 shrink-0">{aksi}</div>}
      </div>
      {children && <div className="mt-5">{children}</div>}
    </header>
  );
}
