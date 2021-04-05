
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
                <div class="shopBasket">
                    <i class="fas fa-shopping-bag"></i>
                </div>
                
                <h2 class="name">${products[index].name}</h2>
                <h4 class="type">${products[index].type}</h4>
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
            let keys = Object.keys(snap.val());
            products = Object.values(snap.val());
            productsDiv.innerHTML = "";
            for (let i = 0; i < products.length; i++) {
                products[i].key = keys[i];
                let product = productGenerator(products, i);
                productsDiv.innerHTML += product;
            }
            onToggleShopBasket(products);
        })
}
getProducts();

async function onToggleShopBasket(products) {
    let shopBaskets = document.querySelectorAll(".boutique .shopBasket i");
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    console.log(basket.length);
for (let i = 0; i < shopBaskets.length; i++) {
    for (let j = 0; j < basket.length; j++) {
        if (basket[j].key == products[i].key) {
            shopBaskets[i].style.color = 'white';
            shopBaskets[i].style.textShadow = "0px 0px 14px #000000";
        }
    }

shopBaskets[i].addEventListener('click', (event) => {
    basket = JSON.parse(localStorage.getItem('basket')) || [];
            let isFinded = false;
                if (basket.length > 0) {
                    basket.forEach( product => {
                    if(product.key == products[i].key ){
                        isFinded = true;
                    }
                    });
                    if (isFinded == false) {
                        basket.push(products[i]);
                        localStorage.setItem('basket', JSON.stringify(basket));
                        
                        shopBaskets[i].style.color = 'white';
                        shopBaskets[i].style.textShadow = "0px 0px 14px #000000"; 
                    }else{
                        basket = basket.filter(product => product.key != products[i].key);
                        localStorage.setItem('basket', JSON.stringify(basket));

                        shopBaskets[i].style.color = 'black';
                        shopBaskets[i].style.textShadow = "0px 0px 14px #FFFFFF";
                    }
                }else{
                    basket.push(products[i]);
                    localStorage.setItem('basket', JSON.stringify(basket));
                    shopBaskets[i].style.color = 'white';
                    shopBaskets[i].style.textShadow = "0px 0px 14px #000000"; 
                }

        
    })
    
}
}

