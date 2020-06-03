if(productsAddedToCart === null) {
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
    function suggestionsProducts() {
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
            let productsChose = "";
            let titleProductChose = "";
            let imgSrc = "";
            let linkProduct = "";
            let priceOfProduct = "";
            switch (randomProducts) {
                case 0:
                    productsChose = response[0]._id;
                    titleProductChose = response[0].name;
                    imgSrc = response[0].imageUrl;
                    linkProduct = 'products.html?type=' + paramChose + '&id=' + response[0]._id;
                    priceOfProduct = response[0].price;
                    break;
                case 1:
                    productsChose = response[1]._id;
                    titleProductChose = response[1].name;
                    imgSrc = response[1].imageUrl;
                    linkProduct = 'products.html?type=' + paramChose + '&id=' + response[1]._id;
                    priceOfProduct = response[1].price;
                    break;
                case 2:
                    productsChose = response[2]._id;
                    titleProductChose = response[2].name;
                    imgSrc = response[2].imageUrl;
                    linkProduct = 'products.html?type=' + paramChose + '&id=' + response[2]._id;
                    priceOfProduct = response[2].price;
                    break;
                case 3:
                    productsChose = response[3]._id;
                    titleProductChose = response[3].name;
                    imgSrc = response[3].imageUrl;
                    linkProduct = 'products.html?type=' + paramChose + '&id=' + response[3]._id;
                    priceOfProduct = response[3].price;
                    break;
                case 4:
                    productsChose = response[4]._id;
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
    suggestionsProducts();
    suggestionsProducts();
    suggestionsProducts();
}
//Calling the random suggestions (1 by product)
