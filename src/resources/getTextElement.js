// let infGetTextElement, retGetTextElement // 'logFun': true,
// infGetTextElement = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retGetTextElement = await getTextElement(infGetTextElement)
// console.log(retGetTextElement)

let e = import.meta.url;
async function getTextElement(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        const errs = async (err, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': err, 'inf': inf, 'catchGlobal': true }) } }
        if (typeof window !== 'undefined') { window.addEventListener('error', (err) => errs(err, ret)); window.addEventListener('unhandledrejection', (err) => errs(err, ret)) }
        else { process.on('uncaughtException', (err) => errs(err, ret)); process.on('unhandledRejection', (err) => errs(err, ret)) }
    }
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

        // ### LOG FUN ###
        if (inf && inf.logFun) {
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }, retFile
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; retFile = await file(infFile);
        }
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let err = `[getTextElement] TRYCATCH Script erro!`
        let infSendData = { 'stop': true, 'status1': err }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}

if (eng) { // CHROME
    window['getTextElement'] = getTextElement;
} else { // NODEJS
    global['getTextElement'] = getTextElement;
}
