!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t){let n,a=window.location.search;new URLSearchParams(a).get("type");null===JSON.parse(localStorage.getItem("cart"))?n=0:(n=JSON.parse(localStorage.getItem("cart")).length,document.getElementById("return")?document.getElementById("btn-cart").innerHTML="<img class=\"basket\" src='../assets/img/basket.png'> Panier ( "+n+" )":document.getElementById("btn-cart").innerHTML="<img class=\"basket\" src='assets/img/basket.png'> Panier ( "+n+" )")},,,,,function(e,t,n){n(0),n(6),n(7),e.exports=n(8)},function(e,t){let n=JSON.parse(localStorage.getItem("cart")),a=document.createElement("h1");a.textContent="Panier";let i=document.createElement("section");if(document.getElementById("cart").appendChild(i),i.appendChild(a),null!==n){i.id="sectionWithProducts";for(let e in n){let t=document.createElement("article");t.className="articlesSelected";let a=document.createElement("p");a.textContent=n[e].id;let r=document.createElement("a");r.href="../pages/products.html?type="+n[e].param+"&id="+n[e].id,r.ariaLabel="Page du produit";let d=document.createElement("img");d.src=n[e].imgUrl,d.alt="Photo "+n[e].name,d.title="Photo de "+n[e].name;let l=document.createElement("div"),o=document.createElement("h2");o.textContent=n[e].name;let c=document.createElement("p"),s=n[e].price;priceCalculation(s,c,"Prix : ");let m=document.createElement("div"),p=document.createElement("p");p.textContent="Quantité : "+n[e].quantity;let u=document.createElement("button");u.textContent="+",u.addEventListener("click",(function(t){n[e].quantity++,localStorage.setItem("cart",JSON.stringify(n)),location.reload()}));let h=document.createElement("button");h.textContent="-",h.addEventListener("click",(function(t){1===n[e].quantity?(n.splice([e],1),localStorage.setItem("cart",JSON.stringify(n)),location.reload(),0===n.length&&(localStorage.clear(),location.reload())):(n[e].quantity--,localStorage.setItem("cart",JSON.stringify(n)),location.reload())}));let f=document.createElement("p");f.className="totalPriceByProducts";let g=n[e].price*n[e].quantity;priceCalculation(g,f,"Prix Total : "),i.appendChild(t),t.appendChild(r),r.appendChild(d),t.appendChild(l),l.appendChild(o),l.appendChild(a),l.appendChild(c),l.appendChild(m),m.appendChild(p),m.appendChild(u),m.appendChild(h),l.appendChild(f)}let e=0;for(let t in n)e+=n[t].price*n[t].quantity;let t=document.createElement("p");t.id="totalPrice",priceCalculation(e,t,"Prix total de la commande : "),i.appendChild(t)}},function(e,t){if(null===productsAddedToCart){sectionCart.id="emptyCartSection";let e=document.createElement("h2");e.textContent="Votre panier est vide !!";let t=document.createElement("p");t.textContent="Retrouvez tous nos produits ici : ";let n=document.createElement("button");n.textContent="Nos produits",n.addEventListener("click",(function(e){window.location.href="../index.html"}));let a=document.createElement("p");a.textContent="Ces produits pourraient vous plaire :";let i=document.createElement("div");i.id="productsSuggestedContainer",sectionCart.appendChild(e),sectionCart.appendChild(t),sectionCart.appendChild(n),sectionCart.appendChild(a),sectionCart.appendChild(i);let r=[];class d{constructor(e,t,n,a,i,r){this.param=e,this.id=t,this.name=n,this.image=a,this.url=i,this.price=r}}!function(){for(let e=0;e<=2;e++){let e=Math.floor(3*Math.random()),t="";switch(e){case 0:t="teddies";break;case 1:t="furniture";break;case 2:t="cameras"}connection("http://localhost:3000/api/"+t).then((function(e){let n=Math.floor(5*Math.random());if(0===r.length)switch(n){case 0:r.push(new d(t,e[0]._id,e[0].name,e[0].imageUrl,"products.html?type="+t+"&id="+e[0]._id,e[0].price));break;case 1:r.push(new d(t,e[1]._id,e[1].name,e[1].imageUrl,"products.html?type="+t+"&id="+e[1]._id,e[1].price));break;case 2:r.push(new d(t,e[2]._id,e[2].name,e[2].imageUrl,"products.html?type="+t+"&id="+e[2]._id,e[2].price));break;case 3:r.push(new d(t,e[3]._id,e[3].name,e[3].imageUrl,"products.html?type="+t+"&id="+e[3]._id,e[3].price));break;case 4:r.push(new d(t,e[4]._id,e[4].name,e[4].imageUrl,"products.html?type="+t+"&id="+e[4]._id,e[4].price))}else{let a;switch(n){case 0:a=e[0]._id;break;case 1:a=e[1]._id;break;case 2:a=e[2]._id;break;case 3:a=e[3]._id;break;case 4:a=e[4]._id}if(1===r.length&&r[0].id!==a||2===r.length&&r[0].id!==a&&r[1].id!==a)switch(a){case e[0]._id:r.push(new d(t,e[0]._id,e[0].name,e[0].imageUrl,"products.html?type="+t+"&id="+e[0]._id,e[0].price));break;case e[1]._id:r.push(new d(t,e[1]._id,e[1].name,e[1].imageUrl,"products.html?type="+t+"&id="+e[1]._id,e[1].price));break;case e[2]._id:r.push(new d(t,e[2]._id,e[2].name,e[2].imageUrl,"products.html?type="+t+"&id="+e[2]._id,e[2].price));break;case e[3]._id:r.push(new d(t,e[3]._id,e[3].name,e[3].imageUrl,"products.html?type="+t+"&id="+e[3]._id,e[3].price));break;case e[4]._id:r.push(new d(t,e[4]._id,e[4].name,e[4].imageUrl,"products.html?type="+t+"&id="+e[4]._id,e[4].price))}console.log(r)}}))}}()}},function(e,t){if(null!==productsAddedToCart){let e=document.createElement("section");e.id="sectionForm",e.innerHTML='<form action="" id="form1">\n  <div class="formCss">\n    <label for="name">Nom : </label>\n    <input type="text" name="lastName" id="lastName" class=\'infoRequired\' required placeholder=\'Nom\' pattern=\'^[a-zA-Z]+$\'>\n  </div>\n  <div class="formCss">\n    <label for="name">Prénom : </label>\n    <input type="text" name="firstName" id="firstName" class=\'infoRequired\'required placeholder=\'Prénom\' pattern=\'^[a-zA-ZÀ-ÿ]+$\'>\n  </div>\n  <div class="formCss">\n    <label for="city">Adresse : </label>\n    <input type="text" name="address" id="address" class=\'infoRequired\' required placeholder=\'Adresse\'>\n  </div>\n  <div class="formCss">\n    <label for="city">Ville : </label>\n    <input type="text" name="city" id="city" class=\'infoRequired\' required placeholder=\'Ville\' pattern=\'^[a-zA-Z]+$\'>\n  </div>\n  <div class="formCss">\n    <label for="email">Email : </label>\n    <input type="email" name="email" id="email" class=\'infoRequired\' required placeholder=\'E-mail\' pattern=\'^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})+$\'>\n  </div>\n  <div class="formCss">\n    <input type="button" id=\'btn-submit\' value="Validez votre commande !">\n  </div>\n</form>',document.getElementById("cart").appendChild(e),document.getElementById("btn-submit").addEventListener("click",(function(e){class t{constructor(e,t,n,a,i){this.firstName=e,this.lastName=t,this.address=n,this.city=a,this.email=i}}class n{constructor(e,t){this.contact=e,this.products=t}}class a{constructor(e,t,n){this.param=e,this.id=t,this.quantity=n}}let i=[];if(document.getElementById("form1").checkValidity()){let e=new t(document.getElementById("firstName").value,document.getElementById("lastName").value,document.getElementById("address").value,document.getElementById("city").value,document.getElementById("email").value),r=[];for(let e in productsAddedToCart)void 0===i[productsAddedToCart[e].param]&&(i[productsAddedToCart[e].param]=[]),i[productsAddedToCart[e].param].push(productsAddedToCart[e].id.toString()),r.push(new a(productsAddedToCart[e].param,productsAddedToCart[e].id,productsAddedToCart[e].quantity));console.log(i);for(let t in i)sending("http://localhost:3000/api/"+t+"/order",new n(e,i[t]));localStorage.setItem("confirm",JSON.stringify(r)),localStorage.setItem("contact",JSON.stringify(e)),localStorage.removeItem("cart"),console.log(orderIds),window.location.href="./confirmation.html"}else e.preventDefault()}))}}]);