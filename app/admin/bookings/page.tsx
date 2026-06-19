"use client";
import { useState, useEffect } from 'react';
import { Package, ArrowLeft, Plus } from 'lucide-react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ customerName: '', origin: '', destination: '', date: '' });

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.ok ? res.json() : [])
      .then(data => Array.isArray(data) ? setBookings(data) : setBookings([]))
      .catch(() => setBookings([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/bookings', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    });
    if (res.ok) {
      const newBooking = await res.json();
      setBookings([newBooking, ...bookings]);
      setFormData({ customerName: '', origin: '', destination: '', date: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/admin" className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"><ArrowLeft /></a>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><Package className="text-blue-600" /> Bookings</h1>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"><Plus size={20} /> Add Booking</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Customer Name" required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="border p-3 rounded-lg" />
            <input type="date" placeholder="Date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="border p-3 rounded-lg" />
            <input type="text" placeholder="Origin" required value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="border p-3 rounded-lg" />
            <input type="text" placeholder="Destination" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="border p-3 rounded-lg" />
            <button type="submit" className="md:col-span-2 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">Save Booking</button>
          </form>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Customer</th>
                <th className="p-4 font-semibold text-gray-600">Route</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No bookings added yet. Click "Add Booking" to start!</td></tr>
              ) : (
                bookings.map(booking => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{booking.customerName}</td>
                    <td className="p-4 text-gray-600">{booking.origin} to {booking.destination}</td>
                    <td className="p-4 text-gray-600">{booking.date}</td>
                    <td className="p-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">{booking.status}</span></td>
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
