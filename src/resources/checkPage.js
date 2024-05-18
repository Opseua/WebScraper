// let infCheckPage, retCheckPage
// infCheckPage = {'e': e, 'body': body }
// retCheckPage = await checkPage(infCheckPage)
// console.log(retCheckPage)

let e = import.meta.url, ee = e;
async function checkPage(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        let infLog, retLog
        if (!inf.body) {
            ret['msg'] = `CHECK PAGE: ERRO | INFORMAR O 'body'`;
        } else {
            ret['msg'] = `CHECK PAGE: ERRO | NÃO DEFINIDO`;
            if (inf.search) {
                ret['ret'] = inf.body.includes(inf.search)
                ret['msg'] = ret.ret ? `ENCONTRADO [SIM]: '${inf.search}'` : `ENCONTRADO [NÃO]: '${inf.search}'`
                if (!ret.ret) {
                    let errMsg = `$ [checkPage] ${ret.msg}`
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': inf.body }
                    retLog = await log(infLog);
                }
            } else {
                if (inf.body.includes('Digite o código da imagem')) {
                    ret['msg'] = `CHECK PAGE: ERRO | COOKIE EXPIROU`;
                } else if (!(inf.body.includes('Mostrando') && inf.body.includes('Anterior') && inf.body.includes('Próximo'))) {
                    ret['msg'] = `CHECK PAGE: ERRO | NÃO ACHOU A LISTA DE NIRE'S`;
                    let errMsg = `$ [checkPage] ${ret.msg}`
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': inf.body }
                    retLog = await log(infLog);
                } else {
                    ret['msg'] = `NIRE's ENCONTRADOS`;
                    ret['ret'] = true;
                }
            }
        }

    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ [checkPage] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}

if (eng) { // CHROME
    window['checkPage'] = checkPage;
} else { // NODEJS
    global['checkPage'] = checkPage;
}
