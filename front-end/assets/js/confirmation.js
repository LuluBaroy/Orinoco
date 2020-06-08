//Getting all order's information
let confirmation = JSON.parse(localStorage.getItem('confirm'));
let contact = JSON.parse(localStorage.getItem('contact'));
let orderId = JSON.parse(localStorage.getItem('orderId'));
console.log(orderId);

//Creating the structure above the products purchased
let sectionConfirm = document.createElement('section');
let pageTitle = document.createElement('h1');
pageTitle.textContent = "Confirmation de commande";
let orderIdText = document.createElement('h2');
   orderIdText.textContent = "Référence(s) de votre commande : " + orderId.join(', ');

let thanks = document.createElement('p');
thanks.textContent = `Merci ${contact.firstName} ${contact.lastName} pour votre commande chez Orinoco !`;
let resume = document.createElement('p');
resume.textContent = `Un e-mail de confirmation vous sera très prochainement envoyé à l'adresse ${contact.email} contenant le résumé de votre commande et les informations de livraison à votre adresse ${contact.address} à ${contact.city} !`;

//Initializing the order's total price variable
let priceOrderLength = 0;
let priceOrder = document.createElement('p');

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
                let totalPriceByProducts = response.price * confirmation[i].quantity;
                priceCalculation(totalPriceByProducts, totalPriceText, 'Prix total pour cet article : ');

                //Placing all elements on confirmation's page
                document.getElementById('confirmation').appendChild(pageTitle);
                document.getElementById('confirmation').appendChild(orderIdText);
                document.getElementById('confirmation').appendChild(thanks);
                document.getElementById('confirmation').appendChild(resume);
                document.getElementById('confirmation').appendChild(sectionConfirm);
                sectionConfirm.appendChild(articleConfirm);
                articleConfirm.appendChild(imageConfirm);
                articleConfirm.appendChild(divConfirm);
                divConfirm.appendChild(titleConfirm);
                divConfirm.appendChild(priceConfirm);
                divConfirm.appendChild(quantity);
                divConfirm.appendChild(totalPriceText);

                //Calculating the order's price and placing it after all products purchased
                priceOrderLength += response.price * confirmation[i].quantity;
                priceCalculation(priceOrderLength, priceOrder, 'Prix de votre commande : ');
                sectionConfirm.appendChild(priceOrder);
        }).catch();
}