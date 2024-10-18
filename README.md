# Projeto formulário de Cadastro Pessoal e Endereço

## **Objetivo:**

O objetivo do projeto é criar uma tela de cadastro pessoal e endereço, disparando uma ação de preenchimento automático nos campos de endereço ao digitar apenas o cep.

## **Preview**

![Preview](/img/form.gif)

## **Funções**

`Função para validar Email:` verifica se o campo de email está preenchido corretamente. Caso o email esteja vazio ou não contenha os caracteres `@` e `.`, uma mensagem de erro é exibida.

``Exemplo:``
```js
function checarEmail() {
    const emailField = document.getElementById('Email').value;
    if (emailField === "" || !emailField.includes('@') || !emailField.includes('.')) {
        alert("Por favor, informe um e-mail válido");
        return false;
    }
    alert("Email informado com sucesso");
    return true;
}
```
`Função para validar CEP:`

- ``validarCep:`` verifica se o CEP segue o formato correto de 8 dígitos, com ou sem o hífen. Se o formato for válido, o sistema realiza uma chamada à API do ViaCEP para preencher automaticamente os campos de endereço (logradouro, bairro, cidade, estado). Caso o CEP seja inválido ou não encontrado, uma mensagem de erro é exibida.


``Exemplo:``
```js
// verifica se o cep é válido
function validarCEP(cep) {
    return /^\d{5}-?\d{3}$/.test(cep);
}
```

`Função para validar CPF:`

- ``validarCPF:`` verifica a integridade do CPF informado. Ela remove caracteres não numéricos e aplica o algoritmo de validação dos dois dígitos verificadores. Caso o CPF seja inválido, uma mensagem de erro é exibida.

- ``Exemplo:``
```js
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}
```

``Tecnologias utilizadas:`` 
- HTML5 
- CSS3 
- JavaScript

``Autores:``
- Deivid Marques


