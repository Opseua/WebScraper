// let infImput, retImput // 'logFun': true,
// infImput = {'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': '13112023' }
// retImput = await imput(infImput)
// console.log(retImput)

let e = import.meta.url, ee = e
async function imput(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        let { browser, page, element, value } = inf
        if (!element) {
            ret['msg'] = `\n\n #### ERRO #### IMPUT \n INFORMAR O 'element' \n\n`;
        } else if (!value) {
            ret['msg'] = `\n\n #### ERRO #### IMPUT \n INFORMAR O 'value' \n\n`;
        } else {
            // IMPUTAR VALOR
            await page.focus(element)
            page.keyboard.type(value)
            ret['msg'] = `IMPUT: OK`;
            ret['ret'] = true;
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        await sendData(infSendData)
    }; return { ...({ ret: ret.ret }), ...(ret.msg && { msg: ret.msg }), ...(ret.res && { res: ret.res }), };
};

// CHROME | NODEJS
(eng ? window : global)['imput'] = imput