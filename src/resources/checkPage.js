// let infCheckPage, retCheckPage // 'logFun': true,
// infCheckPage = { 'body': body }
// retCheckPage = await checkPage(infCheckPage)
// console.log(retCheckPage)

let e = import.meta.url;
async function checkPage(inf) {
    let ret = { 'ret': false };
    e = inf && inf.e ? inf.e : e;
    try {
        let infLog, retLog
        if (!inf.body) {
            ret['msg'] = `\n\n #### ERRO #### CHECK PAGE \n INFORMAR O 'body' \n\n`;
        } else {
            ret['msg'] = `Erro não definido`;
            if (inf.search) {
                ret['ret'] = inf.body.includes(inf.search)
                ret['msg'] = ret.ret ? `ENCONTRADO [SIM]: '${inf.search}'` : `ENCONTRADO [NÃO]: '${inf.search}'`
                if (!ret.ret) {
                    let err = `[checkPage] ${ret.msg}`
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': inf.body }
                    retLog = await log(infLog);
                }
            } else {
                if (inf.body.includes('Digite o código da imagem')) {
                    ret['msg'] = `Cookie expirou`;
                } else if (!(inf.body.includes('Mostrando') && inf.body.includes('Anterior') && inf.body.includes('Próximo'))) {
                    ret['msg'] = `Não achou a lista de NIRE's`;
                    let err = `[checkPage] ${ret.msg}`
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': inf.body }
                    retLog = await log(infLog);
                } else {
                    ret['msg'] = `NIRE's ENCONTRADOS`;
                    ret['ret'] = true;
                }
            }
        }

        // ### LOG FUN ###
        if (inf && inf.logFun) {
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }, retFile
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; retFile = await file(infFile);
        }
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e });
        ret['msg'] = retRegexE.res

        let err = `[checkPage] TRYCATCH Script erro!`
        let infSendData = { 'stop': true, 'status1': err }
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
