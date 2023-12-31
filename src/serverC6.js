/* eslint-disable no-unused-vars */
await import('./resources/@export.js')
let e = import.meta.url;
async function serverC6(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        let errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } }
        if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
        else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    }
    try {
        let time = dateHour().res; console.log(`${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, `serverC6 [WebScraper]`, '\n');

        let infNavigate, retNavigate, infImput, retImput, infCookiesGetSet, retCookiesGetSet, infAwaitLoad, retAwaitLoad, infCheckPage, retCheckPage, infRegex, retRegex
        let element, cookies, results = [], infSendData, retSendData, infGoogleSheets, retGoogleSheets, sheetNire, valuesLoop = [], valuesJucesp = [], aut, date
        let infButtonElement, retButtonElement, infGetTextElement, retGetTextElement, infFile, retFile, infLog, retLog, lastPage = false, err, conSpl, leads, leadsQtd, col, leadsTxt
        let statusText, browser, page, pageValue, pageInput, pageImputs, pageResult, leadPageId, leadPageName, leadDate, leadRandomNames, leadLastAut = Number(time.tim), leadLastMan = Number(time.tim)
        let infApi, retApi, json, leadDif = 50, leadsQtdOld = 9999, chromiumHeadless, scriptHour

        gO.inf['stop'] = false; let rate = rateLimiter({ 'max': 3, 'sec': 40 }); time = dateHour().res;
        let repet1 = 1000, pg, mode, lin, range = 'A2'; gO.inf['sheetId'] = '1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc'; gO.inf['sheetTab'] = 'INDICAR_MANUAL'

        // ENCERRAR SCRIPT E INTERROMPER PM2
        async function pm2Stop() {
            let infCommandLine, retCommandLine
            infCommandLine = { 'command': `"!letter!:/ARQUIVOS/PROJETOS/WebScraper/src/z_OutrosC6/1_BACKGROUND.exe" "!letter!:/ARQUIVOS/PROJETOS/WebScraper/src/z_OutrosC6/2_SCRIPT.bat" "pm2"` }
            retCommandLine = await commandLine(infCommandLine);
            await new Promise(resolve => { setTimeout(resolve, 30000) })
            browser.close()
            process.exit();
        }

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        infGoogleSheets = {
            'action': 'get',
            'id': gO.inf.sheetId,
            'tab': gO.inf.sheetTab,
            'range': range,
        }
        retGoogleSheets = await googleSheets(infGoogleSheets);
        if (!retGoogleSheets.ret) {
            err = `$ [serverC6] Erro ao pegar dados para planilha`
            console.log(err);
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets }
            retLog = await log(infLog);
            // ENCERRAR SCRIPT E INTERROMPER PM2
            await pm2Stop()
        }
        try {
            json = retGoogleSheets.res[0][0]
            json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, '')
            gO.inf['sheetKepp'] = JSON.parse(json)
        } catch (e) {
            infApi = { // ###### → json/object
                'method': 'POST', 'url': `http://${devSend.split('://')[1]}`,
                'headers': { 'Content-Type': 'application/json' }, 'body': {
                    'fun': [{
                        'securityPass': securityPass, 'retInf': false, 'name': 'notification',
                        'par': { 'duration': 5, 'icon': './src/scripts/media/notification_3.png', 'title': `ERRO PARSE DADOS DA CÉLULA A2`, 'text': gO.inf.sheetTab }
                    }]
                }
            };
            retApi = await api(infApi);
            // ENCERRAR SCRIPT E INTERROMPER PM2
            await pm2Stop()
        }
        aut = gO.inf.sheetKepp.autC6
        col = gO.inf.sheetKepp.colC6
        conSpl = gO.inf.sheetKepp.conSpl
        leadsQtd = Number(gO.inf.sheetKepp.leadsQtd)
        leadRandomNames = gO.inf.sheetKepp.randomNames
        chromiumHeadless = gO.inf.sheetKepp.chromiumHeadless
        scriptHour = gO.inf.sheetKepp.scriptHourWebScraper.split('|')

        // '0' → APARECE | '1' OCUTO
        if (chromiumHeadless == '0') {
            chromiumHeadless = false
        } else if (chromiumHeadless == '1') {
            chromiumHeadless = 'new'
        } else {
            chromiumHeadless = false
        }

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { 'e': e, 'stop': false, 'status1': '# Iniciando script, aguarde' }
        console.log(infSendData.status1)
        retSendData = await sendData(infSendData)

        // INICIAR PUPPETEER
        browser = await _puppeteer.launch({
            // headless: letter == 'D' ? false : 'new', // false | 'new'
            headless: chromiumHeadless, // false | 'new'
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                // '--single-process',
                '--disable-gpu',
                '--disable-extensions',
            ],
        });
        page = await browser.newPage();
        await page.setViewport({
            //width: 1280, height: 800
            'width': 1024, 'height': 768
        });
        // FECHAR ABA EM BRANCO 
        await (await browser.pages())[0].close();

        // COOKIE [SET]
        infCookiesGetSet = { 'e': e, 'browser': browser, 'page': page, 'action': 'set', 'value': aut }
        retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)

        // ABRIR PÁGINA DE BUSCA GLOBAL
        async function openHome() {
            await page.goto(`https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente`, {
                waitUntil: 'networkidle2'
            });
            await new Promise(resolve => { setTimeout(resolve, 1000) })
            await page.screenshot({ path: `log/screenshot_C6.jpg` });
        }
        await openHome()
        await new Promise(resolve => { setTimeout(resolve, 2000) })

        // CHECAR SE O COOKIE EXPIROU
        pageValue = await page.content()
        if (pageValue.includes('Esqueci minha senha')) {
            err = `$ Cookie inválido!`
            console.log(err);
            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
            retSendData = await sendData(infSendData)
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_C6_err_1.jpg` });
            // ENCERRAR SCRIPT E INTERROMPER PM2
            await pm2Stop()
        }

        // **************************************************************************************************************

        let whileQtd = 0, whileStop = false
        while (!whileStop) {
            whileQtd++;
            time = dateHour().res;

            // SEG <> SAB | [??:00] <> [??:00]
            if (['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB',].includes(time.dayNam) && (Number(time.hou) > Number(scriptHour[0]) - 1 && Number(time.hou) < Number(scriptHour[1]))) {

                console.log(`${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, `LOOP [${whileQtd}${whileQtd % 15 === 0 ? '*' : ''}]`);

                gO.inf.sheetTab = whileQtd % 2 !== 0 ? 'INDICAR_MANUAL' : 'INDICAR_AUTOMATICO_[TELEIN]'

                async function run() {
                    // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
                    infGoogleSheets = {
                        'action': 'get',
                        'id': gO.inf.sheetId,
                        'tab': gO.inf.sheetTab,
                        'range': range,
                    }
                    retGoogleSheets = await googleSheets(infGoogleSheets);
                    if (!retGoogleSheets.ret) {
                        err = `$ [serverC6] Erro ao pegar dados para planilha`
                        console.log(err);
                        infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets }
                        retLog = await log(infLog);
                        // ENCERRAR SCRIPT E INTERROMPER PM2
                        await pm2Stop()
                    }
                    try {
                        json = retGoogleSheets.res[0][0]
                        json = json.replace(/"{/g, '{').replace(/}"/g, '}').replace(/""/g, '"').replace(/^\s+/g, '').replace(/	/g, '')
                        gO.inf['sheetKepp'] = JSON.parse(json)
                    } catch (e) {
                        infApi = { // ###### → json/object
                            'method': 'POST', 'url': `http://${devSend.split('://')[1]}`,
                            'headers': { 'Content-Type': 'application/json' }, 'body': {
                                'fun': [{
                                    'securityPass': securityPass, 'retInf': false, 'name': 'notification',
                                    'par': { 'duration': 5, 'icon': './src/scripts/media/notification_3.png', 'title': `ERRO PARSE DADOS DA CÉLULA A2`, 'text': gO.inf.sheetTab }
                                }]
                            }
                        };
                        retApi = await api(infApi);
                        // ENCERRAR SCRIPT E INTERROMPER PM2
                        await pm2Stop()
                    }
                    aut = gO.inf.sheetKepp.autC6
                    col = gO.inf.sheetKepp.colC6
                    conSpl = gO.inf.sheetKepp.conSpl
                    leadsQtd = Number(gO.inf.sheetKepp.leadsQtd)
                    leadRandomNames = gO.inf.sheetKepp.randomNames
                    chromiumHeadless = gO.inf.sheetKepp.chromiumHeadless
                    scriptHour = gO.inf.sheetKepp.scriptHourWebScraper.split('|')

                    // CHECAR SE TEM LEAD PENDENTE
                    if (leadsQtd > 0) {
                        leads = gO.inf.sheetKepp.leads.split(`#${conSpl}#`)

                        // DADOS DO LEAD
                        let leadInf, leadLinha, leadStatus, leadCnpj, leadTelefone, leadEmail, leadAdministrador, leadPrimeiroNome, leadSobrenome
                        for (let [index, value] of leads.entries()) {
                            leadInf = value.split(conSpl)
                            leadLinha = leadInf[0].replace(/^\s+/g, '').replace('LINHA_', '')
                            leadStatus = leadInf[1].replace(/^\s+/g, '')
                            leadCnpj = leadInf[2].replace(/^\s+/g, '')
                            leadTelefone = `55${leadInf[3].replace(/^\s+/g, '')}`
                            leadAdministrador = leadInf[4].length > 4 ? leadInf[4] : leadInf[6].length > 4 ? leadInf[6] : leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)]
                            leadEmail = leadInf[5].length > 4 ? leadInf[5] : 'semEmail@gmail.com'
                            leadAdministrador = leadAdministrador.replace(/^\s+/g, '').replace(' ', '###').split('###')
                            if (leadAdministrador.length < 2) {
                                leadAdministrador = leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)]
                                leadAdministrador = leadAdministrador.replace(' ', '###').split('###')
                            }
                            leadPrimeiroNome = leadAdministrador[0]
                            leadSobrenome = leadAdministrador[1]
                        }

                        // STATUS1 [Checando se é da base]
                        infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Checando se é da base` }
                        console.log(infSendData.status1)
                        retSendData = await sendData(infSendData)
                        await page.screenshot({ path: `log/screenshot_C6.jpg` });
                        await new Promise(resolve => { setTimeout(resolve, 1000) })

                        // REGEX PARA PEGAR O ID DA LUPA DE PESQUISA
                        pageValue = await page.content()
                        infRegex = { 'pattern': `placeholder="Pesquisar" id="(.*?)" class=`, 'text': pageValue }
                        retRegex = regex(infRegex);
                        if (!retRegex.ret || !retRegex.res['1']) {
                            err = `$ Não achou o ID da lupa de pesquisa`
                            console.log(err);
                            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                            retSendData = await sendData(infSendData)
                            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                            retLog = await log(infLog);
                            await page.screenshot({ path: `log/screenshot_C6_err_2.jpg` });
                            browser.close()
                            process.exit();
                        }
                        retRegex = retRegex.res['1']
                        await new Promise(resolve => { setTimeout(resolve, 1000) })

                        // BUSCAR LEAD NA LUPA
                        pageInput = await page.$(`input[id="${retRegex}"]`);
                        if (!pageInput) {
                            err = `$ Não achou o campo de imput da lupa`
                            console.log(err);
                            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                            retSendData = await sendData(infSendData)
                            pageValue = await page.content()
                            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                            retLog = await log(infLog);
                            await page.screenshot({ path: `log/screenshot_C6_err_3.jpg` });
                            browser.close()
                            process.exit();
                        }
                        await page.$eval(`input[id="${retRegex}"]`, input => (input.value = ''));
                        await new Promise(resolve => setTimeout(resolve, 500));
                        await page.type(`input[id="${retRegex}"]`, leadCnpj);
                        await new Promise(resolve => setTimeout(resolve, 750));
                        await pageInput.press('Enter');
                        await new Promise(resolve => { setTimeout(resolve, 1000) })

                        // ESPERAR A BUSCA GLOBAL TERMINAR DE CONSULTAR
                        pageResult = await page.waitForFunction(() => {
                            let conteudo = document.body.innerText;
                            if (conteudo.includes('NOME DA CONTA')) {
                                return 'ENCONTRADO_CONTA';
                            } else if (conteudo.includes('Expirado') && !conteudo.includes('Aguardando abertura Conta Corrente')) {
                                return 'ENCONTRADO_EXPIRADO';
                            } else if (conteudo.includes('NOME COMPLETO')) {
                                return 'ENCONTRADO_LEAD';
                            } else if (conteudo.includes('Nenhum resultado para')) {
                                return 'NADA_ENCONTRADO';
                            }
                            return false;
                        }, { timeout: 30000 }).catch(async () => {
                            return false;
                        });
                        if (!pageResult) {
                            err = `$ Não achou o resultado da consulta`
                            console.log(err);
                            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                            retSendData = await sendData(infSendData)
                            pageValue = await page.content()
                            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                            retLog = await log(infLog);
                            await page.screenshot({ path: `log/screenshot_C6_err_4.jpg` });
                            browser.close()
                            process.exit();
                        }
                        leadStatus = await pageResult.jsonValue();
                        console.log(leadStatus)
                        await page.screenshot({ path: `log/screenshot_C6.jpg` });
                        await new Promise(resolve => setTimeout(resolve, 1500));

                        // LEAD DA BASE [SIM] ******************************************************************
                        if (leadStatus == 'ENCONTRADO_CONTA' || leadStatus == 'ENCONTRADO_LEAD') {
                            // PEGAR O ID DO LINK DA PÁGINA DO LEAD
                            pageValue = await page.content()
                            infRegex = { 'pattern': `data-recordid="(.*?)" rel=`, 'text': pageValue }
                            retRegex = regex(infRegex);
                            if (!retRegex.ret || !retRegex.res['1']) {
                                err = `$ Não achou o ID do link da página do lead`
                                console.log(err);
                                infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                                retSendData = await sendData(infSendData)
                                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                                retLog = await log(infLog);
                                await page.screenshot({ path: `log/screenshot_C6__err_5.jpg` });
                                browser.close()
                                process.exit();
                            }
                            leadPageId = retRegex.res['1']
                            await new Promise(resolve => { setTimeout(resolve, 1000) })

                            // STATUS1 [Abrindo dados do cliente]
                            infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Abrindo dados do cliente` }
                            console.log(infSendData.status1)
                            retSendData = await sendData(infSendData)
                            await page.screenshot({ path: `log/screenshot_C6.jpg` });
                            await new Promise(resolve => { setTimeout(resolve, 1000) })

                            // CLICAR NO LINK DO ID DO LEAD
                            let linkSelector = `a[data-recordid="${leadPageId}"]`;
                            await page.waitForSelector(linkSelector);
                            let link = await page.$(linkSelector);
                            await new Promise(resolve => { setTimeout(resolve, 1000) })
                            await link.click();
                            await new Promise(resolve => { setTimeout(resolve, 1000) })

                            // ESPERAR A DATA DO LEAD APARECER
                            pageResult = await page.waitForFunction(() => {
                                const elements = document.querySelectorAll('.uiOutputDateTime.forceOutputModStampWithPreview');
                                if (elements.length > 0) {
                                    const values = Array.from(elements).map(element => element.textContent.trim());
                                    return values;
                                }
                                return false;
                            }, { timeout: 30000 }).catch(async () => { return false; });
                            if (!pageResult) {
                                err = `$ Não achou a data de abertura`
                                console.log(err);
                                infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                                retSendData = await sendData(infSendData)
                                pageValue = await page.content()
                                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                                retLog = await log(infLog);
                                await page.screenshot({ path: `log/screenshot_C6_err_6.jpg` });
                                browser.close()
                                process.exit();
                            }
                            leadDate = await pageResult.jsonValue();
                            await new Promise(resolve => { setTimeout(resolve, 1000) })

                            // STATUS1 [STATUS DA CONSULTA]
                            statusText = `${leadCnpj} | ${leadStatus == 'ENCONTRADO_CONTA' ? `JÁ POSSUI CONTA ${leadDate[0].substring(0, 10)}` : `INDICAÇÃO OK ${leadDate[0].substring(0, 10)}`}`
                            infSendData = { 'e': e, 'stop': false, 'status1': `${statusText}` }
                            console.log(infSendData.status1)
                            retSendData = await sendData(infSendData)
                            await page.screenshot({ path: `log/screenshot_C6.jpg` });
                            await new Promise(resolve => { setTimeout(resolve, 1000) })

                            // MANDAR PARA A PLANILHA O RESULTADO 
                            time = dateHour().res;
                            let results = [[
                                'ID AQUI',
                                `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`,
                                leadStatus == 'ENCONTRADO_CONTA' ? `JÁ POSSUI CONTA` : `INDICAÇÃO OK`,
                                leadDate[0]
                            ]]
                            results = results[0].join(conSpl)
                            infGoogleSheets = {
                                'action': 'send',
                                'id': gO.inf.sheetId,
                                'tab': gO.inf.sheetTab,
                                'range': `${col}${leadLinha}`,
                                'values': [[results]]
                            }
                            retGoogleSheets = await googleSheets(infGoogleSheets);
                            if (!retGoogleSheets.ret) {
                                err = `$ [serverC6] Erro ao enviar dados para planilha`
                                console.log(err);
                                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets }
                                retLog = await log(infLog);
                                await page.screenshot({ path: `log/screenshot_C6_err_7.jpg` });
                                // ENCERRAR SCRIPT E INTERROMPER PM2
                                await pm2Stop()
                            }

                            // VOLTAR PARA A PÁGINA DE INDICAÇÃO
                            await page.goBack();
                            await new Promise(resolve => setTimeout(resolve, 1500));
                            await page.goBack();

                        } else {
                            // LEAD DA BASE [NÃO] ******************************************************************

                            // VOLTAR PARA A PÁGINA DE INDICAÇÃO
                            await page.goBack();
                            await new Promise(resolve => setTimeout(resolve, 3000));

                            // ESPERAR OS CAMPOS APARECEREM
                            pageInput = await page.waitForSelector(`input[placeholder="Primeiro Nome"]`, { timeout: 30000 });
                            if (!pageInput) {
                                err = `$ Formulário não apareceu`
                                console.log(err);
                                infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                                retSendData = await sendData(infSendData)
                                pageValue = await page.content()
                                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                                retLog = await log(infLog);
                                await page.screenshot({ path: `log/screenshot_C6_erro_8.jpg` });
                                browser.close()
                                process.exit();
                            }

                            // REGEX PARA PEGAR O ID DOS CAMPOS
                            pageValue = await page.content()
                            infRegex = { 'pattern': `" aria-describedby="" id="(.*?)" placeholder="`, 'text': pageValue }
                            retRegex = regex(infRegex);
                            if (!retRegex.ret || !retRegex.res['5']) {
                                err = `$ Não achou o ID dos campos`
                                console.log(err);
                                infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                                retSendData = await sendData(infSendData)
                                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                                retLog = await log(infLog);
                                await page.screenshot({ path: `log/screenshot_C6_err_9.jpg` });
                                browser.close()
                                process.exit();
                            }
                            retRegex = retRegex.res['5']
                            await new Promise(resolve => { setTimeout(resolve, 1000) })

                            // STATUS1 [Indicando...]
                            infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Indicando...` }
                            console.log(infSendData.status1)
                            retSendData = await sendData(infSendData)
                            pageImputs = [leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, leadCnpj]
                            await page.screenshot({ path: `log/screenshot_C6.jpg` });
                            await new Promise(resolve => { setTimeout(resolve, 1000) })

                            for (let [index, value] of retRegex.entries()) {
                                pageInput = await page.$(`input[id="${value}"]`);
                                if (!pageInput) {
                                    err = `$ Não achou o campo de imput [${index}]`
                                    console.log(err);
                                    infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                                    retSendData = await sendData(infSendData)
                                    pageValue = await page.content()
                                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                                    retLog = await log(infLog);
                                    await page.screenshot({ path: `log/screenshot_C6_err_10.jpg` });
                                    browser.close()
                                    process.exit();
                                }
                                await page.$eval(`input[id="${value}"]`, input => (input.value = ''));
                                await new Promise(resolve => setTimeout(resolve, 500));
                                await page.type(`input[id="${value}"]`, pageImputs[index]);
                                await new Promise(resolve => { setTimeout(resolve, 750) });
                            }

                            // CLICAR NO BOTÃO 'Confirmar'
                            await page.click('.slds-button.slds-button--neutral.button.uiButton--default.uiButton--brand.uiButton');
                            await new Promise(resolve => { setTimeout(resolve, 1000) })

                            // ESPERAR O RETORNO DO SERVIDOR APÓS ENVIAR O FORMULÁRIO
                            pageResult = await Promise.race([
                                page.waitForSelector('body > div.themeLayoutStarterWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceThemeLayoutStarter > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div > div > div.container.EDIT.forceQuickActionLayout > div.pageLevelErrors > div > div', { timeout: 15000 }).then(() => false),
                                page.waitForNavigation({ timeout: 15000 }).then(() => true),
                            ]).catch(() => 'NADA_ACONTECEU');

                            time = dateHour().res
                            pageValue = await page.content()
                            if (!pageResult) {
                                if (pageValue.includes(`Já existe um lead cadastrado com o CNPJ informado`)) {
                                    leadStatus = `INDICAÇÃO OUTRO ECE`
                                } else if (pageValue.includes(`Já existe um cliente cadastrado com o CNPJ informado`)) {
                                    leadStatus = `JÁ POSSUI CONTA`
                                } else if (pageValue.includes(`Já existe um lead e um cliente cadastrado com o CNPJ informado`)) {
                                    leadStatus = `JÁ POSSUI CONTA`
                                } else if (pageValue.includes(`Lead expirou`) || pageValue.includes(`Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo`)) {
                                    leadStatus = `FORA DO PRAZO`
                                } else {
                                    if (pageValue.includes(`O formato correto para o telefone`)) {
                                        leadStatus = `ALERTA: telefone inválido`
                                    } else if (pageValue.includes(`CNPJ informado é inválido`)) {
                                        leadStatus = `ALERTA: CNPJ inválido`
                                    } else if (pageValue.includes(`endereço de email inválido`)) {
                                        leadStatus = `ALERTA: email inválido`
                                    } else if (pageValue.includes(`Os seguintes campos obrigatórios devem ser preenchidos`)) {
                                        leadStatus = `ALERTA: campo não preenchido`
                                    } else {
                                        leadStatus = `ALERTA: status não identificado`
                                        let infFile, retFile
                                        infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'path': `log/C6_${time.hou}.${time.min}.${time.sec}_${leadCnpj}.txt`, 'rewrite': false, 'text': pageValue }
                                        retFile = await file(infFile);
                                    }
                                }
                            } else {
                                leadStatus = `INDICAÇÃO OK`
                            }

                            // STATUS1 [STATUS DA CONSULTA]
                            statusText = `${leadCnpj} | ${leadStatus}`
                            infSendData = { 'e': e, 'stop': false, 'status1': `${statusText}` }
                            console.log(infSendData.status1)
                            retSendData = await sendData(infSendData)
                            await page.screenshot({ path: `log/screenshot_C6.jpg` });
                            await new Promise(resolve => { setTimeout(resolve, 1000) })

                            // MANDAR PARA A PLANILHA O RESULTADO
                            time = dateHour().res;
                            let results = [[
                                'ID AQUI',
                                `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`,
                                leadStatus,
                            ]]
                            results = results[0].join(conSpl)
                            infGoogleSheets = {
                                'action': 'send',
                                'id': gO.inf.sheetId,
                                'tab': gO.inf.sheetTab,
                                'range': `${col}${leadLinha}`,
                                'values': [[results]]
                            }
                            retGoogleSheets = await googleSheets(infGoogleSheets);
                            if (!retGoogleSheets.ret) {
                                err = `$ [serverC6] Erro ao enviar dados para planilha`
                                console.log(err);
                                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets }
                                retLog = await log(infLog);
                                await page.screenshot({ path: `log/screenshot_C6_err_11.jpg` });
                                // ENCERRAR SCRIPT E INTERROMPER PM2
                                await pm2Stop()
                            }

                            // VOLTAR PARA A PÁGINA DE INDICAÇÃO
                            if (leadStatus == 'INDICAÇÃO OK') {
                                await page.goBack();
                            }

                        }
                    }
                }
                await run()

                // ESPERAR PRÓXIMO LOOP
                if (leadsQtd < 2 && (leadsQtdOld < 2 || leadsQtdOld == 9999)) {
                    time = dateHour().res;
                    console.log(`\n${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec} ## ESPERANDO DELAY PARA O PRÓXIMO LOOP ##`)

                    // STATUS1 [Nada pendente, esperando 2 minutos...]
                    infSendData = { 'e': e, 'stop': false, 'status1': `Nada pendente, esperando 2 minutos...` }
                    retSendData = await sendData(infSendData)

                    // F5 | COOKIE KEEP
                    if (whileQtd % 15 === 0) {
                        await page.goto(`https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente`, {
                            waitUntil: 'networkidle2'
                        });
                    }

                    if (leadsQtdOld < 2) {
                        await new Promise(resolve => { setTimeout(resolve, 50000) }); // 50000 → 50 SEGUNDOS
                    }
                }
                leadsQtdOld = leadsQtd
            } else {
                console.log(`\n${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec} ## FORA DO DIA E HORÁRIO (${scriptHour[0]}:00 <> ${scriptHour[1]}:00) ##`)

                // STATUS1 [Fora do horário permitido]
                infSendData = { 'e': e, 'stop': false, 'status1': `$ Fora do horário permitido (${scriptHour[0]}:00 <> ${scriptHour[1]}:00)` }
                console.log(infSendData.status1)
                retSendData = await sendData(infSendData)

                // ENCERRAR SCRIPT E INTERROMPER PM2
                await pm2Stop()
            }
        }
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let err = `$ [serverC6] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': err }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}
await serverC6()

