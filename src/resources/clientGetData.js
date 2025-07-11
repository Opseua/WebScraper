/* eslint-disable max-len */

// let infClientGetData, retClientGetData;
// infClientGetData = { e, page, browser, leadCnpj, };
// retClientGetData = await clientGetData(infClientGetData); console.log(retClientGetData);

let e = import.meta.url, ee = e;
async function clientGetData(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let infRegex, retRegex, infSendData, infLog, err, pageValue, pageResult, leadPageId, leadDate = [], dataC6, nameMaster, res, params1, params2;

        let { page, browser, leadCnpj, leadStatus, } = inf;

        async function screenshotAndStop(inf = {}) { // SCREENSHOT
            let err = `% ${inf.err}`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); pageValue = await page.content();
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); await screenshot({ e, page, 'fileName': `err_${inf.screenshot || 'x'}`, });
            browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode();
        }

        // PEGAR O ID DO LINK DA PÁGINA DO LEAD
        pageValue = await page.content(); infRegex = { e, 'pattern': `data-recordid="(.*?)" rel=`, 'text': pageValue, }; retRegex = regex(infRegex); if (!retRegex.ret || !retRegex.res['1']) {
            err = `% Não achou o ID do link da página do lead`; logConsole({ e, ee, 'txt': `${err}`, }); infSendData = { e, 'stop': false, 'status1': `${err}`, }; await sendData(infSendData);
            infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }; await log(infLog); await screenshot({ e, page, 'fileName': `err_5`, });
            browser.close(); await new Promise(r => { setTimeout(r, 1000); }); crashCode();
        } leadPageId = retRegex.res['1'];

        // STATUS1 [Abrindo dados do cliente]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Abrindo dados do cliente`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

        // CLICAR NO LINK DO ID DO LEAD
        let linkSelector = `a[data-recordid="${leadPageId}"]`; await page.waitForSelector(linkSelector); let link = await page.$(linkSelector); // await new Promise(r => { setTimeout(r, 200); });
        await link.click();

        // E DEFINIR SE É TELA ANTIGA OU NOVA
        let timeout = 30000;

        params1 = {
            'nameSearch': `TELA (ANTIGA)`, 'element': {
                'maxAwaitMil': 15000, 'tag': 'span', 'conteudo': 'Criado por', 'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'test-id__field-label', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        };
        params2 = {
            'nameSearch': `TELA (NOVA)`, 'element': {
                'maxAwaitMil': 15000, 'tag': 'lightning-formatted-date-time', 'propriedades': [{ 'atributoNome': 'c-c6businesshighlightsinformation_c6businesshighlightsinformation', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        };
        res = await Promise.race([
            (page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params1)),
            (page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params2)),
        ]);
        if (res.length === 0 || !res[0].ret) { await screenshotAndStop({ 'err': `Não achou a data do cliente`, 'screenshot': '1', }); }

        if (leadStatus !== 'ENCONTRADO_CONTA') {
            // PEGAR O VALOR [TELA ANTIGA] (LEAD)
            pageValue = await page.content();
            leadDate = [pageValue.split('</lightning-formatted-text></records-modstamp>')[0].split('</span><lightning-formatted-text')[1].split('>')[1],];
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
            let m = leadDateAndMaster.match(/Início Relacionamento(\d{2}\/\d{2}\/\d{4})/); leadDate = [`${m[1]} 00:00`,];

            // EXTRAIR MASTER
            infRegex = { e, 'pattern': `Informações do Master(.*?)Telefone`, 'text': leadDateAndMaster, };
            retRegex = regex(infRegex); if (!retRegex.ret || !retRegex.res['1']) { pageResult = 'ERRO'; } else { pageResult = retRegex.res['1']; } nameMaster = pageResult;
        }

        // CHECAR SE É CONTA ANTIGA OU NOVA
        let data = leadDate[0].split('/'); let dataDay = parseInt(data[0], 10).toString().padStart(2, '0'); let dataMon = (parseInt(data[1], 10) - 1).toString().padStart(2, '0');
        let dataYea = parseInt(data[2], 10).toString().padStart(4, '0');
        // DATA ENCONTRADA EM TIMESTAMP SEM MILESEGUNDOS
        dataC6 = new Date(dataYea, dataMon, dataDay, 0, 0, 0); // ANO-MÊS-DIA 00:00:00
        let dif = Math.round((new Date().getTime() - dataC6.getTime()) / 1000 / 86400); // DIFERENÇA JÁ EM DIAS (ARREDONDADO)

        // DIFERENÇA MAIR QUE 5 DIAS 'true' DO CONTRÁRIO 'false' | + DE 5 DIAS → JÁ POSSUI CONTA | - DE 5 DIAS → ABERTO SF
        dataC6 = !!(dif > 5);

        await screenshot({ e, page, 'fileName': `screenshot`, }); await screenshot({ e, page, 'fileName': `${leadCnpj}_clientGetData_1`, 'awaitPageFinish': false, });

        ret['ret'] = true;
        ret['msg'] = `CLIENT GET DATA: OK`;
        ret['res'] = {
            'dataDayMonYea': leadDate[0].substring(0, 10),
            'dataDayMonYeaFull': leadDate[0],
            'dataRes': dataC6 ? 'JÁ POSSUI CONTA' : 'ABERTO SF',
            'dataBoolean': dataC6,
            nameMaster,
            dif,
        };

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['clientGetData'] = clientGetData;


