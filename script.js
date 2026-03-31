const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("footer"); 
const description = document.getElementById("description");
const result = document.getElementById("result");

const valueDollar = 4.87;
const valueEuro = 5.25;
const valuePound = 6.00;

// validação de input para aceitar apenas números
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
});

// captura o evento de submit do formulário
form.onsubmit = (e) => {
    e.preventDefault();

    // checa se o campo de valor está vazio
    if (!amount.value) return alert("Please enter an amount.");

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, valueDollar, "US$");
            break;
        case "EUR":
            convertCurrency(amount.value, valueEuro, "€");
            break;
        case "GBP":
            convertCurrency(amount.value, valuePound, "£");
            break;
        default:
            alert("Please select a valid currency.");
    }
};

// função para converter a moeda, formatar o resultado e exibir na tela
function convertCurrency(amountVal, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`; 
        
        let total = Number(amountVal) * price;

        let formattedTotal = formatCurrencyBRL(total).replace("R$", ""); 
        
        result.textContent = `${formattedTotal} Reais`;

        footer.classList.add("show-result"); 
    } catch (error) {
        console.error(error);
        alert("An error occurred during the conversion. Please try again.");
        footer.classList.remove("show-result");
    }
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}