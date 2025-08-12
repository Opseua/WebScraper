globalThis['currentFile'] = function () { return new Error().stack.match(/([^ \n])*([a-z]*:\/\/\/?)*?[a-z0-9\/\\]*\.js/ig)?.[0].replace(/[()]/g, ''); }; globalThis['sP'] = currentFile(); let startup = new Date();
await import('./resources/@export.js'); let e = sP, ee = e; let libs = { 'puppeteer': {}, }; await import('./resources/elementAction.js');

async function serverRun(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        /* IMPORTAR BIBLIOTECA [NODE] */ libs['puppeteer'] = { 'puppeteer': 1, 'pro': true, }; libs = await importLibs(libs, 'serverRun [WebScraper {TIM}]');

        await logConsole({ e, ee, 'txt': `**************** SERVER **************** [${startupTime(startup, new Date())}]`, });

        let time, err, scriptHour = ['0', '25',], infSendData, retGoogleSheets;

        // FORÇAR PARADA DO SCRIPT_NTFY | ERRO A2 | FAZER PARSE DA STRING
        async function processForceStop(inf = {}) { await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': `${inf.origin || ''}`, }); await new Promise(r => { setTimeout(r, 7000); }); crashCode(); }

        let tabsIdx = 0, tabs = ['AGOSTO 2025', 'JULHO 2025',];

        // BUSCAR LEADS DA PLANILHA
        while (!false) {
            time = dateHour().res; let a = time.dayNam; let b = Number(time.hou); let c = Number(scriptHour[0] - 1); let d = Number(scriptHour[1]);

            if (!((['SEG', 'TER', 'QUA', 'QUI', 'SEX',].includes(a) && (b > c && b < d)) || (['SAB', 'DOM',].includes(a) && (b > c && b < d - 7)))) {
                infSendData = { e, 'stop': false, 'status1': `$ Fora do horário permitido (${scriptHour[0]}:00 <> ${scriptHour[1]}:00)`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, });
            } else {

                let id = `1tnMqQPKTCJUcLr4jEfo3146G7GJRWOtW6chvMR8tkBE`, tab = `${tabs[tabsIdx]}`; console.log(`✅✅✅ CONSULTANDO: ${tabs[tabsIdx]} ✅✅✅\n`);

                function montarCookieHeader(cookies) {
                    let cookieHeader = '';
                    for (let i = 0; i < cookies.length; i++) { let c = cookies[i]; if (c.name && c.value) { if (cookieHeader) { cookieHeader += '; '; } cookieHeader += c.name + '=' + c.value; } }
                    return cookieHeader;
                }

                let cookie = `skin=log=2; ApplicationGatewayAffinityCORS=1da7c7ff65a9abaef38c3d53ea7431af; ApplicationGatewayAffinity=1da7c7ff65a9abaef38c3d53ea7431af; X-XSS-Protection=1; incap_ses_1618_2924106=am9hHbrO+yJ5uMflzEp0FmIXkmgAAAAA+FCoi680S53kafze9wAOBg==; visid_incap_2980042=EVxdqxZJT6aSstZOh1hnA18IeGgAAAAAQUIPAAAAAABkD4EVqBLBFHhS7moS3f5P; visid_incap_2924106=gxAXkkrmQ4qSFALSMYpvoZ0/emgAAAAAQUIPAAAAAAC1VnetAoMAEzoIavbn9F62; visid_incap_3158096=o85kEzjqSeG37+KaZGvnRtk/emgAAAAAQUIPAAAAAACPbDHl9SvcNXJn6I/W5AgA; visid_incap_2763827=MHz8X90VRDO8LLXqOp+5WnpBemgAAAAAQUIPAAAAAACM1Z7TO7eQGUNp4asOWSV/; visid_incap_2758382=M+AsIVpySfibaA/LcV+H/yiGemgAAAAAQUIPAAAAAAAkFZU70UgCGICaCIqGMaMV; visid_incap_3014921=yhr7uCY+SmiKyEXoAs/gW1GGemgAAAAAQUIPAAAAAAD1qXkbtqPz6wVxNSNH53Jn; visid_incap_2985160=uNqdyjtuRaq1sz39r3m+4lBTfmgAAAAAQUIPAAAAAADF/M6HVGnofP45xevi0FuU; visid_incap_2912260=f2xX5faaTLiAgR3epa/lmF1qh2gAAAAAQUIPAAAAAAAcgyRI5GjfuSUC1suW3lVJ; PF=TzSMchzW3S9Vt4FRvJREDEi7xaelrH4irrY2E4uzC0Kk; ApplicationGatewayAffinityCORS=1da7c7ff65a9abaef38c3d53ea7431af; ApplicationGatewayAffinity=1da7c7ff65a9abaef38c3d53ea7431af; skin=log=2; incap_ses_545_2924106=RhuDRqeqDAsdtc7pADuQB/wWkmgAAAAAy5odNWel5/mvR/U10rxKCw==; tokenRadar=eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzY2I3NmUyMGVmMDRmOTkxMjdhMWRmYzdlMzM5N2UxIiwidHlwIjoiSldUIn0.eyJuYmYiOjE3NTQ0MDQ2MTEsImV4cCI6MTc1NDQ5MTAxMSwiaXNzIjoiaHR0cHM6Ly9yYWRhci50aW1icmFzaWwuY29tLmJyL2FwaSIsImF1ZCI6WyJodHRwczovL3JhZGFyLnRpbWJyYXNpbC5jb20uYnIvYXBpL3Jlc291cmNlcyIsInJhZGFyYnVzaW5lc3MiXSwiY2xpZW50X2lkIjoiZXh0ZXJuYWxhY2Nlc3MiLCJzdWIiOiIxNTY4OTMiLCJhdXRoX3RpbWUiOjE3NTQ0MDQ2MTEsImlkcCI6ImxvY2FsIiwidXNlcm5hbWUiOiJUMzUzNjA3OCIsImVtYWlsIjoiTG91aXNlYWRtLnJqQGRtYXh0ZWwuY29tLmJyIiwibmFtZSI6IkxPVUlTRSBIRUxFTkEgQlJBR0FOQ0EiLCJpZHBlcmZpbCI6IjQzNyIsInNlcnZlcl9hZGRyZXNzX2lwIjoiMTAuMTUxLjIwOS4zMCIsInVzZXJpZCI6IkIyRjFBRDU3LTI3QkEtNDdFMC1COUZDLTRGOTM0Q0VGQjFFQSIsInNlc3Npb25pZCI6IjM1N0ZGQkY5LUY0RTAtNDJEMC05N0U4LURCNEE2M0I2NEFCNiIsInJlbW90ZUlQIjoiMTc5LjI0Ni4xOTQuMTEzIiwiaWRjYW5hbCI6IjEyIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJhZGFyYnVzaW5lc3MiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.VJl-JyHq_wgw-pLLNJ53JfCrd3Y7_ZPmseytMSaRNPKQgZ0IepQCpkSk92fhG91J-g1WNB-pvVr-fMuJzrlalkCSvdHU7UFNyiHg_Lwso-ZU-ChLhaZHyjQnVYFocwvb17y6fRvE2AXN4jP0a_MuVkw-ucYeDMRs9DZODPbRrLosBcrt7biq5ktUcACb4eZfLZlJ54c48PSWJwJ4VShbCMwJQfl3E3ysVX-BROxg3R6HaU7uFSN-bl8rSV9iEPdJyIJk5Vdg7iioogDH6pRDVh-sJJtgvYXVQNLPVWkhZ8oj6RBXO32NEsrgN3FQ68_z1522MV4ptRxUNCJLzToXiw; sessaoSQL=357ffbf9-f4e0-42d0-97e8-db4a63b64ab6; _gid=GA1.3.1453524605.1754404630; _ga_LQW8NXT18Q=GS2.1.s1754404629$o1$g0$t1754404629$j60$l0$h0; incap_ses_545_3158096=hR+TXQenHyNk1c7pADuQBxUXkmgAAAAAuPyic+CSa/5uPEgyHNU56w==; skin=log=2; _ga_NGP7BP5V8C=GS2.1.s1754404690$o1$g1$t1754405225$j60$l0$h0; _ga=GA1.1.2019348405.1754404630`;

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
                    if (index === 0 || !value[0] || value[0].trim() === '' || isNaN(value[0].trim())) { continue; }
                    let lin = index + 1, lead = value[0], statusRadar = leadsStatusRadar[index]?.[0] || '', statusPedido = leadsStatusPedido[index]?.[0] || ''; let statusP2B = '', nomeFila = '', status = '';

                    // CONSULTAR NO SISTEMA
                    let infApi = {
                        e, 'method': 'GET', 'url': `https://radar.timbrasil.com.br/radar-tim/filas/fila.asp?key=&order=&cod_fila=46&AG=&act=buscar&field=a.nr_pedido&q=b&query=${lead}`, 'headers': {
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
                            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"', 'sec-ch-ua-platform': '"Windows"', 'Cookie': `${cookie}`,
                        },
                    }; let retApi = await api(infApi); if (!retApi.ret) { console.log(retApi.msg); return retApi; } else { retApi = retApi.res.body; }

                    // EXTRAIR TABELA DE RESULTADO
                    let retRegex = regex({ 'pattern': `#F7F7F7">(*)<table width="98%" align="center" bgcolor=`, 'text': `${retApi}`, });
                    if (retRegex?.res?.['3']) {
                        // FAZER PARSE DA TABELA
                        let retHtmlToJson = await htmlToJson({ e, 'html': ` <table> ${retRegex.res['3']} </table>  `, });
                        if (!retHtmlToJson.ret) { console.log(retHtmlToJson.msg); return retHtmlToJson; } else { retHtmlToJson = retHtmlToJson.res; } retHtmlToJson = retHtmlToJson[retHtmlToJson.length - 1];

                        statusP2B = retHtmlToJson.col12 || ''; nomeFila = retHtmlToJson.col17 || ''; status = retHtmlToJson.col18;
                        if (!nomeFila.includes(`DEVOLVIDO`) && !nomeFila.includes(`ENTREGA`) && !nomeFila.includes(`BATE/VOLTA CONTROL TOWER`) && !nomeFila.includes(`CADASTRO`)) {
                            status = nomeFila;
                        } else {
                            // CONSULTAR DETALHES DO PEDIDO
                            let retTimGetOrderDetails = await timGetOrderDetails({ e, cookie, 'pedido': `${lead}`, });
                            if (!retTimGetOrderDetails.ret) { console.log(retTimGetOrderDetails.msg); return retTimGetOrderDetails; } status = retTimGetOrderDetails.res;
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
                        if (!retGoogleSheets.ret) { console.log(retGoogleSheets.msg); return retGoogleSheets; }

                    } else {
                        console.log('NAO', lead);
                    }

                    console.log(`(${lin}) ${lead} | ${statusP2B} | ${nomeFila}\n`);
                    // await new Promise(r => { setTimeout(r, 1000); }); // ESPERAR 5 SEGUNDOS PARA PRÓXIMA CONSULTA
                }

            }

            console.log(`ESPERANDO 5 MINUTOS PARA PRÓXIMA COSULTA`); await new Promise(r => { setTimeout(r, (300000)); }); console.log(`PRÓXIMO LOOP`); tabsIdx = 1 - tabsIdx;
        }


    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let err = `% TRYCATCH Script erro!`;
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRun();


