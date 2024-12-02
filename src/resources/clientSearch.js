// let infClientSearch, retClientSearch // 'logFun': true,
// infClientSearch = {e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retClientSearch = await clientSearch(infClientSearch)
// console.log(retClientSearch)

let e = import.meta.url, ee = e
async function clientSearch(inf) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let infRegex, retRegex, infSendData, infLog, err, pageValue, pageInput, pageResult, leadStatus

        let { page, browser, leadCnpj } = inf

        let qtd = 0, currentURL, url = 'https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente'
        currentURL = page.url()
        // CHECAR SE É A PÁGINA DE INDICAÇÃO, SE NÃO FOR ABRIR ELA
        if (!currentURL.includes(url)) {
            while (qtd < 3) {
                await page.goBack(); await new Promise(resolve => setTimeout(resolve, 2000)); currentURL = page.url(); if (currentURL.includes(url)) { break; }; qtd++;
                if (qtd > 2) {
                    // ABRIR PÁGINA DE BUSCA GLOBAL
                    await page.goto(url, { waitUntil: 'networkidle2' });
                    await new Promise(resolve => { setTimeout(resolve, 1000) })
                    try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': true }); }
                    catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': false }); esLintIgnore = catchErr; }
                    await new Promise(resolve => { setTimeout(resolve, 1000) })
                }
            }
        }

        // STATUS1 [Checando se é da base]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Checando se é da base` }
        logConsole({ e, ee, 'write': true, 'msg': `${infSendData.status1}` });
        await sendData(infSendData)
        try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': true }); }
        catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': false }); esLintIgnore = catchErr; }

        // REGEX PARA PEGAR O ID DA LUPA DE PESQUISA
        pageValue = await page.content()
        infRegex = { e, 'pattern': `placeholder="Pesquisar" id="(.*?)" class=`, 'text': pageValue }
        retRegex = regex(infRegex);
        if (!retRegex.ret || !retRegex.res['1']) {
            err = `% Não achou o ID da lupa de pesquisa`
            logConsole({ e, ee, 'write': true, 'msg': `${err}` });
            infSendData = { e, 'stop': false, 'status1': `${err}` }
            await sendData(infSendData)
            infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            await log(infLog);
            try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_2.jpg`, 'fullPage': true }); }
            catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_2.jpg`, 'fullPage': false }); esLintIgnore = catchErr; }
            browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000) }); process.exit();
        }
        retRegex = retRegex.res['1']
        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // BUSCAR LEAD NA LUPA
        pageInput = await page.$(`input[id="${retRegex}"]`);
        if (!pageInput) {
            err = `% Não achou o campo de imput da lupa`
            logConsole({ e, ee, 'write': true, 'msg': `${err}` });
            infSendData = { e, 'stop': false, 'status1': `${err}` }
            await sendData(infSendData)
            pageValue = await page.content()
            infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            await log(infLog);
            try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_3.jpg`, 'fullPage': true }); }
            catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_3.jpg`, 'fullPage': false }); esLintIgnore = catchErr; }
            browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000) }); process.exit();
        }
        await page.$eval(`input[id="${retRegex}"]`, input => (input.value = ''));
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.type(`input[id="${retRegex}"]`, leadCnpj);
        await new Promise(resolve => setTimeout(resolve, 750));
        await pageInput.press('Enter');
        // await new Promise(resolve => { setTimeout(resolve, 1000) })

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
            err = `% Não achou o resultado da consulta`
            logConsole({ e, ee, 'write': true, 'msg': `${err}` });
            infSendData = { e, 'stop': false, 'status1': `${err}` }
            await sendData(infSendData)
            pageValue = await page.content()
            infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            await log(infLog);
            try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_4.jpg`, 'fullPage': true }); }
            catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_4.jpg`, 'fullPage': false }); esLintIgnore = catchErr; }
            browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000) }); process.exit();
        }
        leadStatus = await pageResult.jsonValue();
        logConsole({ e, ee, 'write': true, 'msg': `${leadStatus}` });
        try { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': true }); }
        catch (catchErr) { await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg`, 'fullPage': false }); esLintIgnore = catchErr; }

        ret['ret'] = true;
        ret['msg'] = `CLIENT SEARCH: OK`;
        ret['res'] = {
            'leadStatus': leadStatus
        };
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];

        let errMsg = `% TRYCATCH Script erro!`
        let infSendData = { e, 'stop': true, 'status1': errMsg }
        await sendData(infSendData)
    };

    return { ...({ 'ret': ret.ret }), ...(ret.msg && { 'msg': ret.msg }), ...(ret.res && { 'res': ret.res }), };
};

// CHROME | NODEJS
(eng ? window : global)['clientSearch'] = clientSearch