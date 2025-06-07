// let infCookiesGetSet = { e, 'page': page, 'action': 'set', 'value': valueCookie }
// let retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)
// console.log(retCookiesGetSet)

let e = import.meta.url, ee = e;
async function cookiesGetSet(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { page, action, value, ignoreAutUpdate = false, } = inf;
        if (!action || (!action === 'get' || !action === 'set')) {
            ret['msg'] = `COOKIE GET SET: ERRO | INFORMAR O 'action'`;
        } else if (action === 'set' && !value) {
            ret['msg'] = `COOKIE GET SET: ERRO | INFORMAR O 'value'`;
        } else {
            if (action === 'set') {
                // *** SET
                let valueCookie = value;

                // REMOVER CHAVE COM TIMESTAMP DO COOKIE
                valueCookie = valueCookie.filter(v => !v.hasOwnProperty('autUpdate'));

                await page.setCookie(...valueCookie);
                ret['msg'] = `COOKIES [SET]: OK [${action}]`;
            } else if (action === 'get') {
                // *** GET
                let cookies = await page.cookies();

                // ADICIONAR CHAVE COM TIMESTAMP DO COOKIE
                if (!ignoreAutUpdate) { cookies.unshift({ 'autUpdate': `${Math.floor(Date.now() / 1000)}`, }); }

                // FILTRAR COOKIES
                let filterCookies = (cookies, filters = {}) => {
                    let { includes, excludes, } = filters;
                    return cookies.map(cookie => {
                        // [INCLUIR] APENAS ESSAS CHAVES
                        if (includes && Array.isArray(includes)) {
                            cookie = includes.reduce((acc, key) => {
                                if (key in cookie) { acc[key] = cookie[key]; }
                                return acc;
                            }, {});
                        }

                        // [EXLCUIR] APENAS ESSAS CHAVES
                        if (excludes && Array.isArray(excludes)) {
                            excludes.forEach(key => {
                                if (key in cookie) { delete cookie[key]; }
                            });
                        }

                        return cookie;
                    });
                };

                let cookieFilters = { 'includesAAA': ['nomeA', 'nomeB', 'nomeC',], 'excludes': ['sameSite', 'nomeB', 'nomeC',], };
                cookies = filterCookies(cookies, cookieFilters);

                ret['res'] = cookies;
                ret['msg'] = `COOKIES [GET]: OK [${action}]`;
            }

            ret['ret'] = true;

        }
    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['cookiesGetSet'] = cookiesGetSet;


