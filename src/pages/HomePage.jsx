// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ScholarshipCard from '../components/ScholarshipCard';
import Hero from '../components/Hero';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import EmailModal from '../components/EmailModal';
import { ArrowRight, SearchX } from 'lucide-react';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    level: 'all',
    field_of_study: 'all',
    show_inactive: true
  });

  const scholarshipsPerPage = 9;

  const fieldOptions = [...new Set(
    scholarships.flatMap(s => s.field_of_study || [])
  )].filter(f => f && f !== 'Check announcement').sort();

  useEffect(() => {
    const levelParam = searchParams.get('level');
    if (levelParam && levelParam !== 'all') {
      setFilters(prev => ({ ...prev, level: levelParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchScholarships();
  }, [filters.show_inactive]);

  useEffect(() => {
    if (scholarships.length > 0) applyFilters();
  }, [filters, scholarships]);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      let query = supabase.from('bursat').select('*');
      if (!filters.show_inactive) query = query.eq('is_active', true);
      const { data, error } = await query.order('last_scraped', { ascending: false });
      if (error) throw error;
      setScholarships(data || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    } finally {
      setLoading(false);
    }
  };

  const matchesFieldOfStudy = (scholarshipFields, selectedField) => {
    if (!scholarshipFields || scholarshipFields.length === 0) return false;
    if (selectedField === 'all') return true;
    const selectedLower = selectedField.toLowerCase();
    return scholarshipFields.some(field => {
      const fieldLower = field.toLowerCase();
      if (fieldLower === selectedLower) return true;
      if (fieldLower.includes(selectedLower)) return true;
      if (selectedLower.includes(fieldLower)) return true;
      if (selectedLower === 'computer science' && fieldLower.includes('computer') && fieldLower.includes('science')) return true;
      if (selectedLower === 'business' && (fieldLower.includes('business') || fieldLower.includes('administration'))) return true;
      if (selectedLower === 'engineering' && (fieldLower.includes('engineering') || fieldLower.includes('engineer'))) return true;
      return false;
    });
  };

  const applyFilters = () => {
    let filtered = [...scholarships];
    if (filters.search) {
      const s = filters.search.toLowerCase();
      filtered = filtered.filter(x =>
        x.title?.toLowerCase().includes(s) || x.description?.toLowerCase().includes(s)
      );
    }
    if (filters.level !== 'all') {
      filtered = filtered.filter(x => x.level && x.level.includes(filters.level));
    }
    if (filters.field_of_study !== 'all') {
      filtered = filtered.filter(x => matchesFieldOfStudy(x.field_of_study, filters.field_of_study));
    }
    setFilteredScholarships(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    if (newFilters.level !== undefined) {
      setSearchParams(newFilters.level === 'all' ? {} : { level: newFilters.level });
    }
  };

  const resetFilters = () => {
    setFilters({ search: '', level: 'all', field_of_study: 'all', show_inactive: true });
    setSearchParams({});
  };

  const indexOfLast = currentPage * scholarshipsPerPage;
  const indexOfFirst = indexOfLast - scholarshipsPerPage;
  const currentScholarships = filteredScholarships.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredScholarships.length / scholarshipsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col">
      <Hero
        searchQuery={filters.search}
        setSearchQuery={(query) => handleFilterChange({ search: query })}
      />

      <main
        id="scholarships"
        className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20"
      >
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
          options={{ fields: fieldOptions }}
          resultsCount={filteredScholarships.length}
        />

        {currentScholarships.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-14 h-14 rounded-2xl bg-[#f2f3f5] dark:bg-[#14161b] border border-[#e4e6eb] dark:border-[#242832] flex items-center justify-center mx-auto mb-5">
              <SearchX className="w-6 h-6 text-[#8a929f]" />
            </div>
            <h3 className="text-lg font-bold text-[#0f1115] dark:text-[#f7f8fa] mb-2 tracking-tight">
              No scholarships found
            </h3>
            <p className="text-sm text-[#6a7280] dark:text-[#5a6270] mb-6 max-w-md mx-auto leading-relaxed">
              {filters.level !== 'all' || filters.field_of_study !== 'all' || filters.search
                ? 'Try adjusting your filters or search to see more results.'
                : 'There are no scholarships available at the moment.'}
            </p>
            {(filters.level !== 'all' || filters.field_of_study !== 'all' || filters.search) && (
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#0f1115] dark:bg-[#f7f8fa] text-[#f7f8fa] dark:text-[#0f1115] text-sm font-semibold rounded-lg hover:bg-[#2a2d34] dark:hover:bg-white transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {/* Subscribe CTA */}
        <div className="mt-16 p-8 md:p-10 rounded-2xl bg-[#0f1115] dark:bg-[#14161b] border border-[#1e2026] text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-500/10 dark:bg-blue-500/[0.08] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative">
            <h3 className="text-xl md:text-2xl font-bold text-[#f7f8fa] mb-2 tracking-[-0.02em]">
              Never miss a scholarship
            </h3>
            <p className="text-sm text-[#8a929f] mb-6 max-w-md mx-auto leading-relaxed">
              Subscribe and receive new opportunities directly to your inbox.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f7f8fa] hover:bg-white text-[#0f1115] text-sm font-semibold rounded-lg transition-colors group"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <EmailModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default HomePage;