
//Getting products informations
const connection = function(url){
    return new Promise(function (resolve, reject) {
        let teddies = new XMLHttpRequest();
        teddies.onreadystatechange = function() {
            if (teddies.readyState === XMLHttpRequest.DONE){
               if(teddies.status === 200) {
                   resolve(JSON.parse(teddies.responseText));
               } else {
                   reject();
               }
            }
        }
        teddies.open("GET", url);
        teddies.send();
    })
}
let btn = document.getElementById('btn-teddies');
let actualURL = window.location;
btn.addEventListener('click', function(event) {
    connection("http://localhost:3000/api/teddies").then(function (response) {
        actualUrl = window.location.protocol+'//'+window.location.hostname+":3000";
        console.log(actualUrl);
        let products = [];
        products = response;
        products.forEach(function (response) {
            let sectionProducts = document.createElement('section');
            let linkProductsPage = document.createElement('a');
            let idProduct = response._id;
            linkProductsPage.href = 'pages/products.html?id=' + idProduct;
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

            document.getElementById('homepage').appendChild(sectionProducts);
            sectionProducts.appendChild(linkProductsPage);
            linkProductsPage.appendChild(imageProducts);
            sectionProducts.appendChild(divProducts);
            divProducts.appendChild(titleProducts);
            divProducts.appendChild(descriptionProducts);
        });
    }).catch();
});


