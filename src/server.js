async function run(inf) {
    await import('../../Chrome_Extension/src/resources/@functions.js')
    const puppeteer = await import('puppeteer');
    let ret = { 'ret': false };
    try {
        let infNavigate, retNavigate, infImput, retImput, infCookiesGetSet, retCookiesGetSet

        let element, cookies, value, pg = 0, ret = [], results = []
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        // FECHAR ABA EM BRANCO 
        await (await browser.pages())[0].close();

        // NAVIGATE
        infNavigate = { 'browser': browser, 'page': page, 'url': 'https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx?IDProduto=' }
        retNavigate = await navigate(infNavigate)
        // console.log(retNavigate.msg)

        await new Promise(resolve => { setTimeout(resolve, 1000) })

        infCookiesGetSet = { 'browser': browser, 'page': page, 'action': 'set', 'value': '*' }
        retCookiesGetSet = await cookiesGetSet(infCookiesGetSet)
        // console.log(retCookiesGetSet.msg)

        // IMPUT [DATA INÍCIO]
        infImput = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio', 'value': '13112023' }
        retImput = await imput(infImput)
        // console.log(retImput.msg)

        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // IMPUT [DATA FIM]
        infImput = { 'browser': browser, 'page': page, 'element': '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaFim', 'value': '13112023' }
        retImput = await imput(infImput)
        // console.log(retImput.msg)

        await new Promise(resolve => { setTimeout(resolve, 1000) })

        // BUTTON [PESQUISAR]
        infButtonElement = { 'browser': browser, 'page': page, 'button': 'search' }
        retButtonElement = await buttonElement(infButtonElement)
        // console.log(retButtonElement.msg)

        // AGUARDAR ABA TERMINAR DE CARREGAR
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [PRIMEIRA PÁGINA]
        infGetTextElement = { 'browser': browser, 'page': page, 'element': '#jo_encontrados' }
        retGetTextElement = await getTextElement(infGetTextElement)
        // console.log(retGetTextElement.msg)
        value = retGetTextElement.res.split('Resultados ')[1].split('para')[0].replace(/\n/g, '').replace('de', '-').replace(/[^0-9-]/g, '').split('-')
        results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]
        const repet1 = 100
        console.log('repet1', repet1, results)

        for (let i = 0; i < repet1; i++) {
            // GET TEXT ELEMENT [QUANTIDADE DE RESULTADOS] [PRIMEIRAS SEGUINTES]
            infGetTextElement = { 'browser': browser, 'page': page, 'element': '#jo_encontrados' }
            retGetTextElement = await getTextElement(infGetTextElement)
            value = retGetTextElement.res.split('Resultados ')[1].split('para')[0].replace(/\n/g, '').replace('de', '-').replace(/[^0-9-]/g, '').split('-')
            pg++ // [PAGINA ATUAL, INICIO RESULTADOS, FIM RESULTADOS, QTD TOTAL DE RESULTADOS]
            results = [pg, Number(value[0]), Number(value[1]), Number(value[2]),]
            const repet2 = Number(value[1]) - Number(value[0]) + 1
            console.log('repet2', repet2, results)
            let id = 1
            for (let i = 0; i < repet2; i++) {
                id++
                let numero = id.toString().padStart(2, '0');
                // GET TEXT ELEMENT [NIRE]
                infGetTextElement = { 'browser': browser, 'page': page, 'element': `#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl${numero}_lbtSelecionar` }
                retGetTextElement = await getTextElement(infGetTextElement)
                const nire = retGetTextElement.res

                // GET TEXT ELEMENT [RAZÃO SOCIAL]
                infGetTextElement = { 'browser': browser, 'page': page, 'element': `#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl${numero}_lblRazaoSocial` }
                retGetTextElement = await getTextElement(infGetTextElement)
                const razaoSocial = retGetTextElement.res

                ret.push({ 'NIRE': nire, 'razaoSocial': razaoSocial })

            }
            if (Number(value[1]) == Number(value[2])) {
                console.log('PAROU')
                return
            } else {
                await new Promise(resolve => { setTimeout(resolve, 1000) })
                // BUTTON [PRÓXIMA PÁGINA]
                infButtonElement = { 'browser': browser, 'page': page, 'button': 'next' }
                retButtonElement = await buttonElement(infButtonElement)
                // console.log(retButtonElement.msg)
                await new Promise(resolve => { setTimeout(resolve, 2000) })
            }
        }
        console.log(results, ret.length,)
        return
        await new Promise(resolve => { setTimeout(resolve, 1000) })
        // CLICAR NO BOTÃO PRÓXIMA PÁGINA
        element = await page.$x('//*[@id="ctl00_cphContent_gdvResultadoBusca_pgrGridView_btrNext_lbtText"]')
        await element[0].clickOk()
        pg++


        // // MOSTRAR CONTEUDO DA PÁGINA
        //  value = await page.evaluate(() => document.body.textContent);
        // // console.log(value);

        // ENCERRAR
        // await browser.close();

    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
    };
    return ret
}
run()





