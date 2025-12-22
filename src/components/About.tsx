import { motion } from 'framer-motion'
import { Code, Zap, Smartphone } from 'lucide-react'

export default function About() {
    const features = [
        {
            icon: <Smartphone size={32} />,
            title: 'تطوير التطبيقات',
            description: 'بناء تطبيقات متعددة المنصات باستخدام Flutter'
        },
        {
            icon: <Zap size={32} />,
            title: 'الأتمتة',
            description: 'أتمتة العمليات وتحسين الإنتاجية'
        },
        {
            icon: <Code size={32} />,
            title: 'حلول برمجية',
            description: 'تطوير حلول مخصصة للاحتياجات الخاصة'
        }
    ]

    return (
        <section id="about" className="py-24 bg-dark-secondary">
            <div className="max-w-6xl mx-auto px-5">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    نبذة عني
                </motion.h2>

                <div className="grid gap-16">
                    <motion.div
                        className="max-w-2xl mx-auto text-center"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-xl mb-5 text-gray-300">
                            مرحباً! أنا <strong className="text-primary">عبدالسلام معاد</strong>، مطور برمجيات متخصص في تطوير تطبيقات الهاتف المحمول وحلول الأتمتة.
                        </p>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            أمتلك خبرة واسعة في تطوير تطبيقات Flutter عالية الجودة والأداء، بالإضافة إلى بناء أنظمة أتمتة تساعد الشركات على تحسين كفاءتها التشغيلية.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            أؤمن بأن التكنولوجيا يجب أن تكون أداة لتسهيل الحياة وتحسين تجربة المستخدم. لذلك أحرص دائماً على تطوير حلول تجمع بين الجمال والوظيفية.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="card text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-gradient-to-r from-primary to-secondary rounded-xl text-white">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
