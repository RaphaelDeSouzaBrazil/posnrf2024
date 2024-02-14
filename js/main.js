
function aplicarMascaraCPF() {
    $('#cpfInput').inputmask('999.999.999-99', { reverse: true });
}

aplicarMascaraCPF();
document.addEventListener('DOMContentLoaded', aplicarMascaraCPF);

function validarCPF(cpf) {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
}        


const apiUrl = 'https://apihomolog.supertroco.com.br/v1/voucher';

function cadastrarUsuario() {
const nomeCompleto = document.getElementById('nomecompletoinput').value;
const emailEmpresarial = document.getElementById('emailempresarialinput').value;
const telefoneNumber = document.getElementById('telefonenumberinput').value;
const cpfInput = document.getElementById('cpfInput').value;
//const codigoInput = document.getElementById('codigoInput').value;
obterDadosDaAPI(cpfInput, codigoInput);
}

async function obterDadosDaAPI(cpf, codigo) {
const request = {
    //code: codigo,
    name: nomeCompleto,
    email: emailEmpresarial,
    phone: telefoneNumber,
    document: cpf,    
};

try {
    const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
    });

    const data = await response.json();
    console.log(response);
    console.log(data);

    if (response.status === 200) {
    abrirModal('Sucesso: ' + data.message + '<br>Redirecionando para a página de cadastro...');
    setTimeout(function () {
        window.location.href = 'https://supertroco.com.br/cadastro/steps/cpf';
    }, 3000);
    } else if (response.status === 400 || response.status === 404) {
    abrirModal('Erro: ' + data.message);
    } else {
    abrirModal('Resposta inesperada da API');
    }
} catch (error) {
    console.error('Preencha os dados corretamente', error);
    abrirModal('Erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
}
}

