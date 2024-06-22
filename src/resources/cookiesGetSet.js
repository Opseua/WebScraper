// let infCookiesGetSet = { 'e': e, 'browser': browser, 'page': page, 'action': 'set', 'value': valueCookie }
// let retCookiesGetSet = await cookiesGetSet(infCookiesGetSet); console.log(retCookiesGetSet)

let e = import.meta.url, ee = e;
async function cookiesGetSet(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        if (!inf.action || (!inf.action == 'get' || !inf.action == 'set')) {
            ret['msg'] = `COOKIES GET SET: ERRO | INFORMAR O 'action'`;
        } else if (inf.action == 'set' && !inf.value) {
            ret['msg'] = `COOKIES GET SET: ERRO | INFORMAR O 'value'`;
        } else {
            let browser = inf.browser
            let page = inf.page
            if (inf.action == 'get') { // GET
                let cookies = await page.cookies();
                ret['res'] = cookies
                ret['msg'] = `COOKIES GET SET: OK [${inf.action}]`;
                ret['ret'] = true;
            } else if (inf.action == 'set') { // SET
                let valueCookie = inf.value
                await page.setCookie(...valueCookie);
                ret['msg'] = `COOKIES GET SET: OK [${inf.action}]`;
                ret['ret'] = true;
            }
        }

    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ [cookiesGetSet] TRYCATCH Script erro!`
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
    window['cookiesGetSet'] = cookiesGetSet;
} else { // NODEJS
    global['cookiesGetSet'] = cookiesGetSet;
}
