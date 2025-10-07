// let infMaquinaInput, retMaquinaInput;
// infMaquinaInput = { e, page, browser, leadCnpj, leadDadosIniciais, leadProdutos, leadTaxas, leadModelo, leadQuantidade, leadOperadora, leadCep, leadNumero, leadComplemento, leadReferencia, };
// retMaquinaInput = await maquinaInput(infMaquinaInput); console.log(retMaquinaInput);

let e = import.meta.url, ee = e;
async function maquinaInput(inf = {}) {
    let ret = { 'ret': false, }; e = inf.e || e;
    try {
        let { page, browser, leadCnpj, leadDadosIniciais, leadProdutos, leadTaxas, leadModelo, leadQuantidade, leadOperadora, leadCep, leadNumero, leadComplemento, leadReferencia, } = inf;

        let pageValue, infSendData, params, res; leadTaxas = leadTaxas.split(`|`); leadDadosIniciais = leadDadosIniciais.split(`|`).filter(v => /^\d+$/.test(v)); // arr; 
        leadProdutos = leadProdutos.split('|'); let hasLink = null; let fim = ''; let cep1 = ''; let cep2 = '';

        async function logConNew(txt = '') { await logConsole({ e, ee, txt, }); } async function screenshotAndStop(inf = {}) { // SCREENSHOT
            let err = `% ${inf.err}`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); pageValue = await page.content();
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); await screenshot({ e, page, 'fileName': `err_${inf.screenshot || 'x'}`, });
            browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode();
        }

        // STATUS1 [Indicando máquina...]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Indicando máquina...`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

        // ******************** {Dados}

        if (leadNumero.toString() === '99999') {
            params = { // [P] {CEP} (NOME MASTER)
                'paramId': `[P] {CEP} (NOME MASTER)`, 'element': {
                    'maxAwaitMil': 15000, 'tag': 'p',
                    'properties': [{ 'attributeName': 'c-c6businesshighlightsinformation_c6businesshighlightsinformation', }, { 'attributeName': 'class', 'attributeValue': 'slds-truncate slds-text-link hover-cursor', },],
                }, 'actions': [{ 'action': 'elementHover', }, { 'action': 'awaitMil', 'time': 750, }, { 'action': 'getBody', },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[2]?.msg || 'x');
            cep1 = res?.[2]?.res || false; if (cep1) { cep1 = (cep1.split('Informações do Master')?.[1].split('<br>BRA')?.[0].split('- BRA')?.[0].split('Endereço')?.[1].trim().match(/\d{8}$/) || [])[0] || '0'; }

            // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

            params = { // [P] {CEP} (GERAL)
                'paramId': `[P] {CEP} (GERAL)`, 'element': {
                    'maxAwaitMil': 250, 'tag': 'p', 'content': ' - BRA',
                    'properties': [{ 'attributeName': 'c-c6businesshighlightsinformation_c6businesshighlightsinformation', },],
                }, 'actions': [{ 'action': 'elementGetValue', },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
            cep2 = res?.[0].res || false; if (cep2) { cep2 = (cep2.match(/\d{8}/) || [])[0] || '0'; }
            await logConNew(`CEPS: ${cep1} - ${cep2}`);
        }

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        params = { // [LI] 'C6 Pay'
            'paramId': `[LI] 'C6 Pay'`, 'element': {
                'maxAwaitMil': 15000, 'tag': 'span', 'content': 'C6 Pay',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'title', }, { 'attributeName': 'data-aura-rendered-by', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        await new Promise(r => { setTimeout(r, 2000); });

        await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_dados`, 'awaitPageFinish': false, });
        params = { // [BUTTON] 'Novo'
            'paramId': `[BUTTON] 'Novo'`, 'element': {
                'maxAwaitMil': 7000, 'tag': 'button', 'content': 'Novo',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-button slds-button_neutral', }, { 'attributeName': 'aria-disabled', 'attributeValue': 'false', },
                { 'attributeName': 'type', 'attributeValue': 'button', }, { 'attributeName': 'part', 'attributeValue': 'button', },],
            }, 'actions': [{ 'action': 'awaitMil', 'time': 500, }, { 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[1]?.msg || 'x');

        await new Promise(r => { setTimeout(r, 2000); });

        // ******************** {Dados iniciais}

        params = { // [INPUT] 'Débito'
            'paramId': `[INPUT] 'Débito'`, 'element': {
                'maxAwaitMil': 2500, 'tag': 'input', 'indexTarget': 0,
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', },
                { 'attributeName': 'inputmode', 'attributeValue': 'decimal', }, { 'attributeName': 'type', 'attributeValue': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadDadosIniciais[0]}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        if (res.length === 0 || !res[0].ret) { await screenshotAndStop({ 'err': `Não achou a tela das taxas`, 'screenshot': '11', }); } // NÃO ACHOU A TELA COM AS TAXAS (FORÇAR PARADA)

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        params = { // [INPUT] 'Crédito à vista'
            'paramId': `[INPUT] 'Crédito à vista'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input', 'indexTarget': 1,
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', },
                { 'attributeName': 'inputmode', 'attributeValue': 'decimal', }, { 'attributeName': 'type', 'attributeValue': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadDadosIniciais[1]}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        params = { // [INPUT] 'Crédito PSJ 7 à 12'
            'paramId': `[INPUT] 'Crédito PSJ 2 à 6'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input', 'indexTarget': 2,
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', },
                { 'attributeName': 'inputmode', 'attributeValue': 'decimal', }, { 'attributeName': 'type', 'attributeValue': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadDadosIniciais[2]}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        params = { // [INPUT] 'Crédito PSJ 7 à 12'
            'paramId': `[INPUT] 'Crédito PSJ 7 à 12'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'input', 'indexTarget': 3,
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', },
                { 'attributeName': 'inputmode', 'attributeValue': 'decimal', }, { 'attributeName': 'type', 'attributeValue': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadDadosIniciais[3]}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_dadosIniciais`, 'awaitPageFinish': false, });
        params = { // [BUTTON] 'Continuar'
            'paramId': `[BUTTON] 'Continuar'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'button',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-button slds-button_brand', }, { 'attributeName': 'title', 'attributeValue': 'Continuar', },
                { 'attributeName': 'type', 'attributeValue': 'button', }, { 'attributeName': 'part', 'attributeValue': 'button', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        // →→→ CHECAR SE DEU ERRO
        params = { // [SPAN] 'Alert' {pegar}
            'paramId': `[SPAN] 'Alert' {pegar}`, 'element': {
                'maxAwaitMil': 1000, 'tag': 'span',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'toastMessage forceActionsText', }, { 'attributeName': 'data-aura-class', 'attributeValue': 'forceActionsText', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        if (res?.[0].ret && res?.[0].res) {
            ret['res'] = { 'inputRes': `${res[0].res?.includes(`Lista: J0,J1,J2`) ? `SEGMENTAÇÃO BLOQUEADA` : res = res[0].res}`, }; ret['ret'] = true; ret['msg'] = `MAQUINA INPUT: ERRO`;
            await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_2`, 'awaitPageFinish': false, }); return ret;
        }

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        // ******************** {Produtos}

        params = { // [BUTTON] 'C6 Pay Maquininha' (ORDEM INVERTIDA)
            'paramId': `[BUTTON] '${leadProdutos[1]}'`, 'element': {
                'maxAwaitMil': 2500, 'tag': 'p', 'content': `${leadProdutos[1]}`,
                'properties': [{ 'attributeName': 'c-commercialcardmachinesalesproducts_commercialcardmachinesalesproducts', },
                { 'attributeName': 'class', 'attributeValue': 'slds-line-clamp_medium slds-text-heading_small', }, { 'attributeName': 'title', 'attributeValue': `${leadProdutos[1]}`, },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        if (!res?.[0].ret) {
            ret['ret'] = true; ret['msg'] = `MAQUINA INPUT: ERRO`; ret['res'] = { 'inputRes': `SEM OPÇÃO DE MÁQUINA`, };
            await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_produtos`, 'awaitPageFinish': false, }); return ret;
        }

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        params = { // [BUTTON] 'C6 Pay Link' (ORDEM INVERTIDA)
            'paramId': `[BUTTON] '${leadProdutos[0]}'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'p', 'content': `${leadProdutos[0]}`,
                'properties': [{ 'attributeName': 'c-commercialcardmachinesalesproducts_commercialcardmachinesalesproducts', },
                { 'attributeName': 'class', 'attributeValue': 'slds-line-clamp_medium slds-text-heading_small', }, { 'attributeName': 'title', 'attributeValue': `${leadProdutos[0]}`, },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        // →→→ CHECAR SE TEM PROPOSTA EM ANDAMENTO
        params = {
            'paramId': `CHECAR SE TEM PROPOSTA EM ANDAMENTO`, 'element': {
                'maxAwaitMil': 2000, 'tag': 'span',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'toastMessage forceActionsText', }, { 'attributeName': 'data-aura-class', 'attributeValue': 'forceActionsText', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        if (res?.[0].ret && res?.[0].res) {
            ret['ret'] = true; ret['msg'] = `MAQUINA INPUT: ERRO`; ret['res'] = { 'inputRes': `${res?.[0].res}`, };
            await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_produtos`, 'awaitPageFinish': false, }); return ret;
        }

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        params = { // [BUTTON] 'C6 Pay Link' {CHECAR SE ESTÁ DISPONÍVEL}
            'paramId': `[BUTTON] '${leadProdutos[0]}' {CHECAR SE ESTÁ DISPONÍVEL}`, 'element': {
                'maxAwaitMil': 250, 'tag': 'span', 'content': `Produto indisponível no momento`,
                'properties': [{ 'attributeName': 'part', 'attributeValue': 'badge', }, { 'attributeName': 'exportparts', 'attributeValue': 'icon', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); hasLink = !(res?.[0]?.res?.includes(' '));

        await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_produtos`, 'awaitPageFinish': false, });
        params = { // [BUTTON] 'Continuar'
            'paramId': `[BUTTON] 'Continuar'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'button', 'content': 'Continuar',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-button slds-button_brand', },
                { 'attributeName': 'title', 'attributeValue': 'Continuar', }, { 'attributeName': 'part', 'attributeValue': 'button', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // ******************** {Configurando C6 Pay Link}

        // STATUS1 [Definindo Taxas e Máquina]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Definindo Taxas e Máquina`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

        if (hasLink) { // →→→ APENAS DE TIVER O LINK
            params = { // [BUTTON] 'Escolher taxa X [1]'
                'paramId': `[BUTTON] 'Escolher taxa X [1]'`, 'element': {
                    'maxAwaitMil': 2500, 'tag': 'button', 'content': `${leadTaxas[0]}`,
                    'properties': [{ 'attributeName': 'c-commercialcardmachinesalesfees_commercialcardmachinesalesfees', },],
                }, 'actions': [{ 'action': 'elementClick', },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
            await logConNew(res?.[0]?.msg || 'x');
        }

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        params = { // [BUTTON] 'Escolher C6 Pay Essencial' / 'Escolher C6 Pay Super Mini' / 'Escolher C6 Pay TEF Paygo'
            'paramId': `[BUTTON] '___MODELO___'`, 'element': {
                'maxAwaitMil': 2500, 'tag': 'button', 'content': `${leadModelo}`,
                'properties': [{ 'attributeName': 'class', }, { 'attributeName': 'c-commercialcardmachinesalessubproduct_commercialcardmachinesalessubproduct', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        params = { // [BUTTON] 'Escolher taxa X [2]'
            'paramId': `[BUTTON] 'Escolher taxa X [2]'`, 'element': {
                'maxAwaitMil': 2500, 'tag': 'button', 'content': `${leadTaxas[1]}`,
                'properties': [{ 'attributeName': 'c-commercialcardmachinesalesfees_commercialcardmachinesalesfees', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // ******************** {Endereços de entrega}

        // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

        if (!leadModelo.includes('TEF')) {
            if (leadNumero.toString() === '99999') {
                // ******************** (Escolher da lista)

                await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_endereçosDeEntrega`, 'awaitPageFinish': false, });
                params = { // [LABEL] '{Endereço}' (ENDEREÇO GERAL)
                    'paramId': `[LABEL] '{Endereço}' (ENDEREÇO GERAL)' [${cep2}]`, 'element': {
                        'maxAwaitMil': 2500, 'tag': 'label', 'content': `${cep2}`, 'indexTarget': 0,
                        'properties': [{ 'attributeName': 'c-commercialcardmachinesalesaddress_commercialcardmachinesalesaddress', },],
                    }, 'actions': [{ 'action': 'elementClick', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                if (!res?.[0].ret) {
                    params = { // [P] {CEP} (NOME MASTER)
                        'paramId': `[P] {CEP} (NOME MASTER)' [${cep1}]`, 'element': {
                            'maxAwaitMil': 2500, 'tag': 'label', 'content': `${cep1}`, 'indexTarget': 0,
                            'properties': [{ 'attributeName': 'c-commercialcardmachinesalesaddress_commercialcardmachinesalesaddress', },],
                        }, 'actions': [{ 'action': 'elementClick', },],
                    }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
                    await logConNew(res?.[0]?.msg || 'x');
                }

                // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

                if (!res?.[0].ret) {
                    params = { // [LABEL] '{Endereço}' (ESCOLHER O PRIMEIRO)
                        'paramId': `[LABEL] '{Endereço}' [_INDEX_0_INDEX_]`, 'element': {
                            'maxAwaitMil': 250, 'tag': 'label', 'content': `CEP`, 'indexTarget': 0,
                            'properties': [{ 'attributeName': 'c-commercialcardmachinesalesaddress_commercialcardmachinesalesaddress', },],
                        }, 'actions': [{ 'action': 'elementClick', },],
                    }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
                    await logConNew(res?.[0]?.msg || 'x');
                }
            } else {
                // STATUS1 [Definindo endereço de entrega]
                infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Definindo endereço de entrega`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

                // ******************** {Cadastrar novo endereço}

                params = { // [BUTTON] 'Cadastrar novo endereço'
                    'paramId': `[BUTTON] 'Cadastrar novo endereço'`, 'element': {
                        'maxAwaitMil': 2500, 'tag': 'button', 'content': 'Cadastrar novo endereço',
                        'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-button slds-button_neutral', }, { 'attributeName': 'title', 'attributeValue': 'Cadastrar novo endereço', },
                        { 'attributeName': 'type', 'attributeValue': 'button', }, { 'attributeName': 'part', 'attributeValue': 'button', },],
                    }, 'actions': [{ 'action': 'elementClick', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

                params = { // [BUTTON] 'Entendi'
                    'paramId': `[BUTTON] 'Entendi'`, 'element': {
                        'maxAwaitMil': 500, 'tag': 'button', 'content': 'Entendi',
                        'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-button slds-button_brand slds-float_right', },],
                    }, 'actions': [{ 'action': 'elementClick', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

                params = { // [INPUT] 'Cep'
                    'paramId': `[INPUT] 'Cep'`, 'element': {
                        'maxAwaitMil': 250, 'tag': 'input',
                        'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'name', 'attributeValue': 'ZipCode', },],
                    }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadCep}`, },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

                await new Promise(r => { setTimeout(r, 2000); }); params = { // [INPUT] 'Rua' {pegar}
                    'paramId': `[INPUT] 'Rua' {pegar}`, 'element': {
                        'maxAwaitMil': 250, 'tag': 'input',
                        'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'name', 'attributeValue': 'Street', },],
                    }, 'actions': [{ 'action': 'elementGetValue', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
                if (!(res?.[0].res !== '')) { ret['ret'] = true; ret['msg'] = `MAQUINA INPUT: ERRO`; ret['res'] = { 'inputRes': `ALERTA: CEP inválido → ${fim}`, }; return ret; }

                params = { // [INPUT] 'Número'
                    'paramId': `[INPUT] 'Número'`, 'element': {
                        'maxAwaitMil': 250, 'tag': 'input',
                        'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'name', 'attributeValue': 'number', },],
                    }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadNumero}`, },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                if (leadComplemento) {
                    params = { // [INPUT] 'Complemento'
                        'paramId': `[INPUT] 'Complemento'`, 'element': {
                            'maxAwaitMil': 250, 'tag': 'input',
                            'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', },
                            { 'attributeName': 'name', 'attributeValue': 'Complement', },],
                        }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadComplemento}`, },],
                    }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
                    await logConNew(res?.[0]?.msg || 'x');
                }

                if (leadReferencia) {
                    params = { // [INPUT] 'Ponto de referência'
                        'paramId': `[INPUT] 'Ponto de referência'`, 'element': {
                            'maxAwaitMil': 250, 'tag': 'input',
                            'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', },
                            { 'attributeName': 'name', 'attributeValue': 'Reference_point', },],
                        }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadReferencia}`, },],
                    }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
                    await logConNew(res?.[0]?.msg || 'x');
                }

                // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

                params = { // [BUTTON] 'Salvar'
                    'paramId': `[BUTTON] 'Salvar'`, 'element': {
                        'maxAwaitMil': 250, 'tag': 'button', 'content': 'Salvar',
                        'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-button slds-button_success', }, { 'attributeName': 'title', 'attributeValue': 'Salvar', },
                        { 'attributeName': 'part', 'attributeValue': 'button', },],
                    }, 'actions': [{ 'action': 'elementClick', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
            }
        }

        // ******************** {Resumo de pedido}

        // STATUS1 [Definindo operadora e forma de pagamento]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Definindo operadora e pagamento`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

        if (!leadModelo.includes('TEF')) {
            params = { // [INPUT] 'Quantidade'
                'paramId': `[INPUT] 'Quantidade'`, 'element': {
                    'maxAwaitMil': 2500, 'tag': 'input',
                    'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-input', }, { 'attributeName': 'part', 'attributeValue': 'input', }, { 'attributeName': 'inputmode', 'attributeValue': 'decimal', },
                    { 'attributeName': 'min', 'attributeValue': '1', }, { 'attributeName': 'type', 'attributeValue': 'text', },],
                }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadQuantidade}`, },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

            // await new Promise(r => { setTimeout(r, 1000); }); // REMOVER ISSO

            params = { // [SELECT] 'Operadora'
                'paramId': `[SELECT] 'Operadora`, 'element': {
                    'maxAwaitMil': 250, 'tag': 'button',
                    'properties': [{ 'attributeName': 'aria-haspopup', 'attributeValue': 'listbox', }, { 'attributeName': 'name', 'attributeValue': 'Operadora', },],
                }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadOperadora}`, },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        }

        params = { // [SELECT] 'Forma de pagamento'
            'paramId': `[SELECT] 'Forma de pagamento'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'button',
                'properties': [{ 'attributeName': 'aria-haspopup', 'attributeValue': 'listbox', }, { 'attributeName': 'name', 'attributeValue': 'Forma de pagamento', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': 'Débito em conta', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        await screenshot({ e, page, 'fileName': `${leadCnpj}_resumoDePedido`, 'awaitPageFinish': false, });

        // ### ÚLTIMA VALIDAÇÃO
        if (res.length === 0 || !res[0].ret) { await screenshotAndStop({ 'err': `Não achou do Resumo de pedido`, 'screenshot': '10', }); } // NÃO ACHOU A TELA DE RESUMO (FORÇAR PARADA)

        await new Promise(r => { setTimeout(r, 1000); });

        params = { // [BUTTON] 'Aceitar e Contratar'
            'paramId': `[BUTTON] 'Aceitar e Contratar'`, 'element': {
                'maxAwaitMil': 250, 'tag': 'button', 'content': 'Aceitar e Contratar',
                'properties': [{ 'attributeName': 'class', 'attributeValue': 'slds-button slds-button_success', }, { 'attributeName': 'title', 'attributeValue': 'Aceitar e Contrata', },
                { 'attributeName': 'part', 'attributeValue': 'button', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // ******************** (APÓS A FINALIZAÇÃO)

        params = { // [DIV] 'Sucesso'
            'paramId': `[DIV] 'Sucesso'`, 'element': {
                'maxAwaitMil': 15000, 'tag': 'div', 'content': `Sucesso`,
                'properties': [{ 'attributeName': 'id', }, { 'attributeName': 'class', 'attributeValue': 'toastTitle slds-text-heading--small', }, { 'attributeName': 'data-aura-rendered-by', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_sucesso`, 'awaitPageFinish': false, });

        await screenshot({ e, page, 'fileName': `screenshot`, });

        // await new Promise(r => { setTimeout(r, 9999999); }); // TESTES

        ret['ret'] = true;
        ret['msg'] = `MAQUINA INPUT: OK`;
        ret['res'] = { 'inputRes': `${res?.[0].ret ? `INDICAÇÃO MÁQUINA OK` : `INDICAÇÃO MÁQUINA: ERRO`}`, };

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['maquinaInput'] = maquinaInput;

