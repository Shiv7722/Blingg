import getData from './getData.js';
import addCards from './addCards.js';
import addToCart from './addToCart.js';
import updateCartUI from './updateCartUI.js';
const proData = new Map();


let products = [];
// Fetch data during page initialization
async function initialize() {
  try {
    products = await getData();
    mapProducts(products);
    addCards(products);
  } catch (error) {
    console.error("Failed to load products", error);
  }
}




//to add the cards to the trending and best-selling sections
const trendCards = document.querySelector(".trend-cards-row");
const bestCards = document.querySelector(".best-cards-row");

//to add the cards to the cart
const cartBtn = document.querySelectorAll(".cart-btn");
const cartList = document.querySelector(".cart-list");
const cartNumber = document.querySelector(".basket .cart-number");
// const subtotalAmount = document.querySelector(".subtotal-row .subtotal-amount");
const itemCount = document.querySelector(".item-count");
const cardContainer = document.querySelectorAll(".card-container");
const ringCards = document.querySelector(".ring-cards");

// cardContainer.addEventListener("mouseenter",async (event)=>{
//       if(!event.target.classList.contains("product-img")) return;
//       event.preventDefault();
//       let cardcheck = event.target.parentElement;
//       const product = products.find(p => p.id === parseInt(cardcheck.id));
//       event.target.src=product.image[1];

      
//     });
//map object to maintain the cart state
const cart = new Map(); // {id: {productData, quantity}}
 
[trendCards, bestCards].forEach(container => {
  if(!container) return;
  container.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("cart-btn")) return;
    
    event.preventDefault();

    const card = event.target.parentElement; // closest
    const itemId = parseInt(card.id);
    
    // Find product in preloaded data
    const product = proData.get(itemId);
    if (!product) return;

    // Update cart state
    const existing = cart.get(itemId);
    const newQuantity = existing ? existing.quantity + 1 : 1;

    cart.set(itemId, {
      ...product,
      quantity: newQuantity
    });

    // Update UI
    updateCartUI(itemId, newQuantity, cart);
  });
});



function getSubtotal(amount){
  subtotalAmount.textContent = `$${parseInt(subtotalAmount.textContent.slice(1)) + amount}`;
}



cartList.addEventListener("click",(event)=>{
   
   if(event.target.classList.contains("ri-close-line")){
    console.log(event.target);
    
    removeItem(event.target);
   }else{
    return
   }

   if(event.target.classList.contains("remove-btn")){
     removeItemCount(event.target);
   }

   if(event.target.classList.contains("add-btn")){
     addItemCount(event.target);
   }


})

function removeItem(element,cart){
  subtotalAmount.textContent = `$${parseInt(subtotalAmount.textContent.slice(1)) - parseInt(element.parentElement.nextElementSibling.innerText.slice(1))}`;
  cartNumber.textContent = parseInt(cartNumber.textContent) - 1;
  element.parentElement.parentElement.parentElement.parentElement.remove()
}

function removeItemCount(element){
  if(element.nextElementSibling.textContent!=="1"){
    let itemPrice = element.parentElement.parentElement.nextElementSibling.lastElementChild;
    let itemCount = element.nextElementSibling
    
   

    let unitPrice = parseInt(itemPrice.textContent.slice(1))/parseInt(element.nextElementSibling.textContent);
    
    itemPrice.textContent = `$${parseInt(itemPrice.textContent.slice(1)) - unitPrice}`;
    subtotalAmount.textContent = `$${parseInt(subtotalAmount.textContent.slice(1)) - unitPrice}`
    element.nextElementSibling.textContent = parseInt(element.nextElementSibling.textContent)-1;
  }else{
    // console.dir(element.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild);
    
    removeItem(element.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild)
  }
}

function addItemCount(element){
    let itemPrice = element.parentElement.parentElement.nextElementSibling.lastElementChild;
    let itemCount = element.parentElement.children[1];

    let unitPrice = parseInt(itemPrice.textContent.slice(1))/parseInt(itemCount.textContent);
    itemPrice.textContent = `$${parseInt(itemPrice.textContent.slice(1)) + unitPrice}`;
    subtotalAmount.textContent = `$${parseInt(subtotalAmount.textContent.slice(1)) + unitPrice}`

    itemCount.textContent = parseInt(itemCount.textContent)+1



 
}


