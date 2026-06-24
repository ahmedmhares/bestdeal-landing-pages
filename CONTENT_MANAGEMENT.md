# Content Management Guide - Best Deal Real Estate Landing Pages

## Overview

جميع محتوى الصفحات موجود في ملف واحد: **`public/content.json`**

لا تحتاج لتعديل أي كود أو ملفات برمجية. فقط عدّل الملف ده وكل التغييرات بتظهر تلقائياً على الموقع.

---

## 1. تعديل البيانات الحالية

### الخطوة 1: افتح الملف
```
public/content.json
```

### الخطوة 2: ابحث عن المشروع اللي تبغى تعدله
كل مشروع له `id` فريد:
- `river-district` - River District
- `mostakbal-city` - Mostakbal City
- `new-capital` - New Capital
- `north-coast` - North Coast
- `new-zayed` - New Zayed

### الخطوة 3: عدّل البيانات

#### مثال: تغيير اسم المشروع
```json
{
  "id": "river-district",
  "name": "River District",  // ← عدّل هنا
  ...
}
```

#### مثال: تغيير السعر
```json
{
  "pricePerMeter": 85000,  // ← عدّل هنا
  "monthlyInstallment": 150000,  // ← أو هنا
  ...
}
```

#### مثال: تغيير الوصف
```json
{
  "description": "Luxury waterfront living in the heart of the New Capital",  // ← عدّل هنا
  "longDescription": "River District is a premium waterfront project...",  // ← أو هنا
  ...
}
```

#### مثال: تغيير المميزات
```json
{
  "features": [
    "Waterfront Location",  // ← أضيف أو احذف مميزات
    "Modern Architecture",
    "Green Spaces",
    "24/7 Security"  // ← أضيف جديد
  ]
}
```

#### مثال: تغيير الأسئلة الشائعة
```json
{
  "faq": [
    {
      "question": "ما هو أفضل وقت للاستثمار؟",  // ← عدّل السؤال
      "answer": "الآن هو أفضل وقت..."  // ← عدّل الإجابة
    }
  ]
}
```

#### مثال: تغيير رقم الواتس
```json
{
  "whatsappNumber": "+201001234567"  // ← عدّل رقم الواتس
}
```

#### مثال: تغيير نص الزر
```json
{
  "ctaText": "Get Current Prices & Payment Plan"  // ← عدّل نص الزر
}
```

### الخطوة 4: احفظ الملف

بعد ما تخلص من التعديلات، احفظ الملف. التغييرات بتظهر تلقائياً على الموقع في الـ Browser (قد تحتاج تعيد تحميل الصفحة).

---

## 2. البيانات الإجمالية (Global Data)

البيانات اللي تنطبق على كل المشاريع موجودة في قسم `global`:

```json
{
  "global": {
    "companyName": "Best Deal Real Estate",  // ← اسم الشركة
    "whatsappNumber": "+201001234567",  // ← رقم الواتس الافتراضي
    "ctaText": "Get Current Prices & Payment Plan",  // ← نص الزر الافتراضي
    "successMessage": "تم استلام بياناتك بنجاح",  // ← رسالة النجاح
    "errorMessage": "حدث خطأ أثناء حفظ البيانات...",  // ← رسالة الخطأ
    "seo": {
      "title": "Best Deal - Real Estate Investment in Egypt",
      "description": "Discover premium real estate investment opportunities...",
      "keywords": "real estate, investment, Egypt..."
    }
  }
}
```

---

## 3. إضافة مشروع جديد

### الخطوة 1: افتح `content.json`

### الخطوة 2: اذهب إلى قسم `projects`

### الخطوة 3: أضيف مشروع جديد

انسخ هذا الـ Template وأضيفه في نهاية قائمة `projects`:

