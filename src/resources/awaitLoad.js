// let infAwaitLoad, retAwaitLoad
// infAwaitLoad = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retAwaitLoad = await awaitLoad(infAwaitLoad)
// console.log(retAwaitLoad)

async function awaitLoad(inf) {
    await import('../../../Chrome_Extension/src/resources/@functions.js');
    let ret = { 'ret': false };
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
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': false, 'status1': 'TRYCATCH [awaitLoad] Script erro!' }
        let retSendData = await sendData(infSendData)
        process.exit();
    };
    return {
        ...(ret.ret && { ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}


if (typeof eng === 'boolean') {
    if (eng) { // CHROME
        window['awaitLoad'] = awaitLoad;
    } else { // NODEJS
        global['awaitLoad'] = awaitLoad;
    }
}