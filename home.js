// Função para validar o email
function checarEmail() {
    const emailField = document.getElementById('Email').value;
    if (emailField === "" || !emailField.includes('@') || !emailField.includes('.')) {
        alert("Por favor, informe um e-mail válido");
        return false;
    }
    alert("Email informado com sucesso");
    return true;
}

// Função para validar o CPF
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

// Função para validar o CEP (Formato: 12345-678 ou 12345678)
function validarCEP(cep) {
    return /^\d{5}-?\d{3}$/.test(cep);
}

// Adiciona um event listener para o evento 'submit' do formulário
document.getElementById('cpfForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de submit do formulário
    
    const emailValido = checarEmail();
    const cpf = document.getElementById('Cpf').value;
    const cep = document.getElementById('CEP').value;

    if (!emailValido) return; // Se o email não for válido, não prosseguir

    if (!validarCPF(cpf)) {
        alert("O CPF não é válido");
        return;
    }

    if (!validarCEP(cep)) {
        alert("O CEP não é válido. Use o formato 12345-678 ou 12345678.");
        return;
    }

    alert("Formulário enviado com sucesso!");
    // Aqui você pode prosseguir com o envio do formulário, por exemplo, usando fetch ou outro método
});
document.getElementById('CEP').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('Bairro').value = data.bairro;
                    document.getElementById('Cidade').value = data.localidade;
                    document.getElementById('uf').value = data.uf;
                } else {
                    alert("CEP não encontrado.");
                }
            })
            .catch(error => {
                console.error("Erro ao buscar CEP:", error);
                alert("Erro ao buscar CEP. Tente novamente.");
            });
    } else {
        alert("Por favor, informe um CEP válido.");
    }
});