# Best Deal Project Context

## Company Overview

Best Deal For Real Estate Investment is a real estate marketing and investment company focused on promoting property opportunities in Egypt. The company uses focused landing pages to present individual developments, capture buyer interest, and connect qualified leads with the sales team.

## Website Purpose

This website is a collection of conversion-focused real estate landing pages. Its primary goals are to:

- Present projects clearly and professionally.
- Communicate prices, payment plans, locations, amenities, and investment benefits.
- Capture prospective buyer and investor details.
- Attribute leads to advertising campaigns.
- Continue qualified conversations through WhatsApp.
- Support paid marketing campaigns and future project launches.

The website is not intended to be a general property marketplace or a full customer portal.

## Current Main Landing Page

River District is the current reference implementation and primary landing page.

It establishes the expected structure and experience for future pages:

- Premium hero section with project imagery.
- Key price, location, and payment information.
- Lead form near the top of the page.
- Investment or living purpose selection.
- Project benefits and amenities.
- Local image gallery.
- Frequently asked questions.
- Strong calls to action.
- WhatsApp contact options.
- Conversion and campaign tracking.

Future landing pages should preserve this conversion-focused structure while adapting content and presentation to the specific development.

## Target Users

The main audiences are:

- Property investors looking for opportunities in Egypt.
- Buyers purchasing homes for personal use.
- Egyptian residents comparing developments and payment plans.
- Egyptians living abroad who need a clear remote inquiry process.
- Prospects arriving from Meta advertising and tracked campaign links.
- Mobile users who expect to continue the conversation through WhatsApp.

Pages should communicate trust, clarity, and value without requiring real estate expertise from the visitor.

## Design Direction

The product uses a dark luxury real estate aesthetic:

- Charcoal, black, and deep slate backgrounds.
- Gold or amber accents.
- High-quality project photography.
- Strong contrast and readable typography.
- Premium but restrained visual styling.
- Clear information hierarchy.
- Responsive mobile-first layouts.
- Subtle transitions and purposeful interaction feedback.

River District is the visual reference. New pages should feel related to it without becoming identical or introducing inconsistent design systems.

## Lead Capture Flow

The intended lead flow is:

1. A visitor arrives from an advertisement, campaign link, search result, or direct visit.
2. Campaign parameters such as UTM values and `fbclid` are retained.
3. The visitor reviews the project and completes the lead form.
4. Required fields are validated.
5. The lead is submitted to the configured Google Apps Script endpoint.
6. A success message is shown only after a successful submission.
7. A Meta Pixel `Lead` event is recorded.
8. The form is cleared.
9. WhatsApp opens with a project-specific introductory message.

This order must remain reliable. Failed submissions must not be reported or tracked as successful leads.

## Meta Pixel Purpose

Meta Pixel measures advertising performance and conversion behavior.

It is used to:

- Record page visits.
- Attribute traffic and leads to Meta advertising.
- Record successful lead conversions.
- Support campaign optimization and audience creation.
- Measure which projects and campaigns generate qualified interest.

Pixel IDs and event behavior are production-sensitive. Avoid duplicate `PageView` or `Lead` events, and confirm the active production Pixel ID before changing analytics code.

## Google Sheets Purpose

Google Sheets is the current lead destination. Leads are submitted through Google Apps Script so the sales team can receive and manage inquiries without a custom CRM backend.

Lead records may include:

- Name.
- Phone number.
- Buying purpose.
- Project name.
- Submission timestamp.
- Page URL.
- Campaign source, medium, campaign, and content.
- `fbclid`.
- Landing-page source identifier.

The endpoint and payload structure must not change without explicit approval and coordination with the receiving sheet.

## WhatsApp Flow

WhatsApp is the primary follow-up channel.

After a successful form submission, the website opens a `wa.me` link using the project or global WhatsApp number and a project-specific message. Pages may also provide direct WhatsApp buttons for visitors who want immediate contact.

The configured number, message encoding, project name, and post-submission timing must remain correct. Direct WhatsApp access must not replace reliable lead submission unless explicitly requested.

## Content Management

The runtime content source is:

`client/public/content.json`

It contains global settings and project-specific information such as:

- Project names and identifiers.
- Developer and location details.
- Prices and payment plans.
- Descriptions and features.
- Highlights and frequently asked questions.
- Hero and gallery image paths.
- SEO content.
- Calls to action.
- WhatsApp numbers.

Use this file for project data whenever the existing schema supports the requirement. Avoid adding new content copies or embedding configurable values in React components.

Other similarly named JSON files are not the active Vite runtime source unless the project configuration is deliberately changed.

## Adding Future Landing Pages

River District should be used as the behavioral and quality reference.

For each new landing page:

1. Add and validate the project data in `client/public/content.json`.
2. Add local optimized images under `client/public/images/`.
3. Reuse existing components and shared lead, analytics, content, and WhatsApp logic.
4. Add the required page and route in `client/src/App.tsx`.
5. Avoid duplicating entire components when shared configuration or composition can support the page.
6. Add project-specific SEO metadata.
7. Verify the layout on mobile and desktop.
8. Verify direct navigation and browser refresh behavior.
9. Confirm content, image, form, tracking, and WhatsApp behavior.
10. Run the TypeScript check and production build.

Adding content alone does not currently create a public route. Routing must be handled explicitly unless the architecture is intentionally changed with approval.

## Current Priorities

Current priorities are:

- Keep River District stable and production-ready.
- Improve form validation without reducing conversion.
- Resolve discrepancies between configuration and hardcoded component values.
- Prevent duplicate analytics events.
- Keep project content centralized.
- Improve shared components for future landing pages.
- Add new project landing pages efficiently.
- Maintain fast loading and optimized local images.
- Preserve SEO quality.
- Keep lead delivery and campaign attribution dependable.
- Prepare for future CRM, email notification, dashboard, and testing capabilities without premature complexity.

## Things That Must Not Be Broken

Do not break or change without explicit approval:

- River District layout, content flow, or conversion behavior.
- Public routes or direct-page refresh support.
- The production domain or Vercel configuration.
- Google Apps Script lead submission.
- Lead payload fields or field names.
- UTM and `fbclid` capture.
- Success and failure handling.
- Meta Pixel initialization and conversion tracking.
- WhatsApp numbers, messages, and redirects.
- Frequently asked questions and footer behavior.
- The `client/public/content.json` structure.
- Local project image paths.
- Responsive mobile behavior.
- SEO metadata and indexability.
- GitHub and Vercel deployment workflows.

Never deploy, push to `main`, change production integrations, or alter protected behavior without explicit approval.
