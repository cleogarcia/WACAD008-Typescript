"use strict";
function handleFormSubmit(event) {
    event.preventDefault();
    // Obter os valores do formulário
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const confirmarEmailInput = document.getElementById('confirme-email');
    const senhaInput = document.getElementById('senha');
    const nome = nomeInput.value;
    const email = emailInput.value;
    const confirmarEmail = confirmarEmailInput.value;
    const senha = senhaInput.value;
    // Valide se o email e a confirmação de email coincidem
    if (email !== confirmarEmail) {
        alert('Os campos de email e confirmação de email não coincidem.');
        return;
    }
    // exibir uma mensagem de sucesso no console
    console.log('Usuário cadastrado com sucesso:');
    console.log(`Nome: ${nome}`);
    console.log(`Email: ${email}`);
    console.log(`Senha: ${senha}`);
    // Exibir uma mensagem de confirmação para o usuário
    alert('Cadastro realizado com sucesso!');
    // Redirecionar o usuário para a página de login (você pode implementar isso aqui)
    window.location.href = './login.html';
}
// Adicionar um ouvinte de evento ao formulário de cadastro
const cadastroForm = document.querySelector('form');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', handleFormSubmit);
}
