'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/verificarCPF', ({ query }, { json }) => {
  const cpf = query.cpf;
  const customObj = {};

  if (cpf === '123') {
    customObj.perfilCliente = 'Aposentado';
    customObj.fontePagadora = 'INSS';
    customObj.bancoRecebimento = 'Bradesco';
    customObj.rendaAproximada = 'R$ 2.034,55';
    customObj.ehCliente = true;
  } else {
    customObj.ehCliente = false;
  }

  return json(customObj);
});

app.get('/simulacao', ({ query }, { json }) => {
  const parcelas = [];
  const valorQuePodePagar = parseFloat(query.vqpp);
  const valorRecalculado = (valorQuePodePagar * 0.85).toFixed(2);
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  for (let i = 0; i <= 11; i++){
    let valorFormatado = formatter.format(valorRecalculado * (i + 1));
    parcelas[i] = (i + 1) + 'x = ' +  valorFormatado;
  }

  return json(parcelas);
});

app.listen(port);

console.log('Server rodando na porta ' + port);
