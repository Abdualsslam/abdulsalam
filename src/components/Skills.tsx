import { motion } from 'framer-motion'

const skillsData = {
    'تطوير التطبيقات': [
        { name: 'Flutter', level: 95 },
        { name: 'Dart', level: 90 },
        { name: 'React Native', level: 70 },
    ],
    'الأتمتة والـ Backend': [
        { name: 'Python', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'Firebase', level: 85 },
        { name: 'REST APIs', level: 90 },
    ],
    'الأدوات والتقنيات': [
        { name: 'Git / GitHub', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'CI/CD', level: 70 },
        { name: 'Figma', level: 65 },
    ],
}

export default function Skills() {
    return (
        <section id="skills" className="py-24">
            <div className="max-w-6xl mx-auto px-5">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    المهارات التقنية
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
                        <motion.div
                            key={category}
                            className="card p-9"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.2 }}
                        >
                            <h3 className="text-xl font-semibold mb-6 text-primary-light relative pb-4 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
                                {category}
                            </h3>
                            <div className="flex flex-col gap-5">
                                {skills.map((skill, skillIndex) => (
                                    <div key={skill.name} className="w-full">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium">{skill.name}</span>
                                            <span className="text-gray-500 text-sm">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + skillIndex * 0.1, duration: 0.8 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
