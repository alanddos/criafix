import { number } from "yup/lib/locale";

const retiraAcentos = async (str: string) => {
  const comAcento =
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
  const semAcento =
    "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
  let novastr = "";

  for (let i = 0; i < str.length; i++) {
    let troca = false;
    for (let a = 0; a < comAcento.length; a++) {
      if (str.substr(i, 1) == comAcento.substr(a, 1)) {
        novastr += semAcento.substr(a, 1);
        troca = true;
        break;
      }
    }
    if (troca === false) {
      novastr += str.substr(i, 1);
    }
  }
  return novastr;
};

export const SanitizeData = (client: any) => {
  const x = client.base.phone
    .substring(2)
    .replace(/\D/g, "")
    .match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
  const phone = !x[2]
    ? x[1]
    : `(${x[1]}) ${x[2]}${x[3]}${x[4] ? `-${x[4]}` : ""}`;
  const y = client.base.cellphone
    .substring(2)
    .replace(/\D/g, "")
    .match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
  console.log(y);
  const cellphone = !y[2]
    ? y[1]
    : `(${y[1]}) ${y[2]}${y[3]}${y[4] ? `-${y[4]}` : ""}`;
  const data = JSON.stringify({
    acao: "salvar",
    nome: retiraAcentos(client.base.first_name),
    email: client.base.email,
    modulo: "gestor",
    telefone: phone || cellphone,
    permitir_alteracao: "true",
    origem: "OP",
    midia: "E-GOI",
    idpdv: 14,
    idempreendimento: 11,
    // "interacoes":
    // {
    //     "0":
    //     {
    //         "tipo" : "A",
    //         "descricao" : "Importado automaticamente por Delta Sistemas",
    //     },
    //   },
    idsituacao: 1,
  });
  return data;
};
