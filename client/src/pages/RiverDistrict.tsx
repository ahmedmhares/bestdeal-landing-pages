import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ChevronRight, MapPin, Home, TrendingUp, DollarSign, Sparkles, Zap, BarChart3, Shield, MessageCircle, Check, Loader } from "lucide-react";
import { toast } from "sonner";
import { submitLeadToFormspree, type LeadData } from "@/lib/formspree";

export default function RiverDistrict() {
  const [buyingPurpose, setBuyingPurpose] = useState<"living" | "investment" | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const whatsappPhone = "+201044238910";

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !buyingPurpose) {
      toast.error("الرجاء ملء جميع الحقول");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare lead data
      const leadData: LeadData = {
        name: formData.name,
        phone: formData.phone,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        projectName: "River District",
        buyingPurpose: buyingPurpose,
      };

      // Submit to Formspree
      const success = await submitLeadToFormspree(leadData);

      if (!success) {
        toast.error("فشل حفظ البيانات. الرجاء المحاولة مرة أخرى");
        setIsSubmitting(false);
        return;
      }

      // Show success message ONLY after successful submission
      toast.success("تم استلام بياناتك بنجاح");
      setSubmitSuccess(true);

      // Reset form
      setFormData({ name: "", phone: "" });
      setBuyingPurpose(null);

      // Open WhatsApp in new tab ONLY after successful submission
      setTimeout(() => {
        const purpose = buyingPurpose === "living" ? "للسكن" : "كاستثمار";
        const message = encodeURIComponent(
          `مرحبا، أنا ${formData.name}. أنا مهتم بـ River District ${purpose}. هل يمكنك إرسال المزيد من المعلومات والعروض الحالية؟`
        );
        window.open(`https://wa.me/${whatsappPhone.replace("+", "")}?text=${message}`, "_blank");
      }, 500);

      // Reset success state after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("حدث خطأ. الرجاء المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("مرحبا، أنا مهتم بـ River District. هل يمكنك إرسال المزيد من المعلومات؟");
    window.open(`https://wa.me/${whatsappPhone.replace("+", "")}?text=${message}`, "_blank");
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
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              تواصل معنا
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              River District - استثمار ذهبي في العاصمة الجديدة
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              مشروع عملاق بمساحة 40 فدان على ضفاف النيل مباشرة. فرصة استثمارية لا تُفوّت مع عوائد مضمونة وخطط دفع مرنة حتى 10 سنوات
            </p>
            <Button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              احصل على السعر الحالي
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Project Highlights */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">مميزات المشروع</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "40 فدان", desc: "مساحة ضخمة للتطوير والاستثمار" },
              { icon: Check, title: "1500 متر واجهة نيلية", desc: "إطلالات مباشرة على النيل" },
              { icon: Zap, title: "12% فقط مباني", desc: "88% مساحات خضراء وخدمات" },
              { icon: BarChart3, title: "عائد استثماري قوي", desc: "تقدير سعري مستمر" },
              { icon: Shield, title: "مطور موثوق", desc: "River District by Nile Development" },
              { icon: DollarSign, title: "خطط دفع مرنة", desc: "حتى 10 سنوات بدون فوائد" },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
                <item.icon className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Details */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">فرصة استثمارية استثنائية</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">لماذا River District؟</h3>
              <ul className="space-y-4">
                {[
                  "موقع استراتيجي في قلب العاصمة الإدارية الجديدة",
                  "واجهة نيلية مباشرة بطول 1500 متر",
                  "واجهة على محور بن زايد 1300 متر",
                  "نسبة بناء منخفضة جداً (12% فقط)",
                  "مطور عملاق موثوق (Nile Development)",
                  "خطط دفع مرنة حتى 10 سنوات",
                  "عائد استثماري مضمون",
                  "تقدير سعري مستمر",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <h4 className="text-xl font-bold text-slate-900 mb-4">سعر المتر المربع</h4>
                <p className="text-4xl font-bold text-green-600 mb-2">من 85,000 جنيه</p>
                <p className="text-sm text-slate-600">السعر يتغير حسب الموقع والمرحلة</p>
              </Card>
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <h4 className="text-xl font-bold text-slate-900 mb-4">خطط الدفع</h4>
                <p className="text-2xl font-bold text-blue-600 mb-2">حتى 10 سنوات</p>
                <p className="text-sm text-slate-600">بدون فوائد + حسومات خاصة للدفع الفوري</p>
              </Card>
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <h4 className="text-xl font-bold text-slate-900 mb-4">العائد المتوقع</h4>
                <p className="text-2xl font-bold text-purple-600 mb-2">تقدير سعري قوي</p>
                <p className="text-sm text-slate-600">موقع استراتيجي = عائد استثماري مضمون</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Master Plan Section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">الخطة الرئيسية</h2>
          <Card className="p-8 border-slate-200">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg p-12 text-center">
              <p className="text-slate-600 mb-4">خطة المشروع الرئيسية</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">40 فدان من الفرص الاستثمارية</h3>
              <p className="text-slate-700 max-w-2xl mx-auto mb-6">
                تصميم عصري يجمع بين الفخامة والاستدامة. مساحات خضراء واسعة، خدمات عالمية، وإطلالات نيلية خلابة.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                اطلب نسخة من الخطة الرئيسية
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">أسئلة شائعة</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: "ما هو أفضل وقت للاستثمار في River District؟",
                  a: "الآن هو الوقت الأمثل. المشروع في مراحله الأولى والأسعار لم تصل لذروتها بعد. الاستثمار المبكر يضمن أفضل عائد.",
                },
                {
                  q: "هل هناك خطط دفع مرنة؟",
                  a: "نعم، نوفر خطط دفع مرنة حتى 10 سنوات بدون فوائد. كما نوفر حسومات خاصة للدفع الفوري.",
                },
                {
                  q: "ما هو العائد المتوقع من الاستثمار؟",
                  a: "الموقع الاستراتيجي والطلب العالي يضمنان تقديراً سعرياً قوياً. العائد يعتمد على سعر الشراء والمدة.",
                },
                {
                  q: "هل المشروع آمن استثمارياً؟",
                  a: "نعم، المشروع من تطوير Nile Development وهي شركة موثوقة. الموقع في العاصمة الإدارية الجديدة يضمن الطلب المستمر.",
                },
                {
                  q: "كيف أبدأ الاستثمار؟",
                  a: "تواصل معنا عبر الفورم أدناه أو WhatsApp. سنرسل لك جميع التفاصيل والعروض الحالية.",
                },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-slate-900 font-semibold hover:text-green-600">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section ref={formRef} className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              احصل على العرض الحالي
            </h2>
            <p className="text-center text-slate-600 mb-12">
              تواصل معنا الآن واحصل على أفضل الأسعار والعروض الحصرية
            </p>

            <Card className="bg-white border-slate-200 p-8">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">تم استلام بياناتك بنجاح</h3>
                  <p className="text-slate-600 mb-6">سيتم التواصل معك قريباً على رقم الهاتف المسجل</p>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    تواصل معنا على WhatsApp
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      placeholder="+20 1XX XXX XXXX"
                      required
                    />
                  </div>

                  {/* Buying Purpose */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      ما هو الغرض من الاستثمار؟
                    </label>
                    <div className="grid grid-cols-2 gap-4">
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
                        <p className="text-sm font-semibold">استثمار</p>
                      </button>
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
                        <p className="text-sm font-semibold">سكن</p>
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !buyingPurpose}
                    size="lg"
                    className={`w-full ${
                      buyingPurpose === "living"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : buyingPurpose === "investment"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-slate-400 cursor-not-allowed"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 ml-2 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        احصل على التفاصيل
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-6">هل تريد معرفة المزيد؟</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            تواصل معنا الآن واحصل على جميع التفاصيل والعروض الحصرية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              تواصل عبر WhatsApp
            </Button>
            <Button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              size="lg"
            >
              ملء النموذج
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all z-40"
        title="تواصل معنا على WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-slate-50">
        <div className="container text-center text-slate-600">
          <p>© 2026 River District by Nile Development. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
