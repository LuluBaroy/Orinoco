//Getting Product ID
let linkOfPage = window.location.href;
let queryStr = window.location.search;
let urlStr = new URLSearchParams(queryStr);
let idProducts = urlStr.get('id');

//Getting products informations with Promise
const connection = function(url){
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE){
                if(request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject();
                }
            }
        }
        request.open("GET", url);
        request.send();
    })
}

//Calling of the promise
connection('http://localhost:3000/api/teddies').then(function (response) {
    //Creating a variable to stock response
    let products = [];
    products = response;

    //For each products, we're creating the HTML structure
    products.forEach(function (response) {
        if (response._id === idProducts) {
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

            //Getting all color options
            function getAllOptions() {
                response.colors.forEach((value, index) => {
                    let option = document.createElement('option');
                    let optionValue = document.createTextNode(value);
                    option.appendChild(optionValue);
                    selectProduct.appendChild(option);
                })
            }

            //Converting the price in euro
            let priceProduct = document.createElement('p');
            let priceLength = response.price.toString();
            priceProduct.textContent = `Prix : ${priceLength[0]}${priceLength[1]}.${priceLength[2]}${priceLength[3]} €`;

            //Possibility to choose quantity
            let quantity = document.createElement('label');
                quantity.for = "quantity";
                quantity.textContent = "Quantité : ";
                quantity.className = "selectQuantity";
            let selectQuantity = document.createElement('select');
                selectQuantity.name = "quantity";
                selectQuantity.id = "quantityChoose";

            function optionQuantity(){
                let j = 0;
                while(j<=8){
                    j++;
                    let option = document.createElement('option');
                    option.textContent = j;
                    option.value = j;
                    selectQuantity.appendChild(option);
                }
            }
            //Creating the select element by calling the optionQuantity function
            optionQuantity();

            //Basket button
            let buttonBasket = document.createElement('button');
            buttonBasket.textContent = 'Ajouter au panier';
            buttonBasket.addEventListener('click', function (event) {

            });

            getAllOptions();    //Calling of the option function

            //Placing all elements in the product page
            document.getElementById('productPage').appendChild(sectionProducts);
            sectionProducts.appendChild(imageProducts);
            sectionProducts.appendChild(divProducts);
            divProducts.appendChild(titleProducts);
            divProducts.appendChild(refProduct);
            divProducts.appendChild(descriptionProducts);
            divProducts.appendChild(labelSelect);
            divProducts.appendChild(selectProduct);
            divProducts.appendChild(quantity);
            quantity.appendChild(selectQuantity);
            divProducts.appendChild(priceProduct);
            divProducts.appendChild(buttonBasket);
        }
    })
})

