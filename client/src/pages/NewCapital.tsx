import { useMetaPixelPageView } from "@/hooks/useMetaPixel";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ChevronRight, MapPin, BarChart3, MessageCircle, Loader } from "lucide-react";
import { toast } from "sonner";
import { submitLeadToGoogleScript, type LeadData } from "@/lib/googleScript";
import { useContent } from "@/hooks/useContent";

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

export default function NewCapital() {
  useMetaPixelPageView();
  const { getProject, getGlobalData, loading } = useContent();
  const project = getProject("new-capital");
  const globalData = getGlobalData();

  const [buyingPurpose, setBuyingPurpose] = useState<"living" | "investment" | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const utmParams = getUTMParameters();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!project || !globalData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Project not found</p>
      </div>
    );
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !buyingPurpose) {
      toast.error("الرجاء ملء جميع الحقول");
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData: LeadData = {
        name: formData.name,
        phone: formData.phone,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        projectName: project.name,
        buyingPurpose: buyingPurpose || "investment",
        source: "new-capital-landing",
        utmSource: utmParams.utmSource,
        utmCampaign: utmParams.utmCampaign,
        utmMedium: utmParams.utmMedium,
        utmContent: utmParams.utmContent,
        fbclid: utmParams.fbclid,
      };

      const success = await submitLeadToGoogleScript(leadData);

      if (success) {
        toast.success(globalData.successMessage);
        setFormData({ name: "", phone: "" });
        setBuyingPurpose(null);
        setSubmitSuccess(true);

        // Open WhatsApp after successful submission
        setTimeout(() => {
          const whatsappNumber = project.whatsappNumber || globalData.whatsappNumber;
          const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=مرحباً، أنا مهتم بـ ${project.name}`;
          window.open(whatsappUrl, "_blank");
        }, 1000);
      } else {
        toast.error(globalData.errorMessage);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(globalData.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 rtl">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{globalData.companyName}</h1>
              <p className="text-sm text-slate-600">Real Estate Investment</p>
            </div>
            <a href="/" className="text-blue-600 hover:text-blue-700">
              ← العودة للرئيسية
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${project.images.hero})` }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">{project.name}</h2>
            <p className="text-xl text-slate-700 mb-6">{project.description}</p>
            <p className="text-lg text-slate-600">{project.longDescription}</p>
          </div>
        </div>
      </section>

      {/* Key Info */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-slate-600 mb-2">الموقع</p>
              <div className="flex items-center gap-2 text-slate-900">
                <MapPin className="w-5 h-5" />
                <p className="font-semibold">{project.location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">سعر المتر</p>
              <p className="text-2xl font-bold text-slate-900">
                {(project.pricePerMeter / 1000).toFixed(0)}K EGP
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">الدفع الشهري</p>
              <p className="text-2xl font-bold text-slate-900">
                {(project.monthlyInstallment / 1000).toFixed(0)}K EGP
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-20">
        <div className="container">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">{project.name}</h3>
          <p className="text-lg text-slate-700 mb-8 text-center max-w-2xl mx-auto">{project.longDescription}</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">مميزات المشروع</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.highlights.map((highlight, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-bold text-slate-900 mb-2">{highlight.title}</h4>
                <p className="text-slate-600">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">أسئلة شائعة</h3>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
              {project.faq.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-4 text-center">احصل على العرض الحالي</h3>
            <p className="text-slate-600 text-center mb-12">تواصل معنا الآن واحصل على أفضل الأسعار والعروض الحصرية</p>

            <Card className="p-8" ref={formRef}>
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <MessageCircle className="w-16 h-16 text-green-600 mx-auto" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{globalData.successMessage}</h4>
                  <p className="text-slate-600 mb-6">سيتم فتح WhatsApp لتتمكن من التواصل معنا</p>
                  <Button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({ name: "", phone: "" });
                      setBuyingPurpose(null);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    ملء النموذج مرة أخرى
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="أدخل اسمك الكامل"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 md:py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+20 1XX XXX XXXX"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 md:py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">ما هو الغرض من الاستثمار؟</label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setBuyingPurpose("investment")}
                        className={`flex-1 py-3 md:py-2 px-4 rounded-lg font-medium transition-all ${
                          buyingPurpose === "investment"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        استثمار
                      </button>
                      <button
                        type="button"
                        onClick={() => setBuyingPurpose("living")}
                        className={`flex-1 py-3 md:py-2 px-4 rounded-lg font-medium transition-all ${
                          buyingPurpose === "living"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        سكن
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 md:py-3 text-lg md:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        {project.ctaText || globalData.ctaText}
                        <ChevronRight className="w-5 h-5 mr-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>

            {submitSuccess && (
              <div className="mt-8 text-center">
                <Button
                  onClick={() => {
                    const whatsappNumber = project.whatsappNumber || globalData.whatsappNumber;
                    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=مرحباً، أنا مهتم بـ ${project.name}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  تواصل عبر WhatsApp
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container text-center">
          <h3 className="text-3xl font-bold mb-4">هل تريد معرفة المزيد؟</h3>
          <p className="text-xl mb-8 opacity-90">تواصل معنا الآن واحصل على جميع التفاصيل والعروض الحصرية</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => {
                formRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-blue-600 hover:bg-slate-100"
            >
              ملء النموذج
            </Button>
            <Button
              onClick={() => {
                const whatsappNumber = project.whatsappNumber || globalData.whatsappNumber;
                const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=مرحباً، أنا مهتم بـ ${project.name}`;
                window.open(whatsappUrl, "_blank");
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              تواصل عبر WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="container text-center text-slate-600">
          <p>© 2026 {project.name} by {globalData.companyName}. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
