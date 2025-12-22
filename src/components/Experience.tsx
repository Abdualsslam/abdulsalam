import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experienceData = [
    {
        title: 'مطور Flutter',
        company: 'شركة تقنية',
        period: '2023 - الحالي',
        description: 'تطوير وصيانة تطبيقات الهاتف المحمول باستخدام Flutter. العمل ضمن فريق Agile وتطبيق أفضل الممارسات في التطوير.'
    },
    {
        title: 'مطور أتمتة',
        company: 'عمل حر',
        period: '2022 - 2023',
        description: 'بناء أنظمة أتمتة مخصصة للعملاء لتحسين الإنتاجية وتوفير الوقت. استخدام Python وأدوات الأتمتة المختلفة.'
    },
    {
        title: 'مطور مبتدئ',
        company: 'التعلم الذاتي',
        period: '2021 - 2022',
        description: 'تعلم أساسيات البرمجة وتطوير التطبيقات. بناء مشاريع شخصية والمساهمة في مشاريع مفتوحة المصدر.'
    },
]

export default function Experience() {
    return (
        <section id="experience" className="py-24">
            <div className="max-w-6xl mx-auto px-5">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    الخبرات العملية
                </motion.h2>

                <div className="relative max-w-3xl mx-auto before:content-[''] before:absolute before:top-0 before:right-5 before:w-0.5 before:h-full before:bg-gradient-to-b before:from-primary before:to-secondary before:rounded-full">
                    {experienceData.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="relative pr-16 mb-10 last:mb-0"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="absolute right-0 top-8 w-10 h-10 bg-dark border-[3px] border-primary rounded-full flex items-center justify-center text-primary z-10">
                                <Briefcase size={20} />
                            </div>
                            <div className="card p-7">
                                <div className="mb-3">
                                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                                    <span className="text-primary-light font-medium">{exp.company}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                    <Calendar size={16} />
                                    <span>{exp.period}</span>
                                </div>
                                <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
