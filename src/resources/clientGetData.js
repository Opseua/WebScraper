/* eslint-disable max-len */

// let infClientGetData, retClientGetData
// infClientGetData = {e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retClientGetData = await clientGetData(infClientGetData); console.log(retClientGetData)

let e = import.meta.url, ee = e;
async function clientGetData(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let infRegex, retRegex, infSendData, infLog, err, pageValue, pageResult, leadPageId, leadDate = [], dataC6, nameMaster;

        let { page, browser, leadCnpj, } = inf;

        // PEGAR O ID DO LINK DA PÁGINA DO LEAD
        pageValue = await page.content(); infRegex = { e, 'pattern': `data-recordid="(.*?)" rel=`, 'text': pageValue, }; retRegex = regex(infRegex);
        if (!retRegex.ret || !retRegex.res['1']) {
            err = `% Não achou o ID do link da página do lead`;
            logConsole({ e, ee, 'msg': `${err}`, }); infSendData = { e, 'stop': false, 'status1': `${err}`, }; await sendData(infSendData);
            infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }; await log(infLog); await page.screenshot({ path: `logs/screenshot_C6_${gO.inf.shortcut}_err_5.jpg`, fullPage: true, });
            browser.close(); await new Promise(resolve => { setTimeout(resolve, 1000); }); crashCode();
        } leadPageId = retRegex.res['1'];

        // STATUS1 [Abrindo dados do cliente]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Abrindo dados do cliente`, }; logConsole({ e, ee, 'msg': `${infSendData.status1}`, });
        await sendData(infSendData);
        try { await page.screenshot({ path: `logs/screenshot_C6_${gO.inf.shortcut}.jpg`, fullPage: true, }); }
        catch (catchErr) { await page.screenshot({ path: `logs/screenshot_C6_${gO.inf.shortcut}.jpg`, fullPage: false, }); }

        // CLICAR NO LINK DO ID DO LEAD
        let linkSelector = `a[data-recordid="${leadPageId}"]`; await page.waitForSelector(linkSelector); let link = await page.$(linkSelector);
        await new Promise(resolve => { setTimeout(resolve, 400); });
        await link.click();
        await new Promise(resolve => { setTimeout(resolve, 400); });

        // E DEFINIR SE É TELA ANTIGA OU NOVA
        let timeout = 30000; let selectors = [
            '.uiOutputDateTime.forceOutputModStampWithPreview', '.slds-form.slds-form_stacked.slds-grid.slds-page-header__detail-row',
        ]; try { let result = await Promise.race([page.waitForSelector(selectors[0], { timeout, }).then(() => 'ANTIGO'), page.waitForSelector(selectors[1], { timeout, }).then(() => 'NOVO'),]); pageResult = result; }
        catch (catchErr) { pageResult = false; }

        // DATA FOI ENCONTRADA
        if (pageResult) {
            if (pageResult === 'ANTIGO') {
                // PEGAR O VALOR [TELA ANTIGA]
                pageResult = await page.evaluate(() => {
                    let elements = document.querySelectorAll('.uiOutputDateTime.forceOutputModStampWithPreview'); return Array.from(elements).map(element => element.textContent.trim());
                }); leadDate = [pageResult[0],];
            } else {
                // ESPERAR O ELEMENTO APARECER [TELA NOVA]
                await page.waitForFunction(() => {
                    let element = document.evaluate('/html/body/div[3]/div[2]/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; return element && element.textContent.trim() !== 'Carregando';
                }, { timeout, });
                // PEGAR O VALOR
                let leadDateAndMaster = await page.evaluate(() => {
                    let element = document.evaluate('/html/body/div[3]/div[2]/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; return element ? element.textContent.trim() : null;
                });

                // EXTRAIR DATA
                infRegex = { e, 'pattern': `Início Relacionamento(.*?)Segmentação`, 'text': leadDateAndMaster, };
                retRegex = regex(infRegex); if (!retRegex.ret || !retRegex.res['1']) { pageResult = '01/01/2001'; } else { pageResult = retRegex.res['1']; } leadDate = [`${pageResult} 00:00`,];

                // EXTRAIR MASTER
                infRegex = { e, 'pattern': `Informações do Master(.*?)Telefone`, 'text': leadDateAndMaster, };
                retRegex = regex(infRegex); if (!retRegex.ret || !retRegex.res['1']) { pageResult = 'ERRO'; } else { pageResult = retRegex.res['1']; } nameMaster = pageResult;
            }
        } // console.log(!!pageResult, leadDate)

        if (!pageResult) {
            err = `% Não achou a data de abertura`;
            logConsole({ e, ee, 'msg': `${err}`, }); infSendData = { e, 'stop': false, 'status1': `${err}`, };
            await sendData(infSendData); pageValue = await page.content(); infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }; await log(infLog);
            try { await page.screenshot({ path: `logs/screenshot_C6_${gO.inf.shortcut}_err_6.jpg`, fullPage: true, }); }
            catch (catchErr) { await page.screenshot({ path: `logs/screenshot_C6_${gO.inf.shortcut}_err_6.jpg`, fullPage: false, }); }
            browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000); }); crashCode();
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
        dataC6 = !!((Number(dateHour().res.tim) - dataC6) > ((5 * 86400) + 86400));

        ret['ret'] = true;
        ret['msg'] = `CLIENT GET DATA: OK`;
        ret['res'] = {
            'dataDayMonYea': leadDate[0].substring(0, 10),
            'dataDayMonYeaFull': leadDate[0],
            'dataRes': dataC6 ? 'JÁ POSSUI CONTA' : 'ABERTO SF',
            'dataBoolean': dataC6,
            nameMaster,
        };

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}

// CHROME | NODEJS
globalThis['clientGetData'] = clientGetData;


