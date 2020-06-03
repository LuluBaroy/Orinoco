if(productsAddedToCart !== null) {
//Creating form                                                                     /////!!!!!A RETRAVAILLER !!!!\\\\\\
    let sectionForm = document.createElement('section');
    sectionForm.id = "sectionForm";
    sectionForm.innerHTML = "<form action=\"\" id=\"form1\">\n" +
        "  <div class=\"formCss\">\n" +
        "    <label for=\"name\">Nom : </label>\n" +
        "    <input type=\"text\" name=\"lastName\" id=\"lastName\" class='infoRequired' required placeholder='Nom' pattern='^[a-zA-Z]+$'>\n" +
        "  </div>\n" +
        "  <div class=\"formCss\">\n" +
        "    <label for=\"name\">Prénom : </label>\n" +
        "    <input type=\"text\" name=\"firstName\" id=\"firstName\" class='infoRequired'required placeholder='Prénom' pattern='^[a-zA-ZÀ-ÿ]+$'>\n" +
        "  </div>\n" +
        "  <div class=\"formCss\">\n" +
        "    <label for=\"city\">Adresse : </label>\n" +
        "    <input type=\"text\" name=\"address\" id=\"address\" class='infoRequired' required placeholder='Adresse'>\n" +
        "  </div>\n" +
        "  <div class=\"formCss\">\n" +
        "    <label for=\"city\">Ville : </label>\n" +
        "    <input type=\"text\" name=\"city\" id=\"city\" class='infoRequired' required placeholder='Ville' pattern='^[a-zA-Z]+$'>\n" +
        "  </div>\n" +
        "  <div class=\"formCss\">\n" +
        "    <label for=\"email\">Email : </label>\n" +
        "    <input type=\"email\" name=\"email\" id=\"email\" class='infoRequired' required placeholder='E-mail' pattern='^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})+$'>\n" +
        "  </div>\n" +
        "  <div class=\"formCss\">\n" +
        "    <input type=\"button\" id='btn-submit' value=\"Validez votre commande !\">\n" +
        "  </div>\n" +
        "</form>"

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

        class Confirm {
            constructor(param, id, quantity) {
                this.param = param;
                this.id = id;
                this.quantity = quantity;
            }
        }

        //Creating a new Array to stock products' id and getting the param
        let productsOrderedFurniture = [], productsOrderedCameras = [], productsOrderedTeddies = [], param = '';
        let productsOrdered = [productsOrderedTeddies, productsOrderedCameras, productsOrderedFurniture];

        //Checking the form validity
        if (!document.getElementById('form1').checkValidity()) {
            event.preventDefault();
        } else {
            //Form is valid: creating the user contact infos
           let newContact = new Contact(document.getElementById('firstName').value, document.getElementById('lastName').value, document.getElementById('address').value, document.getElementById('city').value, document.getElementById('email').value);
            let order, confirm = [];

             for (let l in productsAddedToCart) {
                if (productsAddedToCart[l].param === 'teddies') {
                    productsOrderedTeddies.push(productsAddedToCart[l].id.toString());
                    order = new formSent(newContact, productsOrdered[0]);
                    confirm.push(new Confirm(productsAddedToCart[l].param, productsAddedToCart[l].id, productsAddedToCart[l].quantity));*/
                } else if (productsAddedToCart[l].param === 'cameras') {
                    productsOrderedCameras.push(productsAddedToCart[l].id.toString());
                    order = new formSent(newContact, productsOrdered[1]);
                    confirm.push(new Confirm(productsAddedToCart[l].param, productsAddedToCart[l].id, productsAddedToCart[l].quantity));*/
                } else {
                    productsOrderedFurniture.push(productsAddedToCart[l].id.toString());
                    order = new formSent(newContact, productsOrdered[2]);
                    confirm.push(new Confirm(productsAddedToCart[l].param, productsAddedToCart[l].id, productsAddedToCart[l].quantity));*/
                }
            }
            if(productsOrdered[0].length !== 0){
                sending("http://localhost:3000/api/" + 'teddies' + "/order", new formSent(newContact, productsOrdered[0]));
            }
            if(productsOrdered[1].length !== 0){
                sending("http://localhost:3000/api/" + 'cameras' + "/order", new formSent(newContact, productsOrdered[1]));
            }
            if(productsOrdered[2].length !== 0){
                sending("http://localhost:3000/api/" + 'furniture' + "/order", new formSent(newContact, productsOrdered[2]));
            }

            localStorage.setItem('confirm', JSON.stringify(confirm));
            localStorage.setItem('contact', JSON.stringify(newContact));
            localStorage.setItem('orderId', JSON.stringify(orderIds));
            localStorage.removeItem('cart');
            //window.location.href = "./confirmation.html";
            console.log(orderIds);
        }
    })
}