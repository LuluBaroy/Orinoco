//Getting products informations with Promise
const connection = function(url){
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE){
               if(request.status === 200) {
                   resolve(JSON.parse(request.responseText));
               } else {
                   reject();
               }
            }
        }
        request.open("GET", url);
        request.send();
    })
}

//Getting Product ID
let queryStr = window.location.search;
let urlStr = new URLSearchParams(queryStr);
let currentParamProducts = urlStr.get('type');

let productsAdded = 0;
if(JSON.parse(localStorage.getItem('cart')) === null){
    productsAdded = 0;
} else {
    productsAdded = JSON.parse(localStorage.getItem('cart')).length;
}
function modifyingHeader(id, root){
    document.getElementById(id).innerHTML = "<img class=\"basket\" src=" + root + "assets/img/basket.png" + "> Panier ( " + productsAdded + " )";
}


function priceCalculation(price, priceText, text) {
   let euros = price.toString().slice(0, price.toString().length - 2);
    priceText.textContent = text + new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR', minimumFractionDigits: 2}).format(euros);
    return euros;
}
