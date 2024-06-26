// let infCheckPage, retCheckPage // 'logFun': true,
// infCheckPage = {'e': e, 'body': body }
// retCheckPage = await checkPage(infCheckPage)
// console.log(retCheckPage)

let e = import.meta.url, ee = e
async function checkPage(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        let infLog, retLog
        let { body, search } = inf
        if (!body) {
            ret['msg'] = `\n\n #### ERRO #### CHECK PAGE \n INFORMAR O 'body' \n\n`;
        } else {
            ret['msg'] = `Erro não definido`;
            if (search) {
                ret['ret'] = body.includes(search)
                ret['msg'] = ret.ret ? `ENCONTRADO [SIM]: '${search}'` : `ENCONTRADO [NÃO]: '${search}'`
                if (!ret.ret) {
                    let errMsg = `$ ${ret.msg}`
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': body }
                    retLog = await log(infLog);
                }
            } else {
                if (body.includes('Digite o código da imagem')) {
                    ret['msg'] = `Cookie expirou`;
                } else if (!(body.includes('Mostrando') && body.includes('Anterior') && body.includes('Próximo'))) {
                    ret['msg'] = `Não achou a lista de NIRE's`;
                    let errMsg = `$ ${ret.msg}`
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': body }
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

        let errMsg = `$ TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        let retSendData = await sendData(infSendData)
    }; return { ...({ ret: ret.ret }), ...(ret.msg && { msg: ret.msg }), ...(ret.res && { res: ret.res }), };
};

// CHROME | NODEJS
(eng ? window : global)['checkPage'] = checkPage