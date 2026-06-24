import { motion, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import { useRef } from 'react'
import { usePointerParallax } from '../../hooks/usePointerParallax'
import MagneticButton from '../common/MagneticButton'
import StatCounter from '../common/StatCounter'
import myPhoto from '../../assets/my_photo.webp'
import flutterLogo from '../../assets/flutter-logo.webp'
import vscodeLogo from '../../assets/visual-studio-code.webp'
import pythonLogo from '../../assets/python.webp'
import n8nLogo from '../../assets/n8n.svg'

interface HeroProps {
    onOpenContact?: () => void
}

const stats = [
    { value: 5, prefix: '+', label: 'سنوات خبرة' },
    { value: 6, prefix: '', label: 'مشاريع رئيسية' },
    { value: 2, prefix: '', label: 'حزمة على pub.dev' },
    { value: 80, prefix: '~', label: 'شاشة في أكبر تطبيق' },
]

export default function Hero({ onOpenContact }: HeroProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const { x: px, y: py } = usePointerParallax(sectionRef)

    // Parallax translations (different factors = depth)
    const orbX = useTransform(px, (v) => v * -40)
    const orbY = useTransform(py, (v) => v * -40)
    const photoX = useTransform(px, (v) => v * 25)
    const photoY = useTransform(py, (v) => v * 25)
    // 3D tilt for the photo
    const rotateY = useTransform(px, (v) => v * 16)
    const rotateX = useTransform(py, (v) => v * -16)

    return (
        <section
            id="home"
            ref={sectionRef}
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-secondary to-[#16213e]">
                    <motion.div style={{ x: orbX, y: orbY }} className="absolute inset-0">
                        <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[radial-gradient(circle,rgba(126,102,172,0.15)_0%,transparent_60%)] animate-pulse-slow" />
                        <div className="absolute bottom-[-50%] left-[-50%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(143,0,255,0.1)_0%,transparent_60%)] animate-pulse-slow animation-delay-[-5s]" />
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-5 pt-12 pb-24 md:pt-16 md:pb-20 lg:pt-20 lg:pb-12 h-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-12rem)] lg:min-h-[calc(100vh-6rem)]">
                    {/* Text Content */}
                    <motion.div
                        className="text-center lg:text-right order-1 lg:order-1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="inline-flex items-center gap-2 text-sm md:text-base text-emerald-300 mb-3 md:mb-5 px-4 md:px-5 py-1.5 md:py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </span>
                            مشروعك يستحق أن يرى النور.. دعنا نبدأ
                        </motion.span>

                        <motion.h1
                            className="text-4xl md:text-6xl font-extrabold mb-2 md:mb-4 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            عبدالسلام <span className="text-primary">معاد</span>
                        </motion.h1>

                        <motion.h2
                            className="text-xl md:text-3xl font-medium text-gray-400 mb-4 md:mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            مطور <span className="gradient-text-animated">Flutter</span> · محلل <span className="gradient-text-animated">نظم</span> · مهندس <span className="gradient-text-animated">أتمتة</span>
                        </motion.h2>

                        <motion.p
                            className="text-sm md:text-lg text-gray-300/90 max-w-xl mx-auto lg:mx-0 lg:mr-0 mb-7 md:mb-10 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            أبني تطبيقات <span className="text-primary-light font-medium">Flutter</span> سريعة وآمنة بمعمارية نظيفة وإدارة حالة متقدمة، وأصمّم أنظمة أتمتة (<span className="text-primary-light font-medium">Python · n8n</span>) توفّر وقت فرق العمل. من تطبيق ضخم بـ~80 شاشة إلى حزمتين منشورتين على pub.dev — أحوّل الأفكار المعقّدة إلى منتجات حقيقية.
                        </motion.p>

                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-xl mx-auto lg:mx-0 mb-7 md:mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            {stats.map((stat, i) => (
                                <StatCounter
                                    key={stat.label}
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    label={stat.label}
                                    delay={900 + i * 120}
                                />
                            ))}
                        </motion.div>

                        <motion.div
                            className="flex gap-3 md:gap-5 justify-center lg:justify-start flex-wrap mb-8 md:mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <MagneticButton
                                href="#contact"
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onOpenContact?.()
                                }}
                            >
                                <Mail size={20} />
                                تواصل معي
                            </MagneticButton>
                            <MagneticButton href="/cv.pdf" download className="btn btn-secondary">
                                <Download size={20} />
                                تحميل السيرة الذاتية
                            </MagneticButton>
                        </motion.div>

                        <motion.div
                            className="flex gap-6 justify-center lg:justify-start"
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
                                href="https://www.linkedin.com/in/abdulsalam-muaad/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-card text-gray-400 border border-white/10 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href="mailto:abdulsalammuaad@gmail.com"
                                aria-label="Email"
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-card text-gray-400 border border-white/10 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
                            >
                                <Mail size={24} />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Photo Section */}
                    <motion.div
                        className="relative order-2 lg:order-2 flex justify-center items-end self-end"
                        style={{ x: photoX, y: photoY }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        {/* Glowing Background Effects */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 blur-3xl animate-pulse-slow" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-[#8f00ff]/20 to-[#7e66ac]/20 blur-2xl animate-pulse-slow animation-delay-[-3s]" />
                        </div>

                        {/* Floating Particles */}
                        <motion.div
                            className="absolute top-10 right-10 w-3 h-3 bg-primary rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-20 left-10 w-2 h-2 bg-secondary rounded-full"
                            animate={{
                                y: [0, 15, 0],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div
                            className="absolute top-1/3 left-5 w-4 h-4 bg-primary-light/50 rounded-full"
                            animate={{
                                y: [0, -10, 0],
                                x: [0, 5, 0],
                                opacity: [0.4, 0.8, 0.4]
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        />

                        {/* Main Photo Container */}
                        <motion.div
                            className="relative z-10"
                            style={{ rotateX, rotateY, transformPerspective: 900 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Decorative Ring */}
                            <div className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-spin-slow" style={{ animationDuration: '20s' }} />
                            <div className="absolute -inset-8 rounded-full border border-secondary/10 animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

                            {/* Photo with Glow */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-30" />
                                <img
                                    src={myPhoto}
                                    alt="عبدالسلام معاد"
                                    className="relative w-[200px] h-auto md:w-[320px] lg:w-[420px] max-h-[40vh] md:max-h-[60vh] lg:max-h-[75vh] object-contain object-bottom drop-shadow-2xl"
                                    style={{
                                        filter: 'drop-shadow(0 0 30px rgba(143, 0, 255, 0.3)) drop-shadow(0 0 60px rgba(126, 102, 172, 0.2))'
                                    }}
                                />

                                {/* Floating Skill Icons Between Hands */}
                                <motion.div
                                    className="absolute top-[40%] left-[20%] -translate-x-1/2 flex gap-4 items-center z-20"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                >


                                    {/* n8n Icon */}
                                    <motion.div
                                        className="relative"
                                        animate={{ y: [0, 8, 0] }}
                                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                    >
                                        <div className="absolute inset-0 bg-[#EA4B71] rounded-full blur-lg opacity-40" />
                                        <img
                                            src={n8nLogo}
                                            alt="n8n"
                                            className="relative w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg"
                                            style={{ filter: 'drop-shadow(0 0 10px rgba(234, 75, 113, 0.5))' }}
                                        />
                                    </motion.div>
                                    {/* Python Icon */}
                                    <motion.div
                                        className="relative"
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                                    >
                                        <div className="absolute inset-0 bg-[#FFD43B] rounded-full blur-lg opacity-40" />
                                        <img
                                            src={pythonLogo}
                                            alt="Python"
                                            className="relative w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg"
                                            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 212, 59, 0.5))' }}
                                        />
                                    </motion.div>

                                    {/* VS Code Icon */}
                                    <motion.div
                                        className="relative"
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                                    >
                                        <div className="absolute inset-0 bg-[#007ACC] rounded-full blur-lg opacity-40" />
                                        <img
                                            src={vscodeLogo}
                                            alt="VS Code"
                                            className="relative w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg"
                                            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 122, 204, 0.5))' }}
                                        />
                                    </motion.div>


                                    {/* Flutter Icon */}
                                    <motion.div
                                        className="relative"
                                        animate={{ y: [0, -12, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className="absolute inset-0 bg-[#02569B] rounded-full blur-lg opacity-40" />
                                        <img
                                            src={flutterLogo}
                                            alt="Flutter"
                                            className="relative w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg"
                                            style={{ filter: 'drop-shadow(0 0 10px rgba(2, 86, 155, 0.5))' }}
                                        />
                                    </motion.div>

                                </motion.div>

                                {/* Glow Effect Behind Icons */}
                                <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-radial from-primary/30 via-secondary/20 to-transparent blur-2xl rounded-full pointer-events-none" />
                            </div>
                        </motion.div>

                        {/* Tech Stack Floating Badges */}
                        <motion.div
                            className="absolute top-5 left-0 px-4 py-2 bg-dark-card/80 backdrop-blur-sm rounded-full border border-primary/30 text-sm text-primary-light"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            Flutter
                        </motion.div>
                        <motion.div
                            className="absolute bottom-10 right-0 px-4 py-2 bg-dark-card/80 backdrop-blur-sm rounded-full border border-secondary/30 text-sm text-secondary"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        >
                            Automation
                        </motion.div>
                        <motion.div
                            className="absolute top-1/2 -left-5 px-3 py-1.5 bg-dark-card/80 backdrop-blur-sm rounded-full border border-primary/20 text-xs text-gray-400"
                            animate={{ x: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        >
                            Mobile Dev
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
