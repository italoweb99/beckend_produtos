
const express = require('express');
const SweggerUI = require('swagger-ui-express');
const server = express();
const mongoose = require('mongoose');
const SweggerDoc = require('./documentacao.json')
server.use(express.json());
const cursos  = ["Node.js"];


//const Funcionarios = require('./models/Funcionarios')
const produtosRoutes = require('./routes/produtosRoutes')

server.use('/docs', SweggerUI.serve, SweggerUI.setup(SweggerDoc) )
server.use(
    express.urlencoded({
        extended: true
    })
)
server.use('/produtos',produtosRoutes)

mongoose.connect(
    "mongodb+srv://italoweb99:ftiSAd5Nfm0tnkTz@cluster0.dhwasik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(()=>{
    console.log("conectado ao mongo")
}
)
.catch((err)=>{
    console.log(err)
})
function checkCurso(req,res,next){
    if(!req.body.novo_curso){
        return res.status(400).json({error: "Nome do curso é obrigatorio"})
    }
    return next();
}

server.listen(3000);