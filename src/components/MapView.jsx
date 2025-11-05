import React from 'react';

// Equirectangular projection utilities
const WORLD_WIDTH = 1000; // SVG viewBox width
const WORLD_HEIGHT = 500; // SVG viewBox height

function project([lat, lon]) {
  const x = ((lon + 180) * (WORLD_WIDTH / 360));
  const y = ((90 - lat) * (WORLD_HEIGHT / 180));
  return [x, y];
}

export default function MapView({ visits = [], onSelect, selectedId }) {
  return (
    <div className="w-full bg-gradient-to-b from-sky-50 to-white border rounded-2xl overflow-hidden shadow-sm">
      <div className="relative aspect-[2/1]">
        <svg
          viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="ocean" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#f0f9ff" />
            </linearGradient>
          </defs>
          <rect width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="url(#ocean)" />

          {/* Land mass (simplified world map path) */}
          <g fill="#d4f0e8" stroke="#9fd5c8" strokeWidth="0.6">
            <path d="M158 98l6-9 10-4 7 1 6-3 12 6 8 10 13 1 7 4 3 7-4 7-10 2-8 7-9 3-8-2-10-8-8-7-10-4-7-8 2-2z" />
            <path d="M240 104l8-6 10-1 12 5 10 9 9 12-2 8-6 6-10 2-12-2-9-8-5-10 5-10z" />
            <path d="M330 120l12-8 14-2 16 6 14 12 10 14-4 10-10 8-16 2-14-4-12-10-6-14 6-14z" />
            <path d="M430 120l10-10 16-4 18 6 16 12 10 16-4 12-12 10-18 2-16-6-12-12-4-16 6-10z" />
            <path d="M540 140l12-10 18-4 18 6 18 14 10 18-6 12-14 10-20 2-18-6-14-12-6-18 8-12z" />
            <path d="M680 160l12-10 20-4 22 8 18 16 12 18-6 14-16 12-22 2-20-8-16-14-8-20 4-14z" />
            <path d="M820 180l16-12 22-4 24 10 20 18 12 20-8 16-18 12-24 2-22-10-18-16-8-22 4-14z" />
            <path d="M120 280l18-12 26-6 26 10 22 20 14 24-8 18-20 14-28 4-26-10-20-18-10-26 6-12z" />
            <path d="M380 300l20-14 28-6 30 12 24 20 16 26-8 18-22 16-30 4-28-12-22-18-12-28 4-10z" />
            <path d="M650 320l20-16 32-6 34 12 26 22 18 28-10 20-24 16-34 4-32-12-24-22-12-30 6-14z" />
            <path d="M860 340l26-18 36-6 38 14 28 24 20 30-12 22-26 18-38 6-36-14-26-24-14-34 4-18z" />
          </g>

          {/* Graticules */}
          <g stroke="#cfe8f3" strokeWidth="0.5">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v${i}`} x1={(i) * (WORLD_WIDTH / 10)} y1="0" x2={(i) * (WORLD_WIDTH / 10)} y2={WORLD_HEIGHT} />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={(i) * (WORLD_HEIGHT / 4)} x2={WORLD_WIDTH} y2={(i) * (WORLD_HEIGHT / 4)} />
            ))}
          </g>

          {/* Markers */}
          <g>
            {visits.map((v) => {
              const [x, y] = project([v.lat, v.lon]);
              const isSelected = v.id === selectedId;
              return (
                <g key={v.id} className="cursor-pointer" onClick={() => onSelect?.(v.id)}>
                  <circle cx={x} cy={y} r={8} fill={isSelected ? '#1d4ed8' : '#ef4444'} stroke="#ffffff" strokeWidth="2" />
                  <text x={x + 10} y={y - 10} fontSize="12" fill="#0f172a" className="select-none">
                    {v.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Selected popup */}
        {selectedId && (
          <div className="absolute bottom-3 left-3 right-3 md:left-auto md:right-3 md:w-80 bg-white rounded-xl shadow-lg border p-3">
            {(() => {
              const v = visits.find((x) => x.id === selectedId);
              if (!v) return null;
              return (
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{v.name}</h3>
                      <p className="text-xs text-slate-500">{new Date(v.date).toLocaleDateString()} • {v.lat.toFixed(2)}, {v.lon.toFixed(2)}</p>
                    </div>
                    <button
                      className="text-slate-500 hover:text-slate-700 text-sm"
                      onClick={() => onSelect?.(null)}
                      aria-label="Close details"
                    >
                      ✕
                    </button>
                  </div>
                  {v.notes && <p className="mt-2 text-sm text-slate-700">{v.notes}</p>}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
