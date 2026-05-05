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
    if (scholarships.length > 0) {
      applyFilters();
    }
  }, [filters, scholarships]);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      let query = supabase.from('bursat').select('*');
      
      if (!filters.show_inactive) {
        query = query.eq('is_active', true);
      }
      
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
      
      if (selectedLower === 'computer science' && 
          (fieldLower.includes('computer') && fieldLower.includes('science'))) {
        return true;
      }
      
      if (selectedLower === 'business' && 
          (fieldLower.includes('business') || fieldLower.includes('administration'))) {
        return true;
      }
      
      if (selectedLower === 'engineering' && 
          (fieldLower.includes('engineering') || fieldLower.includes('engineer'))) {
        return true;
      }
      
      return false;
    });
  };

  const applyFilters = () => {
    let filtered = [...scholarships];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(s =>
        s.title?.toLowerCase().includes(searchLower) ||
        s.description?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.level !== 'all') {
      filtered = filtered.filter(s => {
        if (!s.level || s.level.length === 0) return false;
        return s.level.includes(filters.level);
      });
    }

    if (filters.field_of_study !== 'all') {
      filtered = filtered.filter(s => 
        matchesFieldOfStudy(s.field_of_study, filters.field_of_study)
      );
    }

    setFilteredScholarships(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    if (newFilters.level !== undefined) {
      if (newFilters.level === 'all') {
        setSearchParams({});
      } else {
        setSearchParams({ level: newFilters.level });
      }
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      level: 'all',
      field_of_study: 'all',
      show_inactive: true
    });
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
      <Hero searchQuery={filters.search} setSearchQuery={(query) => handleFilterChange({ search: query })} />
      
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
          options={{ fields: fieldOptions }}
          resultsCount={filteredScholarships.length}
        />

        {(filters.level !== 'all' || filters.field_of_study !== 'all') && (
          <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-700 dark:text-blue-300">
              🔍 Active filters:
              {filters.level !== 'all' && <span className="ml-1 mr-2"><strong>{filters.level}</strong></span>}
              {filters.field_of_study !== 'all' && <span className="ml-1 mr-2"><strong>{filters.field_of_study}</strong></span>}
              - Found <strong>{filteredScholarships.length}</strong> scholarships
            </p>
            <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
              Showing page {currentPage} of {totalPages}
            </p>
          </div>
        )}

        {currentScholarships.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No scholarships found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {(filters.level !== 'all' || filters.field_of_study !== 'all') 
                ? 'No scholarships match your filters. Try different criteria.'
                : 'Try changing your search filters'}
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentScholarships.map((scholarship, index) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} index={index} />
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
      </div>

      {/* Email Subscription Button - Near Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[2px] hover:shadow-xl transition-all duration-300"
        >
          <div className="relative flex items-center justify-center gap-3 rounded-xl bg-white dark:bg-gray-900 px-6 py-4 transition-all duration-300 group-hover:bg-opacity-90">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                <span className="relative text-2xl">📧</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stay Updated</p>
                <p className="text-base font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Get notified about new scholarships
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all duration-300">
              <span className="text-sm font-medium">Subscribe</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      <Footer />
      
      {/* Email Modal */}
      <EmailModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default HomePage;