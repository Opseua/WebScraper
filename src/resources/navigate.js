// let infNavigate, retNavigate // 'logFun': true,
// infNavigate = { 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retNavigate = await navigate(infNavigate)
// console.log(retNavigate)

async function navigate(inf) {
    let ret = { 'ret': false };
    try {
        if (!inf.url) {
            ret['msg'] = `\n\n #### ERRO #### URL \n INFORMAR O 'url' \n\n`;
        } else {
            let browser = inf.browser
            let page = inf.page
            // NAVEGAR PARA URL
            await page.goto(inf.url, {
                waitUntil: 'networkidle2'
            });
            ret['msg'] = `NAVIGATE: OK`;
            ret['ret'] = true;
        }

        // ### LOG FUN ###
        if (inf.logFun) {
            let infFile = { 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }, retFile
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; retFile = await file(infFile);
        }
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': false, 'status1': 'TRYCATCH [navigate] Script erro!' }
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
    window['navigate'] = navigate;
} else { // NODEJS
    global['navigate'] = navigate;
}
