#!/bin/bash
# Update tracker with latest task status from Slack
# Usage: ./update-tracker.sh [--auto-commit]

set -e

cd "$(dirname "$0")"

echo "🔄 Updating task tracker from Slack..."

# Run the Node.js fetch script if it exists
if [ -f "docs/tracker/fetch-status.js" ]; then
    echo "📡 Fetching from Slack API..."
    if [ -n "$SLACK_TOKEN" ] || [ -n "$SLACK_BOT_TOKEN" ]; then
        cd docs/tracker
        node fetch-status.js
        cd ../..
        echo "✅ Status fetched"
    else
        echo "⚠️  No SLACK_TOKEN found - using manual update"
        echo "   Run: SLACK_TOKEN=xoxb-... ./update-tracker.sh"
    fi
else
    echo "⚠️  fetch-status.js not found - skipping API fetch"
fi

# Auto-commit if requested
if [ "$1" = "--auto-commit" ]; then
    if git diff --quiet docs/tracker/task-status.json; then
        echo "📊 No changes to commit"
    else
        echo "📝 Committing changes..."
        git add docs/tracker/task-status.json
        git commit -m "Auto-update task tracker [$(date '+%Y-%m-%d %H:%M')]"
        git push origin main
        echo "✅ Pushed to GitHub - Pages will update in ~1 min"
    fi
fi

echo "✨ Done! View tracker at: https://krishnagutta.github.io/zerolegacy-hackathon/tracker/"
