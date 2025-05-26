let startup = new Date(); globalThis['sP'] = import.meta.url; await import('./resources/@export.js'); let e = sP, ee = e; let libs = { 'puppeteer': {}, };

async function serverRun(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        /* IMPORTAR BIBLIOTECA [NODE] */ libs['puppeteer'] = { 'puppeteer': 1, 'pro': true, }; libs = await importLibs(libs, 'serverRun [WebScraper {C6}]');

        await logConsole({ e, ee, 'txt': `**************** SERVER **************** [${startupTime(startup, new Date())}]`, });

        // CRIAR PASTA DOS REGISTROS
        let time = dateHour().res, mon = `MES_${time.mon}_${time.monNam}`, day = `DIA_${time.day}`, hou = time.hou, houMinSecMil = `${hou}.${time.min}.${time.sec}.${time.mil}`;
        let pathWork = `logs/Registros/${mon}/${day}/${hou}.00-${hou}.59/${gW.firstFileCall.replace('server', '')}`; await file({ e, 'action': 'write', 'path': `${pathWork}/#_Z_#.txt`, 'text': 'x', });
        function nowFun() { return Math.floor(Date.now() / 1000); } let secAwaitNewCheck = 60, startupTab = nowFun(), startupTabCookie = startupTab;

        // FORÇAR PARADA DO SCRIPT_NTFY | ERRO A2 | FAZER PARSE DA STRING
        async function processForceStop(inf = {}) {
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': `${inf.origin || ''}\n\n${pageValue}`, });
            await commandLine({ e, 'command': `${fileProjetos}/${gW.project}/src/${gO.inf.shortcut}/OFF.vbs FORCE_STOP`, }); await new Promise(r => { setTimeout(r, 7000); }); crashCode();
        } async function errA2(inf = '') {
            let title = `ERRO PARSE CÉLULA A2`; let text = `[${inf}] ${gO.inf.sheetTab}\n${gW.project}\n${gO.inf.shortcut}`; await notification({ e, 'legacy': true, title, text, });
            await processForceStop({ 'origin': `${title} ${text}`, });
        } function stringToObj(t, s) { let o = {}; try { let p = t.split(s); for (let i = 0; i < p.length; i += 2) { o[p[i]] = p[i + 1] !== undefined ? p[i + 1] : ''; } } catch (c) { o = false; } return o; }

        let infSendData, retGoogleSheets, coldList, err, browser, page, pageValue, retCliGetDat, retClientImput, dataDayMonYea, autRange, leadStatus, json, retClientSearch; gO.inf['stop'] = false;
        let tabsInf = { 'index': -1, 'names': ['INDICAR_MANUAL',], }; tabsInf['leadsQtd'] = tabsInf.names.map(() => 1); tabsInf['lastCheck'] = tabsInf.names.map(() => 0); let range = 'A2';

        /* DEFINIR O ID DA PLANILHA E ATALHO */ // gW.firstFileCall = 'serverC6_New3'; // ← ************ TESTES ************
        gO.inf['shortcut'] = `z_OUTROS_${gW.firstFileCall}`; gO.inf[`screenshot`] = `${gW.firstFileCall.replace('server', '')}`; gO.inf['sheetTab'] = tabsInf.names[0]; let sheetsMap = {
            'serverC6': '1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc', 'serverC6_New2': '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8', 'serverC6_New3': '1dgWhel8Non6gEbLujYr5ZrBB6hEi340Aa7upzP8RWGY',
        }; gO.inf['sheetId'] = sheetsMap[gW.firstFileCall];

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, range, }); if (!retGoogleSheets.ret) {
            err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
            await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [1]', }); // FORÇAR PARADA DO SCRIPT
        } try { json = retGoogleSheets.res[0][0]; json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, ''); gO.inf['sheetKepp'] = JSON.parse(json); }
        catch (c) { await errA2(`[2]`); /* FORÇAR PARADA DO SCRIPT */ } // '0' → APARECE | '1' → OCULTO
        let { tabsWork, autC6: aut, conSpl, randomNames: leadRandomNames, scriptHourWebScraper: scriptHour, chromiumHeadless, } = gO.inf.sheetKepp; autRange = gO.inf.sheetKepp.range.autC6;
        tabsWork = false; if (!tabsWork) { tabsWork = ['INDICAR_MANUAL', 'INDICAR_AUTOMATICO', 'SOMENTE_CONSULTAR', 'LISTA_FRIA', 'RECHECAGEM', 'NOME_MASTER',]; } // REMOVER ISSO DEPOIS
        tabsInf.names = [...new Set([...tabsInf.names, ...tabsWork,]),].filter(v => v !== '' && v !== null); chromiumHeadless = chromiumHeadless === '1' ? 'new' : false; scriptHour = scriptHour.split('|');

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { e, 'stop': false, 'status1': '# Iniciando script, aguarde', }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

        // INICIAR PUPPETEER | FECHAR ABA EM BRANCO 
        browser = await _puppeteer.launch({ // false | 'new'
            'userDataDir': `./${pathWork}/${houMinSecMil}_node${gW.project}_${gO.inf.shortcut.replace('z_OUTROS_', '')}_`, 'headless': chromiumHeadless, 'defaultViewport': { width: 1050, height: 964, },
            'args': ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--disable-gpu', '--disable-extensions',
                '--single-process', '--disable-features=AudioServiceOutOfProcess', '--disable-default-apps', '--disable-sync', '--disable-plugins', '--disable-software-rasterizer', '--disable-webrtc',
                '--disable-print-preview', '--disable-infobars', '--disable-breakpad', '--disable-logging', '--disable-popup-blocking', '--disable-notifications', '--mute-audio', '--disable-cache',
                '--disable-webgl', '--disable-remote-fonts', '--dns-prefetch-disable', '--renderer-process-limit=1', '--disable-download-notification', '--disable-download-resumption', '--disable-touch-drag-drop',
            ], 'ignoreDefaultArgs': ['--disable-extensions',],
        }); page = await browser.newPage(); await (await browser.pages())[0].close();

        // COOKIE [SET]
        await cookiesGetSet({ e, page, 'action': 'set', 'value': aut, });

        // ABRIR PÁGINA DE BUSCA GLOBAL
        async function openHome() { await page.goto('https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente', { waitUntil: 'networkidle2', }); await screenshot({ e, page, 'fileName': `screenshot`, }); }
        await openHome();

        // COOKIE: CHECAR E SALVAR
        async function cookieCheckSave() {
            logConsole({ e, ee, 'txt': `COOKIE: CHECANDO E SALVANDO`, }); pageValue = await page.content(); if (pageValue.includes('Esqueci minha senha')) {
                err = `$ Cookie inválido!`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); // CHECAR SE O COOKIE EXPIROU
                await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); await screenshot({ e, page, 'fileName': `err_1`, });
                await processForceStop({ 'origin': 'serverC6 CHECAR SE O COOKIE EXPIROU', }); // FORÇAR PARADA DO SCRIPT
            } else { // COOKIE: PEGAR E ENVIAR PARA A PLANILHA
                let cGS = await cookiesGetSet({ e, page, 'action': 'get', }); if (!cGS.ret || cGS.res.length === 0) { await processForceStop({ 'origin': 'serverC6 PEGAR O COOKIE', }); } // FORÇAR PARADA DO SCRIPT
                cGS = JSON.stringify(cGS.res); let rGS = await googleSheets({ e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': 'INDICAR_MANUAL', 'range': autRange, 'values': [[cGS,],], }); if (!rGS.ret) {
                    err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': rGS, });
                    await processForceStop({ 'origin': 'serverC6 MANDAR PARA A PLANILHA O RESULTADO', }); // FORÇAR PARADA DO SCRIPT
                }
            }
        } await cookieCheckSave();

        // **************************************************************************************************************

        while (!false) {
            time = dateHour().res; let a = time.dayNam; let b = Number(time.hou); let c = Number(scriptHour[0] - 1); let d = Number(scriptHour[1]); let now = nowFun();

            if (!((['SEG', 'TER', 'QUA', 'QUI', 'SEX',].includes(a) && (b > c && b < d)) || (['SAB', 'DOM',].includes(a) && (b > c && b < d - 7)))) {
                infSendData = { e, 'stop': false, 'status1': `$ Fora do horário permitido (${scriptHour[0]}:00 <> ${scriptHour[1]}:00)`, };
                logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData); await processForceStop({ 'origin': 'serverC6 STATUS1 [Fora do horário permitido]', }); // FORÇAR PARADA DO SCRIPT
            } else {
                // (SEG <> DMON → [00:00] <> [00:00]) DEFINIR ABA ATUAL
                tabsInf['index'] = tabsInf.index < (tabsInf.names.length - 1) ? (tabsInf.index + 1) : 0; gO.inf['sheetTab'] = tabsInf.names[tabsInf.index];

                if ((tabsInf.lastCheck[tabsInf.index]) > now) {
                    // IGNORAR CHECAGEM
                    logConsole({ e, ee, 'txt': `IGNORADA | ${gO.inf.sheetTab}`, });
                } else {
                    // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
                    retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, range, }); if (!retGoogleSheets.ret) {
                        err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
                        await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [3]', }); // FORÇAR PARADA DO SCRIPT
                    } try { json = retGoogleSheets.res[0][0]; json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, ''); gO.inf['sheetKepp'] = JSON.parse(json); }
                    catch (c) { await errA2(`[1]`); /* FORÇAR PARADA DO SCRIPT */ } let { colC6: col, leadsQtd, leads: lead, } = gO.inf.sheetKepp; tabsInf['leadsQtd'][tabsInf.index] = Number(leadsQtd);

                    logConsole({ e, ee, 'txt': `LEADS: ${tabsInf.leadsQtd[tabsInf.index]} | ${gO.inf.sheetTab}`, }); if (tabsInf.leadsQtd[tabsInf.index] === 0) {
                        tabsInf.lastCheck[tabsInf.index] = now + secAwaitNewCheck; await sendData({ e, 'stop': false, 'status1': `Nada pendente, esperando 2 minutos...`, }); // NADA PENDENTE
                    } else {
                        let leadLinha, leadCnpj, leadTelefone, leadEmail, leadAdministrador, leadPrimeiroNome, leadSobrenome, leadOrigem, statusInf = 'STATUS NÃO DEFINIDO 1', statusDate = '', statusDateFull = '';
                        let leadLimites, leadTaxas, leadModelo, leadCep, leadNumero, leadComplemento, leadReferencia, nameMaster = '', dataBoolean, dataDayMonYeaFull;

                        // DADOS DO LEAD
                        if (!lead.includes('KEY_VALUE')) {
                            lead = lead.split(conSpl); leadLinha = lead[0].replace(/^\s+/g, '').replace('LINHA_', ''); leadCnpj = lead[2].replace(/^\s+/g, '');
                            leadTelefone = `55${lead[3].replace(/^\s+/g, '')}`; leadEmail = lead[5].length > 4 ? lead[5] : 'semEmail@gmail.com';
                            leadAdministrador = lead[4].length > 4 && lead[4].includes(' ') ? lead[4] : lead[6].length > 4 ? lead[6] : leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)];
                            leadAdministrador = leadAdministrador.replace(/^\s+/g, '').replace(' ', '###').split('###'); if (leadAdministrador.length < 2) {
                                leadAdministrador = leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)]; leadAdministrador = leadAdministrador.replace(' ', '###').split('###');
                            } leadPrimeiroNome = leadAdministrador[0]; leadSobrenome = leadAdministrador[1]; leadOrigem = lead[7];
                            coldList = gO.inf.sheetTab === 'LISTA_FRIA' || leadOrigem.includes('JSF') || !!leadOrigem.includes('JUCESP'); leadTelefone = coldList ? '887766' : leadTelefone;
                        } else {
                            ({
                                linha: leadLinha, cnpj: leadCnpj, limites: leadLimites, taxas: leadTaxas, modelo: leadModelo, cep: leadCep, numero: leadNumero, complemento: leadComplemento, referencia: leadReferencia,
                            } = stringToObj(lead, conSpl));
                        }

                        // CLIENTE: BUSCAR NA LUPA
                        retClientSearch = await clientSearch({ page, browser, leadCnpj, }); if (!retClientSearch.ret) {
                            logConsole({ e, ee, 'txt': `ERRO CLIENT SEACH`, }); browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode();
                        } else { retClientSearch = retClientSearch.res.leadStatus; } leadStatus = retClientSearch;

                        if (leadStatus === 'ENCONTRADO_CONTA' || leadStatus === 'ENCONTRADO_LEAD' || leadStatus === 'ENCONTRADO_EXPIRADO') {
                            // LEAD DA BASE [SIM] ******************************************************************
                            retCliGetDat = await clientGetData({ page, browser, leadCnpj, }); // CLIENTE: PEGAR DADOS DO CONTA/LEAD
                            if (!retCliGetDat.ret) { logConsole({ e, ee, 'txt': `ERRO CLIENT GET DATA`, }); browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode(); }
                            else { retCliGetDat = retCliGetDat.res; } dataDayMonYea = retCliGetDat.dataDayMonYea; dataDayMonYeaFull = retCliGetDat.dataDayMonYeaFull; dataBoolean = retCliGetDat.dataBoolean;
                            statusInf = leadStatus === 'ENCONTRADO_LEAD' ? 'INDICAÇÃO OK' : retCliGetDat.dataRes; statusDate = dataDayMonYea; statusDateFull = dataDayMonYeaFull;
                            if (gO.inf.sheetTab === 'NOME_MASTER') { nameMaster = retCliGetDat.nameMaster; }
                        }

                        if (['SOMENTE_CONSULTAR', 'NOME_MASTER', 'RECHECAGEM', 'MAQUINA_MANUAL',].includes(gO.inf.sheetTab)) {
                            if (!(leadStatus === 'ENCONTRADO_CONTA' && ['MAQUINA_MANUAL',].includes(gO.inf.sheetTab))) {
                                statusInf = statusInf.includes(`STATUS NÃO DEFINIDO`) ? 'NADA ENCONTRADO' : leadStatus === 'ENCONTRADO_EXPIRADO' ? 'FORA DO PRAZO' : statusInf;
                                if (gO.inf.sheetTab === 'NOME_MASTER') { statusDateFull = statusDateFull || 'xx/xx/xxxx 00:00'; nameMaster = nameMaster || 'NÃO ENCONTRADO'; }
                            } // else { await maquinaInput({ page, browser, leadCnpj, leadLimites, leadTaxas, leadModelo, leadCep, leadNumero, leadComplemento, leadReferencia, }); }
                        } else if (leadStatus === 'NADA_ENCONTRADO' || leadStatus === 'ENCONTRADO_EXPIRADO') {
                            // CLIENTE: INDICAR → LEAD DA BASE [NÃO] | EXPIRADO
                            retClientImput = await clientImput({ page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, 'leadTelefone': coldList ? leadTelefone.replace('55219', '219') : leadTelefone, });
                            if (!retClientImput.ret) { logConsole({ e, ee, 'txt': `ERRO CLIENT IMPUT`, }); browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode(); }
                            else { retClientImput = retClientImput.res; } let imputRes = retClientImput.imputRes;

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
                        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | ${statusInf} ${statusDate}`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);
                        await screenshot({ e, page, 'fileName': `screenshot`, }); // MANDAR PARA A PLANILHA O RESULTADO 
                        time = dateHour().res; let results = [['ID AQUI', `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, statusInf, statusDateFull, nameMaster,],]; results = results[0].join(conSpl);
                        retGoogleSheets = await googleSheets({ e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `${col}${leadLinha}`, 'values': [[results,],], }); if (!retGoogleSheets.ret) {
                            err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
                            await screenshot({ e, page, 'fileName': `err_7`, }); await processForceStop({ 'origin': 'serverC6 MANDAR PARA A PLANILHA O RESULTADO', }); // FORÇAR PARADA DO SCRIPT
                        }
                    }
                }

                // COOKIE KEEP [F5] {x MIN}: (CASO NENHUMA ABA TENHA LEADS PENDENTES)
                if ((startupTab + (5 * 60)) < now && tabsInf.leadsQtd.reduce((a, c) => a + c, 0) === 0) {
                    startupTab = now; logConsole({ e, ee, 'txt': `ATUALIZANDO PÁGINA [KEEP COOKIE]`, }); await openHome(); await new Promise(r => { setTimeout(r, 30000); });
                }

                // COOKIE SALVAR {x MIN}: CHECAR SE EXPIROU E REGISTRAR NA PLANILHA
                if ((startupTabCookie + (5 * 60)) < now) { startupTabCookie = now; await cookieCheckSave(); }

            }

            await new Promise(r => { setTimeout(r, 1000); });
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let err = `% TRYCATCH Script erro!`; await sendData({ e, 'stop': true, 'status1': err, });
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRun();


