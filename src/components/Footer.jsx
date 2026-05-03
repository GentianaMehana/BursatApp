import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleQuickLink = (level) => {
    const url = `${window.location.origin}?level=${level}`;
    console.log('Opening URL:', url);
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Kosovo Scholarships
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The #1 platform for scholarships in Kosovo. We aggregate scholarships from 6 different sources to help students find their ideal opportunity.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => handleQuickLink('all')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  All Scholarships
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('Bachelor')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Bachelor Scholarships
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('Master')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Master Scholarships
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('PhD')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  PhD Scholarships
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('MBA')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  MBA Programs
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/how-to-apply" className="hover:text-blue-400 transition-colors">How to Apply</Link></li>
              <li><Link to="/scholarship-tips" className="hover:text-blue-400 transition-colors">Scholarship Tips</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Kosovo</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:mehanagenta@gmail.com" className="hover:text-blue-400">mehanagenta@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:+38349427478" className="hover:text-blue-400">+383 49 427 478</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {currentYear} Kosovo Scholarships. All rights reserved.</p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Gentiana Mehana
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;