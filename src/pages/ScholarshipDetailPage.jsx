import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Calendar, MapPin, BookOpen, Mail, Phone, Globe, ExternalLink, Heart, Share2, Clock, Award, Users, FileText, Check, Link as LinkIcon } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import ReactGA from 'react-ga4';

const ScholarshipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchScholarship();
    window.scrollTo(0, 0);
    
    if (typeof ReactGA?.ga === 'function') {
      ReactGA.send({
        hitType: "pageview",
        page: `/scholarship/${id}`
      });
    }
  }, [id]);

  const fetchScholarship = async () => {
    try {
      const { data, error } = await supabase
        .from('bursat')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data.contact_email) {
        data.contact_email = data.contact_email.replace('mailto:', '').trim();
      }
      
      setScholarship(data);
      
      if (typeof ReactGA?.ga === 'function' && data) {
        ReactGA.event({
          category: 'Scholarship',
          action: 'View Details',
          label: data.title,
          value: data.id
        });
      }
    } catch (error) {
      console.error('Error fetching scholarship:', error);
      toast.error('Scholarship not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    if (typeof ReactGA?.ga === 'function') {
      ReactGA.event({
        category: 'Scholarship',
        action: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
        label: scholarship?.title,
        value: scholarship?.id
      });
    }
    
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    setIsShareOpen(!isShareOpen);
    
    if (typeof ReactGA?.ga === 'function') {
      ReactGA.event({
        category: 'Share',
        action: 'Open Share Menu',
        label: scholarship?.title,
        value: scholarship?.id
      });
    }
  };

  const copyToClipboard = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      if (typeof ReactGA?.ga === 'function') {
        ReactGA.event({
          category: 'Share',
          action: 'Copy Link',
          label: scholarship?.title,
          value: scholarship?.id
        });
      }
      
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareToSocial = (platform) => {
    const url = window.location.href;
    const text = `Check out this scholarship: ${scholarship?.title}`;
    
    if (typeof ReactGA?.ga === 'function') {
      ReactGA.event({
        category: 'Share',
        action: `Share to ${platform}`,
        label: scholarship?.title,
        value: scholarship?.id
      });
    }
    
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

  const handleApplyClick = () => {
    if (typeof ReactGA?.ga === 'function') {
      ReactGA.event({
        category: 'Scholarship',
        action: 'Click Apply Now',
        label: scholarship?.title,
        value: scholarship?.id
      });
    }
    
    const applyUrl = scholarship?.official_link || scholarship?.contact_website;
    if (applyUrl) {
      window.open(applyUrl, '_blank');
    } else {
      toast.error('No application link available');
    }
  };

  const formatDescription = (text) => {
    if (!text) return 'No description available.';
    
    let formatted = text;
    
    formatted = formatted.replace(/(articles\.php\?cid=17&t=Accreditation-and-recognition\s*)+/gi, '');
    formatted = formatted.replace(/articles\.php\?cid=17&t=[^\s]+/gi, '');
    formatted = formatted.replace(/\s+articles\.php\?cid=\d+&t=[^\s]+/gi, '');
    
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline break-all">$1</a>');
    
    formatted = formatted.replace(/(https?:\/\/[^\s<]+)(?![^<]*<\/a>)/g, function(url) {
      if (url.includes('.jpg') || url.includes('.png') || url.includes('.gif')) {
        return url;
      }
      const displayUrl = url.length > 60 ? url.substring(0, 57) + '...' : url;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline break-all">${displayUrl}</a>`;
    });
    
    formatted = formatted.replace(/\n/g, '<br/>');
    
    return formatted;
  };

  const isValidDate = (deadline) => {
    if (!deadline) return false;
    if (deadline === 'Check announcement' || deadline === 'Check website') return false;
    const date = new Date(deadline);
    return !isNaN(date.getTime());
  };

  const formatDeadline = (deadline) => {
    if (!isValidDate(deadline)) return null;
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDeadlineStatus = (deadline) => {
    if (!isValidDate(deadline)) {
      return { text: 'Check website', color: 'gray', icon: Clock, showStatus: false };
    }
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { text: 'Closed', color: 'red', icon: Clock, showStatus: true };
    if (daysLeft < 7) return { text: `Urgent! ${daysLeft} days left`, color: 'orange', icon: Clock, showStatus: true };
    if (daysLeft < 30) return { text: `${daysLeft} days left`, color: 'yellow', icon: Clock, showStatus: true };
    return { text: `${daysLeft} days left`, color: 'green', icon: Clock, showStatus: true };
  };

  if (loading) return <LoadingSpinner />;
  if (!scholarship) return null;

  const deadlineStatus = getDeadlineStatus(scholarship.deadline);
  const DeadlineIcon = deadlineStatus.icon;
  const formattedDeadline = formatDeadline(scholarship.deadline);
  const hasValidDeadline = isValidDate(scholarship.deadline);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to all scholarships</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-full font-semibold">
                    {scholarship.source_name}
                  </span>
                  {scholarship.level && scholarship.level.length > 0 ? (
                    scholarship.level.map((lvl, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full font-semibold">
                        {lvl}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm rounded-full">
                      Check level
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    {isShareOpen && (
                      <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-20 min-w-[180px]">
                        <button onClick={copyToClipboard} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
                          {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                          <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                        <button onClick={() => shareToSocial('facebook')} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
                          <FaFacebook className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Facebook</span>
                        </button>
                        <button onClick={() => shareToSocial('twitter')} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
                          <FaTwitter className="w-4 h-4 text-sky-500" />
                          <span className="text-sm">Twitter</span>
                        </button>
                        <button onClick={() => shareToSocial('linkedin')} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
                          <FaLinkedin className="w-4 h-4 text-blue-700" />
                          <span className="text-sm">LinkedIn</span>
                        </button>
                        <button onClick={() => shareToSocial('whatsapp')} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
                          <FaWhatsapp className="w-4 h-4 text-green-500" />
                          <span className="text-sm">WhatsApp</span>
                        </button>
                        <button onClick={() => shareToSocial('email')} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
                          <MdEmail className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">Email</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <button onClick={handleFavorite} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {scholarship.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {scholarship.country && scholarship.country[0] !== 'Global' && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-5 h-5" />
                    <span>{scholarship.country?.join(', ')}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    {hasValidDeadline ? (
                      <span className="text-gray-700 dark:text-gray-300">{formattedDeadline}</span>
                    ) : (
                      <span className="text-gray-500">Check website</span>
                    )}
                    {deadlineStatus.showStatus && (
                      <span className={`ml-2 text-sm font-semibold ${
                        deadlineStatus.color === 'red' ? 'text-red-600' : 
                        deadlineStatus.color === 'orange' ? 'text-orange-600' : 
                        deadlineStatus.color === 'green' ? 'text-green-600' : 
                        'text-gray-500'
                      }`}>
                        ({deadlineStatus.text})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Description
                </h2>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: formatDescription(scholarship.description) }} />
              </div>

              {/* Scholarship Package */}
              {(scholarship.scholarship_value || scholarship.duration) && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-500" />
                    Scholarship Package
                  </h2>
                  <div className="space-y-4">
                    {scholarship.scholarship_value && (
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💰 Value / Benefits:</h3>
                        <div className="text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg whitespace-pre-wrap break-words">
                          {scholarship.scholarship_value}
                        </div>
                      </div>
                    )}
                    {scholarship.duration && scholarship.duration !== 'Check announcement' && (
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">⏱️ Duration:</h3>
                        <p className="text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          {scholarship.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Eligibility Criteria */}
              {(scholarship.eligibility?.length > 0 || scholarship.target_group?.length > 0) && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Eligibility Criteria
                  </h2>
                  <div className="space-y-4">
                    {scholarship.eligibility && scholarship.eligibility.length > 0 && scholarship.eligibility[0] !== 'Check official announcement for eligibility criteria' && (
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Requirements:</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                          {scholarship.eligibility.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                    {scholarship.target_group && scholarship.target_group.length > 0 && scholarship.target_group[0] !== 'Kosovo citizens - check official website for specific requirements' && (
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Target Group:</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                          {scholarship.target_group.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Fields of Study */}
              {scholarship.field_of_study && scholarship.field_of_study.length > 0 && scholarship.field_of_study[0] !== 'Check announcement' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Fields of Study
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {scholarship.field_of_study.map((field, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Contact Information */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <div className="space-y-3">
                  {scholarship.contact_email && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <a href={`mailto:${scholarship.contact_email}`} className="hover:text-blue-600 break-all">
                        {scholarship.contact_email}
                      </a>
                    </div>
                  )}
                  
                  {(scholarship.contact_website || scholarship.official_link) && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Globe className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <a 
                        href={scholarship.contact_website || scholarship.official_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-blue-600 break-all"
                      >
                        Official Website
                      </a>
                    </div>
                  )}
                  
                  {!scholarship.contact_email && !scholarship.contact_website && !scholarship.official_link && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No contact information available.
                    </p>
                  )}
                </div>

                <button
                  onClick={handleApplyClick}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {isShareOpen && <div className="fixed inset-0 z-10" onClick={() => setIsShareOpen(false)} />}
    </div>
  );
};

export default ScholarshipDetailPage;