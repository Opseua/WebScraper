// let infNavigate, retNavigate // 'logFun': true,
// infNavigate = {e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retNavigate = await navigate(infNavigate)
// console.log(retNavigate)

let e = import.meta.url, ee = e;
async function navigate(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { browser, page, url, } = inf;
        if (!url) {
            ret['msg'] = `NAVIGATE: ERRO | INFORMAR O 'url'`;
        } else {
            // NAVEGAR PARA URL
            await page.goto(url, {
                waitUntil: 'networkidle2',
            });
            ret['msg'] = `NAVIGATE: OK`;
            ret['ret'] = true;
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];

        let errMsg = `% TRYCATCH Script erro!`;
        let infSendData = { e, 'stop': true, 'status1': errMsg, };
        await sendData(infSendData);
    };

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
};

// CHROME | NODEJS
(eng ? window : global)['navigate'] = navigate;


