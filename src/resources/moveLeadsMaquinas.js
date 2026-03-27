let e = import.meta.url, ee = e;
async function moveLeadsMaquinas(inf = {}) {
    let ret = { 'ret': false, }; e = inf.e || e;
    try {
        // let { text = 'aaa', folder = 'bbb', } = inf;

        let infGoogleSheets, retGoogleSheets, maquinaManualCnpjsRes;

        let idScript2 = '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8'; let idMaquinas = '1Rj_eyyhJtwY-XyEoNYeOAQ_nESrtmskPNyCLO0bTRak';

        // --- --- --- --- --- --- --- --- --- --- [SCRIPT2] --- --- --- --- --- --- --- --- --- ---
        // [MAQUINA_MANUAL] PEGAR RES (CONCAT)
        infGoogleSheets = { e, 'action': 'get', 'id': `${idScript2}`, 'tab': `MAQUINA_MANUAL`, 'range': `P2:P`, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; } let maquinaManualRes = retGoogleSheets.res ? retGoogleSheets.res.map(v => v[0] ?? '') : [];

        // DECIDIR SE DEVE CONTINUAR
        let qtdWithStatus = maquinaManualRes.filter(v => v !== '' && v !== undefined).length; await logConsole({ e, ee, 'txt': `${qtdWithStatus > 0 ? '✅' : '❌'} LEADS COM STATUS [MAQUINA_MANUAL]: ${qtdWithStatus}`, });
        if (qtdWithStatus < 1) { return; }

        // [MAQUINA_MANUAL] PEGAR CNPJs
        infGoogleSheets = { e, 'action': 'get', 'id': `${idScript2}`, 'tab': `MAQUINA_MANUAL`, 'range': `D2:D`, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; } let maquinaManualCnpjs = retGoogleSheets.res ? retGoogleSheets.res.map(v => v[0] ?? '') : [];

        // JUNTAR CNPJ E RES
        maquinaManualCnpjsRes = maquinaManualRes.map((v, i) => [maquinaManualCnpjs[i], ...(v ? v.split('-:-').slice(1) : []),]);

        // FILTRAR APENAS POR LINHAS QUE TÊM O CNPJ E STATUS
        maquinaManualCnpjsRes = maquinaManualCnpjsRes.filter(v => v.length >= 7 && v.every(x => x !== '' && x !== undefined));

        // DECIDIR SE DEVE CONTINUAR
        let qtdSend = maquinaManualCnpjsRes.length; await logConsole({ e, ee, 'txt': `${qtdSend > 0 ? '✅✅' : '❌❌'} LEADS PRONTOS PRA ENVIAR PARA [MÁQUINAS 2026]: ${qtdSend}`, });
        if (qtdSend < 1) { return; }

        // --- --- --- --- --- --- --- --- --- --- [MÁQUINAS 2026] --- --- --- --- --- --- --- --- --- ---
        // [MÁQUINAS] PEGAR {DATA DO IMPUT} E {CNPJ} 
        infGoogleSheets = { e, 'action': 'get', 'id': `${idMaquinas}`, 'tab': `INDICAÇÕES`, 'range': `A2:B`, };
        retGoogleSheets = await googleSheets(infGoogleSheets); if (!retGoogleSheets.ret) { return retGoogleSheets; } let leadsIndicacoes = retGoogleSheets.res || []; let leadsMaquinaManual = maquinaManualCnpjsRes;

        // FILTRAR APENAS POR LEADS CUJO A DATA E CNPJ NÃO SÃO INVÁLIDOS
        leadsIndicacoes = leadsIndicacoes.filter(l => /^\d{2}\/\d{2}/.test(l[0])).map(l => {
            let cnpj = String(l[1]).replace(/\D/g, ''); while (cnpj.length < 14) { cnpj = '0' + cnpj; } return [l[0], cnpj,];
        }).filter(l => /^\d{14}$/.test(l[1]));

        // FILTRAR APENAS POR LINHAS QUE O LEAD (CNPJ+DATA) AINDA NÃO ESTÁ EM [MÁQUINAS 2026] E O STATUS DA INDICAÇÃO É 'INDICAÇÃO MÁQUINA OK' (SE JÁ ESTIVER SÓ MANDA SE A DATA DE INDICAÇÃO FOR MAIS NOVA)
        // let leadsSend = leadsMaquinaManual.filter(m => {
        //     let cnpj = m[0];
        //     let diaMes = m[1].slice(0, 5); // ex: '21/10'
        //     return m[2] === 'INDICAÇÃO MÁQUINA OK' &&
        //         !leadsIndicacoes.some(i => {
        //             let diaMesInd = i[0].slice(0, 5);
        //             return i[1] === cnpj && diaMes.includes(diaMesInd);
        //         });
        // });
        let leadsSend = leadsMaquinaManual.filter(m => {
            let cnpj = m[0];
            let diaMes = m[1].slice(0, 5); // ex: '21/10'
            let [d, m_,] = diaMes.split('/').map(Number);
            let dataAtual = new Date(new Date().getFullYear(), m_ - 1, d);

            return m[2] === 'INDICAÇÃO MÁQUINA OK' &&
                !leadsIndicacoes.some(i => {
                    let [dInd, mInd,] = i[0].slice(0, 5).split('/').map(Number);
                    let dataExistente = new Date(new Date().getFullYear(), mInd - 1, dInd);

                    // Se CNPJ igual E data de lá for igual ou mais nova que a atual, bloqueia o envio
                    return i[1] === cnpj && dataExistente >= dataAtual;
                });
        });


        // DECIDIR SE DEVE CONTINUAR
        let qtdLeadsSend = leadsSend.length; await logConsole({ e, ee, 'txt': `${qtdLeadsSend > 0 ? '✅✅✅' : '❌❌❌'} LEADS QUE VÃO SER ENVIADOS PARA [MÁQUINAS 2026]: ${qtdLeadsSend}`, });
        if (qtdLeadsSend < 1) { return; }

        // FORMATAR DADOS E MANDAR
        leadsSend = leadsSend.map(row => {
            return [
                { 'value': `${row[1].split(' ')[0]}/2026`, }, // DATA SCRIPT
                { 'value': `${row[0].padStart(14, '0')}`, },  // CNPJ
                { 'value': `${row[4]}`, },                    // RAZÃO SOCIAL
                { 'value': `${row[6]}`, },                    // TELEFONE MASTER
                { 'value': `${row[5]}`, },                    // TELEFONE
            ];
        });
        infGoogleSheets = { e, 'action': 'addInNewLine', 'id': `${idMaquinas}`, 'tab': `INDICAÇÕES`, 'values': leadsSend, };
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


