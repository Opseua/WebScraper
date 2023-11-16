// let infSendData, retSendData
// infSendData = { 'stop': true, 'status': 'MENSAGEM AQUI', 'results': 'INFORMACAO PARA ENVIAR' }
// retSendData = await sendData(infSendData)
// console.log(retSendData)

async function sendData(inf) {
    await import('../../../Chrome_Extension/src/resources/@functions.js');
    let ret = { 'ret': false };
    try {
        let time = dateHour().res

        // ENVIAR DADOS DA PLANILHA
        if (inf.status || inf.results) {
            // [STATUS]
            if (inf.status) {
                let sheetData = typeof inf.status === 'object' ? JSON.parse(inf.status) : inf.status
                let infGoogleSheet = {
                    'action': 'send',
                    'id': '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8',
                    'tab': 'RESULTADOS_CNPJ_NEW',
                    'range': 'A40',
                    'values': [[`${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec} | ${sheetData.replace('KEEP ', '')}`]]
                }
                let retGoogleSheet = await googleSheet(infGoogleSheet);
                if (!retGoogleSheet.ret) { console.log('ERRO GOOGLE SHEETS'); return retGoogleSheet } else { retGoogleSheet = retGoogleSheet.msg }
            }

            // [RESULTS]
            if (inf.results) {
                let sheetData = typeof inf.results === 'object' ? JSON.parse(inf.results) : inf.results
                let infGoogleSheet = {
                    'action': 'send',
                    'id': '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8',
                    'tab': 'RESULTADOS_CNPJ_NEW',
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
            // if (inf.browser) {
            //     await browser.close();
            // }
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