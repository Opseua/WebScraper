await import('./resources/@export.js')
let e = import.meta.url;
async function serverJucesp(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    // if (catchGlobal) {
    //     const errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } }
    //     if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
    //     else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    // }
    try {
        let time = dateHour().res; console.log(`${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, `serverJucesp [WebScraper]`, '\n');

        let infNavigate, retNavigate, infImput, retImput, infCookiesGetSet, retCookiesGetSet, infAwaitLoad, retAwaitLoad, infCheckPage, retCheckPage, infRegex, retRegex
        let element, cookies, value, results = [], infSendData, retSendData, infGoogleSheet, retGoogleSheet, sheetNire, valuesLoop = [], valuesJucesp = [], aut, date
        let infButtonElement, retButtonElement, infGetTextElement, retGetTextElement, infFile, retFile, infLog, retLog, lastPage = false, err, conSpl

        gO.inf['stop'] = false; let rate = rateLimiter({ 'max': 3, 'sec': 40 }); time = dateHour().res;
        let repet1 = 999999, pg, mode, lin, range = 'A2'; gO.inf['sheetId'] = '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8'; gO.inf['sheetTab'] = 'RESULTADOS'
        let infConfigStorage, retConfigStorage

        // PEGAR O TOKEN DO CONFIG
        infConfigStorage = { 'e': e, 'action': 'get', 'functionLocal': false, 'key': 'cnpja' } // 'functionLocal' SOMENTE NO NODEJS
        retConfigStorage = await configStorage(infConfigStorage);
        if (!retConfigStorage.ret) {
            err = `[serverJucesp] FALSE: retConfigStorage`
            console.log(err);
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retConfigStorage }
            retLog = await log(infLog);
            let infSendData = { 'e': e, 'stop': true, 'status1': err }
            let retSendData = await sendData(infSendData)
            return retConfigStorage
        } else {
            retConfigStorage = retConfigStorage.res
        }
        let token = inf && inf.token ? inf.token : retConfigStorage.token
        gO.inf['token'] = token;

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        infGoogleSheet = {
            'action': 'get',
            'id': gO.inf.sheetId,
            'tab': gO.inf.sheetTab,
            'range': range,
        }
        retGoogleSheet = await googleSheet(infGoogleSheet);
        if (!retGoogleSheet.ret) {
            err = `[serverJucesp] Erro ao pegar dados para planilha`
            console.log(err);
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheet }
            retLog = await log(infLog);
            infSendData = { 'e': e, 'stop': true, 'status1': err }
            retSendData = await sendData(infSendData);
            return retGoogleSheet
        }
        gO.inf['sheetKepp'] = JSON.parse(retGoogleSheet.res[0])
        aut = gO.inf.sheetKepp.aut
        date = gO.inf.sheetKepp.date
        mode = gO.inf.sheetKepp.mode
        conSpl = gO.inf.sheetKepp.conSpl

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { 'e': e, 'stop': false, 'status1': 'Iniciando script, aguarde' }
        retSendData = await sendData(infSendData)
        console.log(infSendData.status1)

        // INICIAR PUPPETEER
        let browser = await _puppeteer.launch({
            // headless: letter == 'D' ? false : 'new', // false | 'new'
            headless: 'new', // false | 'new'
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
        //                 console.log('BODY:\n', body, '\n');  // bodyNew = body;
        //             }
        //         }; if (bodyNew) { request.continue({ postData: bodyNew }); } else { request.continue(); }
        //     }
        // }); page.on('response', async (response) => {  // INTERCEPTAR RES [GET]
        //     // console.log('>> RES', response.url());
        //     try {
        //         let body = await response.text(); if (body) {
        //             //  console.log('BODY:\n', body, '\n');
        //         }
        //     } catch (error) { }
        // });

        // LOOP API
        async function loopFunRun(inf) {
            let current = `[${inf.index + 1}/${inf.length}]`
            // RESULTS
            let ok = false
            console.log(`${valuesLoop.length} | ${inf.value}`)
            let retApiNire = await apiNire({ 'date': date, 'nire': inf.value, 'aut': aut })
            if (!retApiNire.ret) {
                err = `[serverJucesp] FALSE: retApiNire`
                console.log(err);
                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retApiNire }
                retLog = await log(infLog);
                let status = retApiNire.msg ? retApiNire.msg : err
                await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });
                infSendData = { 'e': e, 'stop': true, 'status1': status }
                retSendData = await sendData(infSendData)
            } else if (!retApiNire.res) {
                err = `${inf.value} ${current} | ${retApiNire.msg}`
                console.log(err);
                infSendData = { 'e': e, 'stop': false, 'status2': err }
                retSendData = await sendData(infSendData)
                ok = true
            } else {
                infSendData = { 'e': e, 'stop': false, 'status2': `${inf.value} ${current} | OK` }
                retSendData = await sendData(infSendData);
                console.log(infSendData.status2)
                let infApiCnpj, retApiCnpj
                if (!rate.check()) { await new Promise(resolve => { setTimeout(resolve, 10000) }) }
                infApiCnpj = { 'e': e, 'cnpj': retApiNire.res[0], }
                retApiCnpj = await apiCnpj(infApiCnpj)
                if (!retApiCnpj.res || !retApiCnpj.res.cnpj) {
                    err = `[serverJucesp] FALSE: retApiCnpj`
                    console.log(err);
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retApiCnpj }
                    retLog = await log(infLog);
                    await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });
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
                        console.log('INDICES ACABARAM');
                        infSendData = { 'e': e, 'stop': false, 'status2': 'Terminou de consultar tudo' }
                        retSendData = await sendData(infSendData);
                        browser.close()
                        return
                    }
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                }
            };
            console.log('PAROU O LOOP');
        }; loopFun();

        // NAVIGATE [ABRINDO JUCESP]
        infNavigate = { 'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
        retNavigate = await navigate(infNavigate)

        await new Promise(resolve => { setTimeout(resolve, 2000) })

        // CHECK PAGE [PAGINA DE PESQUISA]
        value = await page.content()
        retCheckPage = await checkPage({ 'body': value, 'search': `Pesquisa Avançada` });
        if (!retCheckPage.ret) {
            err = `[serverJucesp] Não encontrou a página de pesquisa`
            console.log(err);
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });
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
        console.log(infSendData.status1)
        await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });

        // IMPUT [DATA INÍCIO]
        infImput = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': `${date.replace(/[^0-9]/g, '')}` }
        retImput = await imput(infImput)

        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // IMPUT [DATA FIM]
        infImput = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaFim', 'value': `${date.replace(/[^0-9]/g, '')}` }
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
        retCheckPage = await checkPage({ 'body': value, });
        if (!retCheckPage.ret) {
            err = `[serverJucesp] ${retCheckPage.msg}`
            console.log(err);
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });
            infSendData = { 'e': e, 'stop': true, 'status1': err }
            retSendData = await sendData(infSendData);
            return retCheckPage
        };

        // STATUS [BUSCANDO NOVOS NIRE's]
        infSendData = { 'e': e, 'stop': false, 'status1': `Buscando novos NIRE's` }
        retSendData = await sendData(infSendData)
        console.log(infSendData.status1)
        await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });

        // CHECK PAGE [LISTA DE NIRE's]
        value = await page.evaluate(() => document.querySelector('*').outerHTML);
        retCheckPage = await checkPage({ 'body': value, });
        if (!retCheckPage.ret) {
            err = `[serverJucesp] ${retCheckPage.msg}`
            console.log(err);
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });
            infSendData = { 'e': e, 'stop': true, 'status1': err }
            retSendData = await sendData(infSendData);
            return retCheckPage
        };

        // ARQUIVO DE NIRE's JÁ CONSULTADOS: ESCREVER QUEBRA DE LINHA → LER O ARQUIVO
        infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'path': './log/NIREs.txt', 'rewrite': true, 'text': '\n' }
        retFile = await file(infFile);
        infFile = { 'e': e, 'action': 'read', 'functionLocal': false, 'path': './log/NIREs.txt' }
        retFile = await file(infFile);
        try { sheetNire = JSON.parse(retFile.res) } catch (e) { sheetNire = [] }

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
            retCheckPage = await checkPage({ 'body': value, });
            if (!retCheckPage.ret) {
                err = `[serverJucesp] ${retCheckPage.msg}`
                console.log(err);
                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
                retLog = await log(infLog);
                await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });
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
        console.log('INÍCIO', results)

        // *****************************************************************
        for (let i = 0; i < repet1; i++) {
            // CHECK PAGE [LISTA DE NIRE's]
            value = await page.evaluate(() => document.querySelector('*').outerHTML);
            retCheckPage = await checkPage({ 'body': value, });
            if (!retCheckPage.ret) {
                err = `[serverJucesp] ${retCheckPage.msg}`
                console.log(err);
                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
                retLog = await log(infLog);
                await page.screenshot({ path: `log/screenshot_Jucesp.jpg` });
                infSendData = { 'e': e, 'stop': true, 'status1': err }
                retSendData = await sendData(infSendData); return
            };

            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [DEMAIS PÁGINAS]
            infGetTextElement = { 'e': e, 'value': value, 'element': 'results' }
            retGetTextElement = await getTextElement(infGetTextElement); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2]]
            results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]
            let repet2 = Number(value[1]) - Number(value[0]) + 1
            console.log('MEIO', repet2, results)
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
                console.log('ACABARAM AS PÁGINAS DO JUCESP')
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

        console.log('FIM - QTD', valuesJucesp.length,)
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let err = `[serverJucesp] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': err }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}
await serverJucesp()

