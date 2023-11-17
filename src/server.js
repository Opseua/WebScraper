async function run(inf) {
    await import('../../Chrome_Extension/src/resources/@functions.js')
    const puppeteer = await import('puppeteer');
    let ret = { 'ret': false };
    try {
        let infNavigate, retNavigate, infImput, retImput, infCookiesGetSet, retCookiesGetSet, infAwaitLoad, retAwaitLoad, infCheckPage, retCheckPage, infRegex, retRegex
        let element, cookies, value, results = [], infSendData, retSendData, infGoogleSheet, retGoogleSheet, sheetNire, valuesLoop = [], valuesJucesp = [], aut, date
        let infButtonElement, retButtonElement, infGetTextElement, retGetTextElement, lastPage = false
        gO.inf['stop'] = false; let time = dateHour().res; let rate = rateLimiter({ 'max': 3, 'sec': 40 });
        let repet1 = 100, pg, mode
        // STATUS [INSERINDO DATA DE PESQUISA]
        infSendData = { 'stop': false, 'status': 'Iniciando script, aguarde...' }
        console.log(infSendData.status)
        retSendData = await sendData(infSendData)

        const browser = await puppeteer.launch({
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
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        // FECHAR ABA EM BRANCO 
        await (await browser.pages())[0].close();
        // HAABILITAR INTERCEPTAÇÃO
        // await page.setRequestInterception(true);

        // // INTERCEPTAR REQ [SEND]
        // page.on('request', async (request) => {
        //     if (request.method() === 'OPTIONS') {
        //         request.abort();
        //     } else {
        //         let bodyNew
        //         if (request.method() === 'POST' || request.method() === 'PUT') {
        //             let body = await request.postData();
        //             if (body && body.includes('__VIEWSTATE') && request.url().includes('https://www.jucesponline.sp.gov.br/ResultadoBusca.aspx?IDProduto')) {
        //                 console.log('BODY:\n', body, '\n');
        //                 // bodyNew = body;
        //             }
        //         }
        //         if (bodyNew) {
        //             request.continue({ postData: bodyNew });
        //         } else {
        //             request.continue();
        //         }
        //     }
        // });

        // // INTERCEPTAR RES [GET]
        // page.on('response', async (response) => {
        //     // console.log('>> RES', response.url());
        //     try {
        //         const body = await response.text()
        //         if (body) {
        //             //  console.log('BODY:\n', body, '\n');
        //         }
        //     } catch (error) { }
        // });

        // LOOP API
        async function loopFunRun(inf) {
            // RESULTS
            if (!rate.check()) { await new Promise(resolve => { setTimeout(resolve, 10000) }) }
            let time = dateHour().res
            console.log('CONSULTANDO NIRE:', inf.value)
            // STATUS [CONSULTANDO NIRE]
            if (lastPage) {
                infSendData = { 'stop': false, 'status': `[${mode}] Consultando NIRE: ${inf.value}` }
                retSendData = await sendData(infSendData)
            }
            let retApiNire = await apiNire({ 'nire': inf.value, 'aut': aut })
            if (!retApiNire.ret) {
                let status = retApiNire.msg ? retApiNire.msg : 'ERRO: FALSE [apiNire]'
                infSendData = { 'stop': true, 'status': status }
                console.log(infSendData.status)
                retSendData = await sendData(infSendData)
            } else {
                if (retApiNire.res && retApiNire.res.cnpj) {
                    let apiNire = retApiNire.res
                    let results = [[
                        `${inf.value}`,
                        `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`,
                        apiNire.criacao, apiNire.cnpj, apiNire.razaoSocial,
                        apiNire.telefone1,
                        apiNire.telefone2,
                        apiNire.email1,
                        apiNire.gestor1,
                    ]]
                    results = results[0].join('|=:=')
                    infSendData = { 'stop': false, 'results': results }
                    retSendData = await sendData(infSendData)
                } else {
                    console.log('NÃO RETORNOU OS DADOS DO CNPJ')
                }
            }
        }
        async function loopFun() {
            let indice = 0; while (!gO.inf.stop) {
                if (indice < valuesLoop.length) {
                    await loopFunRun({ 'value': valuesLoop[indice] });
                    indice++
                    if (indice == valuesLoop.length) {
                        console.log('INDICES ACABARAM');
                        infSendData = { 'stop': true, 'status': 'Terminou de consultar tudo' }
                        retSendData = await sendData(infSendData);
                    }
                } else { await new Promise((resolve) => setTimeout(resolve, 1000)) }
            }; console.log('PAROU O LOOP');
        }; loopFun();

        // NAVIGATE [ABRINDO JUCESP]
        infNavigate = { 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
        retNavigate = await navigate(infNavigate)

        await new Promise(resolve => { setTimeout(resolve, 2000) })

        // CHECK PAGE [PAGINA DE PESQUISA]
        value = await page.content()
        retCheckPage = await checkPage({ 'body': value, 'search': `Pesquisa Avançada` });
        if (!retCheckPage.ret) {
            infSendData = { 'stop': true, 'status': 'Não encontrou a página de pesquisa' }
            retSendData = await sendData(infSendData); console.log(retCheckPage); return
        };

        // AGUARDAR 'Pesquisa Avançada' APARECER 
        // await Promise.all([page.waitForSelector("#content > h3", { visible: true }),]);

        // PEGAR DA PLANILHA [A2]
        infGoogleSheet = {
            'action': 'get',
            'id': '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8',
            'tab': 'RESULTADOS_CNPJ_NEW',
            'range': 'A2', // PERÍMETRO
            // 'range': 'E1', // CÉLULA ÚNICA
        }
        retGoogleSheet = await googleSheet(infGoogleSheet);
        if (!retGoogleSheet.ret) {
            infSendData = { 'stop': true, 'status': `Erro ao pegar dados para planilha` }
            retSendData = await sendData(infSendData); console.log(retGoogleSheet); return
        }
        retGoogleSheet = JSON.parse(retGoogleSheet.res[0])

        // COOKIE [SET]
        aut = retGoogleSheet.aut
        date = retGoogleSheet.date
        mode = retGoogleSheet.mode
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) { date = `${time.day}${time.mon}2023` } else { date = date.replace(/[^0-9]/g, '') }
        infCookiesGetSet = { 'browser': browser, 'page': page, 'action': 'set', 'value': aut }
        retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)

        // STATUS [INSERINDO DATA DE PESQUISA]
        infSendData = { 'stop': false, 'status': 'Inserindo data de pesquisa' }
        console.log(infSendData.status)
        retSendData = await sendData(infSendData)

        // IMPUT [DATA INÍCIO]
        infImput = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': `${date}` }
        retImput = await imput(infImput)

        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // IMPUT [DATA FIM]
        infImput = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaFim', 'value': `${date}` }
        retImput = await imput(infImput)

        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // BUTTON [PESQUISAR]
        infButtonElement = { 'browser': browser, 'page': page, 'button': 'search' }
        retButtonElement = await buttonElement(infButtonElement)

        await new Promise(resolve => { setTimeout(resolve, 2000) })

        // AGUARDAR PÁGINA TERMINAR DE CARREGAR
        infAwaitLoad = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_hTitulo' }
        retAwaitLoad = await awaitLoad(infAwaitLoad)

        // STATUS [BUSCANDO NOVOS NIRE's]
        infSendData = { 'stop': false, 'status': `Buscando novos NIRE's` }
        console.log(infSendData.status)
        retSendData = await sendData(infSendData)

        // CHECK PAGE [COOKIE]
        // value = await page.content()
        value = await page.evaluate(() => document.querySelector('*').outerHTML);
        retCheckPage = await checkPage({ 'body': value, });
        if (!retCheckPage.ret) {
            infSendData = { 'stop': true, 'status': retCheckPage.msg }
            retSendData = await sendData(infSendData); console.log(retCheckPage); return
        };

        // BUTTON [TESTE] 
        // element = await page.$x('//*[@id="ctl00_cphContent_navigators_dtlNavigators_ctl03_pnlTopModifiers"]/a[5]/div/strong')
        // element = await page.$x('//*[@id="ctl00_cphContent_navigators_dtlNavigators_ctl03_pnlTopModifiers"]/a[4]/div')
        // await element[0].click()
        // await new Promise(resolve => { setTimeout(resolve, 2000) })

        // CHECK PAGE [LISTA DE NIRE's]
        // value = await page.content()
        value = await page.evaluate(() => document.querySelector('*').outerHTML);
        retCheckPage = await checkPage({ 'body': value, });
        if (!retCheckPage.ret) {
            infSendData = { 'stop': true, 'status': retCheckPage.msg }
            retSendData = await sendData(infSendData); console.log(retCheckPage); return
        };

        // PEGAR DA PLANILHA [NIRE's JÁ CONSULTADOS]
        infGoogleSheet = {
            'action': 'get',
            'id': '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8',
            'tab': 'RESULTADOS_CNPJ_NEW',
            'range': 'E1:E', // PERÍMETRO
            // 'range': 'E1', // CÉLULA ÚNICA
        }
        retGoogleSheet = await googleSheet(infGoogleSheet);
        if (!retGoogleSheet.ret) {
            infSendData = { 'stop': true, 'status': `Erro ao pegar dados para planilha` }
            retSendData = await sendData(infSendData); console.log(retGoogleSheet); return
        }
        sheetNire = retGoogleSheet.res.flat()

        // ###################################################################################
        // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [PRIMEIRA PÁGINA]
        infGetTextElement = { 'value': value, 'element': 'results' }
        retGetTextElement = await getTextElement(infGetTextElement); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2]]
        pg = mode == '→' ? 1 : Math.ceil(Number(value[2]) / 15)
        results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]

        if (mode == '←' && results[3] > 15) {
            // BUTTON [ULTIMA PÁGINA]
            infButtonElement = { 'browser': browser, 'page': page, 'button': 'last' }
            retButtonElement = await buttonElement(infButtonElement)

            await new Promise(resolve => { setTimeout(resolve, 2000) })

            // AGUARDAR PÁGINA TERMINAR DE CARREGAR
            infAwaitLoad = { 'browser': browser, 'page': page, 'element': '#jo_encontrados' }
            retAwaitLoad = await awaitLoad(infAwaitLoad)

            await new Promise(resolve => { setTimeout(resolve, 2000) })

            // AGUARDAR 'Lista de NIRE' APARECER
            await Promise.all([page.waitForSelector("#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lblRazaoSocial", { visible: true }),]);

            // CHECK PAGE [LISTA DE NIRE's]
            // value = await page.content()
            value = await page.evaluate(() => document.querySelector('*').outerHTML);
            retCheckPage = await checkPage({ 'body': value, });
            if (!retCheckPage.ret) {
                infSendData = { 'stop': true, 'status': retCheckPage.msg }
                retSendData = await sendData(infSendData); console.log(retCheckPage); return
            };

            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [PRIMEIRA PÁGINA]
            infGetTextElement = { 'value': value, 'element': 'results' }
            retGetTextElement = await getTextElement(infGetTextElement); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2]]
            pg = mode == '→' ? 1 : Math.ceil(Number(value[2]) / 15)
            results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]
        }
        console.log('INÍCIO', results)

        // *****************************************************************
        for (let i = 0; i < repet1; i++) {
            // AGUARDAR 'Lista de NIRE' APARECER
            // await Promise.all([page.waitForSelector("#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lblRazaoSocial", { visible: true }),]);

            // CHECK PAGE [LISTA DE NIRE's]
            // value = await page.content()
            value = await page.evaluate(() => document.querySelector('*').outerHTML);
            // value = await page.evaluate(() => { return document.documentElement.innerHTML });
            retCheckPage = await checkPage({ 'body': value, });
            if (!retCheckPage.ret) {
                infSendData = { 'stop': true, 'status': retCheckPage.msg }
                retSendData = await sendData(infSendData); console.log(retCheckPage); return
            };

            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [DEMAIS PÁGINAS]
            infGetTextElement = { 'value': value, 'element': 'results' }
            retGetTextElement = await getTextElement(infGetTextElement); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2]]
            results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]
            const repet2 = Number(value[1]) - Number(value[0]) + 1
            console.log('MEIO', repet2, results)

            // ADICIONAR NO LOOP DA CONSULTA
            let newValues = retGetTextElement.res[1]
            for (let i = 0; i < newValues.length; i++) {
                valuesJucesp.push(newValues[i])
                if (!sheetNire.includes(newValues[i])) {
                    valuesLoop.push(newValues[i])
                }
            }

            // STATUS [BUSCANDO NOVOS NIRE's]
            infSendData = { 'stop': false, 'status': `[${mode}] NIRE's: ${results[3]} Página ${pg} de ${Math.ceil(Number(value[2]) / 15)}` }
            retSendData = await sendData(infSendData)
            await new Promise(resolve => { setTimeout(resolve, 4000) })

            if (mode == '→') { pg++ } else { pg-- }
            if ((mode == '→' && Number(value[1]) == Number(value[2])) || (mode == '←' && Number(value[0]) == 1)) {
                console.log('ACABARAM AS PÁGINAS DO JUCESP')
                lastPage = true
                break
            } else {
                // AGUARDAR 'Lista de NIRE' APARECER
                // await Promise.all([page.waitForSelector("#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lblRazaoSocial", { visible: true }),]);

                // await new Promise(resolve => { setTimeout(resolve, 4000) })

                // BUTTON [PRÓXIMA PÁGINA] / [PRÓXIMA ANTERIOR]
                if (mode == '→') {
                    infButtonElement = { 'browser': browser, 'page': page, 'button': 'next' }
                } else if (mode == '←') {
                    infButtonElement = { 'browser': browser, 'page': page, 'button': 'prev' }
                }
                retButtonElement = await buttonElement(infButtonElement)
                await new Promise(resolve => { setTimeout(resolve, 2000) })

                // AGUARDAR PÁGINA TERMINAR DE CARREGAR
                infAwaitLoad = { 'browser': browser, 'page': page, 'element': '#jo_encontrados' }
                retAwaitLoad = await awaitLoad(infAwaitLoad)

                await new Promise(resolve => { setTimeout(resolve, 2000) })
            }
        }
        // *****************************************************************
        console.log('FIM - QTD', valuesJucesp.length,)
        return

        // MOSTRAR CONTEUDO DA PÁGINA
        value = await page.evaluate(() => document.body.textContent);
        // console.log(value);

        // ENCERRAR
        // await browser.close();

    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': true, 'status': 'TRYCATCH [server] Script erro!' }
        console.log(infSendData.status)
        let retSendData = await sendData(infSendData)
        process.exit();
    };
    return ret
}
run()
