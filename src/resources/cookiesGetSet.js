// let infCookiesGetSet = { 'browser': browser, 'page': page, 'action': 'set', 'value': valueCookie } // 'logFun': true,
// let retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)
// console.log(retCookiesGetSet)

let e = import.meta.url;
async function cookiesGetSet(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        const errs = async (err, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': err, 'inf': inf, 'catchGlobal': true }) } }
        if (typeof window !== 'undefined') { window.addEventListener('error', (err) => errs(err, ret)); window.addEventListener('unhandledrejection', (err) => errs(err, ret)) }
        else { process.on('uncaughtException', (err) => errs(err, ret)); process.on('unhandledRejection', (err) => errs(err, ret)) }
    }
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
                let valueCookie = [
                    {
                        name: inf && inf.value == '*' ? 'ASP.NET_SessionId' : inf.value.split('=')[0],
                        value: inf && inf.value == '*' ? 'padraoDaFuncao' : inf.value.split('=')[1],
                        domain: 'www.jucesponline.sp.gov.br',
                        path: '/',
                        expires: -1,
                        size: 41,
                        httpOnly: true,
                        secure: false,
                        session: true,
                        sameSite: 'Lax',
                        sameParty: false,
                        sourceScheme: 'Secure',
                        sourcePort: 443
                    }
                ]
                await page.setCookie(...valueCookie);
                ret['msg'] = `COOKIES GET SET: OK [${inf.action}]`;
                ret['ret'] = true;
            }
        }

        // ### LOG FUN ###
        if (inf && inf.logFun) {
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }, retFile
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; retFile = await file(infFile);
        }
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let err = `[cookiesGetSet] TRYCATCH Script erro!`
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
    window['cookiesGetSet'] = cookiesGetSet;
} else { // NODEJS
    global['cookiesGetSet'] = cookiesGetSet;
}
