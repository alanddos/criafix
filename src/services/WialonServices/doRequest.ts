import https from "https";

interface Request {
  service: string;
  params: string;
  sid?: string;
}

const doRequest = async (data: Request) => {
  const { service, params, sid } = data;

  const options = {
    hostname: "hst-api.wialon.com",
    port: 443,
    path: `/wialon/ajax.html?svc=${service}&params=${params}${
      sid ? `&sid=${sid}` : ""
    }`,
    method: "GET",
  };

  console.log(options.hostname + options.path);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
};

export default doRequest;
