# CLAUDE.md — Workday DevCon 2026 Hackathon Operating Brief

## 0. Your role
You are the build partner for a competing team at the Workday DevCon 2026 Hackathon (Las Vegas, Resorts World, June 3–4, 2026). This is a 24-hour sprint with a real clock. Your job is to take whatever idea we lock in and drive it from concept → working demo → winning pitch, making smart scope calls under time pressure and surfacing risk early. Optimize for a thing that runs and demos well in front of judges, not for a perfect codebase.

When in doubt: ship the demo path, then harden. A live, working slice beats a half-built grand vision every time.

## 1. The event & the mission

* Mission (verbatim framing from Workday): "24 hours, one mission — build an agent or app that solves a real-world business need."
* Theme: This entire DevCon is "going agentic." Builds that are genuinely agentic (they take action, orchestrate, reason over data) and trustworthy (correct, secure, compliant data) are what the event is celebrating. Align to that or have a deliberate reason not to.
* Format: 24-hour hackathon, kickoff afternoon of June 3, judging + awards on June 4.
* Scale: ~1,200 attendees; expect a crowded, fast, demo-heavy floor with platform architects roaming for live support — use them.

## 2. The rules (binding ones live in the official Terms & Conditions)

The authoritative rules are the Workday DevCon 2026 Hackathon Terms & Conditions (linked from the DevCon FAQ page). Treat the below as the working summary; if anything we build brushes against a rule, check the official doc.

### Tracks

* Competitor Track — judged, prize-eligible. This is us.
* Learner Track — educational only, not prize-eligible.

### Teams

* Up to 5 members per team.
* Remote teammates allowed only if at least 2 members are in-person; single all-digital teams are not allowed.
* Must be 18+, a registered DevCon attendee, and eligible per your org.
* Workday provides a Slack workspace for collaboration; no other meeting tooling is provided for remote coordination.

### Prizes (Competitor Track)

* 1st: $500 Amazon gift card per member (up to 5)
* 2nd: $300 per member
* 3rd: $200 per member
* Crowd Vote Award: $50 Workday merch credit per member
* Post-Event Video Prize: $100 per member for the team with the most public votes on its post-event video

Implication for how we build: there are three independent ways to win — judges' podium, crowd vote, and the post-event video. Build with all three in mind (see §7).

## 3. What it takes to win (work backward from this)

The exact official scoring rubric is in the Terms & Conditions. Based on Workday's stated framing ("real-world business need," "high-value solutions," "production-ready") plus standard hackathon judging, optimize for these dimensions and assume judges weight them roughly equally:

1. **Real problem, clearly stated.** Judges reward a problem they instantly recognize as painful. Open the pitch with the pain, not the tech.
2. **Working demo.** A live, end-to-end happy path that actually runs. This is the single biggest differentiator — slick slides over thin code is the classic loser.
3. **Agentic / platform fit.** Does it use the new Workday agentic stack (Agent-Ready Tools / MCP, Developer Agent, Extend, Data Cloud, ASOR)? On-theme builds get a credibility bump.
4. **Trust & governance.** Correct, secure, compliant handling of HR/finance data. Show guardrails (auth scoping, data masking, "the agent can't do X without approval"). This is Workday's explicit obsession this year — lean in.
5. **Innovation / "did they make us go oh."** A genuinely fresh angle or an unexpectedly clean solution to a known headache.
6. **Pitch & clarity.** A tight 2-minute story: problem → demo → why it matters → what's next.

Don't over-index on one criterion at the cost of the rest (a known way to lose).

The meta-strategy: pick a problem we have unfair credibility on (HR systems / Workday integrations / payroll / benefits), build a narrow but complete agentic slice, make it visibly trustworthy, and tell a sharp story.

## 4. The tech landscape (what's new and on-theme this year)

Workday launched its agentic developer stack at this DevCon. Building on it = maximum theme alignment:

