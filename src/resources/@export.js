globalThis['eng'] = (typeof globalThis.alert !== 'undefined'); // [true] CHROME | [false] NODE

// DEFINIR O 'devChildren' → [CHROME] EMAIL DO USUÁRIO | [NODE] PRIMEIRO ARQUIVO A SER EXECUTADO (NA MAIORIA DOS CASOS 'server')
let devC = new Error().stack.split('\n'); devC = devC[devC.length - 1]; let devChildren = devC.includes('.js:') ? devC.match(/\/([^/]+)\.[^/]+$/)[1] : false;
if (eng) { devChildren = await new Promise((resolve) => { chrome.identity.getProfileUserInfo(function (u) { resolve(u.email); }); }); }

// @functions
await import(`../../../${process.env.fileChrome_Extension.split('PROJETOS\\')[1]}/src/resources/@functions.js`);

// DEFINIR → LETTER | ROOT | FUNCTION | PROJECT | FILE | LINE
await getPath({ 'e': new Error(), devChildren, });

/* FUNÇÕES */ let project = gW.project;
globalThis['apiCnpj'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/apiCnpj.js`, inf, project, }); };
globalThis['apiNire'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/apiNire.js`, inf, project, }); };
globalThis['awaitLoad'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/awaitLoad.js`, inf, project, }); };
globalThis['buttonElement'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/buttonElement.js`, inf, project, }); };
globalThis['checkPage'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/checkPage.js`, inf, project, }); };
globalThis['clientGetData'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/clientGetData.js`, inf, project, }); };
globalThis['clientImput'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/clientImput.js`, inf, project, }); };
globalThis['clientSearch'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/clientSearch.js`, inf, project, }); };
globalThis['cookiesGetSet'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/cookiesGetSet.js`, inf, project, }); };
globalThis['getTextElement'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/getTextElement.js`, inf, project, }); };
globalThis['imput'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/imput.js`, inf, project, }); };
globalThis['maquinaInput'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/maquinaInput.js`, inf, project, }); };
globalThis['navigate'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/navigate.js`, inf, project, }); };
globalThis['newAccounts'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/newAccounts.js`, inf, project, }); };
globalThis['screenshot'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/screenshot.js`, inf, project, }); };
globalThis['sendData'] = (inf) => { return importFun({ 'engOk': (!eng), 'path': `./src/resources/sendData.js`, inf, project, }); };


