// let infApiCnpj, retApiCnpj
// infApiCnpj = {e, 'cnpj': '52957711000152' }
// retApiCnpj = await apiCnpj(infApiCnpj)
// console.log(retApiCnpj)

let e = import.meta.url, ee = e;
async function apiCnpj(inf = {}) {
    let ret = { 'ret': false, }; e = inf && inf.e ? inf.e : e;
    try {
        let { token = gO.inf.token, } = inf;
        let infApi, retApi, infLog;

        infApi = { e, 'method': 'GET', 'url': `https://api.cnpja.com/office/${inf.cnpj.replace(/[^0-9]/g, '')}`, 'headers': { 'Authorization': token, }, 'object': true, };
        retApi = await api(infApi); if (!retApi.ret || !retApi.res.body.includes('updated')) {
            let errMsg = `% FALSE: retApi`;
            logConsole({ e, ee, 'txt': `${errMsg}`, }); infLog = { e, 'folder': 'Registros', 'path': `${errMsg}.txt`, 'text': retApi, }; await log(infLog); return retApi;
        } else { retApi = retApi.res.body; }

        // CRIAÇÃO
        let criacao = !retApi.updated ? 'null' : retApi.updated;
        if (criacao !== 'null') {
            let time2 = new Date(criacao);
            time2.setHours(time2.getHours());
            let day = ('0' + time2.getDate()).slice(-2);
            let mon = ('0' + (time2.getMonth() + 1)).slice(-2);
            let hou = ('0' + time2.getHours()).slice(-2);
            let min = ('0' + time2.getMinutes()).slice(-2);
            let sec = ('0' + time2.getSeconds()).slice(-2);
            criacao = `${day}/${mon} ${hou}:${min}:${sec}`;
        }

        let razaoSocial = !retApi.company.name ? 'null' : retApi.company.name;

        // TELEFONE
        let telefones = retApi.phones[0] || retApi.phones[1] ? '' : 'null';
        if (retApi.phones[0] && retApi.phones[0].area) {
            telefones = `55${retApi.phones[0].area}9${retApi.phones[0].number.replace(/[^0-9]/g, '')}`;
        }
        if (retApi.phones[1] && retApi.phones[1].area) {
            telefones = `${telefones} 55${retApi.phones[1].area}9${retApi.phones[1].number.replace(/[^0-9]/g, '')} / `;
        }
        let telefone1 = retApi.phones[0] ? `55${retApi.phones[0].area}9${retApi.phones[0].number.replace(/[^0-9]/g, '')}` : 'null';
        let telefone2 = retApi.phones[1] ? `55${retApi.phones[1].area}9${retApi.phones[1].number.replace(/[^0-9]/g, '')}` : 'null';

        // EMAIL
        let email = retApi.emails[0] || retApi.emails[1] ? '' : 'null';
        if (retApi.emails[0] && retApi.emails[0].address) {
            email = `${email} ${retApi.emails[0].address} / `;
        }
        if (retApi.emails[1] && retApi.emails[1].address) {
            email = `${email} ${retApi.emails[1].address} / `;
        }
        let email1 = retApi.emails[0] ? `${retApi.emails[0].address}` : 'null';
        let email2 = retApi.emails[1] ? `${retApi.emails[1].address}` : 'null';

        // GESTOR
        let gestor = retApi.company.members[0] || retApi.company.members[1] ? '' : 'null';
        if (retApi.company.members[0] && retApi.company.members[0].person && retApi.company.members[0].person.name) {
            gestor = `${gestor} ${retApi.company.members[0].person.name} / `;
        }
        if (retApi.company.members[1] && retApi.company.members[1].person && retApi.company.members[1].person.name) {
            gestor = `${gestor} ${retApi.company.members[1].person.name} / `;
        }
        let gestor1 = retApi.company.members[0] && retApi.company.members[0].person ? retApi.company.members[0].person.name : 'null';
        let gestor2 = retApi.company.members[1] && retApi.company.members[1].person ? retApi.company.members[1].person.name : 'null';
        let endLogradouro = 'null';
        let endNome = !retApi.address.street ? 'null' : retApi.address.street;
        let endNumero = !retApi.address.number ? 'null' : retApi.address.number;
        let endBairro = !retApi.address.district ? 'null' : retApi.address.district;
        let endMunicipio = !retApi.address.city ? 'null' : retApi.address.city;
        let endEstado = !retApi.address.state ? 'null' : retApi.address.state;
        let endCep = !retApi.address.zip ? 'null' : retApi.address.zip;
        let endereco = {
            endLogradouro,
            endNome,
            endNumero,
            endBairro,
            endMunicipio,
            endEstado,
            endCep,
        };

        // RES
        let res = {
            criacao,
            'cnpj': retApi.taxId,
            razaoSocial,
            telefones,
            telefone1,
            telefone2,
            email,
            email1,
            email2,
            gestor,
            gestor1,
            gestor2,
            endereco,
        };
        ret['res'] = res;
        ret['msg'] = 'API CNPJ: OK';
        ret['ret'] = true;
    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
        let errMsg = `% TRYCATCH Script erro!`; let infSendData = { e, 'stop': true, 'status1': errMsg, }; await sendData(infSendData);
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.res && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['apiCnpj'] = apiCnpj;


