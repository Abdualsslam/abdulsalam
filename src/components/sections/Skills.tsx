import { motion } from 'framer-motion'

const skillsData = {
    'تطوير الموبايل (Flutter & Dart)': [
        { name: 'Flutter', level: 95 },
        { name: 'Dart', level: 90 },
        { name: 'Clean Architecture', level: 90 },
        { name: 'Bloc / Cubit', level: 90 },
        { name: 'GetX', level: 85 },
        { name: 'AR/EN Localization', level: 90 },
    ],
    'الأتمتة وتحليل النظم': [
        { name: 'Python Scripting', level: 85 },
        { name: 'n8n Workflows', level: 90 },
        { name: 'Systems Analysis', level: 85 },
        { name: 'User Flows & Data Entities', level: 85 },
    ],
    'التقنيات السحابية والأدوات': [
        { name: 'Dio & REST APIs', level: 90 },
        { name: 'Socket.IO (Real-time)', level: 85 },
        { name: 'JWT Auth & Refresh Tokens', level: 90 },
        { name: 'Hive & Firestore', level: 85 },
        { name: 'FCM & Push Notifications', level: 90 },
        { name: 'Google Maps & Geolocator', level: 85 },
        { name: 'Git / GitHub', level: 90 },
    ],
}

export default function Skills() {
    return (
        <section id="skills" className="py-24 text-ink">
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
                            <h3 className="text-xl font-semibold mb-6 text-primary relative pb-4 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-12 after:h-0.5 after:bg-primary after:rounded-full">
                                {category}
                            </h3>
                            <div className="flex flex-col gap-5">
                                {skills.map((skill, skillIndex) => (
                                    <div key={skill.name} className="w-full">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium">{skill.name}</span>
                                            <span className="text-ink-muted text-sm">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-paper-muted rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-primary rounded-full"
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
