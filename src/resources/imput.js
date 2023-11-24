// let infImput, retImput
// infImput = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': '13112023' }
// retImput = await imput(infImput)
// console.log(retImput)

async function imput(inf) {
    await import('../../../Chrome_Extension/src/resources/@functions.js');
    let ret = { 'ret': false };
    try {
        if (!inf.element) {
            ret['msg'] = `\n\n #### ERRO #### IMPUT \n INFORMAR O 'element' \n\n`;
        } else if (!inf.value) {
            ret['msg'] = `\n\n #### ERRO #### IMPUT \n INFORMAR O 'value' \n\n`;
        } else {
            let browser = inf.browser
            let page = inf.page
            // DATA INÍCIO (SELECTOR) #ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio
            // DATA INÍCIO (SELECTOR) #ctl00_cphContent_frmBuscaAvancada_txtDataAberturaFim
            // IMPUTAR VALOR
            await page.focus(inf.element)
            page.keyboard.type(inf.value)
            ret['msg'] = `IMPUT: OK`;
            ret['ret'] = true;
        }
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': false, 'status1': 'TRYCATCH [imput] Script erro!' }
        let retSendData = await sendData(infSendData)
        process.exit();
    };
    return ret
}

if (typeof eng === 'boolean') {
    if (eng) { // CHROME
        window['imput'] = imput;
    } else { // NODEJS
        global['imput'] = imput;
    }
}