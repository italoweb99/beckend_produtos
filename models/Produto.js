const mongoose = require('mongoose');
const Funcionario = mongoose.model('Funcionario',{
    nome: String,
    descricao: String,
    cor: String,
    peso: Number,
    tipo: String,
    preco: Number,
    Dt_cadastro: String,
});

module.exports = Funcionario;