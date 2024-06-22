// let infCookiesGetSet = { 'e': e, 'browser': browser, 'page': page, 'action': 'set', 'value': valueCookie } // 'logFun': true,
// let retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)
// console.log(retCookiesGetSet)

let e = import.meta.url, ee = e
async function cookiesGetSet(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        if (!inf.action || (!inf.action == 'get' || !inf.action == 'set')) {
            ret['msg'] = `\n\n #### ERRO #### COOKIES \n INFORMAR O 'action' \n\n`;
        } else if (!inf.value) {
            ret['msg'] = `\n\n #### ERRO #### COOKIES \n INFORMAR O 'value' \n\n`;
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
(eng ? window : global)['cookiesGetSet'] = cookiesGetSet