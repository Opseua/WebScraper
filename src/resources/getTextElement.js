// let infGetTextElement, retGetTextElement
// infGetTextElement = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retGetTextElement = await getTextElement(infGetTextElement)
// console.log(retGetTextElement)

async function getTextElement(inf) {
    await import('../../../Chrome_Extension/src/resources/@functions.js');
    let ret = { 'ret': false };
    try {
        if (!inf.element) { // SELECTOR #jo_encontrados
            ret['msg'] = `\n\n #### ERRO #### RESULTS \n INFORMAR O 'element' \n\n`;
        } else {
            let browser = inf.browser
            let page = inf.page
            // PEGAR VALOR DO ELEMENTO
            let element = await page.waitForSelector(inf.element);
            let value = await element.evaluate(el => el.textContent);
            ret['res'] = value;
            ret['msg'] = `GET TEXT ELEMENT: OK`;
            ret['ret'] = true;
        }
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
    };
    return ret
}

if (typeof eng === 'boolean') {
    if (eng) { // CHROME
        window['getTextElement'] = getTextElement;
    } else { // NODEJS
        global['getTextElement'] = getTextElement;
    }
}