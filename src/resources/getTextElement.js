// let infGetTextElement, retGetTextElement // 'logFun': true,
// infGetTextElement = {e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retGetTextElement = await getTextElement(infGetTextElement)
// console.log(retGetTextElement)

let e = import.meta.url, ee = e
async function getTextElement(inf) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let infRegex, retRegex
        let { browser, page, element, value } = inf
        if (!element) { // SELECTOR #jo_encontrados
            ret['msg'] = `GET TEXT ELEMENT: ERRO | INFORMAR O 'element'`;
        } else {
            if (element == 'results') {
                infRegex = { e, 'pattern': `$lbtSelecionar','')">(.*?)</a>`, 'text': value.replace(/\n/g, ' ') }
                retRegex = regex(infRegex); retRegex = String(retRegex.res['5']);
                let nire = retRegex.split(',')
                infRegex = { e, 'pattern': `pgrGridView_lblResults">Mostrando (.*?)</div><span id="`, 'text': value.replace(/\n/g, ' ') }
                retRegex = regex(infRegex); retRegex = String(retRegex.res['5'])
                retRegex = retRegex.replace('</span> de <span id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_lblResultCount"', '')
                retRegex = retRegex.split('</span>')
                retRegex = retRegex[0].replace(' - ', ',').replace('>', ',').replace('.', '')
                retRegex = retRegex.split(',')
                let resultsPage = retRegex
                ret['res'] = [resultsPage, nire];
            } else {
                // PEGAR VALOR DO ELEMENTO
                let element = await page.waitForSelector(element);
                let value = await element.evaluate(el => el.textContent);
                ret['res'] = value;
            }
            ret['msg'] = `GET TEXT ELEMENT: OK`;
            ret['ret'] = true;
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];

        let errMsg = `% TRYCATCH Script erro!`
        let infSendData = { e, 'stop': true, 'status1': errMsg }
        await sendData(infSendData)
    };

    return { ...({ 'ret': ret.ret }), ...(ret.msg && { 'msg': ret.msg }), ...(ret.res && { 'res': ret.res }), };
};

// CHROME | NODEJS
(eng ? window : global)['getTextElement'] = getTextElement