//Getting products stored in localStorage
let productsAddedToCart = JSON.parse(localStorage.getItem('cart'));

let titleCart = document.createElement('h1');
titleCart.textContent = "Panier";
let sectionCart = document.createElement('section');
document.getElementById('cart').appendChild(sectionCart);
sectionCart.appendChild(titleCart);

if (productsAddedToCart !== null) {
    sectionCart.id = "sectionWithProducts";
    for (let i in productsAddedToCart) {
        let articlesCart = document.createElement('article');
        articlesCart.className = 'articlesSelected';
        let idProductCart = document.createElement('p');
        idProductCart.textContent = productsAddedToCart[i].id;

        //Possibility to go back on product page by clicking on his image
        let linkProductsPageCart = document.createElement('a');
        linkProductsPageCart.href = '../pages/products.html?type=' + productsAddedToCart[i].param + '&id=' + productsAddedToCart[i].id;
        linkProductsPageCart.ariaLabel = "Page du produit";

        //Differents elements to describe products
        let imageProductsCart = document.createElement('img');
        imageProductsCart.src = productsAddedToCart[i].imgUrl;
        imageProductsCart.alt = "Photo " + productsAddedToCart[i].name;
        imageProductsCart.title = "Photo de " + productsAddedToCart[i].name;
        let divProductsCart = document.createElement('div');
        let titleProductsCart = document.createElement('h2');
        titleProductsCart.textContent = productsAddedToCart[i].name;

        //Getting the price of each product and converting it in euro
        let priceProductsCart = document.createElement('p');
        let priceLengthCart = productsAddedToCart[i].price;
        priceCalculation(priceLengthCart, priceProductsCart, 'Prix : ');

        let divQuantity = document.createElement('div');
        //Quantity chose on product's page
        let quantityProductsCart = document.createElement('p');
        quantityProductsCart.textContent = "Quantité : " + productsAddedToCart[i].quantity;

        //Creating a button to increase a product's quantity
        let buttonMore = document.createElement('button');
        buttonMore.textContent = "+";
        buttonMore.addEventListener('click', function (event) {
            productsAddedToCart[i].quantity++;
            localStorage.setItem('cart', JSON.stringify(productsAddedToCart));
            location.reload();
        });

        //Creating button to reduce a product's quantity
        let buttonLess = document.createElement('button');
        buttonLess.textContent = "-";
        buttonLess.addEventListener('click', function (event) {
            if (productsAddedToCart[i].quantity === 1) {
                productsAddedToCart.splice([i], 1);
                localStorage.setItem('cart', JSON.stringify(productsAddedToCart));
                location.reload();
                if (productsAddedToCart.length === 0) {
                    localStorage.clear();
                    location.reload();
                }
            } else {
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
        divQuantity.appendChild(buttonMore);
        divQuantity.appendChild(buttonLess);
        divProductsCart.appendChild(totalPriceByProducts);
    }

    //Calculating the total order price
    let calculationTotalOrder = 0;
    for (let j in productsAddedToCart) {
        calculationTotalOrder += productsAddedToCart[j].price * productsAddedToCart[j].quantity;
    }
    let totalOrder = document.createElement('p');
    totalOrder.id = "totalPrice";
    priceCalculation(calculationTotalOrder, totalOrder, 'Prix total de la commande : ');
    sectionCart.appendChild(totalOrder);
}