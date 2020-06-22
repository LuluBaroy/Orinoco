//Getting products' information with Promise
function connection(url) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject();
                }
            }
        };
        request.open("GET", url);
        request.send();
    });
};

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
    let euros = price.toString().slice(0, price.toString().length - 2);
    priceText.textContent = text + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(euros);
    return euros;
}

// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

let slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}
export {openModal};
export {closeModal};
export {showSlides};
export {connection};
export{urlStr};
export{priceCalculation};
export{modifyingHeader};