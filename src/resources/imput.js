// let infImput, retImput // 'logFun': true,
// infImput = {'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': '13112023' }
// retImput = await imput(infImput)
// console.log(retImput)

let e = import.meta.url, ee = e
async function imput(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        if (!inf.element) {
            ret['msg'] = `\n\n #### ERRO #### IMPUT \n INFORMAR O 'element' \n\n`;
        } else if (!inf.value) {
            ret['msg'] = `\n\n #### ERRO #### IMPUT \n INFORMAR O 'value' \n\n`;
        } else {
            let browser = inf.browser
            let page = inf.page

            // IMPUTAR VALOR
            await page.focus(inf.element)
            page.keyboard.type(inf.value)
            ret['msg'] = `IMPUT: OK`;
            ret['ret'] = true;
        }

        // ### LOG FUN ###
        if (inf && inf.logFun) {
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; file(infFile);
        }
    } catch (err) {
        let retRegexE = await regexE({ 'inf': inf, 'e': err, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        let retSendData = await sendData(infSendData)
    }; return { ...({ ret: ret.ret }), ...(ret.msg && { msg: ret.msg }), ...(ret.res && { res: ret.res }), };
};

// CHROME | NODEJS
(eng ? window : global)['imput'] = imput