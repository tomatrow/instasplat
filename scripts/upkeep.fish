#!/usr/bin/env fish

source scripts/config.fish

# grab latest simplecss and format
curl -L https://unpkg.com/simpledotcss/simple.css | string replace --all 'body ' '.simple-root ' > packages/app/static/simple.css
pnpx prettier --write packages/app/static/simple.css

# grab latest svelte llm context 
curl https://svelte-llm.khromov.se/svelte-distilled > scripts/aider/svelte-distilled.txt

# check outdated
pnpm outdated
