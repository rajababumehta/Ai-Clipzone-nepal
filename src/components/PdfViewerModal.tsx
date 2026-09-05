import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, FileText, Maximize2, Minimize2, Sparkles, BookOpen } from 'lucide-react';
import { getDirectPdfViewerUrl, getDirectPdfDownloadUrl } from '../pdfUtils';

export interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdf?: {
    title: string;
    pdfUrl: string;
    chapterTitle?: string;
    fileSize?: string;
    courseTitle?: string;
  } | null;
  pdfTitle?: string;
  pdfUrl?: string;
  chapterTitle?: string;
  fileSize?: string;
  courseTitle?: string;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  pdf,
  pdfTitle,
  pdfUrl,
  chapterTitle,
  fileSize,
  courseTitle
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const activePdf = pdf || (pdfUrl ? {
    title: pdfTitle || 'PDF Document',
    pdfUrl: pdfUrl,
    chapterTitle: chapterTitle,
    fileSize: fileSize,
    courseTitle: courseTitle
  } : null);

  if (!isOpen || !activePdf) return null;

  const directViewerUrl = getDirectPdfViewerUrl(activePdf.pdfUrl);
  const directDownloadUrl = getDirectPdfDownloadUrl(activePdf.pdfUrl);

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className={`relative z-10 w-full bg-black border border-zinc-800 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'h-full max-h-screen rounded-none' : 'h-[92vh] max-w-6xl xl:max-w-7xl'
          }`}
        >
          {/* Header Bar */}
          <div className="bg-zinc-950 border-b border-zinc-800 px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between gap-3 text-white shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-inner">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  {activePdf.chapterTitle && (
                    <span className="text-[10px] bg-blue-500/15 text-blue-300 font-bold px-2 py-0.5 rounded-md border border-blue-500/30 truncate max-w-[200px]">
                      📁 {activePdf.chapterTitle}
                    </span>
                  )}
                  {activePdf.fileSize && (
                    <span className="text-[10px] bg-zinc-900 text-zinc-400 font-medium px-2 py-0.5 rounded-md border border-zinc-800">
                      📄 {activePdf.fileSize}
                    </span>
                  )}
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-black px-2 py-0.5 rounded-md border border-emerald-500/30">
                    🟢 Direct View • No Login Required
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white truncate tracking-tight mt-0.5" title={activePdf.title}>
                  {activePdf.title}
                </h3>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Download button */}
              <a
                href={directDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-black px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Download PDF Document directly"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </a>

              {/* Direct Open in New Tab */}
              <a
                href={directViewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 border border-zinc-800 cursor-pointer"
                title="Open in Full Browser Tab without login"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open in Tab</span>
              </a>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                title="Close PDF Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub-info banner */}
          <div className="bg-zinc-950 border-b border-zinc-800 px-4 py-1.5 text-left text-[11px] text-zinc-300 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-blue-400 select-none">💡</span>
              <span className="truncate">
                {activePdf.courseTitle ? `Course: ${activePdf.courseTitle} • ` : ''} 
                Google Drive लगइन बिना नै यो PDF सिधै पढ्न र जुम गर्न मिल्छ।
              </span>
            </div>
            <span className="text-[10px] text-blue-400 font-bold shrink-0 hidden md:inline">
              🔒 Protected Document View
            </span>
          </div>

          {/* PDF Viewer Body with Iframe */}
          <div className="relative flex-1 w-full bg-zinc-950 overflow-hidden flex flex-col">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black text-zinc-300 gap-3">
                <div className="w-10 h-10 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-xs font-bold text-zinc-400">PDF डकुमेन्ट लोड हुँदैछ...</p>
              </div>
            )}

            <iframe
              src={directViewerUrl}
              className="w-full h-full border-0 bg-white"
              title={activePdf.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Bottom Footer Info */}
          <div className="bg-zinc-950 px-4 py-2 border-t border-zinc-800 text-left text-[10px] text-zinc-500 flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              AI Clipzone Digital Academy • Student Study Material
            </span>
            <div className="flex items-center gap-3">
              <a
                href={directViewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-bold"
              >
                Drive Preview Problem? Click here to view in browser
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
