<p align="center">
  <a href="https://www.lensmor.com/?utm_source=github&utm_medium=readme&utm_campaign=trade-show-tools">
    <img src="https://raw.githubusercontent.com/LensmorOfficial/.github/main/profile/assets/banner.png" alt="Lensmor" width="600">
  </a>
</p>

# Trade Show Tools

[![Stars](https://img.shields.io/github/stars/LensmorOfficial/trade-show-tools?style=flat)](https://github.com/LensmorOfficial/trade-show-tools/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/LensmorOfficial/trade-show-tools?style=flat)](https://github.com/LensmorOfficial/trade-show-tools/commits/main)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**9 free AI-powered tools for B2B trade show teams.** Qualify leads from badge photos, score exhibitor lists against your ICP, extract booth maps into lead lists, and calculate ROI — all in the browser. No signup. No backend. Bring your own API key.

**[Open the tools →](https://lensmorofficial.github.io/trade-show-tools/)** | Built by [Lensmor](https://www.lensmor.com/?utm_source=github&utm_medium=readme&utm_campaign=trade-show-tools)

**If you find these tools useful, please star this repo — it helps others discover them.**

## Preview

[![Trade Show Tools Homepage](screenshots/tools-homepage.png)](https://lensmorofficial.github.io/trade-show-tools/)

| ROI Calculator | ICP Matcher | Badge Qualifier |
|---|---|---|
| [![ROI Calculator](screenshots/roi-calculator.png)](https://lensmorofficial.github.io/trade-show-tools/roi-calculator/) | [![ICP Matcher](screenshots/icp-matcher.png)](https://lensmorofficial.github.io/trade-show-tools/icp-matcher/) | [![Badge Qualifier](screenshots/badge-qualifier.png)](https://lensmorofficial.github.io/trade-show-tools/badge-qualifier/) |

## Available Tools

| Tool | Description | Status |
|------|-------------|--------|
| [ROI Calculator](https://lensmorofficial.github.io/trade-show-tools/roi-calculator/) | Calculate trade show return on investment, cost per lead, and break-even analysis | Live |
| [Budget Planner](https://lensmorofficial.github.io/trade-show-tools/budget-planner/) | Plan exhibition budgets with industry benchmarks across 8 categories | Live |
| [Checklist Generator](https://lensmorofficial.github.io/trade-show-tools/checklist-generator/) | Generate time-based pre-show checklists with interactive tasks | Live |
| [ICP Target Matcher](https://lensmorofficial.github.io/trade-show-tools/icp-matcher/) | AI-powered exhibitor list scoring with ice-breaker pitch generation (BYOK) | Live |
| [Badge Qualifier](https://lensmorofficial.github.io/trade-show-tools/badge-qualifier/) | Snap a badge photo, get instant AI lead qualification with CRM-ready data (BYOK) | Live |
| [Outreach Generator](https://lensmorofficial.github.io/trade-show-tools/outreach-generator/) | Generate personalized post-show follow-up emails and LinkedIn messages (BYOK) | Live |
| [Floor Plan Extractor](https://lensmorofficial.github.io/trade-show-tools/floorplan-extractor/) | Extract booth numbers and companies from floor plan images/PDFs into lead lists (BYOK) | Live |
| [Competitor Radar](https://lensmorofficial.github.io/trade-show-tools/competitor-radar/) | Log competitor intel with photos/voice, auto-generate competitive battlecard (BYOK) | Live |
| [Booth Location Scorer](https://lensmorofficial.github.io/trade-show-tools/booth-scorer/) | Mark your booth on a floor plan, get AI position grading (A-F) with strategy (BYOK) | Live |

## ROI Calculator

Estimate your trade show return on investment before committing. Enter your costs (booth, travel, marketing, staff), expected leads, conversion rate, and average deal size to see:

- **ROI percentage** — Is this show worth attending?
- **Cost per lead** — How efficient is your lead generation?
- **Cost per acquisition** — What does each customer actually cost?
- **Break-even analysis** — How many leads do you need to break even?
- **Visual cost breakdown** — Where is your money going?

### How to Use

1. Open the [ROI Calculator](https://lensmorofficial.github.io/trade-show-tools/roi-calculator/)
2. Enter your exhibition costs across 5 categories
3. Enter expected leads, conversion rate, and deal size
4. Click "Calculate ROI" to see your results

## ICP Target Matcher

Upload a trade show exhibitor list (CSV) and describe your ideal customer profile. The tool scores every company for ICP fit and generates personalized ice-breaker pitches for your top targets — turning a raw exhibitor list into a prioritized visit plan before the show.

Requires Anthropic API key.

### How to Use

1. Enter your Anthropic API key (`sk-ant-...`) and optionally save it locally
2. Upload the exhibitor CSV — the tool auto-detects the company name column; add an industry/description column to improve match accuracy
3. Describe your ICP in plain English (who you sell to, company size, industry, buyer role)
4. Click "Analyze Exhibitor List" — results are sorted by score with hot (75+), warm (50–74), and cold categories; export as CSV or copy top targets

## Badge Qualifier

Snap a photo of a badge or business card at the show floor, add an optional voice note, and get instant AI lead qualification. The tool extracts contact details, assesses buying authority, scores ICP fit, and recommends specific next steps — all without typing.

Requires Anthropic API key.

### How to Use

1. Enter your Anthropic API key and optionally your ICP description so the AI can assess fit
2. Take a photo with your device camera or upload from gallery; the image is compressed locally before sending
3. Optionally tap the microphone to dictate observations (interest level, product discussed, follow-up timing)
4. Tap "Qualify This Lead" to get a score, authority assessment, and recommended next actions; tap "Save & Next" to log the lead and capture the next one; export all session leads as CSV at the end

## Floor Plan Extractor

Upload a trade show floor plan (image or PDF) and AI extracts every booth number and company name visible on the plan, then enriches each entry with industry, estimated website, and company size — producing a CRM-ready lead list from a floor map in under a minute.

Requires Anthropic API key.

### How to Use

1. Enter your Anthropic API key and optionally the show name to improve enrichment context
2. Upload the floor plan as a JPG, PNG, or multi-page PDF; a canvas preview appears with page navigation for multi-page files
3. Choose extraction mode: "All pages" for a comprehensive list or "Current page only" for speed
4. Click "Extract Booths & Companies" — results appear in a sortable table with booth number, company, industry, website, and size estimate; export as CSV or copy as tab-separated text for CRM import

## Competitor Radar

Log competitor intelligence on the show floor in real time. Snap photos of competitor booths, dictate observations by voice, and let AI parse each entry into structured intel (messaging, products, pricing, threat level). At the end of the day, generate a full competitive battlecard report in one click.

Requires Anthropic API key.

### How to Use

1. Set up your watchlist by entering competitor names, add your own product context so the AI frames threat assessments correctly, and enter your Anthropic API key
2. For each competitor, select them from the watchlist, take a booth photo or upload from gallery, and record voice observations or type notes
3. Tap "Log Intel" — the AI analyzes the photo and notes and adds a structured entry to the intel feed with marketing message, products spotted, pricing signals, and threat level
4. When ready, click "Generate Battlecard Report" to produce an executive summary, per-competitor analysis, key trends, and prioritized action items; export all raw intel as CSV

## Booth Location Scorer

Upload a floor plan image, use the interactive canvas to mark your booth location, entrances, and anchor tenants (large traffic-drawing booths), then get an AI grade (A–F) with detailed analysis of foot traffic prediction, visibility, and a strategic positioning recommendation.

Requires Anthropic API key.

### How to Use

1. Enter your Anthropic API key, the show name, and optional booth details (booth number, dimensions)
2. Upload the floor plan image; click "Mark Your Booth" mode and click on the canvas to drop a red pin on your location
3. Switch to "Mark Entrances" and click all entry/exit points; switch to "Mark Anchor Booths" and click major traffic-drawing exhibitors nearby
4. Click "Analyze Booth Position" — the AI returns a letter grade, traffic level prediction, entrance proximity, visibility score, anchor tenant effect, strengths, weaknesses, and a strategic recommendation; copy the full analysis to clipboard

## Budget Planner

Enter your total exhibition budget, booth size, team size, and show duration to get a recommended spend allocation across 8 categories (booth space, design, travel, marketing, staff, shipping, tech, miscellaneous), benchmarked against CEIR and IAEE industry data. Includes contextual tips based on your budget level.

### How to Use

1. Open the [Budget Planner](https://lensmorofficial.github.io/trade-show-tools/budget-planner/)
2. Select your currency and enter total budget, booth size (small / medium / large / island), team size, and number of show days
3. Click "Plan Budget" — the tool calculates a benchmark-adjusted allocation with percentage bars and dollar amounts for each category
4. Copy the full budget breakdown to clipboard or adjust inputs and recalculate; the tool saves your last inputs in the browser for quick return visits

## Outreach Generator

Upload your post-show leads CSV (or the export from Badge Qualifier), add your company context and preferred tone, and generate personalized follow-up emails and LinkedIn messages for every contact. Designed to help you hit the 48-hour follow-up window before show memory fades.

Requires Anthropic API key.

### How to Use

1. Enter your Anthropic API key, show name, company name, what you sell, your name/title, and preferred tone (professional, casual, executive, or technical)
2. Upload a leads CSV with at minimum Name and Company columns; the tool auto-detects columns and lets you remap them if needed
3. Click "Generate Outreach" — messages are generated in batches of 5 for quality; each lead gets a personalized email (subject + body) and a LinkedIn connection message
4. Review messages in the results panel, switch between Email and LinkedIn tabs per contact, copy individual messages, or export all as CSV

## Checklist Generator

Enter your show date, exhibitor type, and primary goal (lead generation, brand awareness, product launch, or networking) to generate a complete time-based preparation checklist. Tasks are organized into 9 phases from 6 months out to post-show follow-up, with deadlines calculated from your show date, interactive checkboxes, and phase status indicators.

### How to Use

1. Open the [Checklist Generator](https://lensmorofficial.github.io/trade-show-tools/checklist-generator/)
2. Enter the show start date, show name (optional), exhibitor type (first-time / returning / large booth), and your primary goal
3. Click "Generate Checklist" — the timeline renders with 9 phases, each showing its deadline date and current status (Done / Current / Upcoming / Overdue)
4. Check off tasks as you complete them, then click "Copy as Text" to paste the full checklist into a project management tool or share with your team

## Tech Stack

- Pure HTML, CSS, JavaScript — no frameworks, no dependencies
- Hosted on GitHub Pages
- Mobile responsive
- Works offline after first load

## Embed on Your Website

You can embed any tool on your website using an iframe:

```html
<iframe
  src="https://lensmorofficial.github.io/trade-show-tools/roi-calculator/"
  width="100%"
  height="900"
  frameborder="0"
  title="Trade Show ROI Calculator">
</iframe>
```

## About Lensmor

[Lensmor](https://www.lensmor.com/?utm_source=github&utm_medium=readme&utm_campaign=trade-show-tools) is an AI-native event intelligence platform that helps B2B teams discover trade shows, analyze exhibitors (uncovering [hidden competitors](https://www.lensmor.com/blog/hidden-competitors-trade-shows?utm_source=github&utm_medium=readme&utm_campaign=trade-show-tools)), and generate [qualified leads](https://www.lensmor.com/blog/trade-show-lead-capture?utm_source=github&utm_medium=readme&utm_campaign=trade-show-tools) before the event starts.

## More Open Source from Lensmor

- [awesome-trade-shows](https://github.com/LensmorOfficial/awesome-trade-shows) — Curated list of 100+ trade shows across 15 industries
- [trade-show-calendar](https://github.com/LensmorOfficial/trade-show-calendar) — Open dataset of 133 global trade shows (CSV + JSON)
- [exhibitor-intelligence-playbook](https://github.com/LensmorOfficial/exhibitor-intelligence-playbook) — Complete B2B trade show ROI playbook
- [trade-show-skills](https://github.com/LensmorOfficial/trade-show-skills) — AI-powered Claude Code skills for trade show automation
- [event-tech-landscape](https://github.com/LensmorOfficial/event-tech-landscape) — Map of 80+ tools powering the event industry
- [trade-show-email-templates](https://github.com/LensmorOfficial/trade-show-email-templates) — Ready-to-use email templates for trade show outreach

## Contributing

Have ideas for new tools or improvements? Read [CONTRIBUTING.md](CONTRIBUTING.md) for bug reporting, tool requests, and PR guidelines.

## License

[MIT](LICENSE)
