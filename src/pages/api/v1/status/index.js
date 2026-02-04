function status(request, response) {
  response.status(200).json({ chave: "Está dando tudo certo 👍" });
}

export default status;
