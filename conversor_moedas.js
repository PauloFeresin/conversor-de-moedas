function convertCurrency() {
  const moedaBase = document.getElementById("fromCurrency").value;
  const moedaConvertida = document.getElementById("toCurrency").value;

  const URL = `https://economia.awesomeapi.com.br/json/last/${moedaBase}-${moedaConvertida}`;

  axios
    .get(URL)
    .then((resp) => {
      for (const key in resp.data) {
        if (resp.data.hasOwnProperty(key)) {
          const bidValue = resp.data[key].bid;
          const resultDiv = document.getElementById("result");
          resultDiv.innerHTML = `Valor convertido ${key}: ${bidValue}`;
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function showClosingDays() {
  const moedaBase = document.getElementById("fromCurrencyPeriod").value;
  const moedaConvertida = document.getElementById("toCurrencyPeriod").value;
  const moeda = moedaBase + "-" + moedaConvertida;
  const periodo = document.getElementById("currencyPeriod").value;

  const URL = `https://economia.awesomeapi.com.br/json/daily/${moeda}/${periodo}`;

  axios.get(URL).then((resp) => {
    const resultado = [];
    for (const item of resp.data) {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const value = item[key];
          const resultDiv = document.getElementById("result");
          resultado.push(key, value);

          resultDiv.innerHTML = resultado;
        }
      }
    }
  });
}

document
  .getElementById("opcoeAvancadas")
  .addEventListener("change", function () {
    var textInput = document.getElementById("codigoMoedaManual");
    var labels = document.querySelectorAll("label:not([for='opcoeAvancadas'])");
    var checkbox = document.getElementById("opcoeAvancadas");

    if (checkbox.checked) {
      textInput.disabled = false;
      let moedasInput = document.getElementById("codigoMoedaManual").value;

      let moedaUm = moedasInput.split("-")[0];
      let moedaDois = moedasInput.split("-")[1];

      const moedaBase = moedaUm;
      const moedaConvertida = moedaDois;

      labels.forEach(function (label) {
        label.disabled = true;
      });

      return moedaBase, moedaConvertida;
    } else {
      textInput.disabled = true;
      labels.forEach(function (label) {
        label.disabled = false;
      });
    }
  });
