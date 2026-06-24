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
 */
export async function submitLeadToFormspree(leadData: LeadData): Promise<boolean> {
  try {
    // Formspree endpoint - replace with your actual form ID
    // You can get this from https://formspree.io
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID || "mkoloqwz"; // River District Leads
    const formspreeUrl = `https://formspree.io/f/${formspreeId}`;

    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: leadData.name,
        phone: leadData.phone,
        timestamp: leadData.timestamp,
        pageUrl: leadData.pageUrl,
        projectName: leadData.projectName,
        buyingPurpose: leadData.buyingPurpose,
        source: "river-district-landing",
        _subject: `New Lead: ${leadData.name} - ${leadData.projectName}`,
      }),
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
