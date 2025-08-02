

globalThis['currentFile'] = function () { return new Error().stack.match(/([^ \n])*([a-z]*:\/\/\/?)*?[a-z0-9\/\\]*\.js/ig)?.[0].replace(/[()]/g, ''); }; globalThis['sP'] = currentFile(); let startup = new Date();
await import('./resources/@export.js'); let e = sP, ee = e; let libs = { 'puppeteer': {}, }; await import('./resources/elementAction.js');

async function serverRun(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        /* IMPORTAR BIBLIOTECA [NODE] */ libs['puppeteer'] = { 'puppeteer': 1, 'pro': true, }; libs = await importLibs(libs, 'serverRun [WebScraper {TIM}]');

        await logConsole({ e, ee, 'txt': `**************** SERVER **************** [${startupTime(startup, new Date())}]`, });

        let time, err, scriptHour = ['0', '25',], infSendData, infGoogleSheets, retGoogleSheets;

        // FORÇAR PARADA DO SCRIPT_NTFY | ERRO A2 | FAZER PARSE DA STRING
        async function processForceStop(inf = {}) { await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': `${inf.origin || ''}`, }); await new Promise(r => { setTimeout(r, 7000); }); crashCode(); }

        // BUSCAR LEADS DA PLANILHA
        while (!false) {
            time = dateHour().res; let a = time.dayNam; let b = Number(time.hou); let c = Number(scriptHour[0] - 1); let d = Number(scriptHour[1]);

            if (!((['SEG', 'TER', 'QUA', 'QUI', 'SEX',].includes(a) && (b > c && b < d)) || (['SAB', 'DOM',].includes(a) && (b > c && b < d - 7)))) {
                infSendData = { e, 'stop': false, 'status1': `$ Fora do horário permitido (${scriptHour[0]}:00 <> ${scriptHour[1]}:00)`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, });
            } else {

                function montarCookieHeader(cookies) {
                    let cookieHeader = '';
                    for (let i = 0; i < cookies.length; i++) {
                        let c = cookies[i];
                        if (c.name && c.value) {
                            if (cookieHeader) {
                                cookieHeader += '; ';
                            }
                            cookieHeader += c.name + '=' + c.value;
                        }
                    }
                    return cookieHeader;
                }


                let cookie = `skin=log=2; sessaoSQL=B5FE34D2%2D7FE3%2D47CA%2DA22B%2DFD56FD546B39; visid_incap_2924106=CMNJlcXsQzSni44VkoZVTHpgemgAAAAAQUIPAAAAAAAv4WJuRxcLUKOG0ByzeL0S; visid_incap_3158096=Ds0qlAg6SFCEum5+mkC/tKNhemgAAAAAQUIPAAAAAABMshDzsOYaFxShW8CJuijG; visid_incap_2763827=JOn7FTcMQK2lt4130T1rkfVhemgAAAAAQUIPAAAAAABuUvqb8ohVO4/FGUDH4C59; ApplicationGatewayAffinityCORS=6817e97044249e93ba88bfe60a26ceda; ApplicationGatewayAffinity=6817e97044249e93ba88bfe60a26ceda; skin=log=2; PF=F4sACCiz4nnw4oqUfCtzlHoy4vMsu7QlhdZBwVXNn0Xn; incap_ses_1698_2924106=WbXTMzHIFxxayGmDL4KQF5Cof2gAAAAA4Gck1u+xnNVua+Mcanm59Q==; sessaoSQL=b5fe34d2-7fe3-47ca-a22b-fd56fd546b39; _gid=GA1.3.1911452693.1753196800; _ga_LQW8NXT18Q=GS2.1.s1753196799$o1$g1$t1753196816$j43$l0$h0; _ga=GA1.1.876296642.1753196800; incap_ses_1698_2763827=Hgi6f2yY/EP2y2uDL4KQFy2pf2gAAAAAO3eE++xDaCZF+edJAg2T3A==; _ga_NGP7BP5V8C=GS2.1.s1753196590$o1$g0$t1753196897$j60$l0$h0`;

                let id = `1tnMqQPKTCJUcLr4jEfo3146G7GJRWOtW6chvMR8tkBE`, tab = `JULHO 2025`;

                // PEGAR: LEADS
                retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': `${id}`, 'tab': `${tab}`, 'range': `E:E`, });
                if (!retGoogleSheets.ret) { err = `$ Erro ao pegar-enviar dados para planilha leadsPedido`; await processForceStop({ 'origin': `serverTim [${err}]`, }); /* FORÇAR PARADA DO SCRIPT */ }
                let leadsPedido = retGoogleSheets.res;

                // PEGAR: STATUS RADAR
                retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': `${id}`, 'tab': `${tab}`, 'range': `M:M`, });
                if (!retGoogleSheets.ret) { err = `$ Erro ao pegar-enviar dados para planilha leadsStatusRadar`; await processForceStop({ 'origin': `serverTim [${err}]`, }); /* FORÇAR PARADA DO SCRIPT */ }
                let leadsStatusRadar = retGoogleSheets.res;

                // PEGAR: STATUS PEDIDO
                retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': `${id}`, 'tab': `${tab}`, 'range': `O:O`, });
                if (!retGoogleSheets.ret) { err = `$ Erro ao pegar-enviar dados para planilha leadsStatusPedido`; await processForceStop({ 'origin': `serverTim [${err}]`, }); /* FORÇAR PARADA DO SCRIPT */ }
                let leadsStatusPedido = retGoogleSheets.res;

                // CONSULTAR TODOS OS CLIENTES NO SISTEMA 1 (Radar TIM)
                for (let [index, value,] of leadsPedido.entries()) {
                    if (index === 0 || !value[0]) { continue; } let lin = index + 1, lead = value[0], statusRadar = leadsStatusRadar[index] || '', statusPedido = leadsStatusPedido[index] || '';
                    let statusP2B = '', nomeFila = '', status = '';

                    let infApi = {
                        e, 'method': 'GET', 'url': `https://radar.timbrasil.com.br/radar-tim/filas/fila.asp?key=&order=&cod_fila=46&AG=&act=buscar&field=a.nr_pedido&q=b&query=${lead}`, 'headers': {
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
                            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"', 'sec-ch-ua-platform': '"Windows"',
                            'Cookie': `${cookie}`,
                        },
                    };
                    // CONSULTAR NO SISTEMA
                    let retApi = await api(infApi);
                    if (!retApi.ret) {
                        console.log(retApi.msg); return retApi;
                    }

                    // EXTRAIR TABELA DE RESULTADO
                    let retRegex = regex({ 'pattern': `#F7F7F7">(*)<table width="98%" align="center" bgcolor=`, 'text': `${retApi.res.body}`, });
                    if (retRegex?.res?.['3']) {
                        // FAZER PARSE DA TABELA
                        let retHtmlToJson = await htmlToJson({ e, 'mode': 3, 'object': true, 'html': ` <table> ${retRegex.res['3']} </table>  `, });
                        if (!retHtmlToJson.ret) {
                            console.log(retHtmlToJson.msg); return retHtmlToJson;
                        }
                        retHtmlToJson = retHtmlToJson.res[retHtmlToJson.res.length - 1]; // console.log(retHtmlToJson);
                        let { Pedido: pedido, ['Data de Entrada']: data, ['Razão Social']: razaoSocial, CNPJ: cnpj, Phoenix: phoenix, } = retHtmlToJson;
                        statusP2B = retHtmlToJson['Status P2B'] || ''; nomeFila = retHtmlToJson['Nome Fila'] || ''; status = retHtmlToJson['Status'] || '';

                        if (!nomeFila.includes(`DEVOLVIDO`) && !nomeFila.includes(`ENTREGA`) && !nomeFila.includes(`BATE/VOLTA CONTROL TOWER`) && !nomeFila.includes(`CADASTRO`)) {
                            status = nomeFila;
                        } else {
                            // CONSULTAR DETALHES DO PEDIDO
                            let retTimGetPedidoDetails = await timGetPedidoDetails({ e, cookie, 'pedido': `${pedido}`, });
                            if (!retTimGetPedidoDetails.ret) {
                                console.log(retTimGetPedidoDetails.msg); return retTimGetPedidoDetails;
                            }
                            status = retTimGetPedidoDetails.res;
                        }

                        // CORRIGIR STATUS
                        status = status.trim();
                        if (status.includes(`Pedido criado pelo EasyVendas`)) {
                            status = `INPUT`;
                        } else if (status === `AG. ANALISE ANTI-FRAUDE`) {
                            status = `ANTI FRAUDE`;
                        } else if (status === `CONCLUÍDO`) {
                            status = `CONCLUIDO`;
                        } else if (status.includes(`Pedido criado pelo P2B, Aguardando upload da documentação na fila CADASTRO`)) {
                            status = `VALIDANDO DOCUMENTAÇÃO`;
                        }

                        // MANDAR STATUS PARA A PLANILHA
                        retGoogleSheets = await googleSheets({ e, 'action': 'send', 'id': `${id}`, 'tab': `${tab}`, 'range': `N${lin}`, 'values': [[`${status}`,],], });
                        if (!retGoogleSheets.ret) {
                            console.log(retGoogleSheets.msg); return retGoogleSheets;
                        }

                    }

                    console.log(`(${lin}) ${lead} | ${statusP2B} | ${nomeFila}\n`);

                    // await new Promise(r => { setTimeout(r, 1000); }); // ESPERAR 5 SEGUNDOS PARA PRÓXIMA CONSULTA

                }

            }

            console.log(`ESPERANDO 5 MINUTOS PARA PRÓXIMA COSULTA`); await new Promise(r => { setTimeout(r, (300000)); }); console.log(`PRÓXIMO LOOP`);
        }


    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let err = `% TRYCATCH Script erro!`;
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRun();


