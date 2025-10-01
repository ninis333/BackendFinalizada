console.log("app.js funcionando");


const API = 'http://localhost:3000/alunos'

async function carregarTabela() {

  try {
    const resposta = await fetch(API)
    const ALUNOS = await resposta.json()
    console.log(ALUNOS)

    // console.log(resposta.json())
    const tbody = document.getElementById("tbody")

    tbody.innerHTML = "<tr><td colspan='10'>Carregando...</td></tr>"
    tbody.innerHTML = "";
    tbody.innerHTML = ALUNOS.map(a =>
      `<tr>
                <td>${a.id}</td>
                <td>${a.nome}</td>
                <td>${a.cpf}</td>
                <td>${a.cep}</td>
                <td>${a.uf}</td>
                <td>${a.rua} senai</td>
                <td>${a.numero}</td>
                <td>${a.complemento}</td>
                <td> <button>
                   <a href="editar.html?id = ${a.id}">Editar</a>
                </button> <button>Excluir</button></td>
            </tr>`
    ).join("");


  } catch (error) {
    console.error(error.message)

  }
}

carregarTabela();