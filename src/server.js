async function run(inf) {
    await import('../../Chrome_Extension/src/resources/@functions.js')
    let puppeteer = await import('puppeteer');
    let ret = { 'ret': false };
    try {
        let infNavigate, retNavigate, infImput, retImput, infCookiesGetSet, retCookiesGetSet, infAwaitLoad, retAwaitLoad, infCheckPage, retCheckPage, infRegex, retRegex
        let element, cookies, value, results = [], infSendData, retSendData, infGoogleSheet, retGoogleSheet, sheetNire, valuesLoop = [], valuesJucesp = [], aut, date
        let infButtonElement, retButtonElement, infGetTextElement, retGetTextElement, lastPage = false; gO.inf['sheetKepp'] = false
        gO.inf['stop'] = false; let time = dateHour().res; let rate = rateLimiter({ 'max': 3, 'sec': 40 });
        let repet1 = 100, pg, mode, lin, range = 'A2'; gO.inf['sheetId'] = '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8'; gO.inf['sheetTab'] = 'RESULTADOS_CNPJ_2'

        // PEGAR DA PLANILHA [A2]
        infGoogleSheet = {
            'action': 'get',
            'id': gO.inf.sheetId,
            'tab': gO.inf.sheetTab,
            'range': range,
        }
        retGoogleSheet = await googleSheet(infGoogleSheet);
        if (!retGoogleSheet.ret) {
            console.log(retGoogleSheet)
            infSendData = { 'stop': true, 'status1': `Erro ao pegar dados para planilha` }
            retSendData = await sendData(infSendData); return
        }
        gO.inf['sheetKepp'] = JSON.parse(retGoogleSheet.res[0])

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { 'stop': false, 'status1': 'Iniciando script, aguarde' }
        retSendData = await sendData(infSendData)
        console.log(infSendData.status1)

        // INICIAR PUPPETEER
        let browser = await puppeteer.launch({
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
        let page = await browser.newPage();
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
        //         let  body = await response.text()
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
            let retApiNire = await apiNire({ 'date': date, 'nire': inf.value, 'aut': aut })
            if (!retApiNire.ret) {
                let status = retApiNire.msg ? retApiNire.msg : 'ERRO: FALSE [apiNire]'
                console.log(status)
                infSendData = { 'stop': true, 'status1': status }
                retSendData = await sendData(infSendData)
            } else if (!retApiNire.res) {
                let status = `${inf.value} | ${retApiNire.msg}`
                console.log(status)
                infSendData = { 'stop': false, 'status2': status }
                retSendData = await sendData(infSendData)
            } else {
                console.log('TRUE', retApiNire)
                // let apiNire = retApiNire.res
                // let results = [[
                //     `${inf.value}`,
                //     `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`,
                //     apiNire.criacao, apiNire.cnpj, apiNire.razaoSocial,
                //     apiNire.telefone1,
                //     apiNire.telefone2,
                //     apiNire.email1,
                //     apiNire.gestor1,
                // ]]
                // results = results[0].join('|=:=')
                // infSendData = { 'stop': false, 'results': results }
                // retSendData = await sendData(infSendData)
            }


            await new Promise(resolve => { setTimeout(resolve, 10000) })
            return
        }
        async function loopFun() {
            let indice = 0; while (!gO.inf.stop) {
                if (indice < valuesLoop.length) {
                    await loopFunRun({ 'value': valuesLoop[indice] });
                    indice++
                    if (indice == valuesLoop.length) {
                        console.log('INDICES ACABARAM');
                        infSendData = { 'stop': true, 'status2': 'Terminou de consultar tudo' }
                        // retSendData = await sendData(infSendData);
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
            console.log(retCheckPage);
            infSendData = { 'stop': true, 'status1': 'Não encontrou a página de pesquisa' }
            retSendData = await sendData(infSendData); return
        };

        // AGUARDAR 'Pesquisa Avançada' APARECER 
        // await Promise.all([page.waitForSelector("#content > h3", { visible: true }),]);

        // COOKIE [SET]
        aut = gO.inf.sheetKepp.aut
        date = gO.inf.sheetKepp.date
        mode = gO.inf.sheetKepp.mode
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) { date = `${time.day}/${time.mon}/2023` }
        infCookiesGetSet = { 'browser': browser, 'page': page, 'action': 'set', 'value': aut }
        retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)

        // STATUS [INSERINDO DATA DE PESQUISA]
        infSendData = { 'stop': false, 'status1': 'Inserindo data de pesquisa' }
        retSendData = await sendData(infSendData)
        console.log(infSendData.status1)

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
        infAwaitLoad = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_hTitulo' }
        retAwaitLoad = await awaitLoad(infAwaitLoad)

        // CHECK PAGE [COOKIE]
        // value = await page.content()
        value = await page.evaluate(() => document.querySelector('*').outerHTML);
        retCheckPage = await checkPage({ 'body': value, });
        if (!retCheckPage.ret) {
            console.log(retCheckPage);
            infSendData = { 'stop': true, 'status1': retCheckPage.msg }
            retSendData = await sendData(infSendData); return
        };

        // STATUS [BUSCANDO NOVOS NIRE's]
        infSendData = { 'stop': false, 'status1': `Buscando novos NIRE's` }
        retSendData = await sendData(infSendData)
        console.log(infSendData.status1)

        valuesLoop.push('35141938101')

        return

        await new Promise(resolve => { setTimeout(resolve, 2000) })

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
            console.log(retCheckPage);
            infSendData = { 'stop': true, 'status1': retCheckPage.msg }
            retSendData = await sendData(infSendData); return
        };

        // PEGAR DA PLANILHA [NIRE's JÁ CONSULTADOS]
        infGoogleSheet = {
            'action': 'get',
            'id': gO.inf.sheetId,
            'tab': gO.inf.sheetTab,
            'range': 'E1:E',
        }
        retGoogleSheet = await googleSheet(infGoogleSheet);
        if (!retGoogleSheet.ret) {
            console.log(retGoogleSheet);
            infSendData = { 'stop': true, 'status1': `Erro ao pegar dados para planilha` }
            retSendData = await sendData(infSendData); return
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
                console.log(retCheckPage);
                infSendData = { 'stop': true, 'status1': retCheckPage.msg }
                retSendData = await sendData(infSendData); return
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
                console.log(retCheckPage);
                infSendData = { 'stop': true, 'status1': retCheckPage.msg }
                retSendData = await sendData(infSendData); return
            };

            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [DEMAIS PÁGINAS]
            infGetTextElement = { 'value': value, 'element': 'results' }
            retGetTextElement = await getTextElement(infGetTextElement); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2]]
            results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]
            let repet2 = Number(value[1]) - Number(value[0]) + 1
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
            infSendData = { 'stop': false, 'status1': `[${mode}] NIRE's: ${results[3]} Página ${pg} de ${Math.ceil(Number(value[2]) / 15)}` }
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
        let infSendData = { 'stop': true, 'status1': 'TRYCATCH [server] Script erro!' }
        console.log(infSendData.status1)
        let retSendData = await sendData(infSendData)
        process.exit();
    };
    return ret
}
run()
