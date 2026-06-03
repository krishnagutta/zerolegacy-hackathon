#!/usr/bin/env node

/**
 * Fetch task status from Slack and generate static JSON
 * Usage: SLACK_TOKEN=xoxb-... node fetch-status.js
 */

const https = require('https');
const fs = require('fs');

const SLACK_TOKEN = process.env.SLACK_TOKEN || process.env.SLACK_BOT_TOKEN;
const CHANNEL_ID = 'C0B8EHD8LU8';

// Task message timestamps
const TASK_TIMESTAMPS = {
    '0.1': '1780525557.153739',
    '0.2': '1780525563.810099',
    '0.3': '1780525570.132469',
    '0.4': '1780525576.377379',
    '1.1': '1780525585.160979',
    '1.2': '1780525590.121389',
    '2.1': '1780525600.281589',
    '2.2': '1780525606.470549',
    '2.3': '1780525611.567489',
    '2.4': '1780525617.316219',
    '3.1': '1780525629.428299',
    '3.2': '1780525636.712809',
    '4.1': '1780525647.388989',
    '4.2': '1780525652.791099',
    '4.3': '1780525657.379599',
    '5.1': '1780525668.563869',
    '5.2': '1780525675.195859',
    '5.3': '1780525681.644679',
    '5.4': '1780525687.222739',
    '5.5': '1780525693.012379',
    '5.6': '1780525699.279529',
    '5.7': '1780525705.483709',
    '5.8': '1780525710.498859',
    'Q.1': '1780525719.502279',
    'Q.2': '1780525725.026679',
    'Q.3': '1780525729.519669',
    'Q.4': '1780525735.295219'
};

async function slackAPI(endpoint, params = {}) {
    return new Promise((resolve, reject) => {
        const queryString = new URLSearchParams(params).toString();
        const options = {
            hostname: 'slack.com',
            path: `/api/${endpoint}?${queryString}`,
            headers: {
                'Authorization': `Bearer ${SLACK_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (!parsed.ok) {
                        reject(new Error(parsed.error || 'Slack API error'));
                    } else {
                        resolve(parsed);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function getThreadReplies(ts) {
    try {
        const result = await slackAPI('conversations.replies', {
            channel: CHANNEL_ID,
            ts: ts,
            limit: 100
        });
        return result.messages || [];
    } catch (error) {
        console.error(`Error fetching thread ${ts}:`, error.message);
        return [];
    }
}

function parseTaskStatus(replies) {
    // Look for claim messages in thread
    const claimPatterns = [
        /taking (task )?/i,
        /i'?ll (take|do|handle)/i,
        /claiming/i,
        /^done$/i,
        /✅.*complete/i
    ];

    let owner = null;
    let status = 'unclaimed';

    for (const reply of replies.slice(1)) { // Skip first message (the task itself)
        const text = reply.text.toLowerCase();

        // Check for completion
        if (text.includes('✅') && text.includes('complete')) {
            status = 'completed';
            if (!owner && reply.user) {
                owner = reply.user;
            }
        }
        // Check for claim
        else if (claimPatterns.some(pattern => pattern.test(text))) {
            if (status !== 'completed') {
                status = 'claimed';
            }
            if (!owner && reply.user) {
                owner = reply.user;
            }
        }
    }

    return { status, owner };
}

async function fetchUserName(userId) {
    try {
        const result = await slackAPI('users.info', { user: userId });
        return result.user?.real_name || result.user?.name || userId;
    } catch {
        return userId;
    }
}

async function main() {
    if (!SLACK_TOKEN) {
        console.error('Error: SLACK_TOKEN environment variable not set');
        console.error('Usage: SLACK_TOKEN=xoxb-... node fetch-status.js');
        process.exit(1);
    }

    console.log('Fetching task status from Slack...');

    const taskStatus = {};
    const userCache = {};

    for (const [taskId, ts] of Object.entries(TASK_TIMESTAMPS)) {
        console.log(`Fetching Task ${taskId}...`);

        const replies = await getThreadReplies(ts);
        const { status, owner } = parseTaskStatus(replies);

        let ownerName = null;
        if (owner) {
            if (!userCache[owner]) {
                userCache[owner] = await fetchUserName(owner);
            }
            ownerName = userCache[owner];
        }

        taskStatus[taskId] = {
            status,
            owner: ownerName,
            replyCount: replies.length - 1,
            lastUpdate: replies[replies.length - 1]?.ts || ts
        };

        // Rate limit: wait 1s between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Write to JSON file
    const output = {
        lastUpdate: new Date().toISOString(),
        tasks: taskStatus
    };

    fs.writeFileSync('task-status.json', JSON.stringify(output, null, 2));
    console.log('✅ Task status saved to task-status.json');

    // Print summary
    const stats = Object.values(taskStatus).reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {});

    console.log('\nSummary:');
    console.log(`  Unclaimed: ${stats.unclaimed || 0}`);
    console.log(`  Claimed: ${stats.claimed || 0}`);
    console.log(`  Completed: ${stats.completed || 0}`);
    console.log(`  Total: ${Object.keys(taskStatus).length}`);
}

main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
