async function serverRunNew() {
    let _fs_2 = await import('fs');

    // ARQUIVO TEMP: APAGAR
    function delFileCurrentTemp(inf) {
        (async () => {
            try {
                await new Promise(resolve => { setTimeout(resolve, 2000); });
                await _fs_2.promises.unlink(inf);
            } catch { }
        })();
    }

    let argvs = process.argv;

    // → d:\ARQUIVOS\PROJETOS\WebScraper\src\serverC6_New2.js
    let fileCurrentPath = argvs[1];

    // → serverC6_New2
    let fileCurrentWithoutExtension = fileCurrentPath.split('\\').reverse()[0].replace('.js', '');

    // → serverC6
    let fileTargetWithoutExtension = fileCurrentWithoutExtension.split('_New')[0];

    // → \src
    let folderTarget = `\\src`;

    // → \src\serverC6
    let fileTargetPathRelativeWithoutExtension = `${folderTarget}\\${fileTargetWithoutExtension}`;

    // → serverC6_New2_TEMP.js
    let fileTempWithExtension = `${fileCurrentWithoutExtension}_TEMP.js`;

    // → \src\serverC6_New2_TEMP.js
    let fileTempPathRelativeWithExtension = `${folderTarget}\\${fileTempWithExtension}`;

    // -----------------------------------

    // CONTEÚDO DO ARQUIVO ALGO: LER
    let fileTargetContent = await _fs_2.promises.readFile(`.\\${fileTargetPathRelativeWithoutExtension}.js`, 'utf8');

    // CONTEÚDO DO ARQUIVO ALVO: ESCREVER
    await _fs_2.promises.writeFile(`.\\${fileTempPathRelativeWithExtension}`, fileTargetContent, { 'flag': 'w', });

    // ARQUIVO TEMPORÁRIO: EXECUTAR (COM O CONTÉUDO DO ARQUIVO ALVO)
    await import(`./${fileTempWithExtension}`);

    // ARQUIVO TEMP: x SEGUNDOS
    setTimeout(() => {
        delFileCurrentTemp(`.\\${fileTempPathRelativeWithExtension}`);
    }, 3000);

}
// TODAS AS FUNÇÕES PRIMÁRIAS DO 'server.js' / 'serverC6.js' / 'serverJsf.js' DEVEM SE CHAMAR 'serverRun'!!!
serverRunNew();


