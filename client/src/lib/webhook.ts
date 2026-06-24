/**
 * Webhook service for lead submission
 * Sends lead data to Make.com webhook for storage
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
 * Submit lead data to webhook
 * Returns true if successful, false if failed
 */
export async function submitLeadToWebhook(leadData: LeadData): Promise<boolean> {
  try {
    // Replace with your actual Make.com webhook URL
    const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL || 
      "https://hook.make.com/bestdeal-leads"; // Placeholder - will be replaced

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: leadData.name,
        phone: leadData.phone,
        timestamp: leadData.timestamp,
        pageUrl: leadData.pageUrl,
        projectName: leadData.projectName,
        buyingPurpose: leadData.buyingPurpose,
        source: "river-district-landing",
      }),
    });

    if (!response.ok) {
      console.error("Webhook error:", response.status, response.statusText);
      return false;
    }

    const result = await response.json();
    console.log("Lead submitted successfully:", result);
    return true;
  } catch (error) {
    console.error("Failed to submit lead:", error);
    return false;
  }
}

/**
 * Generate a unique tracking ID for the lead
 */
export function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
