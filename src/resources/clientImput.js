// let infClientImput, retClientImput
// infClientImput = {'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retClientImput = await clientImput(infClientImput); console.log(retClientImput)

let e = import.meta.url, ee = e;
async function clientImput(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        let infRegex, retRegex, infSendData, retSendData, infLog, err, pageValue, pageResult, retLog, time, mon, day, hou, pageInput, pageImputs, infGoogleSheets, retGoogleSheets, leadStatus

        let { page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone } = inf

        let qtd = 0, currentURL, url = 'https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente'
        currentURL = page.url()
        // CHECAR SE É A PÁGINA DE INDICAÇÃO, SE NÃO FOR ABRIR ELA
        if (!currentURL.includes(url)) {
            while (qtd < 3) {
                await page.goBack(); await new Promise(resolve => setTimeout(resolve, 2000)); currentURL = page.url(); if (currentURL.includes(url)) { break; }; qtd++;
                if (qtd > 2) {
                    // ABRIR PÁGINA DE BUSCA GLOBAL
                    await page.goto(url, { waitUntil: 'networkidle2' });
                    await new Promise(resolve => { setTimeout(resolve, 1000) })
                    await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg` });
                    await new Promise(resolve => { setTimeout(resolve, 2000) })
                }
            }
        }

        // ESPERAR OS CAMPOS APARECEREM
        pageInput = await page.waitForSelector(`input[placeholder="Primeiro Nome"]`, { timeout: 20000 });
        if (!pageInput) {
            err = `$ Formulário não apareceu`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
            retSendData = await sendData(infSendData)
            pageValue = await page.content()
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_erro_8.jpg` });
            browser.close()
            process.exit();
        }

        // REGEX PARA PEGAR O ID DOS CAMPOS
        pageValue = await page.content()
        infRegex = { 'e': e, 'pattern': `" aria-describedby="" id="(.*?)" placeholder="`, 'text': pageValue }
        retRegex = regex(infRegex);
        if (!retRegex.ret || !retRegex.res['5']) {
            err = `$ Não achou o ID dos campos`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
            retSendData = await sendData(infSendData)
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_9.jpg` });
            browser.close()
            process.exit();
        }
        retRegex = retRegex.res['5']
        // await new Promise(resolve => { setTimeout(resolve, 1000) })

        // STATUS1 [Indicando...]
        infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Indicando...` }
        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` });
        retSendData = await sendData(infSendData)
        pageImputs = [leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, leadCnpj]
        await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}.jpg` });

        for (let [index, value] of retRegex.entries()) {
            pageInput = await page.$(`input[id="${value}"]`);
            if (!pageInput) {
                err = `$ Não achou o campo de imput [${index}]`
                logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
                infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
                retSendData = await sendData(infSendData)
                pageValue = await page.content()
                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
                retLog = await log(infLog);
                await page.screenshot({ path: `log/screenshot_C6_${gO.inf.shortcut}_err_10.jpg` });
                browser.close()
                process.exit();
            }
            await page.$eval(`input[id="${value}"]`, input => (input.value = ''));
            await new Promise(resolve => setTimeout(resolve, 250));
            await page.type(`input[id="${value}"]`, pageImputs[index]);
            await new Promise(resolve => { setTimeout(resolve, 400) });
        }

        // PRINT PARA LOG
        time = dateHour().res; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`; hou = `${time.hou}.${time.min}.${time.sec}.${time.mil}`
        await page.screenshot({ path: `log/Registros/${mon}/${day}/${hou}_C6_${leadCnpj}_INDICANDO_INICIO.jpg` });

        // CLICAR NO BOTÃO 'Confirmar'
        await page.click('.slds-button.slds-button_neutral.button.uiButton--default.uiButton--brand.uiButton');
        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // ESPERAR O RETORNO DO SERVIDOR APÓS ENVIAR O FORMULÁRIO
        pageResult = await Promise.race([
            page.waitForSelector('body > div.themeLayoutStarterWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceThemeLayoutStarter > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div > div > div.container.EDIT.forceQuickActionLayout > div.pageLevelErrors > div > div', { timeout: 10000 }).then(() => false),
            page.waitForNavigation({ timeout: 10000 }).then(() => true),
        ]).catch(() => 'NADA_ACONTECEU');

        time = dateHour().res
        pageValue = await page.content()
        let fileStatus = 'X'
        if (!pageResult) {
            if (pageValue.includes(`Já existe um lead cadastrado com o CNPJ informado`)) {
                leadStatus = `Já existe um lead cadastrado com o CNPJ informado`
                fileStatus = 1
            } else if (pageValue.includes(`Já existe um cliente cadastrado com o CNPJ informado`)) {
                leadStatus = `Já existe um cliente cadastrado com o CNPJ informado`
                fileStatus = 2
            } else if (pageValue.includes(`Já existe um lead e um cliente cadastrado com o CNPJ informado`)) {
                leadStatus = `Já existe um lead e um cliente cadastrado com o CNPJ informado`
                fileStatus = 3
            } else if (pageValue.includes(`Lead expirou`)) {
                leadStatus = `Lead expirou`
                fileStatus = 4
            } else if (pageValue.includes(`Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo`)) {
                leadStatus = `Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo`
                fileStatus = 5
            } else {
                if (pageValue.includes(`CNPJ informado é inválido`)) {
                    leadStatus = `ALERTA: CNPJ inválido`
                    fileStatus = 99
                } else if (pageValue.includes(`O formato correto para o telefone`)) {
                    leadStatus = `ALERTA: telefone inválido`
                    fileStatus = 99
                } else if (pageValue.includes(`endereço de email inválido`)) {
                    leadStatus = `ALERTA: email inválido`
                    fileStatus = 99
                } else if (pageValue.includes(`Os seguintes campos obrigatórios devem ser preenchidos`)) {
                    leadStatus = `ALERTA: campo não preenchido`
                    fileStatus = 99
                } else {
                    leadStatus = `ALERTA: status não identificado`
                    let infFile, retFile
                    // infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'path': `log/C6_${time.hou}.${time.min}.${time.sec}_${leadCnpj}.txt`, 'rewrite': false, 'text': pageValue }
                    // retFile = await file(infFile);
                    fileStatus = 99
                }
            }
        } else {
            leadStatus = `INDICAÇÃO OK`
            fileStatus = 0
        }

        // PRINT PARA LOG
        time = dateHour().res; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`; hou = `${time.hou}.${time.min}.${time.sec}.${time.mil}`
        await page.screenshot({ path: `log/Registros/${mon}/${day}/${hou}_C6_${leadCnpj}_INDICANDO_FIM_-_${fileStatus}.jpg` });

        ret['ret'] = true;
        ret['msg'] = `CLIENT IMPUT: OK`;
        ret['res'] = {
            'imputRes': leadStatus,
        };

    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res

        let errMsg = `$ TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        let retSendData = await sendData(infSendData)
    }; return { ...({ ret: ret.ret }), ...(ret.msg && { msg: ret.msg }), ...(ret.res && { res: ret.res }), };
};

// CHROME | NODEJS
(eng ? window : global)['clientImput'] = clientImput