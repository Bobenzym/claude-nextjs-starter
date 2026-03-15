#!/bin/bash
# Notification 훅 - permission_prompt 시 Slack 알림

source "$CLAUDE_PROJECT_DIR/.claude/.env"
INPUT=$(cat)

SLACK_PAYLOAD=$(HOOK_INPUT="$INPUT" python3 << 'PYTHON_EOF'
import json
import os

data = json.loads(os.environ.get('HOOK_INPUT', '{}'))
session_id = data.get('session_id', 'unknown')[:8]
message = data.get('message', '권한 요청이 있습니다')
cwd = data.get('cwd', '')

payload = {
    "blocks": [
        {"type": "section", "text": {"type": "mrkdwn", "text": "🔔 *Claude Code 권한 요청*"}},
        {"type": "divider"},
        {"type": "section", "text": {"type": "mrkdwn", "text": message}},
        {"type": "context", "elements": [{"type": "mrkdwn", "text": f"📁 `{cwd}` | 🆔 `{session_id}...`"}]}
    ]
}
print(json.dumps(payload, ensure_ascii=False))
PYTHON_EOF
)

if [ -n "$SLACK_WEBHOOK_URL" ]; then
    curl -s -X POST -H 'Content-type: application/json' \
        --data "$SLACK_PAYLOAD" --max-time 5 "$SLACK_WEBHOOK_URL" > /dev/null 2>&1 &
fi

exit 0
