let startup = new Date(); globalThis['sP'] = import.meta.url; await import('./resources/@export.js'); let e = sP, ee = e;

async function serverRun(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        await logConsole({ e, ee, 'txt': `**************** SERVER **************** [${startupTime(startup, new Date())}]`, });

        // CRIAR PASTA DOS REGISTROS
        let time = dateHour().res, mon, day, hou; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`; hou = `${time.hou}.${time.min}.${time.sec}.${time.mil}`;
        await file({ e, 'action': 'write', 'path': `logs/Registros/${mon}/${day}/#_Z_#.txt`, 'text': 'x', });

        // FORÇAR PARADA DO SCRIPT | NTFY
        async function processForceStop() {
            await commandLine({ e, 'command': `${fileProjetos}/${gW.project}/src/${gO.inf.shortcut}/OFF.vbs FORCE_STOP`, }); await new Promise(r => { setTimeout(r, 3000); }); crashCode();
        }

        let retCookiesGetSet, retCheckPage, value, results = [], infSendData, retGetTextElement, browser, page, sheetTab, retGoogleSheets, sheetNire, valuesLoop = [];
        let valuesJucesp = [], aut, date, infButtonElement, retFile; let lastPage = false, err, conSpl, chromiumHeadless, token; gO.inf['stop'] = false;
        let rate = rateLimiter({ 'max': 3, 'sec': 40, }); let repet1 = 999999, pg, mode, lin, range = 'A2';

        // DEFINIR O ID DA PLANILHA E ATALHO
        let googleSheetsId, retGetPath = await getPath({ 'e': new Error(), }); if (!retGetPath.ret) { return retGetPath; } retGetPath = retGetPath.res.file;
        if (!retGetPath.includes('_TEMP.js')) { googleSheetsId = '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8'; gO.inf['shortcut'] = 'z_OUTROS_serverJucesp'; sheetTab = 'JUCESP'; }
        gO.inf['sheetId'] = googleSheetsId; gO.inf['sheetTab'] = sheetTab;

        // DADOS GLOBAIS DA PLANILHA E FAZER O PARSE
        retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, range, }); if (!retGoogleSheets.ret) {
            err = `$ Erro ao pegar-enviar dados para planilha`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retGoogleSheets, });
            await sendData({ e, 'stop': false, 'status1': err, });
            // FORÇAR PARADA DO SCRIPT
            await processForceStop();
        } gO.inf['sheetKepp'] = JSON.parse(retGoogleSheets.res[0]); aut = gO.inf.sheetKepp.aut; date = gO.inf.sheetKepp.date; mode = gO.inf.sheetKepp.mode; conSpl = gO.inf.sheetKepp.conSpl;
        chromiumHeadless = gO.inf.sheetKepp.chromiumHeadless; token = gO.inf.sheetKepp.token; gO.inf['token'] = token;

        // '0' → APARECE | '1' OCUTO
        if (chromiumHeadless === '0') { chromiumHeadless = false; } else if (chromiumHeadless === '1') { chromiumHeadless = 'new'; } else { chromiumHeadless = false; }

        // STATUS1 [Iniciando script, aguarde]
        infSendData = { e, 'stop': false, 'status1': '# Iniciando script, aguarde', }; await sendData(infSendData); logConsole({ e, ee, 'txt': `${infSendData.status1}`, });

        // STATUS2 [LIMPAR]
        await sendData({ e, 'stop': false, 'status2': ' ', });

        // INICIAR PUPPETEER | FECHAR ABA EM BRANCO 
        browser = await _puppeteer.launch({ // false | 'new'
            'userDataDir': `./logs/Registros/${mon}/${day}/${hou}_node${gW.project}_${gO.inf['shortcut'].replace('z_OUTROS_', '')}`, 'headless': chromiumHeadless, 'defaultViewport': { width: 1050, height: 964, },
            'args': ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--disable-gpu', '--disable-extensions',],
        }); page = await browser.newPage(); await (await browser.pages())[0].close();

        // LOOP API | // RESULTS
        async function loopFunRun(inf = {}) {
            let current = `[${inf.index + 1}/${inf.length}]`;
            let ok = false; logConsole({ e, ee, 'txt': `${valuesLoop.length}\n${inf.value}`, }); let retApiNire = await apiNire({ e, date, 'nire': inf.value, aut, });
            if (!retApiNire.ret) {
                // err = `% FALSE: retApiNire`; logConsole({ e, ee, 'txt': `${err}` }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retApiNire });
                // let status = retApiNire.msg ? retApiNire.msg : err; await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_1.jpg`, fullPage: true }); await sendData({ e, 'stop': true, 'status1': status })
            } else if (!retApiNire.res) {
                // err = `${inf.value} ${current} | ${retApiNire.msg}`; logConsole({ e, ee, 'txt': `${err}` }); await sendData({ e, 'stop': false, 'status2': err }); ok = true
            } else {
                infSendData = { e, 'stop': false, 'status2': `${inf.value} ${current} | OK`, }; await sendData(infSendData); logConsole({ e, ee, 'txt': `${infSendData.status2}`, });
                let infApiCnpj, retApiCnpj; if (!rate.check()) { await new Promise(r => { setTimeout(r, 10000); }); } infApiCnpj = { e, 'cnpj': retApiNire.res[0], }; retApiCnpj = await apiCnpj(infApiCnpj);
                if (!retApiCnpj.res || !retApiCnpj.res.cnpj) {
                    // err = `% FALSE: retApiCnpj`; logConsole({ e, ee, 'txt': `${err}` }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retApiCnpj }); 
                    // await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_2.jpg`, fullPage: true }); await sendData({ e, 'stop': true, 'status1': err });
                } else {
                    let time = dateHour().res; retApiCnpj = retApiCnpj.res; let results = [[
                        `${inf.value}`, // NIRE
                        `${time.day}/${time.mon} ${time.hou}:${time.min}:${time.sec}`, // DATA SCRIPT
                        retApiNire.res[1], // DATA REC FED
                        retApiCnpj.cnpj, retApiCnpj.telefone1, retApiCnpj.telefone2, retApiCnpj.gestor1 === 'null' ? retApiCnpj.razaoSocial : retApiCnpj.gestor1, retApiCnpj.email1, retApiCnpj.razaoSocial,
                    ],]; results = results[0].join(conSpl); await sendData({ e, 'stop': false, results, }); ok = true;
                }
            } if (ok) { sheetNire.push(inf.value); await file({ e, 'action': 'write', 'path': './logs/NIREs.txt', 'text': JSON.stringify(sheetNire, null, 2), }); }
            await new Promise(r => { setTimeout(r, 1000); }); // DELAY PARA EVITAR ACABAR A ARRAY
        } async function loopFun() {
            let indice = 0; while (!gO.inf.stop) {
                if (indice < valuesLoop.length) {
                    await loopFunRun({ 'value': valuesLoop[indice], 'index': indice, 'length': valuesLoop.length, }); indice++; if (indice === valuesLoop.length && lastPage) {
                        logConsole({ e, ee, 'txt': `INDICES ACABARAM`, }); await sendData({ e, 'stop': false, 'status2': '$ Terminou de consultar tudo', });
                        // FORÇAR PARADA DO SCRIPT
                        await processForceStop();
                    }
                } else { await new Promise((resolve) => setTimeout(resolve, 1000)); }
            } logConsole({ e, ee, 'txt': `PAROU O LOOP`, });
        } loopFun();

        // NAVIGATE [ABRINDO JUCESP]
        await navigate({ e, browser, page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=', }); await new Promise(r => { setTimeout(r, 1000); });

        // CHECK PAGE [PAGINA DE PESQUISA]
        value = await page.content(); retCheckPage = await checkPage({ e, 'body': value, page, 'search': `Pesquisa Avançada`, 'step': 'CHECK PAGE [PAGINA DE PESQUISA]', }); if (!retCheckPage.ret) {
            err = `% Não achou a página de pesquisa`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage, });
            try { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_3.jpg`, fullPage: true, }); }
            catch (catchErr) { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_3.jpg`, fullPage: false, }); }
            await sendData({ e, 'stop': true, 'status1': err, }); return retCheckPage;
        }

        // COOKIE [SET]
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) { date = `${time.day}/${time.mon}/2023`; } await cookiesGetSet({ e, page, 'action': 'set', 'value': aut, });

        // STATUS [INSERINDO DATA DE PESQUISA]
        infSendData = { e, 'stop': false, 'status1': 'Inserindo data de pesquisa', }; await sendData(infSendData); logConsole({ e, ee, 'txt': `${infSendData.status1}`, });
        try { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}.jpg`, fullPage: true, }); }
        catch (catchErr) { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}.jpg`, fullPage: false, }); }

        // IMPUT [DATA INÍCIO]
        await imput({ e, browser, page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': `${date.replace(/[^0-9]/g, '')}`, });
        await new Promise(r => { setTimeout(r, 1000); });

        // IMPUT [DATA FIM]
        await imput({ e, browser, page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaFim', 'value': `${date.replace(/[^0-9]/g, '')}`, });
        await new Promise(r => { setTimeout(r, 1000); });

        // BUTTON [PESQUISAR]
        await buttonElement({ browser, page, 'button': 'search', });

        // AGUARDAR PÁGINA TERMINAR DE CARREGAR
        await awaitLoad({ e, browser, page, 'element': '#ctl00_cphContent_frmBuscaSimples_hTitulo', });

        // ########### NOVO MODELO DE CAPTCHA
        if (retGetPath.includes('_TEMP.js')) {
            // ********************************************************************************************************************************************************************************************
            await new Promise(r => { setTimeout(r, 2000); }); let retCaptcha; async function captcha(inf = {}) { // NÃO REMOVER O TEMPO DE ESPERA!!!
                let ret = { 'ret': false, };
                try {
                    let { page, action, text, } = inf; let formBuscaAvancada = await page.$('#formBuscaAvancada'); if (!formBuscaAvancada) { ret['msg'] = 'ERRO: CAPTCHA NÃO ENCONTRADO'; } else if (action === 'get') {
                        // CAPTCHA: RETORNAR URL
                        let captchaUrl = await formBuscaAvancada.$('img[src^="CaptchaImage.aspx"]'); captchaUrl = await captchaUrl.evaluate(img => img.src);
                        ret['res'] = captchaUrl; ret['msg'] = 'CAPTHCA OK: URL RETORNADO'; ret['ret'] = true;
                        // MANDAR PARA A PLANILHA
                        await googleSheets({ e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `A85`, 'values': [[JSON.stringify(ret),],], });
                        // STATUS [PRESSIONAR O BOTAO E INSERIR O CAPTCHA]
                        infSendData = { e, 'stop': false, 'status1': 'Pressione o botão e insira o captcha', }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);
                    } else if (action === 'send') {
                        // CAPTCHA: INSERIR TEXTO
                        infSendData = { e, 'stop': false, 'status1': `Inserindo captcha '${text}'`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);
                        await page.focus('input[name="ctl00$cphContent$gdvResultadoBusca$CaptchaControl1"]'); page.keyboard.type(text); ret['msg'] = 'CAPTHCA OK: TEXTO INSERIDO'; ret['ret'] = true;
                    } else if (action === 'continue') {
                        // CAPTCHA: PROSSEGUIR
                        logConsole({ e, ee, 'txt': `Apertando botão CONTINUAR`, });
                        await page.click('input[name="ctl00$cphContent$gdvResultadoBusca$btEntrar"]'); ret['msg'] = 'CAPTHCA OK: CAPTCHA ENVIADO'; ret['ret'] = true;
                    }
                } catch (catchErr) { ret['msg'] = 'ERRO: AO CAPTURAR/INSERIR CAPTCHA'; }

                return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
            }

            // CHECAR SE O CAPTCHA APARECEU
            retCaptcha = await captcha({ page, 'action': 'get', }); if (retCaptcha.ret) {
                // CAPTCHA EXISTE (FOI ENVIADO PARA A PLANILHA) AGUARDAR O TEXTO
                let tentativasMaximas = 30, tentativas = 0, valorCelula = ''; while (tentativas < tentativasMaximas) {
                    tentativas++; valorCelula = await googleSheets({ e, 'action': 'get', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': 'A85', });
                    valorCelula = valorCelula.res[0][0]; logConsole({ e, ee, 'txt': `[${tentativas}/${tentativasMaximas}] Esperando texto do captcha ${valorCelula}`, });
                    await new Promise(r => { setTimeout(r, 1000); }); if (tentativas + 1 > tentativasMaximas) {
                        // LIMPAR O TEXTO DA COMUNICAÇÃO ANTIGO | FORÇAR PARADA DO SCRIPT [CAPTCHA NÃO FOI IDENTIFICADO A TEMPO]
                        await googleSheets({ e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `A85`, 'values': [[' ',],], });
                        await sendData({ e, 'stop': false, 'status1': '$ Cookie inválido!', }); await processForceStop();
                    } else if (valorCelula.includes('captchaText')) { valorCelula = JSON.parse(valorCelula).captchaText; break; } // CAPTCHA IDENTIFICADO
                } logConsole({ e, ee, 'txt': `[${tentativas}/${tentativasMaximas}] Capthca identificado '${valorCelula}'`, });
                // INSERIR O CAPTCHA E PROSSEGUIR
                await captcha({ page, 'action': 'send', 'text': valorCelula, }); await new Promise(r => { setTimeout(r, 1000); }); await captcha({ page, 'action': 'continue', });
                // RECARREGAR A PÁGINA | AGUARDAR TERMINAR DE CARREGAR
                await page.reload({ waitUntil: 'networkidle2', }); await awaitLoad({ e, browser, page, 'element': '#ctl00_cphContent_frmBuscaSimples_hTitulo', });
                // PEGAR O COOKIE E SALVAR NA PLANILHA
                retCookiesGetSet = await cookiesGetSet({ e, page, 'action': 'get', }); logConsole({ e, ee, 'txt': 'Salvando cookie na planilha e reiniciando', });
                await googleSheets({ e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `A36`, 'values': [[JSON.stringify(retCookiesGetSet.res),],], });
                await googleSheets({ e, 'action': 'send', 'id': gO.inf.sheetId, 'tab': gO.inf.sheetTab, 'range': `A85`, 'values': [['',],], }); // LIMPAR O TEXTO DA COMUNICAÇÃO ANTIGO
                browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode();// FORÇAR A PARADA PARA REINICIAR SOZINHO (PARA APAGAR O 'CaptchaImage' DO BODY)
            } // await new Promise(r=> { setTimeout(r, 1000000) })
        }
        // ********************************************************************************************************************************************************************************************

        // CHECK PAGE [COOKIE]
        value = await page.content(); retCheckPage = await checkPage({ e, 'body': value, page, 'step': 'CHECK PAGE [COOKIE]', }); if (!retCheckPage.ret) {
            err = `% [serverJucesp] ${retCheckPage.msg}`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage, });
            try { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_4.jpg`, fullPage: true, }); }
            catch (catchErr) { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_4.jpg`, fullPage: false, }); }
            await sendData({ e, 'stop': true, 'status1': err, });
            // FORÇAR PARADA DO SCRIPT
            await processForceStop();
        }

        // STATUS [BUSCANDO NOVOS NIRE's]
        infSendData = { e, 'stop': false, 'status1': `Buscando novos NIRE's`, }; await sendData(infSendData); logConsole({ e, ee, 'txt': `${infSendData.status1}`, });
        try { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}.jpg`, fullPage: true, }); }
        catch (catchErr) { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}.jpg`, fullPage: false, }); }

        // CHECK PAGE [LISTA DE NIRE's]
        value = await page.content(); retCheckPage = await checkPage({ e, 'body': value, page, 'step': 'CHECK PAGE [LISTA DE NIREs]', }); if (!retCheckPage.ret) {
            err = `% [serverJucesp] ${retCheckPage.msg}`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage, });
            try { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_5.jpg`, fullPage: true, }); }
            catch (catchErr) { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_5.jpg`, fullPage: false, }); }
            await sendData({ e, 'stop': true, 'status1': err, }); return retCheckPage;
        }

        // ARQUIVO DE NIRE's JÁ CONSULTADOS: ESCREVER QUEBRA DE LINHA → LER O ARQUIVO
        retFile = await file({ e, 'action': 'write', 'path': './logs/NIREs.txt', 'add': true, 'text': '\n', });
        retFile = await file({ e, 'action': 'read', 'path': './logs/NIREs.txt', }); try { sheetNire = JSON.parse(retFile.res); } catch (catchErr) { sheetNire = []; }

        // ###################################################################################
        // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [PRIMEIRA PÁGINA]
        retGetTextElement = await getTextElement({ e, value, 'element': 'results', }); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2],];
        pg = mode === '→' ? 1 : Math.ceil(Number(value[2]) / 15); results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),];

        if (mode === '←' && results[3] > 15) {
            // BUTTON [ULTIMA PÁGINA]
            await buttonElement({ browser, page, 'button': 'last', }); await new Promise(r => { setTimeout(r, 2000); });
            // AGUARDAR PÁGINA TERMINAR DE CARREGAR
            await awaitLoad({ e, browser, page, 'element': '#jo_encontrados', }); await new Promise(r => { setTimeout(r, 2000); });
            // AGUARDAR 'Lista de NIRE' APARECER
            await Promise.all([page.waitForSelector('#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lblRazaoSocial', { visible: true, }),]);
            // CHECK PAGE [LISTA DE NIRE's]
            value = await page.content(); retCheckPage = await checkPage({ e, 'body': value, page, 'step': 'CHECK PAGE [LISTA DE NIREs]', }); if (!retCheckPage.ret) {
                err = `% [serverJucesp] ${retCheckPage.msg}`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage, });
                try { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_6.jpg`, fullPage: true, }); }
                catch (catchErr) { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_6.jpg`, fullPage: false, }); }
                await sendData({ e, 'stop': true, 'status1': err, }); return retCheckPage;
            }
            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [PRIMEIRA PÁGINA]
            retGetTextElement = await getTextElement({ e, value, 'element': 'results', }); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2],];
            pg = mode === '→' ? 1 : Math.ceil(Number(value[2]) / 15); results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),];
        } logConsole({ e, ee, 'txt': `INÍCIO\n${results}`, });

        // *****************************************************************
        for (let i = 0; i < repet1; i++) {
            // CHECK PAGE [LISTA DE NIRE's]
            value = await page.content(); retCheckPage = await checkPage({ e, 'body': value, page, 'step': 'CHECK PAGE [LISTA DE NIREs]', }); if (!retCheckPage.ret) {
                err = `% [serverJucesp] ${retCheckPage.msg}`; logConsole({ e, ee, 'txt': `${err}`, }); await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retCheckPage, });
                try { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_7.jpg`, fullPage: true, }); }
                catch (catchErr) { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}_err_7.jpg`, fullPage: false, }); }
                await sendData({ e, 'stop': true, 'status1': err, }); return;
            }
            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [DEMAIS PÁGINAS]
            retGetTextElement = await getTextElement({ e, value, 'element': 'results', }); value = [retGetTextElement.res[0][0], retGetTextElement.res[0][1], retGetTextElement.res[0][2],];
            results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]; let repet2 = Number(value[1]) - Number(value[0]) + 1; logConsole({ e, ee, 'txt': `MEIO\n${repet2}\n${results}`, });
            try { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}.jpg`, fullPage: true, }); }
            catch (catchErr) { await page.screenshot({ path: `logs/screenshot_Jucesp_${gO.inf.shortcut}.jpg`, fullPage: false, }); }

            // ADICIONAR NO LOOP DA CONSULTA
            let newValues = retGetTextElement.res[1]; for (let i = 0; i < newValues.length; i++) { valuesJucesp.push(newValues[i]); if (!sheetNire.includes(newValues[i])) { valuesLoop.push(newValues[i]); } }
            // STATUS [BUSCANDO NOVOS NIRE's]
            await sendData({ e, 'stop': false, 'status1': `[${mode}] NIRE's: ${results[3]} Página ${pg} de ${Math.ceil(Number(value[2]) / 15)}`, }); await new Promise(r => { setTimeout(r, 4000); });
            if (mode === '→') { pg++; } else { pg--; } if ((mode === '→' && Number(value[1]) === Number(value[2])) || (mode === '←' && Number(value[0]) === 1)) {
                logConsole({ e, ee, 'txt': `ACABARAM AS PÁGINAS DO JUCESP`, }); lastPage = true; break;
            } else {
                // BUTTON [PRÓXIMA PÁGINA] / [PRÓXIMA ANTERIOR]
                if (mode === '→') { infButtonElement = { browser, page, 'button': 'next', }; } else if (mode === '←') { infButtonElement = { browser, page, 'button': 'prev', }; }
                await buttonElement(infButtonElement); await new Promise(r => { setTimeout(r, 2000); });
                // AGUARDAR PÁGINA TERMINAR DE CARREGAR
                await awaitLoad({ e, browser, page, 'element': '#jo_encontrados', }); await new Promise(r => { setTimeout(r, 2000); });
            }
        }
        // *****************************************************************

        logConsole({ e, ee, 'txt': `FIM - QTD [${valuesJucesp.length}]`, });
    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, 'catchGlobal': false, }); ret['msg'] = retRegexE.res;

        let errMsg = `% [serverJucesp] TRYCATCH Script erro!`; await sendData({ e, 'stop': true, 'status1': errMsg, });
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRun();


