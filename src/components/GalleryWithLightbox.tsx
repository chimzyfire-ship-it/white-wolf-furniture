import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

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

    const closeLightbox = () => setSelectedImage(null);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null) {
            const nextIdx = (selectedImage + 1) % images.length;
            setSelectedImage(nextIdx);
            setViewedImages(prev => new Set(prev).add(nextIdx));
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null) {
            const prevIdx = (selectedImage - 1 + images.length) % images.length;
            setSelectedImage(prevIdx);
            setViewedImages(prev => new Set(prev).add(prevIdx));
        }
    };

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
                        className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
                        onClick={closeLightbox}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(160,174,192,0.1)_0%,transparent_70%)] pointer-events-none"></div>

                        <button
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-all hover:rotate-90 p-2 z-[110]"
                            onClick={closeLightbox}
                        >
                            <X size={40} strokeWidth={1} />
                        </button>

                        <button
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all p-4 z-[110]"
                            onClick={prevImage}
                        >
                            <ChevronLeft size={48} strokeWidth={1} />
                        </button>

                        <button
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all p-4 z-[110]"
                            onClick={nextImage}
                        >
                            <ChevronRight size={48} strokeWidth={1} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative max-w-5xl w-full flex flex-col items-center"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-accent/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src={images[selectedImage]}
                                    alt="High Definition View"
                                    className="relative max-w-full max-h-[75vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
                                />
                            </div>

                            <div className="mt-12 text-center">
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
