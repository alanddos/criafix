import request from "request";
import { SendLead } from "../cvServices/SendLead";

import { SanitizeData } from "../cvServices/sanitizeData";

export const GetContactsEgoi = async (
  offset: number,
  limit: number,
  segment: number,
  idsituacao: number
) => {
  const options = {
    method: "GET",
    url: `http://api.egoiapp.com/lists/1/contacts/segment/${segment}`,
    qs: { offset, limit, show_removed: "false" },
    headers: {
      "postman-token": "7176357b-1d19-c120-b145-7805de1d3416",
      "cache-control": "no-cache",
      apikey: "d1b31fac949acb64cc5019a445a982eebae1c0fa",
    },
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      try {
        if (error) throw new Error(error);
        const data = JSON.parse(body);
        data.items.map(async (i: any) => {
          if (i.base.first_name !== "") {
            if (idsituacao === 12) {
              const lead = SanitizeData(i, 1);
              await SendLead(lead);
              const prospect1 = SanitizeData(i, 2);
              await SendLead(prospect1);
              const prospect2 = SanitizeData(i, 12);
              await SendLead(prospect2);
            } else if (idsituacao === 2) {
              const lead = SanitizeData(i, 1);
              await SendLead(lead);
              const prospect1 = SanitizeData(i, 2);
              await SendLead(prospect1);
            } else {
              const lead = SanitizeData(i, idsituacao);
              await SendLead(lead);
            }
          }
        });
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  });
};
