#!/usr/bin/env fish

source scripts/config.fish

tmux_triple_pane \
	--preamble="source scripts/config.fish" \
	--left "cd packages/api; and bin/rails server" \
	--right "cd packages/app; and pnpm run dev" \
	--center "pnpm run upkeep"
