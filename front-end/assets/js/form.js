import {productsAddedToCart} from "./cart";
import {sending} from "./main";
import {orderIds} from "./main";

if (productsAddedToCart !== null) { //If there is product(s) added in localStorage
    //Creating form                                                                     /////!!!!!A RETRAVAILLER !!!!\\\\\\
    let sectionForm = document.createElement('section');
    sectionForm.id = "sectionForm";
    sectionForm.innerHTML = "<form action=\"\" id=\"form1\">\n" + "  <div class=\"formCss\">\n" + "    <label for=\"name\">Nom : </label>\n" + "    <input type=\"text\" name=\"lastName\" id=\"lastName\" class='infoRequired' required placeholder='Dupont, ...' pattern='^[A-Z]{1}[a-z]+$' title='Champ obligatoire. Renseignez votre nom au format suivant : Dupont'>\n" + "  </div>\n" + "  <div class=\"formCss\">\n" + "    <label for=\"name\">Prénom : </label>\n" + "    <input type=\"text\" name=\"firstName\" id=\"firstName\" class='infoRequired'required placeholder='Jean-Luc, ...' pattern='^[A-Z]{1}[A-Za-zÀ-ÿ\-]+$' title='Champ Obligatoire. Renseignez ce champ au format : Pierre ou Pierre-Yves ou Pierre-yves'>\n" + "  </div>\n" + "  <div class=\"formCss\">\n" + "    <label for=\"city\">Adresse : </label>\n" + "    <input type=\"text\" name=\"address\" id=\"address\" class='infoRequired' required placeholder='3 rue des lilas, ...' pattern='^[0-9]{1,3}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$' title='Champ Obligatoire. Renseignez ce champ au format : 3 rue des lilas, ou 3, rue des Lilas'>\n" + "  </div>\n" + "  <div class=\"formCss\">\n" + "    <label for=\"city\">Ville : </label>\n" + "    <input type=\"text\" name=\"city\" id=\"city\" class='infoRequired' required placeholder='Paris, ...' pattern='^[A-Z]{1}[a-zA-Z\-]+$' title='Champ Obligatoire. Renseignez le champ au format : Paris ou Neuilly-sur-Seine'>\n" + "  </div>\n" + "  <div class=\"formCss\">\n" + "    <label for=\"email\">Email : </label>\n" + "    <input type=\"email\" name=\"email\" id=\"email\" class='infoRequired' required placeholder='pierre.dupont@gmail.com, ...' pattern='^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})+$' title='Champ Obligatoire. Renseignez ce champ avec une adresse mail valide au format : pierre.dupont@gmail.com ou pierre-dupont@gmail.com'>\n" + "  </div>\n" + "  <div class=\"formCss\">\n" + "    <input type=\"button\" id='btn-submit' value=\"Validez votre commande !\">\n" + "  </div>\n" + "</form>";

    //Placing form in cart page
    document.getElementById('cart').appendChild(sectionForm);
    
    //Adding an event listener on the submit button
    document.getElementById('btn-submit').addEventListener('click', function (event) {
        //Creating class for sending contact infos
        class Contact {
            constructor(firstName, lastName, address, city, email) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.address = address;
                this.city = city;
                this.email = email;
            }
        }

        //Creating a class to post contact's object and products' array to server
        class formSent {
            constructor(user, products) {
                this.contact = user;
                this.products = products;
            }
        }
        //Creating a class to easily add product purchased info
        class Confirm {
            constructor(param, id, quantity) {
                this.param = param;
                this.id = id;
                this.quantity = quantity;
            }
        }

        //Initializing array for products Ordered
        let productsOrdered = [];

        //Checking the form validity
        if (!document.getElementById('form1').checkValidity()) {
            //Form isn't valid: preventing the submit
            event.preventDefault();

        } else {
            //Form is valid: creating the user contact infos
            let newContact = new Contact(document.getElementById('firstName').value, document.getElementById('lastName').value, document.getElementById('address').value, document.getElementById('city').value, document.getElementById('email').value);

            //Initializing an array to push the Confirm class into it
            let confirm = [];

            for (let l in productsAddedToCart) {
                //if it's the first time we have this type of product, we create sub array
                if (typeof productsOrdered[productsAddedToCart[l].param] == "undefined") {
                    productsOrdered[productsAddedToCart[l].param] = [];
                }
                //we push product on dedicate subarray
                productsOrdered[productsAddedToCart[l].param].push(productsAddedToCart[l].id.toString());
                confirm.push(new Confirm(productsAddedToCart[l].param, productsAddedToCart[l].id, productsAddedToCart[l].quantity));
            }

            //sending the POST request for all products' type
            for (let i in productsOrdered) {
                sending("http://localhost:3000/api/" + i + "/order", new formSent(newContact, productsOrdered[i])).then(function(){

                    //Checking the number of order's Id we're supposed to get and then redirecting to the confirmation page
                    if(productsOrdered['cameras'] && productsOrdered['teddies'] && productsOrdered['furniture']){
                        if(orderIds.length === 3){
                            localStorage.setItem('confirm', JSON.stringify(confirm));
                            localStorage.setItem('contact', JSON.stringify(newContact));
                            localStorage.removeItem('cart');
                            window.location.href = "./confirmation.html";
                        }
                    } else if(productsOrdered['teddies'] && productsOrdered['cameras'] || productsOrdered['teddies'] && productsOrdered['furniture'] || productsOrdered['cameras'] && productsOrdered['furniture']){
                        if(orderIds.length === 2){
                            localStorage.setItem('confirm', JSON.stringify(confirm));
                            localStorage.setItem('contact', JSON.stringify(newContact));
                            localStorage.removeItem('cart');
                            window.location.href = "./confirmation.html";
                        }
                    } else {
                        localStorage.setItem('confirm', JSON.stringify(confirm));
                        localStorage.setItem('contact', JSON.stringify(newContact));
                        localStorage.removeItem('cart');
                        window.location.href = "./confirmation.html";
                    }
                });
            }
        }
    });
}
