import React from 'react';
import { openQuoteModal } from '../store/quoteStore';
import { Send } from 'lucide-react';

const QuoteButton: React.FC = () => {
    return (
        <button
            onClick={openQuoteModal}
            className="px-10 py-5 glass-button text-accent font-bold tracking-[.4em] uppercase hover:bg-accent hover:text-primary transition-all duration-500 flex items-center gap-3 mx-auto md:mx-0 group shadow-2xl"
        >
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Request a Quote
        </button>
    );
};

export default QuoteButton;
