import doRequest from "./doRequest";

const params = JSON.stringify({
  token:
    "f5498be8dbe04f3d6a7774d4ea9b8ecd23841E9936C879F1372FFE8DBB2E02BE16F1D50E",
  fl: 1,
});

const WialonLoginService = async () => {
  const data = await doRequest({ service: "token/login", params });
  return data;
};

export default WialonLoginService;
