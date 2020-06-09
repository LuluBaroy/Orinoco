import {productsAddedToCart} from "./cart";
import {sectionCart} from "./cart";
import {connection} from "./main";
import {priceCalculation} from "./main";

if (productsAddedToCart === null) {
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

    let arrayForProductRandomlySelected = [];
    class ProductsRandomlySelected{
        constructor(param, id, name, image, url, price) {
            this.param = param;
            this.id = id;
            this.name = name;
            this.image = image;
            this.url = url;
            this.price = price;

        }
    }
    function suggestionsProducts() {
        for(let i = 0; i <= 5; i++) {
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
            connection("http://localhost:3000/api/" + paramChose).then(function (response) {
                let randomProducts = Math.floor(Math.random() * 5);
                if(arrayForProductRandomlySelected.length === 0){
                    switch (randomProducts) {
                        case 0:
                            arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[0]._id, response[0].name, response[0].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[0]._id, response[0].price));
                            break;
                        case 1:
                            arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[1]._id, response[1].name, response[1].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[1]._id, response[1].price));
                            break;
                        case 2:
                            arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[2]._id, response[2].name, response[2].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[2]._id, response[2].price));
                            break;
                        case 3:
                            arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[3]._id, response[3].name, response[3].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[3]._id, response[3].price));
                            break;
                        case 4:
                            arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[4]._id, response[4].name, response[4].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[4]._id, response[4].price));
                            break;
                    }
                } else {
                    let productsRandomId;
                    switch (randomProducts) {
                        case 0:
                            productsRandomId = response[0]._id;
                            break;
                        case 1:
                            productsRandomId = response[1]._id;
                            break;
                        case 2:
                            productsRandomId = response[2]._id;
                            break;
                        case 3:
                            productsRandomId = response[3]._id;
                            break;
                        case 4:
                            productsRandomId = response[4]._id;
                            break;
                    }
                    if(arrayForProductRandomlySelected.length === 1 && arrayForProductRandomlySelected[0].id !== productsRandomId || arrayForProductRandomlySelected.length === 2 && arrayForProductRandomlySelected[0].id !== productsRandomId && arrayForProductRandomlySelected[1].id !== productsRandomId) {
                        switch (productsRandomId) {
                            case response[0]._id:
                                arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[0]._id, response[0].name, response[0].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[0]._id, response[0].price));
                                break;
                            case response[1]._id:
                                arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[1]._id, response[1].name, response[1].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[1]._id, response[1].price));
                                break;
                            case response[2]._id:
                                arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[2]._id, response[2].name, response[2].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[2]._id, response[2].price));
                                break;
                            case response[3]._id:
                                arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[3]._id, response[3].name, response[3].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[3]._id, response[3].price));
                                break;
                            case response[4]._id:
                                arrayForProductRandomlySelected.push(new ProductsRandomlySelected(paramChose, response[4]._id, response[4].name, response[4].imageUrl, 'products.html?type=' + paramChose + '&id=' + response[4]._id, response[4].price));
                                break;
                        }
                    }
                    if(i === 5){
                        console.log(arrayForProductRandomlySelected);
                        //Creating the visualisations' layout
                        for(let j in arrayForProductRandomlySelected){
                            let articleSuggested = document.createElement('article');
                            articleSuggested.className = 'articleSuggested';
                            let nameOfProduct = document.createElement('h3');
                            nameOfProduct.textContent = arrayForProductRandomlySelected[j].name;
                            let imgProductSuggested = document.createElement('img');
                            imgProductSuggested.src = arrayForProductRandomlySelected[j].image;
                            let linkToProduct = document.createElement('a');
                            linkToProduct.href = arrayForProductRandomlySelected[j].url;
                            let priceText = document.createElement('p');
                            let priceProductsSuggested = arrayForProductRandomlySelected[j].price;
                            priceCalculation(priceProductsSuggested, priceText, 'Prix : ');

                            //Placing new elements in cart page
                            divProductsSuggested.appendChild(articleSuggested);
                            articleSuggested.appendChild(nameOfProduct);
                            articleSuggested.appendChild(linkToProduct);
                            linkToProduct.appendChild(imgProductSuggested);
                            articleSuggested.appendChild(priceText);
                        }

                    }
                }
            });
        }
    }
    suggestionsProducts();
}