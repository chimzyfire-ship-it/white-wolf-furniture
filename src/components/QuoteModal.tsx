import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, User, MessageSquare, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { isQuoteModalOpen, closeQuoteModal } from '../store/quoteStore';

const WEB3FORMS_KEY = '96980d13-934b-4d87-8062-bbffe1c968fd';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const QuoteModal: React.FC = () => {
    const isOpen = useStore(isQuoteModalOpen);
    const [formState, setFormState] = useState<FormState>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('submitting');
        setErrorMsg('');

        const formData = new FormData(e.currentTarget);
        formData.append('access_key', WEB3FORMS_KEY);
        formData.append('subject', 'New Quote Request — White Wolf Furniture');
        formData.append('from_name', 'White Wolf Website');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setFormState('success');
                setTimeout(() => {
                    setFormState('idle');
                    closeQuoteModal();
                }, 3000);
            } else {
                setFormState('error');
                setErrorMsg(data.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setFormState('error');
            setErrorMsg('Network error. Please check your connection and try again.');
        }
    };

    const onClose = () => {
        if (formState !== 'submitting') {
            setFormState('idle');
            setErrorMsg('');
            closeQuoteModal();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
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
                        className="relative w-full max-w-lg glass-card p-6 sm:p-8 md:p-12 overflow-hidden rounded-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white active:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10"
                        >
                            <X size={20} />
                        </button>

                        <AnimatePresence mode="wait">
                            {formState === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-10 sm:py-12"
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                                        <CheckCircle2 size={32} className="text-green-400" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">Request Received!</h3>
                                    <p className="text-gray-400 text-sm">Our team will review your project and send a quote to your email shortly.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Request a <span className="text-accent">Quote</span></h2>
                                    <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8">Tell us about your project and we'll get back to you with a personalized estimate.</p>

                                    {formState === 'error' && (
                                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
                                            <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-red-300 text-xs">{errorMsg}</p>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                                        <div className="relative">
                                            <User size={16} className="absolute left-4 top-4 text-accent/50" />
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                placeholder="Your Name"
                                                className="w-full glass-input p-3.5 sm:p-4 pl-11 sm:pl-12 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail size={16} className="absolute left-4 top-4 text-accent/50" />
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                placeholder="Your Email (for the quote)"
                                                className="w-full glass-input p-3.5 sm:p-4 pl-11 sm:pl-12 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone size={16} className="absolute left-4 top-4 text-accent/50" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Your Phone (optional)"
                                                className="w-full glass-input p-3.5 sm:p-4 pl-11 sm:pl-12 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div className="relative">
                                            <MessageSquare size={16} className="absolute left-4 top-4 text-accent/50" />
                                            <textarea
                                                required
                                                rows={3}
                                                name="message"
                                                placeholder="Project Details (Size, Wood Type, etc.)"
                                                className="w-full glass-input p-3.5 sm:p-4 pl-11 sm:pl-12 rounded-lg text-sm"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="w-full py-3.5 sm:py-4 glass-button text-accent font-bold tracking-[.25em] sm:tracking-[.3em] uppercase hover:bg-accent hover:text-primary active:bg-accent active:text-primary transition-all duration-500 flex items-center justify-center gap-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {formState === 'submitting' ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} />
                                                    Send Request
                                                </>
                                            )}
                                        </button>
                                    </form>
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
