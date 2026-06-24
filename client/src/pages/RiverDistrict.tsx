import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, MapPin, Home, TrendingUp, DollarSign, Phone, Heart, Sparkles, Zap, BarChart3, Shield } from "lucide-react";

export default function RiverDistrict() {
  const [buyingPurpose, setBuyingPurpose] = useState<"living" | "investment" | null>(null);
  const livingRef = useRef<HTMLDivElement>(null);
  const investmentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWhatsApp = () => {
    const purpose = buyingPurpose === "living" ? "للسكن" : "كاستثمار";
    const message = encodeURIComponent(
      `مرحبا، أنا مهتم بـ River District ${purpose}. هل يمكنك إرسال المزيد من المعلومات والعروض الحالية؟`
    );
    window.open(`https://wa.me/201044238910?text=${message}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 sticky top-0 z-50 bg-white/95 backdrop-blur-xl">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">River District</h1>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                العاصمة الإدارية الجديدة
              </p>
            </div>
            <Button
              onClick={() => handleWhatsApp()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              تواصل معنا
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Unified */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              River District - فرصتك الذهبية
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              سواء كنت تبحث عن منزل فاخر أو استثمار مربح، River District هو الخيار الأمثل
            </p>
          </div>

          {/* Purpose Selection */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card
              onClick={() => {
                setBuyingPurpose("living");
                handleScroll(livingRef);
              }}
              className={`p-8 cursor-pointer transition-all ${
                buyingPurpose === "living"
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-slate-200 hover:border-blue-300"
              }`}
            >
              <Home className={`w-8 h-8 mb-4 ${buyingPurpose === "living" ? "text-white" : "text-blue-600"}`} />
              <h3 className="text-lg font-bold mb-2">أبحث عن منزل فاخر</h3>
              <p className={`text-sm ${buyingPurpose === "living" ? "text-blue-100" : "text-slate-600"}`}>
                استمتع بحياة فاخرة وراقية
              </p>
            </Card>

            <Card
              onClick={() => {
                setBuyingPurpose("investment");
                handleScroll(investmentRef);
              }}
              className={`p-8 cursor-pointer transition-all ${
                buyingPurpose === "investment"
                  ? "bg-green-600 border-green-600 text-white"
                  : "bg-white border-slate-200 hover:border-green-300"
              }`}
            >
              <TrendingUp className={`w-8 h-8 mb-4 ${buyingPurpose === "investment" ? "text-white" : "text-green-600"}`} />
              <h3 className="text-lg font-bold mb-2">أبحث عن استثمار</h3>
              <p className={`text-sm ${buyingPurpose === "investment" ? "text-green-100" : "text-slate-600"}`}>
                عائد استثماري قوي ومضمون
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FOR LIVING SECTION */}
      <section ref={livingRef} className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container">
          <div className="mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 border border-blue-300 rounded-full mb-6">
              <span className="text-blue-700 text-sm font-semibold">🏡 للسكن الفاخر</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              River District للسكن - حياة فاخرة بكل معنى الكلمة
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed max-w-3xl">
              استمتع بأسلوب حياة فاخر لا مثيل له في قلب العاصمة الإدارية الجديدة. موقع استراتيجي مع جميع الخدمات والمرافق الحديثة لك ولعائلتك.
            </p>
          </div>

          {/* Living Key Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">✨ نمط حياة فاخر</h3>
              <ul className="space-y-4">
                {[
                  "إطلالات خلابة على العاصمة",
                  "معمار عصري وفاخر",
                  "حدائق خضراء وأماكن ترفيه",
                  "مرافق ومخدومات عالمية",
                  "مجتمع آمن وعائلي",
                  "خدمات أمنية 24/7"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <Card className="bg-white border-slate-200 p-6">
                <Home className="w-6 h-6 text-blue-600 mb-3" />
                <p className="text-sm text-slate-600 mb-2">السعر ابتداءً من</p>
                <p className="text-2xl font-bold text-slate-900">85,000 جنيه/م²</p>
              </Card>
              <Card className="bg-white border-slate-200 p-6">
                <DollarSign className="w-6 h-6 text-indigo-600 mb-3" />
                <p className="text-sm text-slate-600 mb-2">القسط الشهري</p>
                <p className="text-2xl font-bold text-slate-900">150K جنيه</p>
              </Card>
            </div>
          </div>

          {/* Living Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">الراحة والهدوء</h4>
              <p className="text-slate-600">استمتع بهدوء وراحة في بيئة آمنة وهادئة</p>
            </Card>
            <Card className="bg-white border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">التصميم الفاخر</h4>
              <p className="text-slate-600">معمار عصري وتصميمات داخلية فاخرة</p>
            </Card>
            <Card className="bg-white border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">الموقع الاستراتيجي</h4>
              <p className="text-slate-600">في قلب العاصمة الإدارية الجديدة</p>
            </Card>
          </div>

          {/* Living CTA */}
          <div className="text-center">
            <Button
              onClick={() => {
                setBuyingPurpose("living");
                handleScroll(formRef);
              }}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              احجز جولة الآن
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* FOR INVESTMENT SECTION */}
      <section ref={investmentRef} className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container">
          <div className="mb-16">
            <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full mb-6">
              <span className="text-green-400 text-sm font-semibold">💰 للاستثمار</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              River District للاستثمار - فرصة استثمارية حصرية
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
              استثمر في أفضل المشاريع العقارية بالعاصمة الإدارية. عائدات قوية وإمكانية تقدير رأس المال العالي في موقع استراتيجي.
            </p>
          </div>

          {/* Investment Key Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">💰 مميزات الاستثمار</h3>
              <ul className="space-y-4">
                {[
                  "موقع استراتيجي - قلب العاصمة الإدارية",
                  "إمكانية تقدير رأس المال العالي",
                  "دخل إيجاري قوي ومستقر",
                  "خطط دفع مرنة وسهلة",
                  "عائد استثماري مضمون",
                  "إدارة احترافية للمشروع"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-200">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10 p-6">
                <DollarSign className="w-6 h-6 text-green-400 mb-3" />
                <p className="text-sm text-slate-400 mb-2">سعر المتر</p>
                <p className="text-2xl font-bold text-white">85,000 جنيه</p>
              </Card>
              <Card className="bg-white/5 border-white/10 p-6">
                <BarChart3 className="w-6 h-6 text-blue-400 mb-3" />
                <p className="text-sm text-slate-400 mb-2">القسط الشهري</p>
                <p className="text-2xl font-bold text-white">150K جنيه</p>
              </Card>
            </div>
          </div>

          {/* Investment Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">العائد على الاستثمار</h4>
              <p className="text-slate-300">عائد سنوي قوي مع إمكانية تقدير رأس المال</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">فرصة نادرة</h4>
              <p className="text-slate-300">مشروع حصري في موقع استراتيجي بالعاصمة</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">استثمار آمن</h4>
              <p className="text-slate-300">مشروع موثوق من مطور عقاري معروف</p>
            </Card>
          </div>

          {/* Investment Payment Plans */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 p-6">
              <h4 className="text-lg font-bold text-white mb-4">خطة الدفع الأساسية</h4>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> دفعة أولى 10%
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> أقساط شهرية مريحة
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> فترة سماح طويلة
                </li>
              </ul>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 p-6">
              <h4 className="text-lg font-bold text-white mb-4">خطة الدفع المتقدمة</h4>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> دفعة أولى 5%
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> أقساط شهرية أقل
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> خصومات خاصة للمستثمرين
                </li>
              </ul>
            </Card>
          </div>

          {/* Investment CTA */}
          <div className="text-center">
            <Button
              onClick={() => {
                setBuyingPurpose("investment");
                handleScroll(formRef);
              }}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              احصل على تفاصيل الاستثمار
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* LEAD FORM SECTION */}
      <section ref={formRef} className="py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              احصل على معلومات حصرية
            </h2>
            <p className="text-center text-slate-600 mb-12">
              تواصل معنا الآن واحصل على أفضل العروض والمعلومات الحصرية
            </p>

            <Card className="bg-white border-slate-200 p-8">
              <form className="space-y-6">
                {/* Buying Purpose */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    ما هو الغرض من الشراء؟
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setBuyingPurpose("living")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        buyingPurpose === "living"
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      <Home className={`w-5 h-5 mb-2 ${buyingPurpose === "living" ? "text-blue-600" : "text-slate-600"}`} />
                      <p className="text-sm font-semibold">للسكن</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuyingPurpose("investment")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        buyingPurpose === "investment"
                          ? "border-green-600 bg-green-50"
                          : "border-slate-200 hover:border-green-300"
                      }`}
                    >
                      <TrendingUp className={`w-5 h-5 mb-2 ${buyingPurpose === "investment" ? "text-green-600" : "text-slate-600"}`} />
                      <p className="text-sm font-semibold">للاستثمار</p>
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    الاسم
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="أدخل اسمك"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="+20 1XX XXX XXXX"
                  />
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleWhatsApp}
                  disabled={!buyingPurpose}
                  size="lg"
                  className={`w-full ${
                    buyingPurpose === "living"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : buyingPurpose === "investment"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-slate-400 cursor-not-allowed"
                  } text-white`}
                >
                  تواصل معنا على WhatsApp
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
