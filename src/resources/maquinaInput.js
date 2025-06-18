// let infMaquinaInput, retMaquinaInput;
// infMaquinaInput = { e, page, browser, leadCnpj, leadDadosIniciais, leadProdutos, leadTaxas, leadModelo, leadQuantidade, leadOperadora, leadCep, leadNumero, leadComplemento, leadReferencia, };
// retMaquinaInput = await maquinaInput(infMaquinaInput); console.log(retMaquinaInput);

let e = import.meta.url, ee = e;
async function maquinaInput(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
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
                'nameSearch': `[P] {CEP} (NOME MASTER)`, 'element': {
                    'elementMaxAwaitMil': 15000, 'tag': 'p',
                    'propriedades': [{ 'atributoNome': 'c-c6businesshighlightsinformation_c6businesshighlightsinformation', }, { 'atributoNome': 'class', 'atributoValor': 'slds-truncate slds-text-link hover-cursor', },],
                }, 'actions': [{ 'action': 'elementHover', }, { 'action': 'awaitMil', 'time': 750, }, { 'action': 'getBody', },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[2]?.msg || 'x');
            cep1 = res?.[2].res || false; if (cep1) { cep1 = (cep1.split('Informações do Master')?.[1].split('<br>BRA')?.[0].split('- BRA')?.[0].split('Endereço')?.[1].trim().match(/\d{8}$/) || [])[0] || '0'; }

            params = { // [P] {CEP} (ENDEREÇO GERAL)
                'nameSearch': `[P] {CEP} (ENDEREÇO GERAL)`, 'element': {
                    'elementMaxAwaitMil': 250, 'tag': 'p', 'conteudo': ' - BRA',
                    'propriedades': [{ 'atributoNome': 'c-c6businesshighlightsinformation_c6businesshighlightsinformation', },],
                }, 'actions': [{ 'action': 'elementGetValue', },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
            cep2 = res?.[0].res || false; if (cep2) { cep2 = (cep2.match(/\d{8}/) || [])[0] || '0'; }
            await logConNew(`CEPS: ${cep1} - ${cep2}`);
        }

        params = { // [LI] 'C6 Pay'
            'nameSearch': `[LI] 'C6 Pay'`, 'element': {
                'elementMaxAwaitMil': 15000, 'tag': 'span', 'conteudo': 'C6 Pay',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'title', }, { 'atributoNome': 'data-aura-rendered-by', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_dados`, 'awaitPageFinish': false, });
        params = { // [BUTTON] 'Novo'
            'nameSearch': `[BUTTON] 'Novo'`, 'element': {
                'elementMaxAwaitMil': 7000, 'tag': 'button', 'conteudo': 'Novo',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-button slds-button_neutral', }, { 'atributoNome': 'aria-disabled', 'atributoValor': 'false', },
                { 'atributoNome': 'type', 'atributoValor': 'button', }, { 'atributoNome': 'part', 'atributoValor': 'button', },],
            }, 'actions': [{ 'action': 'awaitMil', 'time': 500, }, { 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[1]?.msg || 'x');
        // ******************** {Dados iniciais}

        params = { // [INPUT] 'Débito'
            'nameSearch': `[INPUT] 'Débito'`, 'element': {
                'elementMaxAwaitMil': 2500, 'tag': 'input', 'indexTarget': 0,
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', },
                { 'atributoNome': 'inputmode', 'atributoValor': 'decimal', }, { 'atributoNome': 'type', 'atributoValor': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadDadosIniciais[0]}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        params = { // [INPUT] 'Crédito à vista'
            'nameSearch': `[INPUT] 'Crédito à vista'`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'input', 'indexTarget': 1,
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', },
                { 'atributoNome': 'inputmode', 'atributoValor': 'decimal', }, { 'atributoNome': 'type', 'atributoValor': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadDadosIniciais[1]}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        params = { // [INPUT] 'Crédito PSJ 7 à 12'
            'nameSearch': `[INPUT] 'Crédito PSJ 2 à 6'`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'input', 'indexTarget': 2,
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', },
                { 'atributoNome': 'inputmode', 'atributoValor': 'decimal', }, { 'atributoNome': 'type', 'atributoValor': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadDadosIniciais[2]}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        params = { // [INPUT] 'Crédito PSJ 7 à 12'
            'nameSearch': `[INPUT] 'Crédito PSJ 7 à 12'`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'input', 'indexTarget': 3,
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', },
                { 'atributoNome': 'inputmode', 'atributoValor': 'decimal', }, { 'atributoNome': 'type', 'atributoValor': 'text', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadDadosIniciais[3]}`, },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_dadosIniciais`, 'awaitPageFinish': false, });
        params = { // [BUTTON] 'Continuar'
            'nameSearch': `[BUTTON] 'Continuar'`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'button',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-button slds-button_brand', }, { 'atributoNome': 'title', 'atributoValor': 'Continuar', },
                { 'atributoNome': 'type', 'atributoValor': 'button', }, { 'atributoNome': 'part', 'atributoValor': 'button', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // →→→ CHECAR SE DEU ERRO
        params = { // [SPAN] 'Alert' {pegar}
            'nameSearch': `[SPAN] 'Alert' {pegar}`, 'element': {
                'elementMaxAwaitMil': 1000, 'tag': 'span',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'toastMessage forceActionsText', }, { 'atributoNome': 'data-aura-class', 'atributoValor': 'forceActionsText', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        if (res?.[0].ret && res?.[0].res) {
            ret['ret'] = true; ret['msg'] = `MAQUINA INPUT: ERRO`; ret['res'] = { 'imputRes': `${res[0].res}`, }; await screenshot({ e, page, fileName: `${leadCnpj}_maquinaInput_2`, awaitPageFinish: false, }); return ret;
        }

        // ******************** {Produtos}

        params = { // [BUTTON] 'C6 Pay Maquininha' (ORDEM INVERTIDA)
            'nameSearch': `[BUTTON] '${leadProdutos[1]}'`, 'element': {
                'elementMaxAwaitMil': 2500, 'tag': 'p', 'conteudo': `${leadProdutos[1]}`,
                'propriedades': [{ 'atributoNome': 'c-commercialcardmachinesalesproducts_commercialcardmachinesalesproducts', },
                { 'atributoNome': 'class', 'atributoValor': 'slds-line-clamp_medium slds-text-heading_small', }, { 'atributoNome': 'title', 'atributoValor': `${leadProdutos[1]}`, },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        if (!res?.[0].ret) {
            ret['ret'] = true; ret['msg'] = `MAQUINA INPUT: ERRO`; ret['res'] = { 'imputRes': `SEM OPÇÃO DE MÁQUINA DISPONÍVEL`, };
            await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_produtos`, 'awaitPageFinish': false, }); return ret;
        }

        params = { // [BUTTON] 'C6 Pay Link' (ORDEM INVERTIDA)
            'nameSearch': `[BUTTON] '${leadProdutos[0]}'`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'p', 'conteudo': `${leadProdutos[0]}`,
                'propriedades': [{ 'atributoNome': 'c-commercialcardmachinesalesproducts_commercialcardmachinesalesproducts', },
                { 'atributoNome': 'class', 'atributoValor': 'slds-line-clamp_medium slds-text-heading_small', }, { 'atributoNome': 'title', 'atributoValor': `${leadProdutos[0]}`, },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // →→→ CHECAR SE TEM PROPOSTA EM ANDAMENTO
        params = {
            'nameSearch': `CHECAR SE TEM PROPOSTA EM ANDAMENTO`, 'element': {
                'elementMaxAwaitMil': 2000, 'tag': 'span',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'toastMessage forceActionsText', }, { 'atributoNome': 'data-aura-class', 'atributoValor': 'forceActionsText', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        if (res?.[0].ret && res?.[0].res) {
            ret['ret'] = true; ret['msg'] = `MAQUINA INPUT: ERRO`; ret['res'] = { 'imputRes': `${res?.[0].res}`, };
            await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_produtos`, 'awaitPageFinish': false, }); return ret;
        }

        params = { // [BUTTON] 'C6 Pay Link' (ORDEM INVERTIDA)
            'nameSearch': `[BUTTON] '${leadProdutos[0]}'`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'p', 'conteudo': `${leadProdutos[0]}`,
                'propriedades': [{ 'atributoNome': 'c-commercialcardmachinesalesproducts_commercialcardmachinesalesproducts', },
                { 'atributoNome': 'class', 'atributoValor': 'slds-line-clamp_medium slds-text-heading_small', }, { 'atributoNome': 'title', 'atributoValor': `${leadProdutos[0]}`, },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');


        params = { // [BUTTON] 'C6 Pay Link' {CHECAR SE ESTÁ DISPONÍVEL}
            'nameSearch': `[BUTTON] '${leadProdutos[0]}' {CHECAR SE ESTÁ DISPONÍVEL}`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'span', 'conteudo': `Produto indisponível no momento`,
                'propriedades': [{ 'atributoNome': 'part', 'atributoValor': 'badge', }, { 'atributoNome': 'exportparts', 'atributoValor': 'icon', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); hasLink = !(res?.[0]?.res?.includes(' '));

        await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_produtos`, 'awaitPageFinish': false, });
        params = { // [BUTTON] 'Continuar'
            'nameSearch': `[BUTTON] 'Continuar'`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'button', 'conteudo': 'Continuar',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-button slds-button_brand', },
                { 'atributoNome': 'title', 'atributoValor': 'Continuar', }, { 'atributoNome': 'part', 'atributoValor': 'button', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // ******************** {Configurando C6 Pay Link}

        // STATUS1 [Definindo Taxas e Máquina]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Definindo Taxas e Máquina`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

        if (hasLink) { // →→→ APENAS DE TIVER O LINK
            params = { // [BUTTON] 'Escolher taxa X [1]'
                'nameSearch': `[BUTTON] 'Escolher taxa X [1]'`, 'element': {
                    'elementMaxAwaitMil': 2500, 'tag': 'button', 'conteudo': `${leadTaxas[0]}`,
                    'propriedades': [{ 'atributoNome': 'c-commercialcardmachinesalesfees_commercialcardmachinesalesfees', },],
                }, 'actions': [{ 'action': 'elementClick', },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
            await logConNew(res?.[0]?.msg || 'x');
        }

        params = { // [BUTTON] 'Escolher C6 Pay Essencial' / 'Escolher C6 Pay Super Mini' / 'Escolher C6 Pay TEF Paygo'
            'nameSearch': `[BUTTON] '___MODELO___'`, 'element': {
                'elementMaxAwaitMil': 2500, 'tag': 'button', 'conteudo': `${leadModelo}`,
                'propriedades': [{ 'atributoNome': 'class', }, { 'atributoNome': 'c-commercialcardmachinesalessubproduct_commercialcardmachinesalessubproduct', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        params = { // [BUTTON] 'Escolher taxa X [2]'
            'nameSearch': `[BUTTON] 'Escolher taxa X [2]'`, 'element': {
                'elementMaxAwaitMil': 2500, 'tag': 'button', 'conteudo': `${leadTaxas[1]}`,
                'propriedades': [{ 'atributoNome': 'c-commercialcardmachinesalesfees_commercialcardmachinesalesfees', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // ******************** {Endereços de entrega}

        if (!leadModelo.includes('TEF')) {
            if (leadNumero.toString() === '99999') {
                // ******************** (Escolher da lista)

                await screenshot({ e, page, fileName: `${leadCnpj}_maquinaInput_endereçosDeEntrega`, awaitPageFinish: false, });
                params = { // [LABEL] '{Endereço}' (ENDEREÇO GERAL)
                    'nameSearch': `[LABEL] '{Endereço}' (ENDEREÇO GERAL)' [${cep2}]`, 'element': {
                        'elementMaxAwaitMil': 2500, 'tag': 'label', 'conteudo': `${cep2}`, 'indexTarget': 0,
                        'propriedades': [{ 'atributoNome': 'c-commercialcardmachinesalesaddress_commercialcardmachinesalesaddress', },],
                    }, 'actions': [{ 'action': 'elementClick', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                if (!res?.[0].ret) {
                    params = { // [P] {CEP} (NOME MASTER)
                        'nameSearch': `[P] {CEP} (NOME MASTER)' [${cep1}]`, 'element': {
                            'elementMaxAwaitMil': 2500, 'tag': 'label', 'conteudo': `${cep1}`, 'indexTarget': 0,
                            'propriedades': [{ 'atributoNome': 'c-commercialcardmachinesalesaddress_commercialcardmachinesalesaddress', },],
                        }, 'actions': [{ 'action': 'elementClick', },],
                    }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
                    await logConNew(res?.[0]?.msg || 'x');
                }

                if (!res?.[0].ret) {
                    params = { // [LABEL] '{Endereço}' (ESCOLHER O PRIMEIRO)
                        'nameSearch': `[LABEL] '{Endereço}' [_INDEX_0_INDEX_]`, 'element': {
                            'elementMaxAwaitMil': 250, 'tag': 'label', 'conteudo': `CEP`, 'indexTarget': 0,
                            'propriedades': [{ 'atributoNome': 'c-commercialcardmachinesalesaddress_commercialcardmachinesalesaddress', },],
                        }, 'actions': [{ 'action': 'elementClick', },],
                    }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
                    await logConNew(res?.[0]?.msg || 'x');
                }
            } else {
                // STATUS1 [Definindo endereço de entrega]
                infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Definindo endereço de entrega`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

                // ******************** {Cadastrar novo endereço}

                params = { // [BUTTON] 'Cadastrar novo endereço'
                    'nameSearch': `[BUTTON] 'Cadastrar novo endereço'`, 'element': {
                        'elementMaxAwaitMil': 2500, 'tag': 'button', 'conteudo': 'Cadastrar novo endereço',
                        'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-button slds-button_neutral', }, { 'atributoNome': 'title', 'atributoValor': 'Cadastrar novo endereço', },
                        { 'atributoNome': 'type', 'atributoValor': 'button', }, { 'atributoNome': 'part', 'atributoValor': 'button', },],
                    }, 'actions': [{ 'action': 'elementClick', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                params = { // [BUTTON] 'Entendi'
                    'nameSearch': `[BUTTON] 'Entendi'`, 'element': {
                        'elementMaxAwaitMil': 500, 'tag': 'button', 'conteudo': 'Entendi',
                        'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-button slds-button_brand slds-float_right', },],
                    }, 'actions': [{ 'action': 'elementClick', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                params = { // [INPUT] 'Cep'
                    'nameSearch': `[INPUT] 'Cep'`, 'element': {
                        'elementMaxAwaitMil': 250, 'tag': 'input',
                        'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'ZipCode', },],
                    }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadCep}`, },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                await new Promise(r => { setTimeout(r, 2000); }); params = { // [INPUT] 'Rua' {pegar}
                    'nameSearch': `[INPUT] 'Rua' {pegar}`, 'element': {
                        'elementMaxAwaitMil': 250, 'tag': 'input',
                        'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'Street', },],
                    }, 'actions': [{ 'action': 'elementGetValue', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
                if (!(res?.[0].res !== '')) { ret['ret'] = true; ret['msg'] = `MAQUINA INPUT: ERRO`; ret['res'] = { 'imputRes': `ALERTA: CEP inválido → ${fim}`, }; return ret; }

                params = { // [INPUT] 'Número'
                    'nameSearch': `[INPUT] 'Número'`, 'element': {
                        'elementMaxAwaitMil': 250, 'tag': 'input',
                        'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'number', },],
                    }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadNumero}`, },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

                if (leadComplemento) {
                    params = { // [INPUT] 'Complemento'
                        'nameSearch': `[INPUT] 'Complemento'`, 'element': {
                            'elementMaxAwaitMil': 250, 'tag': 'input',
                            'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'name', 'atributoValor': 'Complement', },],
                        }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadComplemento}`, },],
                    }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
                    await logConNew(res?.[0]?.msg || 'x');
                }

                if (leadReferencia) {
                    params = { // [INPUT] 'Ponto de referência'
                        'nameSearch': `[INPUT] 'Ponto de referência'`, 'element': {
                            'elementMaxAwaitMil': 250, 'tag': 'input',
                            'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', },
                            { 'atributoNome': 'name', 'atributoValor': 'Reference_point', },],
                        }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadReferencia}`, },],
                    }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params);
                    await logConNew(res?.[0]?.msg || 'x');
                }

                params = { // [BUTTON] 'Salvar'
                    'nameSearch': `[BUTTON] 'Salvar'`, 'element': {
                        'elementMaxAwaitMil': 250, 'tag': 'button', 'conteudo': 'Salvar',
                        'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-button slds-button_success', }, { 'atributoNome': 'title', 'atributoValor': 'Salvar', },
                        { 'atributoNome': 'part', 'atributoValor': 'button', },],
                    }, 'actions': [{ 'action': 'elementClick', },],
                }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
            }
        }

        // ******************** {Resumo de pedido}

        // STATUS1 [Definindo operadora e forma de pagamento]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Definindo operadora e pagamento`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

        if (!leadModelo.includes('TEF')) {
            params = { // [INPUT] 'Quantidade'
                'nameSearch': `[INPUT] 'Quantidade'`, 'element': {
                    'elementMaxAwaitMil': 2500, 'tag': 'input',
                    'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-input', }, { 'atributoNome': 'part', 'atributoValor': 'input', }, { 'atributoNome': 'inputmode', 'atributoValor': 'decimal', },
                    { 'atributoNome': 'min', 'atributoValor': '1', }, { 'atributoNome': 'type', 'atributoValor': 'text', },],
                }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadQuantidade}`, },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

            params = { // [SELECT] 'Operadora'
                'nameSearch': `[SELECT] 'Operadora`, 'element': {
                    'elementMaxAwaitMil': 250, 'tag': 'button',
                    'propriedades': [{ 'atributoNome': 'aria-haspopup', 'atributoValor': 'listbox', }, { 'atributoNome': 'name', 'atributoValor': 'Operadora', },],
                }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': `${leadOperadora}`, },],
            }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        }

        params = { // [SELECT] 'Forma de pagamento'
            'nameSearch': `[SELECT] 'Forma de pagamento'`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'button',
                'propriedades': [{ 'atributoNome': 'aria-haspopup', 'atributoValor': 'listbox', }, { 'atributoNome': 'name', 'atributoValor': 'Forma de pagamento', },],
            }, 'actions': [{ 'action': 'elementSetValue', 'elementValue': 'Débito em conta', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        await screenshot({ e, page, 'fileName': `${leadCnpj}_resumoDePedido`, 'awaitPageFinish': false, });

        // ### ÚLTIMA VALIDAÇÃO
        if (res.length === 0 || !res[0].ret) { await screenshotAndStop({ 'err': `Não achou do Resumo de pedido`, 'screenshot': '10', }); }

        params = { // [BUTTON] 'Aceitar e Contratar'
            'nameSearch': `[BUTTON] 'Aceitar e Contratar'`, 'element': {
                'elementMaxAwaitMil': 250, 'tag': 'button', 'conteudo': 'Aceitar e Contratar',
                'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'slds-button slds-button_success', }, { 'atributoNome': 'title', 'atributoValor': 'Aceitar e Contrata', },
                { 'atributoNome': 'part', 'atributoValor': 'button', },],
            }, 'actions': [{ 'action': 'elementClick', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');

        // ******************** (APÓS A FINALIZAÇÃO)

        params = { // [DIV] 'Sucesso'
            'nameSearch': `[DIV] 'Sucesso'`, 'element': {
                'elementMaxAwaitMil': 10000, 'tag': 'div', 'conteudo': `Sucesso`,
                'propriedades': [{ 'atributoNome': 'id', }, { 'atributoNome': 'class', 'atributoValor': 'toastTitle slds-text-heading--small', }, { 'atributoNome': 'data-aura-rendered-by', },],
            }, 'actions': [{ 'action': 'elementGetValue', },],
        }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_sucesso`, 'awaitPageFinish': false, });

        //  params = { // [DIV] 'Oportunidade'
        //     'nameSearch': `[DIV] 'Oportunidade'`, 'element': {
        //         'elementMaxAwaitMil': 10000, 'tag': 'div', 'conteudo': `Oportunidade`,
        //         'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'entityNameTitle slds-line-height_reset', },],
        //     }, 'actions': [{ 'action': 'elementGetValue', },],
        // }; res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
        // await screenshot({ e, page, 'fileName': `${leadCnpj}_maquinaInput_sucesso`, 'awaitPageFinish': false, });

        await screenshot({ e, page, 'fileName': `screenshot`, });
        // await new Promise(r => { setTimeout(r, 7000000); });

        ret['ret'] = true;
        ret['msg'] = `MAQUINA INPUT: OK`;
        ret['res'] = { 'imputRes': `${res?.[0].ret ? `INDICAÇÃO MÁQUINA OK` : `INDICAÇÃO MÁQUINA: ERRO`}`, };

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['maquinaInput'] = maquinaInput;


