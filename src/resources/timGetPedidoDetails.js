/* eslint-disable max-len */

let e = import.meta.url, ee = e;
async function timGetPedidoDetails(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { cookie, pedido, } = inf;

        function substituirTexto(substituicoes, texto) {

            if (!texto) {
                console.log(`
                ***

                ${texto}
                
                ***
                `);
            }

            function regexEscape(t, m) {
                if (!m) { t = t.replace(/[*.+?^${}()|[\]\\]/g, '\\$&'); } else { t = t.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*'); } return t;
            }

            for (let i = 0; i < substituicoes.length; i++) {
                let item = substituicoes[i]; let padrao = regexEscape(item.pesquisar); let regex = new RegExp(padrao, 'g'); texto = texto.replace(regex, item.substituir);
            }

            return texto;
        }


        if (!cookie) {
            ret['msg'] = `TIM GET PEDIDO DETAILS: ERRO | INFORMAR O 'cookie'`;
        } else if (!pedido) {
            ret['msg'] = `TIM GET PEDIDO DETAILS: ERRO | INFORMAR O 'pedido'`;
        } else {

            let infApi = {
                e, 'method': 'POST',
                'url': `https://radar.timbrasil.com.br/radar-tim/detalhe/principal_detalhe.asp`,
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"', 'sec-ch-ua-platform': '"Windows"',
                    'Cookie': `${cookie}`,
                }, 'body': {
                    'panel': `historico`,
                    'pedido': `${pedido}`,
                },
            };

            [{ 'domain': '.timbrasil.com.br', 'expirationDate': 1784356415.908863, 'hostOnly': false, 'httpOnly': true, 'name': 'visid_incap_2924106', 'path': '/', 'sameSite': 'no_restriction', 'secure': true, 'session': false, 'storeId': '0', 'value': 'CMNJlcXsQzSni44VkoZVTHpgemgAAAAAQUIPAAAAAAAv4WJuRxcLUKOG0ByzeL0S', }, { 'domain': '.timbrasil.com.br', 'expirationDate': 1784356409.063347, 'hostOnly': false, 'httpOnly': true, 'name': 'visid_incap_3158096', 'path': '/', 'sameSite': 'no_restriction', 'secure': true, 'session': false, 'storeId': '0', 'value': 'Ds0qlAg6SFCEum5+mkC/tKNhemgAAAAAQUIPAAAAAABMshDzsOYaFxShW8CJuijG', }, { 'domain': '.timbrasil.com.br', 'expirationDate': 1784356414.495339, 'hostOnly': false, 'httpOnly': true, 'name': 'visid_incap_2763827', 'path': '/', 'sameSite': 'no_restriction', 'secure': true, 'session': false, 'storeId': '0', 'value': 'JOn7FTcMQK2lt4130T1rkfVhemgAAAAAQUIPAAAAAABuUvqb8ohVO4/FGUDH4C59', }, { 'domain': 'radar.timbrasil.com.br', 'hostOnly': true, 'httpOnly': false, 'name': 'ApplicationGatewayAffinityCORS', 'path': '/', 'sameSite': 'no_restriction', 'secure': true, 'session': true, 'storeId': '0', 'value': '6817e97044249e93ba88bfe60a26ceda', }, { 'domain': 'radar.timbrasil.com.br', 'hostOnly': true, 'httpOnly': false, 'name': 'ApplicationGatewayAffinity', 'path': '/', 'sameSite': 'unspecified', 'secure': false, 'session': true, 'storeId': '0', 'value': '6817e97044249e93ba88bfe60a26ceda', }, { 'domain': 'radar.timbrasil.com.br', 'hostOnly': true, 'httpOnly': true, 'name': 'skin', 'path': '/', 'sameSite': 'strict', 'secure': true, 'session': true, 'storeId': '0', 'value': 'log=2', }, { 'domain': '.timbrasil.com.br', 'hostOnly': false, 'httpOnly': true, 'name': 'PF', 'path': '/', 'sameSite': 'no_restriction', 'secure': true, 'session': true, 'storeId': '0', 'value': 'F4sACCiz4nnw4oqUfCtzlHoy4vMsu7QlhdZBwVXNn0Xn', }, { 'domain': '.timbrasil.com.br', 'hostOnly': false, 'httpOnly': false, 'name': 'incap_ses_1698_2924106', 'path': '/', 'sameSite': 'no_restriction', 'secure': true, 'session': true, 'storeId': '0', 'value': 'xl8pF6cKOTd+lGWDL4KQF2Snf2gAAAAAQfB/Nubn5Y4H0ZCZfMue2w==', }, { 'domain': 'radar.timbrasil.com.br', 'expirationDate': 1753207352.717532, 'hostOnly': true, 'httpOnly': true, 'name': 'tokenRadar', 'path': '/', 'sameSite': 'strict', 'secure': true, 'session': false, 'storeId': '0', 'value': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzY2I3NmUyMGVmMDRmOTkxMjdhMWRmYzdlMzM5N2UxIiwidHlwIjoiSldUIn0.eyJuYmYiOjE3NTMxOTY0ODQsImV4cCI6MTc1MzI4Mjg4NCwiaXNzIjoiaHR0cHM6Ly9yYWRhci50aW1icmFzaWwuY29tLmJyL2FwaSIsImF1ZCI6WyJodHRwczovL3JhZGFyLnRpbWJyYXNpbC5jb20uYnIvYXBpL3Jlc291cmNlcyIsInJhZGFyYnVzaW5lc3MiXSwiY2xpZW50X2lkIjoiZXh0ZXJuYWxhY2Nlc3MiLCJzdWIiOiIxNTY4OTMiLCJhdXRoX3RpbWUiOjE3NTMxOTY0ODQsImlkcCI6ImxvY2FsIiwidXNlcm5hbWUiOiJUMzUzNjA3OCIsImVtYWlsIjoiTG91aXNlYWRtLnJqQGRtYXh0ZWwuY29tLmJyIiwibmFtZSI6IkxPVUlTRSBIRUxFTkEgQlJBR0FOQ0EiLCJpZHBlcmZpbCI6IjQzNyIsInNlcnZlcl9hZGRyZXNzX2lwIjoiMTAuMTUxLjIwOS4zMCIsInVzZXJpZCI6IkIyRjFBRDU3LTI3QkEtNDdFMC1COUZDLTRGOTM0Q0VGQjFFQSIsInNlc3Npb25pZCI6IkI1RkUzNEQyLTdGRTMtNDdDQS1BMjJCLUZENTZGRDU0NkIzOSIsInJlbW90ZUlQIjoiMTg3LjI1LjIyMi4xMzEiLCJpZGNhbmFsIjoiMTIiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwicmFkYXJidXNpbmVzcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.TIoat5DPegqe9EIApQmGaAqOuXjhWbbQz9QRlslKqGjSsq3eeqQonC03X0KfboBwubU5O4YFlG1AYQU-VLDdG4bdigN3yx76ePQ83y8CCDbt8lo1jdbOxm_PW_DPCZYykcfA6nCi1xpl5iy6u0Lx-cKmrVGxhwLJhk5AfiW5ZuAM9Q7IXg50vz7cK9BIOeRj5uL_ASW10D4xKUGwcJy7wA1pNk8PxCtor1-M2kKatGpVO3a0oL0SizAXRZZRMaDitM_CVtQWsOpDt-YeSPq9D4AQoVPr87S2GUda5RxnwQxvVkVF_6uJRizWlAKnCaKkpBjsBiLRrA6DWMIuK9WFPA', }, { 'domain': 'radar.timbrasil.com.br', 'hostOnly': true, 'httpOnly': true, 'name': 'sessaoSQL', 'path': '/', 'sameSite': 'strict', 'secure': true, 'session': true, 'storeId': '0', 'value': 'b5fe34d2-7fe3-47ca-a22b-fd56fd546b39', }, { 'domain': '.timbrasil.com.br', 'expirationDate': 1753282989, 'hostOnly': false, 'httpOnly': false, 'name': '_gid', 'path': '/', 'sameSite': 'unspecified', 'secure': false, 'session': false, 'storeId': '0', 'value': 'GA1.3.1965952859.1753196574', }, { 'domain': '.timbrasil.com.br', 'expirationDate': 1787756573.927176, 'hostOnly': false, 'httpOnly': false, 'name': '_ga_LQW8NXT18Q', 'path': '/', 'sameSite': 'unspecified', 'secure': false, 'session': false, 'storeId': '0', 'value': 'GS2.1.s1753196573$o1$g0$t1753196573$j60$l0$h0', }, { 'domain': '.timbrasil.com.br', 'hostOnly': false, 'httpOnly': false, 'name': 'incap_ses_1698_3158096', 'path': '/', 'sameSite': 'no_restriction', 'secure': true, 'session': true, 'storeId': '0', 'value': 'IegKLBgTMXNPemiDL4KQFzCof2gAAAAAKWjYwWoc8zw3rV8hNNWsbQ==', }, { 'domain': '.timbrasil.com.br', 'expirationDate': 1787756590.102903, 'hostOnly': false, 'httpOnly': false, 'name': '_ga_NGP7BP5V8C', 'path': '/', 'sameSite': 'unspecified', 'secure': false, 'session': false, 'storeId': '0', 'value': 'GS2.1.s1753196590$o1$g0$t1753196590$j60$l0$h0', }, { 'domain': '.timbrasil.com.br', 'expirationDate': 1787756590.106475, 'hostOnly': false, 'httpOnly': false, 'name': '_ga', 'path': '/', 'sameSite': 'unspecified', 'secure': false, 'session': false, 'storeId': '0', 'value': 'GA1.1.292303232.1753196574', }, { 'domain': '.timbrasil.com.br', 'hostOnly': false, 'httpOnly': false, 'name': 'incap_ses_1698_2763827', 'path': '/', 'sameSite': 'no_restriction', 'secure': true, 'session': true, 'storeId': '0', 'value': 'CIUYX6IE0Xka3GiDL4KQF0yof2gAAAAALtMBaZiBsyKOr2qRxChhWg==', },];

            // CONSULTAR NO SISTEMA
            let retApi = await api(infApi); if (!retApi.ret) { return retApi; }

            // // EXTRAIR TABELA DE RESULTADO
            let body = retApi.res.body.split(` <table `)[1].split(`</td><td>`);
            let res = body[body.length - 1].split(`</td></tr></table>`)[0];
            // let infRegex = { 'pattern': ` <table (*)</td></tr></table>`, 'text': `${retApi.res.body}`, };
            // let retRegex = regex(infRegex); if (!retRegex.ret || !retRegex?.res?.['4']) {
            //     return retRegex;
            // }
            // retRegex = ` <table  ${retRegex.res['4']} </td></tr></table> `;

            // // FAZER PARSE DA TABELA
            // let retHtmlToJson = await htmlToJson({ e, 'mode': 3, 'object': true, 'html': retRegex, }); if (!retHtmlToJson.ret) {
            //     return retHtmlToJson;
            // }

            // let res = retHtmlToJson.res[retHtmlToJson.res.length - 1]['Observação'];
            let substituicoes = [
                { 'pesquisar': 'Pedido enviado via webService - ', 'substituir': '', },
                { 'pesquisar': `<br>`, 'substituir': '', },
            ];
            res = substituirTexto(substituicoes, res);

            if (res.includes(`Data de Previsão de Entrega: `)) {
                let time = dateHour().res;
                res = res.replace(` - `, '');
                if (res.includes(`${time.day}/${time.mon}/`)) {
                    res = `ROTA DE ENTREGA`;
                }
            }

            ret['ret'] = true;
            ret['msg'] = `TIM GET PEDIDO DETAILS: OK`;
            ret['res'] = res;

        }

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['timGetPedidoDetails'] = timGetPedidoDetails;


