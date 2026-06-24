import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ChevronRight, MapPin, Home, TrendingUp, DollarSign, Sparkles, Zap, BarChart3, Shield, MessageCircle, Check, Loader } from "lucide-react";
import { toast } from "sonner";
import { submitLeadToGoogleScript, type LeadData } from "@/lib/googleScript";

// Utility function to extract UTM parameters
function getUTMParameters() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmContent: params.get("utm_content") || undefined,
    fbclid: params.get("fbclid") || undefined,
  };
}

export default function NorthCoast() {
  const [buyingPurpose, setBuyingPurpose] = useState<"living" | "investment" | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const whatsappPhone = "+201044238910";
  const utmParams = getUTMParameters();

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
      // Prepare lead data with UTM parameters
      const leadData: LeadData = {
        name: formData.name,
        phone: formData.phone,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        projectName: "North Coast",
        buyingPurpose: buyingPurpose,
        source: "north-coast-landing",
        ...utmParams,
      };

      // Submit to Google Apps Script
      const success = await submitLeadToGoogleScript(leadData);

      if (!success) {
        toast.error("حدث خطأ أثناء حفظ البيانات، برجاء المحاولة مرة أخرى");
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
          `مرحبا، أنا ${formData.name}. أنا مهتم بـ North Coast ${purpose}. هل يمكنك إرسال المزيد من المعلومات والعروض الحالية؟`
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
    const message = encodeURIComponent("مرحبا، أنا مهتم بـ North Coast. هل يمكنك إرسال المزيد من المعلومات؟");
    window.open(`https://wa.me/${whatsappPhone.replace("+", "")}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg"></div>
            <span className="font-bold text-lg">Best Deal</span>
          </div>
          <Button onClick={handleWhatsAppClick} size="sm" className="bg-green-600 hover:bg-green-700">
            <MessageCircle className="w-4 h-4 mr-2" />
            تواصل معنا
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">North Coast</h1>
            <p className="text-xl text-gray-600 mb-2">الساحل الشمالي</p>
            <p className="text-gray-500">أفضل وجهة سياحية واستثمارية على ساحل البحر المتوسط</p>
          </div>

          {/* Project Card */}
          <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">North Coast</h2>
                <p className="text-gray-700 mb-6">
                  أفضل وجهة سياحية واستثمارية على ساحل البحر المتوسط. مشروع سياحي متكامل بإطلالات بحرية خلابة وخدمات عالمية.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">الموقع</p>
                      <p className="text-sm text-gray-600">الساحل الشمالي - 100 كم من الإسكندرية</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">سعر المتر</p>
                      <p className="text-sm text-gray-600">من 65,000 جنيه</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">الدفع الشهري</p>
                      <p className="text-sm text-gray-600">من 120,000 جنيه</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
                  احصل على السعر الحالي
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">65K</div>
                  <p className="text-gray-600">سعر المتر المربع</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">مميزات المشروع</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Home, title: "وحدات سكنية فاخرة", desc: "شقق وفيلات بإطلالات بحرية" },
              { icon: Sparkles, title: "منتجعات سياحية", desc: "فنادق وملاهي ومطاعم عالمية" },
              { icon: Zap, title: "شاطئ خاص", desc: "شاطئ رملي خاص ومرافق بحرية" },
              { icon: BarChart3, title: "عائد استثماري قوي", desc: "موسم سياحي طويل = عائد مستمر" },
              { icon: Shield, title: "أمان وراحة", desc: "مجتمع آمن ومنظم" },
              { icon: TrendingUp, title: "نمو سريع", desc: "وجهة سياحية سريعة التطور" },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">أسئلة شائعة</h2>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>ما هو أفضل وقت للاستثمار في North Coast؟</AccordionTrigger>
              <AccordionContent>
                الآن هو أفضل وقت قبل اكتمال المشروع. الموسم السياحي الطويل يضمن عائداً مستمراً.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>هل هناك خطط دفع مرنة؟</AccordionTrigger>
              <AccordionContent>
                نعم، خطط دفع مرنة حتى 7 سنوات بدون فوائد. حسومات خاصة للدفع الفوري.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>ما هو العائد المتوقع؟</AccordionTrigger>
              <AccordionContent>
                العائد المتوقع 18-25% سنوياً. الموسم السياحي الطويل والطلب المستمر يضمن عائداً قوياً.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>هل يمكن تأجير الوحدة؟</AccordionTrigger>
              <AccordionContent>
                نعم، الموسم السياحي الطويل يوفر فرصة تأجير مربحة طوال السنة.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>كيف أبدأ الاستثمار؟</AccordionTrigger>
              <AccordionContent>
                ملء النموذج أدناه وسنتواصل معك بجميع التفاصيل والعروض الحصرية.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">احصل على العرض الحالي</h2>
            <p className="text-gray-600">تواصل معنا الآن واحصل على أفضل الأسعار والعروض الحصرية</p>
          </div>

          <Card className="p-8" ref={formRef}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+20 1XX XXX XXXX"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Buying Purpose */}
              <div>
                <label className="block text-sm font-medium mb-2">ما هو الغرض من الاستثمار؟</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBuyingPurpose("investment")}
                    className={`py-3 md:py-2 px-4 rounded-lg font-medium transition-colors ${
                      buyingPurpose === "investment"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    disabled={isSubmitting}
                  >
                    استثمار
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyingPurpose("living")}
                    className={`py-3 md:py-2 px-4 rounded-lg font-medium transition-colors ${
                      buyingPurpose === "living"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    disabled={isSubmitting}
                  >
                    سكن
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 md:py-3 font-bold text-lg md:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    احصل على التفاصيل
                    <ChevronRight className="w-5 h-5 mr-2" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">هل تريد معرفة المزيد؟</h2>
          <p className="text-lg mb-8 text-blue-100">تواصل معنا الآن واحصل على جميع التفاصيل والعروض الحصرية</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button onClick={handleWhatsAppClick} className="bg-white text-blue-600 hover:bg-gray-100 py-6 md:py-3">
              <MessageCircle className="w-5 h-5 mr-2" />
              تواصل عبر WhatsApp
            </Button>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white py-6 md:py-3">
              ملء النموذج
              <ChevronRight className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2026 North Coast by Best Deal Real Estate. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
