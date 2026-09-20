// src/components/Footer.jsx
import { Mail, MapPin, Phone, GraduationCap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: 'All Scholarships', level: 'all' },
    { label: 'Bachelor',         level: 'Bachelor' },
    { label: 'Master',           level: 'Master' },
    { label: 'PhD',              level: 'PhD' },
    { label: 'MBA',              level: 'MBA' },
  ];

  const resources = [
    { label: 'How to Apply',     to: '/how-to-apply' },
    { label: 'Scholarship Tips', to: '/scholarship-tips' },
    { label: 'FAQ',              to: '/faq' },
    { label: 'Contact',          to: '/contact' },
    { label: 'Privacy Policy',   to: '/privacy-policy' },
  ];

  return (
    <footer className="bg-[#0f1115] text-[#8a929f] border-t border-[#1e2026] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#f7f8fa] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[#0f1115]" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-[#f7f8fa] text-base tracking-[-0.02em]">
                Kosovo Scholarships
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Aggregated daily from six official sources. A single place to find
              every scholarship worth applying to.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14161b] border border-[#242832]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] font-medium text-[#98a2b0]">
                Updated daily
              </span>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[10px] font-bold text-[#f7f8fa] mb-5 uppercase tracking-[0.15em]">
              Browse
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ label, level }) => (
                <li key={level}>
                  <button
                    onClick={() => window.open(`${window.location.origin}?level=${level}`, '_blank')}
                    className="hover:text-[#f7f8fa] transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[10px] font-bold text-[#f7f8fa] mb-5 uppercase tracking-[0.15em]">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              {resources.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-[#f7f8fa] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h3 className="text-[10px] font-bold text-[#f7f8fa] mb-5 uppercase tracking-[0.15em]">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#5a6270]" />
                <span>Kosovo</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#5a6270]" />
                <a href="mailto:mehanagenta@gmail.com" className="hover:text-[#f7f8fa] transition-colors break-all">
                  mehanagenta@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#5a6270]" />
                <a href="tel:+38349427478" className="hover:text-[#f7f8fa] transition-colors">
                  +383 49 427 478
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#1e2026] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <p>© {year} Kosovo Scholarships. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built by
            <span className="text-[#f7f8fa] font-medium">Gentiana Mehana</span>
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;