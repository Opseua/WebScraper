// let infAwaitLoad, retAwaitLoad // 'logFun': true,
// infAwaitLoad = {'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retAwaitLoad = await awaitLoad(infAwaitLoad)
// console.log(retAwaitLoad)

let e = import.meta.url, ee = e
async function awaitLoad(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        if (!inf.element) { // SELECTOR #jo_encontrados
            ret['msg'] = `\n\n #### ERRO #### AWAIT LOAD \n INFORMAR O 'element' \n\n`;
        } else {
            let browser = inf.browser
            let page = inf.page
            // AGUARDAR ELEMENTO
            await page.waitForSelector(inf.element, {
                visible: true,
            });
            await new Promise(resolve => { setTimeout(resolve, 1000) })
            ret['msg'] = `AWAIT ELEMENT: OK`;
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
(eng ? window : global)['awaitLoad'] = awaitLoad