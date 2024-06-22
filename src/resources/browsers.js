// let infBrowsers, retBrowsers
// infBrowsers = { 'e': e, 'project': 'C6', 'browser': 'browser', }; // REGISTRAR O ENDPOINT
// infBrowsers = { 'e': e, 'project': 'C6', 'close': true }; // FECHAR OS BROWSERS
// retBrowsers = await browsers(infBrowsers); console.log(retBrowsers)

let e = import.meta.url, ee = e;
async function browsers(inf) {
    let ret = { 'ret': false }; e = inf && inf.e ? inf.e : e;
    try {
        let { project, path, browser, close } = inf

        let endPointsFile = `log/browsersEndPoints${project}.json`;
        let browsersEndPoint = [];

        // SALVAR O ENDPOINT ATUAL
        if (!close) {
            if (_fs.existsSync(endPointsFile)) {
                let fileContent = _fs.readFileSync(endPointsFile, 'utf8');
                browsersEndPoint = fileContent ? JSON.parse(fileContent) : [];
            }
            browsersEndPoint = Array.from(new Set(browsersEndPoint.concat([browser.wsEndpoint()])));
            _fs.writeFileSync(endPointsFile, JSON.stringify(browsersEndPoint));

        }

        // ENCERRAR OS BROWSERS
        if (close) {
            if (_fs.existsSync(endPointsFile)) {
                browsersEndPoint = JSON.parse(_fs.readFileSync(endPointsFile, 'utf8'))
                for (let [index, value] of browsersEndPoint.entries()) {
                    try {
                        let browserCloser = await _puppeteer.connect({ 'browserWSEndpoint': value });
                        await browserCloser.close();
                        console.log('FECHADO', value)
                    } catch (eee) { }
                };
                _fs.writeFileSync(endPointsFile, '[]');
                //  console.log(`FECHADO(s): ${browsersEndPoint.length}`)
            }

            // ENCERRAR O SCRIPT
            if (path) {
                await new Promise(resolve => { setTimeout(resolve, 3000) });
                let infCommandLine, retCommandLine
                infCommandLine = { 'e': e, 'command': `${path} FORCE_STOP` }
                retCommandLine = await commandLine(infCommandLine);
                await new Promise(resolve => { setTimeout(resolve, 10000) });
                process.exit();
            }

            ret['res'] = `FECHADO(s): ${browsersEndPoint.length}`
        }

        ret['msg'] = `BROWSERS: OK`;
        ret['ret'] = true;

    } catch (catchErr) {
        let retRegexE = await regexE({ 'inf': inf, 'e': catchErr, });
        ret['msg'] = retRegexE.res
    };
    return {
        ...({ ret: ret.ret }),
        ...(ret.msg && { msg: ret.msg }),
        ...(ret.res && { res: ret.res }),
    };
}

if (eng) { // CHROME
    window['browsers'] = browsers;
} else { // NODEJS
    global['browsers'] = browsers;
}

