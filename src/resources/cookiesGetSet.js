// let infCookiesGetSet = { 'browser': browser, 'page': page, 'action': 'set', 'value': valueCookie }
// let retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)
// console.log(retCookiesGetSet)

async function cookiesGetSet(inf) {
    let ret = { 'ret': false };
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
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': false, 'status1': 'TRYCATCH [cookiesGetSet] Script erro!' }
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
    window['cookiesGetSet'] = cookiesGetSet;
} else { // NODEJS
    global['cookiesGetSet'] = cookiesGetSet;
}
