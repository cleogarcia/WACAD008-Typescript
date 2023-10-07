"use strict";
// Classes para os produtos
class TV {
    constructor(modelo, resolucao, tamanhoPolegadas, fabricante, valor) {
        this.modelo = modelo;
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
        this.fabricante = fabricante;
        this.valor = valor;
    }
}
class Celular {
    constructor(modelo, memoria, fabricante, valor) {
        this.modelo = modelo;
        this.memoria = memoria;
        this.fabricante = fabricante;
        this.valor = valor;
    }
}
class Bicicleta {
    constructor(modelo, tamanhoAro, fabricante, valor) {
        this.modelo = modelo;
        this.tamanhoAro = tamanhoAro;
        this.fabricante = fabricante;
        this.valor = valor;
    }
}
// Classe Carrinho de Compras
class CarrinhoDeCompras {
    constructor() {
        this.produtos = [];
    }
    adicionarProduto(produto) {
        this.produtos.push(produto);
    }
    removerProduto(index) {
        if (index >= 0 && index < this.produtos.length) {
            this.produtos.splice(index, 1);
        }
    }
    getNumProdutos() {
        return this.produtos.length;
    }
    getValorTotal() {
        return this.produtos.reduce((total, produto) => total + produto.valor, 0);
    }
}
// Criação de instância do Carrinho de Compras
const carrinho = new CarrinhoDeCompras();
// Função para listar produtos no carrinho
function listarProdutosNoCarrinho() {
    const numProdutosElement = document.getElementById("num-produtos");
    const valorTotalElement = document.getElementById("valor-total");
    if (numProdutosElement && valorTotalElement) {
        numProdutosElement.textContent = carrinho.getNumProdutos().toString();
        valorTotalElement.textContent = carrinho.getValorTotal().toFixed(2);
    }
}
// Evento de submissão do formulário
const formAdicionarProduto = document.getElementById("form-adicionar-produto");
if (formAdicionarProduto) {
    formAdicionarProduto.addEventListener("submit", (event) => {
        event.preventDefault();
        const tipoProduto = document.getElementById("tipo").value;
        const modelo = document.getElementById("modelo").value;
        const valor = parseFloat(document.getElementById("valor").value);
        let produto;
        switch (tipoProduto) {
            case "tv":
                const resolucao = document.getElementById("resolucao").value;
                const tamanhoPolegadas = parseFloat(document.getElementById("tamanhoPolegadas").value);
                const fabricanteTV = document.getElementById("fabricanteTV").value;
                produto = new TV(modelo, resolucao, tamanhoPolegadas, fabricanteTV, valor);
                break;
            case "celular":
                const memoria = document.getElementById("memoria").value;
                const fabricanteCelular = document.getElementById("fabricanteCelular").value;
                produto = new Celular(modelo, memoria, fabricanteCelular, valor);
                break;
            case "bicicleta":
                const tamanhoAro = parseFloat(document.getElementById("tamanhoAro").value);
                const fabricanteBicicleta = document.getElementById("fabricanteBicicleta").value;
                produto = new Bicicleta(modelo, tamanhoAro, fabricanteBicicleta, valor);
                break;
            default:
                console.error("Tipo de produto inválido.");
                return;
        }
        carrinho.adicionarProduto(produto);
        listarProdutosNoCarrinho();
    });
}
// Função para listar produtos no carrinho ao carregar a página
window.addEventListener("load", listarProdutosNoCarrinho);
// Adicionar evento de clique para remover produto
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList && target.classList.contains("remover-produto")) {
        const indexAttr = target.getAttribute("data-index");
        if (indexAttr) {
            const index = parseInt(indexAttr);
            carrinho.removerProduto(index);
            listarProdutosNoCarrinho();
        }
    }
});
