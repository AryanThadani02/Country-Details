let searchBtn = document.querySelector("#search_btn");
let countryInp = document.querySelector("#country_inp");
let result = document.querySelector("#result");

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value.trim();
    if (countryName === "") {
        showToast("Please enter a country name");
        return;
    }

    let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 404) {
                showToast("Country data not available");
                return;
            }

            console.log(data[0]);
            console.log(data[0].capital[0]);
            console.log(data[0].flags.png);
            console.log(data[0].name.common);
            console.log(data[0].continents[0]);
            console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
            console.log(data[0].currencies[Object.keys(data[0].currencies)].symbol);
            console.log(Object.values(data[0].languages).toString().split(",").join(", "));

            result.innerHTML = `<img src="${data[0].flags.png}">
                <p>Country: ${data[0].name.common}</p>
                <p>Capital: ${data[0].capital[0]}</p>
                <p>Continent: ${data[0].continents[0]}</p>
                <p>Currency: ${data[0].currencies[Object.keys(data[0].currencies)].name}<span> <strong>${data[0].currencies[Object.keys(data[0].currencies)].symbol}</strong></span></p>
                <p>Languages: ${Object.values(data[0].languages).toString().split(",").join(", ")}</p>`;

            countryInp.value = "";
        })
        .catch((error) => {
            console.error("Error fetching country data:", error);
            showToast("An error occurred while fetching country data");
        });
});

function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "top", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #ff4b2b, #ff416c)", 
    }).showToast();
}
