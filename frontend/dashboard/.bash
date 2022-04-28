
#!/bin/bash

function build-static () {
  rm -rfv ./dashboard/dist &&
  mkdir ./dashboard/dist &&
  cp -rfv ./dashboard/source/* ./dashboard/dist/ &&
  cp -rfv ./dashboard/dist/* ./core/dist/app/
}

$1