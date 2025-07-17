#!/usr/bin/env fish

# --with git+https://github.com/quinlanjager/aider@feature/litellm-mcp \

uv run \
  --python python3.12 \
  --with aider-chat \
  --with google-cloud-aiplatform \
  '/Users/ajcaldwell/Library/Application Support/Nova/Extensions/dev.ajcaldwell.aider/nova-aider.py' \
  --config .aider.conf.yaml
