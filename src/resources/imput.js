// let infImput, retImput // 'logFun': true,
// infImput = {e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': '13112023' }
// retImput = await imput(infImput)
// console.log(retImput)

let e = import.meta.url, ee = e;
async function imput(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { browser, page, element, value, } = inf;
        if (!element) {
            ret['msg'] = `IMPUT: ERRO | INFORMAR O 'element'`;
        } else if (!value) {
            ret['msg'] = `IMPUT: ERRO | INFORMAR O 'value'`;
        } else {
            // IMPUTAR VALOR
            await page.focus(element);
            page.keyboard.type(value);
            ret['msg'] = `IMPUT: OK`;
            ret['ret'] = true;
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];

        let errMsg = `% TRYCATCH Script erro!`;
        let infSendData = { e, 'stop': true, 'status1': errMsg, };
        await sendData(infSendData);
    };

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
};

// CHROME | NODEJS
(eng ? window : global)['imput'] = imput;


