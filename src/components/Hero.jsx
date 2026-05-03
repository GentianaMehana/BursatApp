import { motion } from 'framer-motion';
import { Search, Sparkles, TrendingUp, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = ({ searchQuery, setSearchQuery }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: Award, label: 'Active Scholarships', value: '140+' },
    { icon: TrendingUp, label: 'Data Sources', value: '6' },
    { icon: Sparkles, label: 'Benefited Students', value: '500+' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, 100, -100],
              x: [null, 50, -50, 50],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Mouse follower gradient */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-3xl opacity-20"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm font-medium">#1 Scholarship Platform in Kosovo</span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Find Your
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Ideal Scholarship
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            140+ scholarships from 6 different sources. Filter, compare and apply for the scholarship that best suits you.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scholarships e.g. 'Master in Germany', 'MBA', 'Engineering'..."
                className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/50 group-hover:text-white/80 transition-colors" />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 md:h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-gray-50 dark:fill-gray-900"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,21.25,27.93,25.67,44.24,28.45c69.76,11.6,136.47,7.22,206.42-5.49C369.64,4.3,434.36,22.26,500,31.9c63.54,9.44,124.3,14.3,186.8,9.8,42.13-3,78.23-12.44,114.62-27.49C869.56,2.11,990.15,15.07,1093.27,47.4,1137.55,60.51,1172.34,78.53,1200,95.27V0Z"
            className="fill-gray-50 dark:fill-gray-900"
            opacity=".5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c69-12.2,135.27-30.6,203.21-37.26,73.66-7.22,146.37-2.88,218.84,11.9,65.62,13.34,129.55,35.12,192.12,61.09C1098.13,98.14,1155.27,108.61,1200,114.43V0Z"
            className="fill-gray-50 dark:fill-gray-900"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;