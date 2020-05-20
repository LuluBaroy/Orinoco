//Getting Product ID
let linkOfPage = window.location.href;
let queryStr = window.location.search;
let urlStr = new URLSearchParams(queryStr);
let idProducts = urlStr.get('id');

const connection = function(url){
    return new Promise(function (resolve, reject) {
        let teddies = new XMLHttpRequest();
        teddies.onreadystatechange = function() {
            if (teddies.readyState === XMLHttpRequest.DONE){
                if(teddies.status === 200) {
                    resolve(JSON.parse(teddies.responseText));
                } else {
                    reject();
                }
            }
        }
        teddies.open("GET", url);
        teddies.send();
    })
}

//Getting products informations
connection('http://localhost:3000/api/teddies').then(function (response) {
    let products = [];
    products = response;
    products.forEach(function (response) {
        if (response._id === idProducts) {
            //Product Page
            let sectionProducts = document.createElement('section');

            let imageProducts = document.createElement('img');
            imageProducts.src = response.imageUrl;
            imageProducts.alt = "Photo Ourson " + response.name;
            imageProducts.title = "Photo de présentation ourson " + response.name;

            let divProducts = document.createElement('div');

            let titleProducts = document.createElement('h1');
            titleProducts.textContent = response.name;

            let refProduct = document.createElement('p');
            refProduct.textContent = "Ref: " + response._id;

            let descriptionProducts = document.createElement('p');
            descriptionProducts.textContent = response.description;

            let labelSelect = document.createElement('label');
                labelSelect.for = "color-select";
                labelSelect.textContent = "Couleur : ";
            let selectProduct = document.createElement('select');
            function getAllOptions() {
                response.colors.forEach((value, index) => {
                    let option = document.createElement('option');
                    let optionValue = document.createTextNode(value);
                    option.appendChild(optionValue);
                    selectProduct.appendChild(option);
                })
            }

            let priceProduct = document.createElement('p');
            let priceLength = response.price.toString();
            priceProduct.textContent = `Prix : ${priceLength[0]}${priceLength[1]}.${priceLength[2]}${priceLength[3]} €`;

            let buttonBasket = document.createElement('button');
            buttonBasket.textContent = 'Ajouter au panier';
            buttonBasket.addEventListener('onclick', function () {

            });

            getAllOptions();
            document.getElementById('productPage').appendChild(sectionProducts);
            sectionProducts.appendChild(imageProducts);
            sectionProducts.appendChild(divProducts);
            divProducts.appendChild(titleProducts);
            divProducts.appendChild(refProduct);
            divProducts.appendChild(descriptionProducts);
            divProducts.appendChild(labelSelect);
            divProducts.appendChild(selectProduct);
            divProducts.appendChild(priceProduct);
            divProducts.appendChild(buttonBasket);
        }
    })
})


