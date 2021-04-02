import firebaseConfig from './firebaseConfig.js';
import onToggleLogin from "./login.js";
import "./contact.js";
import "./header.js";

const productsDiv = document.querySelector('.products');

function productGenerator(products, index) {
    let sizes = products[index].size;
    let availableSizes = [];
    for (const key in sizes) {
        if (sizes[key] === true) {
            availableSizes.push(key);
        }
    }
    let sizesToDisplay = "";
    if (availableSizes.length !== 0) {
        sizesToDisplay = "Tailles disponibles : " + availableSizes.join(" / ");
    }
    return `
        <div class="product">
                <img src="${products[index].img}" alt="">
                <h2 class="name">${products[index].name}</h2>
                <h4 class="type">${products[index].type}</h4>
                <span class="description">${products[index].description}</span>
                <h5 class="sizes">${sizesToDisplay}</h5>
                <h3 class="price">${products[index].price}</h3>
                <div class="customButton">
                <div class="wrapper">
                    <div class="link_wrapper">
                    <a href="${products[index].link}"><span>ACHETER</span></a>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                        <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
                        </svg>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    `;

}

async function getProducts() {
    let products;
    let firebaseDb = await firebase.database().ref();
        firebaseDb.child('products').on('value', snap => {
            products = Object.values(snap.val());
            productsDiv.innerHTML = "";
            for (let i = 0; i < products.length; i++) {
                let product = productGenerator(products, i);
                productsDiv.innerHTML += product;
            }

        })
}
getProducts();