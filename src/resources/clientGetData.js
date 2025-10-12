// let infClientGetData, retClientGetData;
// infClientGetData = { e, page, browser, leadCnpj, };
// retClientGetData = await clientGetData(infClientGetData); console.log(retClientGetData);

let e = import.meta.url, ee = e;
async function clientGetData(inf = {}) {
    let ret = { 'ret': false, }; e = inf.e || e;
    try {
        let infRegex, retRegex, infSendData, infLog, err, pageValue, pageResult, leadPageId, leadDate = [], nameMaster, params, res;

        let { page, browser, leadCnpj, /* origin */ } = inf;

        async function logConNew(txt = '') { await logConsole({ e, ee, txt, }); } async function screenshotAndStop(inf = {}) { // SCREENSHOT
            let err = `% ${inf.err}`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); pageValue = await page.content();
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); await screenshot({ e, page, 'fileName': `err_${inf.screenshot || 'x'}`, });
            browser.close(); await new Promise(r => { setTimeout(r, 2000); }); codeStop();
        }

        // PEGAR O ID DA PÁGINA DA CONTA
        pageValue = await page.content(); infRegex = { e, 'pattern': `data-recordid="(.*?)" rel=`, 'text': pageValue, }; retRegex = regex(infRegex); if (!retRegex.ret || !retRegex.res['1']) {
            err = `% Não achou o ID da página da conta`; logConsole({ e, ee, 'txt': `${err}`, }); infSendData = { e, 'stop': false, 'status1': `${err}`, }; await sendData(infSendData);
            infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }; await log(infLog); await screenshot({ e, page, 'fileName': `err_5`, });
            browser.close(); await new Promise(r => { setTimeout(r, 1000); }); codeStop();
        } leadPageId = retRegex.res['1'];

        // STATUS1 [Abrindo dados do cliente]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Abrindo dados do cliente`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

        // CLICAR NO LINK DO ID DA CONTA
        let linkSelector = `a[data-recordid="${leadPageId}"]`; await page.waitForSelector(linkSelector); let link = await page.$(linkSelector); // await new Promise(r => { setTimeout(r, 200); });
        await link.click();

        // ESPERAR O ELEMENTO APARECER
        params = {
            'paramId': `TELA (NOVA)`, 'element': {
                'maxAwaitMil': 15000, 'tag': 'lightning-formatted-date-time', 'properties': [{ 'attributeName': 'c-c6businesshighlightsinformation_c6businesshighlightsinformation', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        };
        res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
        await page.waitForFunction(() => {
            let element = document.evaluate('/html/body/div[3]/div[2]/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; return element && element.textContent.trim() !== 'Carregando';
        }, { 'timeout': 30000, });

        // [P] {RAZÃO SOCIAL
        params = {
            'newAction': true, 'paramId': `TESTE`, 'element': {
                'maxAwaitMil': 1000, 'tag': `article`, // 'content': `Enviar`,
                'directionA': -1, 'maxElements': 2, 'properties': [
                    { 'attributeName': `class`, 'attributeValue': `slds-card`, }, { 'attributeName': `part`, 'attributeValue': `card`, },
                ],
            }, 'actions': [{ 'action': `elementGet`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
        let razaoSocial = res?.[0]?.[0]?.res?.split('="" class="slds-truncate">')?.[1]?.split('<')?.[0] || 'VAZIO'; razaoSocial = razaoSocial.replace('&amp;', '&'); await logConNew(razaoSocial || 'x');

        // PEGAR O VALOR
        let leadDateAndMaster = await page.evaluate(() => {
            let element = document.evaluate('/html/body/div[3]/div[2]/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; return element ? element.textContent.trim() : null;
        });

        // EXTRAIR DATA
        let m = leadDateAndMaster.match(/Início Relacionamento(\d{2}\/\d{2}\/\d{4})/);
        leadDate = `${m[1]} 00:00`;

        // EXTRAIR MASTER
        infRegex = { e, 'pattern': `Informações do Master(.*?)Telefone`, 'text': leadDateAndMaster, };
        retRegex = regex(infRegex); if (!retRegex.ret || !retRegex.res['1']) { pageResult = 'ERRO'; } else { pageResult = retRegex.res['1']; } nameMaster = pageResult;

        // EXTAIR TELEFONE (APENAS SE NECESSÁRIO)
        let tel = 'xxxxxxxxxxx', telefone1 = tel, telefone2 = tel;
        // if (['newAccounts', 'maquinaInput',].includes(origin)) {
        params = { // [P] {TELEFONE} (GERAL)
            'paramId': `[P] {TELEFONE} (GERAL)`, 'element': {
                'maxAwaitMil': 250, 'tag': 'lightning-formatted-phone',
                'properties': [{ 'attributeName': 'c-c6businesshighlightsinformation_c6businesshighlightsinformation', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        telefone2 = res?.[0]?.res?.slice(2) || tel;

        params = { // [P] {TELEFONE} (NOME MASTER)
            'paramId': `[P] {TELEFONE} (NOME MASTER)`, 'element': {
                'maxAwaitMil': 250, 'tag': 'p',
                'properties': [{ 'attributeName': 'c-c6businesshighlightsinformation_c6businesshighlightsinformation', }, { 'attributeName': 'class', 'attributeValue': 'slds-truncate slds-text-link hover-cursor', },],
            }, 'actions': [{ 'action': 'elementHover', }, { 'action': 'awaitMil', 'time': 750, }, { 'action': 'getBody', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[2]?.msg || 'x');
        if ((res.length === 0 || !res[0].ret) && !leadDateAndMaster.includes('Início Relacionamento')) {
            await screenshotAndStop({ 'err': `Não achou a tela dos dados`, 'screenshot': '1', }); // NÃO ACHOU A TELA COM OS DADOS (FORÇAR PARADA)
        } telefone1 = res?.[2]?.res?.split('Informações do Master')?.[1]?.split('Telefone')?.[1]?.split('E-mail')?.[0]?.trim()?.slice(2) || telefone2;


        function extrairTelefone(texto) {
            let m = texto.match(/(?:Celular|Residencial)\s*(55\d{2}\d{8,9}55\d{2}\d{8,9})/); if (!m) { return null; } let full = m[1]; full = full.replace(/\D/g, '');
            let metade = full.length / 2; let telDuplicado = full.slice(0, metade);
            let telefone = telDuplicado.slice(2); // tira o DDI
            return telefone;
        }
        let telefone1Novo = extrairTelefone(res?.[2]?.res);
        console.log(`✅✅✅ '${telefone1}' '${telefone1Novo}'`);
        telefone1 = telefone1Novo;


        await screenshot({ e, page, 'fileName': `screenshot`, }); await screenshot({ e, page, 'fileName': `${leadCnpj}_clientGetData_1`, 'awaitPageFinish': false, });

        ret['ret'] = true;
        ret['msg'] = `CLIENT GET DATA: OK`;
        ret['res'] = {
            leadDate,
            nameMaster,
            telefone1,
            telefone2,
            razaoSocial,
        };

        // await new Promise(r => { setTimeout(r, 9999999); }); // TESTES

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['clientGetData'] = clientGetData;


