// let infScreenshot, retScreenshot;
// infScreenshot = { e, page, 'fullPage': true, 'fileName': `screenshot`, };
// retScreenshot = await screenshot(infScreenshot); console.log(retScreenshot);

let e = import.meta.url, ee = e;
async function screenshot(inf = {}) {
    let ret = { 'ret': false, }; e = inf.e || e;
    try {
        let { page = false, fullPage = true, fileName = false, awaitPageFinish = true, } = inf;

        if (!page) {

            ret['msg'] = `SCREENSHOT: ERRO | INFORMAR O 'page'`;

        } else if (!fileName) {

            ret['msg'] = `SCREENSHOT: ERRO | INFORMAR O 'fileName'`;

        } else {

            let time = dateHour().res;
            let mon = `MES_${time.mon}_${time.monNam}`;
            let day = `DIA_${time.day}`;
            let monDay = `${mon}/${day}`;
            let cloneProject = gW.cloneProject.replace('server', ''); let pathOk = '';

            let byHour = fileName !== `screenshot`;

            if (!byHour) {
                fileName = `${cloneProject}_${fileName}`;
            } else {

                let min = `${time.min}`;
                let sec = `${time.sec}`;
                let mil = `${time.mil}`;
                let hou = `${time.hou}`;
                pathOk = `${monDay}/${hou}.00-${hou}.59/${cloneProject}/${hou}.${min}.${sec}.${mil}`;

            }

            // 'byHour' [NAO] → logs/Registros/C6_New2_nomePrint.png
            // 'byHour' [SIM] → logs/Registros/MES_04_ABR/DIA_12/10.00-10.59/C6_New2/10.33.52.300_nomePrint.png
            pathOk = `logs/Registros/${!byHour ? `` : `${pathOk}_`}${fileName}.png`;

            // CRIAR PASTA
            if (byHour) { let r = await file({ 'action': 'write', 'path': `${pathOk.replace(pathOk.split('/').reverse()[0], '')}#_Z_#.txt`, 'content': `${pathOk}\n`, 'add': true, }); if (!r.ret) { return r; } }

            // ESPERAR A PÁGINA TERMINAR DE CARREGAR TODOS OS ELEMENTOS
            if (awaitPageFinish) {
                await page.evaluate((tempo) => {
                    return new Promise((resolve) => {
                        let timeout; let obs = new MutationObserver(() => { clearTimeout(timeout); timeout = setTimeout(() => { obs.disconnect(); resolve(); }, (1 * 1000)); });
                        obs.observe(document.body, { attributes: true, childList: true, subtree: true, characterData: true, }); timeout = setTimeout(() => { obs.disconnect(); resolve(); }, tempo);
                    });
                }, (awaitPageFinish * 1000));
            }

            try {
                await page.screenshot({ 'path': pathOk, fullPage, });
            } catch {
                await page.screenshot({ 'path': pathOk, 'fullPage': false, });
            }

            ret['res'] = pathOk;
            ret['msg'] = `SCREENSHOT: OK`;
            ret['ret'] = true;

        }

    } catch (catchErr) {
        let retRegexE = await regexE({ inf, 'e': catchErr, }); ret['msg'] = retRegexE.res; ret['ret'] = false; delete ret['res'];
    }

    return { ...({ 'ret': ret.ret, }), ...(ret.msg && { 'msg': ret.msg, }), ...(ret.hasOwnProperty('res') && { 'res': ret.res, }), };
}

// CHROME | NODE
globalThis['screenshot'] = screenshot;


