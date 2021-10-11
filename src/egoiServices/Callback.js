const callback = (error, response) => {
  if (error) {
    console.error(error);
  } else {
    const dados = response.body;
    return dados;
  }
};

module.exports = { callback };
