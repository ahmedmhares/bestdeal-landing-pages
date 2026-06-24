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
 * Uses FormData with application/x-www-form-urlencoded
 * This is compatible with Google Apps Script doPost() function
 */
export async function submitLeadToGoogleScript(leadData: LeadData): Promise<boolean> {
  try {
    // Google Apps Script Web App URL
    const appsScriptUrl = "https://script.google.com/macros/s/AKfycbzg4SsCqPWAro1Lc_8WvHas67jyOs7YZ3GEMcQf8NvXS9PZQFkB9GucXeijCiIPF6LX/exec";

    // Prepare the payload as FormData
    const formData = new FormData();
    formData.append("name", leadData.name);
    formData.append("phone", leadData.phone);
    formData.append("timestamp", leadData.timestamp);
    formData.append("pageUrl", leadData.pageUrl);
    formData.append("projectName", leadData.projectName);
    formData.append("buyingPurpose", leadData.buyingPurpose === "living" ? "سكن" : "استثمار");
    formData.append("source", "river-district-landing");

    // Submit to Google Apps Script
    // FormData will be sent as application/x-www-form-urlencoded
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - browser will set it automatically with FormData
    });

    // Check if response is ok
    if (!response.ok) {
      console.error("Google Apps Script error:", response.status, response.statusText);
      return false;
    }

    console.log("Lead submitted to Google Apps Script successfully");
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
