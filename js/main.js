function cadastrarUsuario() {
    const nomeCompleto = document.getElementById('nomecompletoinput').value;
    const emailEmpresarial = document.getElementById('emailempresarialinput').value;
    const telefoneNumber = document.getElementById('telefonenumberinput').value;
    const cpfInput = document.getElementById('cpfInput').value;
    enviarForm(nomeCompleto, emailEmpresarial, telefoneNumber, cpfInput);
}

async function enviarForm(nomeCompleto, emailEmpresarial, telefoneNumber, cpfInput) {
    const request = {
        authCode: "j2899210324219763077476556856987451027058059365047",
        name: nomeCompleto,
        email: emailEmpresarial,
        phone: telefoneNumber,
        document: cpfInput
    };
    const apiUrl = 'https://apihomolog.supertroco.com.br/v1/posNRF/createFormPurchase';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const data = await response.json();
        console.log(response);
        console.log(data);

        if (response.status === 200 && data.suc === true) {
            document.getElementById('respostaAPI').innerText = `Utilize o código abaixo para resgatar o seu brinde: \n ${data.result}`;
        } else {
            document.getElementById('respostaAPI').innerText = `${data.result}`;
        }
    } catch (error) {
        console.error('Existe o seguinte erro:', error);
    }
}

async function obterQuantidadeCodigosDisponiveis() {
    const request = {
        authCode: "j2899210324219763077476556856987451027058059365047",
        
    };
    const apiUrl = 'https://apihomolog.supertroco.com.br/v1/posNRF/getInfoNumbers';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const data = await response.json();
        console.log(response);
        console.log(data);

        if (response.status === 200 && data.suc === true) {
            document.getElementById('respostaAPI').innerText = `Por favor, utilize o código: ${data.result}`;
        } else {
            document.getElementById('respostaAPI').innerText = `${data.result}`;
        }
    } catch (error) {
        console.error('Existe o seguinte erro:', error);
    }
}

async function validarCodigo(codigo) {
    const codigoInput = document.getElementById('codigoInput').value;
    const apiUrl = 'https://apihomolog.supertroco.com.br/v1/posNRF/getInfoPurchase';
    const request = {
        authCode: "j2899210324219763077476556856987451027058059365047",
        code: codigoInput
    };

    console.log(request);
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        const data = await response.json();
        console.log(data); 

        if (response.status === 200) {
            document.getElementById('respostaValidacao').innerText = `Status: ${data.result}\n` + `CPF: ${data.document}`;
        }  else {
            document.getElementById('respostaValidacao').innerText = `Status: ${data.result}`;
        }
    } catch (error) {
        console.error('Erro ao enviar dados para a API', error);
    }
   
}

async function usarCodigo(codigo) {
    const codigoInput = document.getElementById('codigoInput').value;
    const apiUrl = 'https://apihomolog.supertroco.com.br/v1/posNRF/markAsUsed';
    const request = {
        authCode: "j2899210324219763077476556856987451027058059365047",
        code: codigoInput
    };
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        const data = await response.json();
        console.log(data); 
        
        if (response.status === 200) {
            document.getElementById('respostaValidacao').innerText = `Status: ${data.result}` + `CPF: ${data.document}`;
        }  else {
            document.getElementById('respostaValidacao').innerText = `Status: ${data.result}` + `CPF: ${data.document}`;
        }
    } catch (error) {
        console.error('Erro ao usar o código', error);
    }
}
async function buscarCpf() {
    const numeroCpf = document.getElementById('cpfInputver').value;
    const apiUrl = 'https://apihomolog.supertroco.com.br/v1/posNRF/getInfoPurchaseByDocument';
    const request = {
        authCode: "j2899210324219763077476556856987451027058059365047",        
        document: numeroCpf
    };

    console.log(request);
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        const data = await response.json();
        console.log(data); 
        
        if (response.status === 200) {
            document.getElementById('respostaValidacao').innerText = `Status: ${data.result}` + ` - CPF: ${data.document}` + ` - Código: ${data.code}`;
        }  else {
            document.getElementById('respostaValidacao').innerText = `Status: ${data.result}` + `CPF: ${data.document}`;
        }
    } catch (error) {
        console.error('Erro ao usar o código', error);
    }
}







