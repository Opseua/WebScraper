; #Include "D:\ARQUIVOS\PROJETOS\WebScraper\src\ahk\Lib\OCR.ahk"
; #Include "D:\ARQUIVOS\PROJETOS\WebScraper\src\ahk\resources\findTextOnScreen.ahk"

; if findTextOnScreen("PROCURAR ISSO 10 VEZES A CADA 250 MILESSEGUNDOS", 10) {
; 	  MsgBox("ACHOU [SIM]")
; } else {
;     MsgBox("ACHOU [NAO]")
; }


findTextOnScreen(searchString, maxTries) {
    currentTry := 0
    while (currentTry < maxTries) {
        ocrText := OCR.FromDesktop().Text
        if InStr(ocrText, searchString) {
            return true
        }
        Sleep(500)
        currentTry++
    }
    return false
}


