const urlParametro = new URLSearchParams(window.location.search)
const id = urlParametro.get("id")
console.log("ID do aluno para editar", id);

console.log("ID do aluno para editar", id);

const inputID = document.getElementById("id");
inputID.value = id;

const API = 'http://localhost:3000/alunos'

async function carregarAluno() {
    if(!id){
        alert("Nenhum aluno selecionado para edição!");
        return
            
        
    }
    const resposta = await fetch (`${API}/${id}`);
    const ALUNO = await resposta.json();
    console.log(ALUNO);

    document.getElementById("nome").value = ALUNO[0].nome;
    document.getElementById("cpf").value = ALUNO[0].cpf;


}

carregarAluno();