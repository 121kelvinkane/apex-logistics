import { Globe, MapPin, Phone, Mail } from 'lucide-react';

// Inline SVGs for brand icons (100% reliable, no dependency issues)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#001A38] text-gray-400 py-16 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Globe className="text-[#FF8C00] h-6 w-6" />
              <span className="text-xl font-bold text-white">APEX <span className="text-[#FF8C00]">LOGISTICS</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6">Empowering global trade with reliable, transparent, and secure freight forwarding solutions since 2014.</p>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#FF8C00] hover:text-white transition-all duration-300"><FacebookIcon /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#FF8C00] hover:text-white transition-all duration-300"><TwitterIcon /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#FF8C00] hover:text-white transition-all duration-300"><LinkedinIcon /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#FF8C00] hover:text-white transition-all duration-300"><InstagramIcon /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Our Services', 'Shipment Tracking', 'Privacy Policy'].map((link) => (
                <li key={link}><a href="#" className="hover:text-[#FF8C00] transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {['Air Freight', 'Ocean Freight', 'Road Transportation', 'Warehousing', 'Customs Brokerage'].map((link) => (
                <li key={link}><a href="#" className="hover:text-[#FF8C00] transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><MapPin className="text-[#FF8C00] flex-shrink-0 mt-1" size={18} /><span className="text-sm">123 Global Trade Blvd, Suite 400<br />New York, NY 10001</span></li>
              <li className="flex items-center gap-3"><Phone className="text-[#FF8C00] flex-shrink-0" size={18} /><span className="text-sm">+1 (800) 123-4567</span></li>
              <li className="flex items-center gap-3"><Mail className="text-[#FF8C00] flex-shrink-0" size={18} /><span className="text-sm">solutions@apexlogistics.com</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Apex Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}