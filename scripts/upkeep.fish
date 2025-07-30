#!/usr/bin/env fish

source scripts/config.fish

# grab latest simplecss and format
curl -L https://unpkg.com/simpledotcss/simple.css | string replace --all 'body ' '.simple-root ' > packages/client/static/simple.css
pnpx prettier --write packages/client/static/simple.css

# grab latest svelte llm context 
curl https://svelte.dev/llms-small.txt > scripts/llms.txt/svelte.dev/llms-small.txt 
curl https://svelte.dev/docs/kit/llms-small.txt > scripts/llms.txt/svelte.dev/docs/kit/llms-small.txt
curl https://svelte.dev/docs/svelte/llms-small.txt > scripts/llms.txt/svelte.dev/docs/svelte/llms-small.txt

# check outdated
pnpm outdated
