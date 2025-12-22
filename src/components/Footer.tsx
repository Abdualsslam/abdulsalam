import { Heart } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark py-10 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-5 flex flex-col items-center gap-4 text-center">
                <a href="#home" className="text-2xl font-extrabold text-white no-underline">
                    عبدالسلام<span className="text-primary">.</span>
                </a>

                <p className="text-gray-400 flex items-center gap-1">
                    صُنع بـ <Heart size={16} className="text-secondary animate-heartbeat" /> بواسطة عبدالسلام معاد
                </p>

                <p className="text-gray-500 text-sm">
                    © {currentYear} جميع الحقوق محفوظة
                </p>
            </div>
        </footer>
    )
}
