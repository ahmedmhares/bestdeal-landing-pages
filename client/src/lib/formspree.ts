/**
 * Formspree service for lead submission
 * Sends lead data to Formspree for storage and email notification
 */

export interface LeadData {
  name: string;
  phone: string;
  timestamp: string;
  pageUrl: string;
  projectName: string;
  buyingPurpose: "living" | "investment";
}

/**
 * Submit lead data to Formspree
 * Returns true if successful, false if failed
 * Uses application/x-www-form-urlencoded for proper Formspree compatibility
 */
export async function submitLeadToFormspree(leadData: LeadData): Promise<boolean> {
  try {
    // Formspree endpoint
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID || "mkoloqwz"; // River District Leads
    const formspreeUrl = `https://formspree.io/f/${formspreeId}`;

    // Create FormData object for proper form submission
    const formData = new FormData();
    formData.append("name", leadData.name);
    formData.append("phone", leadData.phone);
    formData.append("timestamp", leadData.timestamp);
    formData.append("pageUrl", leadData.pageUrl);
    formData.append("projectName", leadData.projectName);
    formData.append("buyingPurpose", leadData.buyingPurpose);
    formData.append("source", "river-district-landing");
    formData.append("_subject", `New Lead: ${leadData.name} - ${leadData.projectName}`);

    const response = await fetch(formspreeUrl, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - browser will set it automatically with FormData
    });

    if (!response.ok) {
      console.error("Formspree error:", response.status, response.statusText);
      return false;
    }

    const result = await response.json();
    console.log("Lead submitted to Formspree successfully:", result);
    return true;
  } catch (error) {
    console.error("Failed to submit lead to Formspree:", error);
    return false;
  }
}

/**
 * Generate a unique tracking ID for the lead
 */
export function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
