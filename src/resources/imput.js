// let infImput, retImput // 'logFun': true,
// infImput = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': '13112023' }
// retImput = await imput(infImput)
// console.log(retImput)

async function imput(inf) {
    let ret = { 'ret': false };
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
        if (inf.logFun) {
            let infFile = { 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }, retFile
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; retFile = await file(infFile);
        }
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res

        let err = `[imput] TRYCATCH Script erro!`
        console.log(e);
        let infSendData = { 'stop': true, 'status1': err }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}

if (eng) { // CHROME
    window['imput'] = imput;
} else { // NODEJS
    global['imput'] = imput;
}
