import { useState } from 'react';
import { COMPANY_DATA } from '../data';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { company_name } = COMPANY_DATA.company_profile.contact_info;

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navLinks = [
        { name: 'About Us', href: '#about' },
        { name: 'Our Products', href: '#products' },
        { name: 'Contact Us', href: '#contact' },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#" className="flex items-center space-x-3 ml-[-10px]">
                    {/* Ensure you put a logo.png in your 'public/images' folder */}
                    <img
                        src="/images/logo.png"
                        onError={(e) => { e.target.src = 'https://placehold.co/40x40/cccccc/ffffff?text=L' }}
                        alt="Company Logo"
                        className="h-10 w-10"
                    />
                    <h1 className="text-2xl font-bold text-dark-green">{company_name}</h1>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-600 hover:text-green-600 transition duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-600 hover:text-green-600 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-6 pb-4 bg-white border-t">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="block py-2 text-gray-600 hover:text-green-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;