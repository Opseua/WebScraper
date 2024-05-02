// let infClientSearch, retClientSearch // 'logFun': true,
// infClientSearch = {'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retClientSearch = await clientSearch(infClientSearch)
// console.log(retClientSearch)

let e = import.meta.url, ee = e;
async function clientSearch(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        let errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } };
        if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
        else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    }
    try {
        let infRegex, retRegex, infSendData, retSendData, infLog, err, browser, pageValue, pageInput, pageResult, retLog, time, mon, day, hou, leadStatus

        let { page, leadCnpj } = inf

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
                    await page.screenshot({ path: `log/screenshot_C6.jpg` });
                    await new Promise(resolve => { setTimeout(resolve, 1000) })
                }
            }
        }

        // STATUS1 [Checando se é da base]
        infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Checando se é da base` }
        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` });
        retSendData = await sendData(infSendData)
        await page.screenshot({ path: `log/screenshot_C6.jpg` });
        // await new Promise(resolve => { setTimeout(resolve, 1000) })

        // REGEX PARA PEGAR O ID DA LUPA DE PESQUISA
        pageValue = await page.content()
        infRegex = { 'e': e, 'pattern': `placeholder="Pesquisar" id="(.*?)" class=`, 'text': pageValue }
        retRegex = regex(infRegex);
        if (!retRegex.ret || !retRegex.res['1']) {
            err = `$ Não achou o ID da lupa de pesquisa`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
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
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
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
                fileStatus = 2
                return 'ENCONTRADO_EXPIRADO';
            } else if (conteudo.includes('NOME COMPLETO')) {
                fileStatus = 3
                return 'ENCONTRADO_LEAD';
            } else if (conteudo.includes('Nenhum resultado para')) {
                fileStatus = 4
                return 'NADA_ENCONTRADO';
            }
            return false;
        }, { timeout: 30000 }).catch(async () => {
            return false;
        });

        if (!pageResult) {
            err = `$ Não achou o resultado da consulta`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
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
        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${leadStatus}` });
        await page.screenshot({ path: `log/screenshot_C6.jpg` });

        let fileStatus = leadStatus == 'ENCONTRADO_CONTA' ? 1 : leadStatus == 'ENCONTRADO_EXPIRADO' ? 2 : leadStatus == 'ENCONTRADO_LEAD' ? 3 : leadStatus == 'NADA_ENCONTRADO' ? 4 : 'X'
        // PRINT PARA LOG
        time = dateHour().res; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`; hou = `${time.hou}.${time.min}.${time.sec}.${time.mil}`
        await page.screenshot({ path: `log/Registros/${mon}/${day}/${hou}_C6_${leadCnpj}_LUPA_-_${fileStatus}.jpg` });

        ret['ret'] = true;
        ret['msg'] = `CLIENT SEARCH: OK`;
        ret['res'] = {
            'leadStatus': leadStatus
        };

    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let errMsg = `$ [clientSearch] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}

if (eng) { // CHROME
    window['clientSearch'] = clientSearch;
} else { // NODEJS
    global['clientSearch'] = clientSearch;
}
