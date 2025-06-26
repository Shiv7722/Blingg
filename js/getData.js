export default async function getData(){
    const response = await fetch('./js/product.json');
    if(response.ok){
      return await response.json();
    }else{
      console.log("Error: ", response.status);  
    }
    
}