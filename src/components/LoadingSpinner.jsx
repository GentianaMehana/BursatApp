// src/components/LoadingSpinner.jsx
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-[#f7f8fa] dark:bg-[#0d0e12] flex items-center justify-center z-50">
    <div className="text-center">
      <div className="relative w-12 h-12 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-[#e4e6eb] dark:border-[#1e2026]" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0f1115] dark:border-t-[#f7f8fa] animate-spin" />
      </div>
      <p className="text-sm text-[#6a7280] dark:text-[#5a6270] font-medium">
        Loading scholarships
      </p>
    </div>
  </div>
);

export default LoadingSpinner;