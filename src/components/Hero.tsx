import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react'

export default function Hero() {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-secondary to-[#16213e]">
                    <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[radial-gradient(circle,rgba(126,102,172,0.15)_0%,transparent_60%)] animate-pulse-slow" />
                    <div className="absolute bottom-[-30%] left-[-30%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(143,0,255,0.1)_0%,transparent_60%)] animate-pulse-slow animation-delay-[-5s]" />
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-5 pt-24 text-center">
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="inline-block text-lg text-primary-light mb-4 px-5 py-2 bg-primary/15 rounded-full border border-primary/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        مرحباً، أنا
                    </motion.span>

                    <motion.h1
                        className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        عبدالسلام <span className="text-primary">معاد</span>
                    </motion.h1>

                    <motion.h2
                        className="text-2xl md:text-3xl font-medium text-gray-400 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        مبرمج <span className="gradient-text">Flutter</span> و <span className="gradient-text">Automation</span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        أقوم بتطوير تطبيقات الهاتف المحمول وحلول الأتمتة التي تساعد الشركات على تحسين أدائها وتوفير الوقت والجهد
                    </motion.p>

                    <motion.div
                        className="flex gap-5 justify-center flex-wrap mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <a href="#contact" className="btn btn-primary">
                            <Mail size={20} />
                            تواصل معي
                        </a>
                        <a href="/cv.pdf" className="btn btn-secondary" download>
                            <Download size={20} />
                            تحميل السيرة الذاتية
                        </a>
                    </motion.div>

                    <motion.div
                        className="flex gap-6 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <a
                            href="https://github.com/Abdualsslam"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-card text-gray-400 border border-white/10 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-card text-gray-400 border border-white/10 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="mailto:contact@abdulsalam.dev"
                            aria-label="Email"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-card text-gray-400 border border-white/10 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
                        >
                            <Mail size={24} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            <motion.a
                href="#about"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce-slow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <ChevronDown size={30} />
            </motion.a>
        </section>
    )
}
