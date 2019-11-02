:this starts a python server and opens the flappybird game on it 

@echo off

echo "-----------------------------"
echo ".....running flappybird......"
echo "-----------------------------"

:get the python version
FOR /F "tokens=* USEBACKQ" %%F IN (`python --version`) DO (
SET py_version=%%F
)

:open the default browser and go to the local server
explorer.exe "http://localhost:8000"

:determine if python version is 3 or not -> and start the appropriate server
echo %py_version% | findstr /r "\s*3\." >nul 2>&1
if errorlevel 1 (python -m SimpleHTTPServer 8000) else (python -m http.server 8000)

