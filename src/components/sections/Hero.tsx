import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import myPhoto from '../../assets/my_photo.png'
import flutterLogo from '../../assets/flutter-logo.png'
import vscodeLogo from '../../assets/visual-studio-code.png'
import pythonLogo from '../../assets/python.png'
import n8nLogo from '../../assets/n8n.svg'

export default function Hero() {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-secondary to-[#16213e]">
                    <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[radial-gradient(circle,rgba(126,102,172,0.15)_0%,transparent_60%)] animate-pulse-slow" />
                    <div className="absolute bottom-[-50%] left-[-50%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(143,0,255,0.1)_0%,transparent_60%)] animate-pulse-slow animation-delay-[-5s]" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-5 pt-16 pb-20 lg:pt-24 lg:pb-0 h-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-6rem)]">
                    {/* Text Content */}
                    <motion.div
                        className="text-center lg:text-right order-1 lg:order-1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
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
                            className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 lg:mr-0 mb-10 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            أقوم بتطوير تطبيقات الهاتف المحمول وحلول الأتمتة التي تساعد الشركات على تحسين أدائها وتوفير الوقت والجهد
                        </motion.p>

                        <motion.div
                            className="flex gap-5 justify-center lg:justify-start flex-wrap mb-12"
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

                    {/* Photo Section */}
                    <motion.div
                        className="relative order-2 lg:order-2 flex justify-center items-end self-end"
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
                            whileHover={{ scale: 1.02 }}
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
