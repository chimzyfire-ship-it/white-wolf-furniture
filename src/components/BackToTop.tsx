import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[90] p-4 glass-card rounded-full shadow-2xl transition-all duration-300 hover:bg-accent hover:text-primary group border border-white/10"
                    aria-label="Back to Top"
                >
                    <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 glass-card rounded text-[8px] tracking-widest uppercase font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Back to Top
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