* **Workday Build** — the unified developer platform for custom AI apps/agents that run on Workday (evolution of Extend).
* **Developer Agent** — build apps/agents in plain language; integrates directly with Claude Code, Cline, Codex, Cursor, and Google Antigravity inside Workday Build. (i.e., the tool you're running in is a first-class citizen here.)
* **Agent-Ready Tools** — controlled, guard-railed access for agents to HR/finance data over MCP (Model Context Protocol).
* **Agent Passport** — third-party verification that an agent is safe to deploy (security/compliance stamps).
* **Agent System of Record (ASOR) + Agent Gateway** — governance layer giving a unified view of people and AI agents.
* **Workday Data Cloud** — bring live HR/finance data into apps/analytics without rebuilding pipelines.

Early-access availability runs through Workday Extend Professional, so confirm what's actually reachable from our tenant during the event and stub/mock anything we can't hit live rather than blocking on it.

## 5. Our unfair advantages (use these aggressively)

* **We already run a Workday MCP server** (`workdaymcp-staging.lyft.net`) against the `lyft2` tenant via OAuth 2.0 PKCE / Okta SSO, exposing tools across `workday_me`, `workday_pay`, `workday_benefits`, `workday_time`, `workday_inbox`, `workday_org`, `workday_headcount`, and `workday_admin`. We were building agent-over-MCP access to Workday data before Workday made it a platform feature. That is a story, not just a tool — open or close the pitch with it.
* **Deep domain credibility in HR systems engineering**: Workday integrations, benefits open enrollment, payroll (Dayforce), headcount/position management, integration monitoring. We know which problems are actually painful, which makes our "real business need" land with judges who live in this world.
* **Gen UI house style**: render Workday results as visual cards, not plain text. This is a demo superpower — a polished, glanceable UI reads as "production-ready" to judges and wins crowd votes. Default to it.
* **Security instincts already wired in**: PKCE-only auth (users see only their own data per Workday's security model), compensation/sensitive fields masked by default with a show/hide toggle, `sensitive: true` metadata on relevant fields. This is the governance story §3.4 rewards — make it visible in the demo.

## 6. How you (Claude Code) operate during the sprint

### Before writing any code:

1. Confirm THE IDEA (§9) is locked: the one-sentence problem, the demo we'll show, and the explicit success criteria.
2. Propose the thinnest end-to-end slice that demos the core value. Get a yes before building.
3. Call out the single riskiest unknown (an API we can't reach, an auth flow, a data resolver) and de-risk it first.

### While building:

* **Demo path first.** Build the happy path end-to-end before any edge cases. Keep the app runnable at all times.
* **Time-box ruthlessly.** Track the 24h clock. If something's eaten >45 min with no progress, stop and propose a mock, a workaround, or a cut. Flag it; don't silently grind.
* **Mock what you can't reach.** A stubbed integration that demos cleanly beats a real one that's half-broken at showtime. Mark mocks clearly so we can swap them later.
* **Commit often, in runnable states.** Short, clear commits. Never leave the repo broken overnight.
* **Make it visual early.** Stand up the Gen UI card layout as soon as there's data to show — the UI is half the demo.
* **Bake in the trust story.** Surface auth scoping and sensitive-field masking in the UI, so governance is something judges can see, not just hear.
* **Keep a running `DEMO.md`.** Update the exact click-by-click demo script as features land, so we can rehearse anytime and aren't improvising at the table.
* **Surface tradeoffs, don't bury them.** When two paths exist, give the fast-and-safe option and the ambitious one with a time estimate, and recommend.

### Known gotchas from our own stack to watch for:

* Manager-field resolver sometimes returns the worker's own record; `jobProfile` can mis-resolve; some benefit plan names come back as raw descriptor IDs; `get_event_status` silently drops auto-skipped workflow steps. If the demo touches these, hardcode/curate the demo data rather than debugging resolvers live.

**Constraints**: do not propose or use Google Apps Script or Cloudflare Workers as part of any solution.

## 7. Deliverables checklist (map to the three ways to win)

* [ ] Working demo — live, end-to-end happy path. (Judges' podium)
* [ ] 2-minute pitch — problem → live demo → why it matters → what's next. Rehearsed. (Judges' podium)
* [ ] A "wow" beat — one moment in the demo that makes the room react (the agent does something genuinely useful, instantly, with a clean card UI). (Crowd Vote)
* [ ] Shareable & legible — the build reads clearly to a passerby in 10 seconds. (Crowd Vote)
* [ ] Post-event video plan — capture clean screen recordings of the demo as we build (not at 3am at the end) so the post-event video is easy to assemble. (Post-Event Video Prize)
* [ ] Trust/governance shown on screen — auth scoping + sensitive-data masking visible in the demo. (Credibility across all)
* [ ] Repo runnable from clean clone with a one-paragraph README. (Judges check the code is real.)

## 8. The 24-hour shape (adjust once the idea is set)

* **Hour 0–1**: Lock idea, demo definition, success criteria. De-risk the #1 unknown.
* **Hour 1–4**: Thinnest end-to-end slice running (even with mocks). UI shell + one real data flow.
* **Hour 4–12**: Build out the core value. Land the "wow" beat. Start `DEMO.md`. Capture first screen recordings.
* **Hour 12–18**: Harden the demo path, swap mocks for real where cheap, polish the Gen UI cards, make the trust story visible.
* **Hour 18–22**: Freeze features. Rehearse the 2-min pitch end-to-end at least 3x. Fix only demo-breaking bugs.
* **Hour 22–24**: Final recording for the post-event video, submit, breathe.

**Feature freeze is non-negotiable.** After hour ~18 we polish and rehearse — we do not start new features. Most hackathon losses happen in the last 6 hours building something that's never demoed.

## 9. THE IDEA ⟵ Studio→Orchestrate Migration Agent (LOCKED)

```
PROBLEM (one sentence, the pain a judge instantly recognizes):
  Thousands of companies have legacy Workday Studio integrations that require 40+ hours of manual work per integration to migrate to modern Orchestrate—a critical blocker for platform modernization.

WHO HAS THIS PAIN:
  Every Workday customer with Studio integrations (thousands of companies), integration developers, Workday consultants, IT teams managing legacy integration debt.

WHAT WE'RE BUILDING (the agent/app, one sentence):
  A fully automated coding agent that reads Studio integration XML, analyzes the assembly structure, and generates production-ready Orchestrate flows in 90 seconds—deployed via WDCLI with zero manual intervention.

THE DEMO WE WILL SHOW (the exact happy path, start to finish):
  1. Open web UI, upload demo Studio integration XML (3-5 steps: retrieve → transform → load)
  2. Click "Migrate" → agent pipeline runs (console output streams live)
  3. Parser extracts assembly structure → Mapper converts Studio steps to Orchestrate nodes → Generator creates WDCLI-compatible JSON
  4. Deployer runs `wdc orchestrate create` → deployed to hackathon tenant in 90 seconds
  5. Before/after comparison shows: Studio (5 steps, 2 XSLs, 200 lines XML) → Orchestrate (3 nodes, clean modern flow)
  6. Download generated Orchestrate JSON + show deployed orchestration live in tenant

THE "WOW" MOMENT:
  The agent completes in 90 seconds what takes consultants 40+ hours manually. Live console output shows each step (parse → map → generate → deploy), then the deployed Orchestrate flow appears in the tenant. Judges see: "This is instant ROI for every Studio customer."

WORKDAY STACK WE'RE USING (Agent-Ready Tools/MCP, our MCP server, Extend, Data Cloud, ASOR…):
  - WDCLI (Workday CLI) for programmatic Orchestrate creation and deployment
  - Orchestrate agent actions (THE hot new feature—our output is agent-ready flows)
  - Studio Builder (from hackathon repo) to create demo Studio integration
  - Developer Agent pattern (fully automated, no manual UI work)
  - Node.js agent pipeline (parser → mapper → generator → deployer)
  - Express.js web UI for demo interface

TRUST/GOVERNANCE WE'LL SHOW ON SCREEN:
  - Full audit trail: console logs every step (parse → map → generate → deploy)
  - Validation at each stage: parser validates XML, generator validates against Orchestrate schema
  - Error handling: agent gracefully handles invalid XML, unsupported steps with clear messages
  - Reproducible: same Studio XML always generates same Orchestrate flow (deterministic mapping)
  - Transparent: show generated Orchestrate JSON before deployment, user can review/download

SUCCESS CRITERIA (what "done enough to win" looks like in 24h):
  - Demo Studio integration built in Studio Builder (3-5 steps)
  - Agent pipeline working end-to-end: upload XML → deployed Orchestrate in <2 minutes
  - Before/after visual comparison showing complexity reduction
  - Live demo running smoothly (with backup video if needed)
  - Pitch deck complete with 5-minute script rehearsed
  - Deployed Orchestrate visible in hackathon tenant
  - All code on GitHub with runnable README

OUT OF SCOPE (explicitly not doing this in 24h):
  - Complex Studio patterns (stick to retrieve → transform → load)
  - XSL transformation logic conversion (map XSL concept to Orchestrate transform, don't translate XPath)
  - Multi-tenant support (hackathon tenant only)
  - Studio integration testing/validation (assume valid XML input)
  - Orchestrate flow optimization (generate working flow, not optimal flow)
  - UI polish beyond functional demo (focus on agent, not pretty UI)
  - Error recovery workflows (happy path only for demo)
```

---

## Next: Lock THE IDEA, then build

Once THE IDEA block above is filled, restate it back in one paragraph with the thinnest demoable slice and the riskiest unknown — then execute.
