#!/bin/bash

echo "-----------------------------"
echo ".....running flappybird......"
echo "-----------------------------"

explorer.exe "http://localhost:8000"

py_version=$(python --version 2>&1)

if [[ $py_version =~ \s{1}?3. ]]
then
  python -m http.server 8000
else
  python -m SimpleHTTPServer 8000
fi
