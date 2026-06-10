import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projectsData = [
    {
        title: 'تطبيق تجديد | Tagadod',
        description: 'تطبيق تجارة إلكترونية وسوق صيانة متكامل ضخم (~80 شاشة) مبني بـ Clean Architecture و Bloc/Cubit. يربط العملاء بالمهندسين ويدعم المحادثات الفورية وتخزين مؤقت عالي الأداء مع نظام أمان JWT متقدم وإشعارات دفع ديناميكية.',
        tags: ['Flutter', 'Bloc/Cubit', 'Clean Architecture', 'Socket.IO', 'Hive', 'FCM'],
        github: 'https://github.com/Abdualsslam',
        demo: '#'
    },
    {
        title: 'تطبيق TRAS Phone',
        description: 'تطبيق B2B مخصص لتجار تجزئة قطع غيار الهواتف والمهندسين. يتميز بمزامنة ذكية للسلة محلياً وسحابياً (Offline Cart Sync)، ونظام دردشة دعم فني، وتوثيق آمن مع إمكانية الولوج بالبصمة الحيوية وخرائط جوجل لتحديد مواقع الشحن.',
        tags: ['Flutter', 'Bloc/Cubit', 'GoRouter', 'Secure Storage', 'local_auth', 'Google Maps'],
        github: 'https://github.com/Abdualsslam',
        demo: '#'
    },
    {
        title: 'تطبيق Smart Store',
        description: 'متجر إلكتروني ذكي للهواتف مع تدفق تسوق متكامل (التصنيفات، المفضلة، السلة، الدفع، الكوبونات). تم بناؤه بالكامل بالاعتماد على خدمات Firebase السحابية وتأمين الطلبات البرمجية عبر Firebase App Check لإدارة المدفوعات والبيانات.',
        tags: ['Flutter', 'GetX', 'Firebase Auth', 'Firestore', 'Firebase App Check', 'GetStorage'],
        github: 'https://github.com/Abdualsslam',
        demo: '#'
    },
    {
        title: 'حزمة elastic_sheet',
        description: 'حزمة برمجية مفتوحة المصدر تم نشرها على مستودع حزم فلاتر الرسمي pub.dev. وهي عبارة عن ويدجت فلاتر مخصص لإنشاء أسطح وقوائم قابلة للتمدد والتقلص الديناميكي بفيزياء السوائل وحركة النوابض الطبيعية.',
        tags: ['Flutter Package', 'Dart', 'Spring Physics', 'Open Source', 'pub.dev'],
        github: 'https://github.com/Abdualsslam/elastic_sheet',
        demo: 'https://pub.dev/packages/elastic_sheet'
    },
    {
        title: 'حزمة frost_nav_bar',
        description: 'حزمة شريط تنقل سفلي زجاجي فاخر (Glassmorphism) مفتوحة المصدر ومنشورة على pub.dev. تدعم الحركات الحرة وتأثير بلور الخلفية، ومؤشرات السحب المرنة مع توافقية ممتازة مع الواجهات العربية والعالمية (RTL/LTR).',
        tags: ['Flutter Package', 'Dart', 'Glassmorphism', 'Open Source', 'pub.dev'],
        github: 'https://github.com/Abdualsslam/frost_nav_bar',
        demo: 'https://pub.dev/packages/frost_nav_bar'
    },
    {
        title: 'أتمتة مبيعات البوت | n8n',
        description: 'نظام أتمتة متكامل للرد على رسائل العملاء، واستقبال الطلبات، ومعالجة البيانات تلقائياً دون تدخل بشري. يعتمد بالكامل على منصة سير العمل n8n وسكريبتات Python للتواصل المباشر مع ملفات إكسل كقاعدة بيانات.',
        tags: ['n8n Workflows', 'Python Scripting', 'Automation', 'Excel API'],
        github: 'https://github.com/Abdualsslam',
        demo: '#'
    }
]

export default function Projects() {
    return (
        <section id="projects" className="py-24 bg-dark-secondary">
            <div className="max-w-6xl mx-auto px-5">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    المشاريع
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={index}
                            className="card p-0 overflow-hidden group flex flex-col justify-between"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <div>
                                <div className="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-6xl font-extrabold text-white/30">
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="GitHub"
                                            className="w-12 h-12 flex items-center justify-center bg-dark-card rounded-full text-white transition-all hover:bg-primary hover:scale-110"
                                        >
                                            <Github size={24} />
                                        </a>
                                        {project.demo !== '#' && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Demo"
                                                className="w-12 h-12 flex items-center justify-center bg-dark-card rounded-full text-white transition-all hover:bg-primary hover:scale-110"
                                            >
                                                <ExternalLink size={24} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3 text-white text-right" dir="rtl">{project.title}</h3>
                                    <p className="text-gray-400 text-sm mb-5 leading-relaxed text-right" dir="rtl">{project.description}</p>
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <div className="flex flex-wrap gap-2 justify-end" dir="rtl">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-primary/20 text-primary-light rounded-full text-xs border border-primary/30"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
