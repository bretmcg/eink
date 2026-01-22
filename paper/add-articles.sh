#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: ./add-articles.sh <path-to-articles-json>"
    echo "Example: ./add-articles.sh .articles/2026-01-22__09-10/00-articles.json"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "[
  \"$1\"
]" > "$SCRIPT_DIR/articles.json"

echo "Updated articles.json to point to: $1"
