; Coordenadas do mouse relativas à tela
CoordMode, Mouse, Screen

; F8 → captura posição do mouse
F8::
{
    MouseGetPos, x, y
    A_Clipboard := x ", " y
    return
}

; Ctrl+F8 → captura posição e tamanho da janela ativa
^F8::
{
    win := WinExist("A")  ; janela ativa
    WinGetPos, x, y, w, h, ahk_id %win%
    A_Clipboard := x ", " y ", " w ", " h
    return
}
