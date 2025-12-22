import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projectsData = [
    {
        title: 'تطبيق تجديد',
        description: 'تطبيق تجارة إلكترونية متكامل يدعم البائعين والمشترين مع نظام دفع وتوصيل.',
        tags: ['Flutter', 'Firebase', 'REST API'],
        github: 'https://github.com/Abdualsslam',
        demo: '#'
    },
    {
        title: 'نظام أتمتة المهام',
        description: 'نظام لأتمتة المهام المتكررة وإدارة سير العمل باستخدام Python.',
        tags: ['Python', 'Selenium', 'API'],
        github: 'https://github.com/Abdualsslam',
        demo: '#'
    },
    {
        title: 'تطبيق إدارة المشاريع',
        description: 'تطبيق لإدارة المشاريع والمهام مع تتبع الوقت والتقارير.',
        tags: ['Flutter', 'Bloc', 'SQLite'],
        github: 'https://github.com/Abdualsslam',
        demo: '#'
    },
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
                            className="card p-0 overflow-hidden group"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                        >
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
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Demo"
                                        className="w-12 h-12 flex items-center justify-center bg-dark-card rounded-full text-white transition-all hover:bg-primary hover:scale-110"
                                    >
                                        <ExternalLink size={24} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1.5 bg-primary/20 text-primary-light rounded-full text-xs border border-primary/30"
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
