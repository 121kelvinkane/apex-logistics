"use client";

import { useState, useEffect } from 'react';
import { 
  Truck, Package, Users, DollarSign, TrendingUp, 
  LayoutDashboard, Settings, LogOut, Bell, 
  ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

export default function AdminDashboard() {
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/quotes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecentQuotes(data);
        } else {
          setRecentQuotes([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch quotes:", err);
        setRecentQuotes([]);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">Apex Admin</div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/admin" className="flex items-center gap-3 px-4 py-2 bg-blue-600 rounded-lg font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="/admin/fleet" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Truck size={20} /> Fleet
          </a>
          <a href="/admin/bookings" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Package size={20} /> Bookings
          </a>
          <a href="/admin/customers" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Users size={20} /> Customers
          </a>
          <a href="/admin/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings size={20} /> Settings
          </a>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <a href="/" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
            <LogOut size={20} /> Back to Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between z-10">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm">Total Quotes</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{recentQuotes.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {recentQuotes.filter(q => q.status === 'Pending').length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm">In Progress</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {recentQuotes.filter(q => q.status === 'In Progress').length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm">Completed</h3>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {recentQuotes.filter(q => q.status === 'Completed').length}
              </p>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={20} /> Real Customer Quotes
            </h2>
            
            {recentQuotes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No quotes yet. Submit one from the main website!</p>
            ) : (
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{quote.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Moving from <span className="font-semibold">{quote.moveFrom}</span> to <span className="font-semibold">{quote.moveTo}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        quote.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        quote.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {quote.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

