//Getting products stored in localStorage
let productsAddedToCart = JSON.parse(localStorage.getItem('cart'));
let titleCart = document.createElement('h1');
    titleCart.textContent = "Panier";
let sectionCart = document.createElement('section');
document.getElementById('cart').style.height = 'auto';
document.getElementById('cart').appendChild(sectionCart);
sectionCart.appendChild(titleCart);

if(productsAddedToCart === null){

    //Creating the design for an empty cart
    sectionCart.id = "emptyCartSection";
    let textEmptyCart = document.createElement('h2');
    textEmptyCart.textContent = "Votre panier est vide !!"
    let findProducts = document.createElement('p');
        findProducts.textContent = 'Retrouvez tous nos produits ici : ';

    //Creating button to go back to Homepage
    let buttonReturnHomepage = document.createElement('button');
        buttonReturnHomepage.textContent = "Nos produits";
        buttonReturnHomepage.addEventListener('click', function(event){
            window.location.href = "../index.html";
        })

    //Products suggestions for users
    let productsSuggested = document.createElement('p');
        productsSuggested.textContent = "Ces produits pourraient vous plaire :"
    let divProductsSuggested = document.createElement('div');
        divProductsSuggested.id = 'productsSuggestedContainer';

    //Placing all elements in the cart page
        sectionCart.appendChild(textEmptyCart);
        sectionCart.appendChild(findProducts);
        sectionCart.appendChild(buttonReturnHomepage);
        sectionCart.appendChild(productsSuggested);
        sectionCart.appendChild(divProductsSuggested);

    //Function to randomly generate products visualisations for users
    function suggestionsProducts(){
        let randomParam = Math.floor(Math.random()*3);
        let paramChose = "";
        switch (randomParam) {
            case 0: paramChose = 'teddies';
                break;
            case 1: paramChose = 'furniture';
                break;
            case 2: paramChose = 'cameras';
                break;
        }
        connection("http://localhost:3000/api/" + paramChose).then(function(response){
            let randomProducts = Math.floor(Math.random()* 5);
            let productsChose = "";
            let titleProductChose = "";
            let imgSrc = "";
            let linkProduct = "";
            let priceOfProduct = "";
            switch (randomProducts){
                case 0: productsChose = response[0]._id;
                        titleProductChose = response[0].name;
                        imgSrc = response[0].imageUrl;
                        linkProduct = 'products.html?type=' + paramChose + '&id=' + response[0]._id;
                        priceOfProduct = response[0].price;
                        break;
                case 1: productsChose = response[1]._id;
                        titleProductChose = response[1].name;
                        imgSrc = response[1].imageUrl;
                        linkProduct = 'products.html?type=' + paramChose + '&id=' + response[1]._id;
                        priceOfProduct = response[1].price;
                        break;
                case 2: productsChose = response[2]._id;
                        titleProductChose = response[2].name;
                        imgSrc = response[2].imageUrl;
                        linkProduct = 'products.html?type=' + paramChose + '&id=' + response[2]._id;
                        priceOfProduct = response[2].price;
                        break;
                case 3: productsChose = response[3]._id;
                        titleProductChose = response[3].name;
                        imgSrc = response[3].imageUrl;
                        linkProduct = 'products.html?type=' + paramChose + '&id=' + response[3]._id;
                        priceOfProduct = response[3].price;
                        break;
                case 4: productsChose = response[4]._id;
                        titleProductChose = response[4].name;
                        imgSrc = response[4].imageUrl;
                        linkProduct = 'products.html?type=' + paramChose + '&id=' + response[4]._id;
                        priceOfProduct = response[4].price;
                        break;
            }

            //Creating the visualisations' layout
            let articleSuggested = document.createElement('article');
                articleSuggested.className = 'articleSuggested';
            let nameOfProduct = document.createElement('h3');
                nameOfProduct.textContent = titleProductChose;
            let imgProductSuggested = document.createElement('img');
                imgProductSuggested.src = imgSrc;
            let linkToProduct = document.createElement('a');
                linkToProduct.href = linkProduct;
            let priceText = document.createElement('p');
            let priceProductsSuggested = priceOfProduct;
            priceCalculation(priceProductsSuggested, priceText, 'Prix : ');

                //Placing new elements in cart page
                divProductsSuggested.appendChild(articleSuggested);
                articleSuggested.appendChild(nameOfProduct);
                articleSuggested.appendChild(linkToProduct);
                linkToProduct.appendChild(imgProductSuggested);
                articleSuggested.appendChild(priceText);
        })
    }

    //Calling the random suggestions (1 by product)
    suggestionsProducts();
    suggestionsProducts();
    suggestionsProducts();

} else {
    sectionCart.id = "sectionWithProducts";
    for(let i in productsAddedToCart){
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
            buttonMore.addEventListener('click', function(event){
                productsAddedToCart[i].quantity ++;
                localStorage.setItem('cart', JSON.stringify(productsAddedToCart));
                location.reload();
            })

        //Creating button to reduce a product's quantity
        let buttonLess = document.createElement('button');
            buttonLess.textContent = "-";
            buttonLess.addEventListener('click', function(event){
                if(productsAddedToCart[i].quantity === 1){
                    productsAddedToCart.splice([i], 1);
                    localStorage.setItem('cart', JSON.stringify(productsAddedToCart));
                    location.reload();
                    if(productsAddedToCart.length === 0){
                        localStorage.clear();
                        location.reload();
                    }
                } else {
                    productsAddedToCart[i].quantity --;
                    localStorage.setItem('cart', JSON.stringify(productsAddedToCart));
                    location.reload();
                }
            })

        //Calculating total price by product depending on quantity chose
        let totalPriceByProducts = document.createElement('p');
            totalPriceByProducts.className = "totalPriceByProducts";
        let totalPriceCalculation = (productsAddedToCart[i].price * productsAddedToCart[i].quantity);
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
    for(let j in productsAddedToCart){
        calculationTotalOrder += productsAddedToCart[j].price * productsAddedToCart[j].quantity;
    }
    let totalOrder = document.createElement('p');
        totalOrder.id = "totalPrice";
    priceCalculation(calculationTotalOrder, totalOrder, 'Prix total de la commande : ');
    sectionCart.appendChild(totalOrder);

    //Creating form
    let sectionForm = document.createElement('section');
        sectionForm.id = "sectionForm";
        sectionForm.innerHTML = "<form action=\"\" method=\"POST\" id=\"form1\">\n" +
            "  <div class=\"formCss\">\n" +
            "    <label for=\"name\">Nom : </label>\n" +
            "    <input type=\"text\" name=\"lastName\" id=\"lastName\" class='infoRequired' required placeholder='Nom' pattern='^[a-zA-Z]+$'>\n" +
            "  </div>\n" +
            "<div class=\"formCss\">\n" +
                "<label for=\"name\">Prénom : </label>\n" +
    "           <input type=\"text\" name=\"firstName\" id=\"firstName\" class='infoRequired'required placeholder='Prénom' pattern='^[a-zA-ZÀ-ÿ]+$'>\n" +
    "           </div>\n" +
            "  <div class=\"formCss\">\n" +
            "    <label for=\"city\">Adresse : </label>\n" +
            "    <input type=\"text\" name=\"address\" id=\"address\" class='infoRequired' required placeholder='Adresse'>\n" +
            "  </div>\n" +
            "  <div class=\"formCss\">\n" +
            "    <label for=\"city\">Ville : </label>\n" +
            "    <input type=\"text\" name=\"city\" id=\"city\" class='infoRequired' required placeholder='Ville' pattern='^[a-zA-Z]+$'>\n" +
            "  </div>\n" +
            "  <div class=\"formCss\">\n" +
            "    <label for=\"email\">Email : </label>\n" +
            "    <input type=\"email\" name=\"email\" id=\"email\" class='infoRequired' required placeholder='E-mail' pattern='^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})+$'>\n" +
            "  </div>\n" +
            "  <div class=\"formCss\">\n" +
            "    <input type=\"submit\" id='btn-submit' value=\"Validez votre commande !\">\n" +
            "  </div>\n" +
            "</form>"
    document.getElementById('cart').appendChild(sectionForm);
    document.getElementById('btn-submit').addEventListener('click', function(event){
        event.preventDefault();
        class userInfo {
            constructor(lastName, firstName, address, city, email) {
                this.lastName = lastName;
                this.firstName = firstName;
                this.address = address;
                this.city = city;
                this.email = email;
            }
        }
        let newUser = new userInfo(document.getElementById('lastName').value, document.getElementById('firstName').value, document.getElementById('address').value, document.getElementById('city').value, document.getElementById('email').value);
        class productsOrder{
            constructor(id, quantity) {
                this.id = id;
                this.quantity = quantity;
            }
        }
        let productsOrdered = new productsOrder(productsAddedToCart.id, productsAddedToCart.quantity);
        let form1 = document.getElementById('form1');
        if(!form1.checkValidity()){
            console.log("You've been a bad boy !");
        } else {
            console.log('Tadaaaaaa !');
        }
    })
}

modifyingHeader('btn-cart-cart', '../');