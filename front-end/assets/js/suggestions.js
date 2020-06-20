import {productsAddedToCart} from "./cart";
import {sectionCart} from "./cart";
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
    let divProductsSuggested = document.createElement('div');
    divProductsSuggested.id = 'productsSuggestedContainer';

    //Placing all elements in the cart page
    sectionCart.appendChild(textEmptyCart);
    sectionCart.appendChild(findProducts);
    sectionCart.appendChild(buttonReturnHomepage);
    sectionCart.appendChild(productsSuggested);
    sectionCart.appendChild(divProductsSuggested);

    function suggestionsProducts() {
        //Getting a product type randomly
        let productsType = ['teddies','furniture','cameras'];
        let paramChose = productsType[Math.floor(Math.random() * (productsType.length-1))];
        //Then, with the type randomly got, getting a product of that type
        connection("http://localhost:3000/api/" + paramChose).then(function (response) {
            function getProduct(){
                let randomProducts=response[Math.floor(Math.random() * response.length)];
                if (arrayForProductRandomlySelected.length === 0 || arrayForProductRandomlySelected.findIndex(i => i._id === randomProducts._id) === -1) {
                    return randomProducts;
                }
            }
            //Initializing an array to stock every product randomly chose
            let arrayForProductRandomlySelected = [];
            //Calling the function
            while(arrayForProductRandomlySelected.length < 3){
                arrayForProductRandomlySelected.push(getProduct());
            }
            console.log(arrayForProductRandomlySelected);
            let divSuggestion = document.createElement('div');
            divSuggestion.id = "divSuggestion";
            arrayForProductRandomlySelected.forEach(function(response){
                let articleSuggestion = document.createElement('article');
                let linkProductSuggested = document.createElement('a');
                linkProductSuggested.href = 'products.html?type=' + paramChose + '&id=' + response._id;
                let imageProductsSuggested = document.createElement('img');
                imageProductsSuggested.src = response.imageUrl;
                imageProductsSuggested.alt = "Photo Ourson " + response.name;
                imageProductsSuggested.title = "Photo de présentation ourson " + response.name;
                let titleProduct = document.createElement('h3');
                titleProduct.textContent = response.name;

                sectionCart.appendChild(divSuggestion);
                divSuggestion.appendChild(articleSuggestion);
                articleSuggestion.appendChild(linkProductSuggested);
                linkProductSuggested.appendChild(imageProductsSuggested);
                articleSuggestion.appendChild(titleProduct);
            })


        });
    }
    suggestionsProducts();
}