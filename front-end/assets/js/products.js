import {connection} from "./main";
import{urlStr} from "./main";
import {priceCalculation} from "./main";
import {modifyingHeader} from "./main";

//calling the modifyingHeader function
modifyingHeader();

//Calling of the promise
connection('http://localhost:3000/api/' + urlStr.get('type') + "/" + urlStr.get("id")).then(function (response) {
    let sectionProducts = document.createElement('section');
    let imageProducts = document.createElement('img');
    imageProducts.src = response.imageUrl;
    imageProducts.alt = "Photo " + urlStr.get('type') + " " + response.name;
    imageProducts.title = "Photo de présentation " + urlStr.get('type') + " " + response.name;
    let divProducts = document.createElement('div');
    let titleProducts = document.createElement('h1');
    titleProducts.textContent = response.name;
    let refProduct = document.createElement('p');
    refProduct.textContent = "Ref: " + response._id;
    let descriptionProducts = document.createElement('p');
    descriptionProducts.textContent = response.description;
    let labelSelect = document.createElement('label');
    labelSelect.for = "option-product";
    labelSelect.textContent = "Options : ";
    let selectProduct = document.createElement('select');

    //Switching option property according to URL's param
    let firstProperty = "";
    switch (urlStr.get('type')) {
        case "teddies":
            firstProperty = 'colors';
            break;
        case "cameras":
            firstProperty = 'lenses';
            break;
        case "furniture":
            firstProperty = "varnish";
            break;
    }

    //Getting all options
    function getAllOptions(value) {
        response[value].forEach((value, index) => {
            let option = document.createElement('option');
            let optionValue = document.createTextNode(value);
            option.appendChild(optionValue);
            selectProduct.appendChild(option);
        });
    }

    //Calling of the option function with the switch value as parameter
    getAllOptions(firstProperty);

    //Possibility to choose quantity
    let quantity = document.createElement('label');
    quantity.for = "quantity";
    quantity.textContent = "Quantité : ";
    quantity.className = "selectQuantity";
    let selectQuantity = document.createElement('select');
    selectQuantity.name = "quantity";
    selectQuantity.id = "quantityChoose";

    //Creating possibility to choose quantity of each products
    function optionQuantity() {
        let j = 0;
        while (j <= 8) {
            j++;
            let option = document.createElement('option');
            option.textContent = j;
            option.value = j;
            selectQuantity.appendChild(option);
        }
    }
    //Creating the 'select' element by calling the optionQuantity function
    optionQuantity();

    let priceProduct = document.createElement('p');
    let priceLength = response.price;
    //Converting the price in euro
    priceCalculation(priceLength, priceProduct, `Prix : `);

    //Parametring the buttonCart
    let buttonCart = document.createElement('button');
    buttonCart.textContent = 'Ajouter au panier';

    //When clicking on the buttonCart
    buttonCart.addEventListener('click', function (event) {

        //Getting the locally stored item
        let cartUp = JSON.parse(localStorage.getItem('cart'));

        //Creating a new Class to add different products easily in the localStorage item
        class Line {
            constructor(param, imgUrl, name, id, quantity, price) {
                this.param = param;
                this.imgUrl = imgUrl;
                this.name = name;
                this.id = id;
                this.quantity = quantity;
                this.price = price;
            }
        }

        if (cartUp === null) {
            //if this is the first product added, creating new line and stocking it
            let cart = [];
            let firstLine = new Line(urlStr.get('type'), response.imageUrl, response.name, response._id, parseInt(quantityChoose.value), response.price);
            cart.push(firstLine);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        } else {
            //Else, verifying if the product has already been added
            let cartUp2 = JSON.parse(localStorage.getItem('cart'));
            let productAlreadyAdded = false;
            for (let k in cartUp2) {
                //If the product is already added, we modify its quantity
                if (cartUp2[k].id === response._id) {
                    productAlreadyAdded = true;
                    cartUp2[k].quantity = parseInt(cartUp2[k].quantity) + parseInt(quantityChoose.value);
                }
            }
            //If the product isn't already added, we add it
            if (!productAlreadyAdded) {
                cartUp2.push(new Line(urlStr.get('type'), response.imageUrl, response.name, response._id, parseInt(quantityChoose.value), response.price));
            }
            localStorage.setItem('cart', JSON.stringify(cartUp2));
            location.reload();
        }
    });

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
    divProducts.appendChild(buttonCart);
});