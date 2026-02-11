 //const express = require ("express")
import express from "express"
const app = express()
app.use(express.json())
//antigo 
let proximoId = 2

let LISTARALUNOS = [
    {
        id:1,
        nome:"Thales"
    },
    {
        id:2,
        nome:"Vitor"
    }
]
app.get("/",(req,res)=>{
    res.status(200).json({msg: "Boa Tarde"})
})

app.get("/alunos", (req,res) =>{
    res.status(200).json(LISTARALUNOS)

})

app.get("/alunos/:id", (req,res)=>{
    const idParametro = Number(req.params.id)
    const aluno = LISTARALUNOS.find(a=>a.id===idParametro)
    if(!aluno){
        return res.status(404).json({msg: "Aluno não encontrado"})
    }
    res.status(200).json(aluno)
})

app.post("/alunos", (req,res)=>{
    console.log(req.body)
    const {nome} = req.body
    if(!nome){
        res.status(400).json({msg:"por favor preenche o nome"})
    }
   
    const id = LISTARALUNOS.length > 0 ? LISTARALUNOS[LISTARALUNOS.length -1].id + 1 : 1
    const aluno = {id, nome}
    LISTARALUNOS.push(aluno)
    res.status(201).json({msg: "Aluno cadastrado com sucesso"})
})

app.delete("/alunos/:id", (req,res)=>{
    const idParametro = Number(req.params.id)
    const aluno = LISTARALUNOS.findIndex(a=>a.id===idParametro)
    if(aluno==-1){
        return res.status(404).json({msg: "Aluno não encontrado"})
    }
    LISTARALUNOS.splice(aluno,1)

    res.status(200).json({msg:"Aluno deletado com sucesso"})
})

app.put("/alunos/:id", (req,res)=>{
    const idParametro = Number(req.params.id)
    const indiceAluno = LISTARALUNOS.findIndex(a=>a.id===idParametro)
    const {nome} = req.body 

    if(indiceAluno ===-1){
        return res.status(404).json({msg: "Aluno não encontrado"})
    }

    if(!nome){
        return res.status(400).json({msg: "Nome Obrigatório"})
    }
    LISTARALUNOS[indiceAluno] = {id: idParametro, nome }

    res.status(200).json({msg: "Alteração feita com sucesso!",Indice: indiceAluno,})
})


app.put("/alunos/", (req, res) =>{
     console.log("parametro: ", req.params)
    const idParametro = req.params.id ? Number(req.params.id) : 0
   
    if(idParametro === 0){
        return res.status(400).json({msg: "Id é obrigatório"})
    }

})

app.delete("/alunos/", (req, res) =>{
     console.log("parametro: ", req.params)
    const idParametro = req.params.id ? Number(req.params.id) : 0
   
    if(idParametro === 0){
        return res.status(400).json({msg: "Id é obrigatório"})
    }

})
app.listen(5000, ()=>{
    console.log(`Server is ON`)
})