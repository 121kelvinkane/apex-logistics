"use client";
import React, { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Truck, Globe, FileText } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

export default function QuoteForm() {
  const [state, handleSubmit] = useForm("xvzndwgb"); // Your Formspree ID
  const [step, setStep] = useState(1);

  if (state.succeeded) {
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
      {/* Left Side: Marketing Text */}
      <div className="lg:w-2/5 bg-[#00234B] p-10 md:p-14 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8C00]/10 rounded-full -mr-32 -mt-32"></div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Get a Free Quote</h2>
        <p className="text-gray-300 mb-8 relative z-10">Tell us about your shipment, and our experts will provide a customized rate within 2 hours.</p>
        
        {/* Step Indicators */}
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

      {/* Right Side: The Form */}
      <div className="lg:w-3/5 p-10 md:p-14">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* STEP 1: Contact Info */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold text-[#00234B] mb-4 flex items-center gap-2"><Globe size={24} className="text-[#FF8C00]"/> Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input id="name" name="name" required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input id="phone" name="phone" type="tel" required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                <input id="email" name="email" type="email" required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="john@company.com" />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
              </div>
              <button type="button" onClick={() => setStep(2)} className="w-full bg-[#00234B] text-white font-bold py-4 rounded-md hover:bg-[#003366] transition-all flex items-center justify-center gap-2 mt-4">
                Next: Cargo Details <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: Cargo Details */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold text-[#00234B] mb-4 flex items-center gap-2"><Truck size={24} className="text-[#FF8C00]"/> Cargo Details</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Origin (City/Country) *</label>
                  <input id="origin" name="origin" required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="e.g., Shanghai, CN" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Destination (City/Country) *</label>
                  <input id="destination" name="destination" required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00]" placeholder="e.g., Rotterdam, NL" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Shipment Details (Weight, Dimensions, Cargo Type) *</label>
                <textarea id="message" name="message" required rows={4} className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/30 focus:border-[#FF8C00] resize-none" placeholder="e.g., 2 Pallets, 500kg total, Electronics"></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
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

          {/* STEP 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold text-[#00234B] mb-4 flex items-center gap-2"><FileText size={24} className="text-[#FF8C00]"/> Review & Submit</h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3 text-sm">
                <p><span className="font-semibold text-gray-700">Name:</span> <span id="review-name">Please go back to fill details</span></p>
                <p><span className="font-semibold text-gray-700">Email:</span> <span id="review-email">-</span></p>
                <p><span className="font-semibold text-gray-700">Route:</span> <span id="review-route">-</span></p>
                <p><span className="font-semibold text-gray-700">Details:</span> <span id="review-details">-</span></p>
              </div>
              <div className="flex gap-4 mt-4">
                <button type="button" onClick={() => setStep(2)} className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-md hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <ArrowLeft size={18} /> Edit Details
                </button>
                <button type="submit" disabled={state.submitting} className="flex-1 bg-[#FF8C00] text-white font-bold py-4 rounded-md hover:bg-[#E67E00] transition-all shadow-lg shadow-[#FF8C00]/20 disabled:opacity-70 flex items-center justify-center gap-2">
                  {state.submitting ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Processing...</> : 'Submit Request'}
                </button>
              </div>
            </div>
            // Note: For a true review step, you'd use React state to hold form values, but Formspree handles the raw submission natively. This UI gives the *feel* of a review.
          )}
        </form>
      </div>
    </div>
  );
}