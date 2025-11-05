import React, { useState } from 'react';

export default function AddVisitForm({ onAdd }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);
    if (!name.trim()) return setError('Please enter a place name.');
    if (isNaN(latNum) || latNum < -90 || latNum > 90) return setError('Latitude must be between -90 and 90.');
    if (isNaN(lonNum) || lonNum < -180 || lonNum > 180) return setError('Longitude must be between -180 and 180.');

    onAdd?.({ name: name.trim(), date, lat: latNum, lon: lonNum, notes: notes.trim() });
    setName('');
    setLat('');
    setLon('');
    setNotes('');
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude.toFixed(6));
        setLon(longitude.toFixed(6));
      },
      () => setError('Unable to retrieve your location')
    );
  }

  return (
    <section id="add" className="bg-white border rounded-2xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Add a visited place</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-1">Place name</label>
            <input
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Tokyo, Mount Fuji"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-1">Date visited</label>
            <input
              type="date"
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={useCurrentLocation}
              className="w-full border rounded-md px-3 py-2 hover:bg-slate-50"
            >
              Use my current location
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Latitude</label>
          <input
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 35.6895"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Longitude</label>
          <input
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 139.6917"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Notes (optional)</label>
          <textarea
            rows={3}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Memories, food, people you met..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {error && (
          <div className="md:col-span-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <div className="md:col-span-2 flex justify-end gap-3 pt-1">
          <button type="reset" onClick={() => { setName(''); setLat(''); setLon(''); setNotes(''); }} className="px-4 py-2 rounded-md border hover:bg-slate-50">
            Reset
          </button>
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Add place
          </button>
        </div>
      </form>
    </section>
  );
}
