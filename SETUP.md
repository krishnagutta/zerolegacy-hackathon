# Setup Checklist

## ✅ Completed

- [x] Git repo initialized and first commit
- [x] `.gitignore` configured (secrets, build artifacts)
- [x] `.env` file with tenant credentials (gitignored)
- [x] `CLAUDE.md` operating brief
- [x] `IDEA-EVALUATION.md` scoring matrix
- [x] `README.md` with team and tech stack
- [x] `DEMO.md` placeholder
- [x] Basic project structure (`src/`, `docs/`, `assets/`)
- [x] Slack channel active (#zerolegacy)
- [x] 6 initial ideas posted for team vote

## 🔄 In Progress

- [ ] Team voting on ideas in Slack
- [ ] Gather additional ideas from team members

## ⏳ Next (Once Idea is Locked)

- [ ] Fill `CLAUDE.md` section 9 with locked idea
- [ ] De-risk #1 technical unknown
- [ ] Set up development environment based on idea
  - [ ] Install required tools (WDCLI, Node/Python, etc.)
  - [ ] Configure tenant access
  - [ ] Test MCP tool connectivity
  - [ ] Verify Extend/Orchestrate access
- [ ] Create initial app scaffold in `src/`
- [ ] Define first milestone
- [ ] Start Hour 1-4: Build thinnest end-to-end slice

## 🔐 Credentials Access

All credentials are in `.env` file (gitignored). Key info:
- Workday tenant: Check `.env` for URL and user
- AWS Workshop: Check `.env` for access link
- Slack: #zerolegacy (C0B8EHD8LU8)

## 🛠️ Required Tools (Install as needed based on idea)

### All Ideas
- [ ] Git
- [ ] Code editor (VS Code, Claude Code)
- [ ] Browser with DevTools

### If Building Extend App
- [ ] Node.js 18+ and npm
- [ ] WDCLI (`npm install -g @workday/canvas-cli`)
- [ ] Workday Developer Site access

### If Building with Python
- [ ] Python 3.11+
- [ ] pip and venv

### If Using MCP Tools
- [ ] MCP Explorer access
- [ ] OAuth tokens configured

### If Using Orchestrate
- [ ] Orchestrate builder access in tenant
- [ ] Pipedream account (if needed for connectors)

## 📋 Verification Commands

```bash
# Check git status
git status

# Check Node/npm (if needed)
node --version
npm --version

# Check Python (if needed)
python3 --version

# Check WDCLI (if needed)
wdc --version

# Verify tenant access
# Open browser: $(cat .env | grep WORKDAY_TENANT_URL | cut -d'=' -f2)
```

## 🚨 Troubleshooting

### Can't access tenant
- Check `.env` for correct URL and credentials
- Try incognito/private browser window
- Clear browser cache/cookies

### WDCLI not working
- Reinstall: `npm install -g @workday/canvas-cli`
- Check authentication: `wdc auth login`

### MCP tools not accessible
- Verify OAuth token is valid
- Check ASOR registration
- Try MCP Explorer to test connectivity

## 📝 Notes

- **NO Lyft data or tools** — everything must work with hackathon tenant only
- Commit frequently in runnable states
- Update `DEMO.md` as features land
- Capture screen recordings throughout build (not just at the end)
