# DevCon 2026 Hackathon — Idea Evaluation Matrix

## Hackathon Constraints (Critical)

✅ **HAVE ACCESS TO:**
- Hackathon tenant with full Workday APIs (REST/SOAP)
- 300+ Workday MCP tools via ASOR
- Extend development environment + WDCLI
- Orchestrate builder
- Prism Analytics
- Workday Data Cloud + Data Lake
- Developer Agent
- A2A/A2UI frameworks
- Agent Passport authentication

❌ **CANNOT USE:**
- Lyft infrastructure (workdaymcp-staging.lyft.net, lyft2 tenant)
- Real Lyft data or production integrations
- Any proprietary Lyft code

⚠️ **MUST COMPLY:**
- Use fake data only (no real PII)
- Must be fully functional at submission
- 24 hours: 2:30 PM June 3 → 1:00 PM June 4
- 5-minute pitch to judges
- Judging: Platform Use (25%) + Innovation (25%) + Business Value (25%) + Wow Factor (25%)

---

## Our Unfair Advantages (Still Valid)

1. **Deep Workday integration domain knowledge** — we know which problems are real pain points
2. **studio-mcp** — 20 tools for parsing/analyzing Studio XML (can run locally against Studio projects)
3. **extend-mcp patterns** — WDCLI wrapper patterns for Extend app dev
4. **Gen UI card rendering** — visual polish for demos
5. **Security/governance instincts** — approval gates, audit trails, data masking patterns

---

## Evaluation Matrix

