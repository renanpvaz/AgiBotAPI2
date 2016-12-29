'use strict';

var express = require('express');
var app = express();
var port = process.env.port || 8081;

app.get('/verificarCPF', function (req,res) {
    let cpf = req.query.cpf;
    var customObj = {
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
    let valorQuePodePagar = parseFloat(req.query.vqpp);
    let valorRecalculado = valorQuePodePagar * 0.85;
    valorRecalculado = valorRecalculado.toFixed(2);
    let parcelas = [];
    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });

    for (let i = 0; i <=11; i++){
        let valorFormatado = formatter.format(valorRecalculado * (i + 1));
        parcelas[i] = (i+1) + 'x = ' +  valorFormatado;
    }

    res.json(parcelas);
});

app.listen(port);
console.log('Server rodando na porta ' + port);
