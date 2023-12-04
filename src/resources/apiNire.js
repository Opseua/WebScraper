// let infApiNire, retApiNire // 'logFun': true,
// infApiNire = {'e': e, 'nire': '35132685930', 'aut': 'ASP.NET_SessionId=wivpxhlq3b45tgtb12dcgk4t' }
// retApiNire = await apiNire(infApiNire)
// console.log(retApiNire)

let e = import.meta.url;
async function apiNire(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    if (catchGlobal) {
        const errs = async (err, ret) => { if (!ret.stop) { ret['stop'] = true; let retRegexE = await regexE({ 'e': err, 'inf': inf, 'catchGlobal': true }) } }
        if (typeof window !== 'undefined') { window.addEventListener('error', (err) => errs(err, ret)); window.addEventListener('unhandledrejection', (err) => errs(err, ret)) }
        else { process.on('uncaughtException', (err) => errs(err, ret)); process.on('unhandledRejection', (err) => errs(err, ret)) }
    }
    try {
        let infRegex, retRegex, infLog, retLog
        let nire = inf && inf.nire ? inf.nire : '12345678'
        // API
        let infApi = {
            'method': 'GET', 'url': `https://www.jucesponline.sp.gov.br/Pre_Visualiza.aspx?nire=${nire}&idproduto=`,
            'headers': { 'Cookie': inf.aut }
        }; let retApi = await api(infApi); if (!retApi.ret) {
            let err = `[apiNire] FALSE: retApi`
            console.log(err);
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': retApi }
            retLog = await log(infLog);
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
            let err = `[apiNire] NIRE_INVALIDO`
            // console.log(err);
            infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': texto }
            retLog = await log(infLog);
            ret['msg'] = `NIRE inválido`;
            ret['ret'] = true;
        } else {
            // ### ENCONTROU: SIM | PEGAR O CNPJ DO NIRE
            infRegex = { 'pattern': 'ctl00_cphContent_frmPreVisualiza_lblCnpj\\">(.*?)<', 'text': texto }
            retRegex = regex(infRegex);
            if (!retRegex.ret || !retRegex.res['1']) {
                ret['msg'] = `CNPJ do NIRE não encotrado`;
                ret['ret'] = true;
                let err = `[apiNire] ${ret.msg}`
                // console.log(err);
                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': texto }
                retLog = await log(infLog);
            } else {
                let cnpj = retRegex.res['1'].replace(/[^0-9]/g, '')

                // PEGAR A RAZÃO SOCIAL
                infRegex = { 'pattern': 'titulo-azul16-01\\">(.*?)<', 'text': texto }
                retRegex = regex(infRegex);
                if (!retRegex.ret || !retRegex.res['1']) {
                    ret['msg'] = `Razão Social do CNPJ não encontrada`;
                    ret['ret'] = true;
                    let err = `[apiNire] ${ret.msg}`
                    // console.log(err);
                    infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': texto }
                    retLog = await log(infLog);
                } else {
                    let razaoSocial = retRegex.res['1']

                    // PEGAR TIPO DE EMPRESA DO CNPJ
                    infRegex = { 'pattern': 'ctl00_cphContent_frmPreVisualiza_lblDetalhes\\">(.*?)<', 'text': texto }
                    retRegex = regex(infRegex);
                    if (!retRegex.ret || !retRegex.res['1']) {
                        ret['msg'] = `Tipo de empresa do CNPJ não encontrada`;
                        ret['ret'] = true;
                        let err = `[apiNire] ${ret.msg}`
                        // console.log(err);
                        infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': texto }
                        retLog = await log(infLog);
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
                                ret['msg'] = `Data do CNPJ não encontrada`;
                                ret['ret'] = true;
                                let err = `[apiNire] ${ret.msg}`
                                // console.log(err);
                                infLog = { 'e': e, 'folder': 'Registros', 'path': `${err}.txt`, 'text': texto }
                                retLog = await log(infLog);
                            } else {
                                let data = retRegex.res['1']
                                if (data !== inf.date) {
                                    ret['msg'] = `DATA ERRADA ${data}`;
                                    ret['ret'] = true;
                                } else {
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

        // ### LOG FUN ###
        if (inf && inf.logFun) {
            let infFile = { 'e': e, 'action': 'write', 'functionLocal': false, 'logFun': new Error().stack, 'path': 'AUTO', }, retFile
            infFile['rewrite'] = false; infFile['text'] = { 'inf': inf, 'ret': ret }; retFile = await file(infFile);
        }
    } catch (e) {
        let retRegexE = await regexE({ 'inf': inf, 'e': e, 'catchGlobal': false });
        ret['msg'] = retRegexE.res

        let err = `[apiNire] TRYCATCH Script erro!`
        let infSendData = { 'e': e, 'stop': true, 'status1': err }
        let retSendData = await sendData(infSendData)
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}

if (eng) { // CHROME
    window['apiNire'] = apiNire;
} else { // NODEJS
    global['apiNire'] = apiNire;
}

