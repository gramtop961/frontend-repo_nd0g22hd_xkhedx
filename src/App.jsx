import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import MapView from './components/MapView.jsx';
import AddVisitForm from './components/AddVisitForm.jsx';
import VisitList from './components/VisitList.jsx';

function App() {
  const [visits, setVisits] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Load and persist with localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('travel_diary_visits');
      if (raw) setVisits(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('travel_diary_visits', JSON.stringify(visits));
    } catch {}
  }, [visits]);

  function addVisit(v) {
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
    setVisits((prev) => [{ id, ...v }, ...prev]);
    setSelectedId(id);
  }

  function deleteVisit(id) {
    setVisits((prev) => prev.filter((v) => v.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  const sortedVisits = useMemo(() => {
    return [...visits].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [visits]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapView visits={sortedVisits} onSelect={setSelectedId} selectedId={selectedId} />
          </div>
          <div className="lg:col-span-1 space-y-4">
            <AddVisitForm onAdd={addVisit} />
            <VisitList visits={sortedVisits} onSelect={setSelectedId} onDelete={deleteVisit} />
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-sm text-slate-500">
        Built with ❤️ — Keep exploring!
      </footer>
    </div>
  );
}

export default App;
