function startupFun(b, c) { let a = c - b; let s = Math.floor(a / 1000); let m = a % 1000; let f = m.toString().padStart(3, '0'); return `${s}.${f}` }; let startup = new Date();
await import('./resources/@export.js');

let e = import.meta.url, ee = e;
async function serverRun(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        logConsole({ 'e': e, 'ee': ee, 'write': true, 'msg': `**************** SERVER **************** [${startupFun(startup, new Date())}]` })

        // CRIAR PASTA DOS REGISTROS
        let time = dateHour().res, mon, day; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`;
        let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'path': `log/Registros/${mon}/${day}/#_Z_#.txt`, 'rewrite': false, 'text': 'aaaaaa' }; let retFile = await file(infFile);

        // FORÇAR PARADA DO SCRIPT | NTFY
        async function processForceStop() {
            await commandLine({ 'e': e, 'command': `!letter!:/ARQUIVOS/PROJETOS/WebScraper/src/${gO.inf.shortcut}/OFF.vbs FORCE_STOP` }); await new Promise(resolve => { setTimeout(resolve, 7000) }); process.exit();
        }; async function sendNtfy(inf) { let u = devSend.split('/'); u = `https://ntfy.sh/${u[u.length - 1]}`; await api({ 'e': e, 'method': 'POST', 'url': `${u}`, 'body': inf.titleText }) };

        let infNavigate, retNavigate, infImput, retImput, retCookiesGetSet, infAwaitLoad, retAwaitLoad, retCheckPage, value, results = [], infSendData, infGetTextElement, retGetTextElement, browser, page, sheetTab
        let retSendData, infGoogleSheets, retGoogleSheets, sheetNire, valuesLoop = [], valuesJucesp = [], aut, date, infButtonElement, retButtonElement, infLog, retLog, lastPage = false, err, conSpl, chromiumHeadless, token;
        gO.inf['stop'] = false; let rate = rateLimiter({ 'max': 3, 'sec': 40 }); let repet1 = 999999, pg, mode, lin, range = 'A2';

        // DEFINIR O ID DA PLANILHA E ATALHO
        let googleSheetsId, retGetPath = await getPath({ 'e': new Error() }); if (!retGetPath.ret) { return retGetPath }; retGetPath = retGetPath.res.file;
        if (!retGetPath.includes('_TEMP.js')) { googleSheetsId = '1h0cjCceBBbX6IlDYl7DfRa7_i1__SNC_0RUaHLho7d8'; gO.inf['shortcut'] = 'z_Outros_serverJucesp'; sheetTab = 'RESULTADOS' }
        else { googleSheetsId = '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8'; gO.inf['shortcut'] = 'z_Outros_serverJucesp_New2'; sheetTab = 'JUCESP' }; gO.inf['sheetId'] = googleSheetsId; gO.inf['sheetTab'] = sheetTab

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        infGoogleSheets = { 'e': e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': range, }; retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) {
            err = `$ Erro ao pegar dados para planilha`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets }
            retLog = await log(infLog); retSendData = await sendData({ 'e': e, 'stop': false, 'status1': err });
            // FORÇAR PARADA DO SCRIPT
            await processForceStop()
        }; gO.inf['sheetKepp'] = JSON.parse(retGoogleSheets.res[0]); aut = gO.inf.sheetKepp.aut
        date = gO.inf.sheetKepp.date; mode = gO.inf.sheetKepp.mode; conSpl = gO.inf.sheetKepp.conSpl; chromiumHeadless = gO.inf.sheetKepp.chromiumHeadless; token = gO.inf.sheetKepp.token; gO.inf['token'] = token;

        // '0' → APARECE | '1' OCUTO
        if (chromiumHeadless == '0') { chromiumHeadless = false } else if (chromiumHeadless == '1') { chromiumHeadless = 'new' } else { chromiumHeadless = false }

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { 'e': e, 'stop': false, 'status1': '# Iniciando script, aguarde' }; retSendData = await sendData(infSendData); logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` })

        // STATUS2 [LIMPAR]
        infSendData = { 'e': e, 'stop': false, 'status2': ' ' }; retSendData = await sendData(infSendData);

        // INICIAR PUPPETEER | FECHAR ABA EM BRANCO 
        browser = await _puppeteer.launch({ // false | 'new'
            headless: chromiumHeadless, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--disable-gpu', '--disable-extensions',],
        }); page = await browser.newPage(); await page.setViewport({ 'width': 1024, 'height': 768 }); await (await browser.pages())[0].close();

        // LOOP API | // RESULTS
        async function loopFunRun(inf) {
            let current = `[${inf.index + 1}/${inf.length}]`
            let ok = false; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${valuesLoop.length}\n${inf.value}` }); let retApiNire = await apiNire({ 'e': e, 'date': date, 'nire': inf.value, 'aut': aut })
            if (!retApiNire.ret) {
                err = `$ FALSE: retApiNire`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });; infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retApiNire }
                retLog = await log(infLog); let status = retApiNire.msg ? retApiNire.msg : err; await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}_err_1.jpg` });
                retSendData = await sendData({ 'e': e, 'stop': true, 'status1': status })
            } else if (!retApiNire.res) {
                err = `${inf.value} ${current} | ${retApiNire.msg}`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); infSendData = { 'e': e, 'stop': false, 'status2': err }
                retSendData = await sendData(infSendData); ok = true
            } else {
                infSendData = { 'e': e, 'stop': false, 'status2': `${inf.value} ${current} | OK` }; retSendData = await sendData(infSendData); logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status2}` });
                let infApiCnpj, retApiCnpj; if (!rate.check()) { await new Promise(resolve => { setTimeout(resolve, 10000) }) }; infApiCnpj = { 'e': e, 'cnpj': retApiNire.res[0], }; retApiCnpj = await apiCnpj(infApiCnpj)
                if (!retApiCnpj.res || !retApiCnpj.res.cnpj) {
                    // err = `$ FALSE: retApiCnpj`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retApiCnpj }
                    // retLog = await log(infLog); await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}_err_2.jpg` }); infSendData = { 'e': e, 'stop': true, 'status1': err }; retSendData = await sendData(infSendData)
                } else {
                    let time = dateHour().res; retApiCnpj = retApiCnpj.res; let results = [[
                        `${inf.value}`, // NIRE
                        `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, // DATA SCRIPT
                        retApiNire.res[1], // DATA REC FED
                        retApiCnpj.cnpj, retApiCnpj.telefone1, retApiCnpj.telefone2, retApiCnpj.gestor1 == 'null' ? retApiCnpj.razaoSocial : retApiCnpj.gestor1, retApiCnpj.email1, retApiCnpj.razaoSocial,
                    ]]; results = results[0].join(conSpl); infSendData = { 'e': e, 'stop': false, 'results': results }; retSendData = await sendData(infSendData); ok = true
                }
            }; if (ok) {
                sheetNire.push(inf.value); infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'path': './log/NIREs.txt', 'rewrite': false, 'text': JSON.stringify(sheetNire, null, 2) }; retFile = await file(infFile);
            }; await new Promise(resolve => { setTimeout(resolve, 1000) }) // DELAY PARA EVITAR ACABAR A ARRAY
        }; async function loopFun() {
            let indice = 0; while (!gO.inf.stop) {
                if (indice < valuesLoop.length) {
                    await loopFunRun({ 'value': valuesLoop[indice], 'index': indice, 'length': valuesLoop.length }); indice++; if (indice == valuesLoop.length && lastPage) {
                        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `INDICES ACABARAM` }); infSendData = { 'e': e, 'stop': false, 'status2': 'Terminou de consultar tudo' }; retSendData = await sendData(infSendData);
                        // FORÇAR PARADA DO SCRIPT
                        await processForceStop()
                    }
                } else { await new Promise((resolve) => setTimeout(resolve, 1000)) }
            }; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `PAROU O LOOP` });
        }; loopFun();

        // NAVIGATE [ABRINDO JUCESP]
        infNavigate = { 'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }; retNavigate = await navigate(infNavigate)
        await new Promise(resolve => { setTimeout(resolve, 2000) })

        // CHECK PAGE [PAGINA DE PESQUISA]
        value = await page.content(); retCheckPage = await checkPage({ 'e': e, 'body': value, 'search': `Pesquisa Avançada` }); if (!retCheckPage.ret) {
            err = `$ Não encontrou a página de pesquisa`; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
            retLog = await log(infLog); await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}_err_3.jpg` }); infSendData = { 'e': e, 'stop': true, 'status1': err }; retSendData = await sendData(infSendData);; return retCheckPage
        };

        // COOKIE [SET]
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) { date = `${time.day}/${time.mon}/2023` }; retCookiesGetSet = await cookiesGetSet({ 'e': e, 'browser': browser, 'page': page, 'action': 'set', 'value': aut })

        // STATUS [INSERINDO DATA DE PESQUISA]
        infSendData = { 'e': e, 'stop': false, 'status1': 'Inserindo data de pesquisa' }; retSendData = await sendData(infSendData); logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` })
        await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}.jpg` });

        // IMPUT [DATA INÍCIO]
        infImput = { 'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': `${date.replace(/[^0-9]/g, '')}` }; retImput = await imput(infImput)
        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // IMPUT [DATA FIM]
        infImput = { 'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaFim', 'value': `${date.replace(/[^0-9]/g, '')}` }; retImput = await imput(infImput)
        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // BUTTON [PESQUISAR]
        infButtonElement = { 'browser': browser, 'page': page, 'button': 'search' }; retButtonElement = await buttonElement(infButtonElement)

        // AGUARDAR PÁGINA TERMINAR DE CARREGAR
        infAwaitLoad = { 'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_hTitulo' }; retAwaitLoad = await awaitLoad(infAwaitLoad)

        // ########### NOVO MODELO DE CAPTCHA
        if (retGetPath.includes('_TEMP.js')) {
            // ********************************************************************************************************************************************************************************************
            await new Promise(resolve => { setTimeout(resolve, 2000) }); // NÃO REMOVER!!!
            let retCaptcha; async function captcha(inf) {
                let ret = { 'ret': false };
                try {
                    let { page, action, text } = inf; let formBuscaAvancada = await page.$('#formBuscaAvancada'); if (!formBuscaAvancada) { ret['msg'] = 'ERRO: CAPTCHA NÃO ENCONTRADO' } else {
                        if (action == 'get') {
                            // CAPTCHA: RETORNAR URL
                            let captchaUrl = await formBuscaAvancada.$('img[src^="CaptchaImage.aspx"]'); captchaUrl = await captchaUrl.evaluate(img => img.src);
                            ret['res'] = captchaUrl; ret['msg'] = 'CAPTHCA OK: URL RETORNADO'; ret['ret'] = true
                            // MANDAR PARA A PLANILHA
                            await googleSheets({ 'e': e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `A85`, 'values': [[JSON.stringify(ret),]] });
                            // STATUS [PRESSIONAR O BOTAO E INSERIR O CAPTCHA]
                            infSendData = { 'e': e, 'stop': false, 'status1': 'Pressione o botão e insira o captcha' }; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` });
                            retSendData = await sendData(infSendData);
                        } else if (action == 'send') {
                            // CAPTCHA: INSERIR TEXTO
                            infSendData = { 'e': e, 'stop': false, 'status1': `Inserindo captcha '${text}'` }; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` })
                            retSendData = await sendData(infSendData);
                            await page.focus('input[name="ctl00$cphContent$gdvResultadoBusca$CaptchaControl1"]'); page.keyboard.type(text); ret['msg'] = 'CAPTHCA OK: TEXTO INSERIDO'; ret['ret'] = true
                        } else if (action == 'continue') {
                            // CAPTCHA: PROSSEGUIR
                            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `Apertando botão CONTINUAR` })
                            await page.click('input[name="ctl00$cphContent$gdvResultadoBusca$btEntrar"]'); ret['msg'] = 'CAPTHCA OK: CAPTCHA ENVIADO'; ret['ret'] = true
                        }
                    }
                } catch (catchErr) { ret['msg'] = 'ERRO: AO CAPTURAR/INSERIR CAPTCHA'; esLintIgnore = catchErr; }; return { ...({ ret: ret.ret }), ...(ret.msg && { msg: ret.msg }), ...(ret.res && { res: ret.res }), };
            }

            // CHECAR SE O CAPTCHA APARECEU
            retCaptcha = await captcha({ 'page': page, 'action': 'get' }); if (retCaptcha.ret) {
                // CAPTCHA EXISTE (FOI ENVIADO PARA A PLANILHA) AGUARDAR O TEXTO
                let tentativasMaximas = 30, tentativas = 0, valorCelula = ''; while (tentativas < tentativasMaximas) {
                    tentativas++; valorCelula = await googleSheets({ 'e': e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': 'A85', });
                    valorCelula = valorCelula.res[0][0]; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `[${tentativas}/${tentativasMaximas}] Esperando texto do captcha ${valorCelula}` });
                    await new Promise(resolve => { setTimeout(resolve, 1000) }); if (tentativas + 1 > tentativasMaximas) {
                        // LIMPAR O TEXTO DA COMUNICAÇÃO ANTIGO | FORÇAR PARADA DO SCRIPT [CAPTCHA NÃO FOI IDENTIFICADO A TEMPO]
                        await googleSheets({ 'e': e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `A85`, 'values': [[' ',]] });
                        retSendData = await sendData({ 'e': e, 'stop': false, 'status1': '$ Cookie expirou' }); await processForceStop()
                    } else if (valorCelula.includes('captchaText')) { valorCelula = JSON.parse(valorCelula).captchaText; break; }; // CAPTCHA IDENTIFICADO
                }

                logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `[${tentativas}/${tentativasMaximas}] Capthca identificado '${valorCelula}'` })
                // INSERIR O CAPTCHA E PROSSEGUIR
                retCaptcha = await captcha({ 'page': page, 'action': 'send', 'text': valorCelula }); await new Promise(resolve => { setTimeout(resolve, 1000) }); retCaptcha = await captcha({ 'page': page, 'action': 'continue' })

                // RECARREGAR A PÁGINA
                await page.reload({ waitUntil: 'networkidle2' });

                // AGUARDAR PÁGINA TERMINAR DE CARREGAR
                infAwaitLoad = { 'e': e, 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaSimples_hTitulo' }; retAwaitLoad = await awaitLoad(infAwaitLoad)

                // PEGAR O COOKIE E SALVAR NA PLANILHA
                retCookiesGetSet = await cookiesGetSet({ 'e': e, 'browser': browser, 'page': page, 'action': 'get', }); logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': 'Salvando cookie na planilha e reiniciando' });
                await googleSheets({ 'e': e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `A36`, 'values': [[JSON.stringify(retCookiesGetSet.res),]] });

                // LIMPAR O TEXTO DA COMUNICAÇÃO ANTIGO
                await googleSheets({ 'e': e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `A85`, 'values': [['',]] });
            }
            // await new Promise(resolve => { setTimeout(resolve, 1000000) })
        }
        // ********************************************************************************************************************************************************************************************

        // CHECK PAGE [COOKIE]
        value = await page.evaluate(() => document.querySelector('*').outerHTML);
        retCheckPage = await checkPage({ 'e': e, 'body': value, });
        if (!retCheckPage.ret) {
            err = `$ [serverJucesp] ${retCheckPage.msg}`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}_err_4.jpg` });
            infSendData = { 'e': e, 'stop': true, 'status1': err }
            retSendData = await sendData(infSendData);
            // FORÇAR PARADA DO SCRIPT
            await processForceStop()
        };

        // STATUS [BUSCANDO NOVOS NIRE's]
        infSendData = { 'e': e, 'stop': false, 'status1': `Buscando novos NIRE's` }
        retSendData = await sendData(infSendData)
        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` })
        await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}.jpg` });

        // CHECK PAGE [LISTA DE NIRE's]
        value = await page.evaluate(() => document.querySelector('*').outerHTML);
        retCheckPage = await checkPage({ 'e': e, 'body': value, });
        if (!retCheckPage.ret) {
            err = `$ [serverJucesp] ${retCheckPage.msg}`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}_err_5.jpg` });
            infSendData = { 'e': e, 'stop': true, 'status1': err }
            retSendData = await sendData(infSendData);
            return retCheckPage
        };

        // ARQUIVO DE NIRE's JÁ CONSULTADOS: ESCREVER QUEBRA DE LINHA → LER O ARQUIVO
        infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'path': './log/NIREs.txt', 'rewrite': true, 'text': '\n' }
        retFile = await file(infFile);
        infFile = { 'e': e, 'action': 'read', 'functionLocal': false, 'path': './log/NIREs.txt' }
        retFile = await file(infFile);
        try { sheetNire = JSON.parse(retFile.res) } catch (catchErr) { sheetNire = []; esLintIgnore = catchErr; }

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
                await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}_err_6.jpg` });
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
                await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}_err_7.jpg` });
                infSendData = { 'e': e, 'stop': true, 'status1': err }
                retSendData = await sendData(infSendData); return
            };

            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [DEMAIS PÁGINAS]
            infGetTextElement = { 'e': e, 'value': value, 'element': 'results' }
            retGetTextElement = await getTextElement(infGetTextElement); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2]]
            results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]
            let repet2 = Number(value[1]) - Number(value[0]) + 1
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `MEIO\n${repet2}\n${results}` });
            await page.screenshot({ path: `log/screenshot_Jucesp_${gO.inf.shortcut}.jpg` });

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
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let errMsg = `$ [serverJucesp] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        let retSendData = await sendData(infSendData)
    }; return { ...({ ret: ret.ret }), ...(ret.msg && { msg: ret.msg }), ...(ret.res && { res: ret.res }), };
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRun()

