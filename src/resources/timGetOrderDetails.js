

let e = import.meta.url, ee = e;
async function timGetOrderDetails(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { cookie, pedido, } = inf;

        function substituirTexto(substituicoes, texto) {
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

            // CONSULTAR NO SISTEMA
            let retApi = await api(infApi); if (!retApi.ret) { return retApi; }

            // // EXTRAIR TABELA DE RESULTADO
            let body = retApi.res.body.split(` <table `)[1].split(`</td><td>`);
            let res = body[body.length - 1].split(`</td></tr></table>`)[0];

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
globalThis['timGetOrderDetails'] = timGetOrderDetails;


