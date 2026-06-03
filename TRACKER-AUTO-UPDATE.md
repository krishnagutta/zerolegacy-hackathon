# Tracker Auto-Update Setup

## Quick Update (Manual)

```bash
./update-tracker.sh --auto-commit
```

This will:
1. Fetch latest task status from Slack
2. Update `task-status.json`
3. Commit and push to GitHub
4. GitHub Pages auto-deploys (~1 min)

## Automatic Updates Every 15 Minutes

### Option 1: Cron Job (macOS/Linux)

**Setup once:**
```bash
# Make script executable
chmod +x update-tracker.sh

# Edit crontab
crontab -e

# Add this line (runs every 15 minutes):
*/15 * * * * cd /Users/krishnagutta/Documents/devcon-hackathon-2026 && SLACK_TOKEN=your-token-here ./update-tracker.sh --auto-commit >> /tmp/tracker-update.log 2>&1
```

**Replace** `your-token-here` with actual Slack Bot Token.

**View logs:**
```bash
tail -f /tmp/tracker-update.log
```

**Stop auto-updates:**
```bash
crontab -e
# Delete the line, save and exit
```

### Option 2: launchd (macOS - Better than cron)

Create `~/Library/LaunchAgents/com.zerolegacy.tracker-update.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.zerolegacy.tracker-update</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/krishnagutta/Documents/devcon-hackathon-2026/update-tracker.sh</string>
        <string>--auto-commit</string>
    </array>
    <key>EnvironmentVariables</key>
    <dict>
        <key>SLACK_TOKEN</key>
        <string>YOUR_SLACK_TOKEN_HERE</string>
    </dict>
    <key>StartInterval</key>
    <integer>900</integer>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/tracker-update.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/tracker-update-error.log</string>
</dict>
</plist>
```

**Load it:**
```bash
launchctl load ~/Library/LaunchAgents/com.zerolegacy.tracker-update.plist
```

**Unload (stop):**
```bash
launchctl unload ~/Library/LaunchAgents/com.zerolegacy.tracker-update.plist
```

### Option 3: GitHub Actions (Cloud-Based)

Create `.github/workflows/update-tracker.yml`:

```yaml
name: Update Task Tracker

on:
  schedule:
    - cron: '*/15 * * * *'  # Every 15 minutes
  workflow_dispatch:  # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Fetch task status from Slack
        env:
          SLACK_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
        run: |
          cd docs/tracker
          node fetch-status.js
      
      - name: Commit and push if changed
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add docs/tracker/task-status.json
          if git diff --staged --quiet; then
            echo "No changes"
          else
            git commit -m "Auto-update task tracker [$(date)]"
            git push
          fi
```

**Setup:**
1. Go to repo Settings → Secrets → Actions
2. Add secret: `SLACK_BOT_TOKEN` = your token
3. Push the workflow file
4. Done! Runs every 15 min automatically

## Current Status

✅ Task status file: `docs/tracker/task-status.json`
✅ GitHub Pages: https://krishnagutta.github.io/zerolegacy-hackathon/tracker/
✅ Manual update script: `./update-tracker.sh`

**Last manual update:** 2026-06-03 15:52 PDT

## Troubleshooting

**"No changes to commit"**
- Tasks haven't been claimed/updated in Slack
- This is normal if tracker is up-to-date

**"SLACK_TOKEN not found"**
- Set environment variable: `export SLACK_TOKEN=xoxb-...`
- Or pass inline: `SLACK_TOKEN=xoxb-... ./update-tracker.sh`

**"Permission denied"**
- Make executable: `chmod +x update-tracker.sh`

**Cron not running**
- Check logs: `tail -f /tmp/tracker-update.log`
- Verify crontab: `crontab -l`
- Test script manually first
