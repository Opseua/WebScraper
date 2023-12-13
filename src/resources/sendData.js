// let infSendData, retSendData // 'logFun': true,
// infSendData = { 'stop': true, 'status1': 'MENSAGEM AQUI', 'results': 'INFORMACAO PARA ENVIAR' }
// retSendData = await sendData(infSendData)
// console.log(retSendData)

let e = import.meta.url;
async function sendData(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    // if (catchGlobal) {
    //     const errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } };
    //     if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
    //     else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    // }
    try {
        let time = dateHour().res
        let id = inf && inf.id ? inf.id : gO.inf.sheetId ? gO.inf.sheetId : '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8'
        let tab = inf && inf.tab ? inf.tab : gO.inf.sheetTab ? gO.inf.sheetTab : 'RESULTADOS'
        let range = inf && inf.range ? inf.range : 'A32'

        // ENVIAR DADOS DA PLANILHA
        if (inf.status1 || inf.status2 || inf.results) {
            // [STATUS1]
            if (inf.status1) {
                range = gO.inf.sheetKepp && gO.inf.sheetKepp.range && gO.inf.sheetKepp.range.status1 ? gO.inf.sheetKepp.range.status1 : 'A32'
                let sheetData = typeof inf.status1 === 'object' ? JSON.parse(inf.status1) : inf.status1
                let infGoogleSheet = {
                    'action': 'send',
                    'id': id,
                    'tab': tab,
                    'range': range,
                    'values': [[`${time.tim} | ${sheetData}`]]
                }
                let retGoogleSheet = await googleSheet(infGoogleSheet);
                if (!retGoogleSheet.ret) { console.log('ERRO GOOGLE SHEETS'); return retGoogleSheet } else { retGoogleSheet = retGoogleSheet.msg }
            }

            // [STATUS2]
            if (inf.status2) {
                range = gO.inf.sheetKepp && gO.inf.sheetKepp.range && gO.inf.sheetKepp.range.status2 ? gO.inf.sheetKepp.range.status2 : 'A34'
                let sheetData = typeof inf.status2 === 'object' ? JSON.parse(inf.status2) : inf.status2
                let infGoogleSheet = {
                    'action': 'send',
                    'id': id,
                    'tab': tab,
                    'range': range,
                    'values': [[`${time.tim} | ${sheetData}`]]
                }
                let retGoogleSheet = await googleSheet(infGoogleSheet);
                if (!retGoogleSheet.ret) { console.log('ERRO GOOGLE SHEETS'); return retGoogleSheet } else { retGoogleSheet = retGoogleSheet.msg }
            }

            // [RESULTS]
            if (inf.results) {
                let sheetData = typeof inf.results === 'object' ? JSON.parse(inf.results) : inf.results
                let infGoogleSheet = {
                    'action': 'send',
                    'id': id,
                    'tab': tab,
                    'range': 'D**',
                    'values': [[`${sheetData}`]]
                }
                let retGoogleSheet = await googleSheet(infGoogleSheet);
                if (!retGoogleSheet.ret) { console.log('ERRO GOOGLE SHEETS'); return retGoogleSheet } else { retGoogleSheet = retGoogleSheet.msg }
            }
        }
        ret['msg'] = 'SEND DATA: OK'
        ret['ret'] = true

        // ### LOG FUN ###
        if (inf && inf.logFun) {
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }, retFile
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; retFile = await file(infFile);
        }

        // STOP
        if (inf.stop) {
            gO.inf['stop'] = true
            process.exit();
        }
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e, 'catchGlobal': false });
        ret['msg'] = retRegexE.res
        process.exit();
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}

if (eng) { // CHROME
    window['sendData'] = sendData;
} else { // NODEJS
    global['sendData'] = sendData;
}

