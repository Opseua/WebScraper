globalThis['firstFileCall'] = new Error(); await import('./resources/@export.js'); let e = firstFileCall, ee = e;



let infGoogleSheets;
async function sync1() {
    logConsole({ e, ee, 'txt': `SYNC1 INICIANDO`, });
    infGoogleSheets = { // (SCRIPT 2 [LIMPEZA_AUTOMATICO]) <> (RETRABALHO [LIMPEZA_STATUS])
        e, 'action': 'syncRanges', 'idOrigin': '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8', 'tabOrigin': 'LIMPEZA_AUTOMATICO', 'colsOrigin': ['A', 'B',], 'linStartOrigin': 4, 'destinations': [
            { 'idDestination': '1l7qyTEhHUNWzKuY2dg29yREXXQVOdOT-aFi5IkgHKJI', 'tabDestination': 'LIMPEZA_STATUS', 'colsDestination': ['A', 'B',], 'linStartDestination': 2, },
        ],
    }; await googleSheets(infGoogleSheets);

    infGoogleSheets = { // (VENDAS [INDICAÇÕES]) <> (RETRABALHO [LIMPEZA_STATUS])
        e, 'action': 'syncRanges', 'idOrigin': '19itKQqFsvKp7Y8nlTycO1X5OqRz4r0ekHcg_FzTtz0Y', 'tabOrigin': 'INDICAÇÕES', 'colsOrigin': ['E', 'K',], 'linStartOrigin': 2, 'destinations': [
            { 'idDestination': '1wEiSgZHeaUjM6Gl1Y67CZZZ7UTsDweQhRYKqaTu3_I8', 'tabDestination': 'INDICACOES_STATUS', 'colsDestination': ['A', 'B',], 'linStartDestination': 2, },
            { 'idDestination': '1l7qyTEhHUNWzKuY2dg29yREXXQVOdOT-aFi5IkgHKJI', 'tabDestination': 'INDICACOES_STATUS', 'colsDestination': ['A', 'B',], 'linStartDestination': 2, },
        ],
    }; await googleSheets(infGoogleSheets);
    logConsole({ e, ee, 'txt': `SYNC1 CONCLUÍDO ✅`, });
} await sync1(); setInterval(async () => { await sync1(); }, (5 * (60 * 1000))); // NO INÍCIO E APÓS x MINUTOS COM REPETIÇÃO

async function sync2() {
    logConsole({ e, ee, 'txt': `SYNC2 INICIANDO`, });
    infGoogleSheets = { // (SCRIPT 1 [LIMPEZA_AUTOMATICO]) <> (VENDAS [INDICACOES_STATUS])
        e, 'action': 'syncRanges', 'idOrigin': '1UzSX3jUbmGxVT4UbrVIB70na3jJ5qYhsypUeDQsXmjc', 'tabOrigin': 'INDICAR_AUTOMATICO', 'colsOrigin': ['N', 'S',], 'linStartOrigin': 2, 'linEndOrigin': 400,
        'destinations': [{ 'idDestination': '19itKQqFsvKp7Y8nlTycO1X5OqRz4r0ekHcg_FzTtz0Y', 'tabDestination': 'INDICACOES_STATUS', 'colsDestination': ['K', 'L',], 'linStartDestination': 2, },],
    }; await googleSheets(infGoogleSheets);
    logConsole({ e, ee, 'txt': `SYNC2 CONCLUÍDO ✅`, });
} await sync2(); setInterval(async () => { await sync2(); }, 30 * 1000); // NO INÍCIO E APÓS x SEGUNDOS COM REPETIÇÃO





