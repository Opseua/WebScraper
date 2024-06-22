// await import('./resources/@export.js'); // NÃO HABILITAR!!!

let e = import.meta.url, ee = e;
async function serverRunNew(inf) {
    let _fs_2 = await import('fs'); const { spawn } = await import('child_process'); let _spawn_2 = spawn

    // ARQUIVO ATUAL/TEMP: PATH
    let fileCurrentTemp = /\/src\/(.+)$/.exec(e)[1]; fileCurrentTemp = fileCurrentTemp.split('New'); fileCurrentTemp = [fileCurrentTemp[0], fileCurrentTemp[1].replace('.js', '')]

    // CONTEÚDO server: LER
    let fileServer = await _fs_2.promises.readFile(`./src/${fileCurrentTemp[0]}.js`, 'utf8');

    // CONTEÚDO server: ESCREVER
    fileCurrentTemp = `./src/${fileCurrentTemp[0]}${fileCurrentTemp[1]}_TEMP.js`
    await _fs_2.promises.writeFile(fileCurrentTemp, fileServer, { flag: 'w' })

    // ARQUIVO TEMP: APAGAR
    function delFileCurrentTemp() {
        (async () => {
            await new Promise(resolve => { setTimeout(resolve, 2000) });
            await _fs_2.promises.unlink(fileCurrentTemp)
        })()
    }

    // ARQUIVO TEMP: EXECUTAR
    let newProcess = _spawn_2('node', [fileCurrentTemp]);

    // ARQUIVO TEMP: CONSOLES
    newProcess.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    // ARQUIVO TEMP: ERRO
    newProcess.stderr.on('error', (data) => {
        console.error(`ERRO:\n${data}`);
        delFileCurrentTemp()
    });

    // ARQUIVO TEMP: ENCERRADO
    newProcess.on('close', (data) => {
        console.error(`ENCERRADO [código]:\n${data}`);
        delFileCurrentTemp()
    });
}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRunNew()


// let googleSheetsId, retGetPath = await getPath({ 'e': new Error() }); if (!retGetPath.ret) { return retGetPath }; retGetPath = (retGetPath.res instanceof Array) ? retGetPath.res[4] : retGetPath.res.file
// googleSheetsId = !retGetPath.includes('_TEMP.js') && !retGetPath.includes('Test.js') ? '1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc' : '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8';
// console.log(googleSheetsId)