#!/usr/bin/env fish

# we're using the mcp pr branch right now. Change it back to `--with aider-chat \` when merged
uv run \
  --python python3.12 \
  --with git+https://github.com/quinlanjager/aider@feature/litellm-mcp \
  --with google-cloud-aiplatform \
  '/Users/ajcaldwell/Library/Application Support/Nova/Extensions/dev.ajcaldwell.aider/nova-aider.py' \
  --config .aider.conf.yaml \
  --mcp-servers '{"mcpServers":{"svelte-llm":{ "command": "npx", "args": ["mcp-remote", "https://svelte-llm.khromov.se/mcp/mcp"] },"playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] }}}'
