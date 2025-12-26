import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
        alert('شكراً لتواصلك! سأرد عليك قريباً.')
        setFormData({ name: '', email: '', message: '' })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const contactInfo = [
        { icon: <Mail size={24} />, label: 'البريد الإلكتروني', value: 'contact@abdulsalam.dev' },
        { icon: <Phone size={24} />, label: 'الهاتف', value: '+966 XX XXX XXXX' },
        { icon: <MapPin size={24} />, label: 'الموقع', value: 'المملكة العربية السعودية' },
    ]

    const socialLinks = [
        { icon: <Github size={24} />, href: 'https://github.com/Abdualsslam', label: 'GitHub' },
        { icon: <Linkedin size={24} />, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: <Twitter size={24} />, href: 'https://twitter.com', label: 'Twitter' },
    ]

    return (
        <section id="contact" className="py-24 bg-dark-secondary">
            <div className="max-w-6xl mx-auto px-5">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    تواصل معي
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold mb-5">دعنا نتحدث</h3>
                        <p className="text-gray-400 leading-relaxed mb-9">
                            هل لديك مشروع أو فكرة تريد تنفيذها؟ لا تتردد في التواصل معي. أنا دائماً متحمس للعمل على مشاريع جديدة ومثيرة.
                        </p>

                        <div className="flex flex-col gap-6 mb-9">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-primary/15 rounded-xl text-primary">
                                        {info.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">{info.label}</span>
                                        <span className="font-medium">{info.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-11 h-11 flex items-center justify-center bg-dark-card rounded-xl text-gray-400 border border-white/10 transition-all hover:bg-primary hover:text-white hover:-translate-y-1"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form
                        className="card p-10"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 font-medium">الاسم</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="اسمك الكامل"
                                required
                                className="w-full px-5 py-4 bg-dark-secondary border border-white/10 rounded-xl text-white font-cairo transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 font-medium">البريد الإلكتروني</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com"
                                required
                                className="w-full px-5 py-4 bg-dark-secondary border border-white/10 rounded-xl text-white font-cairo transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message" className="block mb-2 font-medium">الرسالة</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="اكتب رسالتك هنا..."
                                rows={5}
                                required
                                className="w-full px-5 py-4 bg-dark-secondary border border-white/10 rounded-xl text-white font-cairo transition-all resize-y min-h-[120px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-500"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full justify-center">
                            <Send size={20} />
                            إرسال الرسالة
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}
