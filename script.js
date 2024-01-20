const uniqueFruits = [
    { id: 0, image: "basket/grape.jpg", title: "grape fruit", price: 34 },
    { id: 1, image: "basket/Bubblegum.jpeg", title: "bubblegum fruit", price: 23 },
    { id: 2, image: "basket/lichu.jpg", title: "Lichi", price: 11 },
    { id: 3, image: "basket/Loquat.jpg", title: "Loquat", price: 23 }
];
// { WE have to modify the ammount against an id.for example in addtoCart() we shall increment the ammount in terms of the id of each of object

//, so this time what we will do is  from unique fruit we shall make a new list 


//of fruits where a new variable will be included and in }

const modifiedFruitList=uniqueFruits.map((fruit)=>{
    return{...fruit,amount:0}

});

const myfruits = document.querySelector("#body-contents");




myfruits.innerHTML = modifiedFruitList.map((item, i) => {
    console.log("i:",i);
    var { image, title, price } = item;
    return (
        `<div class='box'>
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

var cart = [];

// this new array will save amount of fruits in terms of the sequence of landing page






//1.this function will check if this fruit is already exiting in the cart or not
//if it finds that in the cart then it will do something else
function addtocart(index) {
    if(modifiedFruitList[index].amount>1)///////here
    {
        modifiedFruitList[index].amount++;

    }
    else{
        modifiedFruitList[index].amount++;    
    cart.push({ ...modifiedFruitList[index] });
    console.log(cart);
    displaycart();
   
    }
}


//revised version


function addtocart(index) {
    if(modifiedFruitList[index].amount==0)///////here
    {
        modifiedFruitList[index].amount++;    
        cart.push({ ...modifiedFruitList[index] });
        console.log(cart);
        displaycart();

    }
    else{
        modifiedFruitList[index].amount++;    
        console.log("amount of this ",index,"item:",modifiedFruitList[index].amount);
    displaycart();
   
    }
}










function delElement(a) {
    
    cart.splice(a, 1);
    displaycart();

}


// this index is the index of that button which is also the index of that specific fruit(of the array) ,if the button is pressed that fruit
//is shallow coppied from the fruit array then pushed inside the cart array.
modifiedFruitList.forEach((item,index) => {
    document.getElementById(`addToCartBtn_${index}`).addEventListener('click', () => addtocart(index));
});



cart.forEach((index)=>
{document.getElementById(`deleteButton_${index}`).addEventListener('click',()=>delElement(index));
}
);

function displaycart() {
    
   
    let total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        
        document.getElementById("cartItem").innerHTML = cart.map((items,j)=>

        {    console.log("j:",j);
            var {image, title, price,amount} = items;
            total=total+price;
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
    }

    


}


