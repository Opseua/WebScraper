// let infApiNire, retApiNire // 'logFun': true,
// infApiNire = {e, 'nire': '35132685930', 'aut': 'ASP.NET_SessionId=wivpxhlq3b45tgtb12dcgk4t' }
// retApiNire = await apiNire(infApiNire)
// console.log(retApiNire)

let e = import.meta.url, ee = e;
async function apiNire(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { nire = '12345678', aut = 'ASP.NET_SessionId=aaaaaaaaaaaa', date, } = inf;
        let infRegex, retRegex, infLog;

        for (let [index, value,] of aut.entries()) {
            if (value.name === 'ASP.NET_SessionId') {
                aut = `ASP.NET_SessionId=${value.value}`;
                break;
            }
        }

        // API
        let infApi = {
            e, 'method': 'GET', 'url': `https://www.jucesponline.sp.gov.br/Pre_Visualiza.aspx?nire=${nire}&idproduto=`,
            'headers': { 'Cookie': aut, },
        };
        let retApi = await api(infApi); if (!retApi.ret) {
            let errMsg = `% FALSE: retApi`;
            logConsole({ e, ee, 'msg': `${errMsg}`, });
            infLog = { e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': retApi, };
            await log(infLog);
            return retApi;
        } else { retApi = retApi.res; }

        // CHECAR SE A API DEU CÓDIGO 200
        if (retApi.code !== 200) {
            return retApi;
        }

        // CHECAR SE O COOKIE EXPIROU
        let texto = JSON.stringify(retApi.body);
        if (texto.includes('CaptchaImage')) {
            ret['msg'] = `Cookie inválido!`;
            return ret;
        }

        // CHECAR SE ENCONTROU NO BODY UM NIRE VÁLIDO (CNPJ JÁ ESTÁ AQUI)
        if (!texto.includes('ctl00_cphContent_frmPreVisualiza_lblCnpj') && !texto.includes('mas houve um problema em nosso servidor')) {
            // ### ENCONTROU: NÃO
            let errMsg = `% NIRE_INVALIDO`;
            logConsole({ e, ee, 'msg': `${errMsg}`, });
            infLog = { e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': texto, };
            await log(infLog);
            ret['msg'] = `NIRE inválido`;
            ret['ret'] = true;
        } else {
            // ### ENCONTROU: SIM | PEGAR O CNPJ DO NIRE
            infRegex = { e, 'pattern': 'ctl00_cphContent_frmPreVisualiza_lblCnpj\\">(.*?)<', 'text': texto, };
            retRegex = regex(infRegex);
            if (!retRegex.ret || !retRegex.res['1']) {
                ret['msg'] = `CNPJ do NIRE não encotrado`;
                ret['ret'] = true;
                let errMsg = `% ${ret.msg}`;
                logConsole({ e, ee, 'msg': `${errMsg}`, });
                infLog = { e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': texto, };
                await log(infLog);
            } else {
                let cnpj = retRegex.res['1'].replace(/[^0-9]/g, '');

                // PEGAR A RAZÃO SOCIAL
                infRegex = { e, 'pattern': 'titulo-azul16-01\\">(.*?)<', 'text': texto, };
                retRegex = regex(infRegex);
                if (!retRegex.ret || !retRegex.res['1']) {
                    ret['msg'] = `Razão Social do CNPJ não encontrada`;
                    ret['ret'] = true;
                    let errMsg = `% ${ret.msg}`;
                    logConsole({ e, ee, 'msg': `${errMsg}`, });
                    infLog = { e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': texto, };
                    await log(infLog);
                } else {
                    let razaoSocial = retRegex.res['1'];

                    // PEGAR TIPO DE EMPRESA DO CNPJ
                    infRegex = { e, 'pattern': 'ctl00_cphContent_frmPreVisualiza_lblDetalhes\\">(.*?)<', 'text': texto, };
                    retRegex = regex(infRegex);
                    if (!retRegex.ret || !retRegex.res['1']) {
                        ret['msg'] = `Tipo de empresa do CNPJ não encontrada`;
                        ret['ret'] = true;
                        let errMsg = `% ${ret.msg}`;
                        logConsole({ e, ee, 'msg': `${errMsg}`, });
                        infLog = { e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': texto, };
                        await log(infLog);
                    } else {
                        let tipo = retRegex.res['1'];

                        let mei = `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}`;
                        mei = razaoSocial.includes(mei);
                        if (mei) {
                            ret['msg'] = `MEI`;
                            ret['ret'] = true;
                        } else {
                            // PEGAR DATA DE EMPRESA DO CNPJ
                            infRegex = { e, 'pattern': 'ctl00_cphContent_frmPreVisualiza_lblAtividade\\">(.*?)<', 'text': texto, };
                            retRegex = regex(infRegex);
                            if (!retRegex.ret || !retRegex.res['1']) {
                                ret['msg'] = `Data do CNPJ não encontrada`;
                                ret['ret'] = true;
                                let errMsg = `% ${ret.msg}`;
                                logConsole({ e, ee, 'msg': `${errMsg}`, });
                                infLog = { e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': texto, };
                                await log(infLog);
                            } else {
                                let data = retRegex.res['1'];
                                if (data !== date) {
                                    ret['msg'] = `DATA ERRADA ${data}`;
                                    ret['ret'] = true;
                                } else {
                                    ret['res'] = [cnpj, data,];
                                    ret['msg'] = `API NIRE: OK`;
                                    ret['ret'] = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];

        let errMsg = `% TRYCATCH Script erro!`;
        let infSendData = { e, 'stop': true, 'status1': errMsg, };
        await sendData(infSendData);
    };

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
};

// CHROME | NODEJS
(eng ? window : global)['apiNire'] = apiNire;


