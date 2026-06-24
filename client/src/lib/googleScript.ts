/**
 * Google Apps Script service for lead submission
 * Sends lead data directly to Google Apps Script Web App
 * Data is stored in Google Sheets
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
 * Submit lead data directly to Google Apps Script Web App
 * Returns true if successful, false if failed
 * 
 * Google Apps Script has CORS restrictions, so we use mode: 'no-cors'
 * This means we can't read the response, but we can still send the data
 * We handle success optimistically (show success message after POST)
 */
export async function submitLeadToGoogleScript(leadData: LeadData): Promise<boolean> {
  try {
    // Google Apps Script Web App URL
    const appsScriptUrl = "https://script.google.com/macros/s/AKfycbzt-Ia2ZAtCr3plI4tldwiJIwL7BtRodBP-4IzDuCk1OdBooW0YohqLM87LgcXmmwJv/exec";

    // Prepare the payload
    const payload = {
      name: leadData.name,
      phone: leadData.phone,
      timestamp: leadData.timestamp,
      pageUrl: leadData.pageUrl,
      projectName: leadData.projectName,
      buyingPurpose: leadData.buyingPurpose === "living" ? "سكن" : "استثمار",
      source: "river-district-landing",
    };

    // Submit to Google Apps Script
    // Using mode: 'no-cors' because Apps Script has CORS restrictions
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // With no-cors, we can't read the response status
    // We assume success if no network error occurred
    console.log("Lead submitted to Google Apps Script");
    return true;
  } catch (error) {
    console.error("Failed to submit lead to Google Apps Script:", error);
    return false;
  }
}

/**
 * Generate a unique tracking ID for the lead
 */
export function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
