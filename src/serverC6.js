/* eslint-disable no-unused-vars */
await import('./resources/@export.js')
let e = import.meta.url;
async function serverC6(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        const errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } }
        if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
        else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    }
    try {
        let time = dateHour().res; console.log(`${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, `serverC6 [WebScraper]`, '\n');

        let infNavigate, retNavigate, infImput, retImput, infCookiesGetSet, retCookiesGetSet, infAwaitLoad, retAwaitLoad, infCheckPage, retCheckPage, infRegex, retRegex
        let element, cookies, results = [], infSendData, retSendData, infGoogleSheet, retGoogleSheet, sheetNire, valuesLoop = [], valuesJucesp = [], aut, date
        let infButtonElement, retButtonElement, infGetTextElement, retGetTextElement, infFile, retFile, infLog, retLog, lastPage = false, err, conSpl, leads, leadsQtd, col, leadsTxt
        let statusText, browser, page, pageValue, pageInput, pageImputs, pageResult, leadPageId, leadPageName, leadDate, leadRandomNames

        gO.inf['stop'] = false; let rate = rateLimiter({ 'max': 3, 'sec': 40 }); time = dateHour().res;
        let repet1 = 1000, pg, mode, lin, range = 'A2'; gO.inf['sheetId'] = '1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc'; gO.inf['sheetTab'] = 'INDICAR_AUTOMATICO_[TELEIN]'

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        infGoogleSheet = {
            'action': 'get',
            'id': gO.inf.sheetId,
            'tab': gO.inf.sheetTab,
            'range': range,
        }
        retGoogleSheet = await googleSheet(infGoogleSheet);
        if (!retGoogleSheet.ret) {
            err = `[serverC6] Erro ao pegar dados para planilha`
            console.log(err);
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheet }
            retLog = await log(infLog);
            return
        }

        gO.inf['sheetKepp'] = JSON.parse(retGoogleSheet.res[0])
        aut = gO.inf.sheetKepp.autC6
        col = gO.inf.sheetKepp.colC6
        conSpl = gO.inf.sheetKepp.conSpl
        leadsQtd = Number(gO.inf.sheetKepp.leadsQtd)
        leadRandomNames = gO.inf.sheetKepp.randomNames

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { 'e': e, 'stop': false, 'status1': 'Iniciando script, aguarde' }
        console.log(infSendData.status1)
        retSendData = await sendData(infSendData)

        // INICIAR PUPPETEER
        browser = await _puppeteer.launch({
            headless: false,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--no-first-run",
                "--no-zygote",
                // "--single-process",
                "--disable-gpu",
            ],
        });
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        // FECHAR ABA EM BRANCO 
        await (await browser.pages())[0].close();

        // COOKIE [SET]
        infCookiesGetSet = { 'e': e, 'browser': browser, 'page': page, 'action': 'set', 'value': aut }
        retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)

        // ABRIR PÁGINA DE BUSCA GLOBAL
        await page.goto(`https://c6bank.my.site.com/partners/s/global-search`, {
            waitUntil: 'networkidle2'
        });
        await new Promise(resolve => { setTimeout(resolve, 1000) })
        //await page.screenshot({ path: `log/screenshot_1_home.jpg` });

        // CHECAR SE O COOKIE EXPIROU
        pageValue = await page.content()
        if (pageValue.includes('Esqueci minha senha')) {
            err = `$ Cookie inválido!`
            console.log(err);
            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
            retSendData = await sendData(infSendData)
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            retLog = await log(infLog);
            browser.close()
            return
        }

        // **************************************************************************************************************

        let whileQtd = 0, whileStop = false
        while (!whileStop) {
            whileQtd++;
            time = dateHour().res;
            console.log(`${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, `LOOP [${whileQtd}${whileQtd % 15 === 0 ? '*' : ''}]`);

            // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
            infGoogleSheet = {
                'action': 'get',
                'id': gO.inf.sheetId,
                'tab': gO.inf.sheetTab,
                'range': range,
            }
            retGoogleSheet = await googleSheet(infGoogleSheet);
            if (!retGoogleSheet.ret) {
                err = `[serverC6] Erro ao pegar dados para planilha`
                console.log(err);
                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheet }
                retLog = await log(infLog);
                return
            }

            gO.inf['sheetKepp'] = JSON.parse(retGoogleSheet.res[0])
            aut = gO.inf.sheetKepp.autC6
            col = gO.inf.sheetKepp.colC6
            conSpl = gO.inf.sheetKepp.conSpl
            leadsQtd = Number(gO.inf.sheetKepp.leadsQtd)
            leadRandomNames = gO.inf.sheetKepp.randomNames

            // CHECAR SE TEM LEAD PENDENTE
            if (leadsQtd > 0) {
                leads = gO.inf.sheetKepp.leads.split(`#${conSpl}#`)

                // DADOS DO LEAD
                let leadInf, leadLinha, leadStatus, leadCnpj, leadTelefone, leadEmail, leadAdministrador, leadPrimeiroNome, leadSobrenome
                for (let [index, value] of leads.entries()) {
                    leadInf = value.split(conSpl)
                    leadLinha = leadInf[0].replace('LINHA_', '')
                    leadStatus = leadInf[1]
                    leadCnpj = leadInf[2]
                    leadTelefone = `55${leadInf[3]}`
                    leadAdministrador = leadInf[4].length > 4 ? leadInf[4] : leadRandomNames[Math.floor(Math.random() * leadRandomNames.length)]
                    leadEmail = leadInf[5].length > 4 ? leadInf[5] : 'semEmail@gmail.com'
                    leadPrimeiroNome = leadAdministrador.replace(' ', '###').split('###')[0]
                    leadSobrenome = leadAdministrador.replace(' ', '###').split('###')[1]
                }

                // STATUS1 [Checando se é da base]
                infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Checando se é da base` }
                console.log(infSendData.status1)
                retSendData = await sendData(infSendData)

                // ABRIR PÁGINA DE IMPUT
                await page.goto(`https://c6bank.my.site.com/partners/s/global-search/${leadCnpj}`, {
                    waitUntil: 'networkidle2'
                });
                await new Promise(resolve => { setTimeout(resolve, 1000) })
                //await page.screenshot({ path: `log/screenshot_1_home.jpg` });

                // CHECAR SE O COOKIE EXPIROU
                pageValue = await page.content()
                if (pageValue.includes('Esqueci minha senha')) {
                    statusText = `$ Cookie inválido!`
                    console.log(statusText)
                    infSendData = { 'e': e, 'stop': false, 'status1': `${statusText}` }
                    retSendData = await sendData(infSendData)
                    pageValue = await page.content()
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                    retLog = await log(infLog);
                    browser.close()
                    return
                }
                await new Promise(resolve => { setTimeout(resolve, 1000) })

                // ESPERAR A BUSCA GLOBAL TERMINAR DE CONSULTAR
                pageResult = await page.waitForFunction(() => {
                    const conteudo0 = document.body.innerText.includes('Expirado');
                    const conteudo1 = document.body.innerText.includes('NOME DA CONTA');
                    const conteudo2 = document.body.innerText.includes('NOME COMPLETO');
                    const conteudo3 = document.body.innerText.includes('Nenhum resultado para');
                    if (conteudo0) {
                        return 'ENCONTRADO_EXPIRADO';
                    } else if (conteudo1) {
                        return 'ENCONTRADO_CONTA';
                    } else if (conteudo2) {
                        return 'ENCONTRADO_LEAD';
                    } else if (conteudo3) {
                        return 'NADA_ENCONTRADO';
                    }
                    return false;
                }, { timeout: 15000 }).catch(() => false);
                if (!pageResult) {
                    err = `$ Não achou o resultado da consulta`
                    console.log(err);
                    infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                    retSendData = await sendData(infSendData)
                    pageValue = await page.content()
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                    retLog = await log(infLog);
                    browser.close()
                    return
                }
                leadStatus = await pageResult.jsonValue();

                // LEAD DA BASE [SIM] ******************************************************************
                if (leadStatus == 'ENCONTRADO_CONTA' || leadStatus == 'ENCONTRADO_LEAD') {
                    // PEGAR O ID DO LINK DA PÁGINA DO LEAD
                    pageValue = await page.content()
                    infRegex = { 'pattern': `data-recordid="(.*?)" rel=`, 'text': pageValue }
                    retRegex = regex(infRegex);
                    if (!retRegex.ret || !retRegex.res) {
                        err = `$ Não achou o ID do link da página do lead`
                        console.log(err);
                        infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                        retSendData = await sendData(infSendData)
                        infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                        retLog = await log(infLog);
                        browser.close()
                        return
                    }
                    leadPageId = retRegex.res['1']

                    // PEGAR O NOME DO LINK DA PÁGINA DO LEAD
                    infRegex = { 'pattern': `data-special-link="true" title="(.*?)" data-navigable`, 'text': pageValue }
                    retRegex = regex(infRegex);
                    if (!retRegex.ret || !retRegex.res) {
                        err = `$ Não achou o nome do link da página do lead`
                        console.log(err);
                        infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                        retSendData = await sendData(infSendData)
                        infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                        retLog = await log(infLog);
                        browser.close()
                        return
                    }
                    leadPageName = retRegex.res['1'].toLowerCase().replace(/ /g, '-')

                    // STATUS1 [Abrinda dos do cliente]
                    infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Abrindo dados do cliente` }
                    console.log(infSendData.status1)
                    retSendData = await sendData(infSendData)

                    // ABRIR PÁGINA COM OS DADOS DO LEAS
                    if (leadStatus == 'ENCONTRADO_CONTA') {
                        await page.goto(`https://c6bank.my.site.com/partners/s/account/${leadPageId}/${leadPageName}`, {
                            waitUntil: 'networkidle2'
                        });
                    } else {
                        await page.goto(`https://c6bank.my.site.com/partners/s/lead/${leadPageId}/${leadPageName}`, {
                            waitUntil: 'networkidle2'
                        });
                    }
                    await new Promise(resolve => { setTimeout(resolve, 1000) })
                    //await page.screenshot({ path: `log/screenshot_1_home.jpg` });

                    pageResult = await page.waitForFunction(() => {
                        const elements = document.querySelectorAll('.uiOutputDateTime.forceOutputModStampWithPreview');
                        if (elements.length > 0) {
                            const values = Array.from(elements).map(element => element.textContent.trim());
                            return values;
                        }
                        return false;
                    }, { timeout: 15000 }).catch(() => false);
                    if (!pageResult) {
                        err = `$ Não achou a data de abertura`
                        console.log(err);
                        infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                        retSendData = await sendData(infSendData)
                        pageValue = await page.content()
                        infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                        retLog = await log(infLog);
                        browser.close()
                        return
                    }
                    leadDate = await pageResult.jsonValue();

                    // STATUS1 [STATUS DA CONSULTA]
                    statusText = `${leadCnpj} | ${leadStatus == 'ENCONTRADO_CONTA' ? `JÁ POSSUI CONTA ${leadDate[0].substring(0, 10)}` : `INDICAÇÃO OK ${leadDate[0].substring(0, 10)}`}`
                    infSendData = { 'e': e, 'stop': false, 'status1': `${statusText}` }
                    console.log(infSendData.status1)
                    retSendData = await sendData(infSendData)

                    // MANDAR PARA A PLANILHA O RESULTADO 
                    time = dateHour().res;
                    let results = [[
                        'ID AQUI',
                        `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`,
                        leadStatus == 'ENCONTRADO_CONTA' ? `JÁ POSSUI CONTA` : `INDICAÇÃO OK`,
                        leadDate[0]
                    ]]
                    results = results[0].join(conSpl)
                    infGoogleSheet = {
                        'action': 'send',
                        'id': gO.inf.sheetId,
                        'tab': gO.inf.sheetTab,
                        'range': `${col}${leadLinha}`,
                        'values': [[results]]
                    }
                    retGoogleSheet = await googleSheet(infGoogleSheet);
                    if (!retGoogleSheet.ret) {
                        err = `[serverC6] Erro ao enviar dados para planilha`
                        console.log(err);
                        infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheet }
                        retLog = await log(infLog);
                        browser.close()
                        return
                    }

                } else {
                    // LEAD DA BASE [NÃO] ******************************************************************

                    // STATUS1 [Esperando formulário aparecer]
                    infSendData = { 'e': e, 'stop': false, 'status1': 'Esperando formulário aparecer' }
                    console.log(infSendData.status1)
                    retSendData = await sendData(infSendData)

                    // ABRIR PÁGINA DE IMPUT
                    await page.goto(`https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente`, {
                        waitUntil: 'networkidle2'
                    });
                    await new Promise(resolve => { setTimeout(resolve, 1000) })
                    //await page.screenshot({ path: `log/screenshot_1_home.jpg` });

                    // CHECAR SE O COOKIE EXPIROU
                    pageValue = await page.content()
                    if (pageValue.includes('Esqueci minha senha')) {
                        err = `$ Cookie inválido!`
                        console.log(err);
                        infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                        retSendData = await sendData(infSendData)
                        infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                        retLog = await log(infLog);
                        browser.close()
                        return
                    }

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
                        browser.close()
                        return
                    }
                    await new Promise(resolve => { setTimeout(resolve, 1000) });

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
                        browser.close()
                        return
                    }
                    retRegex = retRegex.res['5']

                    // STATUS1 [Indicando...]
                    infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Indicando...` }
                    console.log(infSendData.status1)
                    retSendData = await sendData(infSendData)
                    pageImputs = [leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, leadCnpj]
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
                            browser.close()
                            return
                        }
                        await pageInput.type(pageImputs[index]);
                        await new Promise(resolve => { setTimeout(resolve, 750) });
                    }

                    // CLICAR NO BOTÃO 'Confirmar'
                    await page.click('.slds-button.slds-button--neutral.button.uiButton--default.uiButton--brand.uiButton');

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
                            leadStatus = `JÁ POSSUI CONTA E LEAD`
                        } else if (pageValue.includes(`Lead expirou`)) {
                            leadStatus = `LEAD EXPIRADO`
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
                        leadStatus = `INDICADO`
                    }

                    // STATUS1 [STATUS DA CONSULTA]
                    statusText = `${leadCnpj} | ${leadStatus}`
                    infSendData = { 'e': e, 'stop': false, 'status1': `${statusText}` }
                    console.log(infSendData.status1)
                    retSendData = await sendData(infSendData)

                    // MANDAR PARA A PLANILHA O RESULTADO
                    time = dateHour().res;
                    let results = [[
                        'ID AQUI',
                        `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`,
                        leadStatus,
                    ]]
                    results = results[0].join(conSpl)
                    infGoogleSheet = {
                        'action': 'send',
                        'id': gO.inf.sheetId,
                        'tab': gO.inf.sheetTab,
                        'range': `${col}${leadLinha}`,
                        'values': [[results]]
                    }
                    retGoogleSheet = await googleSheet(infGoogleSheet);
                    if (!retGoogleSheet.ret) {
                        err = `[serverC6] Erro ao enviar dados para planilha`
                        console.log(err);
                        infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheet }
                        retLog = await log(infLog);
                        browser.close()
                        return
                    }
                }
            }

            // ESPERAR PRÓXIMO LOOP
            if (leadsQtd < 2) {
                time = dateHour().res;
                console.log(`\n${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec} ## ESPERANDO DELAY PARA O PRÓXIMO LOOP ##`)

                // STATUS1 [Nada pendente, esperando 1 minuto...]
                infSendData = { 'e': e, 'stop': false, 'status1': `[${whileQtd}${whileQtd % 15 === 0 ? '*' : ''}] Nada pendente, esperando 1 minuto...` }
                retSendData = await sendData(infSendData)

                // F5 | COOKIE KEEP
                if (whileQtd % 15 === 0) {
                    await page.goto(`https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente`, {
                        waitUntil: 'networkidle2'
                    });
                }

                await new Promise(resolve => { setTimeout(resolve, 50000) });
            }
        }
        console.log('FIM')
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let err = `[serverC6] TRYCATCH Script erro!`
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

