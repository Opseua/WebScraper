// let infGetTextElement, retGetTextElement // 'logFun': true,
// infGetTextElement = {'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_lblDescricao' }
// retGetTextElement = await getTextElement(infGetTextElement)
// console.log(retGetTextElement)

let e = import.meta.url, ee = e
async function getTextElement(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        let errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } };
        if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
        else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    }
    try {
        let infRegex, retRegex
        if (!inf.element) { // SELECTOR #jo_encontrados
            ret['msg'] = `\n\n #### ERRO #### RESULTS \n INFORMAR O 'element' \n\n`;
        } else {
            if (inf.element == 'results') {
                infRegex = { 'e': e, 'pattern': `$lbtSelecionar','')">(.*?)</a>`, 'text': inf.value.replace(/\n/g, ' ') }
                retRegex = regex(infRegex); retRegex = String(retRegex.res['5']);
                let nire = retRegex.split(',')
                infRegex = { 'e': e, 'pattern': `pgrGridView_lblResults">Mostrando (.*?)</div><span id="`, 'text': inf.value.replace(/\n/g, ' ') }
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
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; file(infFile);
        }
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let err = `$ [getTextElement] TRYCATCH Script erro!`
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
    window['getTextElement'] = getTextElement;
} else { // NODEJS
    global['getTextElement'] = getTextElement;
}
