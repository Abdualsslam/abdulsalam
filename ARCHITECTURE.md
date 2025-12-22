# معمارية الموقع الشخصي - عبدالسلام

<div dir="rtl">

## 📋 نظرة عامة

موقع شخصي (Portfolio) لعرض المهارات والمشاريع والخبرات المهنية.

---

## 🏗️ المعمارية العامة

### نوع التطبيق
- **Single Page Application (SPA)** مبني باستخدام React
- **Static Site** قابل للنشر على Vercel/Netlify/GitHub Pages

### التقنيات الأساسية

```json
{
  "Framework": "React 19",
  "Build Tool": "Vite",
  "Language": "TypeScript",
  "Styling": "CSS Modules / Vanilla CSS",
  "Animations": "Framer Motion",
  "Icons": "Lucide React"
}
```

---

## 📁 هيكل المجلدات

```
src/
├── components/           # المكونات
│   ├── common/          # مكونات عامة (Button, Card, etc.)
│   ├── layout/          # Header, Footer, Navigation
│   └── sections/        # أقسام الصفحة الرئيسية
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Experience.tsx
│       └── Contact.tsx
│
├── assets/              # الصور والأيقونات
│   ├── images/
│   └── icons/
│
├── styles/              # الأنماط
│   ├── global.css      # الأنماط العامة
│   ├── variables.css   # المتغيرات (الألوان، الخطوط)
│   └── animations.css  # الحركات
│
├── data/                # البيانات الثابتة
│   ├── projects.ts     # قائمة المشاريع
│   ├── skills.ts       # قائمة المهارات
│   └── experience.ts   # الخبرات
│
├── hooks/               # React Hooks مخصصة
│   └── useScrollAnimation.ts
│
├── utils/               # وظائف مساعدة
│
├── App.tsx              # المكون الرئيسي
├── main.tsx             # نقطة الدخول
└── index.css            # الأنماط الأساسية
```

---

## 🎨 نظام التصميم

### الألوان
```css
:root {
  /* الألوان الأساسية */
  --primary: #7E66AC;
  --primary-dark: #502e91;
  --secondary: #8F00FF;
  
  /* الخلفيات */
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --bg-card: #2a2a2a;
  
  /* النصوص */
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  
  /* التدرجات */
  --gradient-primary: linear-gradient(135deg, #7E66AC, #8F00FF);
}
```

### الخطوط
```css
:root {
  --font-primary: 'Cairo', 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

### الأشكال
```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;
}
```

---

## 📱 أقسام الموقع

### 1. Hero Section
- الاسم والعنوان المهني
- وصف مختصر
- أزرار التواصل (CV، GitHub، LinkedIn)
- صورة شخصية أو رسم متحرك

### 2. About Me
- نبذة شخصية
- الاهتمامات والشغف
- صورة أو رسومات توضيحية

### 3. Skills
- المهارات التقنية (البرمجة، الأدوات)
- مستوى الإتقان (شريط تقدم أو نسبة)
- تصنيف حسب الفئة

### 4. Projects
- عرض المشاريع البارزة
- صورة/فيديو للمشروع
- وصف مختصر
- روابط (GitHub، Demo)
- التقنيات المستخدمة

### 5. Experience
- الخبرات العملية
- Timeline تفاعلي
- الشركة، المنصب، الفترة

### 6. Contact
- نموذج تواصل
- روابط التواصل الاجتماعي
- البريد الإلكتروني

---

## ✨ الحركات والتأثيرات

### Scroll Animations
```typescript
// باستخدام Framer Motion
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
```

### Hover Effects
- تكبير خفيف للبطاقات
- تغيير لون التدرج
- ظهور تفاصيل إضافية

---

## 💻 قواعد الكود

### تسمية الملفات
```
✅ الصحيح:
- PascalCase للمكونات: HeroSection.tsx
- camelCase للـ Hooks: useScrollAnimation.ts
- kebab-case للأنماط: hero-section.module.css

❌ الخطأ:
- hero-section.tsx
- UseScrollAnimation.ts
```

### بنية المكون
```tsx
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <motion.section 
      className={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </motion.section>
  );
}
```

---

## 🚀 النشر (Deployment)

### الخيارات المتاحة
1. **Vercel** - الأفضل لمشاريع React (مجاني)
2. **Netlify** - بديل ممتاز (مجاني)
3. **GitHub Pages** - مجاني مع GitHub

### أوامر البناء
```bash
# التطوير المحلي
npm run dev

# البناء للإنتاج
npm run build

# معاينة البناء
npm run preview
```

---

## 📊 السكريبتات

```bash
npm run dev        # تشغيل السيرفر المحلي
npm run build      # بناء للإنتاج
npm run preview    # معاينة البناء
npm run lint       # فحص الكود
```

---

## 🎯 أفضل الممارسات

1. ✅ **تصميم متجاوب** - يعمل على جميع الأجهزة
2. ✅ **أداء عالي** - تحميل سريع
3. ✅ **SEO محسن** - عناوين ووصف مناسب
4. ✅ **وصولية (Accessibility)** - دعم قارئات الشاشة
5. ✅ **حركات سلسة** - تجربة مستخدم ممتعة

---

**نسخة المستند**: 1.0  
**آخر تحديث**: ديسمبر 2025

</div>
