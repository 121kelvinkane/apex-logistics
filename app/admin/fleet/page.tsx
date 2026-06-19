"use client";
import { useState, useEffect } from 'react';
import { Truck as TruckIcon, ArrowLeft, Plus } from 'lucide-react';

export default function FleetPage() {
  const [trucks, setTrucks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ plateNumber: '', model: '', capacity: '' });

  useEffect(() => {
    fetch('/api/trucks')
      .then(res => res.ok ? res.json() : [])
      .then(data => Array.isArray(data) ? setTrucks(data) : setTrucks([]))
      .catch(() => setTrucks([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/trucks', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    });
    if (res.ok) {
      const newTruck = await res.json();
      setTrucks([newTruck, ...trucks]);
      setFormData({ plateNumber: '', model: '', capacity: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/admin" className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"><ArrowLeft /></a>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><TruckIcon className="text-blue-600" /> Fleet Management</h1>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"><Plus size={20} /> Add Truck</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Plate Number" required value={formData.plateNumber} onChange={e => setFormData({...formData, plateNumber: e.target.value})} className="border p-3 rounded-lg" />
            <input type="text" placeholder="Model" required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="border p-3 rounded-lg" />
            <input type="text" placeholder="Capacity (e.g., 20 Tons)" required value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="border p-3 rounded-lg" />
            <button type="submit" className="md:col-span-3 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">Save Truck</button>
          </form>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Plate Number</th>
                <th className="p-4 font-semibold text-gray-600">Model</th>
                <th className="p-4 font-semibold text-gray-600">Capacity</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {trucks.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No trucks added yet. Click "Add Truck" to start!</td></tr>
              ) : (
                trucks.map(truck => (
                  <tr key={truck.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{truck.plateNumber}</td>
                    <td className="p-4 text-gray-600">{truck.model}</td>
                    <td className="p-4 text-gray-600">{truck.capacity}</td>
                    <td className="p-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{truck.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
