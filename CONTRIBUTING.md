# Contributing to Trade Show Tools

Thank you for your interest in contributing. This project is a collection of free, browser-based tools for B2B trade show teams.

## How to report a bug

Open an issue using the **Bug Report** template and include:

- Which tool is affected (include the URL, e.g. `/icp-matcher/`)
- Steps to reproduce
- Expected behavior vs. actual behavior
- Browser and operating system
- Console errors if any (open DevTools with `F12` and paste the relevant output)

## How to request a new tool

Open an issue using the **Tool Request** template. A good request includes:

- The problem it solves for trade show teams
- Who would use it and when (e.g. "on the show floor", "2 weeks before the show")
- Rough description of inputs and outputs
- Whether you would be willing to help build it

We prioritize tools that are genuinely useful, can be built as a self-contained single-file implementation, and have no ongoing backend cost.

## How to submit a code contribution

1. Fork the repository and create a feature branch: `git checkout -b feat/your-tool-name`
2. Build your tool following the development standards below
3. Test in Chrome, Firefox, and Safari (mobile Safari if the tool is designed for on-floor use)
4. Open a pull request with a clear description of what the tool does and who it is for
5. Link the PR to the relevant issue if one exists

Keep PRs focused. One tool or fix per PR.

## Tool development standards

**Architecture**

- Each tool lives in its own subdirectory with a single `index.html` file
- No build steps, no bundlers, no npm dependencies
- Pure HTML, CSS, and vanilla JavaScript only
- Shared utilities go in `/shared/` and are included via `<script src="../shared/...">` tags

**AI tools (BYOK)**

- All AI-powered tools use the Anthropic API (not OpenAI)
- The API key is entered by the user in the UI and stored only in `localStorage` if the user opts in
- By default, the key is sent directly from your browser to `api.anthropic.com` — it does not pass through any intermediate server in the default GitHub Pages deployment
- Include a note near the API key input with a link to `console.anthropic.com/settings/keys` and an estimate of typical cost
- Use `claude-sonnet-4-20250514` as the default model unless there is a specific reason to use another

**Backend / proxy**

- Tools must work entirely in the browser by default — no required backend
- The repository includes an optional self-hosted proxy (`api/anthropic.js`) for teams that want to route AI calls through their own server. If used, it must be configured with an explicit `ALLOWED_ORIGIN` env var (wildcard `*` is not permitted), and callers must supply the API key in the request body — no server-side key storage is allowed
- Data processing happens client-side; results exist only in the user's browser session

**Style**

- Match the existing dark theme (CSS variables defined in `:root`)
- Use Inter Tight from Google Fonts
- Keep the UI consistent with existing tools: card layout, `.btn` / `.btn-outline` classes, progress bars for async operations

**Footer and attribution**

- Every tool must include the standard footer with a link back to [Lensmor](https://www.lensmor.com/?utm_source=github&utm_medium=tool&utm_campaign=trade-show-tools)
- Use the UTM pattern: `utm_source=github&utm_medium=tool&utm_campaign=<tool-name>`
- Include a "View on GitHub" link and cross-links to 2–3 related tools

**README**

- Add your tool to the Available Tools table in the root `README.md`
- Add a dedicated section below the table with a 2–3 line description and a "How to Use" list of 3–4 steps
- Update the tool count in the header description if the number changes

## Code of conduct

Be constructive. Focus on making tools useful for the people who need them. No promotional content in tool copy or data.

---

Maintained by [Lensmor](https://www.lensmor.com/?utm_source=github&utm_medium=contributing&utm_campaign=trade-show-tools) — AI-powered trade show intelligence for B2B teams.
