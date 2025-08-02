// let infButtonElement, retButtonElement
// infButtonElement = { e,'browser': browser, 'page': page, 'button': 'search' }
// retButtonElement = await buttonElement(infButton)
// console.log(retButtonElement)

let e = import.meta.url, ee = e;
async function buttonElement(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { browser, page, element, button, } = inf;
        if (!button || !['search', 'first', 'prev', 'next', 'last',].includes(button)) {
            ret['msg'] = `BUTTON: ERRO | INFORMAR O 'action'`;
        } else {
            if (button === 'search') { // PESQUISAR (XPATH)
                // button = `//*[@id="ctl00_cphContent_frmBuscaAvancada_btPesquisar"]`
                button = `#ctl00_cphContent_frmBuscaAvancada_btPesquisar`;
            } else if (button === 'first') { // PRIMEIRA PÁGINA [first] (XPATH)
                // button = `//*[@id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrFirst_lbtText"]`
                button = `#ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrFirst_lbtText`;
            } else if (button === 'prev') { // PÁGINA ANTERIOR [prev] (XPATH)
                // button = `//*[@id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrPrev_lbtText"]`
                button = `#ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrPrev_lbtText`;
            } else if (button === 'next') { // PRÓXIMA PÁGINA [next] (XPATH)
                // button = `//*[@id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrNext_lbtText"]`
                button = `#ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrNext_lbtText`;
            } else if (button === 'last') { // ÚLTIMA PÁGINA [last] (XPATH)
                // button = `//*[@id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrLast_lbtText"]`
                button = `#ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrLast_lbtText`;
            }
            // CLICAR NO BOTÃO PRÓXIMA PÁGINA
            // element = await page.$x(button)
            // await element[0].click()
            await page.click(button);

            ret['msg'] = `BUTTON ELEMENT: OK [${button}]`;
            ret['ret'] = true;
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['buttonElement'] = buttonElement;


