const tempCart = document.querySelector(".template-cart-item");


export default function addToCart(data){
  const {id: cardId, image: cardImg, name: cardName,dis: cardDis ,price: cardPrice } = data; 
  console.log(data);
  console.log(cardDis);
  const clone = tempCart.content.cloneNode(true);
  
  clone.querySelector("li").id = cardId;
  clone.querySelector("img").src = cardImg;
  clone.querySelector("h4").innerText = cardName;
  clone.querySelector(".item-dis-price").textContent = `$${cardDis}`; 
  clone.querySelector(".item-ac-price").textContent = `$${cardPrice}`;
  cartList.append(clone)

} 