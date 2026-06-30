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
  budget?: string;
  source?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  utmContent?: string;
  fbclid?: string;
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
    // Validate required fields
    if (!leadData.name || !leadData.name.trim()) {
      console.error("Validation error: Name is required");
      return false;
    }
    if (!leadData.phone || !leadData.phone.trim()) {
      console.error("Validation error: Phone is required");
      return false;
    }

    // Google Apps Script Web App URL
    const appsScriptUrl = "https://script.google.com/macros/s/AKfycbzg4SsCqPWAro1Lc_8WvHas67jyOs7YZ3GEMcQf8NvXS9PZQFkB9GucXeijCiIPF6LX/exec";

    // Prepare the payload as FormData
    const formData = new FormData();
    formData.append("name", leadData.name.trim());
    formData.append("phone", leadData.phone.trim());
    formData.append("timestamp", leadData.timestamp);
    formData.append("pageUrl", leadData.pageUrl);
    formData.append("projectName", leadData.projectName);
    formData.append("buyingPurpose", leadData.buyingPurpose === "living" ? "سكن" : "استثمار");
    if (leadData.budget) formData.append("Budget", leadData.budget);
    formData.append("source", leadData.source || "river-district-landing");
    
    // Add UTM parameters if available
    if (leadData.utmSource) formData.append("utmSource", leadData.utmSource);
    if (leadData.utmCampaign) formData.append("utmCampaign", leadData.utmCampaign);
    if (leadData.utmMedium) formData.append("utmMedium", leadData.utmMedium);
    if (leadData.utmContent) formData.append("utmContent", leadData.utmContent);
    if (leadData.fbclid) formData.append("fbclid", leadData.fbclid);

    // Submit to Google Apps Script with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      body: formData,
      signal: controller.signal,
      // Don't set Content-Type header - browser will set it automatically with FormData
    });

    clearTimeout(timeoutId);

    // Check if response is ok
    if (!response.ok) {
      console.error("Google Apps Script error:", response.status, response.statusText);
      return false;
    }

    // Try to parse response as JSON for additional validation
    try {
      const responseData = await response.json();
      if (responseData.success === false) {
        console.error("Google Apps Script returned error:", responseData.error);
        return false;
      }
    } catch (e) {
      // Response might not be JSON, but that's ok if status is 200
      console.log("Lead submitted successfully (non-JSON response)");
    }

    console.log("Lead submitted to Google Apps Script successfully");
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Request timeout: Google Apps Script took too long to respond");
    } else {
      console.error("Failed to submit lead to Google Apps Script:", error);
    }
    return false;
  }
}

/**
 * Generate a unique tracking ID for the lead
 */
export function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
