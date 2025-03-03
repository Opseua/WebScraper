// let infMaquinaInput, retMaquinaInput
// infMaquinaInput = {e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retMaquinaInput = await maquinaInput(infMaquinaInput); console.log(retMaquinaInput)

let e = import.meta.url, ee = e;
async function maquinaInput(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { page, browser, leadCnpj, leadLimites, leadTaxas, leadModelo, leadCep, leadNumero, leadComplemento, leadReferencia, } = inf;

        let pageInput = true, pageValue, retRegex, infSendData; let pathScreenshot = `logs/screenshot_C6_${gO.inf.shortcut}`; let button; leadTaxas = leadTaxas.split('|');

        async function screenshotAndStop(inf = {}) { // SCREENSHOT
            let err = `% ${inf.err}`; logConsole({ e, ee, 'msg': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); pageValue = await page.content();
            let path = `${pathScreenshot}_err_${inf.screenshot || 'x'}.jpg`; await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); try { await page.screenshot({ path, fullPage: true, }); }
            catch (catchErr) { await page.screenshot({ path, fullPage: false, }); } browser.close(); await new Promise(resolve => { setTimeout(resolve, 2000); }); process.exit();
        } async function elementAction(inf = {}) {
            let { nameSearch = '', action = '', showConsoles = false, showAllEle = false, search = '', ignoreIsCovered = false, input, keys = false, max = 10000, } = inf;
            let ret = { 'ret': false, 'msg': '', }; let res = await new Promise((resolve) => {
                let inicio = Date.now(); let intervalo = setInterval(() => {
                    try {
                        let eles = []; let qtd = 0; let d = document; if (search.includes('/')) {
                            let n = d.evaluate(search, d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); qtd = n.snapshotLength; for (let i = 0; i < qtd; i++) { eles.push(n.snapshotItem(i)); }
                        } else { eles = Array.from(d.body.querySelectorAll('*')).filter(el => { return el.childNodes.length === 1 && el.textContent.includes(search) && el.offsetParent !== null; }); qtd = eles.length; }

                        // ********** AÇÃO: checkExist
                        if (action === 'checkExist') {
                            resolve((qtd > 0)); if ((qtd === 0)) { ret['msg'] = `ELEMENT ACTION: ERRO | ELEMENTO NÃO ENCONTRADO '${nameSearch}'`; }
                        } else if (qtd > 0) {
                            if (showAllEle) { eles.forEach((el, index) => { console.log(`🔹 [${index}]`, el); }); }
                            let ele = eles.find(el => { return ['BUTTON', 'A', 'SPAN', 'DIV', 'LI',].includes(el.tagName) && el.offsetParent !== null && getComputedStyle(el).cursor === 'pointer'; }) || eles[0];
                            if (showConsoles) { console.log(`✅ ELEMENTO ESCOLHIDO:`, ele); } clearInterval(intervalo);

                            // ********** AÇÃO: input
                            if (action === 'input' && input && ele.tagName === 'INPUT') { ele.value = input; if (showConsoles) { console.log(`🔤 TEXTO INSERIDO: '${input}'`); } resolve(true); }

                            // ********** AÇÃO: getValue
                            if (action === 'getValue') { ret['res'] = ele.value !== undefined ? ele.value : ele.textContent.trim(); if (showConsoles) { console.log(`📥 VALOR OBTIDO: '${ret['res']}'`); } resolve(true); }

                            // ********** AÇÃO: simular pressionamento de tecla
                            if (action === 'key' && keys) {
                                async function pressKeys() {
                                    for (let k of keys) {
                                        let keyMap = {
                                            'ENTER': { key: 'Enter', code: 'Enter', keyCode: 13, }, 'TAB': { key: 'Tab', code: 'Tab', keyCode: 9, },
                                            'ARROWUP': { key: 'ArrowUp', code: 'ArrowUp', keyCode: 38, }, 'ARROWDOWN': { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, },
                                            'ARROWLEFT': { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37, }, 'ARROWRIGHT': { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, },
                                        }; let keyInfo = keyMap[k.toUpperCase()] || { key: k, code: k.toUpperCase(), keyCode: k.toUpperCase().charCodeAt(0), };
                                        let keydownEvent = new KeyboardEvent('keydown', { 'key': keyInfo.key, 'code': keyInfo.code, 'keyCode': keyInfo.keyCode, 'bubbles': true, 'cancelable': true, });
                                        let keypressEvent = new KeyboardEvent('keypress', { 'key': keyInfo.key, 'code': keyInfo.code, 'keyCode': keyInfo.keyCode, 'bubbles': true, 'cancelable': true, });
                                        let keyupEvent = new KeyboardEvent('keyup', { 'key': keyInfo.key, 'code': keyInfo.code, 'keyCode': keyInfo.keyCode, 'bubbles': true, 'cancelable': true, });
                                        ele.dispatchEvent(keydownEvent); ele.dispatchEvent(keypressEvent); if (ele.tagName === 'INPUT' || ele.tagName === 'TEXTAREA') { ele.value += keyInfo.key; }
                                        ele.dispatchEvent(keyupEvent); if (showConsoles) { console.log(`🔑 TECLA PRESSIONADA: '${keyInfo.key}'`); } await new Promise(resolve => setTimeout(resolve, 250));
                                    }
                                } pressKeys(); resolve(true);
                            }

                            // ********** AÇÃO: click
                            if (action === 'click') {
                                let tentativaInicio = Date.now(); let tentativaIntervalo = setInterval(() => {
                                    let rect = ele.getBoundingClientRect(); let isCovered = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2) !== ele; if (!isCovered || ignoreIsCovered) {
                                        clearInterval(tentativaIntervalo); ele.scrollIntoView({ behavior: 'smooth', block: 'center', });
                                        setTimeout(() => { ele.click(); if (showConsoles) { console.log(`🎯 ELEMENTO: CLICADO!`); } resolve(true); }, 250);
                                    } else if ((Date.now() - tentativaInicio) >= max) {
                                        clearInterval(tentativaIntervalo); if (showConsoles) { console.log('⏳ ERRO: TEMPO MÁXIMO - ELEMENTO CONTINUA COBERTO'); } resolve(false);
                                    } else if (showConsoles) { console.log('⚠ ELEMENTO ENCOBERTO, TENTANDO DE NOVO...'); }
                                }, 250);
                            }

                            return;
                        } if ((Date.now() - inicio) >= max) { ret['msg'] = `ELEMENT ACTION: ERRO | TEMPO MÁXIMO '${nameSearch}'`; if (showConsoles) { console.log(ret.msg); } clearInterval(intervalo); resolve(false); }
                    } catch (erro) { ret['msg'] = `ELEMENT ACTION: ERRO | AO BUSCAR ELEMENTO '${nameSearch}'`; if (showConsoles) { console.log(ret.msg); } clearInterval(intervalo); resolve(false); }
                }, 250);
            }); ret['ret'] = res; if (ret.ret) { ret['msg'] = `ELEMENT ACTION: OK | '${nameSearch}'`; } return ret;
        }
        // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // [STATUS1]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Selecionando endereço de entrega`, }; logConsole({ e, ee, 'msg': `${infSendData.status1}`, }); await sendData(infSendData);
        // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        let params = { 'a': 1, };
        async function injetarIsso(par) {
            return 50 + par.a;
        }

        console.log('ANTES');
        let res = await page.evaluate(async (f, p) => {
            let run = new Function('return ' + f)(); run = await run(p); await new Promise(resolve => { setTimeout(resolve, 5000); }); return run;
        }, injetarIsso.toString(), params);
        console.log('DEPOIS');

        console.log(res);



        await new Promise(resolve => { setTimeout(resolve, 700000); });

        ret['ret'] = true;
        ret['msg'] = `CLIENT IMPUT: OK`;
        ret['res'] = {
            'imputRes': 'leadStatus',
        };

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}

// CHROME | NODEJS
globalThis['maquinaInput'] = maquinaInput;


