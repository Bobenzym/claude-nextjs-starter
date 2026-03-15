#!/bin/bash
# Stop 훅 - 작업 완료 시 Slack 알림

# 무한루프 방지
INPUT=$(cat)
if [ "$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('stop_hook_active', False))" 2>/dev/null)" = "True" ]; then
    exit 0
fi

source "$CLAUDE_PROJECT_DIR/.claude/.env"

SLACK_PAYLOAD=$(HOOK_INPUT="$INPUT" python3 << 'PYTHON_EOF'
import json
import os

data = json.loads(os.environ.get('HOOK_INPUT', '{}'))
session_id = data.get('session_id', 'unknown')[:8]
cwd = data.get('cwd', '')
last_message = data.get('last_assistant_message', '')[:300]

blocks = [
    {"type": "section", "text": {"type": "mrkdwn", "text": "✅ *Claude Code 작업 완료*"}},
    {"type": "divider"}
]
if last_message:
    blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": f"*마지막 메시지*\n{last_message}"}})
blocks.append({"type": "context", "elements": [{"type": "mrkdwn", "text": f"📁 `{cwd}` | 🆔 `{session_id}...`"}]})

print(json.dumps({"blocks": blocks}, ensure_ascii=False))
PYTHON_EOF
)

if [ -n "$SLACK_WEBHOOK_URL" ]; then
    curl -s -X POST -H 'Content-type: application/json' \
        --data "$SLACK_PAYLOAD" --max-time 5 "$SLACK_WEBHOOK_URL" > /dev/null 2>&1 &
fi

exit 0
