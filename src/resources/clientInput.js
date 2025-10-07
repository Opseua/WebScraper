// let infClientInput, retClientInput;
// infClientInput = { e, page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, 'leadTelefone': coldList ? leadTelefone.replace('55219', '219') : leadTelefone, };
// retClientInput = await clientInput(infClientInput); console.log(retClientInput);

let e = import.meta.url, ee = e;
async function clientInput(inf = {}) {
    let ret = { 'ret': false, }; e = inf.e || e;
    try {
        let pageValue, res, params, params1, params2, inputRes;

        let { page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, leadRazaoSocial, } = inf;

        // CHECAR SE É A PÁGINA DE INDICAÇÃO, SE NÃO FOR ABRIR ELA
        let currentURL, url = 'https://c6bank.my.site.com/partners/s/lead/Lead/Default'; currentURL = page.url(); if (!currentURL.includes(url)) { await page.goto(url, { 'waitUntil': 'networkidle2', }); }

        async function screenshotAndStop(inf = {}) { // SCREENSHOT
            let err = `% ${inf.err}`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); pageValue = await page.content();
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); await screenshot({ e, page, 'fileName': `err_${inf.screenshot || 'x'}`, });
            browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode();
        }

        // ---------------------------------------

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        // params = { // [a] 'Leads' (SOMENTE SE NECESSÁRIO!!!)
        //     'paramId': `[a] 'Leads'`, 'element': {
        //         'maxAwaitMil': 250, 'tag': 'a', 'content': 'Leads',
        //         'properties': [{ 'attributeName': 'role', 'attributeValue': 'menuitem', }, { 'attributeName': 'class', 'attributeValue': 'comm-navigation__top-level-item-link js-top-level-menu-item linkBtn', },],
        //     }, 'actions': [{ 'action': 'elementClick', },],
        // }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        // CLICAR EM 'Novo Lead'
        params = { // [span] 'Novo Lead'
            'paramId': `[span] 'Novo Lead'`, 'element': {
                'maxAwaitMil': 2500, 'tag': 'span', 'content': 'Novo Lead',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'label bBody', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        // ESPERAR O FORMULÁRIO APARECER
        await new Promise(r => { setTimeout(r, 1500); }); params = { // [input] 'Razão Social'
            'paramId': `Resultado lupa (lead encontrado)`, 'element': {
                'maxAwaitMil': 5000, 'tag': 'input',
                'properties': [{ 'attributeName': 'name', 'attributeValue': 'RazaoSocial__c', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
        if (res.length === 0 || !res[0].ret) { await screenshotAndStop({ 'err': `Não achou o formulário`, 'screenshot': '1', }); } // NÃO ACHOU A TELA DO FORMULÁRIO (FORÇAR PARADA)

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        // ---------------------------------------

        params = { // [INPUT] 'Primeiro Nome'
            'paramId': `[INPUT] 'Primeiro Nome'`, 'element': {
                'maxAwaitMil': 20000, 'tag': 'input',
                'properties': [{ 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'name', 'attributeValue': 'firstName', },
                { 'attributeName': 'type', 'attributeValue': 'text', },
                ],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadPrimeiroNome}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        params = { // [INPUT] 'Sobrenome'
            'paramId': `[INPUT] 'Sobrenome'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'properties': [{ 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'name', 'attributeValue': 'lastName', }, { 'attributeName': 'placeholder', 'attributeValue': 'Sobrenome', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadSobrenome}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        params = { // [INPUT] 'Email'
            'paramId': `[INPUT] 'Email'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'properties': [{ 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'name', 'attributeValue': 'Email', }, { 'attributeName': 'inputmode', 'attributeValue': 'email', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadEmail}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        params = { // [INPUT] 'Razão Social'
            'paramId': `[INPUT] 'Razão Social'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'properties': [{ 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'name', 'attributeValue': 'RazaoSocial__c', }, { 'attributeName': 'class', 'attributeValue': 'slds-input', },
                    // { 'attributeName': 'maxlength', 'attributeValue': '255', }, { 'attributeName': 'type', 'attributeValue': 'text', }, // EM ÚLTIMO CASO
                ],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadRazaoSocial}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        params = { // [INPUT] 'Telefone'
            'paramId': `[INPUT] 'Telefone'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'properties': [{ 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'name', 'attributeValue': 'Phone', }, { 'attributeName': 'type', 'attributeValue': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadTelefone}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        params = { // [INPUT] 'CNPJ'
            'paramId': `[INPUT] 'CNPJ'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'properties': [{ 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'name', 'attributeValue': 'CNPJ__c', }, { 'attributeName': 'type', 'attributeValue': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadCnpj}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        // params = { // [BUTTON] 'Salvar'
        //     'paramId': `[BUTTON] 'Salvar'`, 'element': {
        //         'maxAwaitMil': 250, 'tag': 'button', 'content': 'Salvar',
        //         'properties': [{ 'attributeName': 'name', 'attributeValue': 'SaveEdit', }, { 'attributeName': 'type', 'attributeValue': 'button', },
        //         { 'attributeName': 'part', 'attributeValue': 'button', },],
        //     }, 'actions': [{ 'action': 'elementClick', },],
        // }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        params = { // [BUTTON] 'Confirmar'
            'paramId': `[BUTTON] 'Confirmar'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'button', 'content': 'Confirmar',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-button slds-button_neutral', }, { 'attributeName': 'type', 'attributeValue': 'button', },
                { 'attributeName': 'part', 'attributeValue': 'button', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        // <button lwc-40a585din3p="" class="slds-button slds-button_neutral" aria-disabled="false" type="button" part="button">Confirmar</button>

        // params1 = { // [UL] {ALERTA DE ERRO}
        //     'paramId': `[UL] {ALERTA DE ERRO}`, 'element': {
        //         'maxAwaitMil': 30000, 'tag': 'ul',
        //         'properties': [{ 'attributeName': 'class', 'attributeValue': 'errorsList slds-list_dotted slds-m-left_medium', },],
        //     }, 'actions': [{ 'action': 'elementGetValue', },],
        // };
        // params2 = { // {SUCESSO}
        //     'paramId': `{SUCESSO}`, 'element': { 'maxAwaitMil': 30000, }, 'actions': [{ 'action': 'bodyIncludes', 'text': 'Criação concluída', 'lowerCase': false, },],
        // };

        params1 = { // [tag] {ALERTA DE ERRO}
            'paramId': `[tag] {ALERTA DE ERRO}`, 'element': {
                'maxAwaitMil': 30000, 'tag': 'div',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-notify slds-notify_toast slds-theme_error', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        };
        params2 = { // [???] '{INDICADO}'
            'paramId': `{INDICADO}`, 'element': {
                'maxAwaitMil': 30000, 'tag': 'span',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'test-id__section-header-title', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        };
        res = await Promise.race([
            (page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params1)),
            (page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params2)),
        ]);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        if (res.length === 0 || !res[0].ret) {
            // CHECAGEM DE CAPTCHA
            pageValue = await page.content();
            if (pageValue.includes(`Score is too low or not applicable`) || pageValue.includes(`muito baixa ou`)) {
                inputRes = 'CAPTCHA';
            } else {
                // NENHUM ALERTA DE ERRO OU POPUP DE SUCESSO (FORÇAR PARADA)
                await screenshotAndStop({ 'err': `Sem status de finalização`, 'screenshot': '2', });
            }
        } else if (res[0]?.res?.includes('Criação concluída') || res[0]?.res?.includes('Informações')) {
            inputRes = `INDICAÇÃO OK`;
        } else {
            inputRes = res[0]?.res;
        }

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        await screenshot({ e, page, 'fileName': `screenshot`, }); await screenshot({ e, page, 'fileName': `${leadCnpj}_clientInput_1`, 'awaitPageFinish': false, });

        params = { // [tag] 'Botão X'
            'paramId': `[tag] 'Botão X'`, 'element': {
                'maxAwaitMil': 2000, 'tag': 'button',
                'properties': [
                    { 'attributeName': 'class', 'attributeValue': 'slds-button slds-button_icon slds-button_icon-bare', }, { 'attributeName': 'title', 'attributeValue': 'Cancelar e fecha', },
                    { 'attributeName': 'type', 'attributeValue': 'button', },
                ],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        await new Promise(r => { setTimeout(r, 2500); }); // REMOVER ISSO

        ret['ret'] = true;
        ret['msg'] = `CLIENT INPUT: OK`;
        ret['res'] = {
            inputRes,
        };

        // await new Promise(r => { setTimeout(r, 9999999); }); // TESTES

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['clientInput'] = clientInput;


