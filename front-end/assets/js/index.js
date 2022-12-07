import {connection, modifyingHeader, aboutUs, contactUs} from "./main";

modifyingHeader();
let isClicked = false;
let currentParam = 'teddies';

function getItems(param) {

    //Creating the list container
    document.getElementById('body-homepage').style.height = 'auto';
    document.getElementById('imgHomepage').style.display = 'none';
    let imgLoader = document.createElement('img');
    imgLoader.classList.add("loader");
    imgLoader.src = "assets/img/loader.svg" ;
    let sectionProducts = document.createElement('section');
    sectionProducts.id = 'container-list';
    document.getElementById('homepage').appendChild(sectionProducts);
    sectionProducts.appendChild(imgLoader);

    //Checking if a button has alrealdy been clicked and which product type is called
    if (isClicked === false || currentParam !== param) {
        if (isClicked === true) { //If a button has already been clicked and the product type is different,
            document.getElementById('container-list').remove(); //Deleting the previous products list
        }
        connection("https://orinoco44.herokuapp.com/" + param).then(function (response) {

            sectionProducts.removeChild(imgLoader);
            //For each products, we create HTML structure
            response.forEach(function (response) {
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
window.getItems = getItems;
window.aboutUs = aboutUs;
window.contactUs = contactUs;
