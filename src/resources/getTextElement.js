// let infGetTextElement, retGetTextElement
// infGetTextElement = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retGetTextElement = await getTextElement(infGetTextElement)
// console.log(retGetTextElement)

async function getTextElement(inf) {
    await import('../../../Chrome_Extension/src/resources/@functions.js');
    let ret = { 'ret': false };
    try {
        let infRegex, retRegex
        if (!inf.element) { // SELECTOR #jo_encontrados
            ret['msg'] = `\n\n #### ERRO #### RESULTS \n INFORMAR O 'element' \n\n`;
        } else {
            if (inf.element == 'results') {
                infRegex = { 'pattern': `$lbtSelecionar','')">(.*?)</a>`, 'text': inf.value.replace(/\n/g, ' ') }
                retRegex = regex(infRegex); retRegex = String(retRegex.res['5']);
                let nire = retRegex.split(',')
                infRegex = { 'pattern': `pgrGridView_lblResults">Mostrando (.*?)</div><span id="`, 'text': inf.value.replace(/\n/g, ' ') }
                retRegex = regex(infRegex); retRegex = String(retRegex.res['5'])
                retRegex = retRegex.replace('</span> de <span id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_lblResultCount"', '')
                retRegex = retRegex.split('</span>')
                retRegex = retRegex[0].replace(' - ', ',').replace('>', ',').replace('.', '')
                retRegex = retRegex.split(',')
                let resultsPage = retRegex
                ret['res'] = [resultsPage, nire];
            } else {
                let browser = inf.browser
                let page = inf.page
                // PEGAR VALOR DO ELEMENTO
                let element = await page.waitForSelector(inf.element);
                let value = await element.evaluate(el => el.textContent);
                ret['res'] = value;
            }
            ret['msg'] = `GET TEXT ELEMENT: OK`;
            ret['ret'] = true;
        }
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': false, 'status1': 'TRYCATCH [getTextElement] Script erro!' }
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
        window['getTextElement'] = getTextElement;
    } else { // NODEJS
        global['getTextElement'] = getTextElement;
    }
}