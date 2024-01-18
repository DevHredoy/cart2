const uniqueFruits = [
    { id: 0, image: "basket/grape.jpg", title: "grape fruit", price: 34 },
    { id: 1, image: "basket/Bubblegum.jpeg", title: "bubblegum fruit", price: 23 },
    { id: 2, image: "basket/lichu.jpg", title: "Lichi", price: 11 },
    { id: 3, image: "basket/Loquat.jpg", title: "Loquat", price: 23 }
];

const myfruits = document.querySelector("#body-contents");

myfruits.innerHTML = uniqueFruits.map((item, i) => {
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

function addtocart(index) {
    cart.push({ ...uniqueFruits[index] });
    console.log(cart);
    displaycart();
}

function delElement(a) {
    console.log("a: ",a)
    cart.splice(a, 1);
    displaycart();

}


// this index is the index of that button which is also the index of that specific fruit(of the array) ,if the button is pressed that fruit
//is shallow coppied from the fruit array then pushed inside the cart array.
uniqueFruits.forEach((item,index) => {
    document.getElementById(`addToCartBtn_${index}`).addEventListener('click', () => addtocart(index));
});

cart.forEach((index)=>
{document.getElementById(`deleteButton_${index}`).addEventListener('click',()=>delElement(index));
console.log("delete button id:",index)}
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
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>
                <button class="dltButton" id='deleteButton_${j}'>dlt</button>
                
                </div>`
            
                );
            
        }).join('');
    }

    


}


