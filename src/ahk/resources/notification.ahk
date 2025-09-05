; FUNÇÕES/BIBLIOTECAS
; #Include %A_ScriptDir%\resources\notification.ahk

; notification("Título", "Texto", 1)

notification(title := 'TITULO VAZIO', text := 'TEXTO VAZIO', duration := 3) {
    TrayTip(text, title) 
    ms := duration * 1000
    SetTimer(HideTrayTipWrapper, -ms)
}

HideTrayTipWrapper() {
    HideTrayTip()
}

HideTrayTip() {
    TrayTip()
}


