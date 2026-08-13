@echo off
REM ============================================================
REM  git-sync.bat - Sincronizacion automatica con GitHub
REM  Repo:   C:\automate-it-website   (rama main)
REM  Log:    %USERPROFILE%\git-sync-log.txt
REM  Lo ejecuta la tarea programada "AutomateIT-GitSync".
REM
REM  NOTA: se usan saltos "if errorlevel 1 goto :label" en vez de
REM  bloques "if errorlevel 1 ( ... )" a proposito. cmd.exe NO
REM  balancea parentesis dentro de bloques (...), asi que un ")"
REM  en un texto como "(repo error)" cerraria el bloque antes de
REM  tiempo y el exit correria siempre. Los goto evitan ese bug.
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
if errorlevel 1 goto :err_repo

REM --- git debe estar disponible ---
where git >nul 2>&1
if errorlevel 1 goto :err_git

REM --- GUARDA DE RAMA: este script solo sincroniza main ---
REM
REM  Antes corria pasara lo que pasara, y en una rama de feature hacia dos
REM  destrozos silenciosos cada madrugada:
REM
REM    1. "git pull --rebase origin main" REESCRIBIA la rama de feature
REM       rebasandola sobre main, sin que nadie lo pidiera.
REM    2. "git add -A" + commit se tragaba trabajo a medio hacer, y
REM       "git push origin main" empujaba el ref local main -- que puede
REM       tener commits que nadie reviso -- directo a produccion.
REM
REM  Si el HEAD no esta en main, no se toca NADA y se explica en el log.
REM  Detached HEAD tambien cae aqui: rev-parse devuelve "HEAD", que no
REM  coincide con main.
for /f "usebackq tokens=*" %%b in (`git rev-parse --abbrev-ref HEAD 2^>nul`) do set "CURRENT=%%b"
if not defined CURRENT goto :err_branch
if /i not "%CURRENT%"=="%BRANCH%" goto :skip_not_main

REM --- stage de todos los cambios locales ---
git add -A >>"%LOG%" 2>&1

REM --- commit SOLO si hay algo staged (evita "nothing to commit") ---
git diff --cached --quiet
if not errorlevel 1 goto :nocommit
git commit -m "chore(sync): auto-commit %TS%" >>"%LOG%" 2>&1
>>"%LOG%" echo [OK] Cambios locales commiteados
goto :after_commit
:nocommit
>>"%LOG%" echo [INFO] Sin cambios locales para commitear
:after_commit

REM --- traer remoto: rebase + autostash evita merge-commits y WIP ---
git pull --rebase --autostash origin %BRANCH% >>"%LOG%" 2>&1
if errorlevel 1 goto :err_pull

REM --- push al remoto ---
git push origin %BRANCH% >>"%LOG%" 2>&1
if errorlevel 1 goto :err_push

>>"%LOG%" echo [OK] Sincronizacion completa
>>"%LOG%" echo ===== %TS%  git-sync END ok =====
endlocal
exit /b 0

:skip_not_main
>>"%LOG%" echo [SKIP] GitSync: HEAD en %CURRENT%, no es %BRANCH% - sync automatico omitido, revisar manualmente
>>"%LOG%" echo [SKIP] No se toco el working tree: ni add, ni commit, ni rebase, ni push.
>>"%LOG%" echo [SKIP] Los cambios locales siguen sin commitear, a proposito. Para sincronizar:
>>"%LOG%" echo [SKIP]   git checkout %BRANCH%   (o mergear %CURRENT% a %BRANCH% cuando este listo)
>>"%LOG%" echo ===== %TS%  git-sync END skipped =====
endlocal
exit /b 0

:err_branch
>>"%LOG%" echo [ERROR] No se pudo determinar la rama actual. Repo corrupto o sin commits?
>>"%LOG%" echo ===== %TS%  git-sync END branch error =====
endlocal
exit /b 1

:err_repo
>>"%LOG%" echo [ERROR] No se pudo entrar a %REPO%
>>"%LOG%" echo ===== %TS%  git-sync END repo error =====
endlocal
exit /b 1

:err_git
>>"%LOG%" echo [ERROR] git no esta en el PATH
>>"%LOG%" echo ===== %TS%  git-sync END no git =====
endlocal
exit /b 1

:err_pull
>>"%LOG%" echo [ERROR] git pull --rebase fallo. Abortando rebase; revisar a mano.
git rebase --abort >>"%LOG%" 2>&1
>>"%LOG%" echo ===== %TS%  git-sync END pull error =====
endlocal
exit /b 1

:err_push
>>"%LOG%" echo [ERROR] git push fallo. Revisar credenciales o red.
>>"%LOG%" echo ===== %TS%  git-sync END push error =====
endlocal
exit /b 1
