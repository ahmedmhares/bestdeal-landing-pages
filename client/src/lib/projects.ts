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
  },
  "mostakbal-city": {
    id: "mostakbal-city",
    name: "Mostakbal City",
    title: "Mostakbal City - Future Living",
    description: "Modern city development with strategic location and strong investment potential",
    location: "45 km from Cairo, Egypt",
    pricePerMeter: 45000,
    monthlyInstallment: 80000,
    investorTitle: "Invest in Future Growth",
    investorDescription: "Mostakbal City offers excellent investment opportunities with rapid development and strong appreciation potential.",
    endUserTitle: "Modern Living at Affordable Prices",
    endUserDescription: "Experience modern living with all amenities at competitive prices. Perfect for families and investors.",
    features: [
      "Strategic Location",
      "Modern Design",
      "Flexible Payment",
      "Growing Area",
      "Good ROI",
      "Family Friendly"
    ],
    phone: "+201044238910"
  },
  "new-capital": {
    id: "new-capital",
    name: "New Capital",
    title: "New Capital - Egypt's Future",
    description: "Premium investment in Egypt's largest urban development project",
    location: "45 km from Cairo, Egypt",
    pricePerMeter: 120000,
    monthlyInstallment: 200000,
    investorTitle: "Invest in National Development",
    investorDescription: "New Capital represents Egypt's future with government backing and unlimited appreciation potential.",
    endUserTitle: "Live in Egypt's Future",
    endUserDescription: "Be part of Egypt's transformation. New Capital offers world-class living standards and amenities.",
    features: [
      "Government Project",
      "World-Class Amenities",
      "Strategic Location",
      "Premium Quality",
      "Strong Growth",
      "Safe Investment"
    ],
    phone: "+201044238910"
  },
  "north-coast": {
    id: "north-coast",
    name: "North Coast",
    title: "North Coast - Mediterranean Paradise",
    description: "Luxury beachfront properties with tourism and investment potential",
    location: "Mediterranean Coast, Egypt",
    pricePerMeter: 65000,
    monthlyInstallment: 120000,
    investorTitle: "Invest in Tourism Gold",
    investorDescription: "North Coast offers strong rental income potential with year-round tourism season.",
    endUserTitle: "Your Beach Paradise",
    endUserDescription: "Own your slice of Mediterranean paradise with stunning beachfront living.",
    features: [
      "Beachfront Location",
      "Tourism Potential",
      "Rental Income",
      "Luxury Amenities",
      "Year-Round Tourism",
      "Resort Living"
    ],
    phone: "+201044238910"
  },
  "new-zayed": {
    id: "new-zayed",
    name: "New Zayed",
    title: "New Zayed - Modern Urban Living",
    description: "Contemporary residential development with excellent location and growth potential",
    location: "50 km from Cairo, Egypt",
    pricePerMeter: 55000,
    monthlyInstallment: 100000,
    investorTitle: "Invest in Urban Growth",
    investorDescription: "New Zayed offers solid investment returns with steady appreciation in a rapidly developing area.",
    endUserTitle: "Modern Living, Affordable Prices",
    endUserDescription: "Modern urban living with all amenities at reasonable prices. Perfect for growing families.",
    features: [
      "Modern Design",
      "Good Location",
      "Affordable Pricing",
      "Growing Area",
      "Family Friendly",
      "Strong Potential"
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
