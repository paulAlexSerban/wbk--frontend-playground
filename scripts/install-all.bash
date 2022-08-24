#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

bash assets-install.bash
bash frontend-living-style-guide-install.bash
bash frontend-js-component-library-install.bash
bash frontend-frontend-component-collection-install.bash