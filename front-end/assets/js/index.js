//Defining different btns state
let isClicked = false;
let currentParam = 'teddies';
console.log(window.location.href);
function getItems(param) {
    //Creating the list container
    let sectionProducts = document.createElement('section');
    sectionProducts.id = "container-list";

    if(isClicked === false || currentParam !== param){
        if(isClicked === true){
            document.getElementById('container-list').remove();
        }
        document.getElementById('homepage').appendChild(sectionProducts);
        document.getElementById('homepage').style.height = 'auto';
        connection("http://localhost:3000/api/" + param).then(function (response) {
            /* Dynamic URL
            window.location.href = window.location.protocol + "//" + window.location.hostname + ":3000/api/" + param;
            */
            //Getting all products informations then stocking it into 'products' variable
            let products = [];
            products = response;
            console.log(products);
            //For each products, we create HTML structure
            products.forEach(function (response) {
                let articleProducts = document.createElement('article');
                let linkProductsPage = document.createElement('a');
                let idProduct = response._id;
                    linkProductsPage.href = 'pages/products.html?type=' + param + '&id=' + idProduct;
                    linkProductsPage.ariaLabel = "Page du produit";
                let imageProducts = document.createElement('img');
                    imageProducts.src = response.imageUrl;
                    imageProducts.alt = "Photo Ourson " + response.name;
                    imageProducts.title = "Photo de présentation ourson " + response.name;
                let divProducts = document.createElement('div');
                let titleProducts = document.createElement('h2');
                    titleProducts.textContent = response.name;
                let descriptionProducts = document.createElement('p');
                    descriptionProducts.textContent = response.description;

                //Placing new elements on the index page
                sectionProducts.appendChild(articleProducts);
                articleProducts.appendChild(linkProductsPage);
                linkProductsPage.appendChild(imageProducts);
                articleProducts.appendChild(divProducts);
                divProducts.appendChild(titleProducts);
                divProducts.appendChild(descriptionProducts);

                currentParam = param;
                isClicked = true;
            });
        }).catch();
    }
}
modifyingHeader('btn-cart-index', '');
localStorage.getItem('cart');
