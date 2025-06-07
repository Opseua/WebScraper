

// let infClientImput, retClientImput;
// infClientImput = { e, page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, 'leadTelefone': coldList ? leadTelefone.replace('55219', '219') : leadTelefone, };
// retClientImput = await clientImput(infClientImput); console.log(retClientImput);

let e = import.meta.url, ee = e;
async function clientImput(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let infRegex, retRegex, infSendData, infLog, err, pageValue, pageResult, pageInput, pageImputs, leadStatus;

        let { page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, } = inf;

        // CHECAR SE É A PÁGINA DE INDICAÇÃO, SE NÃO FOR ABRIR ELA
        let qtd = 0, currentURL, url = 'https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente'; currentURL = page.url(); if (!currentURL.includes(url)) {
            await page.goto('https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente', { waitUntil: 'networkidle2', });
            // while (qtd < 3) {
            //     await page.goBack(); await new Promise(resolve => setTimeout(resolve, 2000)); currentURL = page.url(); if (currentURL.includes(url)) { break; } qtd++;
            //     if (qtd > 2) { await page.goto(url, { waitUntil: 'networkidle2', }); /* await new Promise(r => { setTimeout(r, 500); }); */ } // ABRIR PÁGINA DE BUSCA GLOBAL
            // }
        }

        // ESPERAR OS CAMPOS APARECEREM
        pageInput = await page.waitForSelector(`input[placeholder="Primeiro Nome"]`, { timeout: 20000, }); if (!pageInput) {
            err = `% Não achou o formulário`; logConsole({ e, ee, 'txt': `${err}`, }); infSendData = { e, 'stop': false, 'status1': `${err}`, };
            await sendData(infSendData); pageValue = await page.content(); infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }; await log(infLog);
            await screenshot({ e, page, 'fileName': `err_8`, }); browser.close(); await new Promise(r => { setTimeout(r, 500); }); crashCode();
        }

        // REGEX PARA PEGAR O ID DOS CAMPOS
        pageValue = await page.content(); infRegex = { e, 'pattern': `" aria-describedby="" id="(.*?)" placeholder="`, 'text': pageValue, }; retRegex = regex(infRegex); if (!retRegex.ret || !retRegex.res['5']) {
            err = `% Não achou o ID dos campos`; logConsole({ e, ee, 'txt': `${err}`, }); await sendData({ e, 'stop': false, 'status1': `${err}`, });
            await log({ e, folder: 'Registros', path: `${err}.txt`, text: pageValue, }); await screenshot({ e, page, fileName: `err_9`, }); browser.close(); await new Promise(r => { setTimeout(r, 500); }); crashCode();
        } retRegex = retRegex.res['5'];

        // STATUS1 [Indicando...]
        infSendData = { e, 'stop': false, 'status1': `${leadCnpj} | Indicando...`, }; logConsole({ e, ee, 'txt': `${infSendData.status1}`, });
        await sendData(infSendData); pageImputs = [leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, leadCnpj,];

        for (let [index, value,] of retRegex.entries()) {
            pageInput = await page.$(`input[id="${value}"]`); if (!pageInput) {
                err = `% Não achou o campo de imput [${index}]`; logConsole({ e, ee, 'txt': `${err}`, }); infSendData = { e, 'stop': false, 'status1': `${err}`, };
                await sendData(infSendData); pageValue = await page.content(); infLog = { e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue, }; await log(infLog);
                await screenshot({ e, page, 'fileName': `err_10`, }); browser.close(); await new Promise(r => { setTimeout(r, 500); }); crashCode();
            } await page.$eval(`input[id="${value}"]`, input => (input.value = '')); await new Promise(resolve => setTimeout(resolve, 200)); await page.type(`input[id="${value}"]`, pageImputs[index]);
            await new Promise(r => { setTimeout(r, 50); });
        }

        // CLICAR NO BOTÃO 'Confirmar'
        await page.click('.slds-button.slds-button_neutral.button.uiButton--default.uiButton--brand.uiButton');

        async function injetarIsso() {
            let timeout = 30; let intervalo = 200; let tempoPassado = 0; let buscar = {
                'erro': '/html/body/div[3]/div[2]/div/div[2]/div/div/div/div[1]/div[2]/div/div/span',
                'indicado': '/html/body/div[3]/div[2]/div/div[1]/div/div[1]/header/div[2]/div/div[1]/div[2]/h1/div[2]/span',
            }; function encontrarPorXPath(xpath) { let res = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null); return res.singleNodeValue; } return new Promise((resolve) => {
                let che = setInterval(() => {
                    for (let k in buscar) { let e = encontrarPorXPath(buscar[k]); if (e) { clearInterval(che); resolve({ ret: true, msg: `ELEMENTO ENCONTRADO`, res: { key: k, text: e.textContent.trim(), }, }); return; } }
                    tempoPassado += intervalo; if (tempoPassado >= (timeout * 1000)) { clearInterval(che); resolve({ ret: false, msg: `ERRO | NENHUM ELEMENTO ENCONTRADO`, }); }
                }, intervalo);
            });
        }

        // ESPERAR O RETORNO DO SERVIDOR APÓS ENVIAR O FORMULÁRIO
        let res = await page.evaluate(async (f, p) => { let run = new Function('return ' + f)(); run = await run(p); return run; }, injetarIsso.toString(), { 'a': 'b', 'c': 'd', });
        if (!res.ret) { crashCode(); } else { pageResult = res.res.key !== 'erro'; }

        if (!pageResult) {
            pageValue = await page.content();
            if (pageValue.includes(`Já existe um lead cadastrado com o CNPJ informado`)) {
                leadStatus = `Já existe um lead cadastrado com o CNPJ informado`;
            } else if (pageValue.includes(`Já existe um cliente cadastrado com o CNPJ informado`)) {
                leadStatus = `Já existe um cliente cadastrado com o CNPJ informado`;
            } else if (pageValue.includes(`Já existe um lead e um cliente cadastrado com o CNPJ informado`)) {
                leadStatus = `Já existe um lead e um cliente cadastrado com o CNPJ informado`;
            } else if (pageValue.includes(`Lead expirou`)) {
                leadStatus = `Lead expirou`;
            } else if (pageValue.includes(`Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo`)) {
                leadStatus = `Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo`;
            } else if (pageValue.includes(`Lead pertence a outro escritorio`)) {
                leadStatus = `Lead pertence a outro escritorio`;
            } else if (pageValue.includes(`CNPJ informado é inválido`)) {
                leadStatus = `ALERTA: CNPJ inválido`;
            } else if (pageValue.includes(`O formato correto para o telefone`)) {
                leadStatus = `ALERTA: telefone inválido`;
            } else if (pageValue.includes(`endereço de email inválido`)) {
                leadStatus = `ALERTA: email inválido`;
            } else if (pageValue.includes(`Os seguintes campos obrigatórios devem ser preenchidos`)) {
                leadStatus = `ALERTA: campo não preenchido`;
            } else {
                leadStatus = `ALERTA: status não identificado`;
            }
        } else {
            leadStatus = `INDICAÇÃO OK`;
        }

        await screenshot({ e, page, 'fileName': `screenshot`, }); await screenshot({ e, page, 'fileName': `${leadCnpj}_clientImput_1`, 'awaitPageFinish': false, });

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


