// let infCheckPage, retCheckPage // 'logFun': true,
// infCheckPage = { 'body': body }
// retCheckPage = await checkPage(infCheckPage)
// console.log(retCheckPage)

async function checkPage(inf) {
    let ret = { 'ret': false };
    try {
        if (!inf.body) {
            ret['msg'] = `\n\n #### ERRO #### CHECK PAGE \n INFORMAR O 'body' \n\n`;
        } else {
            ret['msg'] = `Erro não definido`;
            if (inf.search) {
                ret['ret'] = inf.body.includes(inf.search)
                ret['msg'] = ret.ret ? `ENCONTRADO [SIM]: '${inf.search}'` : `ENCONTRADO [NÃO]: '${inf.search}'`
            } else {
                if (inf.body.includes('Digite o código da imagem')) {
                    ret['msg'] = `Cookie expirou`;
                } else if (!(inf.body.includes('Mostrando') && inf.body.includes('Anterior') && inf.body.includes('Próximo'))) {
                    ret['msg'] = `Não achou a lista de NIRE's`;
                    let infFile, retFile
                    infFile = { 'action': 'write', 'functionLocal': true, 'path': './log/Jucesp.txt', 'rewrite': false, 'text': inf.body }
                    retFile = await file(infFile); console.log(retFile)
                } else {
                    ret['msg'] = `NIRE's ENCONTRADOS`;
                    ret['ret'] = true;
                }
            }
        }

        // ### LOG FUN ###
        if (inf.logFun) {
            let infFile = { 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }, retFile
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; retFile = await file(infFile);
        }
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': false, 'status1': 'TRYCATCH [checkPage] Script erro!' }
        let retSendData = await sendData(infSendData)
        process.exit();
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
