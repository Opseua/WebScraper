// let infCheckPage, retCheckPage
// infCheckPage = { 'body': body }
// retCheckPage = await checkPage(infCheckPage)
// console.log(retCheckPage)

async function checkPage(inf) {
    await import('../../../Chrome_Extension/src/resources/@functions.js');
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
                    infFile = { 'action': 'write', 'functionLocal': false, 'path': './log/Jucesp.txt', 'rewrite': false, 'text': inf.body }
                    retFile = await file(infFile); console.log(retFile)
                } else {
                    ret['msg'] = `NIRE's ENCONTRADOS`;
                    ret['ret'] = true;
                }
            }
        }
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': false, 'status1': 'TRYCATCH [checkPage] Script erro!' }
        let retSendData = await sendData(infSendData)
        process.exit();
    };
    return ret
}

if (typeof eng === 'boolean') {
    if (eng) { // CHROME
        window['checkPage'] = checkPage;
    } else { // NODEJS
        global['checkPage'] = checkPage;
    }
}