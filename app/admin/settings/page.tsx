"use client";
import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({ companyName: 'Apex Logistics', email: 'contact@apex.com' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.ok ? res.json() : {})
      .then((data: any) => {
        if (data && data.companyName) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    
    toast.success('Settings saved successfully!');
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#00234B] mb-8">Company Settings</h1>
        
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={settings.companyName || ''}
              onChange={e => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FF8C00]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              value={settings.email || ''}
              onChange={e => setSettings({ ...settings, email: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FF8C00]"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#FF8C00] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#E67E00] flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {isLoading ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </main>
  );
}