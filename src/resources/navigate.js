// let infNavigate, retNavigate // 'logFun': true,
// infNavigate = {'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retNavigate = await navigate(infNavigate)
// console.log(retNavigate)

let e = import.meta.url, ee = e
async function navigate(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
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
        if (inf && inf.logFun) {
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; file(infFile);
        }
    } catch (err) {
        let retRegexE = await regexE({ 'inf': inf, 'e': err, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        let retSendData = await sendData(infSendData)
    }; return { ...({ ret: ret.ret }), ...(ret.msg && { msg: ret.msg }), ...(ret.res && { res: ret.res }), };
};

// CHROME | NODEJS
(eng ? window : global)['navigate'] = navigate