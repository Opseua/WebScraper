// let infAwaitLoad, retAwaitLoad // 'logFun': true,
// infAwaitLoad = {e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retAwaitLoad = await awaitLoad(infAwaitLoad)
// console.log(retAwaitLoad)

let e = import.meta.url, ee = e;
async function awaitLoad(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { browser, page, element, } = inf;
        if (element) { // SELECTOR #jo_encontrados
            ret['msg'] = `AWAIT LOAD: ERRO | INFORMAR O 'element'`;
        } else {
            // AGUARDAR ELEMENTO
            await page.waitForSelector(element, {
                visible: true,
            });
            await new Promise(resolve => { setTimeout(resolve, 500); });
            ret['msg'] = `AWAIT ELEMENT: OK`;
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
(eng ? window : global)['awaitLoad'] = awaitLoad;


