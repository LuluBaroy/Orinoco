import {myModal, aboutUs, priceCalculation, connection, contactUs} from "./main";

myModal(2000, 'Merci pour votre commande !', 'https://media1.tenor.com/images/3264bcc47ee47ebbdd441f9f1d203542/tenor.gif?itemid=12498539')

//Getting all order's information
let confirmation = JSON.parse(localStorage.getItem('confirm'));
let contact = JSON.parse(localStorage.getItem('contact'));
let orderId = JSON.parse(localStorage.getItem('orderId'));

//Creating the elements above the products purchased
let sectionConfirm = document.createElement('section');

let pageTitle = document.createElement('h1');
pageTitle.textContent = "Confirmation de commande";

//Creating the title of the resume section
let divYourOrder = document.createElement("div");
divYourOrder.id = "divYourOrder";
let orderLeft = document.createElement('img');
orderLeft.src = "../assets/img/orderleft.png";
orderLeft.alt = "Image Gauche Votre commande";
let yourOrder = document.createElement('h2');
yourOrder.textContent = "Votre commande";
yourOrder.id = 'yourOrder';
let orderRight = document.createElement('img');
orderRight.src = "../assets/img/orderRight.png";
orderRight.alt = "Image droite Votre commande";

let orderIdText = document.createElement('ul');
orderIdText.textContent = "Référence(s) de votre commande : ";
for(let i in orderId){
        let newRef = document.createElement('li');
        newRef.textContent = `${orderId[i].param[i]} : ${orderId[i].id}`;
        orderIdText.appendChild(newRef);
}

let thanks = document.createElement('p');
thanks.innerHTML = "Merci <span>" + contact.firstName + " " + contact.lastName + "</span> pour votre commande chez Orinoco !";

let resume = document.createElement('p');
resume.innerHTML = "Un e-mail de confirmation vous sera très prochainement envoyé à l'adresse <span>" + contact.email + "</span> contenant le résumé de votre commande et les informations de livraison à votre adresse <span>" + contact.address + "</span> à <span>" + contact.city + "</span> !";

let yourProducts = document.createElement('p');
yourProducts.textContent = "Le(s) produit(s) que vous avez commandé(s) :"
yourProducts.id = 'yourProducts';

//Placing all elements on confirmation's page
document.getElementById('confirmation').appendChild(pageTitle);
document.getElementById('confirmation').appendChild(sectionConfirm);
sectionConfirm.appendChild(divYourOrder);
divYourOrder.appendChild(orderLeft);
divYourOrder.appendChild(yourOrder);
divYourOrder.appendChild(orderRight);
sectionConfirm.appendChild(orderIdText);
sectionConfirm.appendChild(thanks);
sectionConfirm.appendChild(resume);
sectionConfirm.appendChild(yourProducts);

//divider (Placed at the end of the for loop)
let divider = document.createElement('img');
divider.src = "../assets/img/divider_confirm.png";
divider.id = "divider";
divider.alt = "Image Separation avant phrase de remerciement";

//Thanks note for users (Placed at the end of the for loop)
let thanksEndNote = document.createElement('p');
thanksEndNote.id = "thanksEndNote";
thanksEndNote.textContent = "Orinoco vous remercie ! À très bientôt sur notre site !"
//Initializing the order's total price variable (calculate at the end of the for loop)
let priceOrderLength = 0;
let priceOrder = document.createElement('p');
priceOrder.id = 'priceOrder';

//Getting products' info with their types and id, then creating their visualisation
for (let i in confirmation) {
        connection('http://localhost:3000/api/' + confirmation[i].param + "/" + confirmation[i].id).then(function (response) {
                let articleConfirm = document.createElement('article');
                let idConfirm = document.createElement('p');
                idConfirm.textContent = confirmation[i].id;
                let imageConfirm = document.createElement('img');
                imageConfirm.src = response.imageUrl;
                imageConfirm.alt = "Photo " + response.name;
                imageConfirm.title = "Photo de " + response.name;
                let divConfirm = document.createElement('div');
                let titleConfirm = document.createElement('h2');
                titleConfirm.textContent = response.name;
                let priceConfirm = document.createElement('p');
                let priceConfirmLength = response.price;
                priceCalculation(priceConfirmLength, priceConfirm, 'Prix : ');
                let quantity = document.createElement('p');
                quantity.textContent = "Quantité choisie : " + confirmation[i].quantity;
                let totalPriceText = document.createElement('p');
                totalPriceText.id = "totalPriceText";
                let totalPriceByProducts = response.price * confirmation[i].quantity;
                priceCalculation(totalPriceByProducts, totalPriceText, 'Prix total pour cet article : ');

                sectionConfirm.appendChild(articleConfirm);
                articleConfirm.appendChild(imageConfirm);
                articleConfirm.appendChild(divConfirm);
                divConfirm.appendChild(titleConfirm);
                divConfirm.appendChild(priceConfirm);
                divConfirm.appendChild(quantity);
                divConfirm.appendChild(totalPriceText);

                //Calculating the order's price and placing it after all products purchased
                priceOrderLength += response.price * confirmation[i].quantity;
                priceCalculation(priceOrderLength, priceOrder, 'Prix de votre commande (TTC) : ');
                sectionConfirm.appendChild(priceOrder);
                sectionConfirm.appendChild(divider);
                sectionConfirm.appendChild(thanksEndNote);

        }).catch();
}
window.aboutUs = aboutUs;
window.contactUs = contactUs;
window.thanksAlert = thanksAlert;
localStorage.clear();