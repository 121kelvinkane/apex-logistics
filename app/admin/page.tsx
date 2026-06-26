"use client";
import { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, AlertCircle, Plus, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: string;
  progress: number;
}

export default function AdminDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Form states
  const [newId, setNewId] = useState('');
  const [newOrigin, setNewOrigin] = useState('');
  const [newDest, setNewDest] = useState('');

  const fetchShipments = async () => {
    setIsLoading(true);
    const res = await fetch('/api/shipments');
    const data = await res.json();
    setShipments(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId || !newOrigin || !newDest) return;

    await fetch('/api/shipments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: newId, origin: newOrigin, destination: newDest }),
    });

    setNewId(''); setNewOrigin(''); setNewDest('');
    setShowCreateForm(false);
    fetchShipments();
  };

  const handleUpdateProgress = async (id: string, newProgress: number) => {
    let newStatus = 'Departed Origin Facility';
    if (newProgress >= 100) newStatus = 'Delivered!';
    else if (newProgress >= 75) newStatus = 'Out for Delivery';
    else if (newProgress >= 45) newStatus = 'In Transit - Ocean/Air';
    else if (newProgress >= 15) newStatus = 'Arrived at Destination Hub';

    await fetch('/api/shipments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, progress: newProgress, status: newStatus }),
    });
    fetchShipments();
  };

  // Calculate Stats
  const totalShipments = shipments.length;
  const inTransit = shipments.filter(s => s.progress > 0 && s.progress < 100).length;
  const delivered = shipments.filter(s => s.progress >= 100).length;

  return (
    <main className="font-sans bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#00234B] text-white p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Package className="text-[#FF8C00]" /> APEX
        </h2>
        <nav className="flex-1 space-y-2">
          <a href="/admin" className="block py-3 px-4 bg-[#FF8C00] rounded-lg font-semibold">Dashboard</a>
          <a href="/" className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors">View Website</a>
          <a href="/tracking" className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors">Tracking Page</a>
        </nav>
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mt-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#00234B]">Admin Dashboard</h1>
            <p className="text-gray-500">Manage all global shipments and tracking data.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchShipments} className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-[#00234B]">
              <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-[#FF8C00] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#E67E00] flex items-center gap-2">
              <Plus size={20} /> New Shipment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Package size={24} /></div>
            <div><p className="text-sm text-gray-500">Total Shipments</p><p className="text-3xl font-bold text-[#00234B]">{totalShipments}</p></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-[#FF8C00] rounded-lg"><Truck size={24} /></div>
            <div><p className="text-sm text-gray-500">In Transit</p><p className="text-3xl font-bold text-[#00234B]">{inTransit}</p></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><CheckCircle size={24} /></div>
            <div><p className="text-sm text-gray-500">Delivered</p><p className="text-3xl font-bold text-[#00234B]">{delivered}</p></div>
          </div>
        </div>

        {/* Create Form (Toggleable) */}
        {showCreateForm && (
          <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tracking ID</label>
              <input type="text" value={newId} onChange={e => setNewId(e.target.value)} placeholder="APX-12345" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#FF8C00]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Origin City</label>
              <input type="text" value={newOrigin} onChange={e => setNewOrigin(e.target.value)} placeholder="Tokyo, Japan" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#FF8C00]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Destination City</label>
              <input type="text" value={newDest} onChange={e => setNewDest(e.target.value)} placeholder="Paris, France" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#FF8C00]" required />
            </div>
            <button type="submit" className="bg-[#00234B] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#003366]">Create</button>
          </form>
        )}

        {/* Shipments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[#00234B]">Active Shipments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="p-4">Tracking ID</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-4 font-mono font-bold text-[#00234B]">{s.id}</td>
                    <td className="p-4 text-sm text-gray-600">{s.origin} → {s.destination}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${s.progress >= 100 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-[#FF8C00]'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4 w-48">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#FF8C00] h-2 rounded-full" style={{ width: `${s.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-gray-500 w-8">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => handleUpdateProgress(s.id, Math.min(s.progress + 25, 100))} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 font-semibold">+25%</button>
                      <button onClick={() => handleUpdateProgress(s.id, 100)} className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded hover:bg-green-100 font-semibold">Deliver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {shipments.length === 0 && !isLoading && (
              <div className="p-10 text-center text-gray-500">No shipments found. Click "New Shipment" to create one.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}