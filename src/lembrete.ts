class LembreteManager {
    constructor() {
        this.initialize();
    }

    initialize() {
        const novoLembreteButton = document.querySelector('#exampleModal button[type="button"]');
        if (novoLembreteButton) {
            novoLembreteButton.addEventListener('click', this.openNovoLembreteModal.bind(this));
        }

        const salvarLembreteButton = document.querySelector('#salvarLembrete');
        if (salvarLembreteButton) {
            salvarLembreteButton.addEventListener('click', this.salvarNovoLembrete.bind(this));
        }

        this.carregarLembretes(); // Carregar lembretes
    }

    openNovoLembreteModal() {
        // Abre o modal 
        const modal = document.getElementById('exampleModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    salvarNovoLembrete() {
        //salvar o novo lembrete 
        const tituloInput = document.getElementById('Titulo') as HTMLInputElement;
        const descricaoInput = document.getElementById('Insercao') as HTMLTextAreaElement;
        const insercaoInput = document.getElementById('Insercao') as HTMLInputElement;
        const limiteInput = document.getElementById('limite') as HTMLInputElement;

        const titulo = tituloInput.value;
        const descricao = descricaoInput.value;
        const insercao = insercaoInput.value;
        const limite = limiteInput.value;

        if (!titulo || !insercao || !limite) {
            alert('Preencha todos os campos antes de salvar.');
            return;
        }

        // Criar um objeto lembrete 
        const lembrete = {
            titulo,
            descricao,
            insercao,
            limite
        };

        //salvar o lembrete  (array ou banco de dados)
        //adicionar o lembrete na tabela.

        // Fechar o modal após salvar
        const modal = document.getElementById('exampleModal');
        if (modal) {
            modal.style.display = 'none';
        }

        // Limpa campos após salvar
        tituloInput.value = '';
        descricaoInput.value = '';
        insercaoInput.value = '';
        limiteInput.value = '';

        // Recarrega a lista de lembretes)
        this.carregarLembretes();
    }

    carregarLembretes() {
        // Carregar lembretes existentes e exibi-los na tabela
       
    }
}

const lembreteManager = new LembreteManager();