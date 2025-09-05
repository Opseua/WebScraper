let startup = new Date(); globalThis['firstFileCall'] = new Error(); await import('./resources/@export.js'); let e = firstFileCall, ee = e; let libs = { 'puppeteer': {}, };

async function serverRun(inf = {}) {
    let ret = { 'ret': false, }; e = inf.e || e;
    try {
        /* IMPORTAR BIBLIOTECA [NODE] */ libs['puppeteer'] = { 'puppeteer': 1, 'pro': true, }; libs = await importLibs(libs, 'serverRun [WebScraper {C6}]');

        await logConsole({ e, ee, 'txt': `**************** SERVER **************** [${startupTime(startup, new Date())}]`, });

        // CRIAR PASTA DOS REGISTROS
        let time = dateHour().res, mon = `MES_${time.mon}_${time.monNam}`, day = `DIA_${time.day}`, hou = time.hou, houMinSecMil = `${hou}.${time.min}.${time.sec}.${time.mil}`, serverWeb, chromeDestiny;
        let pathWork = `logs/Registros/${mon}/${day}/${hou}.00-${hou}.59/${gW.cloneProject.replace('server', '')}`; await file({ e, 'action': 'write', 'path': `${pathWork}/#_Z_#.txt`, 'content': 'x', });
        function nowFun() { return Math.floor(Date.now() / 1000); } let secAwaitNewCheck = 30, startupTab = nowFun(), startupTabCookie = startupTab, infSendData, pp = `${fileProjetos}/${gW.project}`;

        // FORÇAR PARADA DO SCRIPT_NTFY | ERRO A2 | FAZER PARSE DA STRING
        serverWeb = gW.serverWeb; // serverWeb = gW.serverWebEstrelar;
        chromeDestiny = `ESTRELAR_MARCOS-CHROME-NAO_DEFINIDO`; // chromeDestiny = `OPSEUA-CHROME-CHROME_EXTENSION-USUARIO_0`; 
        chromeDestiny = `${serverWeb}:${gW.portWeb}/?roo=${chromeDestiny}`; async function processForceStop(inf = {}) {
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': `${inf.origin || ''}\n\n${pageValue}`, });
            await commandLine({ e, 'command': `${pp}/src/${gO.inf.shortcut}/OFF.vbs FORCE_STOP`, }); await new Promise(r => { setTimeout(r, 7000); }); crashCode();
        } async function errA2(inf = '') {
            let title = `ERRO PARSE CÉLULA A2`; let text = `[${inf}] ${gO.inf.sheetTab}\n${gW.project}\n${gO.inf.shortcut}`; await notification({ e, 'legacy': true, title, text, });
            await processForceStop({ 'origin': `${title} ${text}`, });
        } function stringToObj(t, s) { let o = {}; try { let p = t.split(s); for (let i = 0; i < p.length; i += 2) { o[p[i]] = p[i + 1] !== undefined ? p[i + 1] : ''; } } catch { o = false; } return o; }

        let coldList, err, browser, page, pageValue, autRange, leadStatus, json, retGoogleSheets, retCliGetDat, retClientImput, retClientSearch, retMaquinaInput, range = 'A2'; gO.inf['stop'] = false;
        let tabsInf = { 'index': -1, 'names': ['INDICAR_MANUAL',], }; tabsInf['leadsQtd'] = tabsInf.names.map(() => 1); tabsInf['lastCheck'] = tabsInf.names.map(() => 0); // gW.cloneProject = 'serverC6_New2'; // TESTES

        // DEFINIR O ID DA PLANILHA E ATALHO
        gO.inf['shortcut'] = `z_OUTROS_${gW.cloneProject}`; gO.inf[`screenshot`] = `${gW.cloneProject.replace('server', '')}`; gO.inf['sheetTab'] = tabsInf.names[0]; let message, sheetsMap = {
            'serverC6': '1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc', 'serverC6_New2': '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8',
        }; gO.inf['sheetId'] = sheetsMap[gW.cloneProject]; let width = 1280, height = 1024, infCL = { e, 'awaitFinish': true, }, ppOk = `${pp}/logs/resolution.txt`, infFl = { e, 'action': 'read', 'path': ppOk, };

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, range, }); if (!retGoogleSheets.ret) {
            err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
            await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [1]', }); // FORÇAR PARADA DO SCRIPT
        } try { json = retGoogleSheets.res[0][0]; json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, ''); gO.inf['sheetKepp'] = JSON.parse(json); }
        catch (c) { await errA2(`[2]`); /* FORÇAR PARADA DO SCRIPT */ } let resize = function (a, b) { return Math.floor(parseInt(a, 10) * b); }; // '0' → APARECE | '1' → OCULTO
        let { tabsWork, autC6: aut, conSpl, randomNames: leadRandomNames, scriptHourWebScraper: scriptHour, chromiumHeadless, } = gO.inf.sheetKepp; autRange = gO.inf.sheetKepp.range.autC6;
        tabsInf.names = [...new Set([...tabsWork,]),].filter(v => v !== '' && v !== null); chromiumHeadless = chromiumHeadless === '1' ? 'new' : false; scriptHour = scriptHour.split('|'); if (tabsInf.names.length === 0) {
            let text = `'tabsWork' VAZIA`; await logConsole({ e, ee, txt: text, }); await notification({ e, legacy: true, title: `ERRO ${gW.cloneProject}`, text, }); await processForceStop({ origin: text, });
        }

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { e, 'stop': false, 'status1': '# Iniciando script, aguarde', }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData); client({ e, });

        // PEGAR RESOLUÇÃO DA TELA
        infCL['command'] = `powershell.exe -Command ""Add-Type -AssemblyName System.Windows.Forms;[System.Windows.Forms.Screen]::PrimaryScreen.WorkingArea.ToString() | Out-File ${ppOk} -Encoding UTF8""`;
        await commandLine(infCL); let x = await file(infFl); if (x.res) { let n = x.res.match(/\d+/g); width = Number(n[2]); height = Number(n[3]); } width = resize(width, 0.6); height = resize(height, 1);

        // INICIAR PUPPETEER | FECHAR ABA EM BRANCO 
        browser = await _puppeteer.launch({ // false | 'new'
            'userDataDir': `./${pathWork}/${houMinSecMil}_node${gW.project}_${gO.inf.shortcut.replace('z_OUTROS_', '')}_`, 'headless': chromiumHeadless,
            'defaultViewport': { width, height, 'deviceScaleFactor': 2, /* AUMENTAR QUALIDADE 1, 2.5, 3.8 */ }, 'args': ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--no-first-run',
                /* RECURSOS DE VÍDEO: REDUZIR */ // '--disable-accelerated-2d-canvas', '--disable-gpu', '--disable-software-rasterizer', '--disable-webgl', '--disable-remote-fonts', '--disable-webrtc', /* XXX */
                /* RECURSOS DE VÍDEO: AUMENTAR */ '--enable-accelerated-2d-canvas', '--enable-gpu-rasterization', '--enable-webgl', /* XXX */
                '--single-process', '--disable-features=AudioServiceOutOfProcess', '--disable-default-apps', '--disable-sync', '--disable-plugins', '--disable-print-preview', '--disable-infobars',
                '--disable-breakpad', '--disable-logging', '--disable-popup-blocking', '--disable-notifications', '--mute-audio', '--disable-cache', '--dns-prefetch-disable', '--renderer-process-limit=1',
                '--disable-download-notification', '--disable-download-resumption', '--disable-touch-drag-drop', `--window-size=${width},${height}`, `--window-position=0,0`, '--disable-extensions', '--no-zygote',
            ], 'ignoreDefaultArgs': ['--disable-extensions',],
        }); page = await browser.newPage(); await (await browser.pages())[0].close();

        // COOKIE [SET] | ABRIR PÁGINA DE BUSCA GLOBAL
        await cookiesGetSet({ e, page, 'action': 'set', 'value': aut, }); let url = 'https://c6bank.my.site.com/partners/s/lead/Lead/Default';
        async function openHome() { await page.goto(url, { waitUntil: 'networkidle2', }); await screenshot({ e, page, 'fileName': `screenshot`, }); } await openHome();

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
                logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);
            } else {
                // (SEG <> DMON → [00:00] <> [00:00]) DEFINIR ABA ATUAL
                tabsInf['index'] = tabsInf.index < (tabsInf.names.length - 1) ? (tabsInf.index + 1) : 0; gO.inf['sheetTab'] = tabsInf.names[tabsInf.index]; let sheetTab = gO.inf.sheetTab;

                if ((tabsInf.lastCheck[tabsInf.index]) > now) {
                    logConsole({ e, ee, 'txt': `IGNORADA | ${sheetTab}`, }); // IGNORAR CHECAGEM
                } else {
                    // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
                    retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': sheetTab, range, }); if (!retGoogleSheets.ret) {
                        err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
                        await processForceStop({ 'origin': 'serverC6 DADOS GLOBAIS DA PLANILHA E FAZER O PARSE [3]', }); // FORÇAR PARADA DO SCRIPT
                    } try { json = retGoogleSheets.res[0][0]; json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, ''); gO.inf['sheetKepp'] = JSON.parse(json); }
                    catch (c) { await errA2(`[1]`); /* FORÇAR PARADA DO SCRIPT */ } let { colC6: col, leadsQtd, leads: lead, } = gO.inf.sheetKepp; tabsInf['leadsQtd'][tabsInf.index] = Number(leadsQtd);

                    logConsole({ e, ee, 'txt': `LEADS: ${tabsInf.leadsQtd[tabsInf.index]} | ${sheetTab}`, }); if (tabsInf.leadsQtd[tabsInf.index] === 0) {
                        tabsInf.lastCheck[tabsInf.index] = now + secAwaitNewCheck; await sendData({ e, 'stop': false, 'status1': `Nada pendente, esperando 2 minutos...`, }); // NADA PENDENTE
                    } else {
                        if (sheetTab === 'BOAS_VINDAS') { await newAccounts({ page, browser, 'sheetKepp': gO.inf.sheetKepp, }); tabsInf.lastCheck[tabsInf.index] = now + secAwaitNewCheck; continue; }

                        let leadLinha, leadCnpj, leadTelefone, leadEmail, leadRazaoSocial, leadAdministrador, leadPrimeiroNome, leadSobrenome, leadOrigem, statusInf = 'STATUS NÃO DEFINIDO', dif = 0;
                        let leadDadosIniciais, leadProdutos, leadTaxas, leadModelo, leadQuantidade, leadOperadora, leadCep, leadNumero, leadComplemento, leadReferencia, nameMaster = '', leadDate = '';

                        // DADOS DO LEAD
                        if (!lead.includes('KEY_VALUE')) {
                            lead = lead.split(conSpl); leadLinha = lead[0].replace(/^\s+/g, '').replace('LINHA_', ''); leadCnpj = lead[2].replace(/^\s+/g, '');
                            leadTelefone = `55${lead[3].replace(/^\s+/g, '')}`; leadEmail = lead[5].length > 4 ? lead[5] : 'semEmail@gmail.com'; leadRazaoSocial = lead[6];
                            leadAdministrador = lead[4].length > 4 && lead[4].includes(' ') ? lead[4] : lead[6].length > 4 ? lead[6] : leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)];
                            leadAdministrador = leadAdministrador.replace(/^\s+/g, '').replace(' ', '###').split('###'); if (leadAdministrador.length < 2) {
                                leadAdministrador = leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)]; leadAdministrador = leadAdministrador.replace(' ', '###').split('###');
                            } leadPrimeiroNome = leadAdministrador[0]; leadSobrenome = leadAdministrador[1]; leadOrigem = lead[7]; coldList = leadOrigem.includes('JSF'); leadTelefone = coldList ? '887766' : leadTelefone;
                        } else {
                            ({
                                linha: leadLinha, cnpj: leadCnpj, dadosIniciais: leadDadosIniciais, produtos: leadProdutos, taxas: leadTaxas, modelo: leadModelo, quantidade: leadQuantidade, operadora: leadOperadora,
                                cep: leadCep, numero: leadNumero, complemento: leadComplemento, referencia: leadReferencia,
                            } = stringToObj(lead, conSpl));
                        }

                        // CLIENTE: BUSCAR NA LUPA
                        retClientSearch = (await clientSearch({ page, browser, leadCnpj, })).res; leadStatus = retClientSearch.leadStatus; leadDate = retClientSearch.leadDate;

                        // CLIENTE: PEGAR DADOS DO CONTA (SE NÃO FOR LEAD)
                        if (['ENCONTRADO_CONTA',].includes(leadStatus)) { retCliGetDat = (await clientGetData({ page, browser, leadCnpj, })).res; leadDate = retCliGetDat.leadDate; nameMaster = retCliGetDat.nameMaster; }

                        // CALCULAR DIFERENÇA DE DATA (LEAD OU CONTA)
                        if (leadDate) { // ANO-MÊS-DIA 00:00:00 | DIFERENÇA JÁ EM DIAS (ARREDONDADO)
                            let data = leadDate.split('/'); let dataDay = parseInt(data[0], 10).toString().padStart(2, '0'); let dataMon = (parseInt(data[1], 10) - 1).toString().padStart(2, '0');
                            let dataYea = parseInt(data[2], 10).toString().padStart(4, '0'); dif = new Date(dataYea, dataMon, dataDay, 0, 0, 0); dif = Math.round((new Date().getTime() - dif.getTime()) / 1000 / 86400);
                        }

                        if (['INDICAR_MANUAL', 'INDICAR_AUTOMATICO',].includes(sheetTab) && (leadStatus === 'NADA_ENCONTRADO' || (leadStatus === 'ENCONTRADO_EXPIRADO' && (dif > 45)))) {
                            // IMPUT NECESSÁRIO: SIM → IMPUTAR LEAD
                            leadTelefone = coldList ? leadTelefone.replace('55219', '219') : leadTelefone;
                            // retClientImput = (await clientImput({ page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, leadRazaoSocial, })).res; statusInf = retClientImput.imputRes;


                            // STATUS1 [Indicando...]
                            infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Indicando...`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData); message = {
                                'fun': [{
                                    'securityPass': gW.securityPass, 'retInf': true, 'name': 'clientImputChromeNew',
                                    'par': { 'lead': `${leadPrimeiroNome} ${leadSobrenome}	${leadCnpj}	${leadEmail}	${leadTelefone}	${leadRazaoSocial}`, },
                                },],
                            };


                            retClientImput = await messageSend({ destination: `${chromeDestiny}`, message, secondsAwait: 30, });
                            logConsole({ e, ee, 'txt': `PC 1\n${JSON.stringify(retClientImput)}`, });


                            if (retClientImput?.res?.imputRes) { statusInf = retClientImput?.res?.imputRes; } else {
                                // [MANDAR PARA O OUTRO PC] CONFIRMAR QUE O OUTRO PC NÃO CONSEGUIU INDICAR
                                let newStatus = (await clientSearch({ page, browser, leadCnpj, })).res; infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Tentando no outro PC...`, };
                                logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData); if (newStatus.leadStatus !== 'ENCONTRADO_LEAD') {


                                    retClientImput = await messageSend({ 'destination': `${chromeDestiny.replace('MARCOS', 'THAYNA')}`, message, 'secondsAwait': 30, });
                                    logConsole({ e, ee, 'txt': `PC 2\n${JSON.stringify(retClientImput)}`, });


                                    // let aaaa = '15.228.250.109:8889/?roo=OPSEUA-CHROME-CHROME_EXTENSION-USUARIO_0'; retClientImput = await messageSend({ destination: `${aaaa}`, message, secondsAwait: 30, });
                                } else {
                                    retClientImput = { 'res': { 'imputRes': 'INDICAÇÃO OK', }, };
                                }
                            } statusInf = retClientImput?.res?.imputRes || 'PROBLEMA NO ESCRITÓRIO';


                        } else if (['MAQUINA_MANUAL',].includes(sheetTab) && leadStatus === 'ENCONTRADO_CONTA') {
                            // IMPUT NECESSÁRIO: SIM → IMPUTAR MÁQUINA
                            retMaquinaInput = await maquinaInput({
                                page, browser, leadCnpj, leadDadosIniciais, leadProdutos, leadTaxas, leadModelo, leadQuantidade, leadOperadora, leadCep, leadNumero, leadComplemento, leadReferencia,
                            }); retMaquinaInput = retMaquinaInput.res; statusInf = retMaquinaInput.imputRes;
                        } if (sheetTab !== 'NOME_MASTER') { nameMaster = ''; } // OCULTAR O NOME DO MASTER EM ABAS QUE NÃO PRECISAM

                        // DEFINIR STATUS FINAL
                        if (statusInf.includes('ESCRITÓRIO')) {
                            // STATUS JÁ DEFINIDO
                        } else if (statusInf.includes('INDICAÇÃO') || (['MAQUINA_MANUAL',].includes(sheetTab) && leadStatus === 'ENCONTRADO_CONTA')) {
                            statusInf = statusInf; if (!statusInf.includes('ERR') && sheetTab !== 'MAQUINA_MANUAL') { leadDate = `${time.day}/${time.mon}/${time.yea} ${time.hou}:${time.min}:${time.sec}`; }
                        } else if (statusInf.includes('Já existe um lead cadastrado com o CNPJ informado') || statusInf.includes('Lead pertence a outro escritorio')) {
                            statusInf = leadStatus === 'ENCONTRADO_EXPIRADO' & dif < 45 ? 'FORA DO PRAZO' : 'INDICAÇÃO OUTRO ECE';
                        } else if (statusInf.includes('Já existe um cliente cadastrado com o CNPJ informado') || statusInf.includes('Já existe um lead e um cliente cadastrado com o CNPJ informado')) {
                            statusInf = leadStatus === 'NADA_ENCONTRADO' ? 'JÁ POSSUI CONTA (OUTRO ECE)' : dif < 5 ? 'ABERTO SF' : 'JÁ POSSUI CONTA';
                        } else if (statusInf.includes('Lead expirou') || statusInf.includes('Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo')) {
                            statusInf = 'FORA DO PRAZO';
                        } else if (statusInf.includes('elefone')) {
                            statusInf = 'ALERTA: telefone inválido';
                        } else if (statusInf.includes('CNPJ')) {
                            statusInf = 'ALERTA: CNPJ inválido';
                        } else if (statusInf.includes('mail')) {
                            statusInf = 'ALERTA: email inválido';
                        } else if (statusInf.includes('completo')) {
                            statusInf = 'ALERTA: nome inválido';
                        } else if (statusInf.includes('Os seguintes campos obrigatórios devem ser preenchidos')) {
                            statusInf = 'ALERTA: campo não preenchido';
                        } else if (statusInf.includes('CAPTCHA')) {
                            statusInf = 'BLOQUEADO PELO CAPTCHA';
                        } else if (['ENCONTRADO_CONTA',].includes(leadStatus)) {
                            statusInf = dif < 5 ? 'ABERTO SF' : 'JÁ POSSUI CONTA';
                        } else if (['ENCONTRADO_LEAD',].includes(leadStatus)) {
                            statusInf = 'INDICAÇÃO OK';
                        } else if (['ENCONTRADO_EXPIRADO',].includes(leadStatus)) {
                            statusInf = dif < 45 ? 'FORA DO PRAZO' : 'EXPIRADO';
                        } else if (['NADA_ENCONTRADO',].includes(leadStatus)) {
                            statusInf = 'NADA ENCONTRADO';
                        } else if (!statusInf.includes('INDICAÇÃO')) {
                            statusInf = 'STATUS NÃO DEFINIDO';
                        }

                        // STATUS1 [STATUS DA CONSULTA] | MANDAR PARA A PLANILHA O RESULTADO
                        let t = `${leadCnpj} | ${statusInf}`; logConsole({ e, ee, 'txt': `${t}`, }); await sendData({ e, 'stop': false, 'status1': `${t}`, }); await screenshot({ e, page, 'fileName': `screenshot`, });
                        time = dateHour().res; let results = [['ID AQUI', `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, statusInf, leadDate || '', nameMaster || '',],]; results = results[0].join(conSpl);
                        retGoogleSheets = await googleSheets({ e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': sheetTab, 'range': `${col}${leadLinha}`, 'values': [[results,],], }); if (!retGoogleSheets.ret) {
                            err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
                            await screenshot({ e, page, 'fileName': `err_7`, }); await processForceStop({ 'origin': 'serverC6 MANDAR PARA A PLANILHA O RESULTADO', }); // FORÇAR PARADA DO SCRIPT
                        }
                    }
                }

                // COOKIE KEEP [F5] {x MIN}: (CASO NENHUMA ABA TENHA LEADS PENDENTES) | COOKIE SALVAR {x MIN}: CHECAR SE EXPIROU E REGISTRAR NA PLANILHA
                if ((startupTab + (5 * 60)) < now && tabsInf.leadsQtd.reduce((a, c) => a + c, 0) === 0) {
                    startupTab = now; logConsole({ e, ee, 'txt': `ATUALIZANDO PÁGINA [KEEP COOKIE]`, }); await openHome(); await new Promise(r => { setTimeout(r, 30000); });
                } if ((startupTabCookie + (5 * 60)) < now) { startupTabCookie = now; await cookieCheckSave(); }

            }

            await new Promise(r => { setTimeout(r, 1000); });
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let err = `% TRYCATCH Script erro!`; await sendData({ e, 'stop': true, 'status1': err, });
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRun();


