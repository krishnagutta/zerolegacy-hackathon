# Requirements Map — Career Insights & Growth Assistant

## Idea Summary (One Sentence)
An ASOR-native agent that analyzes employee career trajectories using Workday data, identifies skill gaps, recommends internal growth opportunities, and generates manager-ready development summaries—all through natural conversation in Workday Chat.

## Demo Flow (What Judges Will See)

### Scene 1: Employee Self-Service (2 minutes)
```
1. Open Workday Chat → Type "Show my career insights"
2. Agent activates → Shows typing indicator
3. Agent renders CareerDashboard A2UI page with:
   - Current role & tenure visualization
   - Identified skills from job history (5-7 skills)
   - Skill gaps for growth (3-4 gaps with explanations)
   - Recommended next roles (3 internal positions with match %)
   - Learning resources for each gap
4. User clicks "Find Matching Jobs" button
5. Agent renders JobMatches page with:
   - 3-5 real job postings from tenant
   - Match score breakdown (skills match, location, level)
   - "Apply Now" buttons (linked to real requisitions)
```

### Scene 2: Manager View (1 minute)
```
1. Type "Generate development summary for [direct report]"
2. Agent renders ManagerSummary page with:
   - Direct report's career trajectory chart
   - Skill strengths vs gaps
   - Recommended development actions
   - Suggested job rotations or projects
   - "Download PDF" button
```

### Scene 3: Trustworthy AI (30 seconds)
```
Show on screen:
- "All data accessed via user's own permissions (delegate mode)"
- "No data leaves Workday—agent uses Workday MCP tools only"
- "Agent actions logged in ASOR for governance"
- Console shows MCP tool calls (getWorkers, searchJobs, etc.)
```

**Total Demo: 3.5 minutes**  
**Wow Moment:** Agent generates insights in 10 seconds that would take HR analysts 2-3 hours manually

## Technical Components

### 1. ASOR Agent Structure

**File: CareerInsightsAgent.agent**
```yaml
name: Career Insights & Growth Assistant
description: AI-powered career development advisor using live Workday data
capabilities:
  - Analyze career trajectories
  - Identify skill gaps
  - Recommend internal opportunities
  - Generate manager summaries
delegate_mode: true
agent_passport_verified: true (if available)
```

**File: CareerInsightsAgent.agentskills**

#### Skill 1: analyzeCareerPath
```yaml
---
allowed-tools:
  - agent_ready_tools  # MCP tools
  - generate_a2ui      # Render UI
---

# Skill: Analyze Career Path

## When
User asks for career insights, growth analysis, development plan, or "show my career"

## Steps
1. Call getWorkers(userId) → fetch worker profile, job history, current role
2. Extract skills from job titles + descriptions (LLM inference)
3. Identify skill gaps based on industry trends + next-level roles
4. Call searchJobs() → find internal positions matching growth trajectory
5. Render CareerDashboard A2UI page with results
```

#### Skill 2: findMatchingJobs (Optional - Full Demo Only)
```yaml
---
allowed-tools:
  - agent_ready_tools
  - generate_a2ui
---

# Skill: Find Matching Jobs

## When
User clicks "Find Jobs" or asks "what jobs match my skills"

## Steps
1. Get user's skills from previous analysis (or re-fetch)
2. Call searchRequisitions(skills, location) → fetch open positions
3. Calculate match scores (skills overlap + role level + location)
4. Render JobMatches A2UI page with ranked results
```

#### Skill 3: generateManagerSummary (Optional - Full Demo Only)
```yaml
---
allowed-tools:
  - agent_ready_tools
  - generate_a2ui
---

# Skill: Generate Manager Summary

## When
Manager asks "development summary for [direct report]" or "career plan for [name]"

## Steps
1. Verify user has manager access to target employee
2. Call getWorkers(employeeId) → fetch profile + history
3. Call getPerformanceReviews(employeeId) → fetch reviews if available
4. Generate summary with LLM (strengths, gaps, recommendations)
5. Render ManagerSummary A2UI page
```

### 2. A2UI Pages

**Page 1: CareerDashboard.page (Critical Path)**
```json
{
  "id": "CareerDashboard",
  "a2ui": true,
  "presentation": {
    "chatCard": {
      "chatText": "🎯 Your Career Insights",
      "chatRow": [
        {
          "chatColumn": [
            {"chatText": "Current Role", "style": "label"},
            {"chatText": "{currentRole}", "valuePath": "/profile/jobTitle"}
          ]
        },
        {
          "chatColumn": [
            {"chatText": "Tenure", "style": "label"},
            {"chatText": "{tenure}", "valuePath": "/profile/tenure"}
          ]
        }
      ],
      "chatRow": [
        {"chatText": "✅ Your Skills", "style": "header"},
        {
          "chatLoop": {
            "valuePath": "/analysis/currentSkills",
            "chatText": "• {skill}"
          }
        }
      ],
      "chatRow": [
        {"chatText": "🎓 Growth Opportunities", "style": "header"},
        {
          "chatLoop": {
            "valuePath": "/analysis/skillGaps",
            "chatCard": {
              "chatText": "Gap: {gapName}",
              "chatText": "Why: {explanation}",
              "chatText": "Learn: {resource}"
            }
          }
        }
      ],
      "chatRow": [
        {"chatText": "🚀 Recommended Roles", "style": "header"},
        {
          "chatLoop": {
            "valuePath": "/analysis/recommendedRoles",
            "chatCard": {
              "chatText": "{jobTitle} - {matchPercent}% match",
              "chatText": "{department} • {location}",
              "chatButton": {
                "label": "View Details",
                "action": "viewJob",
                "value": "{requisitionId}"
              }
            }
          }
        }
      ],
      "chatButton": {
        "label": "Find Matching Jobs",
        "action": "findJobs"
      }
    }
  }
}
```

