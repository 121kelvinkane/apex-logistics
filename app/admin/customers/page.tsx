"use client";
import { useState, useEffect } from 'react';
import { Users, ArrowLeft, Plus } from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.ok ? res.json() : [])
      .then(data => Array.isArray(data) ? setCustomers(data) : setCustomers([]))
      .catch(() => setCustomers([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/customers', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    });
    if (res.ok) {
      const newCustomer = await res.json();
      setCustomers([newCustomer, ...customers]);
      setFormData({ name: '', email: '', phone: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/admin" className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"><ArrowLeft /></a>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><Users className="text-blue-600" /> Customers</h1>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"><Plus size={20} /> Add Customer</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-3 rounded-lg" />
            <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="border p-3 rounded-lg" />
            <input type="tel" placeholder="Phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="border p-3 rounded-lg" />
            <button type="submit" className="md:col-span-3 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">Save Customer</button>
          </form>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Phone</th>
                <th className="p-4 font-semibold text-gray-600">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No customers added yet. Click "Add Customer" to start!</td></tr>
              ) : (
                customers.map(customer => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{customer.name}</td>
                    <td className="p-4 text-gray-600">{customer.email}</td>
                    <td className="p-4 text-gray-600">{customer.phone}</td>
                    <td className="p-4 text-gray-400 text-sm">{new Date(customer.createdAt).toLocaleDateString()}</td>
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
