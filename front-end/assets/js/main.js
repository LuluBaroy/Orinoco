import Swal from "sweetalert2";

//Function for popup message
function myModal(timer, message, image){
    Swal.fire({
        position: 'center',
        title: message,
        imageUrl: image,
        showConfirmButton: false,
        timer: timer
    })
}

//Getting products' information with Promise
function connection(url) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(myModal(4000, 'Une erreur est survenue, merci de réessayer ultérieurement', 'https://thumbs.gfycat.com/DiligentWastefulGavial-small.gif'), setTimeout(function(){location.reload()}, 3000));
                }
            }
        };
        request.open("GET", url);
        request.send();
    });
}

//Getting Product ID
let queryStr = window.location.search;
let urlStr = new URLSearchParams(queryStr);

//Modifying Header with number of products added in cart
function modifyingHeader(){
    let productsAdded;
    if (JSON.parse(localStorage.getItem('cart')) === null) {
        productsAdded = 0;
    } else {
        productsAdded = JSON.parse(localStorage.getItem('cart')).length;
        if (document.getElementById('return')) {
            document.getElementById('btn-cart').innerHTML = "<img class=\"basket\" src='../assets/img/basket.png' alt='Image panier'> Panier ( " + productsAdded + " )";
        } else {
            document.getElementById('btn-cart').innerHTML = "<img class=\"basket\" src='assets/img/basket.png' alt='Image panier'> Panier ( " + productsAdded + " )";
        }
    }
}

//Function to convert price in euro
function priceCalculation(price, priceText, text) {
    let euros = price/100;
    priceText.textContent = text + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(euros);
    return euros;
}

// Popup functions
function aboutUs() {
    Swal.fire({
        imageUrl: '../assets/img/aboutUs.jpg',
        backdrop: `rgba(0,0,0,0.85)`
    })
}
function contactUs() {
    Swal.fire({
        imageUrl: '../assets/img/contacts.jpg',
        backdrop: `rgba(0,0,0,0.85)`
    })
}

//Exports
export {aboutUs, contactUs, connection, urlStr, priceCalculation, modifyingHeader, myModal};