// let infAwaitLoad, retAwaitLoad
// infAwaitLoad = {'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retAwaitLoad = await awaitLoad(infAwaitLoad); console.log(retAwaitLoad)

let e = import.meta.url, ee = e;
async function awaitLoad(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        if (!inf.element) { // SELECTOR #jo_encontrados
            ret['msg'] = `AWAIT LOAD: ERRO | INFORMAR O 'element'`;
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

    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ [awaitLoad] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
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
