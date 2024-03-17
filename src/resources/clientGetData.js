// let infClientGetData, retClientGetData // 'logFun': true,
// infClientGetData = {'e': e, 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
// retClientGetData = await clientGetData(infClientGetData)
// console.log(retClientGetData)

let e = import.meta.url, ee = e
async function clientGetData(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        let errs = async (errC, ret) => { if (!ret.stop) { ret['stop'] = true; regexE({ 'e': errC, 'inf': inf, 'catchGlobal': true }) } };
        if (typeof window !== 'undefined') { window.addEventListener('error', (errC) => errs(errC, ret)); window.addEventListener('unhandledrejection', (errC) => errs(errC, ret)) }
        else { process.on('uncaughtException', (errC) => errs(errC, ret)); process.on('unhandledRejection', (errC) => errs(errC, ret)) }
    }
    try {
        let infRegex, retRegex, infSendData, retSendData, infLog, err, browser, pageValue, pageResult, retLog, time, mon, day, hou, leadPageId, leadDate, dataC6

        let { page, leadCnpj } = inf

        // PEGAR O ID DO LINK DA PÁGINA DO LEAD
        pageValue = await page.content()
        infRegex = { 'e': e, 'pattern': `data-recordid="(.*?)" rel=`, 'text': pageValue }
        retRegex = regex(infRegex);
        if (!retRegex.ret || !retRegex.res['1']) {
            err = `$ Não achou o ID do link da página do lead`
            console.log({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
            retSendData = await sendData(infSendData)
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_C6__err_5.jpg` });
            browser.close()
            process.exit();
        }
        leadPageId = retRegex.res['1']
        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // STATUS1 [Abrindo dados do cliente]
        infSendData = { 'e': e, 'stop': false, 'status1': `${leadCnpj} | Abrindo dados do cliente` }
        console.log({ 'e': e, 'ee': ee, 'write': false, 'msg': `${infSendData.status1}` });
        retSendData = await sendData(infSendData)
        await page.screenshot({ path: `log/screenshot_C6.jpg` });
        // await new Promise(resolve => { setTimeout(resolve, 1000) })

        // CLICAR NO LINK DO ID DO LEAD
        let linkSelector = `a[data-recordid="${leadPageId}"]`;
        await page.waitForSelector(linkSelector);
        let link = await page.$(linkSelector);
        await new Promise(resolve => { setTimeout(resolve, 1000) })
        await link.click();
        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // ESPERAR A DATA DO LEAD APARECER
        pageResult = await page.waitForFunction(() => {
            const elements = document.querySelectorAll('.uiOutputDateTime.forceOutputModStampWithPreview');
            if (elements.length > 0) {
                const values = Array.from(elements).map(element => element.textContent.trim());
                return values;
            }
            return false;
        }, { timeout: 30000 }).catch(async () => { return false; });
        if (!pageResult) {
            err = `$ Não achou a data de abertura`
            console.log({ 'e': e, 'ee': ee, 'write': false, 'msg': `${err}` });
            infSendData = { 'e': e, 'stop': false, 'status1': `${err}` }
            retSendData = await sendData(infSendData)
            pageValue = await page.content()
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': pageValue }
            retLog = await log(infLog);
            await page.screenshot({ path: `log/screenshot_C6_err_6.jpg` });
            browser.close()
            process.exit();
        }
        leadDate = await pageResult.jsonValue();
        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // CHECAR SE É CONTA ANTIGA OU NOVA
        let data = leadDate[0].split('/');
        let dataDay = parseInt(data[0], 10).toString().padStart(2, '0');
        let dataMon = (parseInt(data[1], 10) - 1).toString().padStart(2, '0');
        let dataYea = parseInt(data[2], 10).toString().padStart(4, '0');
        // DATA ENCONTRADA EM TIMESTAMP SEM MILESEGUNDOS
        dataC6 = new Date(dataYea, dataMon, dataDay, 0, 0, 0); // ANO-MÊS-DIA 00:00:00
        dataC6 = Math.floor(dataC6.getTime() / 1000);
        // DIFERENÇA MAIR QUE 5 DIAS 'true' DO CONTRÁRIO 'false' | + DE 5 DIAS → JÁ POSSUI CONTA | - DE 5 DIAS → ABERTO SF
        dataC6 = (Number(dateHour().res.tim) - dataC6) > ((5 * 86400) + 86400) ? true : false

        // PRINT PARA LOG
        time = dateHour().res; mon = `MES_${time.mon}_${time.monNam}`; day = `DIA_${time.day}`; hou = `${time.hou}.${time.min}.${time.sec}.${time.mil}`
        await page.screenshot({ path: `log/Registros/${mon}/${day}/${hou}_C6_${leadCnpj}_DADOS_-_${dataC6 ? 1 : 0}.jpg` });

        ret['ret'] = true;
        ret['msg'] = `CLIENT GET DATA: OK`;
        ret['res'] = {
            'dataDayMonYea': leadDate[0].substring(0, 10),
            'dataDayMonYeaFull': leadDate[0],
            'dataRes': dataC6 ? 'JÁ POSSUI CONTA' : 'ABERTO SF',
            'dataBoolean': dataC6,
        };

        // ### LOG FUN ###
        if (inf && inf.logFun) {
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; file(infFile);
        }
    } catch (err) {
        let retRegexE = await regexE({ 'inf': inf, 'e': err, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let errMsg = `$ [clientGetData] TRYCATCH Script erro!`
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
    window['clientGetData'] = clientGetData;
} else { // NODEJS
    global['clientGetData'] = clientGetData;
}
