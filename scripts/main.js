let inputResultado = document.querySelector("#inputDisplayResultado");
let textAreaHistorico = document.querySelector("#textAreaHistorico");

let calculo = {
    valorSalvo: null,
    funcaoParaCalcular: null
};

window.addEventListener('load', atribuirEventos);

// Atribui eventos aos botoes da calculadora
function atribuirEventos(){
    document.querySelector('#btnLimpar').addEventListener('click', limparDados);
    document.querySelector('#btnPonto').addEventListener('click', clicarPonto);
    document.querySelector('#btnResultado').addEventListener('click', clicarResultado);

    let numeros = document.querySelectorAll('.btn-numero');
    let operadores = document.querySelectorAll('.btn-operador');

    for(let numero of numeros){
        numero.addEventListener('click', clicarNumero);
    }

    for(let operador of operadores){
        operador.addEventListener('click', clicarOperador);
    }
}

// Remove os dados das varaiveis, faz uma separação no historico e habilita os botoes
function limparDados(){
    inputResultado.value = '';
    inserirTextoHistorico('---');

    calculo.funcaoParaCalcular = null;
    calculo.valorSalvo = null;

    desabilitarBotoes(false);
}

//função que é disparada ao clicara no ponto para inserir numeros decimais
function clicarPonto(){
    if(!isNaN(inputResultado.value)){
        inserirTextoHistorico(inputResultado.value);
    }

    if(inputResultado.value == '' || isNaN(inputResultado.value)){
        inputResultado.value = '0.'
    }else if(!inputResultado.value.includes('.')){
        inputResultado.value = inputResultado.value + '.';
    }
}

//exibe o resultado do calculo 
function clicarResultado(){
    if(!isNaN(inputResultado.value) && calculo.funcaoParaCalcular != null){
        let resultado = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value));

        inserirTextoHistorico(inputResultado.value +'\n= ' + resultado);
        inputResultado.value = resultado;
        calculo.valorSalvo = resultado;

        calculo.funcaoParaCalcular = null;
    }
}

//insere os numeros clicados na calculadora
function clicarNumero(){
    let novoValor = event.target.textContent;
    
    if(isNaN(inputResultado.value)){
        inserirTextoHistorico(inputResultado.value);
        inputResultado.value = novoValor;
    }else{
        if(inputResultado.value == 0 && inputResultado.value !== '0.'){
            inputResultado.value = novoValor;
        }else{
            inputResultado.value += novoValor;  
        }
    }
}

function clicarOperador(){
    if(!isNaN(inputResultado.value)){

        let novoValor = Number(inputResultado.value);

        if(calculo.valorSalvo == null || calculo.funcaoParaCalcular == null){
            calculo.valorSalvo =  novoValor;
        }else{
            calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo, novoValor)
        }
        inserirTextoHistorico(calculo.valorSalvo);
    }

    let operador = event.target.textContent;
    atribuirOperaçao(operador);
    inputResultado.value = operador;
}

function atribuirOperaçao(operador){
    switch(operador){
        case '+':
            calculo.funcaoParaCalcular = somar;
            break;
            case '-':
                calculo.funcaoParaCalcular = subtrair;
                break;
                case '*':
                    calculo.funcaoParaCalcular = multiplicar;
                    break;
                    case '/':
                        calculo.funcaoParaCalcular = dividir;
                        break;
                            default:
                                calculo.funcaoParaCalcular = null;
                                    break;

    }
}

// executa as 4 operções básicas
function somar(valor1, valor2){
    return valor1 + valor2;
}

function subtrair(valor1, valor2){
        return valor1 - valor2;
}

function multiplicar(valor1, valor2){
        return valor1 * valor2;
}

function dividir(valor1, valor2){
        if(valor2 == 0){
            desabilitarBotoes(true);
            return 'Erro divisão por 0'
        }else{
            return valor1 / valor2;
        }
}

function desabilitarBotoes(desabilitar){
    let botoes = document.querySelectorAll('.btn');

    for(let botao of botoes){
        botao.disable = desabilitar;
    }
    document.querySelector('#btnLimpar').disable = false;
}

function inserirTextoHistorico(texto){
    textAreaHistorico.textContent += texto + '\n';
    textAreaHistorico.scrollTop = textAreaHistorico.scrollHeight;
}