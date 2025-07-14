#!/usr/bin/env fish

uv --with gradio

uv run \
  --python python3.12 \
  --with gradio \
  'scripts/ply_to_splat/serve.py' # serves at http://127.0.0.1:7860 
