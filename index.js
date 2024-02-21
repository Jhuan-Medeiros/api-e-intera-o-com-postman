//Chama o documento da api

const api = require("./api");

//Chamar express

const express = require("express");

//Criando uma instância de server

const server = express();

server.use(express.json());

//Deixa o server publico na porta 3000

server.listen(3000);

server.get("/home", (req, res) => {
    return res.send({first: "🤣🤣🤣🤣"});
})

server.get("/parametro", (req, res) => {
    const {nome, idade} = req.query;
    return res.send({resultado: `seja bem vindo ${nome}e minha idade é ${idade}`});
})

let produtos = [];

server.post ("/produtos", (req, res) => {
    const {id, nome, preco} = req.body;
   
    produtos.push({id: id, nome: nome, preco: preco});

    res.send({mensagem: "Sucesso"});
})

server.get("/produtos", (rec, res) => {
    res.send({produtos: produtos});
})  

server.put("/produtos", (req, res) => {
    const {id, nome, preco} = req.body;
    const {outroNome} = req.query;

    const posicao = produtos.findIndex(item => item.name === outroNome);

    produtos[posicao].id = id;
    produtos[posicao].nome = nome;
    produtos[posicao].preco = preco;

    res.send({mensagem: "Sucesso"})
})

server.delete("/produto/:id", (req, res) => {
    const {id} = req.params;

    const newProduto = produtos.filter(item => item.id !== parseInt(id));

    produtos = newProduto;

    res.send({message:"sucesso"})
})

// async => 

server.get("/pokemon/:id", async (req, res) => {

    const {id} = req.params;

    try{
        const {data} = await api.get(`pokemon/${id}`)
        return res.send({name: data.name})
    } catch(error) {
        res.send({erro: error.message})
    }
})