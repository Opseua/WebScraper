// let infNewAccounts, retNewAccounts;
// infNewAccounts = { e, page, browser, leadCnpj, };
// retNewAccounts = await newAccounts(infNewAccounts);
// console.log(retNewAccounts);

let e = import.meta.url, ee = e; let rate = rateLimiter({ 'max': 1, 'sec': 600, });
async function newAccounts(inf = {}) {
    let ret = { 'ret': false, }; e = inf.e || e;
    try {
        let { page, browser, sheetKepp, } = inf;

        if (!rate.check().ret) { await new Promise(r => { setTimeout(r, 1000); }); return ret; }

        let { tabContas, colContas, } = sheetKepp; let params, res, pageValue, maxReturn = 200, retGoogleSheets, status1;
        let id1 = '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8', id2 = '1yRDGDNGhjQ-O4wwMeJmnE8HlbadXWuLLjt0tlsos-GQ';

        async function screenshotAndStop(inf = {}) { // SCREENSHOT
            let err = `% ${inf.err}`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); pageValue = await page.content();
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); await screenshot({ e, page, 'fileName': `err_${inf.screenshot || 'x'}`, });
            browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode();
        }

        // ABRIR TELA 'Encarteiramento'
        await page.goto('https://c6bank.my.site.com/partners/s/encarteiramento', { 'waitUntil': 'networkidle2', }); await screenshot({ e, page, 'fileName': `screenshot`, });

        // PEGAR CNPJs ANTIGOS DA PLANILHA E ABA DE BOAS VINDAS
        retGoogleSheets = await googleSheets({ e, 'action': 'get', 'id': `${id2}`, 'tab': `${tabContas}`, 'range': `${colContas}:${colContas}`, });
        let leadsObj = {}; for (let [index, value,] of retGoogleSheets.res.entries()) { value = Number(value); if (!leadsObj[`_${value}`]) { leadsObj[`_${value}`] = true; } } let leadsQtd = Object.keys(leadsObj).length;

        // [STATUS 1]
        status1 = `Checando ${leadsQtd} leads`; logConsole({ e, ee, 'txt': `${status1}`, }); await sendData({ e, 'stop': false, 'status1': `${status1}`, 'id': `${id1}`, });

        // ### TABELA DE CONTAS ABERTAS

        params = { // 'Coluna Conta'
            'paramId': `Coluna Conta`, 'element': {
                'maxAwaitMil': 2000, 'maxReturn': `${maxReturn}`, 'tag': 'lightning-primitive-cell-factory',
                'properties': [{ 'attributeName': 'data-label', 'attributeValue': 'Conta', }, { 'attributeName': 'class', 'attributeValue': 'slds-cell-wrap', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        if (res.length === 0 || !res[0].ret) { await screenshotAndStop({ 'err': `Não achou o tabela de contas`, 'screenshot': '1', }); } // NÃO ACHOU A TABELA DE CONTAS ABERTAS (FORÇAR PARADA)
        let contas = res.reverse();

        params = { // 'Coluna CNPJ'
            'paramId': `Coluna CNPJ`, 'element': {
                'maxAwaitMil': 750, 'maxReturn': `${maxReturn}`, 'tag': 'lightning-primitive-cell-factory',
                'properties': [{ 'attributeName': 'data-label', 'attributeValue': 'CNPJ', }, { 'attributeName': 'class', 'attributeValue': 'slds-cell-wrap', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
        let cnpjs = res.reverse();

        params = { // 'Coluna Data de criação'
            'paramId': `Coluna Data de criação`, 'element': {
                'maxAwaitMil': 750, 'maxReturn': `${maxReturn}`, 'tag': 'lightning-primitive-cell-factory',
                'properties': [{ 'attributeName': 'data-label', 'attributeValue': 'Data de criação', }, { 'attributeName': 'class', 'attributeValue': 'slds-cell-wrap', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
        let datasDeCriacao = res.reverse();

        // params = { // 'Consultor encarteirado'
        //     'paramId': `Consultor encarteirado`, 'element': {
        //         'maxAwaitMil': 750, 'maxReturn': `${maxReturn}`, 'tag': 'lightning-primitive-cell-factory',
        //         'properties': [{ 'attributeName': 'data-label', 'attributeValue': 'Consultor encarteirado', }, { 'attributeName': 'class', 'attributeValue': 'slds-cell-wrap', },],
        //     }, 'actions': [{ 'action': 'elementGetValue', },],
        // }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); 
        // let consultoresEncarteirados = res.reverse();

        // CHECAR SE O CNPJ DA CONTA JÁ ESTÁ NAS BOAS VINDAS
        for (let [index, value,] of cnpjs.entries()) {
            let lead = Number(value.res); if (!leadsObj[`_${lead}`] && !contas[index].res.replaceAll('.', '').includes(`${stringGet(value.res, '>', 8)}`)) {
                // APENAS CLIENTES QUE NÃO ESTÃO NA PLANILHA E NÃO CONTÉM OS 8 PRIMEIROS DÍGITOS DO CNPJ NA RAZÃO SOCIAL ('50.258.269 MASCLEIDE ALVES DE OLIVEIRA')

                // CLIENTE: BUSCAR NA LUPA
                let leadCnpj = `${lead}`, telefone1, telefone2; let retClientSearch = (await clientSearch({ page, browser, leadCnpj, })).res;
                if (retClientSearch.leadStatus !== 'ENCONTRADO_CONTA') {
                    telefone1 = 'NÃO ENCONTRADO'; telefone2 = 'NÃO ENCONTRADO';
                } else {
                    // CLIENTE: PEGAR DADOS DA CONTA
                    let retCliGetDat = (await clientGetData({ page, browser, leadCnpj, 'origin': 'newAccounts', })).res; telefone1 = retCliGetDat.telefone1; telefone2 = retCliGetDat.telefone2;
                }

                // ENVIAR OS DADOS NA NOVA CONTA PARA BOAS VINDAS
                let date = dateHour(`${datasDeCriacao[index].res}`).res; date = `${date.day}/${date.mon}/${date.yea}`; retGoogleSheets = await googleSheets({
                    e, 'action': 'addLines', 'id': `${id2}`, 'tab': `${tabContas}`, 'values': [
                        [
                            `${contas[index].res}`, // RAZAO SOCIAL
                            `${cnpjs[index].res}`, // CNPJ
                            `${date}`, // DATA ABERTURA
                            `${telefone2}`, // TELEFONE 1
                            `${telefone1}`, // TELEFONE MASTER
                        ],
                    ],
                });
                await logConsole({ e, ee, 'txt': `[${index}] ${lead} → DATE: ${date}`, });
            }
        }

        // [STATUS 1]
        status1 = `Nada pendente, esperando 10 minutos...`; logConsole({ e, ee, 'txt': `${status1}`, }); await sendData({ e, 'stop': false, 'status1': `${status1}`, 'id': `${id1}`, });

        await screenshot({ e, page, 'fileName': `screenshot`, }); await screenshot({ e, page, 'fileName': `newAccounts`, 'awaitPageFinish': false, });

        ret['ret'] = true;
        ret['msg'] = `NEW ACCOUNT: OK`;
        ret['res'] = {
            leadsQtd,
        };

        // await new Promise(r => { setTimeout(r, 9999999); }); // TESTES

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['newAccounts'] = newAccounts;


