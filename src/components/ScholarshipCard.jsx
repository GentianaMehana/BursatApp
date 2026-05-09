// src/components/ScholarshipCard.jsx
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, MapPin, BookOpen, Clock, ChevronRight, Share2, Check, Link as LinkIcon, Mail, ExternalLink, Award } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';

const ScholarshipCard = ({ scholarship, index }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [viewStartTime, setViewStartTime] = useState(null);

  // Gjurmo kohën e shikimit të kartelës
  useEffect(() => {
    if (isHovered) {
      setViewStartTime(Date.now());
    } else if (viewStartTime) {
      const viewDuration = Math.round((Date.now() - viewStartTime) / 1000);
      if (viewDuration >= 5) {
        ReactGA.event({
          category: 'Scholarship',
          action: 'Card View Duration',
          label: scholarship.title,
          value: viewDuration
        });
      }
      setViewStartTime(null);
    }
  }, [isHovered, scholarship.title, viewStartTime]);

  const getDeadlineStatus = (deadline) => {
    if (!deadline || deadline === 'Check announcement' || deadline === 'Check website') {
      return { text: 'Check website', color: 'gray', days: null };
    }
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { text: 'Closed', color: 'red', days: 0 };
    if (daysLeft < 7) return { text: 'Urgent!', color: 'orange', days: daysLeft };
    if (daysLeft < 30) return { text: 'Soon', color: 'yellow', days: daysLeft };
    return { text: 'Active', color: 'green', days: daysLeft };
  };

  const deadlineStatus = getDeadlineStatus(scholarship.deadline);

  const getShortDuration = (duration) => {
    if (!duration || duration === 'Check announcement') return null;
    
    const shortPatterns = [
      /(\d+)\s*[-–]\s*(\d+)\s*(months?|years?|weeks?)/i,
      /(\d+)\s*(months?|years?|weeks?)/i,
      /approx\.?\s*(\d+)\s*(months?|years?|weeks?)/i,
      /up to (\d+)\s*(months?|years?|weeks?)/i,
      /(\d+)\s*[-–]\s*(\d+)\s*(days?)/i,
      /(\d+)\s*(days?)/i,
    ];
    
    for (const pattern of shortPatterns) {
      const match = duration.match(pattern);
      if (match) {
        return match[0];
      }
    }
    
    return duration.length > 60 ? duration.substring(0, 60) + '...' : duration;
  };

  // ============================================
  // FUNKSIONET ME GOOGLE ANALYTICS
  // ============================================

  // ✅ KLIKIMI NË KARTELË (VIEW ITEM)
  const handleCardClick = () => {
    ReactGA.event({
      category: 'Scholarship',
      action: 'View Details',
      label: scholarship.title,
      value: scholarship.id
    });
    navigate(`/scholarship/${scholarship.id}`);
  };

  // ✅ TË PREFERUARAT (FAVORITE)
  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    ReactGA.event({
      category: 'Engagement',
      action: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
      label: scholarship.title,
      value: 1
    });
    
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  // ✅ HAPJA E MENYSË PËR SHARE
  const handleShare = (e) => {
    e.stopPropagation();
    setIsShareOpen(!isShareOpen);
    
    ReactGA.event({
      category: 'Engagement',
      action: 'Open Share Menu',
      label: scholarship.title,
      value: 1
    });
  };

  // ✅ KOPJIMI I LINK-UT
  const copyToClipboard = async (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/scholarship/${scholarship.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      ReactGA.event({
        category: 'Share',
        action: 'Copy Link',
        label: scholarship.title,
        value: 1
      });
      
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  // ✅ NDARJA NË RRJETET SOCIALE
  const shareToSocial = (platform, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/scholarship/${scholarship.id}`;
    const text = `Check out this scholarship: ${scholarship.title}`;
    
    ReactGA.event({
      category: 'Share',
      action: `Share to ${platform}`,
      label: scholarship.title,
      value: 1
    });
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Scholarship Opportunity')}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setIsShareOpen(false);
  };

  // ✅ KLIKIMI NË BUTONIN APPLY NOW
  const handleApplyClick = (e) => {
    e.stopPropagation();
    
    ReactGA.event({
      category: 'Conversion',
      action: 'Click Apply Now',
      label: scholarship.title,
      value: 1
    });
    
    window.open(scholarship.official_link || scholarship.contact_website, '_blank');
  };

  const getLevelColor = (level) => {
    const colors = {
      'Bachelor': 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
      'Master': 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
      'PhD': 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
      'MBA': 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
      'High School': 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300',
    };
    return colors[level] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  };

  const displayLevels = scholarship.level?.slice(0, 2) || [];

  return (
    <div
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-2 relative"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      
      <div className="p-5">
        {/* Header - Levels and Action Buttons */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-2">
            {displayLevels.map((level, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 ${getLevelColor(level)} text-xs rounded-full font-semibold shadow-sm`}
              >
                {level}
              </span>
            ))}
            {scholarship.level?.length > 2 && (
              <span className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-semibold">
                +{scholarship.level.length - 2}
              </span>
            )}
          </div>
          
          <div className="flex gap-1">
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4 text-gray-500 hover:text-blue-500 transition-colors" />
              </button>
              
              {isShareOpen && (
                <>
                  <div 
                    className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-20 min-w-[170px] animate-in fade-in zoom-in duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={copyToClipboard}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                      <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button
                      onClick={(e) => shareToSocial('facebook', e)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <FaFacebook className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Facebook</span>
                    </button>
                    <button
                      onClick={(e) => shareToSocial('twitter', e)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <FaTwitter className="w-4 h-4 text-sky-500" />
                      <span className="text-sm">Twitter / X</span>
                    </button>
                    <button
                      onClick={(e) => shareToSocial('linkedin', e)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <FaLinkedin className="w-4 h-4 text-blue-700" />
                      <span className="text-sm">LinkedIn</span>
                    </button>
                    <button
                      onClick={(e) => shareToSocial('whatsapp', e)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <FaWhatsapp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">WhatsApp</span>
                    </button>
                    <button
                      onClick={(e) => shareToSocial('email', e)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Email</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <button
              onClick={handleFavorite}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
              aria-label="Favorite"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  isFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400 hover:text-red-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {scholarship.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
          {scholarship.description?.substring(0, 120) || 'No description available'}...
        </p>

        {/* Details Grid */}
        <div className="space-y-1.5 mb-3">
          {scholarship.country && scholarship.country[0] !== 'Global' && scholarship.country[0] !== 'Check announcement' && (
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{scholarship.country?.slice(0, 2).join(', ')}</span>
            </div>
          )}
          
          {scholarship.field_of_study && scholarship.field_of_study.length > 0 && scholarship.field_of_study[0] !== 'Check announcement' && (
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{scholarship.field_of_study?.slice(0, 1).join(', ')}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span>
                {scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString('en-US') : 'Check website'}
              </span>
            </div>
            
            {deadlineStatus.days !== null && deadlineStatus.days > 0 && (
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full bg-${deadlineStatus.color}-500`} />
                <span className="text-xs font-medium" style={{ color: deadlineStatus.color === 'orange' ? '#f97316' : deadlineStatus.color === 'yellow' ? '#ca8a04' : deadlineStatus.color === 'green' ? '#16a34a' : '#dc2626' }}>
                  {deadlineStatus.days} days left
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer with CTA */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
          {scholarship.scholarship_value && scholarship.scholarship_value !== 'Check announcement' && (
            <div className="mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-lg font-semibold">
                <Award className="w-3 h-3" />
                {scholarship.scholarship_value.length > 40 
                  ? scholarship.scholarship_value.substring(0, 40) + '...'
                  : scholarship.scholarship_value}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            {scholarship.duration && scholarship.duration !== 'Check announcement' && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {getShortDuration(scholarship.duration)}
                </span>
              </div>
            )}
            <button
              onClick={handleApplyClick}
              className={`flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:gap-2 transition-all group/btn text-sm font-medium flex-shrink-0 ${!scholarship.duration || scholarship.duration === 'Check announcement' ? 'ml-auto' : ''}`}
            >
              <span>Apply</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {isShareOpen && (
        <div 
          className="fixed inset-0 z-10"
          onClick={(e) => {
            e.stopPropagation();
            setIsShareOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ScholarshipCard;