const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors")

// cria aplicação
const app = express();
app.use(express.json());
app.use(cors())
const porta = 3000;

const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "senai",
    database: "escola_db",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit : 0
})

app.get("/alunos", async (req, res) => {
    try{
        const [retorno] = await conexao.query("SELECT * FROM alunos")
        res.status(200).json(retorno);
    }catch(err){
        console.log(err);
        res.status(500).json({erro: "Erro ao buscar alunos"})
    }
})

app.post("/alunos", async (req,res) =>{
    try {
        const {nome, cpf, cep= null,
            uf = null, rua = null,
            numero = null, complemento= null
        } = req.body;


        if (!nome || !cpf) {
            return res.status(400).json({ msg: "Nome e CPF são obrigatórios" });
        }

        const [existente] = await conexao.execute(
            "SELECT id FROM alunos WHERE cpf = ?",
            [cpf]
        );

        if (existente.length > 0) {
            return res.status(409).json({ erro: "CPF já cadastrado" });
        }

        const sql = `
            INSERT INTO alunos (nome, cpf, cep, uf, rua, numero, complemento)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const parametros = [nome, cpf, cep, uf, rua, numero, complemento];
        const [resultado] = await conexao.execute(sql, parametros);

       
        const [novo] = await conexao.execute(
            "SELECT * FROM alunos WHERE id = ?",
            [resultado.insertId]
        );

        res.status(201).json(novo[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao inserir aluno" });
    }
});

app.get("/alunos/:id", async (req, res) => {
    const id = req.params.id
    try{
const [retorno] = await conexao.execute("SELECT * FROM alunos WHERE id = ?", [id]);
        res.status(200).json(retorno);
        }catch(err){
            console.log(err);
            res.status(500).json({erro: "Erro ao buscar alunos"})
        }
})

app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));