import request from "request";
import { SendLead } from "../cvServices/SendLead";

import { SanitizeData } from "../cvServices/sanitizeData";

const options = {
  method: "GET",
  url: "http://api.egoiapp.com/lists/1/contacts/segment/8",
  qs: { offset: "0", limit: "10", show_removed: "false" },
  headers: {
    "postman-token": "7176357b-1d19-c120-b145-7805de1d3416",
    "cache-control": "no-cache",
    apikey: "d1b31fac949acb64cc5019a445a982eebae1c0fa",
  },
};

export const GetContactsEgoi = async () => {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      try {
        if (error) throw new Error(error);
        const data = JSON.parse(body);
        data.items.map(async (i: any) => {
          if (i.base.first_name !== "") {
            const lead = SanitizeData(i);
            console.log(i.base);
            console.log(lead);
            SendLead(lead);
          }

          // TODO validação de campos extras
          // Object.keys(i.extra).forEach(function (key) {
          //   if (Array.isArray(i.extra[key].value)) {
          //     console.log("Array", i.extra[key]);
          //   } else {
          //     console.log("Extra", i.extra[key]);
          //     i.extra[key].value;
          //   }
          // });
        });
        resolve("Atualização concluida!");
      } catch (err) {
        reject(err);
      }
    });
  });
};
