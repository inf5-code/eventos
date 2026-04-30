const STATS = [
  { value: "2.000+", label: "Eventos activos" },
  { value: "500k+",  label: "Entradas vendidas" },
  { value: "50+",    label: "Ciudades" },
  { value: "4.9★",   label: "Valoración media" },
];

export function StatsBar() {
  return (
    <div
      aria-label="Cifras de la plataforma"
      className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border mx-4 rounded-xl overflow-hidden my-6"
    >
      {STATS.map(stat => (
        <div
          key={stat.label}
          className="bg-bg-card flex flex-col items-center py-4 px-2 text-center"
        >
          <span className="text-brand-300 font-display font-bold text-2xl leading-none">{stat.value}</span>
          <span className="text-slate-400 text-xs mt-1">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
