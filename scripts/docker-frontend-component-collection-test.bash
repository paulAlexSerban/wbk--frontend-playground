#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

  echo "🧪  TEST Nginx Portfolio Website Server container"
  bash ../docker/test/check-docker-container.bash frontend-component-collection
