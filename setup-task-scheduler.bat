@echo off
REM ============================================================
REM  setup-task-scheduler.bat
REM  Registra la tarea programada "AutomateIT-GitSync", que corre
REM  git-sync.bat todos los dias a las 07:00.
REM  Idempotente: -Force sobrescribe si ya existia.
REM
REM  QUE HACE LA TAREA
REM  -----------------
REM  git-sync.bat NO despliega nada. Toma una instantanea del working
REM  tree y la empuja a la rama remota backup/laptop. Nunca toca main,
REM  que es de donde despliega Cloudflare. Ver el encabezado de
REM  git-sync.bat para el detalle.
REM
REM  POR QUE ESTE SCRIPT USA POWERSHELL Y NO SCHTASKS
REM  ------------------------------------------------
REM  Antes registraba la tarea con:
REM
REM      schtasks /Create ... /SC DAILY /ST 04:30 /F
REM
REM  y eso tenia dos problemas serios. El primero es que schtasks no
REM  expone StartWhenAvailable ni el permiso de correr con bateria, asi
REM  que la tarea quedaba con los valores por defecto de Windows: en una
REM  laptop que a esa hora esta dormida o desenchufada, la corrida se
REM  saltaba en silencio y NO se recuperaba. Asi se acumularon 27
REM  corridas perdidas. El segundo es que el /F sobrescribia: correr este
REM  script una sola vez borraba cualquier ajuste hecho a mano.
REM
REM  Register-ScheduledTask si permite fijar esos ajustes, asi que este
REM  archivo pasa a ser la fuente unica de la configuracion. Si algun dia
REM  hay que cambiar la hora o el comportamiento, se cambia AQUI y se
REM  vuelve a correr -- no en la interfaz del Programador de tareas, o el
REM  proximo que corra este script te lo revierte.
REM ============================================================
setlocal

set "TASKNAME=AutomateIT-GitSync"
set "SCRIPT=%~dp0git-sync.bat"

echo Registrando tarea "%TASKNAME%"
echo   Script:     %SCRIPT%
echo   Frecuencia: diaria a las 07:00
echo   Destino:    rama remota backup/laptop -- nunca main, nunca produccion
echo.

if not exist "%SCRIPT%" goto :err_missing

powershell -NoProfile -ExecutionPolicy Bypass -Command "$a = New-ScheduledTaskAction -Execute '%SCRIPT%'; $t = New-ScheduledTaskTrigger -Daily -At '7:00AM'; $s = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Hours 1); Register-ScheduledTask -TaskName '%TASKNAME%' -Action $a -Trigger $t -Settings $s -Force | Out-Null"
if errorlevel 1 goto :err_register

echo.
echo [OK] Tarea "%TASKNAME%" registrada.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$t = Get-ScheduledTask -TaskName '%TASKNAME%'; 'Estado:              ' + $t.State; 'Proxima corrida:     ' + (Get-ScheduledTaskInfo -TaskName '%TASKNAME%').NextRunTime; 'Recupera si durmio:  ' + $t.Settings.StartWhenAvailable; 'Corre con bateria:   ' + (-not $t.Settings.DisallowStartIfOnBatteries)"
endlocal
exit /b 0

:err_missing
echo [ERROR] No se encontro %SCRIPT%
endlocal
exit /b 1

:err_register
echo [ERROR] No se pudo registrar la tarea "%TASKNAME%".
endlocal
exit /b 1
