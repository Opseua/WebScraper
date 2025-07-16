// let infClientImput, retClientImput;
// infClientImput = { e, page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, 'leadTelefone': coldList ? leadTelefone.replace('55219', '219') : leadTelefone, };
// retClientImput = await clientImput(infClientImput); console.log(retClientImput);

let e = import.meta.url, ee = e;
async function clientImput(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let pageValue, res, params, params1, params2, imputRes;

        let { page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, leadRazaoSocial, } = inf;

        // CHECAR SE É A PÁGINA DE INDICAÇÃO, SE NÃO FOR ABRIR ELA
        let currentURL, url = 'https://c6bank.my.site.com/partners/s/lead/Lead/Default'; currentURL = page.url(); if (!currentURL.includes(url)) { await page.goto(url, { waitUntil: 'networkidle2', }); }

        async function screenshotAndStop(inf = {}) { // SCREENSHOT
            let err = `% ${inf.err}`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); pageValue = await page.content();
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); await screenshot({ e, page, 'fileName': `err_${inf.screenshot || 'x'}`, });
            browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode();
        }

        // ---------------------------------------

        // CLICAR EM 'Novo Lead'
        params = { // [span] 'Novo Lead'
            'nameSearch': `[span] 'Novo Lead'`, 'element': {
                'maxAwaitMil': 2500, 'tag': 'span', 'content': 'Novo Lead',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'label bBody', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        // ESPERAR O FORMULÁRIO APARECER
        await new Promise(r => { setTimeout(r, 1500); }); params = { // [input] 'Razão Social'
            'nameSearch': `Resultado lupa (lead encontrado)`, 'element': {
                'maxAwaitMil': 5000, 'tag': 'input',
                'propriedades': [{ 'atributoNome': 'name', 'atributoValor': 'RazaoSocial__c', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
        if (res.length === 0 || !res[0].ret) { await screenshotAndStop({ 'err': `Não achou o formulário`, 'screenshot': '1', }); } // NÃO ACHOU A TELA DO FORMULÁRIO (FORÇAR PARADA)

        // ---------------------------------------

        params = { // [INPUT] 'Primeiro Nome'
            'nameSearch': `[INPUT] 'Primeiro Nome'`, 'element': {
                'maxAwaitMil': 20000, 'tag': 'input',
                'propriedades': [{ 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'firstName', },
                { 'atributoNome': 'type', 'atributoValor': 'text', },
                ],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadPrimeiroNome}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

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

        params = { // [INPUT] 'Razão Social'
            'nameSearch': `[INPUT] 'Razão Social'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input',
                'propriedades': [{ 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'RazaoSocial__c', }, { 'atributoNome': 'class', 'atributoValor': 'slds-input', },
                    // { 'atributoNome': 'maxlength', 'atributoValor': '255', }, { 'atributoNome': 'type', 'atributoValor': 'text', }, // EM ÚLTIMO CASO
                ],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadRazaoSocial}`, },],
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

        // params = { // [BUTTON] 'Salvar'
        //     'nameSearch': `[BUTTON] 'Salvar'`, 'element': {
        //         'maxAwaitMil': 250, 'tag': 'button', 'content': 'Salvar',
        //         'propriedades': [{ 'atributoNome': 'name', 'atributoValor': 'SaveEdit', }, { 'atributoNome': 'type', 'atributoValor': 'button', },
        //         { 'atributoNome': 'part', 'atributoValor': 'button', },],
        //     }, 'actions': [{ 'action': 'elementClick', },],
        // }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        params = { // [BUTTON] 'Confirmar'
            'nameSearch': `[BUTTON] 'Salvar'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'button', 'content': 'Confirmar',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-button slds-button_neutral', }, { 'atributoNome': 'type', 'atributoValor': 'button', },
                { 'atributoNome': 'part', 'atributoValor': 'button', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        // <button lwc-40a585din3p="" class="slds-button slds-button_neutral" aria-disabled="false" type="button" part="button">Confirmar</button>

        // params1 = { // [UL] {ALERTA DE ERRO}
        //     'nameSearch': `[UL] {ALERTA DE ERRO}`, 'element': {
        //         'maxAwaitMil': 30000, 'tag': 'ul',
        //         'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'errorsList slds-list_dotted slds-m-left_medium', },],
        //     }, 'actions': [{ 'action': 'elementGetValue', },],
        // };
        // params2 = { // {SUCESSO}
        //     'nameSearch': `{SUCESSO}`, 'element': { 'maxAwaitMil': 30000, }, 'actions': [{ 'action': 'bodyIncludes', 'text': 'Criação concluída', 'lowerCase': false, },],
        // };

        params1 = { // [tag] {ALERTA DE ERRO}
            'nameSearch': `[tag] {ALERTA DE ERRO}`, 'element': {
                'maxAwaitMil': 30000, 'tag': 'div',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-notify slds-notify_toast slds-theme_error', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        };
        params2 = { // [???] '{INDICADO}'
            'nameSearch': `{INDICADO}`, 'element': {
                'maxAwaitMil': 30000, 'tag': 'span',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'test-id__section-header-title', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        };
        res = await Promise.race([
            (page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params1)),
            (page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params2)),
        ]);

        if (res.length === 0 || !res[0].ret) {
            // CHECAGEM DE CAPTCHA
            pageValue = await page.content();
            if (pageValue.includes(`Score is too low or not applicable`)) {
                imputRes = 'CAPTCHA';
            } else {
                // NENHUM ALERTA DE ERRO OU POPUP DE SUCESSO (FORÇAR PARADA)
                await screenshotAndStop({ 'err': `Sem status de finalização`, 'screenshot': '2', });
            }
        } else if (res[0]?.res?.includes('Criação concluída') || res[0]?.res?.includes('Informações')) {
            imputRes = `INDICAÇÃO OK`;
        } else {
            imputRes = res[0]?.res;
        }

        await screenshot({ e, page, 'fileName': `screenshot`, }); await screenshot({ e, page, 'fileName': `${leadCnpj}_clientImput_1`, 'awaitPageFinish': false, });

        params = { // [tag] 'Botão X'
            'nameSearch': `[tag] 'Botão X'`, 'element': {
                'maxAwaitMil': 2000, 'tag': 'button',
                'propriedades': [
                    { 'atributoNome': 'class', 'atributoValor': 'slds-button slds-button_icon slds-button_icon-bare', }, { 'atributoNome': 'title', 'atributoValor': 'Cancelar e fecha', },
                    { 'atributoNome': 'type', 'atributoValor': 'button', },
                ],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);

        ret['ret'] = true;
        ret['msg'] = `CLIENT IMPUT: OK`;
        ret['res'] = {
            imputRes,
        };

        // await new Promise(r => { setTimeout(r, 9999999); }); // TESTES

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['clientImput'] = clientImput;


