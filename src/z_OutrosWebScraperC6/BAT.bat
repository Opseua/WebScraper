@chcp 65001 && @echo off && setlocal enabledelayedexpansion
set "letra=%~d0" &&  set "local=%~dp0"
set "letra=%letra:~0,1%" && set "local=%local:~0,-1%" && set "arquivo=%~nx0"
set "usuario=%USERNAME%" && set "argTUDO=%~1 %~2 %~3 %~4 %~5" && set "arg1=%~1" && set "arg2=%~2" && set "arg3=%~3" && set "arg4=%~4" && set "arg5=%~5"

set "arg1=toggle"

rem set "start=SIM"
rem set "adm=#" && NET SESSION >nul 2>&1
rem if !errorlevel! neq 0 ( set "adm=NAO" ) else ( set "adm=SIM" )

echo WScript.Echo(new Date().getTime()); > !temp!\time.js && for /f "delims=" %%a in ('cscript //nologo !temp!\time.js') do set "timeNow=%%a"
set "timeNow=!timeNow:~0,-3!" && set "dia=!DATE:~0,2!" && set "mes=!DATE:~3,2!" && set "fileAll=!letra!:\ARQUIVOS\WINDOWS\BAT\z_log\z_MES_!mes!_DIA_!dia!.txt"

echo WScript.Echo(new Date().getTime()); > !temp!\time.js && for /f "delims=" %%a in ('cscript //nologo !temp!\time.js') do set "timeNow=%%a"
set "timeNow=!timeNow:~0,-3!" && set "dia=!DATE:~0,2!" && set "mes=!DATE:~3,2!" && set "fileAll=!letra!:\ARQUIVOS\WINDOWS\BAT\z_log\z_MES_!mes!_DIA_!dia!.txt"

set "url=http://34.227.26.180:8888/EC2_NODEJS"
set "method=POST"
set "headers=--header=Content-Type:application/json --header=chave1:valor1 --header=chave2:valor2"
set "body={"fun":[{"securityPass":"Password@2023WebSocketRet","retInf":false,"name":"googleSheets","par":{"action":"send","id":"1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc","tab":"INDICAR_MANUAL","range":"B20","values":[["!timeNow! ^| $ Script parado"]]}}]}"
set "bodyPath=!TEMP!\wgetBody.txt" && echo !body! > !bodyPath! && if "!arg1!" == "toggle" ( "!wget!" --post-file=!bodyPath! !headers! --quiet -O- !url! )


set "url=http://34.227.26.180:8888/EC2_NODEJS"
set "method=POST"
set "headers=--header=Content-Type:application/json --header=chave1:valor1 --header=chave2:valor2"
set "body={"fun":[{"securityPass":"Password@2023WebSocketRet","retInf":false,"name":"googleSheets","par":{"action":"send","id":"1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc","tab":"INDICAR_MANUAL","range":"B21","values":[["!timeNow! ^| # Aguarde......"]]}}]}"
set "bodyPath=!TEMP!\wgetBody.txt" && echo !body! > !bodyPath! && if "!arg1!" == "toggle" ( "!wget!" --post-file=!bodyPath! !headers! --quiet -O- !url! )
