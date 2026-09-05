import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Lock, BookOpen } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  index: number;
  activeCourseIds: string[];
  isAdminActivated: boolean;
  onEnroll: (course: Course) => void;
  onEdit?: (course: Course) => void;
  onDelete?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  index,
  activeCourseIds,
  isAdminActivated,
  onEnroll,
  onEdit,
  onDelete,
}) => {
  const isEnrolled = activeCourseIds.includes(course.id);

  // Compute pricing breakdown matching the sample style
  const numericAmount = course.amount || parseInt(course.price.replace(/[^\d]/g, ''), 10) || 449;
  // Estimate realistic pre-discount strike-through price (~60% discount)
  const origAmount = Math.max(
    Math.round((numericAmount / 0.4) / 50) * 50,
    numericAmount + 300
  );
  const discountPercent = Math.min(
    75,
    Math.max(45, Math.round(((origAmount - numericAmount) / origAmount) * 100))
  );

  // Comprehensive bullet points matching the sample aesthetic
  const coreLearnings: string[] = [...(course.learn || [])];

  // Standard perks to ensure cards look rich and comprehensive like the sample
  const standardPerks = [
    'Live Online & Recorded Sessions',
    'Lifetime Recording Access',
    'Certificate After Completion',
    'Learn From Anywhere & Anytime',
    'Live Q&A & WhatsApp Support',
  ];

  // Build combined bullet points avoiding duplicates
  const allPoints = [...coreLearnings];
  for (const perk of standardPerks) {
    const perkLower = perk.toLowerCase();
    const alreadyExists = allPoints.some((p) =>
      p.toLowerCase().includes(perkLower.split(' ')[0])
    );
    if (!alreadyExists && allPoints.length < 8) {
      allPoints.push(perk);
    }
  }

  // Course descriptive subtitle matching sample's headline style
  const getCourseSubtitle = (c: Course) => {
    if (c.id === 'ai-masterclass') {
      return 'Complete Practical Course on 30+ AI Tools, Video Making, Music, Image & Content Growth';
    }
    if (c.id === 'youtube-blueprint') {
      return 'Complete Live Course on Research, Script writing, AI Tools, Video Production & Channel Growth';
    }
    if (c.id === 'ai-video-image-song') {
      return 'Complete Practical Course on AI Video Production, Image Design, Voice & Music Creation';
    }
    if (c.id === 'ai-song-creation') {
      return 'Complete Practical Course on AI Song Generation, Lyrics Writing, Voice Cloning & Beat Making';
    }
    if (c.id === 'ai-presentation') {
      return 'Complete Practical Course on AI Slide Design, PowerPoint Automation & Fast Presentations';
    }
    return `Complete Practical Course on ${c.title.replace(/by AI Clipzone/gi, '').replace(/Course/gi, '').trim()} & Digital Growth`;
  };

  return (
    <motion.div
      id={`course-card-${course.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between h-full bg-[#07080c] rounded-[26px] sm:rounded-[30px] border-2 border-emerald-500/70 hover:border-emerald-400 p-3.5 sm:p-5 md:p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] transition-all duration-300 overflow-hidden scroll-mt-28"
    >
      {/* Ambient Red Smoke Glow in top area matching the sample image */}
      <div className="absolute -top-12 inset-x-0 h-56 bg-radial from-red-600/20 via-rose-700/10 to-transparent pointer-events-none opacity-80" />

      {/* Admin quick action controls */}
      {isAdminActivated && (
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-black/85 backdrop-blur-md p-1.5 rounded-xl border border-zinc-800 shadow-xl">
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(course);
              }}
              className="p-1.5 text-amber-300 hover:bg-zinc-800 rounded-lg transition cursor-pointer"
              title="Edit Course"
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(course.id);
              }}
              className="p-1.5 text-rose-400 hover:bg-rose-950/80 rounded-lg transition cursor-pointer"
              title="Delete Course"
            >
              🗑️
            </button>
          )}
        </div>
      )}

      {/* Top Graphic / Media Area */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-video bg-black border border-zinc-800/80 shadow-inner group-hover:border-zinc-700 transition-colors">
        <img
          src={course.image}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Cinematic dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {isEnrolled ? (
            <span className="bg-emerald-950/90 text-emerald-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-emerald-500/50 shadow-md flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Course Activated
            </span>
          ) : course.isPopular ? (
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-zinc-950 fill-zinc-950" />
              Best Seller
            </span>
          ) : (
            <span className="bg-zinc-900/85 backdrop-blur-md text-zinc-200 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-zinc-700">
              Verified Masterclass
            </span>
          )}

          <span className="bg-black/80 backdrop-blur-md text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-zinc-800">
            🌐 {course.language || 'Nepali & Hindi'}
          </span>
        </div>

        {/* Bottom overlay pills on thumbnail */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-black/85 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/30">
            ⏳ Lifetime Access
          </span>
          <span className="bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-emerald-500/40">
            ⚡ Instant Delivery
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col grow justify-between pt-4 font-sans">
        <div>
          {/* Central Pill Banner ("Professional Content") matching sample image */}
          <div className="w-full bg-[#ba1414] hover:bg-[#c91818] bg-gradient-to-r from-red-600 via-rose-600 to-red-600 rounded-2xl py-2.5 sm:py-3 px-4 text-center shadow-lg shadow-red-950/60 transition-colors">
            <span className="text-yellow-300 font-extrabold text-base sm:text-xl md:text-2xl tracking-wide uppercase font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] block">
              {course.popularText && !course.popularText.includes('🔥')
                ? course.popularText
                : 'Professional Content'}
            </span>
          </div>

          {/* Course Headline / Description Title */}
          <div className="mt-3.5 sm:mt-4 text-left">
            <h4 className="text-white font-extrabold text-base sm:text-lg leading-snug tracking-tight">
              {getCourseSubtitle(course)}
            </h4>
            <p className="text-zinc-400 text-xs font-semibold mt-1">
              {course.title}
            </p>
          </div>

          {/* Feature Bullet List with Neon Green Glowing Dots */}
          <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-left">
            {allPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                {/* Glowing Green Dot */}
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] shrink-0 mt-0.5 inline-block" />
                <span className="text-zinc-100 font-semibold text-xs sm:text-sm leading-snug">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Price and Call-to-Action Bar */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
          {/* Left: Price Pill with Emerald Green Border */}
          <div className="border border-emerald-500/80 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-950/20 backdrop-blur-xs flex items-center gap-2 sm:gap-2.5 shrink-0 shadow-inner">
            <span className="text-zinc-400 line-through text-xs sm:text-sm font-bold">
              Rs {origAmount}
            </span>
            <span className="text-emerald-400 font-black text-xs sm:text-sm">
              -{discountPercent}%
            </span>
            <span className="text-white font-black text-sm sm:text-base tracking-tight">
              {course.price.startsWith('Rs') ? course.price : `Rs ${course.price}`}
            </span>
          </div>

          {/* Right: Primary Call-to-Action Button */}
          <button
            type="button"
            onClick={() => onEnroll(course)}
            className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 active:scale-95 text-white font-black text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg shadow-red-600/35 flex items-center justify-center gap-2 tracking-wider transition-all cursor-pointer uppercase shrink-0 font-sans"
          >
            <span>{isEnrolled ? 'GO TO CLASSROOM' : 'GET START'}</span>
            <ArrowRight className="w-4 h-4 text-white shrink-0" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
