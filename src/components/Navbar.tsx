import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="White Wolf Furniture Logo" className="h-12 w-auto" />
                    <span className="text-xl font-serif font-bold tracking-wider hidden sm:block uppercase">White Wolf</span>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
                    <a href="#hero" className="hover:text-accent transition-colors">Home</a>
                    <a href="#products" className="hover:text-accent transition-colors">Products</a>
                    <a href="#gallery" className="text-sm font-bold tracking-[.3em] uppercase hover:text-accent transition-colors">Gallery</a>
                    <a href="#about" className="text-sm font-bold tracking-[.3em] uppercase hover:text-accent transition-colors">About</a>
                    <a href="#contact" className="text-sm font-bold tracking-[.3em] uppercase hover:text-accent transition-colors">Contact</a>
                </div>

                <div className="md:hidden">
                    <button className="text-secondary p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