```json
{
  "id": "project-id",  // ← معرّف فريد (بدون مسافات، استخدم hyphens)
  "name": "Project Name",  // ← اسم المشروع
  "developer": "Developer Name",  // ← اسم المطور
  "location": "Location, Egypt",  // ← الموقع
  "description": "Short description",  // ← وصف قصير
  "longDescription": "Long description...",  // ← وصف طويل
  "pricePerMeter": 85000,  // ← السعر للمتر المربع
  "monthlyInstallment": 150000,  // ← القسط الشهري
  "paymentPlan": "من 150,000 جنيه شهرياً",  // ← خطة الدفع
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "highlights": [
    {
      "title": "Highlight Title",
      "description": "Highlight description"
    }
  ],
  "faq": [
    {
      "question": "Question?",
      "answer": "Answer..."
    }
  ],
  "images": {
    "hero": "https://example.com/hero.jpg",  // ← صورة البطل
    "gallery": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ]
  },
  "seo": {
    "title": "Project Title - SEO",
    "description": "Project description for SEO",
    "keywords": "keywords, separated, by, comma"
  },
  "ctaText": "Get Current Prices & Payment Plan",
  "whatsappNumber": "+201001234567"
}
```

### الخطوة 4: احفظ الملف

المشروع الجديد بيظهر تلقائياً على الـ Home page.

---

## 4. إنشاء Landing Page جديدة من التمبلت

### الخطوة 1: أضيف المشروع في `content.json` (اتبع الخطوات أعلاه)

### الخطوة 2: الـ Landing Page بتنشأ تلقائياً

لا تحتاج تعمل أي حاجة! الـ App بتقرأ من `content.json` وتنشئ الـ Landing Page تلقائياً.

### الخطوة 3: الـ URL بتكون:
```
https://bestdeal-landing-pages.vercel.app/{project-id}
```

مثال:
- `https://bestdeal-landing-pages.vercel.app/river-district`
- `https://bestdeal-landing-pages.vercel.app/mostakbal-city`
- `https://bestdeal-landing-pages.vercel.app/new-project` (لو أضفت مشروع جديد)

---

## 5. الحقول الإجبارية (Required Fields)

كل مشروع يجب يكون فيه هذه الحقول:

| الحقل | النوع | مثال |
|------|------|------|
| `id` | String | `"river-district"` |
| `name` | String | `"River District"` |
| `developer` | String | `"Developer Name"` |
| `location` | String | `"New Capital, Egypt"` |
| `description` | String | `"Short description"` |
| `longDescription` | String | `"Long description"` |
| `pricePerMeter` | Number | `85000` |
| `monthlyInstallment` | Number | `150000` |
| `paymentPlan` | String | `"من 150,000 جنيه شهرياً"` |
| `features` | Array | `["Feature 1", "Feature 2"]` |
| `highlights` | Array | `[{title, description}]` |
| `faq` | Array | `[{question, answer}]` |
| `images.hero` | String | `"https://..."` |
| `images.gallery` | Array | `["https://...", "https://..."]` |
| `whatsappNumber` | String | `"+201001234567"` |
| `ctaText` | String | `"Get Current Prices & Payment Plan"` |

---

## 6. نصائح مهمة

### JSON Syntax
- استخدم `"` للـ Strings (ليس `'`)
- استخدم `,` بين الـ Properties
- لا تستخدم `,` بعد آخر Property في الـ Object
- استخدم `[]` للـ Arrays و `{}` للـ Objects

### الصور
- استخدم URLs كاملة (ابدأ بـ `https://`)
- تأكد من الصور موجودة وتحميل بسرعة
- الصور بتظهر على الـ Mobile والـ Desktop

### الأرقام
- `pricePerMeter` و `monthlyInstallment` بدون علامات (مثل `85000` وليس `"85,000"`)
- بتظهر تلقائياً مع فاصلة الآلاف على الموقع

### النصوص العربية
- استخدم UTF-8 encoding
- تأكد من الأحرف العربية بتظهر صح

---

## 7. مثال عملي: تغيير سعر مشروع

### قبل:
```json
{
  "id": "river-district",
  "name": "River District",
  "pricePerMeter": 85000,
  "monthlyInstallment": 150000,
  ...
}
```

