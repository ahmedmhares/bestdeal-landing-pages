export interface ProjectData {
  id: string;
  name: string;
  title: string;
  description: string;
  location: string;
  pricePerMeter: number;
  monthlyInstallment: number;
  investorTitle: string;
  investorDescription: string;
  endUserTitle: string;
  endUserDescription: string;
  features: string[];
  phone: string;
}

export const projects: Record<string, ProjectData> = {
  "river-district": {
    id: "river-district",
    name: "River District",
    title: "River District - Capital Lake Living",
    description: "Luxury waterfront living in the heart of the New Capital",
    location: "New Capital, Egypt",
    pricePerMeter: 85000,
    monthlyInstallment: 150000,
    investorTitle: "Invest in Prime Real Estate",
    investorDescription: "River District offers exceptional investment returns with prime location and high appreciation potential. Secure your future with luxury waterfront properties.",
    endUserTitle: "Your Dream Waterfront Home",
    endUserDescription: "Experience luxury living with stunning capital views. River District combines modern architecture with natural beauty for the perfect home.",
    features: [
      "Waterfront Location",
      "Modern Architecture",
      "Green Spaces",
      "Capital Views",
      "Premium Amenities",
      "Investment Grade"
    ],
    phone: "+201044238910"
  }
};

export function getProject(id: string): ProjectData | null {
  return projects[id] || null;
}

export function getAllProjects(): ProjectData[] {
  return Object.values(projects);
}