**Page 2: JobMatches.page (Optional - Full Demo)**
- Loop through requisitions with match scores
- "Apply Now" buttons per job

**Page 3: ManagerSummary.page (Optional - Full Demo)**
- Career trajectory chart
- Strengths/gaps summary
- Development recommendations

### 3. MCP Tools Required

**Critical (MVD - Must Have):**
- ✅ `getWorkers` — Fetch worker profile, job history, current role
  - **Fallback:** None needed, this is confirmed to exist

**High Value (Full Demo - Should Have):**
- ❓ `searchRequisitions` or `getJobPostings` — Fetch open positions
  - **Fallback:** Mock 3-5 realistic job postings in demo tenant
  - **Search terms:** "requisition", "recruiting", "jobs", "positions"
  
- ❓ `getPerformanceReviews` or `getTalentData` — Fetch review history
  - **Fallback:** Infer performance from tenure + job progression
  - **Search terms:** "performance", "review", "talent", "goals"

**Nice to Have (Full Demo - Could Have):**
- ❓ `getLearningCourses` or `getTrainingData` — Fetch learning resources
  - **Fallback:** Link to generic Workday Learning URLs
  - **Search terms:** "learning", "training", "courses", "development"

- ❓ `getSkillsProfile` — Structured skills data
  - **Fallback:** LLM extracts skills from job titles/descriptions
  - **Search terms:** "skills", "competencies", "profile"

**Out of Scope:**
- ❌ External job boards (LinkedIn, Indeed) — stay within Workday
- ❌ Real-time salary data — too sensitive for hackathon demo
- ❌ Interview scheduling — too complex for 18 hours

### 4. Data Requirements

**Minimum (MVD):**
- 1 demo worker with:
  - Current job title + description
  - 2-3 previous jobs in history (shows progression)
  - Manager relationship
  - Location + department

**Ideal (Full Demo):**
- 3-5 demo workers with varied career paths
- 5-10 open job requisitions in tenant
- 1-2 performance review records per worker
- Learning course catalog (even if stubbed)

**Data Seeding Strategy:**
1. Hour 0: Check what exists in `hack04_wcpdev1` tenant
2. If sparse: Use WDCLI or UI to create demo data
3. If blocked: Curate 1 rich demo worker + mock the rest

### 5. ASOR Configuration

**Agent Registration:**
- Name: "Career Insights & Growth Assistant"
- Available To: "All Workers" or "Hackathon Judges Group"
- Status: Active
- Delegate Mode: Enabled (user permissions only)
- Agent Passport: Request verification (if available)

**Security Model:**
- Runs as authenticated user (SSO via Workday Chat)
- No elevated permissions—sees only what user can see
- Manager queries verify manager relationship before showing direct report data
- No PII logged in agent traces

### 6. Build Phases (18 Hours)

#### Phase 0: Discovery & De-Risk (Hour 0-1)
- [ ] Login to tenant: `wcpdev.wd101.myworkday.com/hack04_wcpdev1`
- [ ] Search MCP Explorer for tools (workers, performance, recruiting, learning)
- [ ] Document what tools exist → adjust plan
- [ ] Check tenant data (workers, jobs, reviews)
- [ ] Decision: MVD vs Full Demo path

#### Phase 1: MVD - Core Agent (Hour 1-4)
- [ ] Create Extend app "CareerInsightsApp"
- [ ] Add Agent component
- [ ] Define Skill 1: analyzeCareerPath (uses getWorkers only)
- [ ] LLM infers skills from job titles
- [ ] Mock skill gaps + recommendations (3 each)
- [ ] Test in App Builder Play mode
- [ ] **Milestone:** Agent responds to "show my career insights"

#### Phase 2: MVD - A2UI (Hour 4-8)
- [ ] Create CareerDashboard.page
- [ ] Wire valuePath to agent response data
- [ ] Add current role, tenure, skills, gaps sections
- [ ] Add mock recommended roles (3 jobs)
- [ ] Test rendering in Workday Chat
- [ ] **Milestone:** Full MVD demo works end-to-end

#### Phase 3: Expand (Hour 8-12) — IF TOOLS EXIST
- [ ] Add Skill 2: findMatchingJobs
- [ ] Integrate searchRequisitions MCP tool
- [ ] Create JobMatches A2UI page
- [ ] Add Skill 3: generateManagerSummary
- [ ] Integrate getPerformanceReviews MCP tool
- [ ] Create ManagerSummary A2UI page
- [ ] **Milestone:** Full demo with real job matching

