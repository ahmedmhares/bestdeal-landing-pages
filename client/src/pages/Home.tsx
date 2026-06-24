import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllProjects } from "@/lib/projects";
import { ChevronRight, MapPin, DollarSign } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/40">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Best Deal</h1>
              <p className="text-sm text-slate-400">Real Estate Investment</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Premium Real Estate Investments
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Discover exclusive opportunities in Egypt's most sought-after locations
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 overflow-hidden hover:border-white/40 transition-all group cursor-pointer"
                onClick={() => navigate(`/${project.id}`)}
              >
                <div className="p-8">
                  {/* Project Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-6 line-clamp-2">{project.description}</p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Price per M²</p>
                      <p className="text-lg font-bold text-white">
                        {(project.pricePerMeter / 1000).toFixed(0)}K EGP
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Monthly from</p>
                      <p className="text-lg font-bold text-white">
                        {(project.monthlyInstallment / 1000).toFixed(0)}K EGP
                      </p>
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-6">
                    <p className="text-xs text-slate-400 mb-3 uppercase tracking-wide">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-slate-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-slate-300">
                          +{project.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/${project.id}`);
                    }}
                  >
                    For Investment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="container text-center text-slate-400">
          <p>© 2026 Best Deal Real Estate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
