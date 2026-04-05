import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Apple, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const quickLinks = [
    { name: 'Courses', href: '/courses' },
    { name: 'Test', href: '/test' },
    { name: 'Daily Quiz', href: '/quiz' },
    { name: 'Notes', href: '/notes' },
    { name: 'Previous Year', href: '/notes' },
  ];

  const legalLinks = [
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Refunds & Cancellation Policy', href: '#' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-1 rounded-2xl shadow-lg overflow-hidden">
                <img src="/logo.png" alt="Nursing Odyssey Logo" className="h-12 w-12 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight uppercase">Nursing Odyssey</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg font-medium">
              Your Voyage from Aspirant to Officer. India's Premier institution established with the sole aim to initiate, enable and empower individuals to grow up to be extraordinary professionals.
            </p>
            <div className="flex gap-4">
              <a href="https://www.youtube.com/@TheLifeLab111" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-xl hover:bg-red-600 transition-all hover:-translate-y-1 shadow-md">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://t.me/thelifelab1" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-1 shadow-md">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.526.26l.214-3.04 5.53-4.995c.24-.21-.054-.327-.37-.118l-6.84 4.305-2.94-.92c-.64-.2-.65-.64.134-.946l11.49-4.428c.53-.196.994.12.802.95z"/>
                </svg>
              </a>
              <a href="https://instagram.com/thelife" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-xl hover:bg-pink-600 transition-all hover:-translate-y-1 shadow-md">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-blue-600 transition-all hover:-translate-y-1 shadow-md">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-black mb-8 tracking-tight">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group font-medium">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xl font-black mb-8 tracking-tight">Legal</h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group font-medium">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & App */}
          <div className="space-y-10">
            <div>
              <h4 className="text-xl font-black mb-8 tracking-tight">Contact Us</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/10 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-gray-400 font-medium">123, Education Hub, New Delhi, India - 110001</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600/10 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-gray-400 font-medium">+91 98765 43210</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600/10 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-gray-400 font-medium">support@nursingodyssey.com</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black mb-8 tracking-tight">Download App</h4>
              <div className="flex flex-col gap-4">
                <button className="bg-white text-gray-900 px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-100 transition-all shadow-xl font-bold">
                  <Play className="h-6 w-6 fill-current" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest leading-none">Get it on</p>
                    <p className="text-lg leading-none mt-1">Google Play</p>
                  </div>
                </button>
                <button className="bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-700 transition-all shadow-xl font-bold border border-gray-700">
                  <Apple className="h-6 w-6 fill-current" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest leading-none">Download on the</p>
                    <p className="text-lg leading-none mt-1">App Store</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm font-bold uppercase tracking-widest">
          <p>© 2026 Nursing Odyssey. All rights reserved.</p>
          <p>Your Voyage from Aspirant to Officer</p>
        </div>
      </div>
    </footer>
  );
}
