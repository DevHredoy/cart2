

const uniqueFruits=[

{id:0,image:"basket/grape.jpg",title:"grape fruit",price:34,},
{id:1,image:"basket/Bubblegum.jpeg",title:"bubblegum fruit",price:23,},
{id:2,image:"basket/lichu.jpg",title:"Lichi",price:11,},
{id:3,image:"basket/Loquat.jpg",title:"Loquat",price:23,}

];

const myfruits=document.querySelector("#body-contents");

let i=0;

function sendToCart(i)
{


    
}



myfruits.innerHTML=uniqueFruits.map((item)=>
{
    var{image,title,price}=item;


// onclick='addtocart("+(i++)+")' 

return(
    
    `<div class='box'>
        <div class='img-box'>
            <img class='images' src=${image}></img>
        </div>
    <div class='bottom'>
    <p>${title}</p>
    <h2>$ ${price}.00</h2>`+
    "<button class='add-to-card-button'>Add to cart</button>"+
    
    `</div>
    </div>`
)


}).join('')


console.log("myfruits: ",myfruits);

