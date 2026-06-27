"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      toast.success('Access Granted!');
      router.push('/admin');
    } else {
      setError('Incorrect password. Access denied.');
      toast.error('Incorrect password.');
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#00234B] p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#FF8C00] p-4 rounded-full mb-4"><Lock className="text-white" size={32} /></div>
          <h1 className="text-2xl font-bold text-[#00234B]">Admin Access</h1>
          <p className="text-gray-500 text-sm">Enter the master password to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Master Password" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none" required />
          {error && <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm"><AlertCircle size={16} /> {error}</div>}
          <button type="submit" disabled={isLoading} className="w-full bg-[#00234B] text-white py-3 rounded-lg font-bold hover:bg-[#003366] transition-colors disabled:opacity-50">
            {isLoading ? 'Verifying...' : 'Unlock Dashboard'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">Hint: The password is in your .env file.</p>
      </div>
    </main>
  );
}