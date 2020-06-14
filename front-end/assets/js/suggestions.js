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
        let randomParam = Math.floor(Math.random() * 3);
        let paramChose = "";
        switch (randomParam) {
            case 0:
                paramChose = 'teddies';
                break;
            case 1:
                paramChose = 'furniture';
                break;
            case 2:
                paramChose = 'cameras';
                break;
        }
        //Then, with the type randomly got, getting a product of that type
        connection("http://localhost:3000/api/" + paramChose).then(function (response) {
            let randomProducts = response[Math.floor(Math.random() * response.length)];
            if (arrayForProductRandomlySelected.length === 0) {
                return randomProducts;
            } else {
                if (arrayForProductRandomlySelected.findIndex(i => i._id === randomProducts._id) === -1) {
                    return randomProducts;
                }
            }

        });

    }

    //Initializing an array to stock every product randomly chose
    let arrayForProductRandomlySelected = [];
    //Calling the function
    for(let i = arrayForProductRandomlySelected.length; i !== 3; i++){
        arrayForProductRandomlySelected.push(suggestionsProducts());
        console.log(arrayForProductRandomlySelected);
    }

}