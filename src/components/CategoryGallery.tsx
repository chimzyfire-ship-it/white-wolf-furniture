import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryCategory } from '../data/siteData';

interface CategoryGalleryProps {
    categories: GalleryCategory[];
}

// ─── Utility: swap .JPG → .webp thumb path ──────────────────────────
function thumbOf(src: string): string {
    const name = src.split('/').pop()?.replace(/\.\w+$/, '') ?? '';
    // Category images: /assets/categories/{cat}/file.JPG → /assets/categories/{cat}/thumbs/file.webp
    if (src.includes('/categories/')) {
        const dir = src.substring(0, src.lastIndexOf('/'));
        return `${dir}/thumbs/${name}.webp`;
    }
    // Real-photos fallback
    return `/assets/thumbs/${name}.webp`;
}

// ─── Category Cover Card ─────────────────────────────────────────────
const CategoryCard: React.FC<{
    category: GalleryCategory;
    index: number;
    onClick: () => void;
}> = ({ category, index, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="group relative cursor-pointer"
        onClick={onClick}
    >
        {/* Mobile: shorter aspect ratio for snappy scrolling. Desktop: taller elegant cards */}
        <div className="relative overflow-hidden rounded-2xl aspect-[5/4] sm:aspect-[4/5] md:aspect-[3/4]">
            {/* Cover image */}
            <img
                src={thumbOf(category.cover)}
                alt={category.name}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />

            {/* Gradient overlay — heavier on mobile for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#051020] via-[#051020]/50 to-transparent opacity-85 sm:opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Glow accent on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 80px rgba(160,174,192,0.08)' }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8">
                <span className="text-accent text-[11px] sm:text-[10px] tracking-[.3em] sm:tracking-[.4em] uppercase font-semibold mb-1.5 sm:mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {category.tagline}
                </span>
                <h4 className="text-2xl sm:text-2xl md:text-3xl font-serif font-bold text-white mb-1.5 sm:mb-2 group-hover:translate-x-2 transition-transform duration-500">
                    {category.name}
                </h4>
                <p className="text-gray-300 sm:text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 sm:translate-y-2 sm:group-hover:translate-y-0">
                    {category.description}
                </p>

                {/* Item count + "Tap to explore" on mobile */}
                <div className="mt-3 sm:mt-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-accent/30 sm:bg-accent/20 group-hover:bg-accent/40 transition-colors" />
                    <span className="text-accent/70 sm:text-accent/60 text-[10px] sm:text-[10px] tracking-[.25em] sm:tracking-[.3em] uppercase font-medium group-hover:text-accent transition-colors">
                        {category.images.length > 0
                            ? `${category.images.length} Projects`
                            : 'Coming Soon'
                        }
                    </span>
                </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 border-t border-r border-accent/25 group-hover:border-accent/50 group-hover:w-9 group-hover:h-9 sm:group-hover:w-10 sm:group-hover:h-10 transition-all duration-500 rounded-tr-lg" />

            {/* Mobile tap indicator */}
            <div className="absolute top-4 left-4 sm:hidden">
                <div className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                    <span className="text-[9px] text-white/70 tracking-wider uppercase font-medium">Tap to explore</span>
                </div>
            </div>
        </div>
    </motion.div>
);

// ─── Image Grid (inside expanded category) ───────────────────────────
const ImageGrid: React.FC<{
    images: string[];
    onImageClick: (index: number) => void;
}> = ({ images, onImageClick }) => (
    <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
        {images.map((image, index) => (
            <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.6) }}
                className="break-inside-avoid"
            >
                <div
                    className="group relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer bg-white/[0.02]"
                    onClick={() => onImageClick(index)}
                >
                    <img
                        src={thumbOf(image)}
                        alt={`Project ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                        <Maximize2 className="text-accent mb-2 sm:mb-3 w-5 h-5 sm:w-7 sm:h-7" />
                        <span className="text-[8px] sm:text-[9px] tracking-[.4em] sm:tracking-[.5em] uppercase font-bold text-white px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10 rounded bg-white/5 backdrop-blur-sm">
                            View HD
                        </span>
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
);

// ─── Lightbox ────────────────────────────────────────────────────────
const Lightbox: React.FC<{
    images: string[];
    selectedIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}> = ({ images, selectedIndex, onClose, onNext, onPrev }) => {
    // Touch/swipe support for mobile
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (Math.abs(distance) >= minSwipeDistance) {
            if (distance > 0) onNext();
            else onPrev();
        }
    };

    // Keyboard nav
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, onNext, onPrev]);

    // Lock body scroll on mobile
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-12 h-[100dvh] w-screen overflow-hidden touch-none"
            style={{
                background: 'radial-gradient(ellipse at center, rgba(5,16,32,0.95) 0%, rgba(3,10,19,0.99) 70%)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={onClose}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(160,174,192,0.06)_0%,transparent_60%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[100px]" />
            </div>

            {/* Top Bar with Back Button */}
            <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-[110] bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                <button
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/10 pointer-events-auto"
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                >
                    <ArrowLeft size={20} strokeWidth={2} />
                    <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold">Back</span>
                </button>
            </div>

            {/* Nav arrows */}
            <button
                className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/25 hover:text-white active:text-white hover:bg-white/5 active:bg-white/10 rounded-full transition-all p-2 sm:p-3 z-[110] backdrop-blur-sm border border-white/0 hover:border-white/5"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
            >
                <ChevronLeft size={28} strokeWidth={1.5} className="sm:w-10 sm:h-10" />
            </button>

            <button
                className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/25 hover:text-white active:text-white hover:bg-white/5 active:bg-white/10 rounded-full transition-all p-2 sm:p-3 z-[110] backdrop-blur-sm border border-white/0 hover:border-white/5"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
            >
                <ChevronRight size={28} strokeWidth={1.5} className="sm:w-10 sm:h-10" />
            </button>

            {/* Centered image with glassmorphic frame */}
            <motion.div
                key={selectedIndex}
                initial={{ scale: 0.88, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.88, opacity: 0, y: 15 }}
                transition={{ type: 'spring', damping: 30, stiffness: 260 }}
                className="relative w-full h-full sm:max-w-5xl flex flex-col items-center justify-center px-0 sm:px-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative group w-full flex justify-center items-center flex-1">
                    {/* Glow aura behind image */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[70%] h-[70%] bg-accent/[0.05] blur-[80px] rounded-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    </div>

                    {/* Glassmorphic image frame */}
                    <div className="relative rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-white/[0.02] backdrop-blur-sm max-h-[80dvh] sm:max-h-[78vh] flex items-center justify-center">
                        <img
                            src={images[selectedIndex]}
                            alt="HD View"
                            className="max-w-full max-h-[80dvh] sm:max-h-[78vh] object-contain block mx-auto"
                        />
                    </div>
                </div>

                {/* Counter + swipe hint on mobile */}
                <div className="pb-6 sm:pb-8 text-center shrink-0">
                    <div className="inline-flex items-center gap-3 bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-full px-5 py-2">
                        <span className="text-accent/50 text-[10px] tracking-[.4em] uppercase">
                            {selectedIndex + 1} / {images.length}
                        </span>
                    </div>
                    <p className="text-white/20 text-[9px] tracking-wider uppercase mt-3 sm:hidden">
                        Swipe left or right to navigate
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Empty State ─────────────────────────────────────────────────────
const EmptyState: React.FC<{ categoryName: string }> = ({ categoryName }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 sm:py-20"
    >
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center">
            <Maximize2 className="w-6 h-6 sm:w-8 sm:h-8 text-accent/30" />
        </div>
        <h4 className="text-lg sm:text-xl font-serif text-white/60 mb-2">Coming Soon</h4>
        <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto">
            Our {categoryName.toLowerCase()} collection is being photographed. Check back soon for the full gallery.
        </p>
    </motion.div>
);

// ─── Main Component ──────────────────────────────────────────────────
const CategoryGallery: React.FC<CategoryGalleryProps> = ({ categories }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const activeCat = categories.find(c => c.id === activeCategory);

    const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);

    const nextImage = useCallback(() => {
        if (lightboxIndex !== null && activeCat) {
            setLightboxIndex((lightboxIndex + 1) % activeCat.images.length);
        }
    }, [lightboxIndex, activeCat]);

    const prevImage = useCallback(() => {
        if (lightboxIndex !== null && activeCat) {
            setLightboxIndex((lightboxIndex - 1 + activeCat.images.length) % activeCat.images.length);
        }
    }, [lightboxIndex, activeCat]);

    // Scroll to top of gallery section when entering a category
    const handleCategoryClick = useCallback((catId: string) => {
        setActiveCategory(catId);
        // Minor delay to let animation start, then scroll
        setTimeout(() => {
            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }, []);

    return (
        <div className="container mx-auto px-0 sm:px-4 md:px-6">
            <AnimatePresence mode="wait">
                {activeCategory === null ? (
                    /* ─── Category Cards View ─── */
                    <motion.div
                        key="categories"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {categories.map((cat, i) => (
                                <CategoryCard
                                    key={cat.id}
                                    category={cat}
                                    index={i}
                                    onClick={() => handleCategoryClick(cat.id)}
                                />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* ─── Expanded Category View ─── */
                    <motion.div
                        key={`cat-${activeCategory}`}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Back button + Category header — sticky on mobile */}
                        <div className="mb-6 sm:mb-10">
                            <button
                                onClick={() => { setActiveCategory(null); setLightboxIndex(null); }}
                                className="group flex items-center gap-2.5 sm:gap-3 text-accent/60 hover:text-accent active:text-accent transition-colors mb-4 sm:mb-6 py-2 -ml-1"
                            >
                                <div className="w-8 h-8 sm:w-auto sm:h-auto rounded-full bg-accent/5 sm:bg-transparent flex items-center justify-center">
                                    <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px] group-hover:-translate-x-1 transition-transform" />
                                </div>
                                <span className="text-[11px] sm:text-[11px] tracking-[.25em] sm:tracking-[.3em] uppercase font-semibold">All Categories</span>
                            </button>

                            <div className="flex items-end gap-4 border-b border-white/5 pb-4 sm:pb-6">
                                <div>
                                    <span className="text-accent/50 text-[10px] sm:text-[10px] tracking-[.3em] sm:tracking-[.4em] uppercase block mb-1">
                                        {activeCat?.tagline}
                                    </span>
                                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
                                        {activeCat?.name}
                                    </h4>
                                </div>
                                {activeCat && activeCat.images.length > 0 && (
                                    <span className="text-accent/30 text-[10px] sm:text-xs tracking-widest ml-auto">
                                        {activeCat.images.length} projects
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Image grid or empty state */}
                        {activeCat && activeCat.images.length > 0 ? (
                            <ImageGrid images={activeCat.images} onImageClick={openLightbox} />
                        ) : (
                            <EmptyState categoryName={activeCat?.name ?? ''} />
                        )}

                        {/* Bottom back button for mobile — after scrolling through images */}
                        {activeCat && activeCat.images.length > 6 && (
                            <div className="mt-10 sm:mt-12 pt-6 border-t border-white/5 flex justify-center sm:hidden">
                                <button
                                    onClick={() => { setActiveCategory(null); setLightboxIndex(null); }}
                                    className="flex items-center gap-2 text-accent/50 active:text-accent py-3 px-6 rounded-full bg-accent/5 border border-accent/10"
                                >
                                    <ArrowLeft size={14} />
                                    <span className="text-[10px] tracking-[.3em] uppercase font-semibold">Back to Categories</span>
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {lightboxIndex !== null && activeCat && activeCat.images.length > 0 && (
                        <Lightbox
                            images={activeCat.images}
                            selectedIndex={lightboxIndex}
                            onClose={closeLightbox}
                            onNext={nextImage}
                            onPrev={prevImage}
                        />
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default CategoryGallery;
