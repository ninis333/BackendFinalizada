const API = "http://localhost:3000/alunos"

const inputNome = document.getElementById("nome")
const inputCpf = document.getElementById("cpf")  
const inputCep = document.getElementById("cep")   
const inputUf = document.getElementById("uf")
const inputRua = document.getElementById("rua")
const inputNumero = document.getElementById("numero")
const inputComplemento = document.getElementById("complemento")
const formAluno = document.getElementById("form-aluno")

async function salvar(e) {
  e.preventDefault();
  console.log("Salvando aluno");

  const nome = inputNome.value.trim();
  const cpf = inputCpf.value.trim();
  const cep = inputCep.value.trim();
  const uf = inputUf.value.trim();
  const rua = inputRua.value.trim();
  const numero = inputNumero.value.trim();
  const complemento = inputComplemento.value.trim();


  if (!nome || !cpf || !numero) {
    alert("Por gentileza, preencha os campos obrigatórios (nome, cpf e número).");
    return;
  }

  const novoAluno = { nome, cpf, cep, uf, rua, numero, complemento }
  console.log("Enviando:", novoAluno);

  try {
    const requisicao = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoAluno)
    });

    if (requisicao.status === 201) {
      const dados = await requisicao.json();
      console.log("Aluno salvo com sucesso:", dados);
      alert("Aluno cadastrado com sucesso!");
      formAluno.reset(); 
    } else {
      console.error("Erro na requisição:", requisicao.status);
      alert("Erro ao cadastrar aluno. Código: " + requisicao.status);
    }

  } catch (error) {
    console.error("Erro no fetch:", error);
    alert("Erro de conexão com o servidor.");
  }
}

formAluno.addEventListener("submit", salvar);