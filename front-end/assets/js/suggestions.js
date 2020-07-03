import {productsAddedToCart, sectionCart} from "./cart";
import {connection} from "./main";

if (productsAddedToCart === null) { //If the cart is empty, creating a button to go back to homepage and a product suggestion
    sectionCart.id = "emptyCartSection";
    let textEmptyCart = document.createElement('h2');
    textEmptyCart.textContent = "Votre panier est vide !!";
    let findProducts = document.createElement('p');
    findProducts.textContent = 'Retrouvez tous nos produits ici : ';

    //Creating button to go back to Homepage
    let buttonReturnHomepage = document.createElement('button');
    buttonReturnHomepage.textContent = "Nos produits";
    buttonReturnHomepage.addEventListener('click', function (event) {
        window.location.href = "../index.html";
    });

    //Products suggestions for users
    let productsSuggested = document.createElement('p');
    productsSuggested.textContent = "Ces produits pourraient vous plaire :";

    //Placing all elements in the cart page
    sectionCart.appendChild(textEmptyCart);
    sectionCart.appendChild(findProducts);
    sectionCart.appendChild(buttonReturnHomepage);
    sectionCart.appendChild(productsSuggested);

    let imgLoader = document.createElement('img');
    imgLoader.classList.add("loader");
    imgLoader.src = "../assets/img/loader.svg" ;
    productsSuggested.appendChild(imgLoader);
    let divSuggestion = document.createElement('div');
    divSuggestion.id = "divSuggestion";


    function suggestionsProducts() {
        //Getting a product type randomly
        let productsType = ['teddies','furniture','cameras'];
        let paramChose = [];
        for(let i =0; i < 3; i++){
            paramChose.push(productsType[Math.floor(Math.random() * (productsType.length))]);
        }

        let selectedProduct=[];

        paramChose.forEach((item, index) => {
            //Then, with the type randomly got, getting a product of that type
            connection("http://localhost:3000/api/" + item).then(function (response) {
               if(productsSuggested.appendChild(imgLoader)){
                   productsSuggested.removeChild(imgLoader);
               }
                function getProduct(){
                    let randomProducts=response[Math.floor(Math.random() * response.length)];
                    if (selectedProduct.length === 0 || selectedProduct.findIndex(i => i._id === randomProducts._id) === -1) {
                        selectedProduct.push(randomProducts);
                        let articleSuggestion = document.createElement('article');
                        let linkProductSuggested = document.createElement('a');
                        linkProductSuggested.href = linkProductSuggested.href = 'products.html?type=' + item + '&id=' + randomProducts._id;
                        let imageProductsSuggested = document.createElement('img');
                        imageProductsSuggested.src = randomProducts.imageUrl;
                        imageProductsSuggested.alt = "Photo Ourson " + randomProducts.name;
                        imageProductsSuggested.title = "Photo de présentation ourson " + randomProducts.name;
                        let titleProduct = document.createElement('h3');
                        titleProduct.textContent = randomProducts.name;

                        sectionCart.appendChild(divSuggestion);
                        divSuggestion.appendChild(articleSuggestion);
                        articleSuggestion.appendChild(linkProductSuggested);
                        linkProductSuggested.appendChild(imageProductsSuggested);
                        articleSuggestion.appendChild(titleProduct);
                    }
                    else{
                        getProduct();
                    }
                }
                getProduct();
            });
        })
    }
    suggestionsProducts();
}