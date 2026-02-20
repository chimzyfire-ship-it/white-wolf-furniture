import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

function thumbOf(src: string): string {
    const name = src.split('/').pop()?.replace(/\.\w+$/, '') ?? '';
    return `/assets/thumbs/${name}.webp`;
}

interface GalleryProps {
    images: string[];
}

const GalleryWithLightbox: React.FC<GalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [viewedImages, setViewedImages] = useState<Set<number>>(new Set());

    const openLightbox = (index: number) => {
        setSelectedImage(index);
        setViewedImages(prev => new Set(prev).add(index));
    };

    const closeLightbox = useCallback(() => setSelectedImage(null), []);

    const nextImage = useCallback(() => {
        if (selectedImage !== null) {
            const nextIdx = (selectedImage + 1) % images.length;
            setSelectedImage(nextIdx);
            setViewedImages(prev => new Set(prev).add(nextIdx));
        }
    }, [selectedImage, images.length]);

    const prevImage = useCallback(() => {
        if (selectedImage !== null) {
            const prevIdx = (selectedImage - 1 + images.length) % images.length;
            setSelectedImage(prevIdx);
            setViewedImages(prev => new Set(prev).add(prevIdx));
        }
    }, [selectedImage, images.length]);

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
            if (distance > 0) nextImage();
            else prevImage();
        }
    };

    useEffect(() => {
        if (selectedImage !== null) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
            return () => {
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
            };
        }
    }, [selectedImage]);

    useEffect(() => {
        if (selectedImage === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [selectedImage, closeLightbox, nextImage, prevImage]);

    return (
        <div className="container mx-auto px-6">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="break-inside-avoid"
                    >
                        <div
                            className="group relative overflow-hidden rounded-xl glass-card cursor-pointer"
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={thumbOf(image)}
                                alt={`Project ${index + 1}`}
                                className={`w-full h-auto object-cover transition-all duration-1000 group-hover:scale-125 scale-105 ${viewedImages.has(index) ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                                <Maximize2 className="text-accent mb-3 w-8 h-8 animate-pulse" />
                                <span className="text-[10px] tracking-[.5em] uppercase font-bold text-white px-4 py-2 border border-white/10 glass-nav">
                                    View Project
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-primary/95 flex items-center justify-center p-0 md:p-12 cursor-pointer h-[100dvh] w-screen overflow-hidden touch-none"
                        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                        onClick={closeLightbox}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(160,174,192,0.1)_0%,transparent_70%)] pointer-events-none"></div>

                        {/* Top Bar with Back Button */}
                        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-[110] bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                            <button
                                className="flex items-center gap-2 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/10 pointer-events-auto"
                                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                            >
                                <ArrowLeft size={20} strokeWidth={2} />
                                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold">Back</span>
                            </button>
                        </div>

                        <button
                            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all p-3 z-[110]"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            <ChevronLeft size={36} strokeWidth={1.5} className="sm:w-12 sm:h-12" />
                        </button>

                        <button
                            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all p-3 z-[110]"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            <ChevronRight size={36} strokeWidth={1.5} className="sm:w-12 sm:h-12" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.88, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.88, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 30, stiffness: 260 }}
                            className="relative w-full h-full sm:max-w-5xl flex flex-col items-center justify-center p-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative group w-full flex flex-1 items-center justify-center">
                                <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full opacity-50 transition-opacity pointer-events-none w-[70%] h-[70%] m-auto"></div>
                                <img
                                    src={images[selectedImage]}
                                    alt="High Definition View"
                                    className="relative max-w-full max-h-[85dvh] sm:max-h-[80vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 rounded-xl block mx-auto"
                                />
                            </div>

                            <div className="pb-8 text-center shrink-0">
                                <h4 className="text-accent text-[10px] tracking-[.5em] uppercase font-bold mb-2">Artisanal Project {selectedImage + 1}</h4>
                                <div className="h-px w-12 bg-accent/30 mx-auto"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryWithLightbox;
