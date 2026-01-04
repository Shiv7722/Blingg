const tempCart = document.querySelector(".template-cart-item");
const cartList = document.querySelector(".cart-list");
// const subtotalAmount = document.querySelector(".subtotal-row .subtotal-amount");
const cartNumber = document.querySelector(".cart-number");
const totalEl=document.querySelector(".subtotal-row .total");
const savingEl=document.querySelector(".subtotal-row .savings");
const grandTotalEl= document.querySelector(".subtotal-row .grand-total");
const delCharges = document.querySelector(".subtotal-row .del-charges");

let total=0;
let saving=0;
let grandTotal=0;
let btnClickCount=0;
let delChargeFlag = false

export default function updateCartUI(itemId, quantity, cart) {
  btnClickCount+=1;
  if(btnClickCount>1 && grandTotal>1000 && delChargeFlag==false){
    delCharges.innerHTML="<del>$40</del>";
    grandTotal-=40;
    delChargeFlag=true;

  }else if(btnClickCount==1 && grandTotal<1000){
    delCharges.innerHTML="<span>$40</span>";
    grandTotal+=40;
  }
  console.log(btnClickCount);
  
  // console.log(cart)
  const item = cart.get(itemId);
  cartNumber.innerText=cart.size;
  cartList.querySelector(".no-item-li")?.remove();
  // cart.array.forEach(product => {
  //   total+=product.price*product.quantity;
  //   saving+=product.price*product.quantity-product.disPrice*product.quantity;
  //   grandTotal+=product.disPrice*product.quantity;
  // });

  const cartItem = cartList.querySelector(`#cart-item-${itemId}`);
  if (cartItem) {
    // Update existing item
    const itemCount = cartItem.querySelector('.item-count');
    itemCount.textContent = quantity;
    total+=item.price*(quantity-1);
    saving+=item.price*(quantity-1)-item.disPrice*(quantity-1);
    grandTotal+=item.disPrice*(quantity-1);
    
    
    
  } else {
    total+=item.price;
    saving+=item.price-item.disPrice;
    grandTotal+=item.disPrice;
     
    // Add new item
    const clone = tempCart.content.cloneNode(true)
    clone.querySelector("li").id = `cart-item-${itemId}`;
    clone.querySelector("img").src = item.image[0];
    clone.querySelector("h4").innerText = item.name;
    clone.querySelector(".item-count").textContent=1;
    clone.querySelector(".item-dis-price").textContent = `$${item.disPrice}`; 
    clone.querySelector(".item-ac-price").textContent = `$${item.price}`;
    cartList.append(clone)
  }
  totalEl.innerText=`$${total}`;
  savingEl.innerText=`-$${saving}`;

  
  grandTotalEl.innerHTML=`<b>$${grandTotal}</b>`;
}

function removeItem(element){
  subtotalAmount.textContent = `$${parseInt(subtotalAmount.textContent.slice(1)) - parseInt(element.parentElement.nextElementSibling.innerText.slice(1))}`;
  cartNumber.textContent = parseInt(cartNumber.textContent) - 1;
  element.parentElement.parentElement.parentElement.parentElement.remove()
}


