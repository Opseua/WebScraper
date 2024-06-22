// let infClientImput, retClientImput
// infClientImput = {'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retClientImput = await clientImput(infClientImput); console.log(retClientImput)

let e = import.meta.url, ee = e;
async function clientImput(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        let infRegex, retRegex, infSendData, retSendData, infLog, err, pageValue, pageResult, retLog, time, mon, day, hou, pageInput, pageImputs, infGoogleSheets, retGoogleSheets, leadStatus, infCommandLine, infFile, retFile

        let { page, browser, leadCnpj, leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone } = inf

        let qtd = 0, currentURL, url = 'https://c6bank.my.site.com/partners/s/createrecord/IndicacaoContaCorrente'; currentURL = page.url()
        // CHECAR SE É A PÁGINA DE INDICAÇÃO, SE NÃO FOR ABRIR ELA
        if (!currentURL.includes(url)) {
            while (qtd < 3) {
                await page.goBack(); await new Promise(resolve => setTimeout(resolve, 2000)); currentURL = page.url(); if (currentURL.includes(url)) { break; }; qtd++; if (qtd > 2) {
                    // ABRIR PÁGINA DE BUSCA GLOBAL
                    await page.goto(url, { waitUntil: 'networkidle2' }); await new Promise(resolve => { setTimeout(resolve, 1000) })
                    await page.screenshot({ path: `log/screenshot_C6.jpg` }); await new Promise(resolve => { setTimeout(resolve, 2000) })
                }
            }
        }

        // ESPERAR OS CAMPOS APARECEREM
        pageInput = await page.waitForSelector(`input[placeholder="Primeiro Nome"]`, { timeout: 30000 });
        if (!pageInput) {
            err = `$ Formulário não apareceu`
            logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
            retSendData = await sendData(infSendData)
            pageValue = await page.content()
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_C6_erro_8.jpg` });
            // FORÇAR PARADA DO SCRIPT
            await browsers({ 'e': e, 'project': 'C6', 'close': true, 'path': `${letter}:/ARQUIVOS/PROJETOS/WebScraper/src/z_Outros_serverC6/OFF.vbs`, });
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
            await page.screenshot({ path: `log/screenshot_C6_err_9.jpg` });
            // FORÇAR PARADA DO SCRIPT
            await browsers({ 'e': e, 'project': 'C6', 'close': true, 'path': `${letter}:/ARQUIVOS/PROJETOS/WebScraper/src/z_Outros_serverC6/OFF.vbs`, });
        }; retRegex = retRegex.res['5']; await new Promise(resolve => { setTimeout(resolve, 1000) })

        // STATUS1 [Indicando...]
        infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Indicando...` }
        logConsole({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` });
        retSendData = await sendData(infSendData)
        pageImputs = [leadPrimeiroNome, leadSobrenome, leadEmail, leadTelefone, leadCnpj]
        await page.screenshot({ path: `log/screenshot_C6.jpg` });

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
                await page.screenshot({ path: `log/screenshot_C6_err_10.jpg` });
                // FORÇAR PARADA DO SCRIPT
                await browsers({ 'e': e, 'project': 'C6', 'close': true, 'path': `${letter}:/ARQUIVOS/PROJETOS/WebScraper/src/z_Outros_serverC6/OFF.vbs`, });
            }
            await page.$eval(`input[id="${value}"]`, input => (input.value = '')); await new Promise(resolve => setTimeout(resolve, 500));
            await page.type(`input[id="${value}"]`, pageImputs[index]); await new Promise(resolve => { setTimeout(resolve, 750) });
        }

        // PRINT PARA LOG
        time = dateHour().res; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`; hou = `${time.hou}.${time.min}.${time.sec}.${time.mil}`
        await page.screenshot({ path: `log/Registros/${mon}/${day}/${hou}_C6_${leadCnpj}_INDICANDO_INICIO.jpg` });

        // CLICAR NO BOTÃO 'Confirmar'
        await page.click('.slds-button.slds-button--neutral.button.uiButton--default.uiButton--brand.uiButton'); await new Promise(resolve => { setTimeout(resolve, 1000) })

        // ESPERAR O RETORNO DO SERVIDOR APÓS ENVIAR O FORMULÁRIO
        pageResult = await Promise.race([
            page.waitForSelector('body > div.themeLayoutStarterWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceThemeLayoutStarter > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div > div > div.container.EDIT.forceQuickActionLayout > div.pageLevelErrors > div > div', { timeout: 15000 }).then(() => false),
            page.waitForNavigation({ timeout: 15000 }).then(() => true),
        ]).catch(() => 'NADA_ACONTECEU');

        time = dateHour().res; pageValue = await page.content(); let fileStatus = 'X'; if (!pageResult) {
            if (pageValue.includes(`Já existe um lead cadastrado com o CNPJ informado`)) {
                fileStatus = 1; leadStatus = `Já existe um lead cadastrado com o CNPJ informado`;
            } else if (pageValue.includes(`Já existe um cliente cadastrado com o CNPJ informado`)) {
                fileStatus = 2; leadStatus = `Já existe um cliente cadastrado com o CNPJ informado`;
            } else if (pageValue.includes(`Já existe um lead e um cliente cadastrado com o CNPJ informado`)) {
                fileStatus = 3; leadStatus = `Já existe um lead e um cliente cadastrado com o CNPJ informado`
            } else if (pageValue.includes(`Lead expirou`)) {
                fileStatus = 4; leadStatus = `Lead expirou`
            } else if (pageValue.includes(`Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo`)) {
                fileStatus = 5; leadStatus = `Esse lead foi indicado por você ou membros do seu escritório recentemente e a conta não foi aberta no prazo`
            } else {
                if (pageValue.includes(`CNPJ informado é inválido`)) { fileStatus = 99; leadStatus = `ALERTA: CNPJ inválido` }
                else if (pageValue.includes(`O formato correto para o telefone`)) { fileStatus = 99; leadStatus = `ALERTA: telefone inválido` }
                else if (pageValue.includes(`endereço de email inválido`)) { fileStatus = 99; leadStatus = `ALERTA: email inválido` }
                else if (pageValue.includes(`Os seguintes campos obrigatórios devem ser preenchidos`)) { fileStatus = 99; leadStatus = `ALERTA: campo não preenchido` }
                else {
                    fileStatus = 99; leadStatus = `ALERTA: status não identificado`;
                    infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'path': `log/C6_${time.hou}.${time.min}.${time.sec}_${leadCnpj}.txt`, 'rewrite': false, 'text': pageValue }; retFile = await file(infFile);
                }
            }
        } else { fileStatus = 0; leadStatus = `INDICAÇÃO OK` }

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

        let errMsg = `$ [clientImput] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': errMsg }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}

if (eng) { // CHROME
    window['clientImput'] = clientImput;
} else { // NODEJS
    global['clientImput'] = clientImput;
}
