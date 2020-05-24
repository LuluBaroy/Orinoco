//Modifying the Header if products were added on other pages
if(productsAdded > 0){
    document.getElementById('btn-basket-products').innerHTML = "<img class=\"basket\" src=\"../assets/img/basket.png\"> Panier ( " + productsAdded + " )";
}

//Calling of the promise
connection('http://localhost:3000/api/' + currentParamProducts).then(function (response) {
    //Creating a variable to stock response
    let products = [];
    products = response;

    //For each product, we're creating the HTML structure
    products.forEach(function (response) {
        let sectionProducts = document.createElement('section');
        let buttonCart = document.createElement('button');
        buttonCart.textContent = 'Ajouter au panier';

        //If the ID got in 'products' is the same of the URL's param
        if (response._id === idProducts) {
            let imageProducts = document.createElement('img');
                imageProducts.src = response.imageUrl;
                imageProducts.alt = "Photo "+ currentParamProducts + " " +response.name;
                imageProducts.title = "Photo de présentation " + currentParamProducts+ " " + response.name;
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
            switch (currentParamProducts){
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
                })
            }

            //Calling of the option function with the switch value as parameter
            getAllOptions(firstProperty);

            let priceProduct = document.createElement('p');
            let priceLength = response.price;

            //Converting the price in euro
            priceCalculation(priceLength, priceProduct, `Prix : `);

            //Possibility to choose quantity
            let quantity = document.createElement('label');
                quantity.for = "quantity";
                quantity.textContent = "Quantité : ";
                quantity.className = "selectQuantity";
            let selectQuantity = document.createElement('select');
                selectQuantity.name = "quantity";
                selectQuantity.id = "quantityChoose";

             //Creating possibility to choose quantity of each products
            function optionQuantity(){
                let j = 0;
                while(j<=8){
                    j++;
                    let option = document.createElement('option');
                    option.textContent = j;
                    option.value = j;
                    selectQuantity.appendChild(option);
                }
            }
            //Creating the 'select' element by calling the optionQuantity function
            optionQuantity();

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
        }

        //Creating a new Class to add different products easily
        class Line{
            constructor(param, imgUrl, name, id, quantity, price){
                this.param = param;
                this.imgUrl = imgUrl;
                this.name = name;
                this.id = id;
                this.quantity = quantity;
                this.price = price;
            }
        }
        //Parametring the buttonCart
        buttonCart.addEventListener('click', function (event) {

            //Modifying Header when clicking on the buttonCart
            document.getElementById('btn-basket-products').innerHTML = "<img class=\"basket\" src=\"../assets/img/basket.png\"> Panier ( " + productsAdded + " )";

            //Getting the locally stored item and verifying if this is the first product added
            let cartUp = JSON.parse(localStorage.getItem('cart'));

            if(cartUp === null){                  //if this is the first product added, creating new line and stocking it
                alert('Produit ajouté au panier !');
                let cart = [];
                let firstLine = new Line(currentParamProducts, response.imageUrl, response.name, response._id, parseInt(quantityChoose.value), response.price);
                cart.push(firstLine);
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            } else {                              //Else, verifying if the product has already been added
                let cartUp2 = JSON.parse(localStorage.getItem('cart'));
                let productAlreadyAdded = false;
                for (let k in cartUp2) {
                    if (cartUp2[k].id === response._id) {
                        productAlreadyAdded = true;
                        cartUp2[k].quantity = parseInt(cartUp2[k].quantity) + parseInt(quantityChoose.value);
                        alert('La quantité a été augmentée pour ce produit !');
                    }
                }
                if (!productAlreadyAdded) {
                    cartUp2.push(new Line(currentParamProducts, response.imageUrl, response.name, response._id, parseInt(quantityChoose.value), response.price));
                    alert('Nouveau produit ajouté !');
                }
                localStorage.setItem('cart', JSON.stringify(cartUp2));
                location.reload();
            }
        });
    })
})
