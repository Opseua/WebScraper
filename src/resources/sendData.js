// let infSendData, retSendData
// infSendData = { 'stop': true, 'status1': 'MENSAGEM AQUI', 'results': 'INFORMACAO PARA ENVIAR' }
// retSendData = await sendData(infSendData)
// console.log(retSendData)

async function sendData(inf) {
    await import('../../../Chrome_Extension/src/resources/@functions.js');
    let ret = { 'ret': false };
    try {
        let time = dateHour().res
        let id = inf && inf.id ? inf.id : gO.inf.sheetId ? gO.inf.sheetId : '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8'
        let tab = inf && inf.tab ? inf.tab : gO.inf.sheetTab ? gO.inf.sheetTab : 'RESULTADOS_CNPJ_2'
        let range = inf && inf.range ? inf.range : 'A29'

        // ENVIAR DADOS DA PLANILHA
        if (inf.status1 || inf.status2 || inf.results) {
            // [STATUS1]
            if (inf.status1) {
                range = gO.inf.sheetKepp && gO.inf.sheetKepp.range && gO.inf.sheetKepp.range.status1 ? gO.inf.sheetKepp.range.status1 : 'A29'
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
                range = gO.inf.sheetKepp && gO.inf.sheetKepp.range && gO.inf.sheetKepp.range.status2 ? gO.inf.sheetKepp.range.status2 : 'A31'
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
                    'range': 'D*',
                    'values': [[`${sheetData}`]]
                }
                let retGoogleSheet = await googleSheet(infGoogleSheet);
                if (!retGoogleSheet.ret) { console.log('ERRO GOOGLE SHEETS'); return retGoogleSheet } else { retGoogleSheet = retGoogleSheet.msg }
            }
        }

        // STOP
        if (inf.stop) {
            gO.inf['stop'] = true
            process.exit();
        }

        ret['msg'] = 'SEND DATA: OK'
        ret['ret'] = true
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        process.exit();
    };
    return ret
}

if (typeof eng === 'boolean') {
    if (eng) { // CHROME
        window['sendData'] = sendData;
    } else { // NODEJS
        global['sendData'] = sendData;
    }
}