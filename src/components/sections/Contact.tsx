import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<SubmitStatus>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // No Formspree configured → fall back to the user's mail client
        if (!FORMSPREE_ID) {
            const subject = encodeURIComponent(`رسالة من ${formData.name || 'زائر الموقع'}`)
            const body = encodeURIComponent(`${formData.message}\n\nالبريد للرد: ${formData.email}`)
            window.location.href = `mailto:abdulsalammuaad@gmail.com?subject=${subject}&body=${body}`
            return
        }

        try {
            setStatus('sending')
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const contactInfo = [
        { icon: <Mail size={24} />, label: 'البريد الإلكتروني', value: 'abdulsalammuaad@gmail.com' },
        { icon: <Phone size={24} />, label: 'الهاتف', value: '+967 775 019 485' },
        { icon: <MapPin size={24} />, label: 'الموقع', value: 'صنعاء، اليمن' },
    ]

    const socialLinks = [
        { icon: <Github size={24} />, href: 'https://github.com/Abdualsslam', label: 'GitHub' },
        { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/abdulsalam-muaad/', label: 'LinkedIn' },
    ]

    return (
        <section id="contact" className="py-24">
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

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="btn btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Send size={20} />
                            {status === 'sending' ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
                        </button>

                        {status === 'success' && (
                            <p className="mt-4 text-center text-emerald-400 text-sm" role="status">
                                شكراً لتواصلك! وصلتني رسالتك وسأرد عليك قريباً.
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-center text-red-400 text-sm" role="alert">
                                تعذّر إرسال الرسالة. حاول مجدداً أو راسلني مباشرة على abdulsalammuaad@gmail.com
                            </p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    )
}