| Criterion | Weight | Idea 1:<br/>Self-Healing<br/>Integration | Idea 2:<br/>AgentOps<br/>for ASOR | Idea 3:<br/>Extend Build<br/>Copilot | Idea 4:<br/>A2A Process<br/>Orchestrator | Idea 5:<br/>Knowledge-to-<br/>Action | Idea 6:<br/>Studio→Orchestrate<br/>Migration |
|-----------|--------|------------|------------|------------|------------|------------|------------|
| **Platform Use** | 25% | | | | | | |
| Uses new agentic stack (MCP, ASOR, A2A, Developer Agent) | 10 | 7 | 9 | 8 | 9 | 6 | 7 |
| Integrates multiple Workday capabilities | 10 | 6 | 8 | 7 | 8 | 7 | 6 |
| Demonstrates governance/trust (Agent Passport, auth) | 5 | 8 | 9 | 6 | 7 | 5 | 5 |
| **PLATFORM SUBTOTAL** | | **21/25** | **26/25** | **21/25** | **24/25** | **18/25** | **18/25** |
| | | | | | | | |
| **Innovation** | 25% | | | | | | |
| Whitespace / nobody else will build this | 10 | 7 | 9 | 5 | 6 | 3 | 9 |
| Novel technical approach | 8 | 6 | 8 | 5 | 6 | 4 | 7 |
| "Did they make us go oh" factor | 7 | 7 | 6 | 6 | 5 | 4 | 8 |
| **INNOVATION SUBTOTAL** | | **20/25** | **23/25** | **16/25** | **17/25** | **11/25** | **24/25** |
| | | | | | | |
| **Business Value** | 25% | | | | | | |
| Solves a real, recognized pain point | 10 | 9 | 7 | 7 | 7 | 8 | 8 |
| Clear ROI / time saved | 8 | 8 | 6 | 7 | 6 | 6 | 9 |
| Broad applicability (# of companies/users) | 7 | 9 | 8 | 7 | 7 | 9 | 7 |
| **BUSINESS VALUE SUBTOTAL** | | **26/25** | **21/25** | **21/25** | **20/25** | **23/25** | **24/25** |
| | | | | | | |
| **Wow Factor** | 25% | | | | | | |
| Demoable in 5 minutes with clear "before/after" | 10 | 9 | 6 | 8 | 7 | 7 | 9 |
| Visual polish / UI "pop" | 8 | 8 | 7 | 7 | 7 | 8 | 8 |
| "It actually works live" credibility | 7 | 7 | 5 | 7 | 6 | 8 | 6 |
| **WOW FACTOR SUBTOTAL** | | **24/25** | **18/25** | **22/25** | **20/25** | **23/25** | **23/25** |
| | | | | | | |
| **TOTAL SCORE** | **/100** | **91** | **88** | **80** | **81** | **75** | **89** |

---

## Feasibility Assessment (24-Hour Reality Check)

### Idea 1: Self-Healing Integration Reliability Agent
**Score: 91/100** | **Risk: MEDIUM**

**What it is:** Agent monitors Workday integration events, diagnoses failures with LLM, proposes fixes behind approval gate.

**24h Build Path:**
- Hour 0-2: Set up Extend app + ASOR registration with integration monitoring MCP tools
- Hour 2-6: Build polling loop for integration events, detect failures, store state
- Hour 6-12: LLM diagnosis flow (parse error logs, generate root cause + fix proposal)
- Hour 12-18: Gen UI dashboard (integration health cards, diagnosis panel, approve/reject)
- Hour 18-22: One working remediation path (e.g., retry with corrected payload)
- Hour 22-24: Demo script, screen recording, polish

**Technical Unknowns:**
- ✅ **Integration event APIs accessible?** — Yes, REST/SOAP APIs include integration monitoring
- ⚠️ **Can we trigger/launch integrations in hackathon tenant?** — Need to confirm; may need to mock
- ✅ **LLM access for diagnosis?** — Developer Agent includes this

**Reuse from existing work:** ~40% (integration-monitor patterns, Gen UI cards, approval gate patterns)

**Demo Story:** "Integration X fails with cryptic error → agent diagnoses root cause in seconds → proposes fix → user approves → integration succeeds. Saved 2 hours of manual debugging."

---

### Idea 2: AgentOps — Governance & Observability for ASOR Agents
**Score: 88/100** | **Risk: MEDIUM-HIGH**

**What it is:** Agent that watches other agents in ASOR: flags risky, expensive, looping, or misbehaving agents with audit trail.

**24h Build Path:**
- Hour 0-2: ASOR Agent Resource Search API integration
- Hour 2-8: Build agent that polls ASOR for registered agents + their activity
- Hour 8-14: Define "risky" patterns (high token use, infinite loops, permission escalation)
- Hour 14-20: Alerting UI + audit trail dashboard
- Hour 20-24: Demo with 2-3 "bad" demo agents

**Technical Unknowns:**
- ⚠️ **Does ASOR expose agent activity/telemetry APIs?** — Documentation shows discovery, not monitoring. This is a BLOCKER risk.
- ⚠️ **Can we create multiple agents to monitor?** — Need agent registration flow working
- ✅ **LLM for pattern detection?** — Yes, Developer Agent

**Reuse:** ~20% (ASOR API patterns, Gen UI)

**Demo Story:** "Agent A is looping, Agent B is requesting sensitive data outside its scope → AgentOps flags both with root cause → admin reviews audit trail."

**RISK:** If ASOR doesn't expose runtime telemetry, this becomes a speculative vision with mocked data (still interesting but less credible).

---

### Idea 3: Extend Build Copilot
**Score: 80/100** | **Risk: LOW**

**What it is:** Agent that scaffolds, validates, and deploys Extend apps from natural language using extend-mcp patterns.

**24h Build Path:**
- Hour 0-4: Wrap WDCLI commands as MCP tools (or reuse extend-mcp)
- Hour 4-10: Natural language → app spec → scaffold files
- Hour 10-18: Validation + build + deploy flow
- Hour 18-24: Demo UI + screen recording

**Technical Unknowns:**
- ✅ **WDCLI access in hackathon?** — Yes, documented
- ✅ **Extend deployment to hackathon tenant?** — Yes

**Reuse:** ~70% (extend-mcp is already built)

**Demo Story:** "Tell me you want a 'PTO approval dashboard' → agent scaffolds app structure → validates → deploys → shows live app in tenant."

**RISK:** Overlaps with Workday's own Developer Agent for Extend. Judges may see this as duplicative.

---

### Idea 4: A2A Cross-System Process Orchestrator
**Score: 81/100** | **Risk: MEDIUM**

**What it is:** Agent coordinates multi-step process (e.g., onboarding) across Workday + external systems via A2A framework.

**24h Build Path:**
- Hour 0-3: A2A framework setup + external system stub (mock Slack/email/provisioning)
- Hour 3-10: Orchestration flow (Workday onboarding triggers → agent coordinates steps)
- Hour 10-18: Error handling + retry logic
- Hour 18-24: Demo UI + full workflow run

**Technical Unknowns:**
- ⚠️ **A2A framework available in hackathon tenant?** — Documentation mentions it but needs confirmation
- ✅ **External system integration?** — Can mock

**Reuse:** ~30% (Gen UI, orchestration patterns)

**Demo Story:** "New hire starts → agent orchestrates: Workday profile → laptop provisioning → Slack invite → email account → first-day calendar → all automated."

**RISK:** Onboarding is a well-trodden problem. Needs a differentiated angle.

---

### Idea 5: Knowledge-to-Action Assistant
**Score: 75/100** | **Risk: LOW**

**What it is:** Combines Workday Community search (via Coveo) with action MCP tools so agent answers "how do I…" and does it.

**24h Build Path:**
- Hour 0-6: Community MCP integration (or use existing community-mcp)
- Hour 6-14: Action tool wiring (e.g., "how do I approve PTO?" → retrieves doc → executes approval)
- Hour 14-22: Conversational UI
- Hour 22-24: Demo script

**Technical Unknowns:**
- ⚠️ **Community search API access?** — May need authentication; community-mcp uses Playwright workaround
- ✅ **Action MCP tools?** — Yes, 300+ available

**Reuse:** ~50% (community-mcp, Gen UI)

**Demo Story:** "User asks 'How do I submit PTO?' → agent pulls Community article → offers to submit PTO for them → done."

**RISK:** Least differentiated. Many teams will build Q&A + action agents.

---

### Idea 6: Studio-to-Orchestrate Migration Agent
**Score: 89/100** | **Risk: MEDIUM**

**What it is:** Agent reads Studio integration XML, analyzes structure, generates equivalent Orchestrate flow.

**24h Build Path:**
- Hour 0-3: Studio XML parsing via studio-mcp (already built)
- Hour 3-10: Mapping logic (Studio assembly steps → Orchestrate nodes)
- Hour 10-16: Orchestrate flow generation (JSON/YAML spec)
- Hour 16-22: Visual before/after comparison UI
- Hour 22-24: Deploy to Orchestrate (if API accessible) or show generated spec

**Technical Unknowns:**
- ⚠️ **Orchestrate deployment API accessible?** — Documentation shows Orchestrate builder is available, but need to confirm programmatic deployment
- ✅ **Studio XML parsing?** — studio-mcp has this
- ⚠️ **Orchestrate flow schema?** — Need to find/reverse-engineer Orchestrate JSON format

**Reuse:** ~60% (studio-mcp is 100% reusable, Gen UI)

**Demo Story:** "Load a complex Studio integration (800 lines, 12 steps, 3 XSLs) → agent analyzes → generates clean 6-node Orchestrate flow in 90 seconds → deploy or show spec."

**RISK:** Orchestrate flow generation might be complex if schema isn't well-documented. Fallback: generate pseudo-code/diagram instead of deployable flow.

---

## Recommendation Framework

### Best Overall: **Idea 1 — Self-Healing Integration** (91/100)
**Why:** Highest total score. Strong across all criteria. Clear pain point, good 24h scope, max demo impact.

**Pick this if:** You want the safest path to a strong finish. Broad appeal, demos well, real business value.

### Most Innovative: **Idea 6 — Studio→Orchestrate Migration** (89/100, highest innovation score)
**Why:** True whitespace. Nobody has automated this. Shows deep Workday knowledge. studio-mcp is a huge unfair advantage.

**Pick this if:** You want maximum differentiation and have confidence in scoping the conversion mapping tightly (2-3 patterns).

### Dark Horse: **Idea 2 — AgentOps** (88/100)
**Why:** Highest platform use score. Most aligned with "agentic everywhere" theme. Visionary.

**Pick this if:** You can de-risk the ASOR telemetry API availability in the next 2 hours. If blocked, this becomes vaporware.

---

## Team Vote Template

**Instructions:** Each team member ranks their top 3 choices (3 pts, 2 pts, 1 pt). Highest total wins.

| Idea | Team Member 1 | Team Member 2 | Team Member 3 | Team Member 4 | Team Member 5 | TOTAL |
|------|---------------|---------------|---------------|---------------|---------------|-------|
| 1. Self-Healing Integration | | | | | | |
| 2. AgentOps | | | | | | |
| 3. Extend Build Copilot | | | | | | |
| 4. A2A Process Orchestrator | | | | | | |
| 5. Knowledge-to-Action | | | | | | |
| 6. Studio→Orchestrate | | | | | | |

---

## Next Steps (Once Idea is Locked)

1. **Hour 0 (now):** Lock idea via team vote
2. **Hour 0-1:** De-risk #1 unknown (API access, authentication, schema availability)
3. **Hour 1:** Fill CLAUDE.md section 9 with the locked idea
4. **Hour 1+:** Execute build per the 24h timeline
