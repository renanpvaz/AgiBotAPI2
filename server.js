'use strict';

let express = require('express');
let app = express();
let port = process.env.PORT || 5000;

app.get('/verificarCPF', function (req,res) {
    const cpf = req.query.cpf;
    let customObj = {
        'perfilCliente': null,
        'fontePagadora': null,
        'bancoRecebimento': null,
        'rendaAproximada': null,
        'ehCliente': null
    }

    if (cpf === '123') {
        customObj.perfilCliente = 'Aposentado';
        customObj.fontePagadora = 'INSS';
        customObj.bancoRecebimento = 'Bradesco';
        customObj.rendaAproximada = 'R$ 2.034,55';
        customObj.ehCliente = true;
    } else {
        customObj.ehCliente = false;
    }

    return res.json(customObj);
});

app.get('/simulacao', function (req,res) {
    const valorQuePodePagar = parseFloat(req.query.vqpp);
    const valorRecalculado = (valorQuePodePagar * 0.85).toFixed(2);
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
    let parcelas = [];

    for (let i = 0; i <=11; i++){
        let valorFormatado = formatter.format(valorRecalculado * (i + 1));
        parcelas[i] = (i+1) + 'x = ' +  valorFormatado;
    }

    res.json(parcelas);
});

app.listen(port);
console.log('Server rodando na porta ' + port);
