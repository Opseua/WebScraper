// let infClientSearch, retClientSearch;
// infClientSearch = { e, page, browser, leadCnpj, };
// retClientSearch = await clientSearch(infClientSearch);
// console.log(retClientSearch);

let e = import.meta.url, ee = e;
async function clientSearch(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let infRegex, retRegex, infSendData, infLog, err, pageValue, pageInput, pageResult, leadStatus, params, res; ret['res'] = {};

        let { page, browser, leadCnpj, } = inf;

        async function logConNew(txt = '') { await logConsole({ e, ee, txt, }); } async function screenshotAndStop(inf = {}) { // SCREENSHOT
            let err = `% ${inf.err}`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, }); pageValue = await page.content();
            await log({ e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }); await screenshot({ e, page, 'fileName': `err_${inf.screenshot || 'x'}`, });
            browser.close(); await new Promise(r => { setTimeout(r, 2000); }); crashCode();
        }

        // STATUS1 [Buscando na lupa]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Buscando na lupa`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, }); await sendData(infSendData);

        // REGEX PARA PEGAR O ID DA LUPA DE PESQUISA
        pageValue = await page.content(); infRegex = { e, 'pattern': `placeholder="Pesquisar" id="(.*?)" class=`, 'text': pageValue, }; retRegex = regex(infRegex); if (!retRegex.ret || !retRegex.res['1']) {
            err = `% Não achou o ID da lupa de pesquisa`; logConsole({ e, ee, 'txt': `${err}`, }); infSendData = { e, 'stop': false, 'status1': `${err}`, };
            await sendData(infSendData); infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, };
            await log(infLog); await screenshot({ e, page, 'fileName': `err_2`, }); browser.close(); await new Promise(r => { setTimeout(r, 500); }); crashCode();
        } retRegex = retRegex.res['1'];

        // BUSCAR LEAD NA LUPA
        pageInput = await page.$(`input[id="${retRegex}"]`); if (!pageInput) {
            err = `% Não achou o campo de imput da lupa`; logConsole({ e, ee, 'txt': `${err}`, }); infSendData = { e, 'stop': false, 'status1': `${err}`, };
            await sendData(infSendData); pageValue = await page.content(); infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, };
            await log(infLog); await screenshot({ e, page, 'fileName': `err_3`, }); browser.close(); await new Promise(r => { setTimeout(r, 500); }); crashCode();
        }
        await page.$eval(`input[id="${retRegex}"]`, input => (input.value = '')); await new Promise(resolve => setTimeout(resolve, 200)); await page.type(`input[id="${retRegex}"]`, leadCnpj);
        await new Promise(resolve => setTimeout(resolve, 200)); await pageInput.press('Enter');

        // ESPERAR A BUSCA GLOBAL TERMINAR DE CONSULTAR
        pageResult = await page.waitForFunction(() => {
            let conteudo = document.body.innerText;
            if (conteudo.includes('NOME DA CONTA')) {
                return 'ENCONTRADO_CONTA';
            } else if (conteudo.includes('Expirado') && !conteudo.includes('Aguardando abertura Conta Corrente')) {
                return 'ENCONTRADO_EXPIRADO';
            } else if (conteudo.includes('NOME COMPLETO')) {
                return 'ENCONTRADO_LEAD';
            } else if (conteudo.includes('Nenhum resultado para')) {
                return 'NADA_ENCONTRADO';
            }
            return false;
        }, { timeout: 30000, }).catch(async () => {
            return false;
        });

        if (!pageResult) {
            err = `% Não achou o resultado da consulta`; logConsole({ e, ee, 'txt': `${err}`, }); infSendData = { e, 'stop': false, 'status1': `${err}`, };
            await sendData(infSendData); pageValue = await page.content(); infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, };
            await log(infLog); await screenshot({ e, page, 'fileName': `err_4`, }); browser.close(); await new Promise(r => { setTimeout(r, 500); }); crashCode();
        }
        leadStatus = await pageResult.jsonValue(); logConsole({ e, ee, 'txt': `${leadStatus}`, });

        await screenshot({ e, page, 'fileName': `screenshot`, }); await screenshot({ e, page, 'fileName': `${leadCnpj}_clientSearch_1`, 'awaitPageFinish': false, });

        // PEGAR DATA (SE FOR LEAD)
        if (['ENCONTRADO_EXPIRADO', 'ENCONTRADO_LEAD',].includes(leadStatus)) {
            params = { // [DIV] 'Resultado lupa (lead encontrado)'
                'nameSearch': `Resultado lupa (lead encontrado)`, 'element': {
                    'maxAwaitMil': 250, 'tag': 'span',
                    'propriedades': [{ 'atributoNome': 'class', 'atributoValor': 'uiOutputDateTime', }, { 'atributoNome': 'data-aura-class', 'atributoValor': 'uiOutputDateTime', },],
                }, 'actions': [
                    { 'action': 'elementGetValue', },
                ],
            };
            res = await page.evaluate(async (fun, pars) => { let run = new Function('return ' + fun)(); run = await run(pars); return run; }, elementAction.toString(), params); await logConNew(res?.[0]?.msg || 'x');
            if (res.length === 0 || !res[0].ret) { await screenshotAndStop({ 'err': `Não achou a data do lead`, 'screenshot': '1', }); } else { ret['res']['leadDate'] = res[0].res; }
        }

        ret['ret'] = true;
        ret['msg'] = `CLIENT SEARCH: OK`;
        ret['res']['leadStatus'] = leadStatus;

        // await new Promise(r => { setTimeout(r, 9999999); }); // TESTES

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['clientSearch'] = clientSearch;


