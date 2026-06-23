import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProject } from "@/lib/projects";
import { ChevronRight, MapPin, TrendingUp, DollarSign, Phone } from "lucide-react";

interface ProjectInvestorProps {
  projectId: string;
}

export default function ProjectInvestor({ projectId }: ProjectInvestorProps) {
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
      `مرحبا، أنا مهتم بـ ${project.name} كاستثمار. هل يمكنك إرسال المزيد من المعلومات؟`
    );
    window.open(`https://wa.me/${project.phone.replace(/[^0-9]/g, "")}?text=${message}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{project.name}</h1>
              <p className="text-sm text-slate-400">Investment Opportunity</p>
            </div>
            <Button
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full mb-6">
                <span className="text-green-400 text-sm font-semibold">Investment Grade</span>
              </div>
              <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                {project.investorTitle}
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {project.investorDescription}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="bg-white/5 border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-xs text-slate-400">Price per M²</p>
                      <p className="text-lg font-bold text-white">
                        {project.pricePerMeter.toLocaleString()} EGP
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white/5 border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-slate-400">Monthly</p>
                      <p className="text-lg font-bold text-white">
                        {(project.monthlyInstallment / 1000).toFixed(0)}K EGP
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
              >
                Get More Details
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Right side - Stats */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-8">
                <h3 className="text-sm font-semibold text-green-400 mb-4 uppercase tracking-wide">
                  Investment Benefits
                </h3>
                <ul className="space-y-3">
                  {[
                    "Prime Location with High Appreciation",
                    "Strong Rental Income Potential",
                    "Modern Architecture & Design",
                    "Flexible Payment Plans",
                    "Capital Growth Opportunity",
                    "Professional Management"
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <h3 className="text-3xl font-bold text-white mb-12">Project Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {project.features.map((feature, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-colors">
                <MapPin className="w-6 h-6 text-green-400 mb-3" />
                <p className="text-white font-semibold">{feature}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600/20 to-blue-600/20 border-t border-white/10">
        <div className="container text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Invest?</h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about this exclusive investment opportunity.
          </p>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Contact Us Now
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
