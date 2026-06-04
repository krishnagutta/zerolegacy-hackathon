# ASOR Agent Research - Career Insights & Growth Assistant

## Executive Summary

**We CAN build this as an ASOR agent.** All components exist and are documented.

## Architecture (Confirmed Viable)

```
Extend App (.app)
├── Custom Agent (.agent file)
│   └── Skills (.agentskills file)
│       ├── Skill 1: analyzeCareerPath
│       ├── Skill 2: findMatchingJobs  
│       └── Skill 3: generateManagerSummary
│
├── A2UI Pages
│   ├── CareerDashboard.page (main view)
│   └── JobMatchResults.page (matches display)
│
└── Tools Used
    ├── Agent-Ready Tools MCP (Workday APIs)
    ├── Orchestrate Actions (if needed)
    └── generate_a2ui (render UI)
```

## How It Works (End-to-End)

### 1. User Flow
```
User opens Workday Chat
  → Types "Show my career insights"
  → Agent activates
  → Agent calls MCP tools (getWorkers, etc.)
  → Agent analyzes with LLM
  → Agent renders A2UI page with results
  → User sees dashboard with insights
```

### 2. Agent Components

**Agent File (.agent)**
- Defines agent name, description, model
- Lists available skills
- Created in App Builder

**Skills File (.agentskills)**
- Each skill = one capability
- Has "allowed-tools" (MCP tools it can use)
- Has "steps" (logic for when/how to use tools)
- Uses YAML frontmatter + markdown

**Example Skill Structure:**
```yaml
---
allowed-tools:
  - agent_ready_tools
  - generate_a2ui
---

# Skill: Analyze Career Path

## When
User asks for career insights or growth analysis

## Steps
1. Use getWorkers to fetch user profile data
2. Use recruiting tools to fetch job postings
3. Analyze skills gap with LLM
4. Render CareerDashboard A2UI page with results
```

### 3. A2UI Pages

**Structure:**
```json
{
  "id": "CareerDashboard",
  "a2ui": true,
  "endPoints": [
    {
      "name": "getCareerData",
      "url": "<url>",
      "authType": "sso"
    }
  ],
  "presentation": {
    "chatCard": {
      "chatText": "Your Career Insights",
      "chatRow": [
        {
          "chatText": "Current Skills: ...",
          "valuePath": "/skills/current"
        }
      ]
    }
  }
}
```

**Chat Tags Available:**
- `chatCard` - container
- `chatText` - display text
- `chatTextField` - input
- `chatButton` - actions
- `chatRow`, `chatColumn` - layout
- `chatHidden` - hidden data
- `chatLoop` - iterate lists

### 4. MCP Tools Discovery

**Option A: MCP Explorer (UI)**
- https://developer.workday.com/mcp-explorer
- Browse 300+ tools by functional area
- Filter: Workforce, Talent, Recruiting

**Option B: Finder API (Programmatic)**
```bash
GET https://us.agent.workday.com/asor/agentResourceSearch/v1
  ?searchString=workers&toolType=AGENT_READY&protocol=MCP
```

**Known Tools (Examples):**
- `getWorkers` - worker profile data
- `getTimeOffEntries` - time off data
- `terminateEmployee` - action example
- 300+ more across Workforce, Talent, Recruiting

**For Career Insights, we need:**
- Worker profile tools (confirmed: `getWorkers`)
- Performance/review tools (TBD - search for "performance", "review", "talent")
- Recruiting tools (TBD - search for "jobs", "recruiting", "positions")
- Learning/training tools (TBD - search for "learning", "training", "courses")

## Deployment Process (8 Steps)

1. **Create Extend App** in App Builder
2. **Add Agent** component → .agent file created
3. **Define Skills** in .agentskills file (manually or via Developer Agent)
4. **Create A2UI Pages** for UI rendering
5. **Save and Deploy** to App Hub
6. **Register in ASOR** (Agent System of Record)
7. **Configure Security** (Available To field)
8. **Activate** agent

## Critical Details & Constraints

