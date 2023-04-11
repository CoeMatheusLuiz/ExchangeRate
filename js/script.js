// Variaveis e seleção de elementos.
const apiKey = "a1fbe6bb5effbda34d9df620";
const taxInfo = document.getElementById("taxInfo");
const labelFromCurrency = document.getElementById("fromCurrency");
const inputFromAmmount = document.getElementById("fromAmmount");
const buttonSwap = document.getElementById("swap");
const labelToCurrency = document.getElementById("toCurrency");
const inputToAmmount = document.getElementById("toAmmount");

// Disparando um evento quando o usuário modifica/seleciona outro valor do elemento select,
// este evento chama a função de calcula as taxa de cambio/conversão das moedas.
labelFromCurrency.addEventListener('change', (e) => {
        
    calcExchangeRates();

})

// Disparando um evento quando o usuário modifica/seleciona outro valor do elemento select,
// este evento chama a função de calcula as taxa de cambio/conversão das moedas.
labelToCurrency.addEventListener('change', (e) => {

    calcExchangeRates();

})

// Disparando um evento quando o usuário libera uma tecla no elemento input,
// ( muda o valor ), este evento chama a função de calcula as taxa de cambio/conversão das moedas.
inputFromAmmount.addEventListener('keyup', (e) => {

    calcExchangeRates();

})

// Está função busca e retorna os dados ( JSON ) da API para preencher as options do select
const getExchangeRate = async() => {

    const apiExchangeRate = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    const res = await fetch(apiExchangeRate)
        .then( (response) => {

            return response.json();

        })
        .catch( (e) => {
        
            console.error("Erro de conexão!", e);
        
        });
    
    return res;
    

}

// Função que mostra ao usuário as opções de moedas
const showExchangeData = async () => {
    
    // Pegando a resposta da API, atraves da função getExchangeRate();
    const data = await getExchangeRate();
    // Pegando apenas as propriedades do objeto conversion_rates, que é o objeto
    // que tem as siglas das moedas e seus valores. Então nesse caso, estamos pegando apenas as
    // siglas para preencher os options.
    const arrKeys = Object.keys(data.conversion_rates)

    console.log(data)
    // Percorrendo o objeto para preencher os OPTIONS.
    arrKeys.forEach( (element) => {

        // O new Option(), cria um novo HTMLOptionElement, então aqui estamos pegando o element
        // que são as siglas das moedas, e criando os options preenchendo seus valores com as siglas.
        option = new Option(element, element);

        // Preenchendo os options que foram criados.
        labelFromCurrency.options[labelFromCurrency.options.length] = option;

        option = new Option(element, element);
        labelToCurrency.options[labelToCurrency.options.length] = option;

      });
    
}

// Função que calcula as taxas/conversão da moeda
// Aqui chamamos novamente a API, pois toda resposta da API tem uma MOEDA BASE, e esta MOEDA BASE
// sempre terá seu valor de conversão 1, então para não ter erros em calculos precisou ser feito desta forma.
const calcExchangeRates = async () => {

    let from = labelFromCurrency.value;
    let to = labelToCurrency.value;
    let data  = await getURL(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
    const rates = data.conversion_rates;

    inputToAmmount.value = (inputFromAmmount.value * rates[to]).toFixed(3);
    taxInfo.innerText = `${inputFromAmmount.value} ${labelFromCurrency.value} = ${inputToAmmount.value} ${to}`
    
}

// Função que auxilia a busca a resposta da API.
async function getURL(url){

    return (await fetch(url)).json();

}

// Função do botão que troca os valores.
function swapValues(){

    let temp1 = inputFromAmmount.value;
    inputFromAmmount.value = inputToAmmount.value;
    inputToAmmount.value = temp1;

    let temp2 = labelFromCurrency.value;
    labelFromCurrency.value = labelToCurrency.value;
    labelToCurrency.value = temp2;

}


showExchangeData();