// FUNCTIONS
await import('../../../Chrome_Extension/src/resources/@functions.js');

// DEFINIR → LETTER | ROOT | FUNCTION | PROJECT | FILE | LINE
let retGetPathNew = await getPathNew({ 'e': new Error(), 'isFunction': false, })
// globalWindow.devResWs = cng == 1 ? 'CHROME' : 'NODEJS';

// FUNÇÕES DESSE PROJETO
await import('./apiCnpj.js')
await import('./apiNire.js')
await import('./awaitLoad.js')
await import('./buttonElement.js')
await import('./checkPage.js')
await import('./clientGetData.js')
await import('./clientImput.js')
await import('./clientSearch.js')
await import('./cookiesGetSet.js')
await import('./getTextElement.js')
await import('./imput.js')
await import('./navigate.js')
await import('./sendData.js')
