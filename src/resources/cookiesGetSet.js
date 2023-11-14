async function cookiesGetSet(inf) {
    let valueCookie = [
        {
            name: 'ASP.NET_SessionId',
            value: 'wivpxhlq3b45tgtb12dcgk4t',
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
        },
        {
            name: '_gid',
            value: 'GA1.4.1936086295.1699939394',
            domain: '.jucesponline.sp.gov.br',
            path: '/',
            expires: 1700025793,
            size: 31,
            httpOnly: false,
            secure: false,
            session: false,
            sameParty: false,
            sourceScheme: 'Secure',
            sourcePort: 443
        },
        {
            name: '_gat_gtag_UA_129106988_4',
            value: '1',
            domain: '.jucesponline.sp.gov.br',
            path: '/',
            expires: 1699939453,
            size: 25,
            httpOnly: false,
            secure: false,
            session: false,
            sameParty: false,
            sourceScheme: 'Secure',
            sourcePort: 443
        },
        {
            name: '_ga',
            value: 'GA1.4.1257799709.1699939394',
            domain: '.jucesponline.sp.gov.br',
            path: '/',
            expires: 1734499393.673031,
            size: 30,
            httpOnly: false,
            secure: false,
            session: false,
            sameParty: false,
            sourceScheme: 'Secure',
            sourcePort: 443
        },
        {
            name: '_ga_ETQ25R36EX',
            value: 'GS1.1.1699939393.1.0.1699939393.60.0.0',
            domain: '.jucesponline.sp.gov.br',
            path: '/',
            expires: 1734499393.54442,
            size: 52,
            httpOnly: false,
            secure: false,
            session: false,
            sameParty: false,
            sourceScheme: 'Secure',
            sourcePort: 443
        }
    ]
    // let infCookiesGetSet = { 'browser': browser, 'page': page, 'action': 'set', 'value': valueCookie }
    // let retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)
    // console.log(retCookiesGetSet)

    await import('../../../Chrome_Extension/src/resources/@functions.js');
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
                let valueJson = inf && !inf.value == '*' ? inf.value : valueCookie
                valueJson = typeof valueJson === 'object' ? valueJson : JSON.parse(valueJson)
                await page.setCookie(...valueJson);
                ret['msg'] = `COOKIES GET SET: OK [${inf.action}]`;
                ret['ret'] = true;
            }
        }
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
    };
    return ret
}

if (typeof eng === 'boolean') {
    if (eng) { // CHROME
        window['cookiesGetSet'] = cookiesGetSet;
    } else { // NODEJS
        global['cookiesGetSet'] = cookiesGetSet;
    }
}