### Agent Behavior
- ✅ Runs in **delegate mode** (user's permissions only)
- ✅ **Agent-to-Agent (A2A) ready** by default
- ✅ Can use Workday data to read/write/take actions
- ⚠️ A2UI rendering **ends agent's turn** - hands control to user

### A2UI Constraints
- ✅ Supports forms, cards, lists, buttons
- ⚠️ **PMD tags and chat tags are MUTUALLY EXCLUSIVE** per page
- ⚠️ **No outbound endpoints** - agent handles data operations
- ⚠️ **No built-in validation** - agent must validate
- ⚠️ **No complex date types or currency formatting**
- ⚠️ **No list/array persistence**

### Testing
- ✅ **Play icon** in App Builder for testing
- ✅ **Agent Traces** at bottom of App Builder for debugging
- ✅ Test as authorized user in Workday Chat

## What We Still Need to Discover

### Critical (De-Risk in Hour 0)
1. **Performance/Review MCP Tools**
   - Search MCP Explorer for: "performance", "review", "talent", "goals"
   - Fallback: Use only getWorkers + infer from job history

2. **Recruiting/Jobs MCP Tools**
   - Search for: "recruiting", "jobs", "positions", "requisitions"
   - Fallback: Mock job data

3. **Learning/Training MCP Tools**
   - Search for: "learning", "training", "courses", "development"
   - Fallback: Use external API or mock

4. **Hackathon Tenant Data**
   - Does tenant have realistic worker profiles?
   - Any performance review data?
   - Any job postings?
   - Fallback: Curate demo user with rich data

### Medium Priority
5. **Agent Passport** - how to enable/verify
6. **LLM Access** - which model does agent use? Can we tune prompts?
7. **Agent Actions** - can we expose as Orchestrate agent actions too?

## Build Strategy (18 Hours)

### Minimum Viable Demo (Can build in 12 hours)
**Agent with 1 skill + 1 A2UI page:**
- Skill: "Analyze My Career"
- Uses: getWorkers only
- LLM infers skills from job title/description
- A2UI shows: Current skills, 3 gaps, 3 recommendations
- NO job matching, NO manager summary
- **100% buildable even if other MCP tools don't exist**

### Full Demo (If MCP tools exist - 18 hours)
**Agent with 3 skills + 2 A2UI pages:**
- Skill 1: "Analyze Career Path" → CareerDashboard page
- Skill 2: "Find Matching Jobs" → JobMatches page  
- Skill 3: "Generate Manager Summary" → ManagerView page
- Uses: getWorkers + performance + recruiting + learning tools
- **Requires tools to exist**

### Recommended Approach
**Start with MVD, expand if tools exist:**
1. Hour 0-1: Discover MCP tools
2. Hour 1-2: Build MVD agent (1 skill, getWorkers only)
3. Hour 2-3: Test MVD end-to-end
4. Hour 3-8: Expand IF tools exist, else polish MVD
5. Hour 8-14: A2UI pages + polish
6. Hour 14-18: Demo prep

## Tools/Resources URLs

- **MCP Explorer:** https://developer.workday.com/mcp-explorer
- **Finder API:** https://us.agent.workday.com/asor/agentResourceSearch/v1
- **Hackathon Repo:** https://github.com/Workday/2026-DevCon-Hackathon
- **ASOR Docs:** `/docs/agentic/` in repo
- **A2UI Docs:** `/docs/extend/a2ui/` in repo

## Next Steps (Immediate)

1. **Login to hackathon tenant:** `wcpdev.wd101.myworkday.com/hack04_wcpdev1`
2. **Open MCP Explorer** (or use Finder API)
3. **Search for tools:**
   - "workers" → confirm getWorkers
   - "performance" → check for review/talent tools
   - "recruiting" → check for job posting tools
   - "learning" → check for training tools
4. **Document findings** → adjust build plan
5. **Start building** Agent skeleton (Hour 1)

## Confidence Level

**Can we build this? YES - 95% confident**

**Will it be impressive? YES - 90% platform use score**

**Biggest risk? Data availability (performance/jobs)** 
- Mitigation: MVD works with getWorkers alone

**Timeline? Tight but achievable**
- 18 hours, need disciplined execution
