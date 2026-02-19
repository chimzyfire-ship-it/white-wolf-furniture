import React, { useState, useCallback } from 'react';
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
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4]">
            {/* Cover image */}
            <img
                src={thumbOf(category.cover)}
                alt={category.name}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#051020] via-[#051020]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Glow accent on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 80px rgba(160,174,192,0.08)' }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="text-accent text-[10px] tracking-[.4em] uppercase font-medium mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    {category.tagline}
                </span>
                <h4 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-500">
                    {category.name}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    {category.description}
                </p>

                {/* Item count */}
                <div className="mt-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-accent/20 group-hover:bg-accent/40 transition-colors" />
                    <span className="text-accent/60 text-[10px] tracking-[.3em] uppercase group-hover:text-accent transition-colors">
                        {category.images.length > 0 ? `${category.images.length} Projects` : 'Coming Soon'}
                    </span>
                </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-accent/20 group-hover:border-accent/50 group-hover:w-10 group-hover:h-10 transition-all duration-500 rounded-tr-lg" />
        </div>
    </motion.div>
);

// ─── Image Grid (inside expanded category) ───────────────────────────
const ImageGrid: React.FC<{
    images: string[];
    onImageClick: (index: number) => void;
}> = ({ images, onImageClick }) => (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {images.map((image, index) => (
            <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.6) }}
                className="break-inside-avoid"
            >
                <div
                    className="group relative overflow-hidden rounded-xl cursor-pointer bg-white/[0.02]"
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
                        <Maximize2 className="text-accent mb-3 w-7 h-7" />
                        <span className="text-[9px] tracking-[.5em] uppercase font-bold text-white px-4 py-2 border border-white/10 rounded bg-white/5 backdrop-blur-sm">
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
}> = ({ images, selectedIndex, onClose, onNext, onPrev }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#030a13]/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
        onClick={onClose}
    >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(160,174,192,0.08)_0%,transparent_70%)] pointer-events-none" />

        <button className="absolute top-6 right-6 text-white/30 hover:text-white transition-all hover:rotate-90 p-2 z-[110]" onClick={onClose}>
            <X size={36} strokeWidth={1} />
        </button>

        <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all p-3 z-[110]"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
            <ChevronLeft size={40} strokeWidth={1} />
        </button>

        <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all p-3 z-[110]"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
            <ChevronRight size={40} strokeWidth={1} />
        </button>

        <motion.div
            key={selectedIndex}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="relative group">
                <div className="absolute -inset-4 bg-accent/10 blur-2xl rounded-full opacity-40 group-hover:opacity-70 transition-opacity" />
                {/* Full-res original for lightbox */}
                <img
                    src={images[selectedIndex]}
                    alt="HD View"
                    className="relative max-w-full max-h-[78vh] object-contain shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/5 rounded-lg"
                />
            </div>
            <div className="mt-8 text-center">
                <span className="text-accent/50 text-[10px] tracking-[.4em] uppercase">{selectedIndex + 1} / {images.length}</span>
            </div>
        </motion.div>
    </motion.div>
);

// ─── Empty State ─────────────────────────────────────────────────────
const EmptyState: React.FC<{ categoryName: string }> = ({ categoryName }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
    >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-accent/30" />
        </div>
        <h4 className="text-xl font-serif text-white/60 mb-2">Coming Soon</h4>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
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

    return (
        <div className="container mx-auto px-4 md:px-6">
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {categories.map((cat, i) => (
                                <CategoryCard
                                    key={cat.id}
                                    category={cat}
                                    index={i}
                                    onClick={() => setActiveCategory(cat.id)}
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
                        {/* Back button + Category header */}
                        <div className="mb-10">
                            <button
                                onClick={() => { setActiveCategory(null); setLightboxIndex(null); }}
                                className="group flex items-center gap-3 text-accent/50 hover:text-accent transition-colors mb-6"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[11px] tracking-[.3em] uppercase font-medium">All Categories</span>
                            </button>

                            <div className="flex items-end gap-4 border-b border-white/5 pb-6">
                                <div>
                                    <span className="text-accent/40 text-[10px] tracking-[.4em] uppercase block mb-1">
                                        {activeCat?.tagline}
                                    </span>
                                    <h4 className="text-3xl md:text-4xl font-serif font-bold text-white">
                                        {activeCat?.name}
                                    </h4>
                                </div>
                                {activeCat && activeCat.images.length > 0 && (
                                    <span className="text-accent/30 text-xs tracking-widest ml-auto hidden md:block">
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox */}
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
            </AnimatePresence>
        </div>
    );
};

export default CategoryGallery;
