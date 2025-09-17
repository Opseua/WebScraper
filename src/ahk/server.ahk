; #NoTrayIcon
#SingleInstance Force

; FUNÇÕES/BIBLIOTECAS
#Include %A_ScriptDir%\resources\mouse.ahk
#Include %A_ScriptDir%\resources\input.ahk
#Include %A_ScriptDir%\resources\notification.ahk
#Include %A_ScriptDir%\resources\findTextOnScreen.ahk
#include Lib\OCR.ahk

; ----------------------------------------------------------------------------------------------------------------

; SCRIPT: TOGGLE
isRunning := false
!z:: { ; Alt+Z
	global isRunning
	try {
		if isRunning {
			title := 'INDICAÇÃO AUTOMÁTICA', text := 'Aguarde o input em andamento!'
			; MsgBox(title '`n' text)
			notification(title, text, 3)
			return
		}
		; ========================================================================================================================

		inputText := InputBox('Cole as informações aqui:', 'INDICAÇÃO AUTOMÁTICA', 'w450 h90')
		if (inputText.Result = 'Cancel') {
			return
		} else if (inputText.Value = '' || !RegExMatch(inputText.Value, '^(?:[^\t]*\t){4}[^\t]*$')) {
			title := 'INDICAÇÃO AUTOMÁTICA', text := 'ALERTA: confira o texto inserido!'
			; MsgBox(title '`n' text)
			notification(title, text, 3)
			return
		}
		lead := Trim(inputText.Value), campos := StrSplit(lead, '`t'), administrador := campos[1], cnpj := campos[2], email := campos[3], telefone := campos[4], razaoSocial := campos[5]
		nomes := StrSplit(administrador, ' '), primeiroNome := nomes[1], sobrenome := nomes.Length > 1 ? SubStr(administrador, InStr(administrador, ' ') + 1) : ''

		; -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#

		isRunning := true

		title := 'INDICAÇÃO AUTOMÁTICA', text := 'Indicando...'
		; MsgBox(title '`n' text)
		notification(title, text, 2)

		; [] CLICAR NA BARRA DE NAVEGAÇÃO (PARA FICAR EM PRIMEIRO PLANO)
		mouse({ point: [ [153, 131], [533, 149] ], speed: [50,250], clickType: 1 })
		Sleep(Random(200, 500))

		; [BUTTON] X
		; mouse({ point: [ [831, 152], [847, 166] ], speed: [50,250], clickType: 1 })
		Send '{Esc}'
		Sleep(Random(20, 100))
		Send '{Esc}'
		Sleep(Random(1500, 2000))

		; [LI] Leads
		mouse({ point: [ [577, 210], [607, 224] ], speed: [50,250], clickType: 1 })
		Sleep(Random(1000, 2500))

		; [BUTTON] Novo lead
		mouse({ point: [ [26, 274], [972, 270] ], speed: [50,250], clickType: 1 })
		Sleep(Random(2000, 3500))

		; [INPUT] Primeiro Nome
		mouse({ point: [ [181, 380], [818, 380] ], speed: [50,250], clickType: 1 })
		Sleep(Random(40, 100))
		; input(primeiroNome, 500)
		A_Clipboard := primeiroNome
		Send('^V')
		Sleep(Random(40, 100))

		; [INPUT] Sobrenome
		mouse({ point: [ [180, 441], [817, 438] ], speed: [50,250], clickType: 1 })
		Sleep(Random(40, 100))
		;input(sobrenome, 500)
		A_Clipboard := sobrenome
		Send('^V')
		Sleep(Random(40, 100))

		; [INPUT] Email
		mouse({ point: [ [180, 513], [469, 509] ], speed: [50,250], clickType: 1 })
		Sleep(Random(40, 100))
		;input(email, 500)
		A_Clipboard := email
		Send('^V')
		Sleep(Random(40, 100))

		; [INPUT] Telefone
		mouse({ point: [ [528, 510], [824, 508] ], speed: [50,250], clickType: 1 })
		Sleep(Random(40, 100))
		;input('55' telefone, 500)
		A_Clipboard := '55' telefone
		Send('^V')
		Sleep(Random(40, 100))

		; [INPUT] Razão social
		mouse({ point: [ [177, 573], [469, 572] ], speed: [50,250], clickType: 1 })
		Sleep(Random(40, 100))
		; input(razaoSocial, 500)
		A_Clipboard := razaoSocial
		Send('^V')
		Sleep(Random(40, 100))

		; [INPUT] CNPJ
		mouse({ point: [ [531, 573], [818, 574] ], speed: [50,250], clickType: 1 })
		Sleep(Random(40, 100))
		;input(cnpj, 500)
		A_Clipboard := cnpj
		Send('^V')
		Sleep(Random(40, 100))

		; [BUTTON] Novo lead
		mouse({ point: [ [466, 639], [539, 645] ], speed: [50,250], clickType: 1 })
		Sleep(Random(40, 100))

		Sleep(2000)
		title := 'INDICAÇÃO AUTOMÁTICA', text := 'Terminado!'
		; MsgBox(title '`n' text)
		notification(title, text, 2)

		; ========================================================================================================================
	} catch Error as err {
		MsgBox 'ERRO: ' err.What '`nMessage: ' err.Message
	}
	isRunning := false
}

