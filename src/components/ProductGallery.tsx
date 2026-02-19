import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, ChevronLeft, ChevronRight, Info } from 'lucide-react';

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

    const openLightbox = (index: number) => setSelectedProduct(index);
    const closeLightbox = () => setSelectedProduct(null);

    const nextProduct = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProduct !== null) {
            setSelectedProduct((selectedProduct + 1) % products.length);
        }
    };

    const prevProduct = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProduct !== null) {
            setSelectedProduct((selectedProduct - 1 + products.length) % products.length);
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

            <AnimatePresence>
                {selectedProduct !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-12"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/50 hover:text-white active:text-white transition-all p-2.5 sm:p-2 z-[110] bg-white/5 sm:bg-transparent rounded-full"
                            onClick={closeLightbox}
                        >
                            <X size={28} className="sm:w-8 sm:h-8" />
                        </button>

                        <button
                            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white active:text-white transition-all p-2 sm:p-4 z-[110]"
                            onClick={prevProduct}
                        >
                            <ChevronLeft size={32} className="sm:w-10 sm:h-10" />
                        </button>

                        <button
                            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white active:text-white transition-all p-2 sm:p-4 z-[110]"
                            onClick={nextProduct}
                        >
                            <ChevronRight size={32} className="sm:w-10 sm:h-10" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center bg-primary/50 p-4 sm:p-8 rounded-2xl border border-white/5 mx-6 sm:mx-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative group overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                                <img
                                    src={products[selectedProduct].image}
                                    alt={products[selectedProduct].name}
                                    className="w-full h-auto object-contain max-h-[60vh]"
                                />
                            </div>

                            <div className="text-left">
                                <h4 className="text-accent text-[9px] sm:text-[10px] tracking-[.4em] sm:tracking-[.5em] uppercase font-black mb-2 sm:mb-4">Product Detail</h4>
                                <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black mb-2 sm:mb-4">{products[selectedProduct].name}</h3>
                                <p className="text-lg sm:text-2xl font-sans font-bold text-accent mb-4 sm:mb-6">{products[selectedProduct].price}</p>
                                <div className="h-px w-16 sm:w-20 bg-accent/30 mb-4 sm:mb-8"></div>
                                <p className="text-gray-400 text-sm sm:text-lg leading-relaxed mb-5 sm:mb-8">
                                    {products[selectedProduct].description}
                                </p>
                                <button
                                    onClick={closeLightbox}
                                    className="px-6 sm:px-10 py-3 sm:py-5 glass-button text-accent font-black text-[10px] sm:text-xs tracking-[.3em] sm:tracking-[.4em] uppercase hover:bg-accent hover:text-primary active:bg-accent active:text-primary transition-all duration-500 rounded-lg sm:rounded-none"
                                >
                                    Close View
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductGallery;
