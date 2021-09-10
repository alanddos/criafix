
function retira_acentos(str) {

    com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    novastr = "";
    for (i = 0; i < str.length; i++) {
        troca = false;
        for (a = 0; a < com_acento.length; a++) {
            if (str.substr(i, 1) == com_acento.substr(a, 1)) {
                novastr += sem_acento.substr(a, 1);
                troca = true;
                break;
            }
        }
        if (troca == false) {
            novastr += str.substr(i, 1);
        }
    }
    return novastr;
}


function SanitizeData(client) {
    let x = client.base.phone.substring(2).replace(/\D/g, "").match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
    const phone = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + x[3] + (x[4] ? "-" + x[4] : "");
    const data = JSON.stringify({
        "acao": "salvar",
        "nome": retira_acentos(client.base.first_name),
        "email": client.base.email,
        "modulo": "gestor",
        "telefone": phone,
        "permitir_alteracao": "true",
        "origem": "OP",
        // "interacoes": 
        // {
        //     "0": 
        //     { 
        //         "tipo" : "A",
        //         "descricao" : "Importado automaticamente por Delta Sistemas",          
        //     },
        //   },    
        "idsituacao": 1
    })
    return data;
}

module.exports = { SanitizeData }