### بعد (تخفيض السعر):
```json
{
  "id": "river-district",
  "name": "River District",
  "pricePerMeter": 75000,  // ← تم تخفيض السعر من 85K إلى 75K
  "monthlyInstallment": 130000,  // ← تم تخفيض القسط من 150K إلى 130K
  ...
}
```

احفظ الملف → الموقع بتحدّث تلقائياً ✅

---

## 8. مثال عملي: إضافة مشروع جديد

### الخطوة 1: افتح `content.json`

### الخطوة 2: اذهب إلى نهاية قائمة `projects`

### الخطوة 3: أضيف المشروع الجديد:

```json
{
  "id": "smart-city",
  "name": "Smart City",
  "developer": "Smart City Development",
  "location": "New Cairo, Egypt",
  "description": "Smart city development with AI and IoT",
  "longDescription": "Smart City is a cutting-edge development featuring AI-powered systems and IoT integration...",
  "pricePerMeter": 95000,
  "monthlyInstallment": 180000,
  "paymentPlan": "من 180,000 جنيه شهرياً",
  "features": [
    "AI-Powered Systems",
    "IoT Integration",
    "Smart Homes",
    "Green Energy",
    "5G Network"
  ],
  "highlights": [
    {
      "title": "تقنية ذكية",
      "description": "أحدث تقنيات الذكاء الاصطناعي"
    },
    {
      "title": "عائد استثماري قوي",
      "description": "موقع متميز وتقنية عالية"
    }
  ],
  "faq": [
    {
      "question": "ما هي تقنيات Smart City؟",
      "answer": "Smart City تستخدم أحدث تقنيات الذكاء الاصطناعي والإنترنت من الأشياء..."
    }
  ],
  "images": {
    "hero": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512207736139-c586b0c62d3b?w=600&h=400&fit=crop"
    ]
  },
  "seo": {
    "title": "Smart City - AI-Powered Real Estate",
    "description": "Smart city development with AI and IoT technology",
    "keywords": "smart city, AI, IoT, real estate"
  },
  "ctaText": "Get Current Prices & Payment Plan",
  "whatsappNumber": "+201001234567"
}
```

### الخطوة 4: احفظ الملف

الآن المشروع الجديد بيظهر على:
- الـ Home page: `https://bestdeal-landing-pages.vercel.app/`
- Landing Page: `https://bestdeal-landing-pages.vercel.app/smart-city`

---

## 9. استكشاف الأخطاء

### المشروع ما يظهر على الـ Home page
- تأكد من الـ `id` صحيح (بدون مسافات)
- تأكد من الـ JSON syntax صحيح (استخدم JSON validator)
- احفظ الملف وأعد تحميل الصفحة

### الصور ما بتظهر
- تأكد من الـ URL صحيح وكامل (ابدأ بـ `https://`)
- تأكد من الصورة موجودة (جرّب الـ URL في المتصفح)

### الأرقام ما بتظهر صح
- تأكد من الأرقام بدون علامات (مثل `85000` وليس `"85,000"`)
- تأكد من النوع `Number` وليس `String`

---

## 10. الملفات المهمة

| الملف | الوصف |
|------|------|
| `public/content.json` | ملف البيانات الرئيسي |
| `client/src/hooks/useContent.ts` | Hook لقراءة البيانات |
| `client/src/pages/RiverDistrict.tsx` | مثال على Landing Page |
| `client/src/pages/Home.tsx` | الصفحة الرئيسية |

---

## 11. الدعم والمساعدة

إذا واجهت مشكلة:

1. تأكد من JSON syntax صحيح (استخدم https://jsonlint.com/)
2. تأكد من جميع الحقول الإجبارية موجودة
3. أعد تحميل الصفحة في المتصفح
4. افحص console للأخطاء (F12 → Console)

---

**آخر تحديث:** 2026-06-24
**الإصدار:** 1.0
