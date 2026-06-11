@echo off
REM ============================================================
REM  git-sync.bat - Sincronizacion automatica con GitHub
REM  Repo:   C:\automate-it-website   (rama main)
REM  Log:    %USERPROFILE%\git-sync-log.txt
REM  Lo ejecuta la tarea programada "AutomateIT-GitSync".
REM ============================================================
setlocal enableextensions

set "REPO=C:\automate-it-website"
set "BRANCH=main"
set "LOG=%USERPROFILE%\git-sync-log.txt"

REM --- timestamp (locale-independiente via PowerShell) ---
for /f "usebackq tokens=*" %%i in (`powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"`) do set "TS=%%i"

>>"%LOG%" echo.
>>"%LOG%" echo ===== %TS%  git-sync START =====

REM --- entrar al repo ---
cd /d "%REPO%"
if errorlevel 1 (
    >>"%LOG%" echo [ERROR] No se pudo entrar a %REPO%
    >>"%LOG%" echo ===== %TS%  git-sync END (repo error) =====
    exit /b 1
)

REM --- git debe estar disponible ---
where git >nul 2>&1
if errorlevel 1 (
    >>"%LOG%" echo [ERROR] git no esta en el PATH
    >>"%LOG%" echo ===== %TS%  git-sync END (no git) =====
    exit /b 1
)

REM --- stage de todos los cambios locales ---
git add -A >>"%LOG%" 2>&1

REM --- commit SOLO si hay algo staged (evita el fallo "nothing to commit") ---
git diff --cached --quiet
if errorlevel 1 (
    git commit -m "chore(sync): auto-commit %TS%" >>"%LOG%" 2>&1
    >>"%LOG%" echo [OK] Cambios locales commiteados
) else (
    >>"%LOG%" echo [INFO] Sin cambios locales para commitear
)

REM --- traer remoto: rebase + autostash evita merge-commits y conflictos por WIP ---
git pull --rebase --autostash origin %BRANCH% >>"%LOG%" 2>&1
if errorlevel 1 (
    >>"%LOG%" echo [ERROR] git pull --rebase fallo. Abortando rebase; revisar a mano.
    git rebase --abort >>"%LOG%" 2>&1
    >>"%LOG%" echo ===== %TS%  git-sync END (pull error) =====
    exit /b 1
)

REM --- push al remoto ---
git push origin %BRANCH% >>"%LOG%" 2>&1
if errorlevel 1 (
    >>"%LOG%" echo [ERROR] git push fallo (revisar credenciales / red)
    >>"%LOG%" echo ===== %TS%  git-sync END (push error) =====
    exit /b 1
)

>>"%LOG%" echo [OK] Sincronizacion completa
>>"%LOG%" echo ===== %TS%  git-sync END ok =====
endlocal
exit /b 0
