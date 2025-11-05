import React from 'react';

export default function VisitList({ visits = [], onSelect, onDelete }) {
  if (!visits.length) {
    return (
      <div className="bg-white border rounded-2xl p-6 text-center text-slate-600">
        Your diary is empty. Add your first place!
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-2xl divide-y">
      {visits.map((v) => (
        <div key={v.id} className="p-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">{v.name.charAt(0).toUpperCase()}</span>
              <h3 className="font-medium">{v.name}</h3>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{new Date(v.date).toLocaleDateString()} • {v.lat.toFixed(2)}, {v.lon.toFixed(2)}</p>
            {v.notes && <p className="text-sm text-slate-700 mt-2 max-w-prose">{v.notes}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => onSelect?.(v.id)} className="px-3 py-1.5 rounded-md border hover:bg-slate-50">
              View on map
            </button>
            <button onClick={() => onDelete?.(v.id)} className="px-3 py-1.5 rounded-md border text-red-600 hover:bg-red-50">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
