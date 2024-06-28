function startupFun(b, c) { let a = c - b; let s = Math.floor(a / 1000); let m = a % 1000; let f = m.toString().padStart(3, '0'); return `${s}.${f}` }; let startup = new Date();
await import('./resources/@export.js');

let e = import.meta.url, ee = e;
async function serverRun(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        logConsole({ 'e': e, 'ee': ee, 'write': true, 'msg': `**************** SERVER **************** [${startupFun(startup, new Date())}]` })

        // CRIAR PASTA DOS REGISTROS
        let time = dateHour().res, mon, day; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`; let secAwaitNewCheck = 60, startupTab = Math.floor(Date.now() / 1000)
        await file({ 'e': e, 'action': 'write', 'functionLocal': false, 'path': `log/Registros/${mon}/${day}/#_Z_#.txt`, 'rewrite': false, 'text': 'aaaaaa' });

        // FORÇAR PARADA DO SCRIPT | NTFY
        async function processForceStop(inf) {
            await commandLine({ 'e': e, 'command': `!letter!:/ARQUIVOS/PROJETOS/WebScraper/src/${gO.inf.shortcut}/OFF.vbs FORCE_STOP` }); logConsole({ 'e': e, 'ee': ee, 'write': true, 'msg': `ORIGEM: ${inf.origin}` })
            await new Promise(resolve => { setTimeout(resolve, 7000) }); process.exit();
        }; async function sendNtfy(inf) { let u = devSend.split('/'); u = `https://ntfy.sh/${u[u.length - 1]}`; await api({ 'e': e, 'method': 'POST', 'url': `${u}`, 'body': inf.titleText }) };

        let results, infSendData, retSendData, retGoogleSheets, aut, coldList, err, conSpl, leads, col, statusText, browser, page, pageValue, leadRandomNames, retClientGetData, retClientImput, dataDayMonYea
        let statusInf, statusDate, statusDateFull, json, chromiumHeadless, scriptHour, retClientSearch, dataDayMonYeaFull, dataRes, dataBoolean, imputRes, whileStop = false
        gO.inf['stop'] = false; let tabsInf = { 'index': -1, 'name': ['INDICAR_MANUAL', 'SOMENTE_CONSULTAR', 'LISTA_FRIA', 'INDICAR_AUTOMATICO',] }; tabsInf['leadsQtd'] = tabsInf.name.map(() => 1);
        tabsInf['lastCheck'] = tabsInf.name.map(() => 0); let lin, range = 'A2';

        // DEFINIR O ID DA PLANILHA E ATALHO
        let googleSheetsId, retGetPath = await getPath({ 'e': new Error() }); if (!retGetPath.ret) { return retGetPath }; retGetPath = retGetPath.res.file
        if (!retGetPath.includes('_TEMP.js')) { googleSheetsId = '1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc'; gO.inf['shortcut'] = 'z_Outros_serverC6'; }
        else { googleSheetsId = '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8'; gO.inf['shortcut'] = 'z_Outros_serverC6_New2'; }; gO.inf['sheetId'] = googleSheetsId; gO.inf['sheetTab'] = tabsInf.name[0]

        // CONSUMO DE MÉMORIA RAM (A CADA 30 MINUTOS)
        setInterval(() => {
            _exec('wmic os get TotalVisibleMemorySize', (error, stdout, stderr) => {
                if (error || stderr) { console.error(`DEU ERRO RAM`); return; }; let rT = parseInt(stdout.split('\n')[1].trim()); _exec('wmic os get FreePhysicalMemory', (error, stdout, stderr) => {
                    if (error || stderr) { console.error(`DEU ERRO RAM`); return; }; let rF = parseInt(stdout.split('\n')[1].trim()); let rU = Number(((rT - rF) / rT) * 100).toFixed(0);
                    let msg = `RAM USADA: ${rU}%`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${msg}` }); if (rU > 97) { sendNtfy({ 'titleText': `ALERTA\n${msg}` }) }
                });
            });
        }, 1800 * 1000);

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        retGoogleSheets = await googleSheets({ 'e': e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': range, }); if (!retGoogleSheets.ret) {
            err = `$ Erro ao pegar dados para planilha`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); await log({ 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets });
            // FORÇAR PARADA DO SCRIPT
            await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [1]' });
        }; try { json = retGoogleSheets.res[0][0]; json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, ''); gO.inf['sheetKepp'] = JSON.parse(json) }
        catch (catchErr) {
            sendNtfy({ 'titleText': `ERRO PARSE DADOS DA CÉLULA A2\n${gO.inf.sheetTab}` });
            // FORÇAR PARADA DO SCRIPT
            await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [2]' }); esLintIgnore = catchErr;
        }; aut = gO.inf.sheetKepp.autC6; col = gO.inf.sheetKepp.colC6; conSpl = gO.inf.sheetKepp.conSpl; leadRandomNames = gO.inf.sheetKepp.randomNames;
        chromiumHeadless = gO.inf.sheetKepp.chromiumHeadless; scriptHour = gO.inf.sheetKepp.scriptHourWebScraper.split('|')

        // '0' → APARECE | '1' → OCULTO
        if (chromiumHeadless == '0') { chromiumHeadless = false } else if (chromiumHeadless == '1') { chromiumHeadless = 'new' } else { chromiumHeadless = false }

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { 'e': e, 'stop': false, 'status1': '# Iniciando script, aguarde' }; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` }); retSendData = await sendData(infSendData);

        // INICIAR PUPPETEER | FECHAR ABA EM BRANCO 
        browser = await _puppeteer.launch({ // false | 'new'
            headless: chromiumHeadless, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--disable-gpu', '--disable-extensions',],
        }); page = await browser.newPage(); await page.setViewport({ 'width': 1024, 'height': 768 }); await (await browser.pages())[0].close();

        // COOKIE [SET]
        await cookiesGetSet({ 'e': e, 'browser': browser, 'page': page, 'action': 'set', 'value': aut })

        // ABRIR PÁGINA DE BUSCA GLOBAL
        async function openHome() {
            await page.goto(`https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente`, { waitUntil: 'networkidle2' }); await new Promise(resolve => { setTimeout(resolve, 1000) });
            await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg` });
        }; await openHome(); await new Promise(resolve => { setTimeout(resolve, 2000) })

        // CHECAR SE O COOKIE EXPIROU
        pageValue = await page.content(); if (pageValue.includes('Esqueci minha senha')) {
            err = `$ Cookie inválido!`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); await sendData({ 'e': e, 'stop': false, 'status1': `${err}` })
            await log({ 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }); await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_1.jpg` });
            // FORÇAR PARADA DO SCRIPT
            await processForceStop({ 'origin': 'serverC6 CHECAR SE O COOKIE EXPIROU' });
        }

        // **************************************************************************************************************

        while (!whileStop) {  // SEG <> DOM | [??:00] <> [??:00]
            time = dateHour().res; if (!(['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'].includes(time.dayNam) && (Number(time.hou) > Number(scriptHour[0]) - 1 && Number(time.hou) < Number(scriptHour[1])))) {
                // STATUS1 [Fora do horário permitido]
                infSendData = { 'e': e, 'stop': false, 'status1': `$ Fora do horário permitido (${scriptHour[0]}:00 <> ${scriptHour[1]}:00)` }
                logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` }); retSendData = await sendData(infSendData)
                // FORÇAR PARADA DO SCRIPT
                await processForceStop({ 'origin': 'serverC6 STATUS1 [Fora do horário permitido]' });
            } else {
                // DEFINIR ABA ATUAL
                tabsInf['index'] = tabsInf.index < (tabsInf.name.length - 1) ? (tabsInf.index + 1) : 0; gO.inf['sheetTab'] = tabsInf.name[tabsInf.index];

                if ((tabsInf.lastCheck[tabsInf.index]) > Math.floor(Date.now() / 1000)) {
                    // IGNORAR CHECAGEM
                    logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `IGNORADA | ${gO.inf.sheetTab}` })
                } else {
                    // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
                    retGoogleSheets = await googleSheets({ 'e': e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': range, }); if (!retGoogleSheets.ret) {
                        err = `$ Erro ao pegar dados para planilha`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); await log({ 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets });
                        // FORÇAR PARADA DO SCRIPT
                        await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [3]' });
                    }; try { json = retGoogleSheets.res[0][0]; json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, ''); gO.inf['sheetKepp'] = JSON.parse(json) }
                    catch (catchErr) {
                        sendNtfy({ 'titleText': `ERRO PARSE DADOS DA CÉLULA A2\n${gO.inf.sheetTab}` })
                        // FORÇAR PARADA DO SCRIPT
                        await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [4]' });; esLintIgnore = catchErr;
                    }; aut = gO.inf.sheetKepp.autC6; col = gO.inf.sheetKepp.colC6; conSpl = gO.inf.sheetKepp.conSpl; tabsInf['leadsQtd'][tabsInf.index] = Number(gO.inf.sheetKepp.leadsQtd)
                    leadRandomNames = gO.inf.sheetKepp.randomNames; chromiumHeadless = gO.inf.sheetKepp.chromiumHeadless; scriptHour = gO.inf.sheetKepp.scriptHourWebScraper.split('|')

                    logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `LEADS: ${tabsInf.leadsQtd[tabsInf.index]} | ${gO.inf.sheetTab}` })

                    if (tabsInf.leadsQtd[tabsInf.index] == 0) {
                        // STATUS1 [Nada pendente, esperando 2 minutos...] (NOVA CHACAGEM EM x SEGUNDOS)
                        tabsInf.lastCheck[tabsInf.index] = Math.floor(Date.now() / 1000) + secAwaitNewCheck; await sendData({ 'e': e, 'stop': false, 'status1': `Nada pendente, esperando 2 minutos...` })
                    } else {
                        leads = gO.inf.sheetKepp.leads.split(`#${conSpl}#`);

                        // DADOS DO LEAD
                        let leadInf, leadLinha, leadStatus, leadCnpj, leadTelefone, leadEmail, leadAdministrador, leadPrimeiroNome, leadSobrenome, leadOrigem; for (let [index, value] of leads.entries()) {
                            leadInf = value.split(conSpl); leadLinha = leadInf[0].replace(/^\s+/g, '').replace('LINHA_', ''); leadStatus = leadInf[1].replace(/^\s+/g, '')
                            leadCnpj = leadInf[2].replace(/^\s+/g, ''); leadTelefone = `55${leadInf[3].replace(/^\s+/g, '')}`
                            leadAdministrador = leadInf[4].length > 4 && leadInf[4].includes(' ') ? leadInf[4] : leadInf[6].length > 4 ? leadInf[6] : leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)]
                            leadEmail = leadInf[5].length > 4 ? leadInf[5] : 'semEmail@gmail.com'; leadAdministrador = leadAdministrador.replace(/^\s+/g, '').replace(' ', '###').split('###'); if (leadAdministrador.length < 2) {
                                leadAdministrador = leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)]; leadAdministrador = leadAdministrador.replace(' ', '###').split('###')
                            }; leadPrimeiroNome = leadAdministrador[0]; leadSobrenome = leadAdministrador[1]; leadOrigem = leadInf[7];
                            coldList = gO.inf.sheetTab == 'LISTA_FRIA' || leadOrigem.includes('JSF') || leadOrigem.includes('JUCESP') ? true : false; leadTelefone = coldList ? '887766' : leadTelefone
                        }

                        // CLIENTE: BUSCAR NA LUPA
                        retClientSearch = await clientSearch({ 'page': page, 'browser': browser, 'leadCnpj': leadCnpj })
                        if (!retClientSearch.ret) { logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `ERRO CLIENT SEACH` }); browser.close(); process.exit(); }
                        else { retClientSearch = retClientSearch.res.leadStatus }; leadStatus = retClientSearch

                        // ZERAR VARIÁVEIS
                        statusInf = 'STATUS NÃO DEFINIDO 1'; statusDate = ''; statusDateFull = ''

                        if (leadStatus == 'ENCONTRADO_CONTA' || leadStatus == 'ENCONTRADO_LEAD' || leadStatus == 'ENCONTRADO_EXPIRADO') {
                            // LEAD DA BASE [SIM] ******************************************************************
                            // CLIENTE: PEGAR DADOS DO CONTA/LEAD
                            retClientGetData = await clientGetData({ 'page': page, 'browser': browser, 'leadCnpj': leadCnpj })
                            if (!retClientGetData.ret) { logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `ERRO CLIENT GET DATA` }); browser.close(); process.exit(); }
                            else { retClientGetData = retClientGetData.res }; dataRes = retClientGetData.dataRes; dataDayMonYea = retClientGetData.dataDayMonYea; dataDayMonYeaFull = retClientGetData.dataDayMonYeaFull;
                            dataBoolean = retClientGetData.dataBoolean; statusInf = leadStatus == 'ENCONTRADO_LEAD' ? 'INDICAÇÃO OK' : dataRes; statusDate = dataDayMonYea; statusDateFull = dataDayMonYeaFull
                        }

                        if (gO.inf.sheetTab == 'SOMENTE_CONSULTAR') {
                            statusInf = statusInf.includes(`STATUS NÃO DEFINIDO`) ? 'NADA ENCONTRADO' : leadStatus == 'ENCONTRADO_EXPIRADO' ? 'FORA DO PRAZO' : statusInf
                        } else if (leadStatus == 'NADA_ENCONTRADO' || leadStatus == 'ENCONTRADO_EXPIRADO') {
                            // CLIENTE: INDICAR → LEAD DA BASE [NÃO] | EXPIRADO
                            retClientImput = await clientImput({
                                'page': page, 'browser': browser, 'leadCnpj': leadCnpj, 'leadPrimeiroNome': leadPrimeiroNome,
                                'leadSobrenome': leadSobrenome, 'leadEmail': leadEmail, 'leadTelefone': coldList ? leadTelefone.replace('55219', '219') : leadTelefone,
                            }); if (!retClientImput.ret) { logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `ERRO CLIENT IMPUT` }); browser.close(); process.exit(); }
                            else { retClientImput = retClientImput.res }; imputRes = retClientImput.imputRes

                            // STATUS DE ACORDO COM O ERRO VERMELHO
                            if (imputRes == 'Já existe um lead cadastrado com o CNPJ informado') {
                                if (leadStatus == 'ENCONTRADO_EXPIRADO') { statusInf = 'FORA DO PRAZO' } else { statusInf = 'INDICAÇÃO OUTRO ECE' }
                            } else if (imputRes == 'Já existe um cliente cadastrado com o CNPJ informado') {
                                if (leadStatus == 'ENCONTRADO_EXPIRADO') { statusInf = 'FORA DO PRAZO' }
                                else { statusInf = leadStatus == 'NADA_ENCONTRADO' ? 'JÁ POSSUI CONTA (OUTRO ECE)' : dataBoolean ? 'JÁ POSSUI CONTA' : 'ABERTO SF' }
                            } else if (imputRes == 'Já existe um lead e um cliente cadastrado com o CNPJ informado') {
                                if (leadStatus == 'ENCONTRADO_EXPIRADO') { statusInf = 'FORA DO PRAZO' }
                                else { statusInf = leadStatus == 'NADA_ENCONTRADO' ? 'JÁ POSSUI CONTA (OUTRO ECE)' : dataBoolean ? 'JÁ POSSUI CONTA' : 'ABERTO SF' }
                            } else if (imputRes == 'Lead expirou' || imputRes == 'Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo') {
                                statusInf = 'FORA DO PRAZO'
                            } else if (imputRes == 'INDICAÇÃO OK') {
                                statusInf = 'INDICAÇÃO OK'
                            } else if (imputRes == 'ALERTA: telefone inválido') {
                                statusInf = coldList ? 'DISPONÍVEL' : 'ALERTA: telefone inválido'
                            } else if (imputRes == 'ALERTA: CNPJ inválido') {
                                statusInf = 'ALERTA: CNPJ inválido'
                            } else if (imputRes == 'ALERTA: email inválido') {
                                statusInf = 'ALERTA: email inválido'
                            } else if (imputRes == 'ALERTA: campo não preenchido') {
                                statusInf = 'ALERTA: campo não preenchido'
                            } else if (imputRes == 'ALERTA: status não identificado') {
                                statusInf = 'ALERTA: status não identificado'
                            } else {
                                statusInf = 'STATUS NÃO DEFINIDO 1'
                            }
                        }

                        // STATUS1 [STATUS DA CONSULTA]
                        statusText = `${leadCnpj} | ${statusInf} ${statusDate}`; infSendData = { 'e': e, 'stop': false, 'status1': `${statusText}` }
                        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` }); retSendData = await sendData(infSendData)
                        await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg` }); await new Promise(resolve => { setTimeout(resolve, 1000) })

                        // MANDAR PARA A PLANILHA O RESULTADO 
                        time = dateHour().res; results = [['ID AQUI', `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, statusInf, statusDateFull]]; results = results[0].join(conSpl)
                        retGoogleSheets = await googleSheets({ 'e': e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `${col}${leadLinha}`, 'values': [[results]] }); if (!retGoogleSheets.ret) {
                            err = `$ Erro ao enviar dados para planilha`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); await log({ 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets });
                            await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_7.jpg` });
                            // FORÇAR PARADA DO SCRIPT
                            await processForceStop({ 'origin': 'serverC6 MANDAR PARA A PLANILHA O RESULTADO' });
                        }
                    }
                }

                // F5 | COOKIE KEEP (CASO NENHUMA ABA TENHA LEADS PENDENTES)
                let leadsQtdAll = tabsInf.leadsQtd.reduce((acc, curr) => acc + curr, 0); if (leadsQtdAll == 0 && (startupTab + 900) < Math.floor(Date.now() / 1000)) {
                    startupTab = Math.floor(Date.now() / 1000); logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `ATUALIZANDO PÁGINA [KEEP COOKIE]` });
                    await page.goto(`https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente`, { waitUntil: 'networkidle2' }); await new Promise(resolve => { setTimeout(resolve, 30000) })
                };
            }

            await new Promise(resolve => { setTimeout(resolve, 1000) })
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let err = `$ TRYCATCH Script erro!`
        await sendData({ 'e': e, 'stop': true, 'status1': err })
    }; return { ...({ ret: ret.ret }), ...(ret.msg && { msg: ret.msg }), ...(ret.res && { res: ret.res }), };
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRun()


