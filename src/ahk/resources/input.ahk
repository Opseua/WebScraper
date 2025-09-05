; #NoTrayIcon

input(text, totalTime := 1000) {
    RandomOffset(min, max) {
        return Random(min, max)
    }

    len := StrLen(text)
    if (len = 0)
        return

    baseDelay := totalTime / len

    for index, _ in StrSplit(text) {
        char := SubStr(text, index, 1)  ; guarda o caractere  
		Send "{Text}" char
        Sleep(baseDelay + RandomOffset(-baseDelay*0.4, baseDelay*0.4)) ; ±40% variação
    }
}

; INTERVALO DE PRESSIONAMENTO EM MILESSEGUNDOS
; input('Olá, mundo!', 2000) 

; CTRL + A
; Send('^a')