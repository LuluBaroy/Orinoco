import{priceCalculation} from "./main";
import {modifyingHeader} from "./main";
import {openModal} from "./main";
import {closeModal} from "./main";
import {showSlides} from "./main";

modifyingHeader();
//Getting products stored in localStorage
let productsAddedToCart = JSON.parse(localStorage.getItem('cart'));

//Creating the cart display
let titleCart = document.createElement('h1');
titleCart.textContent = "Panier";
document.getElementById('cart').appendChild(titleCart);

let sectionCart = document.createElement('section');
document.getElementById('cart').appendChild(sectionCart);


//If there is product(s) added in the localStorage
if (productsAddedToCart !== null) {
    sectionCart.id = "sectionWithProducts";
    let sectionTitle = document.createElement('h2');
    sectionTitle.textContent = "Produit(s) Ajouté(s)";
    sectionTitle.id = "sectionTitle";
    sectionCart.appendChild(sectionTitle);
    for (let i in productsAddedToCart) {

        //Creating each product display
        let articlesCart = document.createElement('article');
        articlesCart.className = 'articlesSelected';
        let idProductCart = document.createElement('p');
        idProductCart.textContent = productsAddedToCart[i].id;

        //Possibility to go back on product page by clicking on its image
        let linkProductsPageCart = document.createElement('a');
        linkProductsPageCart.href = '../pages/products.html?type=' + productsAddedToCart[i].param + '&id=' + productsAddedToCart[i].id;
        linkProductsPageCart.ariaLabel = "Page du produit";

        //Creating different elements to describe products
        let imageProductsCart = document.createElement('img');
        imageProductsCart.src = productsAddedToCart[i].imgUrl;
        imageProductsCart.alt = "Photo " + productsAddedToCart[i].name;
        imageProductsCart.title = "Photo de " + productsAddedToCart[i].name;
        let divProductsCart = document.createElement('div');
        let titleProductsCart = document.createElement('h3');
        titleProductsCart.textContent = productsAddedToCart[i].name;

        //Getting the price of each product and converting it in euro
        let priceProductsCart = document.createElement('p');
        let priceLengthCart = productsAddedToCart[i].price;
        priceCalculation(priceLengthCart, priceProductsCart, 'Prix : ');

        let divQuantity = document.createElement('div');
        divQuantity.id = "divQuantity";
        //Quantity chose on product's page
        let quantityProductsCart = document.createElement('p');
        quantityProductsCart.textContent = "Quantité : " + productsAddedToCart[i].quantity;
        let divButtonQuantity = document.createElement('div');
        divButtonQuantity.id = "divButtonQuantity";
        //Creating a button to increase a product's quantity
        let buttonMore = document.createElement('button');
        buttonMore.textContent = "+";
        buttonMore.addEventListener('click', function (event) {
            //Increasing product's quantity, updating localStorage and reloading cart's page
            productsAddedToCart[i].quantity++;
            localStorage.setItem('cart', JSON.stringify(productsAddedToCart));
            location.reload();
        });

        //Creating button to reduce a product's quantity
        let buttonLess = document.createElement('button');
        buttonLess.textContent = "-";
        buttonLess.addEventListener('click', function (event) {
            if (productsAddedToCart[i].quantity === 1) { //if quantity left of the product equals one and we want to reduce it
                productsAddedToCart.splice([i], 1);  //deleting that product of local storage
                localStorage.setItem('cart', JSON.stringify(productsAddedToCart)); //updating the localStorage
                location.reload(); //Reloading the cart page
                if (productsAddedToCart.length === 0) { //If all products have been deleted
                    localStorage.clear(); //Clearing localStorage
                    location.reload(); //Reloading cart page
                }
            } else { //Else, reducing product's quantity, updating localStorage and reloading cart's page
                productsAddedToCart[i].quantity--;
                localStorage.setItem('cart', JSON.stringify(productsAddedToCart));
                location.reload();
            }
        });

        //Calculating total price by product depending on quantity chose
        let totalPriceByProducts = document.createElement('p');
        totalPriceByProducts.className = "totalPriceByProducts";
        let totalPriceCalculation = productsAddedToCart[i].price * productsAddedToCart[i].quantity;
        priceCalculation(totalPriceCalculation, totalPriceByProducts, 'Prix Total : ');

        //Placing new elements in cart page
        sectionCart.appendChild(articlesCart);
        articlesCart.appendChild(linkProductsPageCart);
        linkProductsPageCart.appendChild(imageProductsCart);
        articlesCart.appendChild(divProductsCart);
        divProductsCart.appendChild(titleProductsCart);
        divProductsCart.appendChild(idProductCart);
        divProductsCart.appendChild(priceProductsCart);
        divProductsCart.appendChild(divQuantity);
        divQuantity.appendChild(quantityProductsCart);
        divQuantity.appendChild(divButtonQuantity);
        divButtonQuantity.appendChild(buttonMore);
        divButtonQuantity.appendChild(buttonLess);
        divProductsCart.appendChild(totalPriceByProducts);
    }

    //Calculating the total order price
    let calculationTotalOrder = 0;
    for (let j in productsAddedToCart) {
        calculationTotalOrder += productsAddedToCart[j].price * productsAddedToCart[j].quantity;
    }
    let totalOrder = document.createElement('h3');
    totalOrder.id = "totalPrice";
    priceCalculation(calculationTotalOrder, totalOrder, 'Prix total de la commande : ');
    sectionCart.appendChild(totalOrder);
}
window.openModal = openModal;
window.closeModal = closeModal;
window.showSlides = showSlides;
require("./form");
require("./suggestions");
export {productsAddedToCart};
export{sectionCart};