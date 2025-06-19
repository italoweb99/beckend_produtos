
const express = require('express');
const SwaggerUI = require('swagger-ui-express');
const server = express();
const mongoose = require('mongoose');
const SwaggerDoc = require('./documentacao.json')
require('dotenv').config();
server.use(express.json());
const cursos  = ["Node.js"];


//const Funcionarios = require('./models/Funcionarios')
const produtosRoutes = require('./routes/produtosRoutes')



server.use('/docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerDoc, {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.min.js'
  ]
}));
server.use(
    express.urlencoded({
        extended: true
    })
)
server.use('/produtos',produtosRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("conectado ao mongo")
}
)
.catch((err)=>{
    console.log(err)
})
server.listen(3000);