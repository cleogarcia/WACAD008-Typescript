// Interface comum para os produtos
interface Produto {
    modelo: string;
    valor: number;
}

// Classes para os produtos
class TV implements Produto {
    constructor(public modelo: string, public resolucao: string, public tamanhoPolegadas: number, public fabricante: string, public valor: number) {}
}

class Celular implements Produto {
    constructor(public modelo: string, public memoria: string, public fabricante: string, public valor: number) {}
}

class Bicicleta implements Produto {
    constructor(public modelo: string, public tamanhoAro: number, public fabricante: string, public valor: number) {}
}

// Interface para os campos específicos de cada tipo de produto
interface TVFields {
    resolucao: string;
    tamanhoPolegadas: number;
    fabricante: string;
}

interface CelularFields {
    memoria: string;
    fabricante: string;
}

interface BicicletaFields {
    tamanhoAro: number;
    fabricante: string;
}

// Classe Carrinho de Compras
class CarrinhoDeCompras<T extends Produto> {
    private produtos: T[] = [];

    constructor() {}

    adicionarProduto(produto: T) {
        this.produtos.push(produto);
    }

    removerProduto(index: number) {
        if (index >= 0 && index < this.produtos.length) {
            this.produtos.splice(index, 1);
        }
    }

    getNumProdutos(): number {
        return this.produtos.length;
    }

    getValorTotal(): number {
        return this.produtos.reduce((total, produto) => total + produto.valor, 0);
    }
}

// Criação de instância do Carrinho de Compras
const carrinho = new CarrinhoDeCompras<Produto>();

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
        const tipoProduto = (document.getElementById("tipo") as HTMLSelectElement).value;
        const modelo = (document.getElementById("modelo") as HTMLInputElement).value;
        const valor = parseFloat((document.getElementById("valor") as HTMLInputElement).value);

        let produto: Produto;

        switch (tipoProduto) {
            case "tv":
                const resolucao = (document.getElementById("resolucao") as HTMLInputElement).value;
                const tamanhoPolegadas = parseFloat((document.getElementById("tamanhoPolegadas") as HTMLInputElement).value);
                const fabricanteTV = (document.getElementById("fabricanteTV") as HTMLInputElement).value;
                produto = new TV(modelo, resolucao, tamanhoPolegadas, fabricanteTV, valor);
                break;
            case "celular":
                const memoria = (document.getElementById("memoria") as HTMLInputElement).value;
                const fabricanteCelular = (document.getElementById("fabricanteCelular") as HTMLInputElement).value;
                produto = new Celular(modelo, memoria, fabricanteCelular, valor);
                break;
            case "bicicleta":
                const tamanhoAro = parseFloat((document.getElementById("tamanhoAro") as HTMLInputElement).value);
                const fabricanteBicicleta = (document.getElementById("fabricanteBicicleta") as HTMLInputElement).value;
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
    const target = event.target as HTMLElement;
    if (target && target.classList && target.classList.contains("remover-produto")) {
        const indexAttr = target.getAttribute("data-index");
        if (indexAttr) {
            const index = parseInt(indexAttr);
            carrinho.removerProduto(index);
            listarProdutosNoCarrinho();
        }
    }
});