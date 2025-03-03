// let infCheckPage, retCheckPage // 'logFun': true,
// infCheckPage = {e, 'body': body }
// retCheckPage = await checkPage(infCheckPage)
// console.log(retCheckPage)

let e = import.meta.url, ee = e;
async function checkPage(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let infLog;
        let { body, search, step, page, } = inf;
        if (!body) {
            ret['msg'] = `CHECK PAGE: ERRO | INFORMAR O 'body'`;
        } else {
            ret['msg'] = `Erro não definido`;
            if (search) {
                ret['ret'] = body.includes(search);
                ret['msg'] = ret.ret ? `ENCONTRADO [SIM]: '${search}'` : `ENCONTRADO [NÃO]: '${search}'`;
                if (!ret.ret) {
                    let errMsg = `% ${ret.msg}`;
                    infLog = { e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': body, };
                    await log(infLog);
                }
            } else if (body.includes('Digite o código da imagem')) {
                ret['msg'] = `Cookie inválido!`;
            } else if (step === 'CHECK PAGE [LISTA DE NIREs]' && !(body.includes('Mostrando') && body.includes('Anterior') && body.includes('Próximo'))) {
                ret['msg'] = `Não achou a lista de NIRE's`;
                try { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_5.jpg`, fullPage: true, }); }
                catch (catchErr) { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_5.jpg`, fullPage: false, }); }
                let errMsg = `% ${ret.msg}`;
                infLog = { e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': body, };
                await log(infLog);
            } else {
                ret['msg'] = `NIRE's ENCONTRADOS`;
                ret['ret'] = true;
            }
        }

        // await new Promise(resolve => { setTimeout(resolve, 100000) });

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}

// CHROME | NODEJS
globalThis['checkPage'] = checkPage;


