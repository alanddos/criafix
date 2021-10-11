const removerAcentos = (s: any) => {
  if (!s || s === "" || Array.isArray(s)) {
    return "";
  }
  const map: any = {
    â: "a",
    Â: "A",
    à: "a",
    À: "A",
    á: "a",
    Á: "A",
    ã: "a",
    Ã: "A",
    ê: "e",
    Ê: "E",
    è: "e",
    È: "E",
    é: "e",
    É: "E",
    î: "i",
    Î: "I",
    ì: "i",
    Ì: "I",
    í: "i",
    Í: "I",
    õ: "o",
    Õ: "O",
    ô: "o",
    Ô: "O",
    ò: "o",
    Ò: "O",
    ó: "o",
    Ó: "O",
    ü: "u",
    Ü: "U",
    û: "u",
    Û: "U",
    ú: "u",
    Ú: "U",
    ù: "u",
    Ù: "U",
    ç: "c",
    Ç: "C",
  };

  return s
    .replace(/[\W\[\] ]/g, (a: any) => {
      return map[a] || a;
    })
    .toLowerCase();
};

export const SanitizeData = (client: any, idsituacao: number) => {
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
  const cellphone = !y[2]
    ? y[1]
    : `(${y[1]}) ${y[2]}${y[3]}${y[4] ? `-${y[4]}` : ""}`;
  const data = JSON.stringify({
    acao: "alterar",
    nome: removerAcentos(client.base.first_name),
    email: client.base.email,
    modulo: "gestor",
    telefone: phone || cellphone,
    permitir_alteracao: "true",
    origem: "OP",
    midia: "E-GOI",
    idpdv: 14,
    idempreendimento: 11,
    converter: false,
    utilizar_fila_gestor: true,
    idsituacao,
    campos_adicionais: {
      Profissao: removerAcentos(client.extra[30].value),
      Carteira_assinada: removerAcentos(client.extra[41].value),
      Possui_filhos: removerAcentos(client.extra[42].value),
      "Estado Civil": removerAcentos(client.extra[49].value),
      Renda_total: removerAcentos(client.extra[51].value),
      Escolaridade: removerAcentos(client.extra[47].value),
      Valor_aluguel: removerAcentos(client.extra[52]?.value),
      Paga_aluguel: removerAcentos(client.extra[44].value),
      Comprar_com: removerAcentos(client.extra[45].value),
      CPF:
        removerAcentos(client.extra[23].value) ||
        removerAcentos(client.extra[36].value),
      "CPF do Conjuge":
        removerAcentos(client.extra[24].value) ||
        removerAcentos(client.extra[37].value),
      Filho_mais_novo: removerAcentos(client.extra[43].value),
      "2o_comprador_trabalho": removerAcentos(client.extra[35].value),
      Cidade_interesse: removerAcentos(client.extra[46].value),
      Data_nascimento: removerAcentos(client.extra[29].value),
    },
    tags: [...client.tags],
  });

  return data;
};
