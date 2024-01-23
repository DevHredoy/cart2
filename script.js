const uniqueFruits = [
    { id: 0, image: "basket/grape.jpg", title: "grape fruit", price: 34 },
    { id: 1, image: "basket/Bubblegum.jpeg", title: "bubblegum fruit", price: 23 },
    { id: 2, image: "basket/lichu.jpg", title: "Lichi", price: 11 },
    { id: 3, image: "basket/Loquat.jpg", title: "Loquat", price: 23 }
];


const modifiedFruitList=uniqueFruits.map((fruit)=>{
    return{...fruit,amount:0,roughcount:10}

});

const myfruits = document.querySelector("#body-contents");

// the below variable will show the amount in cart
var totalquantity=0;


//the below var will increase the amount in modlist,if addtocart is pressed this default value will be restored



displayCart();




function displayCart(){
    
myfruits.innerHTML = modifiedFruitList.map((item, i) => {
   
  var { image, title, price,roughcount } = item;
  return (
      `<div class='box'>
      <div class="adjust-button"  ><button id="plus-mod${i}" class="oper-button">+</button><span class="adjust-amount">${roughcount}</span><button class="oper-button" id="minus-mod${i}">-</button></div>
          <div class='img-box'>
              <img class='images' src=${image}></img>
          </div>
          <div class='bottom'>
              <p>${title}</p>
              <h2>$ ${price}.00</h2>
              <button id='addToCartBtn_${i}'>Add to cart</button>
          </div>
      </div>`
  );
}).join('');

}


var cart = [];

function plusMod(indexofFruit_mod){


    
var rof=modifiedFruitList[indexofFruit_mod].roughcount++;
console.log("index of the fruit:",indexofFruit_mod);
console.log("roughcount of this fruit :",rof);
displayCart();



}



function minusMod(indexOfFruit_mode)
{
    modifiedFruitList[indexOfFruit_mode].roughcount--;
    displayCart();

}


function addtocart(index) {
    var  idOfFruit=index;
    if(modifiedFruitList[index].amount==0)
    {
        modifiedFruitList[index].amount++;
        totalquantity++;    
        
        cart.push({ ...modifiedFruitList[index] });
       
        displaySidebarcart();
        console.log("addtoC pressed,first element:")

    }
    else{
        console.log("addtoC pressed,more  elements:")
        cart.forEach((value,i)=>{

            var {id}=value;
            if(id==idOfFruit)
            {
                cart[i].amount++;
                totalquantity++;
                console.log("total:",total)
                //console.log("cart[i].amount:",cart[i].amount);
            }
            
            });
        displaySidebarcart();
       
   
    }
}


function delElement(a) {
    

    console.log("cart to be deleted:",cart[a])
    let tobeless=cart[a].amount;
    console.log("tobeLess:",cart[a].amount)
    totalquantity=totalquantity-tobeless;

    //also updating amount of this fruit in modified list

    let sourceId=cart[a].id;
    modifiedFruitList[sourceId].amount=0;

    console.log("fruit:",modifiedFruitList[sourceId].title,"amount is:",modifiedFruitList[sourceId].amount)
    cart.splice(a, 1);
    displaySidebarcart();
    //console.log("delete button pressed");
    

}



modifiedFruitList.forEach((item,index) => {
    document.getElementById(`addToCartBtn_${index}`).addEventListener('click', () => addtocart(index));
    document.getElementById(`plus-mod${index}`).addEventListener('click',()=>plusMod(index));
    document.getElementById(`minus-mod${index}`).addEventListener('click',()=>minusMod(index));

});



// cart.forEach((item,index)=>
// {document.getElementById(`deleteButton_${index}`).addEventListener('click',()=>delElement(index));
// }
// );
 
function displaySidebarcart() {
    let total=0;
    
   
    document.getElementById("count").innerHTML=totalquantity;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        
        document.getElementById("cartItem").innerHTML = cart.map((items,j)=>

        {    
            var {image, title, price,amount} = items;

            let totalPrice=price*amount;
            //change 2
           // total=total+price;
           total=total+totalPrice;


            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title} <span>${amount}</span></p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>
                
                <button class="dltButton" id='deleteButton_${j}'>dlt</button>
                
                </div>`
            
                );
            
        }).join('');
        cart.forEach((item,index)=>
{document.getElementById(`deleteButton_${index}`).addEventListener('click',()=>delElement(index));
}
);


    }

    


}


