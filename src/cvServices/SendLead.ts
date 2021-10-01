import https from "https";

export const SendLead = (data: any) => {
  const options = {
    hostname: "realty.construtordevendas.com.br",
    port: 443,
    path: "/api/cvio/lead",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      token: "b9afbe4955e5cfd410d3030cfc962f69044099e0",
    },
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}
