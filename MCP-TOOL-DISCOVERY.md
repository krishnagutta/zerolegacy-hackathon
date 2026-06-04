# MCP Tool Discovery — Hour 0 Research

**Status:** 🔴 IN PROGRESS  
**Started:** 2026-06-03 (Hackathon Day 1)  
**URL:** https://developer.workday.com/mcp-explorer

## Discovery Instructions

Browse the MCP Explorer and search for these tool categories. For each tool found, fill in the template below.

---

## 1. Worker/Employee Data Tools

**Search terms:** workers, employee, profile, workforce

### ✅ Tool: getWorkers
- **WID:** [copy from explorer]
- **Category:** [Workforce / HCM / etc.]
- **Agent-Ready:** Yes / No
- **Operations:** VIEW / CREATE / PATCH
- **Description:** [paste from explorer]
- **Input Parameters:** [what does it need?]
- **Output Data:** [what does it return?]
- **Use in Demo:** ✅ CRITICAL — MVD foundation, fetches worker profile + job history

### Tool: getWorkerProfile
- **Status:** ❓ Search in explorer
- **If Found:** Same template as above
- **If Not Found:** ❌ Not available

### Tool: getEmployeeData
- **Status:** ❓ Search in explorer

### Tool: [Other worker tools you find]
- [Fill in template]

---

## 2. Performance/Talent Tools

**Search terms:** performance, review, talent, goals, appraisal

### Tool: getPerformanceReviews
- **Status:** ❓ Search in explorer
- **If Found:** 
  - **WID:**
  - **Category:**
  - **Agent-Ready:** 
  - **Description:**
  - **Use in Demo:** 🟡 HIGH VALUE — manager summary feature

### Tool: getGoals
- **Status:** ❓ Search in explorer

### Tool: getTalentProfile
- **Status:** ❓ Search in explorer

### Tool: [Other performance tools]
- [Fill in]

**Decision Impact:**
- ✅ IF performance tools exist → Full Demo with manager summaries
- ❌ IF NOT → Infer performance from job progression (fallback)

---

## 3. Recruiting/Jobs Tools

**Search terms:** recruiting, jobs, requisitions, positions, openings

### Tool: searchRequisitions
- **Status:** ❓ Search in explorer
- **If Found:**
  - **WID:**
  - **Category:**
  - **Agent-Ready:**
  - **Description:**
  - **Search Parameters:** [skills, location, level?]
  - **Returns:** [job title, description, requirements?]
  - **Use in Demo:** 🟡 HIGH VALUE — job matching feature

### Tool: getJobPostings
- **Status:** ❓ Search in explorer

### Tool: searchJobs
- **Status:** ❓ Search in explorer

### Tool: getOpenPositions
- **Status:** ❓ Search in explorer

### Tool: [Other recruiting tools]
- [Fill in]

**Decision Impact:**
- ✅ IF recruiting tools exist → Full Demo with real job matching
- ❌ IF NOT → Mock 3-5 job postings (fallback)

---

## 4. Learning/Training Tools

**Search terms:** learning, training, courses, development, education

### Tool: getLearningCourses
- **Status:** ❓ Search in explorer
- **Use in Demo:** 🟢 NICE TO HAVE — learning resource recommendations

### Tool: getTrainingCatalog
- **Status:** ❓ Search in explorer

### Tool: getDevelopmentPlans
- **Status:** ❓ Search in explorer

### Tool: [Other learning tools]
- [Fill in]

**Decision Impact:**
- ✅ IF learning tools exist → Add learning recommendations to UI
- ❌ IF NOT → Link to generic Workday Learning URLs (fallback)

---

## 5. Skills/Competencies Tools

**Search terms:** skills, competencies, capabilities, qualifications

### Tool: getSkillsProfile
- **Status:** ❓ Search in explorer
- **Use in Demo:** 🟢 NICE TO HAVE — structured skills data

### Tool: getCompetencies
- **Status:** ❓ Search in explorer

### Tool: [Other skills tools]
- [Fill in]

**Decision Impact:**
- ✅ IF skills tools exist → Use structured skills data
- ❌ IF NOT → LLM extracts skills from job titles/descriptions (fallback)

---

## 6. Organization/Manager Tools

**Search terms:** manager, organization, org chart, hierarchy, direct reports

### Tool: getManager
- **Status:** ❓ Search in explorer
- **Use in Demo:** 🟡 HIGH VALUE — manager relationship for Skill 3

### Tool: getDirectReports
- **Status:** ❓ Search in explorer
- **Use in Demo:** 🟡 HIGH VALUE — manager summary feature

### Tool: getOrgChart
- **Status:** ❓ Search in explorer

### Tool: [Other org tools]
- [Fill in]

---

## 7. Other Interesting Tools

**Anything else that looks useful for career insights:**

### Tool: [Name]
- **Category:**
- **Description:**
- **Potential Use:**

---

## Discovery Summary (Fill After Search)

### Confirmed Available (✅)
- [ ] getWorkers or equivalent (CRITICAL)
- [ ] Performance/review tools (HIGH VALUE)
- [ ] Recruiting/jobs tools (HIGH VALUE)
- [ ] Learning/training tools (NICE TO HAVE)
- [ ] Skills/competencies tools (NICE TO HAVE)
- [ ] Manager/org tools (HIGH VALUE)

### Total Tools Found: [count]

### Critical Gaps (❌)
- [List any critical tools that don't exist]

---

## Build Path Decision

**Based on tool discovery, our build path is:**

### Option A: Minimum Viable Demo (MVD)
**IF only getWorkers exists:**
- 1 skill: analyzeCareerPath
- 1 A2UI page: CareerDashboard
- Uses: getWorkers + LLM inference
- Mock: skill gaps, job recommendations, learning resources
- **Build Time:** 12 hours
- **Polish Time:** 6 hours
- **Confidence:** 95%

### Option B: Full Demo — Job Matching
**IF getWorkers + recruiting tools exist:**
- 2 skills: analyzeCareerPath + findMatchingJobs
- 2 A2UI pages: CareerDashboard + JobMatches
- Uses: getWorkers + searchRequisitions
- Mock: performance data, learning resources
- **Build Time:** 16 hours
- **Polish Time:** 2 hours
- **Confidence:** 85%

### Option C: Full Demo — Complete
**IF getWorkers + recruiting + performance + learning tools exist:**
- 3 skills: analyzeCareerPath + findMatchingJobs + generateManagerSummary
- 3 A2UI pages: CareerDashboard + JobMatches + ManagerSummary
- Uses: All discovered MCP tools
- Mock: Nothing (all real data)
- **Build Time:** 18 hours
- **Polish Time:** 0 hours (risky)
- **Confidence:** 70%

### Recommended Path: [Fill after discovery]
- [ ] Option A (MVD — safest)
- [ ] Option B (Job Matching — balanced)
- [ ] Option C (Complete — ambitious)

**Reasoning:** [Explain based on tools found + team confidence + time constraints]

---

## Next Steps After Discovery

1. **Update REQUIREMENTS-MAP.md** with actual tool names
2. **Update CLAUDE.md Section 9** with final locked idea
3. **Post to Slack:** Tool discovery results + chosen build path
4. **Start Hour 1:** Create Extend app + Agent skeleton

---

## Notes & Observations

[Add any notes while browsing MCP Explorer:]
- Tool naming conventions observed: [pattern]
- Functional areas with most tools: [list]
- Surprising tools found: [list]
- Tools we expected but didn't find: [list]
- MCP Explorer UX notes: [filters, search, categories, etc.]
