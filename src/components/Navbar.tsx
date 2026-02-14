import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'Products', href: '#products' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'About Us', href: '#about' },
        { name: 'Contacts', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-4 z-50">
                    <img src="/logo.png" alt="White Wolf Furniture Logo" className="h-10 md:h-12 w-auto" />
                    <span className="text-lg md:text-xl font-serif font-bold tracking-wider hidden xs:block uppercase">White Wolf</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-[10px] font-black tracking-[.4em] uppercase">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="hover:text-accent transition-all duration-300">
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden z-50">
                    <button onClick={toggleMenu} className="text-secondary p-2 hover:text-accent transition-colors">
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-primary/95 backdrop-blur-xl transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="flex flex-col items-center justify-center h-full gap-10">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={closeMenu}
                            className={`text-2xl font-serif font-black tracking-[.2em] uppercase transition-all duration-500 hover:text-accent ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
