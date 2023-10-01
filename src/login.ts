import 'bootstrap';
import 'jquery';

// Função envio do formulário
function handleFormSubmit(event: Event) {
    event.preventDefault(); 

    // Obter os valores do email e senha
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const senhaInput = document.getElementById('senha') as HTMLInputElement;
    
    const email = emailInput.value;
    const senha = senhaInput.value;

// autenticação aqui 

    // exibir os valores no console
    console.log(`Email: ${email}`);
    console.log(`Senha: ${senha}`);
}

//ouvinte de evento ao formulário de login
const loginForm = document.querySelector('form');
if (loginForm) {
    loginForm.addEventListener('submit', handleFormSubmit);
}