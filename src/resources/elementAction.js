// let infModel, retModel
// infModel = { e, 'chaveUm': 'valorUm', 'chaveDois': 'valorDois' }
// retModel = await elementoSearch(infModel); console.log(retModel)

async function elementAction(inf = {}) {
    let nameSearch = inf.nameSearch || 'xx'; let maxReturn = inf.element?.maxReturn || 10; let indexTarget = (inf.element?.indexTarget !== undefined) ? inf.element.indexTarget : -1;

    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    function getElementXPath(el) {
        let parts = []; while (el && el.nodeType === Node.ELEMENT_NODE) {
            let index = 1; let sibling = el.previousSibling; while (sibling) { if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === el.nodeName) { index++; } sibling = sibling.previousSibling; }
            parts.unshift(el.nodeName.toLowerCase() + (index > 1 ? `[${index}]` : '')); el = el.parentNode;
        } return '/' + parts.join('/');
    }

    async function simularDigitacao(el, texto, intervalo = 50, teclaFinal = null) {
        let valorAtual = ''; for (let i = 0; i < texto.length; i++) {
            let char = texto[i]; el.dispatchEvent(new KeyboardEvent('keydown', { key: char, bubbles: true, })); el.dispatchEvent(new KeyboardEvent('keypress', { key: char, bubbles: true, }));
            valorAtual += char; el.value = valorAtual; el.dispatchEvent(new Event('input', { bubbles: true, })); el.dispatchEvent(new KeyboardEvent('keyup', { key: char, bubbles: true, })); await sleep(intervalo);
        } el.dispatchEvent(new Event('change', { bubbles: true, })); if (teclaFinal === 'ENTER') {
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, })); el.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', bubbles: true, }));
            el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, }));
        }
    }

    async function elementSearch(inf = {}) {
        let elementMaxAwaitMil = inf.elementMaxAwaitMil || 50; let inicio = Date.now();
        return await new Promise(resolve => {
            let intervalo = setInterval(() => {
                // ⬇️ Busca por XPath, se definido
                if (inf.xpath) {
                    let xpathResult = document.evaluate(inf.xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); let encontrados = [];
                    for (let i = 0; i < xpathResult.snapshotLength; i++) { encontrados.push(xpathResult.snapshotItem(i)); } clearInterval(intervalo); return resolve(encontrados);
                }
                let getAllElementsIncludingShadowDOM = (root = document) => {
                    let result = new Set(); let walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
                    while (walker.nextNode()) { let node = walker.currentNode; result.add(node); if (node.shadowRoot) { for (let el of getAllElementsIncludingShadowDOM(node.shadowRoot)) { result.add(el); } } }
                    return [...result,];
                };
                let todos = getAllElementsIncludingShadowDOM(); let resultadoBase = new Set();
                for (let el of todos) {
                    let ok = true;
                    // buscaRapida: todos os termos devem estar no outerHTML
                    if (ok && inf.buscaRapida && inf.buscaRapida.length > 0) {
                        let html = (el.outerHTML || '').toLowerCase(); for (let termo of inf.buscaRapida) { if (!html.includes(termo.toLowerCase())) { ok = false; break; } }
                    }
                    // tag: deve ser uma das informadas
                    if (ok && inf.tag) {
                        if (el.tagName.toLowerCase() !== inf.tag.toLowerCase()) { ok = false; }
                    }
                    // conteudo: todos os termos devem estar no textContent ou value
                    if (ok && inf.conteudo) {
                        let termo = inf.conteudo.toLowerCase(); if (!(((el.textContent || '').toLowerCase()).includes(termo) || ((el.value || '').toLowerCase()).includes(termo))) { ok = false; }
                    }
                    // propriedades: todos devem ser atendidos
                    if (ok && inf.propriedades && inf.propriedades.length > 0) {
                        for (let prop of inf.propriedades) {
                            let nomeOk = true; let valorOk = true;
                            if (prop.atributoNome) {
                                nomeOk = el.hasAttribute(prop.atributoNome);
                            }
                            if (prop.atributoValor) {
                                valorOk = false; for (let attr of el.attributes) { if (attr.value.includes(prop.atributoValor)) { valorOk = true; break; } }
                            }
                            if (!(nomeOk && valorOk)) {
                                ok = false; break;
                            }
                        }
                    }
                    if (ok) { resultadoBase.add(el); }
                }
                if (resultadoBase.size > 0 || elementMaxAwaitMil === 0) {
                    clearInterval(intervalo);
                    // Aplicar filtro de elementoParente, se houver
                    if (!inf.elementoParente) {
                        return resolve([...resultadoBase,]);
                    }
                    let resultadoFinal = new Set();
                    for (let baseEl of resultadoBase) {
                        let candidatos = new Set(); let tipo = inf.elementoParente.tipo;
                        if (tipo === 'pai') {
                            let atual = baseEl.parentElement; while (atual) { for (let el of getAllElementsIncludingShadowDOM(atual)) { candidatos.add(el); } atual = atual.parentElement; }
                        }
                        if (tipo === 'filho') {
                            for (let el of getAllElementsIncludingShadowDOM(baseEl)) { candidatos.add(el); }
                        }
                        for (let el of candidatos) {
                            let tagOk = true;
                            if (inf.elementoParente.tag) {
                                tagOk = el.tagName.toLowerCase() === inf.elementoParente.tag.toLowerCase();
                            }
                            let propOk = true;
                            if (inf.elementoParente.propriedades) {
                                propOk = inf.elementoParente.propriedades.every(p => {
                                    let achou = false;
                                    for (let attr of el.attributes) {
                                        if (p.atributoNome && !p.atributoValor) {
                                            if (attr.name === p.atributoNome) { achou = true; }
                                        } else if (!p.atributoNome && p.atributoValor) {
                                            if (attr.value.includes(p.atributoValor)) { achou = true; }
                                        } else if (p.atributoNome && p.atributoValor) {
                                            if (attr.name === p.atributoNome && attr.value.includes(p.atributoValor)) { achou = true; }
                                        }
                                    }
                                    return achou;
                                });
                            }
                            if (tagOk && propOk) { resultadoFinal.add(el); }
                        }
                    }
                    return resolve([...resultadoFinal,]);
                }
                if (Date.now() - inicio >= elementMaxAwaitMil) { clearInterval(intervalo); return resolve([]); }
            }, 250); // intervalo de verificação
        });
    }

    let element = inf.element || {}; let elementos = await elementSearch(element); let resultados = []; let actions = inf.actions || [];
    if (!elementos || elementos.length === 0) { return [{ 'ret': false, 'msg': `ELEMENT ACTION: ERRO | NÃO ENCONTRADO/NÃO APARECEU A TEMPO (${nameSearch})`, },]; }

    if (indexTarget > -1) { elementos = [elementos[indexTarget],]; } elementos = elementos.slice(0, maxReturn || elementos.length);
    for (let el of elementos) {
        for (let [index, value,] of actions.entries()) {
            let acao = value;
            try {
                if (!el.isConnected) {
                    resultados.push({ 'ret': false, 'msg': `ELEMENT ACTION [${acao.action}]: ERRO | ELEMENTO NÃO ESTÁ MAIS NO DOM (${nameSearch})`, }); continue;
                }
                switch (acao.action) {
                    case 'elementGetXpath':
                        resultados.push({ 'ret': true, 'msg': `ELEMENT ACTION [${acao.action}]: OK (${nameSearch})`, 'res': getElementXPath(el), }); break;

                    case 'elementClick':
                        el.click(); // PADRÃO
                        resultados.push({ 'ret': true, 'msg': `ELEMENT ACTION [${acao.action}]: OK (${nameSearch})`, }); break;

                    case 'elementGetValue':
                        resultados.push({ 'ret': true, 'msg': `ELEMENT ACTION [${acao.action}]: OK (${nameSearch})`, 'res': el.value?.trim() ? el.value : el.textContent, }); break;

                    case 'attributeGetValue':
                        if (acao.attribute) { resultados.push({ 'ret': true, 'msg': `ELEMENT ACTION [${acao.action}]: OK (${nameSearch})`, 'res': el.getAttribute(acao.attribute), }); }
                        else { resultados.push({ 'ret': false, 'msg': `ELEMENT ACTION [${acao.action}]: ERRO | INFORMAR O 'attribute' (${nameSearch})`, }); }
                        break;

                    case 'elementSetValue':
                        if ('elementValue' in acao) {
                            let ehComboFake = el.tagName.toLowerCase() === 'button' && el.getAttribute('role') === 'combobox';
                            if (ehComboFake) {
                                try {
                                    el.click(); await sleep(500); /* espera abrir dropdown */ await simularDigitacao(el, `${acao.elementValue}`, 50, 'ENTER');
                                    resultados.push({ 'ret': true, 'msg': `ELEMENT ACTION [${acao.action}]: OK (${nameSearch})`, });
                                } catch (err) {
                                    resultados.push({ 'ret': false, 'msg': `ELEMENT ACTION [${acao.action}]: ERRO AO DEFINIR VALOR (${nameSearch}) → ${err.message}`, });
                                }
                            } else if ('value' in el) {
                                el.value = acao.elementValue; el.dispatchEvent(new Event('input', { bubbles: true, })); el.dispatchEvent(new Event('change', { bubbles: true, }));
                                resultados.push({ 'ret': true, 'msg': `ELEMENT ACTION [${acao.action}]: OK (${nameSearch})`, });
                            } else {
                                resultados.push({ 'ret': false, 'msg': `ELEMENT ACTION [${acao.action}]: ERRO | ELEMENTO NÃO ACEITA IMPUT (${nameSearch})`, });
                            }
                        } else {
                            resultados.push({ 'ret': false, 'msg': `ELEMENT ACTION [${acao.action}]: ERRO | INFORMAR O 'elementValue' (${nameSearch}) `, });
                        }
                        break;

                    case 'awaitMil':
                        await sleep(acao.time || 1000); resultados.push({ 'ret': true, 'msg': `ELEMENT ACTION [${acao.action}]: OK (${nameSearch})`, });
                        break;

                    case 'elementHover':
                        let event = new MouseEvent('mouseover', { 'bubbles': true, 'cancelable': true, 'view': window, }); el.dispatchEvent(event);
                        resultados.push({ 'ret': true, 'msg': `ELEMENT ACTION [${acao.action}]: OK (${nameSearch})`, });
                        break;

                    case 'getBody':
                        resultados.push({ 'ret': true, 'msg': `ELEMENT ACTION [${acao.action}]: OK (${nameSearch})`, 'res': (document.body.textContent || ''), });
                        break;

                    default:
                        resultados.push({ 'ret': false, 'msg': `ELEMENT ACTION [${acao.action}]: ERRO | AÇÃO INVÁLIDA (${nameSearch})`, });
                }
            } catch (err) {
                resultados.push({ 'ret': false, 'msg': `ELEMENT ACTION [${acao.action}]: ERRO | (${nameSearch}) ${err.message}`, });
            }
        }

    }
    return resultados;
}

// CHROME | NODE
globalThis['elementAction'] = elementAction;




// let params;

// params = { // [DIV] 'Oportunidade'
//     'nameSearch': `[DIV] 'Oportunidade'`, 'element': {
//         'elementMaxAwaitMil': 10000, 'tag': 'div', 'conteudo': `Oportunidade`,
//         'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'entityNameTitle slds-line-height_reset', },],
//     }, 'actions': [{ 'action': 'elementGetValue', },],
// };

// let encontrados = await elementAction(params);

// console.log(encontrados);
