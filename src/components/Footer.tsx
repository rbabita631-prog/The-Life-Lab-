import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Apple, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight">Life Lab</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg font-medium">
              India's Premier institution established with the sole aim to initiate, enable and empower individuals to grow up to be extraordinary professionals.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-blue-600 transition-all hover:-translate-y-1 shadow-md">
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-black mb-8 tracking-tight">Quick Links</h4>
            <ul className="space-y-4">
              {['Paid Courses', 'Free Test Series', 'Free Quiz', 'Class Notes', 'Current Affairs', 'Previous Year'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group font-medium">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xl font-black mb-8 tracking-tight">Legal</h4>
            <ul className="space-y-4">
              {['Terms & Conditions', 'Privacy Policy', 'Refunds & Cancellation Policy', 'About Us', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group font-medium">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
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
                  <p className="text-gray-400 font-medium">support@lifelab.com</p>
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
          <p>© 2026 Life Lab. All rights reserved.</p>
          <p>Designed with ❤️ for Future Professionals</p>
        </div>
      </div>
    </footer>
  );
}
