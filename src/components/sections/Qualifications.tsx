import { motion } from "framer-motion";
import { GraduationCap, Award, Languages } from "lucide-react";

const education = [
  {
    degree: "بكالوريوس تقنية المعلومات",
    institution: "الجامعة الوطنية — اليمن",
    year: "2021",
  },
];

const certifications = [
  { name: "Google IT Support", issuer: "Coursera", year: "2021 - 2022" },
  { name: "Google IT Automation", issuer: "Coursera", year: "2022" },
  { name: "دورة Flutter و Dart الشاملة", issuer: "Udemy", year: "2025" },
  { name: "التسويق الرقمي من Google", issuer: "Google", year: "2020 - 2021" },
  {
    name: "دبلوم اللغة الإنجليزية",
    issuer: "English Diploma",
    year: "2021 - 2022",
  },
];

const languages = [
  { name: "العربية", note: "اللغة الأم", level: 100 },
  { name: "الإنجليزية", note: "جيد جداً — قراءة / كتابة / تحدّث", level: 85 },
];

export default function Qualifications() {
  return (
    <section id="qualifications" className="py-24 text-ink">
      <div className="max-w-6xl mx-auto px-5">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          المؤهلات والشهادات
        </motion.h2>

        {/* التعليم */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="flex items-center gap-3 text-2xl font-semibold mb-7 text-primary">
            <GraduationCap size={26} />
            التعليم
          </h3>
          <div className="grid gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="card p-7 text-right flex items-start gap-5"
                dir="rtl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-primary-light rounded-xl text-primary">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-ink mb-1">
                    {edu.degree}
                  </h4>
                  <span className="text-primary font-medium">
                    {edu.institution}
                  </span>
                  <div className="text-ink-muted text-sm mt-1">{edu.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* الشهادات */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="flex items-center gap-3 text-2xl font-semibold mb-7 text-primary">
            <Award size={26} />
            الشهادات
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="card p-6 text-right flex items-start gap-4"
                dir="rtl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-primary-light rounded-xl text-primary">
                  <Award size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-ink leading-snug mb-1">
                    {cert.name}
                  </h4>
                  <span className="text-ink-muted text-sm">{cert.issuer}</span>
                  <div className="text-ink-muted text-xs mt-1">{cert.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* اللغات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="flex items-center gap-3 text-2xl font-semibold mb-7 text-primary">
            <Languages size={26} />
            اللغات
          </h3>
          <div className="card p-8 grid gap-6 max-w-2xl">
            {languages.map((lang, index) => (
              <div key={index} className="w-full">
                <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 mb-2">
                  <span className="font-medium text-ink">{lang.name}</span>
                  <span className="text-ink-muted text-sm">{lang.note}</span>
                </div>
                <div className="h-2 bg-paper-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
