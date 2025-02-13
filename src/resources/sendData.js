// let infSendData, retSendData // 'logFun': true,
// infSendData = { e, 'stop': true, 'status1': 'MENSAGEM AQUI', 'results': 'INFORMACAO PARA ENVIAR' }
// retSendData = await sendData(infSendData)
// console.log(retSendData)

let e = import.meta.url, ee = e;
async function sendData(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { status1, status2, results, id = gO.inf.sheetId, tab = gO.inf.sheetTab, range = 'A32', } = inf;
        // # Aguarde...                                →→→ SERÁ REINICIADO [NÃO] | PARADO [?]
        // # Iniciando script, aguarde                 →→→ SERÁ REINICIADO [NÃO] | PARADO [NÃO]
        // $ Erro ao pegar-enviar dados para planilha  →→→ SERÁ REINICIADO [NÃO] | PARADO [SIM]
        // $ Cookie inválido!                          →→→ SERÁ REINICIADO [NÃO] | PARADO [SIM]
        // @ TRYCATCH Script erro!                     →→→ SERÁ REINICIADO [SIM] | PARADO [SIM]

        let time = dateHour().res;

        // ENVIAR DADOS DA PLANILHA
        if (status1 || status2 || results) {
            // [STATUS1]
            if (status1) {
                range = gO.inf.sheetKepp && gO.inf.sheetKepp.range && gO.inf.sheetKepp.range.status1 ? gO.inf.sheetKepp.range.status1 : 'A32';
                let sheetData = typeof status1 === 'object' ? JSON.parse(status1) : status1;
                let infGoogleSheets = {
                    e, 'action': 'send',
                    'id': id,
                    'tab': tab,
                    'range': range,
                    'values': [[`${time.tim} | ${sheetData}`,],],
                };
                let retGoogleSheets = await googleSheets(infGoogleSheets);
                if (!retGoogleSheets.ret) { logConsole({ e, ee, 'msg': `ERRO GOOGLE SHEETS`, }); return retGoogleSheets; } else { retGoogleSheets = retGoogleSheets.msg; }
            }

            // [STATUS2]
            if (status2) {
                range = gO.inf.sheetKepp && gO.inf.sheetKepp.range && gO.inf.sheetKepp.range.status2 ? gO.inf.sheetKepp.range.status2 : 'A34';
                let sheetData = typeof status2 === 'object' ? JSON.parse(status2) : status2;
                let infGoogleSheets = {
                    e, 'action': 'send',
                    'id': id,
                    'tab': tab,
                    'range': range,
                    'values': [[`${time.tim} | ${sheetData}`,],],
                };
                let retGoogleSheets = await googleSheets(infGoogleSheets);
                if (!retGoogleSheets.ret) { logConsole({ e, ee, 'msg': `ERRO GOOGLE SHEETS`, }); return retGoogleSheets; } else { retGoogleSheets = retGoogleSheets.msg; }
            }

            // [RESULTS]
            if (results) {
                let sheetData = typeof results === 'object' ? JSON.parse(results) : results;
                let infGoogleSheets = {
                    e, 'action': 'send',
                    'id': id,
                    'tab': tab,
                    'range': 'D**',
                    'values': [[`${sheetData}`,],],
                };
                let retGoogleSheets = await googleSheets(infGoogleSheets);
                if (!retGoogleSheets.ret) { logConsole({ e, ee, 'msg': `ERRO GOOGLE SHEETS`, }); return retGoogleSheets; } else { retGoogleSheets = retGoogleSheets.msg; }
            }
        }
        ret['msg'] = 'SEND DATA: OK';
        ret['ret'] = true;

        // STOP
        if (inf.stop) {
            gO.inf['stop'] = true;
            await commandLine({ e, 'command': `${fileProjetos}/WebScraper/src/${gO.inf.shortcut}/OFF.vbs FORCE_STOP`, }); await new Promise(resolve => { setTimeout(resolve, 7000); }); process.exit();
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        process.exit();
    };

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
};

// CHROME | NODEJS
(eng ? window : global)['sendData'] = sendData;


