# Workday DevCon 2026 Platform Insights

> Key learnings from the official hackathon repo to inform our build

## 🆕 What's Brand New (Just Released)

### 1. Orchestrate Agent Actions (🔥 HOT)
**What:** Orchestrations can now be exposed as MCP tools that AI agents can call directly via natural language.

**How to Enable:**
- Check "Enable as Agent Action" on the Start step
- Provide clear Action Name + Description (include use cases)
- Select effect annotation:
  - `Destructive` → agents request confirmation
  - `Read-Only` → no confirmation needed
  - `Idempotent` → safe to retry
- **CRITICAL:** All input/output params need descriptions (empty descriptions degrade agent performance)
- Only flat JSON schemas (no nested structures)
- Remove unused header/query param rows before saving

**Endpoint:** `POST https://api.[region].wcp.workday.com/orchestrate/v1/apps/[appId]/mcp`

**Auth:** Bearer token (expires in ~1 hour, must refresh)

**Impact on Our Ideas:**
- Self-Healing Integration: Could use Orchestrate agent actions to trigger remediations
- A2A Orchestrator: Orchestrate is the backbone for cross-system coordination
- AgentOps: Could monitor Orchestrate agent action usage

---

### 2. Extend AI Widgets
**What:** Native AI capabilities embedded in rich text fields—add generative AI to apps via metadata config (no infrastructure).

**Constraints:**
- Max 3 AI widgets per app
- Max 2 prompt buttons per widget
- Prompts + variable values ≤ 1,000 chars

**Use Cases:** Draft job descriptions, condense content, auto-generate text based on form data

**Impact on Our Ideas:**
- Extend Build Copilot: Could use AI widgets to generate form content
- Knowledge-to-Action: Could combine with AI widgets for smart suggestions

---

### 3. Local Disk Sync (Dev Experience)
**What:** WDCLI now supports local file system sync for version control integration

**Impact:** Makes Extend development much faster—edit files locally, auto-sync to tenant

---

### 4. Orchestrate: Wait for Long-Running APIs
**What:** New capability to handle REST APIs with extended timeouts (up to 1 hour REST, 6 hours SOAP)

**Impact on Our Ideas:**
- Self-Healing Integration: Integration retries might need this
- A2A Orchestrator: Multi-step processes can now handle slow external APIs

---

## 🛠️ MCP Tools Deep Dive

### Available Tools
- **300+ Workday MCP tools** via ASOR
- Covers: Workforce, Financials, Talent, Payroll, Recruiting
- Examples: `getTimeOffEntries`, `getWorkers`, `terminateEmployee`

### Discovery Methods
1. **MCP Explorer:** https://developer.workday.com/mcp-explorer (browse by functional area)
2. **Finder API:** `GET https://us.agent.workday.com/asor/agentResourceSearch/v1?searchString=...`

### Auth (ASU Flow)
1. **Registration:** Bearer token from Developer Site or tenant OAuth
2. **Runtime:** Obtain auth code → exchange for access token
3. **Lifecycle:** Access tokens expire after 60 min, refresh tokens after 24 hours

### Security Model
- **Delegate mode:** Tool calls execute under end user's identity
- Users cannot access data beyond their permissions
- Agent cannot bypass security controls

### Testing Connectivity
```bash
curl --request POST \
  --url https://us.agent.workday.com/mcp \
  --header 'Authorization: Bearer <ASU token>' \
  --data '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}'
```

**Impact on Our Ideas:**
- ALL ideas benefit from MCP tools
- AgentOps: Can use Finder API to discover registered agents
- Self-Healing Integration: MCP tools for integration monitoring
- Knowledge-to-Action: 300+ action tools available

---

## 🤖 Developer Agent Best Practices

### Effective Prompt Patterns
**Good prompts include:**
- Clear functional requirements (who does what)
- Data structures (fields, related lists)
- User roles and permissions
- Business logic/validation steps

**Examples of what Developer Agent can generate:**
- PMDs (lists, details, wizards, dashboards)
- Business objects with fields + attachments
- Validation + dynamic filter scripts
- WQL endpoints + GraphQL queries
- Security domains + role-based visibility
- Whole apps (training mgmt, peer recognition, safety incidents, vendor onboarding)

**Debugging Capabilities:**
- Blank preview screens
- Runtime errors
- WQL endpoint failures
- Data flow tracing (non-populating dropdowns)
- GraphQL null values
- Security misconfigurations

