// src/pages/ScholarshipDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft, Calendar, MapPin, BookOpen, Mail, Globe, ExternalLink,
  Heart, Share2, Award, Users, FileText, Check, Link as LinkIcon
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import ReactGA from 'react-ga4';
import { levelColors, deadlineColors } from '../lib/design';

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
      ReactGA.send({ hitType: 'pageview', page: `/scholarship/${id}` });
    }
  }, [id]);

  const fetchScholarship = async () => {
    try {
      const { data, error } = await supabase.from('bursat').select('*').eq('id', id).single();
      if (error) throw error;
      if (data.contact_email) data.contact_email = data.contact_email.replace('mailto:', '').trim();
      setScholarship(data);
      if (typeof ReactGA?.ga === 'function' && data) {
        ReactGA.event({ category: 'Scholarship', action: 'View Details', label: data.title, value: data.id });
      }
    } catch (error) {
      console.error(error);
      toast.error('Scholarship not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Link copied');
      setTimeout(() => setCopied(false), 2000);
    } catch { toast.error('Failed to copy'); }
  };

  const shareToSocial = (platform) => {
    const url = window.location.href;
    const text = `Check out this scholarship: ${scholarship?.title}`;
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
    setIsShareOpen(false);
  };

  const handleApplyClick = () => {
    const url = scholarship?.official_link || scholarship?.contact_website;
    if (url) window.open(url, '_blank');
    else toast.error('No application link available');
  };

  const formatDescription = (text) => {
    if (!text) return 'No description available.';
    let f = text;
    f = f.replace(/(articles\.php\?cid=17&t=Accreditation-and-recognition\s*)+/gi, '');
    f = f.replace(/articles\.php\?cid=17&t=[^\s]+/gi, '');
    f = f.replace(/\s+articles\.php\?cid=\d+&t=[^\s]+/gi, '');
    f = f.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline break-all">$1</a>');
    f = f.replace(/(https?:\/\/[^\s<]+)(?![^<]*<\/a>)/g, (url) => {
      if (url.includes('.jpg') || url.includes('.png') || url.includes('.gif')) return url;
      const disp = url.length > 60 ? url.substring(0, 57) + '...' : url;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline break-all">${disp}</a>`;
    });
    f = f.replace(/\n/g, '<br/>');
    return f;
  };

  const isValidDate = (d) => d && !['Check announcement', 'Check website'].includes(d) && !isNaN(new Date(d).getTime());

  const formatDeadline = (d) => isValidDate(d)
    ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const getDeadlineStatus = (deadline) => {
    if (!isValidDate(deadline)) return { key: 'closed', days: null, show: false };
    const days = Math.ceil((new Date(deadline) - new Date()) / 86400000);
    if (days < 0) return { key: 'closed', days: 0, show: true, text: 'Closed' };
    if (days < 7) return { key: 'urgent', days, show: true, text: `Urgent · ${days}d left` };
    if (days < 30) return { key: 'soon', days, show: true, text: `${days} days left` };
    return { key: 'active', days, show: true, text: `${days} days left` };
  };

  if (loading) return <LoadingSpinner />;
  if (!scholarship) return null;

  const deadline = getDeadlineStatus(scholarship.deadline);
  const statusColor = deadlineColors[deadline.key];
  const formattedDeadline = formatDeadline(scholarship.deadline);
  const hasValidDeadline = isValidDate(scholarship.deadline);
  const levels = scholarship.level && scholarship.level.length > 0 ? scholarship.level : [];

  return (
    <div className="min-h-screen">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-[#f7f8fa]/80 dark:bg-[#0d0e12]/80 backdrop-blur-lg border-b border-[#e4e6eb] dark:border-[#1e2026]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4a5160] dark:text-[#8a929f] hover:text-[#0f1115] dark:hover:text-[#f7f8fa] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All scholarships
          </button>

          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setIsShareOpen(!isShareOpen)}
                className="p-2 rounded-lg text-[#6a7280] hover:text-[#0f1115] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22] dark:hover:text-[#f7f8fa] transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {isShareOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsShareOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#14161b] rounded-xl shadow-[0_16px_40px_-12px_rgba(15,17,21,0.20)] border border-[#e4e6eb] dark:border-[#242832] py-1 z-20 animate-scale-in">
                    <button onClick={copyToClipboard} className="w-full px-3 py-2 text-left text-sm hover:bg-[#f7f8fa] dark:hover:bg-[#1a1c22] flex items-center gap-2.5 text-[#4a5160] dark:text-[#98a2b0]">
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <LinkIcon className="w-3.5 h-3.5 text-[#8a929f]" />}
                      <span>{copied ? 'Copied' : 'Copy link'}</span>
                    </button>
                    <div className="h-px bg-[#e4e6eb] dark:bg-[#242832] my-1" />
                    {[
                      { key: 'facebook', label: 'Facebook', Icon: FaFacebook, color: 'text-blue-600' },
                      { key: 'twitter', label: 'X / Twitter', Icon: FaTwitter, color: 'text-sky-500' },
                      { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin, color: 'text-blue-700' },
                      { key: 'whatsapp', label: 'WhatsApp', Icon: FaWhatsapp, color: 'text-green-500' },
                    ].map(({ key, label, Icon, color }) => (
                      <button key={key} onClick={() => shareToSocial(key)} className="w-full px-3 py-2 text-left text-sm hover:bg-[#f7f8fa] dark:hover:bg-[#1a1c22] flex items-center gap-2.5 text-[#4a5160] dark:text-[#98a2b0]">
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
              className="p-2 rounded-lg text-[#6a7280] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22] transition-colors"
              aria-label="Favorite"
            >
              <Heart className={`w-4 h-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header card */}
        <div className="bg-white dark:bg-[#0d0e12] rounded-2xl border border-[#e4e6eb] dark:border-[#1e2026] p-6 md:p-8 mb-6">
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-[#0f1115] dark:bg-[#f7f8fa] text-[#f7f8fa] dark:text-[#0f1115]">
              {scholarship.source_name}
            </span>
            {levels.length > 0 ? levels.map((lvl, i) => (
              <span key={i} className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-md ring-1 ring-inset ${levelColors[lvl] || 'bg-slate-100 text-slate-600 ring-slate-300/30'}`}>
                {lvl}
              </span>
            )) : (
              <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-[#f2f3f5] dark:bg-[#1a1c22] text-[#6a7280]">
                Level: TBA
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#0f1115] dark:text-[#f7f8fa] tracking-[-0.02em] mb-6 text-balance">
            {scholarship.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#e4e6eb] dark:border-[#1e2026]">
            {scholarship.country && scholarship.country[0] !== 'Global' && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f2f3f5] dark:bg-[#1a1c22] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#6a7280]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-[#6a7280] dark:text-[#5a6270]">Location</div>
                  <div className="text-sm font-medium text-[#0f1115] dark:text-[#f7f8fa] truncate">
                    {scholarship.country.join(', ')}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#f2f3f5] dark:bg-[#1a1c22] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-[#6a7280]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-[#6a7280] dark:text-[#5a6270]">Deadline</div>
                <div className="text-sm font-medium text-[#0f1115] dark:text-[#f7f8fa] flex items-center gap-2 flex-wrap">
                  {hasValidDeadline ? formattedDeadline : 'Check website'}
                  {deadline.show && deadline.days > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`} />
                      <span className={statusColor.text}>{deadline.text}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Section title="Description" icon={FileText}>
              <div
                className="prose prose-sm prose-slate dark:prose-invert max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatDescription(scholarship.description) }}
              />
            </Section>

            {(scholarship.scholarship_value || (scholarship.duration && scholarship.duration !== 'Check announcement')) && (
              <Section title="Package" icon={Award}>
                <div className="space-y-4">
                  {scholarship.scholarship_value && (
                    <div>
                      <div className="text-xs font-medium text-[#6a7280] dark:text-[#5a6270] uppercase tracking-wide mb-1.5">Value & Benefits</div>
                      <div className="text-sm text-[#495260] dark:text-[#8a929f] bg-[#f7f8fa] dark:bg-[#14161b] p-4 rounded-lg whitespace-pre-wrap break-words leading-relaxed">
                        {scholarship.scholarship_value}
                      </div>
                    </div>
                  )}
                  {scholarship.duration && scholarship.duration !== 'Check announcement' && (
                    <div>
                      <div className="text-xs font-medium text-[#6a7280] dark:text-[#5a6270] uppercase tracking-wide mb-1.5">Duration</div>
                      <div className="text-sm text-[#495260] dark:text-[#8a929f] bg-[#f7f8fa] dark:bg-[#14161b] p-3 rounded-lg">
                        {scholarship.duration}
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {((scholarship.eligibility?.length > 0 && scholarship.eligibility[0] !== 'Check official announcement for eligibility criteria') ||
              (scholarship.target_group?.length > 0 && scholarship.target_group[0] !== 'Kosovo citizens - check official website for specific requirements')) && (
              <Section title="Eligibility" icon={Users}>
                <div className="space-y-4">
                  {scholarship.eligibility?.length > 0 && scholarship.eligibility[0] !== 'Check official announcement for eligibility criteria' && (
                    <div>
                      <div className="text-xs font-medium text-[#6a7280] dark:text-[#5a6270] uppercase tracking-wide mb-2">Requirements</div>
                      <ul className="space-y-1.5">
                        {scholarship.eligibility.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#495260] dark:text-[#8a929f]">
                            <Check className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {scholarship.target_group?.length > 0 && scholarship.target_group[0] !== 'Kosovo citizens - check official website for specific requirements' && (
                    <div>
                      <div className="text-xs font-medium text-[#6a7280] dark:text-[#5a6270] uppercase tracking-wide mb-2">Target group</div>
                      <ul className="space-y-1.5">
                        {scholarship.target_group.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#495260] dark:text-[#8a929f]">
                            <Check className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {scholarship.field_of_study?.length > 0 && scholarship.field_of_study[0] !== 'Check announcement' && (
              <Section title="Fields of study" icon={BookOpen}>
                <div className="flex flex-wrap gap-1.5">
                  {scholarship.field_of_study.map((field, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-600/15">
                      {field}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-[#0d0e12] rounded-2xl border border-[#e4e6eb] dark:border-[#1e2026] p-6 lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold text-[#0f1115] dark:text-[#f7f8fa] mb-4 uppercase tracking-wide">
                Contact
              </h2>

              <div className="space-y-3 mb-6">
                {scholarship.contact_email && (
                  <a
                    href={`mailto:${scholarship.contact_email}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#f7f8fa] dark:hover:bg-[#14161b] transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-[#8a929f] mt-0.5 flex-shrink-0 group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm text-[#4a5160] dark:text-[#98a2b0] break-all group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {scholarship.contact_email}
                    </span>
                  </a>
                )}

                {(scholarship.contact_website || scholarship.official_link) && (
                  <a
                    href={scholarship.contact_website || scholarship.official_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#f7f8fa] dark:hover:bg-[#14161b] transition-colors group"
                  >
                    <Globe className="w-4 h-4 text-[#8a929f] mt-0.5 flex-shrink-0 group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm text-[#4a5160] dark:text-[#98a2b0] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Official website
                    </span>
                  </a>
                )}

                {!scholarship.contact_email && !scholarship.contact_website && !scholarship.official_link && (
                  <p className="text-sm text-[#6a7280] dark:text-[#5a6270]">
                    No contact information available.
                  </p>
                )}
              </div>

              <button
                onClick={handleApplyClick}
                className="w-full py-3 bg-[#0f1115] dark:bg-[#f7f8fa] hover:bg-[#2a2d34] dark:hover:bg-white text-[#f7f8fa] dark:text-[#0f1115] text-sm font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 group"
              >
                Apply now
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <p className="mt-3 text-xs text-center text-[#8a929f]">
                You'll be redirected to the official website
              </p>
            </div>
          </aside>
        </div>
      </main>

      {isShareOpen && <div className="fixed inset-0 z-10" onClick={() => setIsShareOpen(false)} />}
    </div>
  );
};

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white dark:bg-[#0d0e12] rounded-2xl border border-[#e4e6eb] dark:border-[#1e2026] p-6">
    <h2 className="flex items-center gap-2 text-sm font-semibold text-[#0f1115] dark:text-[#f7f8fa] mb-4 uppercase tracking-wide">
      <Icon className="w-4 h-4 text-[#8a929f]" />
      {title}
    </h2>
    {children}
  </div>
);

export default ScholarshipDetailPage;