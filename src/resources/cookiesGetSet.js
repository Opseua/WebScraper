// let infCookiesGetSet = { 'e': e, 'browser': browser, 'page': page, 'action': 'set', 'value': valueCookie } // 'logFun': true,
// let retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)
// console.log(retCookiesGetSet)

let e = import.meta.url, ee = e
async function cookiesGetSet(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        let { browser, page, action, value } = inf
        if (!action || (!action == 'get' || !action == 'set')) {
            ret['msg'] = `COOKIE GET SET: ERRO | INFORMAR O 'action'`;
        } else if (action == 'set' && !value) {
            ret['msg'] = `COOKIE GET SET: ERRO | INFORMAR O 'value'`;
        } else {
            if (action == 'get') { // GET
                let cookies = await page.cookies();
                ret['res'] = cookies
                ret['msg'] = `COOKIES [GET]: OK [${action}]`;
                ret['ret'] = true;
            } else if (action == 'set') { // SET
                let valueCookie = value
                await page.setCookie(...valueCookie);
                ret['msg'] = `COOKIES [SET]: OK [${action}]`;
                ret['ret'] = true;
            }
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, }); ret['msg'] = retRegexE.res;

        let errMsg = `% TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        await sendData(infSendData)
    };

    return { ...({ 'ret': ret.ret }), ...(ret.msg && { 'msg': ret.msg }), ...(ret.res && { 'res': ret.res }), };
};

// CHROME | NODEJS
(eng ? window : global)['cookiesGetSet'] = cookiesGetSet