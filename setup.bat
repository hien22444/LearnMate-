@echo off
echo 🚀 SETUP LEARNMATE LOCALHOST
echo ================================

echo.
echo 📥 Installing Backend Dependencies...
cd LearnMateBe
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed!
    pause
    exit /b 1
)

echo.
echo 📥 Installing Frontend Dependencies...
cd ..\LearnMateFe
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed!
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.
echo 🚀 Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0LearnMateBe && npm start"

echo.
echo 🚀 Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0LearnMateFe && npm start"

echo.
echo 🎉 Setup completed!
echo.
echo 📱 Access your application:
echo    Frontend: http://localhost:6161
echo    Backend:  http://localhost:8888
echo.
echo Press any key to exit...
pause > nul
