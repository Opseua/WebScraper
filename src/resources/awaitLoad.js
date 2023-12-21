// let infAwaitLoad, retAwaitLoad // 'logFun': true,
// infAwaitLoad = {'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retAwaitLoad = await awaitLoad(infAwaitLoad)
// console.log(retAwaitLoad)

let e = import.meta.url;
async function awaitLoad(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        let errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } };
        if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
        else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    }
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
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }, retFile
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; retFile = await file(infFile);
        }
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let err = `[awaitLoad] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': err }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}

if (eng) { // CHROME
    window['awaitLoad'] = awaitLoad;
} else { // NODEJS
    global['awaitLoad'] = awaitLoad;
}
