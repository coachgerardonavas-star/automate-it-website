@echo off
REM ============================================================
REM  setup-task-scheduler.bat
REM  Registra la tarea programada "AutomateIT-GitSync" que corre
REM  git-sync.bat cada 15 minutos mientras el usuario este logueado.
REM  Idempotente: /F sobrescribe si ya existia.
REM ============================================================
setlocal

set "TASKNAME=AutomateIT-GitSync"
set "SCRIPT=%~dp0git-sync.bat"

echo Registrando tarea "%TASKNAME%"
echo   Script:    %SCRIPT%
echo   Frecuencia: diaria a las 04:30
echo.

if not exist "%SCRIPT%" (
    echo [ERROR] No se encontro %SCRIPT%
    exit /b 1
)

schtasks /Create /TN "%TASKNAME%" /TR "%SCRIPT%" /SC DAILY /ST 04:30 /F
if errorlevel 1 (
    echo [ERROR] No se pudo crear la tarea "%TASKNAME%".
    exit /b 1
)

echo.
echo [OK] Tarea "%TASKNAME%" registrada.
echo.
schtasks /Query /TN "%TASKNAME%" /FO LIST
endlocal
exit /b 0
