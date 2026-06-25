import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ChevronRight, MapPin, Droplet, Building2, Trees, Users, Zap, MessageCircle, Loader, ChevronLeft, ChevronRight as ChevronRightIcon, MapPinIcon, DollarSign, Calendar, Shield, Home, Waves, Leaf, Utensils, Dumbbell, Users2, Bike, ShoppingBag, Lightbulb, Lock } from "lucide-react";
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

export default function RiverDistrict() {
  const { getProject, getGlobalData, loading } = useContent();
  const project = getProject("river-district");
  const globalData = getGlobalData();

  const [buyingPurpose, setBuyingPurpose] = useState<"living" | "investment" | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const utmParams = getUTMParameters();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!project || !globalData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
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
        source: "river-district-landing",
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

  const galleryImages = project.images?.gallery || [];
  const amenities = [
    { icon: Home, label: "Club House" },
    { icon: Waves, label: "Swimming Pools" },
    { icon: Dumbbell, label: "Gym & Fitness" },
    { icon: Users2, label: "Kids Area" },
    { icon: Bike, label: "Walking & Cycling Tracks" },
    { icon: ShoppingBag, label: "Retail Area" },
    { icon: Leaf, label: "Landscaped Gardens" },
    { icon: Shield, label: "24/7 Security" },
    { icon: Lightbulb, label: "Underground Parking" },
    { icon: Lock, label: "Premium Services" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-amber-500 font-bold text-xl">NILE</div>
          <a href="/" className="text-amber-500 hover:text-amber-400 transition-colors text-sm">
            ← العودة للرئيسية
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center pt-20 flex items-center justify-between overflow-hidden"
        style={{
          backgroundImage: `url('/manus-storage/WhatsAppImage2026-06-17at5.46.20PM(1)_7f333f8f.webp')`,
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight">
                River
              </h1>
              <h2 className="text-5xl lg:text-6xl font-light text-white mb-4">District</h2>
              <p className="text-amber-500 text-lg font-light italic">Capital Lake Living</p>
            </div>

            <p className="text-lg text-amber-500 font-light">
              Premium residences in one of the most strategic locations in the New Administrative Capital.
            </p>

                <p className="text-gray-300 text-base leading-relaxed max-w-md">
              {project.longDescription}
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-900/60 backdrop-blur border border-amber-500/30 rounded-lg p-4">
                <MapPin className="w-5 h-5 text-amber-500 mb-2" />
                <p className="text-xs text-gray-400 mb-1">Location</p>
                <p className="text-sm font-semibold text-white">{project.location}</p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur border border-amber-500/30 rounded-lg p-4">
                <DollarSign className="w-5 h-5 text-amber-500 mb-2" />
                <p className="text-xs text-gray-400 mb-1">Starting From</p>
                <p className="text-sm font-semibold text-white">{project.pricePerMeter / 1000}K EGP / m²</p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur border border-amber-500/30 rounded-lg p-4">
                <Calendar className="w-5 h-5 text-amber-500 mb-2" />
                <p className="text-xs text-gray-400 mb-1">Payment Plan</p>
                <p className="text-sm font-semibold text-white">{project.paymentPlan}</p>
              </div>
            </div>
          </div>

          {/* Right: Lead Form */}
          <div
            ref={formRef}
            className="bg-slate-900/80 backdrop-blur border border-amber-500/40 rounded-xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Request Current Prices & Payment Plan</h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-slate-800 border border-amber-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mobile Number <span className="text-amber-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select className="px-3 py-3 bg-slate-800 border border-amber-500/30 rounded-lg text-white focus:outline-none focus:border-amber-500">
                    <option>+20</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="01XXXXXXXXX"
                    className="flex-1 px-4 py-3 bg-slate-800 border border-amber-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Purpose</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBuyingPurpose("investment")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      buyingPurpose === "investment"
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 text-gray-300 border border-amber-500/30 hover:border-amber-500"
                    }`}
                  >
                    Investment
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyingPurpose("living")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      buyingPurpose === "living"
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 text-gray-300 border border-amber-500/30 hover:border-amber-500"
                    }`}
                  >
                    Living
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Request Pricing"}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                We respect your privacy. Your data is 100% secure.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Why River District Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Why River District?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: "Prime Location", desc: "Strategically located in the New Administrative Capital" },
              { icon: Droplet, title: "Direct Green River Frontage", desc: "Exclusive waterfront location with scenic views" },
              { icon: Trees, title: "Low Built-up Ratio", desc: "12% built-up ratio for exclusive living" },
              { icon: Building2, title: "Developer: Nile Development", desc: "Trusted developer with proven track record" },
              { icon: Zap, title: "Project Area: 40 Acres", desc: "Large-scale masterplan built for modern living" },
              { icon: Calendar, title: "Payment Plans Up to 10 Years", desc: "Flexible payment plans designed for your needs" },
            ].map((item: any, idx: number) => (
              <div key={idx} className="bg-slate-800 border border-amber-500/30 rounded-xl p-6 hover:border-amber-500/60 transition-all">
                <item.icon className="w-8 h-8 text-amber-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Gallery</h2>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {galleryImages.map((img: any, idx: number) => (
                  <div
                    key={idx}
                    className={`relative rounded-lg overflow-hidden border border-amber-500/20 hover:border-amber-500/60 transition-all cursor-pointer ${
                      idx === galleryIndex ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                    onClick={() => setGalleryIndex(idx)}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Gallery Navigation */}
              <button
                onClick={() => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-amber-500/80 hover:bg-amber-500 text-slate-950 p-2 rounded-full transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-500/80 hover:bg-amber-500 text-slate-950 p-2 rounded-full transition-all"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Amenities Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Amenities</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {amenities.map((amenity: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="bg-slate-800 border border-amber-500/30 rounded-lg p-6 mb-4 hover:border-amber-500/60 transition-all">
                  <amenity.icon className="w-8 h-8 text-amber-500 mx-auto" />
                </div>
                <p className="text-sm font-medium text-gray-300">{amenity.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {project.faq?.map((faq: any, idx: number) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border border-amber-500/30 rounded-lg px-6 hover:border-amber-500/60 transition-all"
              >
                <AccordionTrigger className="text-white hover:text-amber-500 transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-y border-amber-500/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Invest?</h2>
          <p className="text-gray-300 mb-8">Contact us now to get the best prices and exclusive offers</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3 rounded-lg"
            >
              Fill the Form
            </Button>
            <Button
              onClick={() => {
                const whatsappNumber = project.whatsappNumber || globalData.whatsappNumber;
                const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=مرحباً، أنا مهتم بـ ${project.name}`;
                window.open(whatsappUrl, "_blank");
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-lg"
            >
              Contact via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-amber-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-white font-bold mb-2">Best Deal Real Estate</p>
              <p className="text-gray-400 text-sm">Building premium communities and creating better lives.</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">© 2026 Best Deal Real Estate. All Rights Reserved.</p>
              <a href="#" className="text-amber-500 hover:text-amber-400 text-sm transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => {
          const whatsappNumber = project.whatsappNumber || globalData.whatsappNumber;
          const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=مرحباً، أنا مهتم بـ ${project.name}`;
          window.open(whatsappUrl, "_blank");
        }}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-30 flex items-center gap-2"
        title="Contact via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
