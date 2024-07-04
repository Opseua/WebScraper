// let infClientGetData, retClientGetData
// infClientGetData = {'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retClientGetData = await clientGetData(infClientGetData); console.log(retClientGetData)

let e = import.meta.url, ee = e;
async function clientGetData(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        let infRegex, retRegex, infSendData, infLog, err, pageValue, pageResult, time, mon, day, hou, leadPageId, leadDate = [], dataC6

        let { page, browser, leadCnpj } = inf

        // PEGAR O ID DO LINK DA PÁGINA DO LEAD
        pageValue = await page.content(); infRegex = { 'e': e, 'pattern': `data-recordid="(.*?)" rel=`, 'text': pageValue }; retRegex = regex(infRegex);
        if (!retRegex.ret || !retRegex.res['1']) {
            err = `@ Não achou o ID do link da página do lead`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }; await sendData(infSendData)
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }; await log(infLog); await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}__err_5.jpg` });
            browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000) }); process.exit();
        }; leadPageId = retRegex.res['1']
        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // STATUS1 [Abrindo dados do cliente]
        infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Abrindo dados do cliente` }; logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` });
        await sendData(infSendData); await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg` });

        // CLICAR NO LINK DO ID DO LEAD
        let linkSelector = `a[data-recordid="${leadPageId}"]`; await page.waitForSelector(linkSelector); let link = await page.$(linkSelector);
        await new Promise(resolve => { setTimeout(resolve, 1000) })
        await link.click();
        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // E DEFINIR SE É TELA ANTIGA OU NOVA
        let timeout = 10000; let selectors = [
            '.uiOutputDateTime.forceOutputModStampWithPreview', '.slds-form.slds-form_stacked.slds-grid.slds-page-header__detail-row'
        ]; try { let result = await Promise.race([page.waitForSelector(selectors[0], { timeout }).then(() => 'ANTIGO'), page.waitForSelector(selectors[1], { timeout }).then(() => 'NOVO')]); pageResult = result; }
        catch (catchErr) { pageResult = false; esLintIgnore = catchErr; }

        // DATA FOI ENCONTRADA
        if (pageResult) {
            if (pageResult === 'ANTIGO') {
                // PEGAR O VALOR [TELA ANTIGA]
                pageResult = await page.evaluate(() => {
                    let elements = document.querySelectorAll('.uiOutputDateTime.forceOutputModStampWithPreview'); return Array.from(elements).map(element => element.textContent.trim());
                }); leadDate = [pageResult[0]]
            } else {
                // ESPERAR O ELEMENTO APARECER [TELA NOVA]
                await page.waitForFunction(() => {
                    let element = document.evaluate('/html/body/div[3]/div[2]/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; return element && element.textContent.trim() !== 'Carregando';
                }, { timeout });
                // PEGAR O VALOR
                leadDate = await page.evaluate(() => {
                    let element = document.evaluate('/html/body/div[3]/div[2]/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; return element ? element.textContent.trim() : null;
                });
                // EXTRAIR DATA
                infRegex = { 'e': e, 'pattern': `Início Relacionamento(.*?)Segmentação`, 'text': leadDate }
                retRegex = regex(infRegex); if (!retRegex.ret || !retRegex.res['1']) { pageResult = false } else { pageResult = retRegex.res['1']; leadDate = [`${pageResult} 00:00`] }
            }
        }; // console.log(pageResult ? true : false, leadDate)

        if (!pageResult) {
            err = `@ Não achou a data de abertura`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` }); infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
            await sendData(infSendData); pageValue = await page.content(); infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }; await log(infLog);
            await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_6.jpg` }); browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000) }); process.exit();
        }

        // CHECAR SE É CONTA ANTIGA OU NOVA
        let data = leadDate[0].split('/');
        let dataDay = parseInt(data[0], 10).toString().padStart(2, '0');
        let dataMon = (parseInt(data[1], 10) - 1).toString().padStart(2, '0');
        let dataYea = parseInt(data[2], 10).toString().padStart(4, '0');
        // DATA ENCONTRADA EM TIMESTAMP SEM MILESEGUNDOS
        dataC6 = new Date(dataYea, dataMon, dataDay, 0, 0, 0); // ANO-MÊS-DIA 00:00:00
        dataC6 = Math.floor(dataC6.getTime() / 1000);
        // DIFERENÇA MAIR QUE 5 DIAS 'true' DO CONTRÁRIO 'false' | + DE 5 DIAS → JÁ POSSUI CONTA | - DE 5 DIAS → ABERTO SF
        dataC6 = (Number(dateHour().res.tim) - dataC6) > ((5 * 86400) + 86400) ? true : false

        // PRINT PARA LOG
        time = dateHour().res; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`; hou = `${time.hou}.${time.min}.${time.sec}.${time.mil}`
        await page.screenshot({ path: `log/Registros/${mon}/${day}/${hou}_C6_${leadCnpj}_DADOS_-_${dataC6 ? 1 : 0}.jpg` });

        ret['ret'] = true;
        ret['msg'] = `CLIENT GET DATA: OK`;
        ret['res'] = {
            'dataDayMonYea': leadDate[0].substring(0, 10),
            'dataDayMonYeaFull': leadDate[0],
            'dataRes': dataC6 ? 'JÁ POSSUI CONTA' : 'ABERTO SF',
            'dataBoolean': dataC6,
        };

    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let errMsg = `@ TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        await sendData(infSendData)
    }; return { ...({ ret: ret.ret }), ...(ret.msg && { msg: ret.msg }), ...(ret.res && { res: ret.res }), };
};

// CHROME | NODEJS
(eng ? window : global)['clientGetData'] = clientGetData