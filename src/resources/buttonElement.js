// let infButtonElement, retButtonElement // 'logFun': true,
// infButtonElement = { 'e': e,'browser': browser, 'page': page, 'button': 'search' }
// retButtonElement = await buttonElement(infButton)
// console.log(retButtonElement)

let e = import.meta.url, ee = e;
async function buttonElement(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        let element
        if (!inf.button || !['search', 'first', 'prev', 'next', 'last'].includes(inf.button)) {
            ret['msg'] = `BUTTON: ERRO | INFORMAR O 'action'`;
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

    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ [buttonElement] TRYCATCH Script erro!`
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
    window['buttonElement'] = buttonElement;
} else { // NODEJS
    global['buttonElement'] = buttonElement;
}
