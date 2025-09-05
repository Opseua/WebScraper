; #NoTrayIcon
CoordMode("Mouse", "Screen")

pi := 3.14159265359

MapSpeedToTime(vel) {
    vel := Max(1, vel)
    vel := Min(1000, vel)
    return 50 + (vel / 1000) * 1450
}

RandomOffset(min, max) {
    return Random(min, max)
}

EaseInOut(t) {
    global pi
    return 0.5 * (1 - Cos(t * pi))
}

mouse(params) {
    button := params.clickType ? params.clickType : 1

    ; Define alvo pelo array de pontos
    if IsObject(params.point) {
        if params.point.Length = 1 {
            targetX := params.point[1][1]
            targetY := params.point[1][2]
        } else {
            ; calcula min e max de X e Y
            minX := params.point[1][1]
            maxX := params.point[1][1]
            minY := params.point[1][2]
            maxY := params.point[1][2]

            for index, coord in params.point {
                if coord[1] < minX
                    minX := coord[1]
                if coord[1] > maxX
                    maxX := coord[1]
                if coord[2] < minY
                    minY := coord[2]
                if coord[2] > maxY
                    maxY := coord[2]
            }

            targetX := Random(minX, maxX)
            targetY := Random(minY, maxY)
        }
    } else {
        MsgBox("Erro: é necessário informar 'point'")
        Return
    }

    ; Velocidade aleatória
    if IsObject(params.speed) && params.speed.Length = 2 {
        vel := Random(params.speed[1], params.speed[2])
    } else {
        vel := params.speed ? params.speed : 50
    }

    totalTime := MapSpeedToTime(vel)

    startX := 0
    startY := 0
    MouseGetPos(&startX, &startY)

    dx := targetX - startX
    dy := targetY - startY
    distance := Sqrt(dx*dx + dy*dy)
    steps := Max(3, Ceil(distance / 50))
    pause := totalTime / steps

    Loop steps {
        t := A_Index / steps
        frac := EaseInOut(t)
        x := startX + dx*frac + RandomOffset(-3,3)
        y := startY + dy*frac + RandomOffset(-3,3)

        if Random(1,100) > 85 {
            x += RandomOffset(-5,5)
            y += RandomOffset(-5,5)
        }

        MouseMove(x,y)
        Sleep(Max(0, pause + RandomOffset(-5,5)))
    }

    MouseMove(targetX + RandomOffset(-2,2), targetY + RandomOffset(-2,2))
    Sleep(20 + RandomOffset(0,20))

    if button = 1 {
        Click("down","left")
        Sleep(Random(20,60))
        Click("up","left")
    } else if button = 2 {
        Click("down","right")
        Sleep(Random(20,60))
        Click("up","right")
    }
}

; EXEMPLO USANDO PONTO ÚNICO
; mouse({ point: [ [394, 524] ], speed: [1,50], clickType: 1 })

; EXEMPLO USANDO MULTIPLOS PONTOS
; mouse({ point: [ [322, 523], [943, 524], [1544, 524] ], speed: [1,50], clickType: 1 })