#### Phase 4: Polish & Governance (Hour 12-16)
- [ ] Deploy to App Hub
- [ ] Register in ASOR
- [ ] Configure security groups
- [ ] Activate agent
- [ ] Add console logging for MCP tool calls (show on screen)
- [ ] Test as judge/demo user
- [ ] Add "trustworthy AI" messaging to UI
- [ ] Capture clean screen recordings

#### Phase 5: Demo Prep (Hour 16-18)
- [ ] Rehearse 3.5-min pitch 3x
- [ ] Create backup video (in case live demo fails)
- [ ] Test on fresh browser session (simulate judge view)
- [ ] Prepare fallback slides
- [ ] Document demo clicks in DEMO.md
- [ ] Team review + final fixes

### 7. Success Criteria

**Must Have (MVD Minimum):**
- ✅ Agent responds in Workday Chat
- ✅ Uses getWorkers MCP tool (show in console)
- ✅ Renders A2UI page with career insights
- ✅ Shows skills, gaps, recommendations
- ✅ Delegate mode visible/documented
- ✅ Demo runs in <2 minutes

**Should Have (Full Demo):**
- ✅ Real job matching with searchRequisitions tool
- ✅ Manager summary generation
- ✅ Multiple A2UI pages with navigation
- ✅ "Apply Now" buttons linked to real requisitions
- ✅ Agent Passport verification shown

**Could Have (Stretch):**
- ✅ Learning resource recommendations
- ✅ Career trajectory visualization (chart)
- ✅ PDF export for manager summaries
- ✅ Agent-to-agent handoff demo

### 8. Judging Criteria Alignment

| Criterion | Score Target | How We Hit It |
|-----------|-------------|---------------|
| **Platform Use (25%)** | 23-25 / 25 | Uses ASOR, MCP tools, A2UI, delegate mode, Agent Passport |
| **Innovation (25%)** | 20-22 / 25 | First agent to do career analysis in Workday Chat natively |
| **Business Value (25%)** | 22-24 / 25 | Solves real pain: career development takes 2-3 hours manually, agent does it in 10 seconds |
| **Wow Factor (25%)** | 21-23 / 25 | Live agent in Workday Chat, visual A2UI cards, instant insights, manager summary generation |
| **Total** | **86-94 / 100** | Strong podium contender |

### 9. Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| MCP tools don't exist | Medium | High | MVD works with getWorkers only—mock the rest |
| Tenant has no data | Low | Medium | Seed 1-3 demo workers via WDCLI/UI in Hour 0 |
| A2UI rendering breaks | Low | High | Build backup static UI page; capture video early |
| ASOR registration fails | Low | Medium | Test in App Builder Play mode—still works, just not in official registry |
| Time runs out | Medium | High | Feature freeze at Hour 16—polish only, no new code |

### 10. Team Task Breakdown

**Track A: Agent Logic (2 people, Hour 1-8)**
- Build .agent + .agentskills files
- Implement Skill 1 (analyzeCareerPath)
- Test MCP tool integration
- Expand to Skills 2-3 if tools exist

**Track B: A2UI Pages (2 people, Hour 4-12)**
- Build CareerDashboard.page
- Wire valuePath mappings
- Add JobMatches + ManagerSummary pages
- Polish visual layout

**Track C: Data + Infrastructure (1 person, Hour 0-4)**
- Discover MCP tools
- Seed demo data in tenant
- Set up ASOR registration
- Test agent deployment

**Track D: Demo + Documentation (1 person, Hour 12-18)**
- Write DEMO.md script
- Capture screen recordings
- Build pitch deck
- Rehearse with team

### 11. Definition of Done

**Agent is DONE when:**
- ✅ Responds to "show my career insights" in Workday Chat
- ✅ Calls at least 1 MCP tool (getWorkers)
- ✅ Renders A2UI page with insights
- ✅ Runs under user's permissions (delegate mode)
- ✅ Registered in ASOR (or tested in Play mode)

**Demo is DONE when:**
- ✅ 3.5-minute flow rehearsed 3x
- ✅ Backup video captured
- ✅ Pitch deck complete
- ✅ DEMO.md script documented
- ✅ Governance story visible on screen

**We WIN when:**
- ✅ Demo runs smoothly (no crashes)
- ✅ Judges say "wow, that's actually useful"
- ✅ Platform score: 23-25 / 25
- ✅ Total score: 86-94 / 100

---

## Next Action: Hour 0 Discovery

**Immediate next step:**
```bash
# 1. Login to tenant
open "https://wcpdev.wd101.myworkday.com/hack04_wcpdev1"
# User: lmcneil (from .env)

# 2. Search MCP tools
open "https://developer.workday.com/mcp-explorer"
# Search: workers, performance, recruiting, learning

# 3. Document findings
# Update this file with tool availability

# 4. Go/No-Go decision
# MVD path: getWorkers only (12 hours)
# Full path: getWorkers + recruiting + performance (18 hours)
```

**Decision point: End of Hour 0**  
Team lead calls MVD vs Full Demo based on tool discovery.
