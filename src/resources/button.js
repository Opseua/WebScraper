// let infButton, retButton
// infButton = { 'browser': browser, 'page': page, 'button': 'search' }
// retButton = await button(infButton)
// console.log(retButton)

async function buttonElement(inf) {
    await import('./@export');
    let ret = { 'ret': false };
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
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': false, 'status1': 'TRYCATCH [buttonElement] Script erro!' }
        let retSendData = await sendData(infSendData)
        process.exit();
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
