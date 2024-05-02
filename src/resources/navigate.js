// let infNavigate, retNavigate // 'logFun': true,
// infNavigate = {'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retNavigate = await navigate(infNavigate)
// console.log(retNavigate)

let e = import.meta.url, ee = e;
async function navigate(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        if (!inf.url) {
            ret['msg'] = `NAVIGATE: ERRO | INFORMAR O 'url'`;
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

    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ [navigate] TRYCATCH Script erro!`
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
    window['navigate'] = navigate;
} else { // NODEJS
    global['navigate'] = navigate;
}
