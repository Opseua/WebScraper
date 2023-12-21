// let infCookiesGetSet = { 'e': e, 'browser': browser, 'page': page, 'action': 'set', 'value': valueCookie } // 'logFun': true,
// let retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)
// console.log(retCookiesGetSet)

let e = import.meta.url;
async function cookiesGetSet(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        let errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } };
        if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
        else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
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
                // let valueCookie = [{ "domain": "c6bank.my.site.com", "hostOnly": true, "httpOnly": false, "name": "renderCtx", "path": "/partners/s", "sameSite": "no_restriction", "secure": true, "session": true, "storeId": "0", "value": "%7B%22pageId%22%3A%22547d26bb-0bb6-4c10-852f-2caaf3f78402%22%2C%22schema%22%3A%22Published%22%2C%22viewType%22%3A%22Published%22%2C%22brandingSetId%22%3A%2204d88a18-46a8-4cd5-8b14-05ed85cb4d1e%22%2C%22audienceIds%22%3A%226Au6e000000TRci%2C6Au6e000000TQi0%2C6Au6e000000TRch%2C6Au6e000000TRc8%2C6Au6e000000TRd6%2C6Au6e000000TRcD%2C6Au6e000000Gpab%2C6Au6e000000TRbo%2C6Au6e000000TQi5%2C6Au6e000000Gpac%22%7D" }, { "domain": "c6bank.my.site.com", "expirationDate": 1733351442.856267, "hostOnly": true, "httpOnly": false, "name": "CookieConsentPolicy", "path": "/", "sameSite": "unspecified", "secure": false, "session": false, "storeId": "0", "value": "0:1" }, { "domain": "c6bank.my.site.com", "expirationDate": 1733351442.856808, "hostOnly": true, "httpOnly": false, "name": "LSKey-c$CookieConsentPolicy", "path": "/", "sameSite": "unspecified", "secure": false, "session": false, "storeId": "0", "value": "0:1" }, { "domain": "c6bank.my.site.com", "expirationDate": 1733351442.856868, "hostOnly": true, "httpOnly": false, "name": "BrowserId", "path": "/", "sameSite": "unspecified", "secure": false, "session": false, "storeId": "0", "value": "7X5AGJO9Ee6Ftt1kE4v2hQ" }, { "domain": "c6bank.my.site.com", "expirationDate": 1733351442.856899, "hostOnly": true, "httpOnly": false, "name": "BrowserId_sec", "path": "/", "sameSite": "no_restriction", "secure": true, "session": false, "storeId": "0", "value": "7X5AGJO9Ee6Ftt1kE4v2hQ" }, { "domain": "c6bank.my.site.com", "expirationDate": 1707091622.901836, "hostOnly": true, "httpOnly": false, "name": "oinfo", "path": "/", "sameSite": "no_restriction", "secure": true, "session": false, "storeId": "0", "value": "c3RhdHVzPUFDVElWRSZ0eXBlPTYmb2lkPTAwRDVBMDAwMDAwQzNNNg==" }, { "domain": "c6bank.my.site.com", "expirationDate": 1707091623.294403, "hostOnly": true, "httpOnly": false, "name": "autocomplete", "path": "/", "sameSite": "no_restriction", "secure": true, "session": false, "storeId": "0", "value": "0" }, { "domain": "c6bank.my.site.com", "hostOnly": true, "httpOnly": false, "name": "sid_Client", "path": "/", "sameSite": "no_restriction", "secure": true, "session": true, "storeId": "0", "value": "e00000EXOQhA000000C3M6" }, { "domain": "c6bank.my.site.com", "hostOnly": true, "httpOnly": false, "name": "inst", "path": "/", "sameSite": "no_restriction", "secure": true, "session": true, "storeId": "0", "value": "APP_6e" }, { "domain": "c6bank.my.site.com", "expirationDate": 1733443623.294669, "hostOnly": true, "httpOnly": false, "name": "oid", "path": "/", "sameSite": "no_restriction", "secure": true, "session": false, "storeId": "0", "value": "00D5A000000C3M6" }, { "domain": ".my.site.com", "expirationDate": 1701912795.16682, "hostOnly": false, "httpOnly": true, "name": "ak_bmsc", "path": "/", "sameSite": "unspecified", "secure": false, "session": false, "storeId": "0", "value": "4DC02A81BED86D9E1F88425916910F59~000000000000000000000000000000~YAAQBskQAhxgAz+MAQAAHHx6QRZvUWNUFgTUjanFhMZIFABvVvvfiSYW1pCGDm7EVZECvoTYHo1PYtsqanzx92NijIBqYE5l5TxeaxuVP2GAGtmKsn3hDxy0YaaLdbunm2BBINuza86gKO8xYJhKK7X+aRnxO1q+Icqdk9xZJnrAThzRHqn6OQooJEaYK5CQbCiQGEBQhpS2TJKFAzCCZhHuqfMXEazLdth+Xnn8ZW+2NZYH62ofdWcpPA1qp5DzxkY8+E9m2W53dzrGCZ/moChdGCPSmszgP9EzOA6L3IZCVase9Xjv7kdEegCp/uloiSL/ylqHCZRz2rUGRrse860M3Ll28aPzT3W/NhsYMHcBUFNkIrZ8vR6olQbPPEY1EQtoXjc56yMZv7yFnQ==" }, { "domain": "c6bank.my.site.com", "expirationDate": 1701916397.370325, "hostOnly": true, "httpOnly": false, "name": "sfdc-stream", "path": "/", "sameSite": "no_restriction", "secure": true, "session": false, "storeId": "0", "value": "!yBdNnEZDahN72AEY4EcVab7jsm1v+5VQ2Unky1z8EFXsDntXO5DsMg3sUohvDJ85e1CAb0qBZ8fkbhA=" }, { "domain": "c6bank.my.site.com", "hostOnly": true, "httpOnly": false, "name": "clientSrc", "path": "/", "sameSite": "no_restriction", "secure": true, "session": true, "storeId": "0", "value": "191.246.153.145" }, { "domain": "c6bank.my.site.com", "hostOnly": true, "httpOnly": true, "name": "sid", "path": "/", "sameSite": "no_restriction", "secure": true, "session": true, "storeId": "0", "value": "00D5A000000C3M6!ARIAQBjUjpIrakTT3BAgMexgz.87jtdWxqG9zRodvy2Iu9VBT1l.FqtvPTn8NOSZcFjADC3qv3CjvymAE9uCK4dLYpni5S9V" }, { "domain": ".my.site.com", "expirationDate": 1701912798.678685, "hostOnly": false, "httpOnly": false, "name": "bm_sv", "path": "/", "sameSite": "unspecified", "secure": true, "session": false, "storeId": "0", "value": "A8AB6B12E2B2EF0ADF36554DA3F4FEDC~YAAQBskQAtLsFT+MAQAAm5mdQRYwe1OGrcxg+zSJCYXRSNi2BsUA2SxMkegcFxoDCgGCiGnlkEjDKhyVfRFQAb9zGyp7t+WWxjQiEUkjFeeebkLbHvcMFCyw2G1KUzfOBeg56sErXpb5jD+8p1BWi5fdoJOERunZQI2AJU0a7pVZfWWYbTY+m/vOgJAOzSeuFMygz9t1gz6YqIBoje3nEGrrdKaxNlYSW3cbticd4rUBm7FwznxmQ4kg6Gmw1EV1jB8=~1" }]
                let valueCookie = inf.value
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
        let infSendData = { 'e': e, 'stop': true, 'status1': err }
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
