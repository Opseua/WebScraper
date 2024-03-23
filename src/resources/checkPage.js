// let infCheckPage, retCheckPage // 'logFun': true,
// infCheckPage = {'e': e, 'body': body }
// retCheckPage = await checkPage(infCheckPage)
// console.log(retCheckPage)

let e = import.meta.url, ee = e
async function checkPage(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        let errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } };
        if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
        else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    }
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
                    let errMsg = `$ [checkPage] ${ret.msg}`
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': inf.body }
                    retLog = await log(infLog);
                }
            } else {
                if (inf.body.includes('Digite o código da imagem')) {
                    ret['msg'] = `Cookie expirou`;
                } else if (!(inf.body.includes('Mostrando') && inf.body.includes('Anterior') && inf.body.includes('Próximo'))) {
                    ret['msg'] = `Não achou a lista de NIRE's`;
                    let errMsg = `$ [checkPage] ${ret.msg}`
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': inf.body }
                    retLog = await log(infLog);
                } else {
                    ret['msg'] = `NIRE's ENCONTRADOS`;
                    ret['ret'] = true;
                }
            }
        }

        // ### LOG FUN ###
        if (inf && inf.logFun) {
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; file(infFile);
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, 'catchGlobal': false });
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
