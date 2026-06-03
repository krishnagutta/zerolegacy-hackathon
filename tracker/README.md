# Task Tracker

Live dashboard for tracking DevCon 2026 Hackathon task progress.

## Quick Start

### Option 1: Static HTML (No Setup)

Just open `index.html` in a browser. Shows task list with manual status (hardcoded).

### Option 2: Live Slack Integration

Fetches real task status from Slack threads.

**Requirements:**
- Node.js
- Slack Bot Token with permissions: `channels:history`, `channels:read`, `users:read`

**Setup:**

1. Get Slack token:
   - Go to https://api.slack.com/apps
   - Create app or use existing
   - Add Bot Token Scopes: `channels:history`, `channels:read`, `users:read`
   - Install to workspace
   - Copy Bot User OAuth Token (`xoxb-...`)

2. Fetch task status:
```bash
SLACK_TOKEN=xoxb-your-token-here node fetch-status.js
```

3. Serve the tracker:
```bash
# Simple HTTP server
python3 -m http.server 8000
# OR
npx serve
```

4. Open: http://localhost:8000

### Option 3: Auto-Update with GitHub Actions

Deploy to GitHub Pages with auto-refresh every 5 minutes.

**Setup:**

1. Add Slack token to GitHub Secrets:
   - Repo Settings → Secrets → New secret
   - Name: `SLACK_BOT_TOKEN`
   - Value: `xoxb-your-token-here`

2. Create `.github/workflows/update-tracker.yml`:
```yaml
name: Update Task Tracker

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Fetch task status
        env:
          SLACK_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
        run: |
          cd tracker
          node fetch-status.js
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./tracker
```

3. Enable GitHub Pages:
   - Repo Settings → Pages
   - Source: gh-pages branch
   - Save

4. Tracker will be live at: `https://krishnagutta.github.io/zerolegacy-hackathon/`

## How It Works

### Task Status Detection

The tracker reads Slack thread replies and infers status:

**Unclaimed:**
- No replies claiming the task

**Claimed (In Progress):**
- Reply matches patterns:
  - "Taking Task X.X"
  - "I'll take this"
  - "Claiming"

**Completed:**
- Reply contains: "✅ complete" or "Task X.X COMPLETE"

### Owner Detection

- First user to claim task = owner
- Shown in tracker with real name from Slack

## Files

- `index.html` - Dashboard UI (standalone, works offline)
- `fetch-status.js` - Slack API fetcher (Node.js script)
- `task-status.json` - Generated task data (gitignored)
- `README.md` - This file

## Sharing

### Public Link (GitHub Pages)
Once deployed: Share `https://krishnagutta.github.io/zerolegacy-hackathon/`

### Embed in Notion/Confluence
```html
<iframe src="https://krishnagutta.github.io/zerolegacy-hackathon/" width="100%" height="800"></iframe>
```

### Screenshot Mode
Open tracker → Browser DevTools → Take full-page screenshot → Share image

## Development

Edit `index.html` to customize:
- Colors/styling (CSS in `<style>` block)
- Task list (JavaScript `TASKS` array)
- Refresh interval (default: 30s)

## Troubleshooting

**"Error loading tasks"**
- Check Slack token is valid
- Verify bot has channel access
- Check token permissions

**Tasks show wrong status**
- Fetch status again: `node fetch-status.js`
- Check Slack thread replies match patterns
- Clear browser cache

**Auto-update not working**
- Check GitHub Actions logs
- Verify secret is set correctly
- Ensure gh-pages branch deployed
