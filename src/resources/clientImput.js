// let infClientImput, retClientImput;
// infClientImput = { e, page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, 'leadTelefone': coldList ? leadTelefone.replace('55219', '219') : leadTelefone, };
// retClientImput = await clientImput(infClientImput); console.log(retClientImput);

let e = import.meta.url, ee = e;
async function clientImput(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let pageValue, leadStatus, res, params, params1, params2;

        let { page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, } = inf;

        // CHECAR SE É A PÁGINA DE INDICAÇÃO, SE NÃO FOR ABRIR ELA
        let currentURL, url = 'https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente'; currentURL = page.url();
        if (!currentURL.includes(url)) { await page.goto('https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente', { waitUntil: 'networkidle2', }); }

        async function screenshotAndStop(inf = {}) { // SCREENSHOT
            let err = `% ${inf.err}`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); pageValue = await page.content();
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); await screenshot({ e, page, 'fileName': `err_${inf.screenshot || 'x'}`, });
            browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode();
        }

        params = { // [INPUT] 'Primeiro Nome'
            'nameSearch': `[INPUT] 'Primeiro Nome'`, 'element': {
                'maxAwaitMil': 20000, 'tag': 'input',
                'propriedades': [{ 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'firstName', },
                { 'atributoNome': 'type', 'atributoValor': 'text', },
                ],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadPrimeiroNome}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
        if (res.length === 0 || !res[0].ret) { await screenshotAndStop({ 'err': `Não achou o formulário`, 'screenshot': '1', }); } // NÃO ACHOU A TELA DO FORMULÁRIO (FORÇAR PARADA)

        params = { // [INPUT] 'Sobrenome'
            'nameSearch': `[INPUT] 'Sobrenome'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'propriedades': [{ 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'lastName', }, { 'atributoNome': 'placeholder', 'atributoValor': 'Sobrenome', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadSobrenome}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        params = { // [INPUT] 'Email'
            'nameSearch': `[INPUT] 'Email'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'propriedades': [{ 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'Email', }, { 'atributoNome': 'inputmode', 'atributoValor': 'email', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadEmail}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        params = { // [INPUT] 'Telefone'
            'nameSearch': `[INPUT] 'Telefone'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'propriedades': [{ 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'Phone', }, { 'atributoNome': 'type', 'atributoValor': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadTelefone}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        params = { // [INPUT] 'CNPJ'
            'nameSearch': `[INPUT] 'CNPJ'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'propriedades': [{ 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'CNPJ__c', }, { 'atributoNome': 'type', 'atributoValor': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadCnpj}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        params = { // [BUTTON] 'Salvar'
            'nameSearch': `[BUTTON] 'Salvar'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'button', 'conteudo': 'Salvar',
                'propriedades': [{ 'atributoNome': 'name', 'atributoValor': 'SaveEdit', }, { 'atributoNome': 'type', 'atributoValor': 'button', },
                { 'atributoNome': 'part', 'atributoValor': 'button', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        params1 = { // [UL] {ALERTA DE ERRO}
            'nameSearch': `[UL] {ALERTA DE ERRO}`, 'element': {
                'maxAwaitMil': 7000, 'tag': 'ul',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'errorsList slds-list_dotted slds-m-left_medium', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        };
        params2 = { // {SUCESSO}
            'nameSearch': `{SUCESSO}`, 'element': { 'maxAwaitMil': 7000, }, 'actions': [{ 'action': 'bodyIncludes', 'text': 'Criação concluída', 'lowerCase': false, },],
        };
        res = await Promise.race([
            (page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params1)),
            (page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params2)),
        ]);

        if (res.length === 0 || !res[0].ret) {
            await screenshotAndStop({ 'err': `Sem status de finalização`, 'screenshot': '2', }); // NENHUM ALERTA DE ERRO OU POPUP DE SUCESSO (FORÇAR PARADA)
        } else if (res[0]?.res.includes('Criação concluída')) {
            leadStatus = `INDICAÇÃO OK`;
        } else if (res[0]?.res.includes(`Já existe um lead cadastrado com o CNPJ informado`)) {
            leadStatus = `Já existe um lead cadastrado com o CNPJ informado`;
        } else if (res[0]?.res.includes(`Já existe um cliente cadastrado com o CNPJ informado`)) {
            leadStatus = `Já existe um cliente cadastrado com o CNPJ informado`;
        } else if (res[0]?.res.includes(`Já existe um lead e um cliente cadastrado com o CNPJ informado`)) {
            leadStatus = `Já existe um lead e um cliente cadastrado com o CNPJ informado`;
        } else if (res[0]?.res.includes(`Lead expirou`)) {
            leadStatus = `Lead expirou`;
        } else if (res[0]?.res.includes(`Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo`)) {
            leadStatus = `Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo`;
        } else if (res[0]?.res.includes(`Lead pertence a outro escritorio`)) {
            leadStatus = `Lead pertence a outro escritorio`;
        } else if (res[0]?.res.includes(`CNPJ`)) {
            leadStatus = `ALERTA: CNPJ inválido`;
        } else if (res[0]?.res.includes(`elefone`)) {
            leadStatus = `ALERTA: telefone inválido`;
        } else if (res[0]?.res.includes(`mail`)) {
            leadStatus = `ALERTA: email inválido`;
        } else if (res[0]?.res.includes(`completo`)) {
            leadStatus = `ALERTA: nome inválido`;
        } else if (res[0]?.res.includes(`Os seguintes campos obrigatórios devem ser preenchidos`)) {
            leadStatus = `ALERTA: campo não preenchido`;
        } else {
            leadStatus = `STATUS NÃO IDENTIFICADO`;
        }

        await screenshot({ e, page, 'fileName': `screenshot`, }); await screenshot({ e, page, 'fileName': `${leadCnpj}_clientImput_1`, 'awaitPageFinish': false, });
        // await new Promise(r => { setTimeout(r, 999999); });

        ret['ret'] = true;
        ret['msg'] = `CLIENT IMPUT: OK`;
        ret['res'] = {
            'imputRes': leadStatus,
        };

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['clientImput'] = clientImput;


