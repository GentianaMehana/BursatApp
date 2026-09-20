// src/components/ScholarshipCard.jsx
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, MapPin, Share2, Check, Link as LinkIcon, ArrowUpRight, Bookmark } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useState } from 'react';
import ReactGA from 'react-ga4';
import { levelColors, deadlineColors } from '../lib/design';

const ScholarshipCard = ({ scholarship }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getDeadline = (d) => {
    if (!d || ['Check announcement', 'Check website'].includes(d)) return { key: 'closed', days: null };
    const days = Math.ceil((new Date(d) - new Date()) / 86400000);
    if (days < 0) return { key: 'closed', days: 0 };
    if (days < 7) return { key: 'urgent', days };
    if (days < 30) return { key: 'soon', days };
    return { key: 'active', days };
  };

  const deadline = getDeadline(scholarship.deadline);
  const statusColor = deadlineColors[deadline.key];
  const url = `${window.location.origin}/scholarship/${scholarship.id}`;

  const handleCardClick = () => {
    ReactGA.event({ category: 'Scholarship', action: 'View Details', label: scholarship.title });
    navigate(`/scholarship/${scholarship.id}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Saved to favorites');
  };

  const copyLink = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied');
      setTimeout(() => setCopied(false), 1500);
    } catch { toast.error('Failed to copy'); }
  };

  const shareTo = (platform, e) => {
    e.stopPropagation();
    const text = `Check out this scholarship: ${scholarship.title}`;
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter:  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
    setIsShareOpen(false);
  };

  const levels = scholarship.level?.slice(0, 2) || [];

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-[#0d0e12] rounded-2xl border border-[#e4e6eb] dark:border-[#1e2026] p-5 cursor-pointer transition-all duration-200 hover:border-[#0f1115] dark:hover:border-[#f7f8fa]/40 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-1.5">
          {levels.map((lvl, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-md ring-1 ring-inset ${levelColors[lvl] || 'bg-slate-100 text-slate-600 ring-slate-300/30 dark:bg-slate-800 dark:text-slate-400'}`}
            >
              {lvl}
            </span>
          ))}
          {scholarship.level?.length > 2 && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-md bg-[#f2f3f5] dark:bg-[#1a1c22] text-[#6a7280] dark:text-[#5a6270]">
              +{scholarship.level.length - 2}
            </span>
          )}
        </div>

        <div className="flex items-center gap-0.5 flex-shrink-0 -mt-1 -mr-1">
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setIsShareOpen(!isShareOpen); }}
              aria-label="Share"
              className="p-1.5 rounded-lg text-[#8a929f] hover:text-[#0f1115] dark:hover:text-[#f7f8fa] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {isShareOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsShareOpen(false); }} />
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#14161b] rounded-xl shadow-[0_16px_40px_-12px_rgba(15,17,21,0.20)] border border-[#e4e6eb] dark:border-[#242832] py-1 z-20 animate-scale-in"
                >
                  <button onClick={copyLink} className="w-full px-3 py-2 text-left text-sm hover:bg-[#f7f8fa] dark:hover:bg-[#1a1c22] flex items-center gap-2.5 text-[#4a5160] dark:text-[#98a2b0]">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <LinkIcon className="w-3.5 h-3.5 text-[#8a929f]" />}
                    <span>{copied ? 'Copied' : 'Copy link'}</span>
                  </button>
                  <div className="h-px bg-[#e4e6eb] dark:bg-[#242832] my-1" />
                  {[
                    { key: 'facebook', label: 'Facebook', Icon: FaFacebook, color: 'text-blue-600' },
                    { key: 'twitter',  label: 'X / Twitter', Icon: FaTwitter, color: 'text-sky-500' },
                    { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin, color: 'text-blue-700' },
                    { key: 'whatsapp', label: 'WhatsApp', Icon: FaWhatsapp, color: 'text-green-500' },
                  ].map(({ key, label, Icon, color }) => (
                    <button
                      key={key}
                      onClick={(e) => shareTo(key, e)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-[#f7f8fa] dark:hover:bg-[#1a1c22] flex items-center gap-2.5 text-[#4a5160] dark:text-[#98a2b0]"
                    >
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleFavorite}
            aria-label="Favorite"
            className="p-1.5 rounded-lg text-[#8a929f] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22] transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
      </div>

      <h3 className="text-[15px] font-bold text-[#0f1115] dark:text-[#f7f8fa] mb-2 line-clamp-2 leading-snug tracking-[-0.01em]">
        {scholarship.title}
      </h3>

      <p className="text-[13px] text-[#6a7280] dark:text-[#5a6270] line-clamp-2 mb-5 leading-relaxed">
        {scholarship.description?.substring(0, 120) || 'No description available'}...
      </p>

      <div className="space-y-2 mb-5">
        {scholarship.country?.[0] && !['Global', 'Check announcement'].includes(scholarship.country[0]) && (
          <div className="flex items-center gap-2 text-xs text-[#6a7280] dark:text-[#5a6270]">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{scholarship.country.slice(0, 2).join(', ')}</span>
          </div>
        )}
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#6a7280] dark:text-[#5a6270]">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              {scholarship.deadline
                ? new Date(scholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Check website'}
            </span>
          </div>
          {deadline.days > 0 && (
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`} />
              <span className={`font-semibold ${statusColor.text} tabular-nums`}>{deadline.days}d left</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-[#e4e6eb] dark:border-[#1e2026] flex items-center justify-between gap-3">
        <div className="min-w-0">
          {scholarship.scholarship_value && scholarship.scholarship_value !== 'Check announcement' ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f1115] dark:text-[#f7f8fa] min-w-0">
              <Bookmark className="w-3.5 h-3.5 flex-shrink-0 text-[#4a5160] dark:text-[#98a2b0]" />
              <span className="truncate max-w-[150px]">
                {scholarship.scholarship_value.length > 30
                  ? scholarship.scholarship_value.slice(0, 30) + '…'
                  : scholarship.scholarship_value}
              </span>
            </span>
          ) : (
            <span className="text-xs text-[#8a929f]">Details on site</span>
          )}
        </div>

        <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f1115] dark:text-[#f7f8fa] group-hover:text-[#3b82f6] dark:group-hover:text-[#60a5fa] transition-colors flex-shrink-0">
          View
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </article>
  );
};

export default ScholarshipCard;