let e = import.meta.url, ee = e;
async function moveLeadsMaquinas(inf = {}) {
    let ret = { 'ret': false, }; e = inf.e || e;
    try {
        // let { text = 'aaa', folder = 'bbb', } = inf;

        let infGoogleSheets, retGoogleSheets, maquinaManualCnpjsRes;

        let idScript2 = '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8'; let idMaquinas = '1Rj_eyyhJtwY-XyEoNYeOAQ_nESrtmskPNyCLO0bTRak'; let leadsMax = 5;

        // MANTER APENAS NÚMERO MAIORES QUE ZERO E ÚNICOS
        function cleanNumbers(arrayMaster, ...otherArrays) {
            let seen = new Set(); let excludeSet = new Set(); for (let arr of otherArrays) { arr.forEach(v => { let n = Number(v); if (Number.isFinite(n) && n > 0) { excludeSet.add(n); } }); } return arrayMaster
                .map(v => Number(v)).filter(v => {
                    if (!Number.isFinite(v)) { return false; } if (v <= 0) { return false; } if (seen.has(v)) { return false; } if (excludeSet.has(v)) { return false; } seen.add(v); return true;
                });
        }

        // --- --- --- --- --- --- --- --- --- --- [SCRIPT2] --- --- --- --- --- --- --- --- --- ---
        // [MAQUINA_MANUAL] PEGAR RES (CONCAT)
        infGoogleSheets = { e, 'action': 'get', 'id': `${idScript2}`, 'tab': `MAQUINA_MANUAL`, 'range': `P2:P${leadsMax + 1}`, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; } let maquinaManualRes = retGoogleSheets.res ? retGoogleSheets.res.flat() : [];

        // [MAQUINA_MANUAL] PEGAR CNPJs
        infGoogleSheets = { e, 'action': 'get', 'id': `${idScript2}`, 'tab': `MAQUINA_MANUAL`, 'range': `D2:D${leadsMax + 1}`, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; } let maquinaManualCnpjs = retGoogleSheets.res ? retGoogleSheets.res.flat() : [];
        if (maquinaManualRes.length !== leadsMax && maquinaManualCnpjs.length !== 0 && (maquinaManualRes.length !== maquinaManualCnpjs.length)) {
            console.log(`${maquinaManualRes.length || 0} LEADS PARA SEREM ENVIADOS PARA [MÁQUINAS 2025] ❌`); return;
        }
        console.log(`${maquinaManualRes.length} LEADS PARA SEREM ENVIADOS PARA [MÁQUINAS 2025] ✅`);

        // JUNTAR CNPJ E RES
        maquinaManualCnpjsRes = maquinaManualCnpjs.map((v, i) => { return [Number(v), maquinaManualRes[i],]; });
        let lastIndex = -1; for (let i = 0; i < maquinaManualCnpjsRes.length; i++) { if (maquinaManualCnpjsRes[i][1] && maquinaManualCnpjsRes[i][1].toString().trim() !== '') { lastIndex = i; } }
        maquinaManualCnpjsRes = maquinaManualCnpjsRes.slice(0, lastIndex + 1); // console.log(maquinaManualCnpjsRes);

        // --- --- --- --- --- --- --- --- --- --- [MÁQUINAS 2025] --- --- --- --- --- --- --- --- --- ---
        // [MÁQUINAS] PEGAR CNPJs
        infGoogleSheets = { e, 'action': 'get', 'id': `${idMaquinas}`, 'tab': `INDICAÇÕES`, 'range': `B2:B`, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; } let leadsMaquinas = cleanNumbers(retGoogleSheets.res ? retGoogleSheets.res.flat() : []);
        // console.log(leadsMaquinas);

        // →→→ LEADS QUE PRECISAM SER ENVIADOS DA [SCRIPT 2] PARA [MÁQUINAS 2025] | FORMATAR DADOS E MANDAR
        if (maquinaManualCnpjsRes.length > 0) {
            maquinaManualCnpjsRes = maquinaManualCnpjsRes.filter(row => { return !leadsMaquinas.includes(row[0]) && row[1].includes('INDICAÇÃO MÁQUINA OK'); });
            maquinaManualCnpjsRes = maquinaManualCnpjsRes.map(row => {
                let cnpj = row[0]; let partes = row[1].split('-:-');
                return [
                    { 'value': `${partes[1].split(' ')[0]}/2025`, }, // DATA SCRIPT
                    { 'value': `${cnpj}`, },                         // CNPJ
                    { 'value': `${partes[4]}`, },                    // RAZÃO SOCIAL
                    { 'value': `${partes[5]}`, },                    // TELEFONE
                    { 'value': `${partes[6]}`, },                    // TELEFONE MASTER
                ];
            }); // console.log(maquinaManualCnpjsRes);
            infGoogleSheets = { e, 'action': 'addInNewLine', 'id': `${idMaquinas}`, 'tab': `INDICAÇÕES`, 'values': maquinaManualCnpjsRes, };
            retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; }
        }

        // LIMPAR LEADS JÁ PROCESSADOS NA [SCRIPT 2]
        infGoogleSheets = { e, 'action': 'send', 'id': `${idScript2}`, 'range': `MAQUINA_MANUAL!D2`, 'values': Array.from({ 'length': leadsMax, }, () => ['',]), 'isCol': true, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; }

        infGoogleSheets = { e, 'action': 'send', 'id': `${idScript2}`, 'range': `MAQUINA_MANUAL!P2`, 'values': Array.from({ 'length': leadsMax, }, () => ['',]), 'isCol': true, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; }

        // PEGAR [CNPJs]
        infGoogleSheets = { e, 'action': 'get', 'id': `${idMaquinas}`, 'tab': `CNPJs`, 'range': `A2:A${leadsMax + 1}`, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; } let maquinasCnpjs = cleanNumbers(retGoogleSheets.res ? retGoogleSheets.res.flat() : []);
        if (maquinasCnpjs.length === 0) { return; }

        // PEGAR LEADS [MÁQUINAS]
        infGoogleSheets = { e, 'action': 'get', 'id': `${idMaquinas}`, 'tab': `INDICAÇÕES`, 'range': `B2:B`, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; }
        let newLeads = cleanNumbers(maquinasCnpjs, retGoogleSheets.res ? retGoogleSheets.res.flat() : []).map(v => [v,]);
        console.log(`NOVAS MÁQUINAS PARA INDICAR ${newLeads.length}`);

        // --- --- --- --- --- --- --- --- --- --- [SCRIPT2] --- --- --- --- --- --- --- --- --- ---
        // MANDAR NOVOS LEADS PARA SEREM INDICADOS
        if (newLeads.length !== 0) {
            infGoogleSheets = { e, 'action': 'send', 'id': `${idScript2}`, 'range': `MAQUINA_MANUAL!D2`, 'values': newLeads, 'isCol': true, };
            retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; }
        }

        // REMOVER CNPJS QUE JÁ FORAM VERIFICADOS
        infGoogleSheets = { e, 'action': 'deleteLines', 'linStart': 2, 'linesQtd': leadsMax, 'id': `${idMaquinas}`, 'tab': '4152275', };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; }

        ret['msg'] = `MOVE LEADS MAQUINAS`;
        ret['ret'] = true;

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['moveLeadsMaquinas'] = moveLeadsMaquinas;


