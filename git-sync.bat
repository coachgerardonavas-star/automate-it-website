@echo off
REM ============================================================
REM  git-sync.bat - Respaldo nocturno del trabajo local
REM  Repo:   C:\automate-it-website
REM  Destino: rama remota backup/laptop  (NUNCA main)
REM  Log:    %USERPROFILE%\git-sync-log.txt
REM  Lo ejecuta la tarea programada "AutomateIT-GitSync" a las 07:00.
REM
REM  QUE HACE Y POR QUE ASI
REM  ----------------------
REM  Antes este script hacia "add -A + commit + pull --rebase + push
REM  origin main". En este repo eso NO era un respaldo: Cloudflare
REM  despliega el sitio desde main, asi que cada madrugada publicaba en
REM  produccion lo que hubiera a medias en la carpeta. Ademas, con el HEAD
REM  en una rama de feature, el pull --rebase reescribia esa rama contra
REM  main sin que nadie lo pidiera.
REM
REM  Ahora respalda sin publicar y sin tocar nada:
REM
REM    - NO mueve el HEAD, NO crea ramas locales, NO commitea en la rama en
REM      la que estes trabajando y NO hace rebase ni pull. Tu repo local
REM      queda exactamente igual que antes de correr.
REM    - Arma la instantanea con plumbing (write-tree + commit-tree) usando
REM      un INDICE TEMPORAL via GIT_INDEX_FILE, asi que ni siquiera toca el
REM      area de staging: lo que tengas preparado con "git add" sigue ahi.
REM    - Empuja esa instantanea a refs/heads/backup/laptop. Nada llega a
REM      main, y por lo tanto nada se despliega.
REM
REM  Cada instantanea lleva dos padres: el HEAD real y la instantanea
REM  anterior. Eso encadena el historial de respaldos - se puede recuperar
REM  el de hace varios dias, no solo el ultimo - y hace que el push sea
REM  siempre fast-forward, sin --force.
REM
REM  Para recuperar algo:
REM    git fetch origin backup/laptop
REM    git log FETCH_HEAD              (ver las instantaneas)
REM    git checkout FETCH_HEAD -- <archivo>
REM
REM  NOTA: se usan saltos "if errorlevel 1 goto :label" en vez de bloques
REM  "if errorlevel 1 ( ... )" a proposito. cmd.exe NO balancea parentesis
REM  dentro de bloques (...), asi que un ")" en un texto como "(repo error)"
REM  cerraria el bloque antes de tiempo y el exit correria siempre. Los goto
REM  evitan ese bug. Por lo mismo, ningun texto de este script lleva ")".
REM ============================================================
setlocal enableextensions

set "REPO=C:\automate-it-website"
set "BACKUP=backup/laptop"
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

REM --- rama actual, solo para dejarla anotada en el mensaje ---
for /f "usebackq tokens=*" %%b in (`git rev-parse --abbrev-ref HEAD 2^>nul`) do set "CURRENT=%%b"
if not defined CURRENT goto :err_branch

REM --- indice temporal: el area de staging real no se toca ---
set "GIT_INDEX_FILE=%REPO%\.git\gitsync-index.tmp"
if exist "%GIT_INDEX_FILE%" del /q "%GIT_INDEX_FILE%"
git read-tree HEAD >>"%LOG%" 2>&1
if errorlevel 1 goto :err_index

REM --- capturar el working tree completo, respetando .gitignore ---
git add -A >>"%LOG%" 2>&1
if errorlevel 1 goto :err_add

for /f "usebackq tokens=*" %%t in (`git write-tree`) do set "TREE=%%t"
if not defined TREE goto :err_tree

REM --- instantanea anterior, si existe, para encadenar el historial ---
set "PREV="
git fetch origin %BACKUP% >>"%LOG%" 2>&1
if errorlevel 1 goto :no_prev
for /f "usebackq tokens=*" %%p in (`git rev-parse FETCH_HEAD 2^>nul`) do set "PREV=%%p"
:no_prev

REM --- si nada cambio desde la ultima instantanea, no se crea otra ---
set "BASETREE="
if defined PREV for /f "usebackq tokens=*" %%x in (`git rev-parse %PREV%^^{tree} 2^>nul`) do set "BASETREE=%%x"
if not defined PREV for /f "usebackq tokens=*" %%x in (`git rev-parse HEAD^^{tree} 2^>nul`) do set "BASETREE=%%x"
if "%TREE%"=="%BASETREE%" goto :nochanges

REM --- crear el commit de instantanea sin mover el HEAD ---
set "PARENTS=-p HEAD"
if defined PREV set "PARENTS=-p HEAD -p %PREV%"
for /f "usebackq tokens=*" %%c in (`git commit-tree %TREE% %PARENTS% -m "snapshot %TS% - rama %CURRENT%"`) do set "SNAP=%%c"
if not defined SNAP goto :err_commit

REM --- publicar SOLO en la rama de respaldo ---
git push origin %SNAP%:refs/heads/%BACKUP% >>"%LOG%" 2>&1
if errorlevel 1 goto :err_push

>>"%LOG%" echo [OK] Instantanea %SNAP% respaldada en %BACKUP% - rama de trabajo %CURRENT% intacta
goto :done

:nochanges
>>"%LOG%" echo [INFO] Sin cambios desde la ultima instantanea - nada que respaldar
goto :done

:done
if exist "%GIT_INDEX_FILE%" del /q "%GIT_INDEX_FILE%"
>>"%LOG%" echo ===== %TS%  git-sync END ok =====
endlocal
exit /b 0

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

:err_branch
>>"%LOG%" echo [ERROR] No se pudo determinar la rama actual. Repo corrupto o sin commits?
>>"%LOG%" echo ===== %TS%  git-sync END branch error =====
endlocal
exit /b 1

:err_index
>>"%LOG%" echo [ERROR] No se pudo inicializar el indice temporal
if exist "%GIT_INDEX_FILE%" del /q "%GIT_INDEX_FILE%"
>>"%LOG%" echo ===== %TS%  git-sync END index error =====
endlocal
exit /b 1

:err_add
>>"%LOG%" echo [ERROR] git add fallo al capturar el working tree
if exist "%GIT_INDEX_FILE%" del /q "%GIT_INDEX_FILE%"
>>"%LOG%" echo ===== %TS%  git-sync END add error =====
endlocal
exit /b 1

:err_tree
>>"%LOG%" echo [ERROR] git write-tree no devolvio un arbol
if exist "%GIT_INDEX_FILE%" del /q "%GIT_INDEX_FILE%"
>>"%LOG%" echo ===== %TS%  git-sync END tree error =====
endlocal
exit /b 1

:err_commit
>>"%LOG%" echo [ERROR] git commit-tree no devolvio un commit
if exist "%GIT_INDEX_FILE%" del /q "%GIT_INDEX_FILE%"
>>"%LOG%" echo ===== %TS%  git-sync END commit error =====
endlocal
exit /b 1

:err_push
>>"%LOG%" echo [ERROR] git push a %BACKUP% fallo. Revisar credenciales o red.
if exist "%GIT_INDEX_FILE%" del /q "%GIT_INDEX_FILE%"
>>"%LOG%" echo ===== %TS%  git-sync END push error =====
endlocal
exit /b 1
