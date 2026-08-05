@echo off
chcp 65001 >nul
title chart_replay

echo ================================
echo   chart_replay  K线回放启动器
echo ================================
echo.

:: 检查 Python 是否可用
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo [√] 检测到 Python，启动 HTTP 服务器...
    echo.
    echo 请在浏览器打开: http://localhost:8080/chart_replay.html
    echo 按 Ctrl+C 关闭服务器
    echo.
    start http://localhost:8080/chart_replay.html
    python -m http.server 8080
    goto :end
)

:: 检查 Node.js 是否可用
where npx >nul 2>&1
if %errorlevel% equ 0 (
    echo [√] 检测到 Node.js，启动 HTTP 服务器...
    echo.
    echo 请在浏览器打开: http://localhost:8080/chart_replay.html
    echo 按 Ctrl+C 关闭服务器
    echo.
    start http://localhost:8080/chart_replay.html
    npx serve . -p 8080 --no-clipboard
    goto :end
)

:: 都没有
echo [×] 未检测到 Python 或 Node.js
echo.
echo 请安装以下任一工具后重试:
echo   · Python 3:  https://www.python.org/downloads/
echo   · Node.js:   https://nodejs.org/
echo.
echo 或者直接在终端运行:
echo   python -m http.server 8080
echo   然后访问 http://localhost:8080/chart_replay.html
echo.
pause

:end