**Impact on Our Ideas:**
- Extend Build Copilot: Developer Agent is our competition—we need differentiation
- Studio→Orchestrate: Developer Agent doesn't handle Studio XML yet—whitespace!

---

## 📬 Communications REST API

### Capabilities
- Create external recipients with contact methods (email only currently)
- OTP-based email verification (4-step flow)
- Send high-priority transactional emails
- Search/audit recipient database

### Email Verification Flow
1. Create external recipient + email contact
2. Initiate OTP verification (system sends 6-digit code)
3. Confirm contact with OTP
4. Send verified emails (optional `transactional: true` flag)

### Constraints
- Email only (no SMS/other channels yet)
- Names: 40 chars max
- Subject: 255 chars max
- Body: 65,535 chars max
- No PATCH/DELETE ops yet

**Impact on Our Ideas:**
- A2A Orchestrator: Could use for onboarding notification flow
- Self-Healing Integration: Could send alerts via Communications API
- AgentOps: Could notify admins of agent violations

---

## ☁️ Data Cloud Access

### What's Available
- **Snowflake tenant** (available through June 20)
  - Register with team email at provided link
  - Receive credentials + temp password
- **Salesforce Data Cloud** (available through June 5)
  - Get credentials from facilitator
  - Login → App Selector → "Data Cloud"

### Important
⚠️ **Limited availability** → record videos ASAP if using external data sources

**Impact on Our Ideas:**
- Lower priority (our ideas don't require external data)
- Could enhance A2A Orchestrator with Salesforce integration

---

## 🎯 Key Constraints to Remember

### From Official Rules
- Must use **fake data only** (no real PII)
- Must use **public Workday APIs only**
- Exclusively **original work** developed during event
- No third-party proprietary code
- Must be **fully functional** at submission

### Technical Limits
- OAuth tokens expire (60 min access, 24h refresh)
- AI widgets: max 3 per app, 2 prompts each
- Orchestrate agent actions: flat JSON only
- Communications API: email only

### Team Requirements
- **At least 2 in-person participants** required to win prizes

---

## 🚀 Express Labs (Guided Tutorials)

Available guided activities:
1. **Build Agents with Extend** (5 modules)
2. **Analyze with Data Cloud**
3. **Integrate with Orchestrate**
4. **Agentic with AWS**

**Note:** Labs are PDFs in the repo—can reference during build if stuck.

---

## 💡 Implications for Our Ideas

### Self-Healing Integration (Idea 1)
✅ **Strengths:**
- MCP tools for integration monitoring
- Orchestrate agent actions for remediation triggers
- Communications API for alerting

⚠️ **Watch out for:**
- Need to confirm integration monitoring APIs in hackathon tenant
- Mock launch capabilities if restricted

---

### Studio→Orchestrate Migration (Idea 6)
✅ **Strengths:**
- TRUE WHITESPACE—Developer Agent doesn't handle Studio XML yet
- We have studio-mcp already built
- Orchestrate agent actions make the output immediately agentic

⚠️ **Watch out for:**
- Need to understand Orchestrate flow schema (flat JSON constraint)
- May need to reverse-engineer Orchestrate JSON format

---

### AgentOps (Idea 2)
✅ **Strengths:**
- ASOR Finder API for agent discovery
- MCP tools list for agent capabilities
- Perfect timing with "agentic everywhere" theme

⚠️ **Watch out for:**
- **BLOCKER RISK:** ASOR API only shows discovery, not runtime telemetry
- May need to mock agent activity if monitoring APIs don't exist

---

### Extend Build Copilot (Idea 3)
⚠️ **Competition:**
- Developer Agent already does this
- Local Disk Sync just made Extend dev easier
- Judges may see as duplicative

✅ **Differentiation needed:**
- Focus on patterns Developer Agent doesn't handle?
- Add governance/testing/deployment gates?

---

### A2A Orchestrator (Idea 4)
✅ **Strengths:**
- Orchestrate agent actions are perfect for this
- Communications API for notifications
- Long-running API support

⚠️ **Watch out for:**
- Onboarding is well-trodden—need fresh angle

---

### Knowledge-to-Action (Idea 5)
✅ **Strengths:**
- 300+ MCP action tools
- AI widgets could enhance suggestions

⚠️ **Watch out for:**
- Least differentiated—many teams will build Q&A agents

---

## 🎬 Next Steps

Once idea is locked:
1. **De-risk #1 unknown** (API access, auth, schema)
2. **Review relevant docs** from repo (Orchestrate/MCP/Extend)
3. **Set up tenant access** and test connectivity
4. **Start thinnest slice**
