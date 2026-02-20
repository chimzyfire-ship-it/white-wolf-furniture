import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface Product {
    name: string;
    price: string;
    description: string;
    image: string;
}

interface ProductGalleryProps {
    products: Product[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const openLightbox = (index: number) => setSelectedProduct(index);
    const closeLightbox = useCallback(() => setSelectedProduct(null), []);

    const nextProduct = useCallback(() => {
        setSelectedProduct(prev => prev !== null ? (prev + 1) % products.length : null);
    }, [products.length]);

    const prevProduct = useCallback(() => {
        setSelectedProduct(prev => prev !== null ? (prev - 1 + products.length) % products.length : null);
    }, [products.length]);

    // Keyboard navigation
    useEffect(() => {
        if (selectedProduct === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextProduct();
            if (e.key === 'ArrowLeft') prevProduct();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [selectedProduct, closeLightbox, nextProduct, prevProduct]);

    // Body scroll lock
    useEffect(() => {
        if (selectedProduct !== null) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
            return () => {
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
            };
        }
    }, [selectedProduct]);

    // Touch handlers
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
            if (distance > 0) nextProduct();
            else prevProduct();
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
                {products.map((product, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass-card group relative transition-all duration-500 overflow-hidden rounded-xl cursor-pointer"
                        onClick={() => openLightbox(index)}
                    >
                        <div className="aspect-[4/5] overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-40"></div>
                        </div>

                        <div className="p-3 sm:p-6 relative z-10">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1.5 sm:mb-2">
                                <h4 className="text-xs sm:text-lg font-serif font-bold group-hover:text-accent transition-colors leading-snug">{product.name}</h4>
                                <span className="text-accent text-[10px] sm:text-base font-sans font-bold mt-0.5 sm:mt-0">{product.price}</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-gray-400 font-sans leading-relaxed line-clamp-2 hidden sm:block">
                                {product.description}
                            </p>

                            <button className="mt-4 sm:mt-8 w-full py-2.5 sm:py-4 glass-button text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-bold hover:bg-accent hover:text-primary active:bg-accent active:text-primary transition-all duration-500 flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-none">
                                <Info size={12} className="sm:w-[14px] sm:h-[14px]" />
                                <span className="hidden sm:inline">View HD Details</span>
                                <span className="sm:hidden">View HD</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ─── Pro Lightbox ──────────────────────────────────────────── */}
            <AnimatePresence>
                {selectedProduct !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 md:p-12 h-[100dvh] w-screen overflow-hidden touch-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(5,16,32,0.95) 0%, rgba(3,10,19,0.99) 70%)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                        }}
                        onClick={closeLightbox}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {/* Ambient glow */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(160,174,192,0.06)_0%,transparent_60%)]" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px]" />
                        </div>

                        {/* Top Bar with Back Button */}
                        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-[110] bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                            <button
                                className="flex items-center gap-2 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/10 pointer-events-auto"
                                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                            >
                                <ChevronLeft size={20} strokeWidth={2} />
                                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold">Back</span>
                            </button>
                        </div>

                        {/* Nav arrows */}
                        <button
                            className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 text-white/25 hover:text-white active:text-white hover:bg-white/5 active:bg-white/10 rounded-full transition-all p-2 sm:p-3 z-[110] backdrop-blur-sm border border-white/0 hover:border-white/5"
                            onClick={(e) => { e.stopPropagation(); prevProduct(); }}
                        >
                            <ChevronLeft size={28} strokeWidth={1.5} className="sm:w-10 sm:h-10" />
                        </button>

                        <button
                            className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 text-white/25 hover:text-white active:text-white hover:bg-white/5 active:bg-white/10 rounded-full transition-all p-2 sm:p-3 z-[110] backdrop-blur-sm border border-white/0 hover:border-white/5"
                            onClick={(e) => { e.stopPropagation(); nextProduct(); }}
                        >
                            <ChevronRight size={28} strokeWidth={1.5} className="sm:w-10 sm:h-10" />
                        </button>

                        {/* Centered content */}
                        <motion.div
                            key={selectedProduct}
                            initial={{ scale: 0.88, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.88, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
                            className="relative w-full h-full sm:max-w-4xl flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image with glassmorphic frame */}
                            <div className="relative group w-full flex justify-center items-center flex-1">
                                {/* Glow aura behind image */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[80%] h-[80%] bg-accent/[0.06] blur-[80px] rounded-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                                </div>

                                <div className="relative rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-white/[0.02] backdrop-blur-sm max-h-[70dvh] sm:max-h-[65vh] flex items-center justify-center">
                                    <img
                                        src={products[selectedProduct].image}
                                        alt={products[selectedProduct].name}
                                        className="max-w-full max-h-[70dvh] sm:max-h-[65vh] object-contain block mx-auto"
                                    />
                                </div>
                            </div>

                            {/* Info panel below image */}
                            <div className="mt-5 sm:mt-8 text-center w-full max-w-lg mx-auto px-4">
                                <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-xl px-5 py-4 sm:px-8 sm:py-5">
                                    <h3 className="text-lg sm:text-2xl font-serif font-bold mb-1">{products[selectedProduct].name}</h3>
                                    <p className="text-accent text-base sm:text-xl font-sans font-bold mb-2 sm:mb-3">{products[selectedProduct].price}</p>
                                    <div className="h-px w-12 bg-accent/20 mx-auto mb-2 sm:mb-3" />
                                    <p className="text-gray-400 text-[11px] sm:text-sm leading-relaxed">
                                        {products[selectedProduct].description}
                                    </p>
                                </div>

                                {/* Counter */}
                                <span className="inline-block mt-3 sm:mt-5 text-accent/40 text-[10px] tracking-[.4em] uppercase">
                                    {selectedProduct + 1} / {products.length}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductGallery;
