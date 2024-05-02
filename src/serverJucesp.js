await import('./resources/@export.js')

let e = import.meta.url, ee = e;
async function serverRun(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        logConsole({ 'e': e, 'ee': ee, 'write': true, 'msg': `**************** SERVER ****************` })

        let infNavigate, retNavigate, infImput, retImput, infCookiesGetSet, retCookiesGetSet, infAwaitLoad, retAwaitLoad, infCheckPage, retCheckPage, infRegex, retRegex
        let element, cookies, value, results = [], infSendData, retSendData, infGoogleSheets, retGoogleSheets, sheetNire, valuesLoop = [], valuesJucesp = [], aut, date
        let infButtonElement, retButtonElement, infGetTextElement, retGetTextElement, infFile, retFile, infLog, retLog, lastPage = false, err, conSpl, chromiumHeadless, token

        gO.inf['stop'] = false; let rate = rateLimiter({ 'max': 3, 'sec': 40 }); let time = dateHour().res;
        let repet1 = 999999, pg, mode, lin, range = 'A2'; gO.inf['sheetId'] = '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8'; gO.inf['sheetTab'] = 'RESULTADOS'
        let infConfigStorage, retConfigStorage, browser

        // ENCERRAR SCRIPT E INTERROMPER PM2
        async function pm2Stop() {
            let infCommandLine, retCommandLine
            // infCommandLine = { 'command': `"!letter!:/ARQUIVOS/PROJETOS/WebScraper/src/z_OutrosJucesp/2_BACKGROUND.exe" "!letter!:/ARQUIVOS/PROJETOS/WebScraper/src/z_OutrosJucesp/2_SCRIPT.bat" "pm2"` }
            infCommandLine = { 'e': e, 'command': `"${letter}:/ARQUIVOS/PROJETOS/WebScraper/src/z_OutrosWebScraperJucesp/2_SCRIPT.bat" "off" "hide" "WebScraperJucesp"` }
            retCommandLine = await commandLine(infCommandLine);
            await new Promise(resolve => { setTimeout(resolve, 30000) })
            browser.close();
            process.exit();
        }

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        infGoogleSheets = {
            'e': e, 'action': 'get',
            'id': gO.inf.sheetId,
            'tab': gO.inf.sheetTab,
            'range': range,
        }
        retGoogleSheets = await googleSheets(infGoogleSheets);
        if (!retGoogleSheets.ret) {
            err = `$ Erro ao pegar dados para planilha`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets }
            retLog = await log(infLog);
            infSendData = { 'e': e, 'stop': false, 'status1': err }
            retSendData = await sendData(infSendData);
            // ENCERRAR SCRIPT E INTERROMPER PM2
            await pm2Stop()
        }
        gO.inf['sheetKepp'] = JSON.parse(retGoogleSheets.res[0])
        aut = gO.inf.sheetKepp.aut
        date = gO.inf.sheetKepp.date
        mode = gO.inf.sheetKepp.mode
        conSpl = gO.inf.sheetKepp.conSpl
        chromiumHeadless = gO.inf.sheetKepp.chromiumHeadless
        token = gO.inf.sheetKepp.token
        gO.inf['token'] = token;

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
        retSendData = await sendData(infSendData)
        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` })

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
        let page = await browser.newPage();
        await page.setViewport({ 'width': 1024, 'height': 768 });
        // FECHAR ABA EM BRANCO 
        await (await browser.pages())[0].close();

        // // HAABILITAR INTERCEPTAÇÃO
        // await page.setRequestInterception(true);
        // page.on('request', async (request) => { // INTERCEPTAR REQ [SEND]
        //     if (request.method() === 'OPTIONS') { request.abort(); }
        //     else {
        //         let bodyNew; if (request.method() === 'POST' || request.method() === 'PUT') {
        //             let body = await request.postData();
        //             if (body && body.includes('__VIEWSTATE') && request.url().includes('https://www.jucesponline.sp.gov.br/ResultadoBusca.aspx?IDProduto')) {
        //                        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `BODY:\n${body}` });   // bodyNew = body;
        //             }
        //         }; if (bodyNew) { request.continue({ postData: bodyNew }); } else { request.continue(); }
        //     }
        // }); page.on('response', async (response) => {  // INTERCEPTAR RES [GET]
        //         logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `>> RES:\n${response.url()}` })
        //     try {
        //         let body = await response.text(); if (body) {
        //   logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `BODY:\n${body}` });
        //         }
        //     } catch (error) { }
        // });

        // LOOP API
        async function loopFunRun(inf) {
            let current = `[${inf.index + 1}/${inf.length}]`
            // RESULTS
            let ok = false
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${valuesLoop.length}\n${inf.value}` });
            let retApiNire = await apiNire({ 'e': e, 'date': date, 'nire': inf.value, 'aut': aut })
            if (!retApiNire.ret) {
                err = `$ [serverJucesp] FALSE: retApiNire`
                logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retApiNire }
                retLog = await log(infLog);
                let status = retApiNire.msg ? retApiNire.msg : err
                await page.screenshot({ path: `log/screenshot_Jucesp_err_1.jpg` });
                infSendData = { 'e': e, 'stop': true, 'status1': status }
                retSendData = await sendData(infSendData)
            } else if (!retApiNire.res) {
                err = `${inf.value} ${current} | ${retApiNire.msg}`
                logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
                infSendData = { 'e': e, 'stop': false, 'status2': err }
                retSendData = await sendData(infSendData)
                ok = true
            } else {
                infSendData = { 'e': e, 'stop': false, 'status2': `${inf.value} ${current} | OK` }
                retSendData = await sendData(infSendData);
                logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status2}` });
                let infApiCnpj, retApiCnpj
                if (!rate.check()) { await new Promise(resolve => { setTimeout(resolve, 10000) }) }
                infApiCnpj = { 'e': e, 'cnpj': retApiNire.res[0], }
                retApiCnpj = await apiCnpj(infApiCnpj)
                if (!retApiCnpj.res || !retApiCnpj.res.cnpj) {
                    err = `$ [serverJucesp] FALSE: retApiCnpj`
                    logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retApiCnpj }
                    retLog = await log(infLog);
                    await page.screenshot({ path: `log/screenshot_Jucesp_err_2.jpg` });
                    infSendData = { 'e': e, 'stop': true, 'status1': err }
                    retSendData = await sendData(infSendData)
                } else {
                    let time = dateHour().res
                    retApiCnpj = retApiCnpj.res

                    let results = [[
                        `${inf.value}`, // NIRE
                        `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, // DATA SCRIPT
                        retApiNire.res[1], // DATA REC FED
                        retApiCnpj.cnpj,
                        retApiCnpj.telefone1,
                        retApiCnpj.telefone2,
                        retApiCnpj.gestor1 == 'null' ? retApiCnpj.razaoSocial : retApiCnpj.gestor1,
                        retApiCnpj.email1,
                        retApiCnpj.razaoSocial,
                    ]]
                    results = results[0].join(conSpl)
                    infSendData = { 'e': e, 'stop': false, 'results': results }
                    retSendData = await sendData(infSendData)
                    ok = true
                }
            }
            if (ok) {
                sheetNire.push(inf.value)
                infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'path': './log/NIREs.txt', 'rewrite': false, 'text': JSON.stringify(sheetNire, null, 2) }
                retFile = await file(infFile);
            }
            await new Promise(resolve => { setTimeout(resolve, 1000) }) // DELAY PARA EVITAR ACABAR A ARRAY
        }
        async function loopFun() {
            let indice = 0;
            while (!gO.inf.stop) {
                if (indice < valuesLoop.length) {
                    await loopFunRun({ 'value': valuesLoop[indice], 'index': indice, 'length': valuesLoop.length });
                    indice++
                    if (indice == valuesLoop.length && lastPage) {
                        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `INDICES ACABARAM` });
                        infSendData = { 'e': e, 'stop': false, 'status2': 'Terminou de consultar tudo' }
                        retSendData = await sendData(infSendData);
                        // ENCERRAR SCRIPT E INTERROMPER PM2
                        await pm2Stop()
                    }
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                }
            };
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `PAROU O LOOP` });
        }; loopFun();

        // NAVIGATE [ABRINDO JUCESP]
        infNavigate = { 'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
        retNavigate = await navigate(infNavigate)

        await new Promise(resolve => { setTimeout(resolve, 2000) })

        // CHECK PAGE [PAGINA DE PESQUISA]
        value = await page.content()
        retCheckPage = await checkPage({ 'e': e, 'body': value, 'search': `Pesquisa Avançada` });
        if (!retCheckPage.ret) {
            err = `$ Não encontrou a página de pesquisa`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_Jucesp_err_3.jpg` });
            infSendData = { 'e': e, 'stop': true, 'status1': err }
            retSendData = await sendData(infSendData);
            return retCheckPage
        };

        // COOKIE [SET]
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) { date = `${time.day}/${time.mon}/2023` }
        infCookiesGetSet = { 'e': e, 'browser': browser, 'page': page, 'action': 'set', 'value': aut }
        retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)

        // STATUS [INSERINDO DATA DE PESQUISA]
        infSendData = { 'e': e, 'stop': false, 'status1': 'Inserindo data de pesquisa' }
        retSendData = await sendData(infSendData)
        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` })
        await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });

        // IMPUT [DATA INÍCIO]
        infImput = { 'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': `${date.replace(/[^0-9]/g, '')}` }
        retImput = await imput(infImput)

        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // IMPUT [DATA FIM]
        infImput = { 'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaFim', 'value': `${date.replace(/[^0-9]/g, '')}` }
        retImput = await imput(infImput)

        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // BUTTON [PESQUISAR]
        infButtonElement = { 'browser': browser, 'page': page, 'button': 'search' }
        retButtonElement = await buttonElement(infButtonElement)

        // AGUARDAR PÁGINA TERMINAR DE CARREGAR
        infAwaitLoad = { 'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_hTitulo' }
        retAwaitLoad = await awaitLoad(infAwaitLoad)

        // CHECK PAGE [COOKIE]
        value = await page.evaluate(() => document.querySelector('*').outerHTML);
        retCheckPage = await checkPage({ 'e': e, 'body': value, });
        if (!retCheckPage.ret) {
            err = `$ [serverJucesp] ${retCheckPage.msg}`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_Jucesp_err_4.jpg` });
            infSendData = { 'e': e, 'stop': false, 'status1': err }
            retSendData = await sendData(infSendData);
            // ENCERRAR SCRIPT E INTERROMPER PM2
            await pm2Stop()
        };

        // STATUS [BUSCANDO NOVOS NIRE's]
        infSendData = { 'e': e, 'stop': false, 'status1': `Buscando novos NIRE's` }
        retSendData = await sendData(infSendData)
        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` })
        await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });

        // CHECK PAGE [LISTA DE NIRE's]
        value = await page.evaluate(() => document.querySelector('*').outerHTML);
        retCheckPage = await checkPage({ 'e': e, 'body': value, });
        if (!retCheckPage.ret) {
            err = `$ [serverJucesp] ${retCheckPage.msg}`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_Jucesp_err_5.jpg` });
            infSendData = { 'e': e, 'stop': true, 'status1': err }
            retSendData = await sendData(infSendData);
            return retCheckPage
        };

        // ARQUIVO DE NIRE's JÁ CONSULTADOS: ESCREVER QUEBRA DE LINHA → LER O ARQUIVO
        infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'path': './log/NIREs.txt', 'rewrite': true, 'text': '\n' }
        retFile = await file(infFile);
        infFile = { 'e': e, 'action': 'read', 'functionLocal': false, 'path': './log/NIREs.txt' }
        retFile = await file(infFile);
        try { sheetNire = JSON.parse(retFile.res) } catch (catchErr) { sheetNire = [] }

        // ###################################################################################
        // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [PRIMEIRA PÁGINA]
        infGetTextElement = { 'e': e, 'value': value, 'element': 'results' }
        retGetTextElement = await getTextElement(infGetTextElement); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2]]
        pg = mode == '→' ? 1 : Math.ceil(Number(value[2]) / 15)
        results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]

        if (mode == '←' && results[3] > 15) {
            // BUTTON [ULTIMA PÁGINA]
            infButtonElement = { 'browser': browser, 'page': page, 'button': 'last' }
            retButtonElement = await buttonElement(infButtonElement)

            await new Promise(resolve => { setTimeout(resolve, 2000) })

            // AGUARDAR PÁGINA TERMINAR DE CARREGAR
            infAwaitLoad = { 'e': e, 'browser': browser, 'page': page, 'element': '#jo_encontrados' }
            retAwaitLoad = await awaitLoad(infAwaitLoad)

            await new Promise(resolve => { setTimeout(resolve, 2000) })

            // AGUARDAR 'Lista de NIRE' APARECER
            await Promise.all([page.waitForSelector("#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lblRazaoSocial", { visible: true }),]);

            // CHECK PAGE [LISTA DE NIRE's]
            value = await page.evaluate(() => document.querySelector('*').outerHTML);
            retCheckPage = await checkPage({ 'e': e, 'body': value, });
            if (!retCheckPage.ret) {
                err = `$ [serverJucesp] ${retCheckPage.msg}`
                logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
                retLog = await log(infLog);
                await page.screenshot({ path: `log/screenshot_Jucesp_err_6.jpg` });
                infSendData = { 'e': e, 'stop': true, 'status1': err }
                retSendData = await sendData(infSendData);
                return retCheckPage
            };

            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [PRIMEIRA PÁGINA]
            infGetTextElement = { 'e': e, 'value': value, 'element': 'results' }
            retGetTextElement = await getTextElement(infGetTextElement); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2]]
            pg = mode == '→' ? 1 : Math.ceil(Number(value[2]) / 15)
            results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]
        }
        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `INÍCIO\n${results}` });

        // *****************************************************************
        for (let i = 0; i < repet1; i++) {
            // CHECK PAGE [LISTA DE NIRE's]
            value = await page.evaluate(() => document.querySelector('*').outerHTML);
            retCheckPage = await checkPage({ 'e': e, 'body': value, });
            if (!retCheckPage.ret) {
                err = `$ [serverJucesp] ${retCheckPage.msg}`
                logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
                retLog = await log(infLog);
                await page.screenshot({ path: `log/screenshot_Jucesp_err_7.jpg` });
                infSendData = { 'e': e, 'stop': true, 'status1': err }
                retSendData = await sendData(infSendData); return
            };

            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [DEMAIS PÁGINAS]
            infGetTextElement = { 'e': e, 'value': value, 'element': 'results' }
            retGetTextElement = await getTextElement(infGetTextElement); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2]]
            results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]
            let repet2 = Number(value[1]) - Number(value[0]) + 1
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `MEIO\n${repet2}\n${results}` });
            await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });

            // ADICIONAR NO LOOP DA CONSULTA
            let newValues = retGetTextElement.res[1]
            for (let i = 0; i < newValues.length; i++) {
                valuesJucesp.push(newValues[i])
                if (!sheetNire.includes(newValues[i])) {
                    valuesLoop.push(newValues[i])
                }
            }

            // STATUS [BUSCANDO NOVOS NIRE's]
            infSendData = { 'e': e, 'stop': false, 'status1': `[${mode}] NIRE's: ${results[3]} Página ${pg} de ${Math.ceil(Number(value[2]) / 15)}` }
            retSendData = await sendData(infSendData)
            await new Promise(resolve => { setTimeout(resolve, 4000) })

            if (mode == '→') { pg++ } else { pg-- }
            if ((mode == '→' && Number(value[1]) == Number(value[2])) || (mode == '←' && Number(value[0]) == 1)) {
                logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `ACABARAM AS PÁGINAS DO JUCESP` });
                lastPage = true
                break
            } else {
                // BUTTON [PRÓXIMA PÁGINA] / [PRÓXIMA ANTERIOR]
                if (mode == '→') {
                    infButtonElement = { 'browser': browser, 'page': page, 'button': 'next' }
                } else if (mode == '←') {
                    infButtonElement = { 'browser': browser, 'page': page, 'button': 'prev' }
                }

                retButtonElement = await buttonElement(infButtonElement)
                await new Promise(resolve => { setTimeout(resolve, 2000) })

                // AGUARDAR PÁGINA TERMINAR DE CARREGAR
                infAwaitLoad = { 'e': e, 'browser': browser, 'page': page, 'element': '#jo_encontrados' }
                retAwaitLoad = await awaitLoad(infAwaitLoad)

                await new Promise(resolve => { setTimeout(resolve, 2000) })
            }
        }
        // *****************************************************************

        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `FIM - QTD [${valuesJucesp.length}]` });
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ [serverJucesp] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRun()


