class Aluno {
  id: number;
  nomeCompleto: string;
  idade: number;
  altura: number;
  peso: number;

  constructor(id: number, nomeCompleto: string, idade: number, altura: number, peso: number) {
      this.id = id;
      this.nomeCompleto = nomeCompleto;
      this.idade = idade;
      this.altura = altura;
      this.peso = peso;
  }
}

class Turma {
  id: number;
  nome: string;
  alunos: Aluno[] = [];

  constructor(id: number, nome: string) {
      this.id = id;
      this.nome = nome;
  }

  getNumAlunos(): number {
      return this.alunos.length;
  }

  getMediaIdades(): number {
      if (this.alunos.length === 0) {
          return 0;
      }
      const totalIdades = this.alunos.reduce((sum, aluno) => sum + aluno.idade, 0);
      return totalIdades / this.alunos.length;
  }

  getMediaAlturas(): number {
      if (this.alunos.length === 0) {
          return 0;
      }
      const totalAlturas = this.alunos.reduce((sum, aluno) => sum + aluno.altura, 0);
      return totalAlturas / this.alunos.length;
  }

  getMediaPesos(): number {
      if (this.alunos.length === 0) {
          return 0;
      }
      const totalPesos = this.alunos.reduce((sum, aluno) => sum + aluno.peso, 0);
      return totalPesos / this.alunos.length;
  }
}

const turma = new Turma(1, "Turma A");

function listarAlunos() {
  const listaAlunos = document.getElementById("lista-alunos");

  if (listaAlunos) {
      listaAlunos.innerHTML = "";

      for (const aluno of turma.alunos) {
          const li = document.createElement("li");
          li.innerHTML = `
              <strong>${aluno.nomeCompleto}</strong> - Idade: ${aluno.idade}, Altura: ${aluno.altura} cm, Peso: ${aluno.peso} kg
              <button class="btn btn-warning btn-sm editar" data-id="${aluno.id}">Editar</button>
              <button class="btn btn-danger btn-sm apagar" data-id="${aluno.id}">Apagar</button>
          `;
          listaAlunos.appendChild(li);
      }
  }
}

function atualizarEstatisticas() {
  const numAlunosElement = document.getElementById("num-alunos");
  const mediaIdadesElement = document.getElementById("media-idades");
  const mediaAlturasElement = document.getElementById("media-alturas");
  const mediaPesosElement = document.getElementById("media-pesos");

  if (numAlunosElement && mediaIdadesElement && mediaAlturasElement && mediaPesosElement) {
      numAlunosElement.textContent = turma.getNumAlunos().toString();
      mediaIdadesElement.textContent = turma.getMediaIdades().toFixed(2);
      mediaAlturasElement.textContent = turma.getMediaAlturas().toFixed(2);
      mediaPesosElement.textContent = turma.getMediaPesos().toFixed(2);
  }
}

document.addEventListener("submit", (event) => {
  event.preventDefault();

  const nomeCompleto = (document.getElementById("nome") as HTMLInputElement).value;
  const idade = parseInt((document.getElementById("idade") as HTMLInputElement).value);
  const altura = parseFloat((document.getElementById("altura") as HTMLInputElement).value);
  const peso = parseFloat((document.getElementById("peso") as HTMLInputElement).value);

  const novoAluno = new Aluno(turma.alunos.length + 1, nomeCompleto, idade, altura, peso);
  turma.alunos.push(novoAluno);

  listarAlunos();
  atualizarEstatisticas();

  const formAdicionarAluno = document.getElementById("form-adicionar-aluno") as HTMLFormElement;
  formAdicionarAluno.reset();
});

document.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.classList) {
      if (event.target.classList.contains("editar")) {
          const alunoIdAttr = event.target.getAttribute("data-id");
          if (alunoIdAttr !== null) {
              const alunoId = parseInt(alunoIdAttr);
              const alunoParaEditar = turma.alunos.find((aluno) => aluno.id === alunoId);
              if (alunoParaEditar) {
                  const nomeInput = document.getElementById("nome") as HTMLInputElement;
                  const idadeInput = document.getElementById("idade") as HTMLInputElement;
                  const alturaInput = document.getElementById("altura") as HTMLInputElement;
                  const pesoInput = document.getElementById("peso") as HTMLInputElement;

                  if (nomeInput && idadeInput && alturaInput && pesoInput) {
                      nomeInput.value = alunoParaEditar.nomeCompleto;
                      idadeInput.value = alunoParaEditar.idade.toString();
                      alturaInput.value = alunoParaEditar.altura.toString();
                      pesoInput.value = alunoParaEditar.peso.toString();
                  }
              }
          }  
      } else if (event.target.classList.contains("apagar")) {
          const alunoIdAttr = event.target.getAttribute("data-id");
          if (alunoIdAttr !== null) {
              const alunoId = parseInt(alunoIdAttr);
              const index = turma.alunos.findIndex((aluno) => aluno.id === alunoId);
              if (index !== -1) {
                  turma.alunos.splice(index, 1);
                  listarAlunos();
                  atualizarEstatisticas();
              }
          }
      }
  }
});