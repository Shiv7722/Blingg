
//to add cards to the trending section
const trendCards = document.querySelector(".trend-cards-row");
const bestCards = document.querySelector(".best-cards-row");
const ringCards = document.querySelector(".ring-cards");
const template = document.querySelector(".template-card");

export default function addCards(data){
  if(data.length === 0) {
    console.error("Invalid data provided to addCards function");
    return;
  }
  data.forEach(element => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".card").id = element.id;
    clone.querySelector(".product-image.primary").src = element.image[0];
    clone.querySelector(".product-image.hover").src = element.image[1];
    clone.querySelector("h3").innerText = element.name;
    clone.querySelector(".dis-price").innerHTML = `$${element.disPrice}`;
    clone.querySelector(".ac-price").innerHTML = `$${element.price}`;
   
    if(!bestCards & !trendCards){
      if(element.category=="ring") ringCards.append(clone);
    }else{
      if(element.tag=="trending") trendCards.append(clone);
      else if(element.tag=="best-selling") bestCards.append(clone);
    }

    // clone.querySelector(".card").addEventListner = ()=>{
    //   clone.querySelector("img").src = element.image[1];
    //   console.log("hello");

    // }
    
  })
  
}