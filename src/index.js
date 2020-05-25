const txtCEP = document.querySelector('input#txtCEP');
const txtLogradouro = document.querySelector('input#txtLogradouro');
const txtComplemento = document.querySelector('input#txtComplemento');
const txtBairro = document.querySelector('input#txtBairro');
const txtLocalidade = document.querySelector('input#txtLocalidade');
const txtUF = document.querySelector('input#txtUF');

txtCEP.addEventListener('blur', loadCEP);

function loadCEP(){
    let cepNumber = txtCEP.value;

    eraseCEPElements();

    if(!/^(\d{5}-\d{3})$|^(\d{8})$/i.test(cepNumber))
        return alert('CEP Inválido!')


    if(!validateCEP(cepNumber))
        return alert('Preencha o CEP')

    
    apiLoadCEP(cepNumber);
}

async function apiLoadCEP(cep){
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then((content) => content.json())
    
    console.log(res)
    addCEPInElements(res)

}

function addCEPInElements(item){
    const { cep, logradouro, complemento, bairro, localidade, uf, erro} = item;

    if(erro){
        txtLogradouro.value = '#CEP não encontrado!'
        return 
    }
    txtCEP.value = cep;
    txtLogradouro.value = logradouro;
    txtComplemento.value = complemento;
    txtBairro.value = bairro;
    txtLocalidade.value = localidade;
    txtUF.value = uf;
}

function eraseCEPElements(){
    const el = document.querySelectorAll('input.resCEP');

    el.forEach(element => {
        element.value = null;
    });
}

function validateCEP(cep) {

    if(cep.length == 0)
        return false;

    return true;
}
