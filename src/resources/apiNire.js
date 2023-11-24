// let infApiNire, retApiNire
// infApiNire = { 'nire': '35132685930', 'aut': 'ASP.NET_SessionId=wivpxhlq3b45tgtb12dcgk4t' }
// retApiNire = await apiNire(infApiNire)
// console.log(retApiNire)

async function apiNire(inf) {
    await import('../../../Chrome_Extension/src/resources/@functions.js');
    let ret = { 'ret': false };
    try {
        let infRegex, retRegex
        // API
        let infApi = {
            'method': 'GET', 'url': `https://www.jucesponline.sp.gov.br/Pre_Visualiza.aspx?nire=${inf.nire}&idproduto=`,
            'headers': { 'Cookie': inf.aut }
        }; let retApi = await api(infApi); if (!retApi.ret) {
            let infLog = { 'folder': 'Jucesp', 'functionLocal': true, 'path': `API_apiNire_FALSE.txt`, 'text': retApi }
            let retLog = await log(infLog);
            return retApi
        } else { retApi = retApi.res }

        // CHECAR SE A API DEU CÓDIGO 200
        if (retApi.code !== 200) {
            return retApi
        }

        // CHECAR SE O COOKIE EXPIROU
        let texto = JSON.stringify(retApi.body)
        if (texto.includes('CaptchaImage')) {
            ret['msg'] = `Cookie expirou`;
            return ret
        }

        // CHECAR SE ENCONTROU NO BODY UM NIRE VÁLIDO (CNPJ JÁ ESTÁ AQUI)
        if (!texto.includes('ctl00_cphContent_frmPreVisualiza_lblCnpj') && !texto.includes('mas houve um problema em nosso servidor')) {
            // ### ENCONTROU: NÃO
            let infLog = { 'folder': 'Jucesp', 'functionLocal': true, 'path': `apiNire_NIRE_INVALIDO.txt`, 'text': texto }
            let retLog = await log(infLog);
            ret['msg'] = `NIRE inválido`;
            ret['ret'] = true;
        } else {
            // ### ENCONTROU: SIM | PEGAR O CNPJ DO NIRE
            infRegex = { 'pattern': 'ctl00_cphContent_frmPreVisualiza_lblCnpj\\">(.*?)<', 'text': texto }
            retRegex = regex(infRegex);
            if (!retRegex.ret || !retRegex.res['1']) {
                let infLog = { 'folder': 'Jucesp', 'functionLocal': true, 'path': `apiNire_CNPJ_NAO_ENCONTRADO.txt`, 'text': texto }
                let retLog = await log(infLog);
                ret['msg'] = `CNPJ do NIRE não encotrado`;
                ret['ret'] = true;
            } else {
                let cnpj = retRegex.res['1'].replace(/[^0-9]/g, '')

                // PEGAR A RAZÃO SOCIAL
                infRegex = { 'pattern': 'titulo-azul16-01\\">(.*?)<', 'text': texto }
                retRegex = regex(infRegex);
                if (!retRegex.ret || !retRegex.res['1']) {
                    let infLog = { 'folder': 'Jucesp', 'functionLocal': true, 'path': `apiNire_RAZAO_SOCIAL_NAO_ENCONTRADA.txt`, 'text': texto }
                    let retLog = await log(infLog);
                    ret['msg'] = `Razão Social do CNPJ não encontrada`;
                    ret['ret'] = true;
                } else {
                    let razaoSocial = retRegex.res['1']

                    // PEGAR TIPO DE EMPRESA DO CNPJ
                    infRegex = { 'pattern': 'ctl00_cphContent_frmPreVisualiza_lblDetalhes\\">(.*?)<', 'text': texto }
                    retRegex = regex(infRegex);
                    if (!retRegex.ret || !retRegex.res['1']) {
                        let infLog = { 'folder': 'Jucesp', 'functionLocal': true, 'path': `apiNire_TIPO_DE_EMPRESA_NAO_ENCONTRADA.txt`, 'text': texto }
                        let retLog = await log(infLog);
                        ret['msg'] = `Tipo de empresa do CNPJ não encontrada`;
                        ret['ret'] = true;
                    } else {
                        let tipo = retRegex.res['1']

                        let mei = `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}`
                        mei = razaoSocial.includes(mei) ? true : false
                        if (mei) {
                            ret['msg'] = `MEI`;
                            ret['ret'] = true;
                        } else {
                            // PEGAR DATA DE EMPRESA DO CNPJ
                            infRegex = { 'pattern': 'ctl00_cphContent_frmPreVisualiza_lblAtividade\\">(.*?)<', 'text': texto }
                            retRegex = regex(infRegex);
                            if (!retRegex.ret || !retRegex.res['1']) {
                                let infLog = { 'folder': 'Jucesp', 'functionLocal': true, 'path': `apiNire_DATA_DO_CNPJ_NAO_ENCONTRADA.txt`, 'text': texto }
                                let retLog = await log(infLog);
                                ret['msg'] = `Data do CNPJ não encontrada`;
                                ret['ret'] = true;
                            } else {
                                let data = retRegex.res['1']
                                if (data !== inf.date) {
                                    ret['msg'] = `DATA ERRADA ${data}`;
                                    ret['ret'] = true;
                                } else {
                                    let infApiCnpj = { 'cnpj': cnpj, }
                                    // let retApiCnpj = await apiCnpj(infApiCnpj); if (!retApiCnpj.ret) { return retApiCnpj } else { retApiCnpj = retApiCnpj.res }
                                    // ret['res'] = retApiCnpj;
                                    ret['res'] = [cnpj, data];
                                    ret['msg'] = `API NIRE: OK`;
                                    ret['ret'] = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        let m = await regexE({ 'e': e });
        ret['msg'] = m.res
        let infSendData = { 'stop': false, 'status1': 'TRYCATCH [apiNire] Script erro!' }
        let retSendData = await sendData(infSendData)
        process.exit();
    };
    return ret
}

if (typeof eng === 'boolean') {
    if (eng) { // CHROME
        window['apiNire'] = apiNire;
    } else { // NODEJS
        global['apiNire'] = apiNire;
    }
}
