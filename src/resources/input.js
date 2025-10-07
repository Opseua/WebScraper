// let infInput, retInput
// infInput = {e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': '13112023' }
// retInput = await input(infInput)
// console.log(retInput)

let e = import.meta.url, ee = e;
async function input(inf = {}) {
    let ret = { 'ret': false, }; e = inf.e || e;
    try {
        let { browser, page, element, value, } = inf;
        if (!element) {
            ret['msg'] = `INPUT: ERRO | INFORMAR O 'element'`;
        } else if (!value) {
            ret['msg'] = `INPUT: ERRO | INFORMAR O 'value'`;
        } else {
            // IMPUTAR VALOR
            await page.focus(element);
            page.keyboard.type(value);
            ret['msg'] = `INPUT: OK`;
            ret['ret'] = true;
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['input'] = input;


