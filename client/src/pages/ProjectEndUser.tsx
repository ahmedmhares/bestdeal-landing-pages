import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProject } from "@/lib/projects";
import { ChevronRight, MapPin, Home, Waves, Users, Phone, Sparkles, Heart, Zap } from "lucide-react";

interface ProjectEndUserProps {
  projectId: string;
}

export default function ProjectEndUser({ projectId }: ProjectEndUserProps) {
  const project = getProject(projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `مرحبا، أنا مهتم بـ ${project.name} للسكن. هل يمكنك إرسال المزيد من المعلومات والعروض الحالية؟`
    );
    window.open(`https://wa.me/${project.phone.replace(/[^0-9]/g, "")}?text=${message}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 sticky top-0 z-50 bg-white/95 backdrop-blur-xl">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {project.location}
              </p>
            </div>
            <Button
              onClick={handleWhatsApp}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              تواصل معنا
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 border border-blue-300 rounded-full mb-6">
                <span className="text-blue-700 text-sm font-semibold">🏡 حياة فاخرة</span>
              </div>
              <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                استمتع بحياة فاخرة في قلب العاصمة الإدارية
              </h2>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                River District يقدم لك وعائلتك أسلوب حياة فاخر لا مثيل له. موقع استراتيجي مع جميع الخدمات والمرافق الحديثة.
              </p>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="bg-white border-slate-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-slate-600">ابدأ من</p>
                      <p className="text-lg font-bold text-slate-900">
                        {project.pricePerMeter.toLocaleString()} جنيه/م²
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white border-slate-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Waves className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-xs text-slate-600">القسط الشهري</p>
                      <p className="text-lg font-bold text-slate-900">
                        {(project.monthlyInstallment / 1000).toFixed(0)}K جنيه
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
              >
                احجز جولة الآن
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Right side - Lifestyle */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-300 rounded-xl p-8">
                <h3 className="text-sm font-semibold text-blue-900 mb-4 uppercase tracking-wide">
                  ✨ نمط حياة فاخر
                </h3>
                <ul className="space-y-3">
                  {[
                    "إطلالات خلابة على العاصمة",
                    "معمار عصري وفاخر",
                    "حدائق خضراء وأماكن ترفيه",
                    "مرافق ومخدومات عالمية",
                    "مجتمع آمن وعائلي",
                    "خدمات أمنية 24/7"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-800">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Living Experience Section */}
      <section className="py-16">
        <div className="container">
          <h3 className="text-3xl font-bold text-slate-900 mb-12">🏠 تجربة السكن الفاخرة</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-50 border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">الراحة والهدوء</h4>
              <p className="text-slate-600">استمتع بهدوء وراحة في بيئة آمنة وهادئة بعيداً عن ضوضاء المدينة</p>
            </Card>
            <Card className="bg-slate-50 border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">التصميم الفاخر</h4>
              <p className="text-slate-600">معمار عصري وتصميمات داخلية فاخرة تعكس ذوقك الرفيع</p>
            </Card>
            <Card className="bg-slate-50 border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">الخدمات الحديثة</h4>
              <p className="text-slate-600">جميع الخدمات والمرافق الحديثة تحت سقف واحد لراحتك وعائلتك</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Amenities & Services */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h3 className="text-3xl font-bold text-slate-900 mb-12">🎯 المرافق والخدمات</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {project.features.map((feature, idx) => (
              <Card key={idx} className="bg-white border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-slate-900 font-semibold">{feature}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans Section */}
      <section className="py-16">
        <div className="container">
          <h3 className="text-3xl font-bold text-slate-900 mb-12">💳 خطط الدفع المرنة</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 p-8">
              <h4 className="text-xl font-bold text-slate-900 mb-4">خطة الدفع الأساسية</h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> دفعة أولى 10%
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> أقساط شهرية مريحة
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> فترة سماح طويلة
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> بدون فوائد إضافية
                </li>
              </ul>
            </Card>
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-300 p-8">
              <h4 className="text-xl font-bold text-slate-900 mb-4">خطة الدفع المتقدمة</h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> دفعة أولى 5%
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> أقساط شهرية أقل
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> خصومات خاصة
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> مرونة في الدفع
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h3 className="text-3xl font-bold text-slate-900 mb-12">لماذا River District؟</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">📍 الموقع الاستراتيجي</h4>
              <p className="text-slate-700 leading-relaxed">
                يقع River District في قلب العاصمة الإدارية الجديدة، مما يوفر لك إمكانية الوصول السهل إلى جميع المناطق الحيوية والخدمات الأساسية.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">🏗️ البناء والتشييد</h4>
              <p className="text-slate-700 leading-relaxed">
                تم بناء المشروع بأحدث المعايير العالمية باستخدام مواد عالية الجودة وتقنيات حديثة لضمان الأمان والراحة.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">👨‍👩‍👧‍👦 المجتمع العائلي</h4>
              <p className="text-slate-700 leading-relaxed">
                مجتمع آمن وعائلي يوفر بيئة مثالية لتربية الأطفال مع جميع الخدمات التعليمية والترفيهية.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">🔒 الأمان والحماية</h4>
              <p className="text-slate-700 leading-relaxed">
                نظام أمني متقدم 24/7 مع بوابات حديثة وكاميرات مراقبة لضمان سلامتك وسلامة عائلتك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container text-center">
          <h3 className="text-3xl font-bold text-white mb-4">ابدأ حياتك الفاخرة اليوم</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            تواصل معنا الآن واحصل على معلومات حصرية عن الوحدات المتاحة والعروض الخاصة. فريقنا جاهز لمساعدتك.
          </p>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-white hover:bg-slate-100 text-blue-600 font-semibold"
          >
            احجز جولة الآن
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