function mapProducts(products){
  products.forEach(item => {
    proData.set(item.id,{...item});
  });
}

initialize();













//adding cards using template literals




// function to add cards to the DOM
function testaddCards(data){
  data.forEach(element => {
    const column = Object.assign(document.createElement('div'), { className: 'col-lg-3 col-md-4 mt-lg-0 mt-3' });
    const card = Object.assign(document.createElement('div'), { className: 'card text-center p-md-0 p-sm-5', id: element.id });
    const img = Object.assign(document.createElement('img'), { src: element.image, alt: 'img', className: 'img-fluid im-card mb-lg-4 mb-sm-4' });
    const i = Object.assign(document.createElement('i'), { className: 'ri-shopping-basket-line cart-btn' });
    const h3 = Object.assign(document.createElement('h3'), { innerText: element.name });
    const span = Object.assign(document.createElement('span'), { innerHTML: `$${element.disPrice}` });
    card.append(img, i, h3, span);
    column.append(card);
    if(element.tag=="trending"){
    //const column = document.createElement("div", {class:"col-lg-3 col-md-4 mt-lg-0 mt-3"}); !!Wrong way to create and assign class
    trendCards.append(column);
    }else if(element.tag=="best-selling"){
      bestCards.append(column);
    }
    /*column.innerHTML = 
    `<div class="card text-center p-md-0 p-sm-5" id="${element.id}">
        <img
          src="${element.image}"
          alt=""
          class="img-fluid im-card mb-lg-4 mb-sm-4" />
        <i class="ri-shopping-basket-line"></i>
        <h3>"${element.name}"</h3>
        <span>"$${element.disPrice}" <del>$${element.price}</del></span>
     </div>`;*/
  });
}






//new Adding event listener to the cart buttons in the trending and best-selling cards







// [trendCards, bestCards].forEach(el=>{
//   el.addEventListener("click", (event)=>{
//     event.preventDefault();
//     if(event.target.classList.contains("cart-btn")){
//       const card = event.target.parentElement;
//       const cardId = card.id;
//       const cardImg = card.querySelector("img").src;
//       const cardName = card.querySelector("h3").innerText;
//       const cardPrice = card.querySelector("span").textContent;
//       const cardData = {id: cardId, image: cardImg, name: cardName, price: cardPrice};
//       var flag = false;
  
      
//       cartList.querySelectorAll("li").forEach(item => {
//         if(item.id===cardId){
//           const itemCount = item.querySelector(".item-count");
//           const itemPrice = item.querySelector(".item-price");
//           // console.log(itemPrice?.textContent);
          
//           itemPrice.textContent = `$${parseInt(itemPrice.textContent.slice(1)) + parseInt(cardPrice.slice(1))}`;
//           itemCount.textContent = parseInt(itemCount.textContent) + 1;
//           getSubtotal(parseInt(cardPrice.slice(1)));
//           flag = true;
//         }
//       });
  
//       if(flag===false){
//       addToCart(cardData);
//       }
  
//     }
//   })
  
// }) 

function testaddToCart(data){
  const {id: cardId, image: cardImg, name: cardName, price: cardPrice} = data;  
  

  const cartItem = Object.assign(document.createElement('li'), { id: cardId});
  cartItem.innerHTML = 
  `<div class="item-row row">
                <div class="col-4"><img src="${cardImg}" alt=""></div>
                <div class="col-5 d-flex flex-column justify-content-center">
                  <h4>${cardName} </h4>
                  <div class="item-btn">
                    <button class="white-btn remove-btn">-</button>
                    <span class="item-count">1</span>
                    <button class="white-btn add-btn">+</button>
                  </div>
                </div>
                <div class="col-3 d-flex flex-column align-items-end gap-3">
                  <button class="remove-item-btn"><i class="ri-close-line"></i></button>
                  <h4 class="item-price">${cardPrice}</h4>
                </div>
              </div>`;

  cartList.append(cartItem);
  // console.log(cartNumber);
  cartNumber.textContent = parseInt(cartNumber.textContent) + 1;
  // console.log(cardPrice, typeof cardPrice);
  getSubtotal(parseInt(cardPrice.slice(1)));
}




