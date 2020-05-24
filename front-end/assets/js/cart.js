//Modifying the Header if products were added on other pages
document.getElementById('btn-basket-basket').innerHTML = "<img class=\"basket\" src=\"../assets/img/basket.png\"> Panier ( " + productsAdded + " )";

//Getting products stored in localStorage
let productsAddedToCart = JSON.parse(localStorage.getItem('cart'));


let sectionCart = document.createElement('section');
document.getElementById('cart').appendChild(sectionCart);
if(productsAddedToCart === null){
    let empty = document.createElement('p');
    empty.textContent = "Votre panier est vide !!"
    document.getElementById('cart').appendChild(empty);
} else {
    for(let i in productsAddedToCart){

        document.getElementById('cart').style.height = "auto";
        let articlesCart = document.createElement('article');
        let idProductCart = document.createElement('p');
            idProductCart.textContent = productsAddedToCart[i].id;
        let linkProductsPageCart = document.createElement('a');
            linkProductsPageCart.href = '../pages/products.html?type=' + productsAddedToCart[i].param + '&id=' + productsAddedToCart[i].id;
            linkProductsPageCart.ariaLabel = "Page du produit";
        let imageProductsCart = document.createElement('img');
            imageProductsCart.src = productsAddedToCart[i].imgUrl;
            imageProductsCart.alt = "Photo " + productsAddedToCart[i].name;
            imageProductsCart.title = "Photo de " + productsAddedToCart[i].name;
        let divProductsCart = document.createElement('div');
        let titleProductsCart = document.createElement('h2');
            titleProductsCart.textContent = productsAddedToCart[i].name;
        let priceProductsCart = document.createElement('p');
        let priceLengthCart = productsAddedToCart[i].price;
        priceCalculation(priceLengthCart, priceProductsCart, 'Prix : ');

        let quantityProductsCart = document.createElement('p');
            quantityProductsCart.textContent = "Quantité : " + productsAddedToCart[i].quantity;
        let totalPriceByProducts = document.createElement('p');
        let totalPriceCalculation = (productsAddedToCart[i].price * productsAddedToCart[i].quantity);
        priceCalculation(totalPriceCalculation, totalPriceByProducts, 'Prix Total : ');

        sectionCart.appendChild(articlesCart);
        articlesCart.appendChild(linkProductsPageCart);
        linkProductsPageCart.appendChild(imageProductsCart);
        articlesCart.appendChild(divProductsCart);
        divProductsCart.appendChild(titleProductsCart);
        divProductsCart.appendChild(idProductCart);
        divProductsCart.appendChild(priceProductsCart);
        divProductsCart.appendChild(quantityProductsCart);
        divProductsCart.appendChild(totalPriceByProducts);
    }
}