function startupFun(b, c) { let a = c - b; let s = Math.floor(a / 1000); let m = a % 1000; let f = m.toString().padStart(3, '0'); return `${s}.${f}`; }; let startup = new Date();
await import('./resources/@export.js'); let e = import.meta.url, ee = e;

async function serverRun(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        logConsole({ e, ee, 'msg': `**************** SERVER **************** [${startupFun(startup, new Date())}]`, });

        // IMPORTAR BIBLIOTECA [NODEJS]
        if (typeof _puppeteer === 'undefined') { await funLibrary({ 'lib': '_puppeteer', }); };

        // CRIAR PASTA DOS REGISTROS
        let time = dateHour().res, mon, day, hou; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`; hou = `${time.hou}.${time.min}.${time.sec}.${time.mil}`;
        await file({ e, 'action': 'write', 'path': `log/Registros/${mon}/${day}/#_Z_#.txt`, 'text': 'x', }); function nowFun() { return Math.floor(Date.now() / 1000); };
        let secAwaitNewCheck = 60, startupTab = nowFun(), startupTabCookie = startupTab;

        // FORÇAR PARADA DO SCRIPT | NTFY
        async function processForceStop(inf = {}) {
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': `${inf.origin || ''}\n\n${pageValue}`, });
            await commandLine({ e, 'command': `${fileProjetos}/${gW.project}/src/${gO.inf.shortcut}/OFF.vbs FORCE_STOP`, }); await new Promise(resolve => { setTimeout(resolve, 7000); }); process.exit();
        };

        let results, infSendData, retGoogleSheets, aut, coldList, err, conSpl, leads, col, statusText, browser, page, pageValue, leadRandomNames, retClientGetData, retClientImput, dataDayMonYea, autRange;
        let statusInf, statusDate, statusDateFull, nameMaster, json, chromiumHeadless, scriptHour, retClientSearch, dataDayMonYeaFull, dataRes, dataBoolean, imputRes, whileStop = false; gO.inf['stop'] = false;
        let tabsInf = { 'index': -1, 'name': ['INDICAR_MANUAL', 'SOMENTE_CONSULTAR', 'LISTA_FRIA', 'INDICAR_AUTOMATICO', 'NOME_MASTER', 'RECHECAGEM',], }; tabsInf['leadsQtd'] = tabsInf.name.map(() => 1);
        tabsInf['lastCheck'] = tabsInf.name.map(() => 0); let range = 'A2';

        // DEFINIR O ID DA PLANILHA E ATALHO
        let googleSheetsId, retGetPath = await getPath({ 'e': new Error(), }); if (!retGetPath.ret) { return retGetPath; }; retGetPath = retGetPath.res.file;
        if (!retGetPath.includes('_TEMP.js')) { googleSheetsId = '1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc'; }
        else if (retGetPath.includes('_New2_TEMP.js')) { googleSheetsId = '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8'; }
        else if (retGetPath.includes('_New3_TEMP.js')) { googleSheetsId = '1dgWhel8Non6gEbLujYr5ZrBB6hEi340Aa7upzP8RWGY'; }
        else if (retGetPath.includes('_New4_TEMP.js')) { googleSheetsId = '1uzlbsL9wqMs9gfMt1XHDEmh1k6MEdPA7JuQ8IzBA1pQ'; }
        else if (retGetPath.includes('_New5_TEMP.js')) { googleSheetsId = '1SHr0tEam3biPOb4p9_iXbGIJCoMkkAgRquDCHLEZYrM'; }
        else if (retGetPath.includes('_New6_TEMP.js')) { googleSheetsId = '1Vr_vLxVwA4zZ7bvM24jWRJqcR39gf8lpogLBJWBIDmM'; }
        else if (retGetPath.includes('_New7_TEMP.js')) { googleSheetsId = '1xXWJhBEOCePSEsgrZnGPamTTiU2pqTxlJtTEE4pxMxI'; }
        else if (retGetPath.includes('_New8_TEMP.js')) { googleSheetsId = '1A6rWJLCsVnKPyJxugfvHC3_Y2qEQqf2gS-fLHKVqKTk'; }
        let shortcut = `z_OUTROS_${retGetPath.split('/').pop().replace(/_TEMP|\.js/g, '')}`; gO.inf['shortcut'] = shortcut; gO.inf['sheetId'] = googleSheetsId; gO.inf['sheetTab'] = tabsInf.name[0];

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': range, }); if (!retGoogleSheets.ret) {
            err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'msg': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
            await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [1]', }); // FORÇAR PARADA DO SCRIPT
        }; try { json = retGoogleSheets.res[0][0]; json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, ''); gO.inf['sheetKepp'] = JSON.parse(json); }
        catch (catchErr) {
            await notification({ e, 'legacy': true, 'ntfy': true, 'title': `ERRO PARSE CÉLULA A2`, 'text': `${gO.inf.sheetTab}`, });
            await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [2]', }); esLintIgnore = catchErr; // FORÇAR PARADA DO SCRIPT
        }; aut = gO.inf.sheetKepp.autC6; col = gO.inf.sheetKepp.colC6; conSpl = gO.inf.sheetKepp.conSpl; leadRandomNames = gO.inf.sheetKepp.randomNames;
        chromiumHeadless = gO.inf.sheetKepp.chromiumHeadless; scriptHour = gO.inf.sheetKepp.scriptHourWebScraper.split('|'); autRange = gO.inf.sheetKepp.range.autC6;

        // '0' → APARECE | '1' → OCULTO
        if (chromiumHeadless === '1') { chromiumHeadless = 'new'; } else { chromiumHeadless = false; }

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { e, 'stop': false, 'status1': '# Iniciando script, aguarde', }; logConsole({ e, ee, 'msg': `${infSendData.status1}`, }); await sendData(infSendData);

        // INICIAR PUPPETEER | FECHAR ABA EM BRANCO 
        browser = await _puppeteer.launch({ // false | 'new'
            'userDataDir': `./log/Registros/${mon}/${day}/${hou}_node${gW.project}_${gO.inf['shortcut'].replace('z_OUTROS_', '')}`, 'headless': chromiumHeadless, 'defaultViewport': { width: 1050, height: 964, },
            'args': ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--disable-gpu', '--disable-extensions',
                '--single-process', '--disable-features=AudioServiceOutOfProcess', '--disable-default-apps', '--disable-sync', '--disable-plugins', '--disable-software-rasterizer', '--disable-webrtc',
                '--disable-print-preview', '--disable-infobars', '--disable-breakpad', '--disable-logging', '--disable-popup-blocking', '--disable-notifications', '--mute-audio', '--disable-cache', '--disable-webgl',
                '--disable-remote-fonts', '--dns-prefetch-disable', '--renderer-process-limit=1', '--disable-download-notification', '--disable-download-resumption', '--disable-touch-drag-drop',
            ], 'ignoreDefaultArgs': ['--disable-extensions',],
        }); page = await browser.newPage(); await (await browser.pages())[0].close();

        // COOKIE [SET]
        await cookiesGetSet({ e, 'page': page, 'action': 'set', 'value': aut, });

        // ABRIR PÁGINA DE BUSCA GLOBAL
        async function openHome() {
            await page.goto(`https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente`, { waitUntil: 'networkidle2', }); await new Promise(resolve => { setTimeout(resolve, 1000); });
            try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': true, }); }
            catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': false, }); esLintIgnore = catchErr; }
        }; await openHome(); await new Promise(resolve => { setTimeout(resolve, 1000); });

        // COOKIE: CHECAR E SALVAR
        async function cookieCheckSave() {
            logConsole({ e, ee, 'msg': `COOKIE: CHECANDO E SALVANDO`, }); pageValue = await page.content(); if (pageValue.includes('Esqueci minha senha')) {
                // CHECAR SE O COOKIE EXPIROU
                err = `$ Cookie inválido!`; logConsole({ e, ee, 'msg': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, });
                await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_1.jpg`, 'fullPage': true, }); }
                catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_1.jpg`, 'fullPage': false, }); esLintIgnore = catchErr; }
                await processForceStop({ 'origin': 'serverC6 CHECAR SE O COOKIE EXPIROU', }); // FORÇAR PARADA DO SCRIPT
            } else {
                // COOKIE: PEGAR E ENVIAR PARA A PLANILHA
                let cGS = await cookiesGetSet({ e, 'page': page, 'action': 'get', }); if (!cGS.ret || cGS.res.length === 0) { await processForceStop({ 'origin': 'serverC6 PEGAR O COOKIE', }); } // FORÇAR PARADA DO SCRIPT
                cGS = JSON.stringify(cGS.res); retGoogleSheets = await googleSheets({ e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': 'INDICAR_MANUAL', 'range': autRange, 'values': [[cGS,],], });
                if (!retGoogleSheets.ret) {
                    err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'msg': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
                    await processForceStop({ 'origin': 'serverC6 MANDAR PARA A PLANILHA O RESULTADO', }); // FORÇAR PARADA DO SCRIPT
                }
            }
        } await cookieCheckSave();

        // **************************************************************************************************************

        while (!whileStop) {
            let now = nowFun(); time = dateHour().res;
            if (!(['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM',].includes(time.dayNam) && (Number(time.hou) > Number(scriptHour[0]) - 1 && Number(time.hou) < Number(scriptHour[1])))) {
                // SEG <> DOM | [??:00] <> [??:00]
                // STATUS1 [Fora do horário permitido]
                infSendData = { e, 'stop': false, 'status1': `$ Fora do horário permitido (${scriptHour[0]}:00 <> ${scriptHour[1]}:00)`, };
                logConsole({ e, ee, 'msg': `${infSendData.status1}`, }); await sendData(infSendData);
                await processForceStop({ 'origin': 'serverC6 STATUS1 [Fora do horário permitido]', }); // FORÇAR PARADA DO SCRIPT
            } else {
                // DEFINIR ABA ATUAL
                tabsInf['index'] = tabsInf.index < (tabsInf.name.length - 1) ? (tabsInf.index + 1) : 0; gO.inf['sheetTab'] = tabsInf.name[tabsInf.index];

                if ((tabsInf.lastCheck[tabsInf.index]) > now) {
                    // IGNORAR CHECAGEM
                    logConsole({ e, ee, 'msg': `IGNORADA | ${gO.inf.sheetTab}`, });
                } else {
                    // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
                    retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': range, }); if (!retGoogleSheets.ret) {
                        err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'msg': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
                        await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [3]', }); // FORÇAR PARADA DO SCRIPT
                    }; try { json = retGoogleSheets.res[0][0]; json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, ''); gO.inf['sheetKepp'] = JSON.parse(json); }
                    catch (catchErr) {
                        await notification({ e, 'legacy': true, 'ntfy': true, 'title': `ERRO PARSE CÉLULA A2`, 'text': `${gO.inf.sheetTab}`, });
                        await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [4]', }); esLintIgnore = catchErr; // FORÇAR PARADA DO SCRIPT
                    }; aut = gO.inf.sheetKepp.autC6; col = gO.inf.sheetKepp.colC6; conSpl = gO.inf.sheetKepp.conSpl; tabsInf['leadsQtd'][tabsInf.index] = Number(gO.inf.sheetKepp.leadsQtd);
                    leadRandomNames = gO.inf.sheetKepp.randomNames; chromiumHeadless = gO.inf.sheetKepp.chromiumHeadless; scriptHour = gO.inf.sheetKepp.scriptHourWebScraper.split('|');

                    logConsole({ e, ee, 'msg': `LEADS: ${tabsInf.leadsQtd[tabsInf.index]} | ${gO.inf.sheetTab}`, });

                    if (tabsInf.leadsQtd[tabsInf.index] === 0) {
                        // STATUS1 [Nada pendente, esperando 2 minutos...] (NOVA CHACAGEM EM x SEGUNDOS)
                        tabsInf.lastCheck[tabsInf.index] = now + secAwaitNewCheck; await sendData({ e, 'stop': false, 'status1': `Nada pendente, esperando 2 minutos...`, });
                    } else {
                        leads = gO.inf.sheetKepp.leads.split(`#${conSpl}#`);

                        // DADOS DO LEAD
                        let leadInf, leadLinha, leadStatus, leadCnpj, leadTelefone, leadEmail, leadAdministrador, leadPrimeiroNome, leadSobrenome, leadOrigem; for (let [index, value,] of leads.entries()) {
                            leadInf = value.split(conSpl); leadLinha = leadInf[0].replace(/^\s+/g, '').replace('LINHA_', ''); leadStatus = leadInf[1].replace(/^\s+/g, '');
                            leadCnpj = leadInf[2].replace(/^\s+/g, ''); leadTelefone = `55${leadInf[3].replace(/^\s+/g, '')}`;
                            leadAdministrador = leadInf[4].length > 4 && leadInf[4].includes(' ') ? leadInf[4] : leadInf[6].length > 4 ? leadInf[6] : leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)];
                            leadEmail = leadInf[5].length > 4 ? leadInf[5] : 'semEmail@gmail.com'; leadAdministrador = leadAdministrador.replace(/^\s+/g, '').replace(' ', '###').split('###');
                            if (leadAdministrador.length < 2) {
                                leadAdministrador = leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)]; leadAdministrador = leadAdministrador.replace(' ', '###').split('###');
                            }; leadPrimeiroNome = leadAdministrador[0]; leadSobrenome = leadAdministrador[1]; leadOrigem = leadInf[7];
                            coldList = gO.inf.sheetTab === 'LISTA_FRIA' || leadOrigem.includes('JSF') || !!leadOrigem.includes('JUCESP'); leadTelefone = coldList ? '887766' : leadTelefone;
                        }

                        // CLIENTE: BUSCAR NA LUPA
                        retClientSearch = await clientSearch({ 'page': page, 'browser': browser, 'leadCnpj': leadCnpj, });
                        if (!retClientSearch.ret) { logConsole({ e, ee, 'msg': `ERRO CLIENT SEACH`, }); browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000); }); process.exit(); }
                        else { retClientSearch = retClientSearch.res.leadStatus; }; leadStatus = retClientSearch;

                        // ZERAR VARIÁVEIS
                        statusInf = 'STATUS NÃO DEFINIDO 1'; statusDate = ''; statusDateFull = ''; nameMaster = '';

                        if (leadStatus === 'ENCONTRADO_CONTA' || leadStatus === 'ENCONTRADO_LEAD' || leadStatus === 'ENCONTRADO_EXPIRADO') {
                            // LEAD DA BASE [SIM] ******************************************************************
                            // CLIENTE: PEGAR DADOS DO CONTA/LEAD
                            retClientGetData = await clientGetData({ 'page': page, 'browser': browser, 'leadCnpj': leadCnpj, });
                            if (!retClientGetData.ret) { logConsole({ e, ee, 'msg': `ERRO CLIENT GET DATA`, }); browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000); }); process.exit(); }
                            else { retClientGetData = retClientGetData.res; }; dataRes = retClientGetData.dataRes; dataDayMonYea = retClientGetData.dataDayMonYea; dataDayMonYeaFull = retClientGetData.dataDayMonYeaFull;
                            dataBoolean = retClientGetData.dataBoolean; statusInf = leadStatus === 'ENCONTRADO_LEAD' ? 'INDICAÇÃO OK' : dataRes; statusDate = dataDayMonYea; statusDateFull = dataDayMonYeaFull;
                            if (gO.inf.sheetTab === 'NOME_MASTER') { nameMaster = retClientGetData.nameMaster; }
                        }

                        if (['SOMENTE_CONSULTAR', 'NOME_MASTER', 'RECHECAGEM',].includes(gO.inf.sheetTab)) {
                            statusInf = statusInf.includes(`STATUS NÃO DEFINIDO`) ? 'NADA ENCONTRADO' : leadStatus === 'ENCONTRADO_EXPIRADO' ? 'FORA DO PRAZO' : statusInf;
                            if (gO.inf.sheetTab === 'NOME_MASTER') { statusDateFull = statusDateFull || 'xx/xx/xxxx 00:00'; nameMaster = nameMaster || 'NÃO ENCONTRADO'; }
                        } else if (leadStatus === 'NADA_ENCONTRADO' || leadStatus === 'ENCONTRADO_EXPIRADO') {
                            // CLIENTE: INDICAR → LEAD DA BASE [NÃO] | EXPIRADO
                            retClientImput = await clientImput({
                                'page': page, 'browser': browser, 'leadCnpj': leadCnpj, 'leadPrimeiroNome': leadPrimeiroNome,
                                'leadSobrenome': leadSobrenome, 'leadEmail': leadEmail, 'leadTelefone': coldList ? leadTelefone.replace('55219', '219') : leadTelefone,
                            }); if (!retClientImput.ret) { logConsole({ e, ee, 'msg': `ERRO CLIENT IMPUT`, }); browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000); }); process.exit(); }
                            else { retClientImput = retClientImput.res; }; imputRes = retClientImput.imputRes;

                            // STATUS DE ACORDO COM O ERRO VERMELHO
                            if (imputRes === 'Já existe um lead cadastrado com o CNPJ informado' || imputRes === 'Lead pertence a outro escritorio') {
                                if (leadStatus === 'ENCONTRADO_EXPIRADO') { statusInf = 'FORA DO PRAZO'; } else { statusInf = 'INDICAÇÃO OUTRO ECE'; }
                            } else if (imputRes === 'Já existe um cliente cadastrado com o CNPJ informado') {
                                if (leadStatus === 'ENCONTRADO_EXPIRADO') { statusInf = 'FORA DO PRAZO'; }
                                else { statusInf = leadStatus === 'NADA_ENCONTRADO' ? 'JÁ POSSUI CONTA (OUTRO ECE)' : dataBoolean ? 'JÁ POSSUI CONTA' : 'ABERTO SF'; }
                            } else if (imputRes === 'Já existe um lead e um cliente cadastrado com o CNPJ informado') {
                                if (leadStatus === 'ENCONTRADO_EXPIRADO') { statusInf = 'FORA DO PRAZO'; }
                                else { statusInf = leadStatus === 'NADA_ENCONTRADO' ? 'JÁ POSSUI CONTA (OUTRO ECE)' : dataBoolean ? 'JÁ POSSUI CONTA' : 'ABERTO SF'; }
                            } else if (imputRes === 'Lead expirou' || imputRes === 'Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo') {
                                statusInf = 'FORA DO PRAZO';
                            } else if (imputRes === 'INDICAÇÃO OK') {
                                statusInf = 'INDICAÇÃO OK';
                            } else if (imputRes === 'ALERTA: telefone inválido') {
                                statusInf = coldList ? 'DISPONÍVEL' : 'ALERTA: telefone inválido';
                            } else if (imputRes === 'ALERTA: CNPJ inválido') {
                                statusInf = 'ALERTA: CNPJ inválido';
                            } else if (imputRes === 'ALERTA: email inválido') {
                                statusInf = 'ALERTA: email inválido';
                            } else if (imputRes === 'ALERTA: campo não preenchido') {
                                statusInf = 'ALERTA: campo não preenchido';
                            } else if (imputRes === 'ALERTA: status não identificado') {
                                statusInf = 'ALERTA: status não identificado';
                            } else {
                                statusInf = 'STATUS NÃO DEFINIDO 1';
                            }
                        }

                        // STATUS1 [STATUS DA CONSULTA]
                        statusText = `${leadCnpj} | ${statusInf} ${statusDate}`; infSendData = { e, 'stop': false, 'status1': `${statusText}`, };
                        logConsole({ e, ee, 'msg': `${infSendData.status1}`, }); await sendData(infSendData);
                        try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': true, }); }
                        catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': false, }); esLintIgnore = catchErr; }; await new Promise(resolve => { setTimeout(resolve, 500); });

                        // MANDAR PARA A PLANILHA O RESULTADO 
                        time = dateHour().res; results = [['ID AQUI', `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, statusInf, statusDateFull, nameMaster,],]; results = results[0].join(conSpl);
                        retGoogleSheets = await googleSheets({ e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `${col}${leadLinha}`, 'values': [[results,],], }); if (!retGoogleSheets.ret) {
                            err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'msg': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
                            try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_7.jpg`, 'fullPage': true, }); }
                            catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_7.jpg`, 'fullPage': false, }); esLintIgnore = catchErr; }
                            await processForceStop({ 'origin': 'serverC6 MANDAR PARA A PLANILHA O RESULTADO', }); // FORÇAR PARADA DO SCRIPT
                        }
                    }
                }

                // COOKIE {x MIN}: KEEP [F5] (CASO NENHUMA ABA TENHA LEADS PENDENTES)
                if ((startupTab + (10 * 60)) < now && tabsInf.leadsQtd.reduce((a, c) => a + c, 0) === 0) {
                    startupTab = now; logConsole({ e, ee, 'msg': `ATUALIZANDO PÁGINA [KEEP COOKIE]`, });
                    await page.goto(`https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente`, { waitUntil: 'networkidle2', }); await new Promise(resolve => { setTimeout(resolve, 30000); });
                };

                // COOKIE {x MIN}: CHECAR SE EXPIROU E REGISTRAR NA PLANILHA
                if ((startupTabCookie + (5 * 60)) < now) { startupTabCookie = now; await cookieCheckSave(); };

            }

            await new Promise(resolve => { setTimeout(resolve, 1000); });
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];

        let err = `% TRYCATCH Script erro!`; await sendData({ e, 'stop': true, 'status1': err, });
    };

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRun();


