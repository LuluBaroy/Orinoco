let confirmation = JSON.parse(localStorage.getItem('confirm'));
let param = JSON.parse(localStorage.getItem('param'));

let sectionConfirm = document.createElement('section');
let pageTitle = document.createElement('h1');
    pageTitle.textContent = "Confirmation de commande";
let thanks = document.createElement('h2');
    thanks.textContent = `Merci ${confirmation.contact.firstName} ${confirmation.contact.lastName} pour votre commande chez Orinoco !`;
let resume = document.createElement('p');
    resume.textContent = `Un e-mail de confirmation vous sera très prochainement envoyé à l'adresse ${confirmation.contact.email} contenant le résumé de votre commande et les informations de livraison à votre adresse ${confirmation.contact.address} à ${confirmation.contact.city} !`
let priceOrderLength = JSON.parse(localStorage.getItem('totalPrice'));
let priceOrder = document.createElement('p');
priceCalculation(priceOrderLength, priceOrder, 'Prix de votre commande : ');

for(let i in confirmation.products){
    connection('http://localhost:3000/api/' + param + "/" + confirmation.products[i]).then(function (response) {
        let articleConfirm = document.createElement('article');
        let idConfirm = document.createElement('p');
            idConfirm.textContent = response._id;
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

        document.getElementById('confirmation').appendChild(pageTitle);
        document.getElementById('confirmation').appendChild(thanks);
        document.getElementById('confirmation').appendChild(resume);
        document.getElementById('confirmation').appendChild(sectionConfirm);
        sectionConfirm.appendChild(articleConfirm);
        articleConfirm.appendChild(imageConfirm);
        articleConfirm.appendChild(divConfirm);
        divConfirm.appendChild(titleConfirm);
        divConfirm.appendChild(priceConfirm);
        sectionConfirm.appendChild(priceOrder);

    }).catch();
}