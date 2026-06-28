# Repository Working Rules

## Scope

These rules apply to every AI coding assistant working in this repository.

## Before Making Changes

- Read the relevant implementation before proposing or making changes.
- Check `git status` and preserve all existing user changes.
- Do not modify unrelated files.
- Ask for approval before changing routing, deployment configuration, analytics, lead capture, WhatsApp behavior, or the content schema.
- Never expose credentials, private endpoints, or customer lead data.

## Project Architecture

- Use the existing React 19, TypeScript, Vite, Tailwind CSS 4, Wouter, shadcn/ui, and lucide-react stack.
- Follow existing project patterns before introducing new dependencies or abstractions.
- Treat `client/public/content.json` as the runtime content source.
- Note that routes are explicitly defined in `client/src/App.tsx`; adding content alone does not create a route.
- Keep the application responsive and preserve its dark luxury visual direction.
- Use local project images from `client/public/images/`.

## Protected Behavior

Do not change these areas without explicit approval:

- Public routes and domain behavior
- Google Apps Script lead submission
- WhatsApp redirect flow
- Meta Pixel initialization or events
- UTM and `fbclid` capture
- FAQ and footer behavior
- Vercel rewrites
- The structure of `client/public/content.json`

## Content And Components

- Put project-specific data in `client/public/content.json` when the existing schema supports it.
- Avoid introducing additional duplicate content files.
- Do not claim content is dynamic when it remains hardcoded in a component.
- Preserve Arabic text and UTF-8 encoding.
- Validate JSON after content changes.

## Analytics And Lead Capture

- Treat analytics IDs and integration endpoints as production-sensitive.
- Confirm the active Meta Pixel ID before changing it.
- Avoid duplicate `PageView` or `Lead` events.
- Preserve the lead sequence: validate, submit, notify, track success, then open WhatsApp.
- Do not report a successful lead unless the submission endpoint indicates success.

## Development

- Use the package manager and lockfile already provided by the repository.
- Do not update dependencies or rewrite the lockfile unless explicitly requested.
- Keep TypeScript strict and avoid unnecessary `any` types.
- Do not edit generated output such as `dist/` or installed dependencies in `node_modules/`.

## Verification

For code changes, run:

```powershell
pnpm run check
pnpm run build
```

Also verify:

- Relevant routes render correctly.
- Mobile and desktop layouts do not overlap or overflow.
- Referenced images load.
- Lead and analytics behavior is not duplicated.
- `git status` contains only the intended changes.

## Communication

- Clearly distinguish verified behavior from assumptions.
- Report build warnings and anything that could not be tested.
- Never deploy, push, commit, or modify production services without explicit approval.

## Deployment & Safety

- Never deploy to Vercel without explicit approval.
- Never push directly to the `main` branch without approval.
- Always explain the implementation plan before modifying files.
- List every file that will be changed before editing.
- If there are multiple implementation options, present the best options with their trade-offs before coding.

## Best Deal Standards

- River District is the reference implementation for future landing pages.
- Reuse existing components whenever possible.
- Do not create duplicate React components.
- Keep loading performance high and avoid unnecessary JavaScript.
- Maintain SEO best practices for every new page.
- Prefer configuration over hardcoded values.
