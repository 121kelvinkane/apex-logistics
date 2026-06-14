"use client";
import { useState } from 'react';
import { X, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-[#00234B]/80 backdrop-blur-sm"
        />
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="bg-[#00234B] p-6 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white flex items-center gap-2"><Lock size={20} className="text-[#FF8C00]" /> Client Portal Login</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
          </div>
          <div className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Client ID / Email</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input type="text" className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="Enter your client ID" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input type="password" className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded text-[#FF8C00] focus:ring-[#FF8C00]" /> Remember me
              </label>
              <a href="#" className="text-[#FF8C00] hover:underline">Forgot password?</a>
            </div>
            <button className="w-full bg-[#FF8C00] text-white font-bold py-3 rounded-md hover:bg-[#E67E00] transition-all shadow-lg shadow-[#FF8C00]/20">
              Secure Login
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              Need a client account? <a href="#quote" onClick={onClose} className="text-[#00234B] font-bold hover:underline">Request Access</a>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}