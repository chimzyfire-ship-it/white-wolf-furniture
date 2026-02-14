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
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

                        <div className="p-6 relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-serif font-bold group-hover:text-accent transition-colors">{product.name}</h4>
                                <span className="text-accent font-sans font-bold">{product.price}</span>
                            </div>
                            <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-2">
                                {product.description}
                            </p>

                            <button className="mt-8 w-full py-4 glass-button text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-accent hover:text-primary transition-all duration-500 flex items-center justify-center gap-2">
                                <Info size={14} />
                                View HD Details
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
                        className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-all p-2 z-[110]"
                            onClick={closeLightbox}
                        >
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-all p-4 z-[110]"
                            onClick={prevProduct}
                        >
                            <ChevronLeft size={40} />
                        </button>

                        <button
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-all p-4 z-[110]"
                            onClick={nextProduct}
                        >
                            <ChevronRight size={40} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-primary/50 p-8 rounded-2xl border border-white/5"
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
                                <h4 className="text-accent text-[10px] tracking-[.5em] uppercase font-black mb-4">Product Detail</h4>
                                <h3 className="text-4xl md:text-5xl font-serif font-black mb-4">{products[selectedProduct].name}</h3>
                                <p className="text-2xl font-sans font-bold text-accent mb-6">{products[selectedProduct].price}</p>
                                <div className="h-px w-20 bg-accent/30 mb-8"></div>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    {products[selectedProduct].description}
                                </p>
                                <button
                                    onClick={closeLightbox}
                                    className="px-10 py-5 glass-button text-accent font-black tracking-[.4em] uppercase hover:bg-accent hover:text-primary transition-all duration-500"
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
