const { Router } = require('express');
const router = Router();
const Produtos = require('../models/Produto');

router.get('/', async (req, res) => {
    try {
        const result = await Produtos.find({});
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
});
router.get('/findByName/:nome', async (req,res)=>{
    console.log(req.params.nome)
    try{
        const result = await Produtos.find({nome: req.params.nome});
      if(result.length>0){
        res.status(200).json(result);
        }
        else{
            res.status(404).json({message: "Produto não encontrado"})
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Erro ao buscar produto"})
    }
})
router.get('/findById/:id', async (req,res)=>{
    
    try{
        const result = await Produtos.findById(req.params.id);
        console.log(result)
        if(result){
        res.status(200).json(result);
        }
        else{
            res.status(404).json({message: "Produto não encontrado"})
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Erro ao buscar produto"})
    }
})
router.delete('/deleteByName/:nome', async (req,res)=>{

    try{
        const result = await Produtos.deleteOne({nome: req.params.nome});
        res.status(200).json(result);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "erro ao deletar produto"},err)
    }
})
router.delete('/deleteByid/:id', async (req,res)=>{

    try{
        const result = await Produtos.findByIdAndDelete(req.params.id)
        res.status(200).json(result);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "erro ao deletar produto"},err)
    }
})
const checkInput = (req,res,next) =>{

if(!req.body.nome){
    res.status(400).json({message: 'Nome é obrigatorio'})
}
else if(!req.body.cor){
    res.status(400).json({message: 'Cor é obrigatorio'})
}
else if(!req.body.peso){
    res.status(400).json({message: 'Peso é obrigatorio'})
}
else if(!req.body.tipo){
    res.status(400).json({message: 'Tipo é obrigatorio'})
}
else if(!req.body.preco){
    res.status(400).json({message: 'Preço é obrigatorio'})
}
else{
    return next()
}
}

router.post('/', checkInput,async (req, res) => {
    const { nome,descricao,cor, peso,tipo,preco} = req.body;
    const currentDate = new Date();
    const Dt_cadastro= currentDate.toString();
    console.log(Dt_cadastro.toString())
    try {
        await Produtos.create({ nome, cor,descricao,peso, tipo,preco,Dt_cadastro});
        res.status(201).json({ message: 'Produto cadastrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar produto' });
    }
});
router.put('/updateByName/:nome',async(req,res)=>{
    const {nome, cor, descricao, peso, tipo, preco} = req.body;
    try{
    const prodAlter = await Produtos.findOneAndUpdate(
        {nome: req.params.nome},
        {
            nome,
            descricao,
            cor,
            peso,
            tipo,
            preco,
        },
        {new:true}
    );
    if(!prodAlter){
        res.status(404).json({message: "produto não encontrado"});
    }
    res.json(prodAlter)
    }
    catch(err){
        res.status(500).json({message: 'Erro ao atualizar'},err)
    }
})
router.put('/updateById/:id',async(req,res)=>{
const {nome, cor, descricao, peso, tipo, preco} = req.body;
try{
   const prodAlter = await Produtos.findByIdAndUpdate(

     req.params.id,
        {
            nome,
            descricao,
            cor,
            peso,
            tipo,
            preco,
        },
        {new:true}
    );
    if(!prodAlter){
        res.status(404).json({message: "produto não encontrado"});
    }
    res.json(prodAlter)
    }
    catch(err){
        res.status(500).json({message: 'Erro ao atualizar'},err)
    }
})
module.exports = router;