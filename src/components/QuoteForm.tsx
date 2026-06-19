"use client";
import React, { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Truck, Globe, FileText } from 'lucide-react';

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    origin: '', destination: '', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[500px]">
        <div className="w-full flex flex-col items-center justify-center text-center p-12 bg-green-50">
          <CheckCircle className="text-green-600 w-20 h-20 mb-6" />
          <h3 className="text-3xl font-bold text-gray-800 mb-3">Quote Request Sent!</h3>
          <p className="text-gray-600 text-lg max-w-md">Thank you! Our logistics experts will review your shipment details and contact you within 2 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
      <div className="lg:w-2/5 bg-[#00234B] p-10 md:p-14 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8C00]/10 rounded-full -mr-32 -mt-32"></div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Get a Free Quote</h2>
        <p className="text-gray-300 mb-8 relative z-10">Tell us about your shipment, and our experts will provide a customized rate within 2 hours.</p>
        <div className="space-y-6 relative z-10 mt-8">
          <div className={`flex items-center gap-4 transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#FF8C00]' : 'bg-gray-600'}`}>1</div>
            <span>Contact Information</span>
          </div>
          <div className={`flex items-center gap-4 transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#FF8C00]' : 'bg-gray-600'}`}>2</div>
            <span>Cargo Details</span>
          </div>
          <div className={`flex items-center gap-4 transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-[#FF8C00]' : 'bg-gray-600'}`}>3</div>
            <span>Review & Submit</span>
          </div>
        </div>
      </div>

      <div className="lg:w-3/5 p-10 md:p-14">
        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold text-[#00234B] mb-4 flex items-center gap-2"><Globe size={24} className="text-[#FF8C00]"/> Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} type="tel" required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="john@company.com" />
              </div>
              <button type="button" onClick={() => setStep(2)} className="w-full bg-[#00234B] text-white font-bold py-4 rounded-md hover:bg-[#003366] transition-all flex items-center justify-center gap-2 mt-4">
                Next: Cargo Details <ArrowRight size={18} />
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold text-[#00234B] mb-4 flex items-center gap-2"><Truck size={24} className="text-[#FF8C00]"/> Cargo Details</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Origin (City/Country) *</label>
                  <input name="origin" value={formData.origin} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="e.g., Shanghai, CN" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Destination (City/Country) *</label>
                  <input name="destination" value={formData.destination} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="e.g., Rotterdam, NL" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Shipment Details (Weight, Dimensions, Cargo Type) *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00] resize-none" placeholder="e.g., 2 Pallets, 500kg total, Electronics"></textarea>
              </div>
              <div className="flex gap-4 mt-4">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-md hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <ArrowLeft size={18} /> Back
                </button>
                <button type="button" onClick={() => setStep(3)} className="flex-1 bg-[#00234B] text-white font-bold py-4 rounded-md hover:bg-[#003366] transition-all flex items-center justify-center gap-2">
                  Review <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold text-[#00234B] mb-4 flex items-center gap-2"><FileText size={24} className="text-[#FF8C00]"/> Review & Submit</h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3 text-sm">
                <p><span className="font-semibold text-gray-700">Name:</span> {formData.name}</p>
                <p><span className="font-semibold text-gray-700">Email:</span> {formData.email}</p>
                <p><span className="font-semibold text-gray-700">Phone:</span> {formData.phone}</p>
                <p><span className="font-semibold text-gray-700">Route:</span> {formData.origin} to {formData.destination}</p>
                <p><span className="font-semibold text-gray-700">Details:</span> {formData.message}</p>
              </div>
              <div className="flex gap-4 mt-4">
                <button type="button" onClick={() => setStep(2)} className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-md hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <ArrowLeft size={18} /> Edit Details
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#FF8C00] text-white font-bold py-4 rounded-md hover:bg-[#E67E00] transition-all shadow-lg shadow-[#FF8C00]/20 disabled:opacity-70 flex items-center justify-center gap-2">
                  {isSubmitting ? <>Processing...</> : 'Submit Request'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
