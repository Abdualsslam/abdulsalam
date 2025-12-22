import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { href: '#home', label: 'الرئيسية' },
    { href: '#about', label: 'عني' },
    { href: '#skills', label: 'المهارات' },
    { href: '#projects', label: 'المشاريع' },
    { href: '#experience', label: 'الخبرات' },
    { href: '#contact', label: 'تواصل' },
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-300 ${isScrolled ? 'bg-dark/95 backdrop-blur-xl py-4 shadow-lg' : ''
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
                <a href="#home" className="text-3xl font-extrabold text-white no-underline">
                    عبدالسلام<span className="text-primary">.</span>
                </a>

                <nav className={`
          flex gap-10
          max-md:fixed max-md:top-0 max-md:right-0 max-md:w-full max-md:h-screen
          max-md:bg-dark max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-8
          max-md:transition-all max-md:duration-300
          ${isMenuOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'}
        `}>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-gray-400 font-medium no-underline relative transition-colors hover:text-white
                after:content-[''] after:absolute after:bottom-[-5px] after:right-0 after:w-0 
                after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary 
                after:transition-all after:duration-300 hover:after:w-full
                max-md:text-2xl"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <button
                    className="hidden max-md:block bg-transparent border-none text-white cursor-pointer p-1 z-[1001]"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </motion.header>
    )
}
