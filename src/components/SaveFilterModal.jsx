// src/components/SaveFilterModal.jsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Bookmark, Save, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SaveFilterModal = ({ isOpen, onClose, filters, onSave, savedFilters }) => {
  const [filterName, setFilterName] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const handleSave = () => {
    if (!filterName.trim()) return toast.error('Please enter a name');
    onSave({ name: filterName, filters });
    setFilterName('');
    onClose();
    toast.success('Filter saved');
  };

  const handleLoad = () => {
    const f = savedFilters.find(x => x.id === selectedId);
    if (f) { onSave(f.filters); toast.success('Filter loaded'); onClose(); }
  };

  const handleDelete = () => {
    const updated = savedFilters.filter(f => f.id !== selectedId);
    localStorage.setItem('savedFilters', JSON.stringify(updated));
    toast.success('Filter deleted');
    window.location.reload();
  };

  const active = [
    filters.search && `Search: ${filters.search}`,
    filters.level !== 'all' && `Level: ${filters.level}`,
    filters.field_of_study !== 'all' && `Field: ${filters.field_of_study}`,
  ].filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f1115]/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#0d0e12] rounded-2xl max-w-md w-full border border-[#e4e6eb] dark:border-[#1e2026] overflow-hidden shadow-[0_24px_80px_-20px_rgba(15,17,21,0.35)]"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#e4e6eb] dark:border-[#1e2026]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#f2f3f5] dark:bg-[#1a1c22] flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-[#4a5160] dark:text-[#98a2b0]" />
                </div>
                <h2 className="text-sm font-bold text-[#0f1115] dark:text-[#f7f8fa] uppercase tracking-wide">
                  Saved filters
                </h2>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-[#8a929f] hover:text-[#0f1115] dark:hover:text-[#f7f8fa] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-[#6a7280] dark:text-[#5a6270] uppercase tracking-wide mb-2">
                  Save current filters
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    placeholder="e.g. Master in Germany"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-[#e4e6eb] dark:border-[#242832] bg-white dark:bg-[#14161b] text-sm text-[#0f1115] dark:text-[#f7f8fa] placeholder-[#a0a5b0] focus:outline-none focus:border-[#0f1115] dark:focus:border-[#f7f8fa] focus:ring-4 focus:ring-[#0f1115]/5 dark:focus:ring-[#f7f8fa]/5 transition-all"
                  />
                  <button
                    onClick={handleSave}
                    className="px-3 py-2 bg-[#0f1115] dark:bg-[#f7f8fa] hover:bg-[#2a2d34] dark:hover:bg-white text-[#f7f8fa] dark:text-[#0f1115] text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save
                  </button>
                </div>
              </div>

              {savedFilters.length > 0 && (
                <div>
                  <label className="block text-[10px] font-bold text-[#6a7280] dark:text-[#5a6270] uppercase tracking-wide mb-2">
                    Your saved filters
                  </label>
                  <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#e4e6eb] dark:border-[#242832] bg-white dark:bg-[#14161b] text-sm text-[#0f1115] dark:text-[#f7f8fa] focus:outline-none focus:border-[#0f1115] dark:focus:border-[#f7f8fa] mb-2 cursor-pointer transition-all"
                  >
                    <option value="">Select a saved filter...</option>
                    {savedFilters.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleLoad}
                      disabled={!selectedId}
                      className="flex-1 py-2 bg-[#0f1115] dark:bg-[#f7f8fa] text-[#f7f8fa] dark:text-[#0f1115] text-sm font-semibold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Load
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={!selectedId}
                      className="px-3 py-2 rounded-lg border border-[#e4e6eb] dark:border-[#242832] text-[#6a7280] hover:border-red-300 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-lg bg-[#f7f8fa] dark:bg-[#14161b]">
                <div className="text-[10px] font-bold text-[#6a7280] dark:text-[#5a6270] uppercase tracking-wide mb-2">
                  Current filters
                </div>
                {active.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {active.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white dark:bg-[#0d0e12] text-[#4a5160] dark:text-[#98a2b0] text-xs font-medium border border-[#e4e6eb] dark:border-[#242832]">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-[#8a929f]">No active filters</span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaveFilterModal;