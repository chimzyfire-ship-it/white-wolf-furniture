import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, User, MessageSquare } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { isQuoteModalOpen, closeQuoteModal } from '../store/quoteStore';

const QuoteModal: React.FC = () => {
    const isOpen = useStore(isQuoteModalOpen);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real scenario, this would send data to a backend or Formspree
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            closeQuoteModal();
        }, 3000);
    };

    const onClose = () => closeQuoteModal();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg glass-card p-8 md:p-12 overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h2 className="text-3xl font-serif font-bold mb-2">Request a <span className="text-accent">Quote</span></h2>
                                    <p className="text-gray-400 text-sm mb-8">Tell us about your project and we'll get back to you with a personalized estimate.</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="relative">
                                            <User size={18} className="absolute left-4 top-4 text-accent/50" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full glass-input p-4 pl-12 rounded-sm"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-4 top-4 text-accent/50" />
                                            <input
                                                required
                                                type="email"
                                                placeholder="Your Email (for the quote)"
                                                className="w-full glass-input p-4 pl-12 rounded-sm"
                                            />
                                        </div>
                                        <div className="relative">
                                            <MessageSquare size={18} className="absolute left-4 top-4 text-accent/50" />
                                            <textarea
                                                required
                                                rows={4}
                                                placeholder="Project Details (Size, Wood Type, etc.)"
                                                className="w-full glass-input p-4 pl-12 rounded-sm"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-4 glass-button text-accent font-bold tracking-[.3em] uppercase hover:bg-accent hover:text-primary transition-all duration-500 flex items-center justify-center gap-3"
                                        >
                                            <Send size={18} />
                                            Send Request
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Send size={32} className="text-accent" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold mb-2">Request Received!</h3>
                                    <p className="text-gray-400">Our team will review your project and send a quote to your email shortly.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuoteModal;
