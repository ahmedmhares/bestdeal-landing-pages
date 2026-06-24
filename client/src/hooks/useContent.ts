import { useEffect, useState } from 'react';

export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  description: string;
  longDescription: string;
  pricePerMeter: number;
  monthlyInstallment: number;
  paymentPlan: string;
  features: string[];
  highlights: Array<{
    title: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  images: {
    hero: string;
    gallery: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  ctaText: string;
  whatsappNumber: string;
}

export interface ContentData {
  metadata: {
    version: string;
    lastUpdated: string;
    description: string;
  };
  global: {
    companyName: string;
    whatsappNumber: string;
    ctaText: string;
    successMessage: string;
    errorMessage: string;
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
  };
  projects: Project[];
}

export function useContent() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/content.json');
        if (!response.ok) {
          throw new Error('Failed to load content');
        }
        const data = await response.json();
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const getProject = (projectId: string): Project | undefined => {
    return content?.projects.find(p => p.id === projectId);
  };

  const getAllProjects = (): Project[] => {
    return content?.projects || [];
  };

  const getGlobalData = () => {
    return content?.global;
  };

  return {
    content,
    loading,
    error,
    getProject,
    getAllProjects,
    getGlobalData,
  };
}
