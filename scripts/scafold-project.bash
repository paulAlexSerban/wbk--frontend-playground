#!/usr/bin/env bash
set -euo pipefail

echo "[deprecated] scripts/scafold-project.bash now delegates to scripts/new-project.js"
echo "Use: yarn new:project --name \"...\" --category ... --template ..."

yarn new:project "$@"