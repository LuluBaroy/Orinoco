//Getting products informations with Promise
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
//Using btn-teddies to launch the GET method with click event
let btn = document.getElementById('btn-teddies');
let isClicked = false;
btn.addEventListener('click', function(event) {

    //Verifying btn-teddies hasn't already been clicked
    if(isClicked === false) {
        connection("http://localhost:3000/api/teddies").then(function (response) {

            //Getting all products informations then stocking it into 'products' variable
            let products = [];
            products = response;

            //For each products, we create HTML structure
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

                //Placing new elements on the HTML page
                document.getElementById('homepage').appendChild(sectionProducts);
                sectionProducts.appendChild(linkProductsPage);
                linkProductsPage.appendChild(imageProducts);
                sectionProducts.appendChild(divProducts);
                divProducts.appendChild(titleProducts);
                divProducts.appendChild(descriptionProducts);

                //As isCliked passed to true, the function won't run again
                isClicked = true;

            });
        }).catch();
    } else {
        //Warning the users about why nothing's happening
        alert('Les articles sont déjà chargés ! Si vous ne les voyez pas il y a probablement une erreur de chargement serveur !');
    }
});


