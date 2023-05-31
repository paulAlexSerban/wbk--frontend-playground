#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit
echo "🧪  TEST Nginx Assets container"
bash ../scripts/test/check-docker-container.bash assets
