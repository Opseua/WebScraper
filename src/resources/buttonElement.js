// let infButton, retButton // 'logFun': true,
// infButton = { 'e': e,'browser': browser, 'page': page, 'button': 'search' }
// retButton = await button(infButton)
// console.log(retButton)

let e = import.meta.url;
async function buttonElement(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        let errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } };
        if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
        else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    }
    try {
        let element
        if (!inf.button || !['search', 'first', 'prev', 'next', 'last'].includes(inf.button)) {
            ret['msg'] = `\n\n #### ERRO #### BUTTON \n INFORMAR O 'action' \n\n`;
        } else {
            let button
            if (inf.button == 'search') { // PESQUISAR (XPATH)
                button = `//*[@id="ctl00_cphContent_frmBuscaAvancada_btPesquisar"]`
            } else if (inf.button == 'first') { // PRIMEIRA PÁGINA [first] (XPATH)
                button = `//*[@id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrFirst_lbtText"]`
            } else if (inf.button == 'prev') { // PÁGINA ANTERIOR [prev] (XPATH)
                button = `//*[@id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrPrev_lbtText"]`
            } else if (inf.button == 'next') { // PRÓXIMA PÁGINA [next] (XPATH)
                button = `//*[@id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrNext_lbtText"]`
            } else if (inf.button == 'last') { // ÚLTIMA PÁGINA [last] (XPATH)
                button = `//*[@id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrLast_lbtText"]`
            }
            let browser = inf.browser
            let page = inf.page
            // CLICAR NO BOTÃO PRÓXIMA PÁGINA
            element = await page.$x(button)
            await element[0].click()
            ret['msg'] = `BUTTON ELEMENT: OK [${inf.button}]`;
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

        let err = `$ [buttonElement] TRYCATCH Script erro!`
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
    window['buttonElement'] = buttonElement;
} else { // NODEJS
    global['buttonElement'] = buttonElement;
}
