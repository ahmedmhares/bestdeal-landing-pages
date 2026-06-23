import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProject } from "@/lib/projects";
import { ChevronRight, MapPin, Home, Waves, Users, Phone } from "lucide-react";

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
      `مرحبا، أنا مهتم بـ ${project.name} للسكن. هل يمكنك إرسال المزيد من المعلومات؟`
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
              Contact Us
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
                <span className="text-blue-700 text-sm font-semibold">Luxury Living</span>
              </div>
              <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {project.endUserTitle}
              </h2>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                {project.endUserDescription}
              </p>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="bg-white border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-slate-600">Starting from</p>
                      <p className="text-lg font-bold text-slate-900">
                        {project.pricePerMeter.toLocaleString()} EGP/m²
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <Waves className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-xs text-slate-600">Monthly from</p>
                      <p className="text-lg font-bold text-slate-900">
                        {(project.monthlyInstallment / 1000).toFixed(0)}K EGP
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
                Schedule a Tour
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Right side - Lifestyle */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-300 rounded-xl p-8">
                <h3 className="text-sm font-semibold text-blue-900 mb-4 uppercase tracking-wide">
                  Lifestyle Features
                </h3>
                <ul className="space-y-3">
                  {[
                    "Stunning Natural Views",
                    "Modern Architecture",
                    "Green Spaces & Parks",
                    "Premium Amenities",
                    "Family-Friendly Community",
                    "Safe & Secure"
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

      {/* Amenities Section */}
      <section className="py-16">
        <div className="container">
          <h3 className="text-3xl font-bold text-slate-900 mb-12">What You'll Love</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {project.features.map((feature, idx) => (
              <Card key={idx} className="bg-slate-50 border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-slate-900 font-semibold">{feature}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Find Your Dream Home</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Visit us today and discover why {project.name} is the perfect place to call home.
          </p>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-white hover:bg-slate-100 text-blue-600"
          >
            Get in Touch
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
