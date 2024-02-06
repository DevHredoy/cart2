const uniqueFruits = [
  { id: 0, image: "basket/grape.jpg", title: "grape fruit", price: 34 },
  {
    id: 1,
    image: "basket/Bubblegum.jpeg",
    title: "bubblegum fruit",
    price: 23,
  },
  { id: 2, image: "basket/lichu.jpg", title: "Lichi", price: 11 },
  { id: 3, image: "basket/Loquat.jpg", title: "Loquat", price: 23 },
];

const modifiedFruitList = uniqueFruits.map((fruit) => {
  return { ...fruit, amount: 0, roughcount: 1 };
});

const myfruits = document.querySelector("#body-contents");

var totalquantity = 0;

displayCart();

function displayCart() {
  myfruits.innerHTML = modifiedFruitList
    .map((item, i) => {
      var { image, title, price } = item;
      return `<div class='box'>
      <div class="adjust-button"  ><button id="plus-mod${i}" class="oper-button">+</button><span class="adjust-amount" id="rough-count${i}">1</span><button class="oper-button" id="minus-mod${i}">-</button></div>
          <div class='img-box'>
              <img class='images' src=${image}></img>
          </div>
          <div class='bottom'>
              <p>${title}</p>
              <h2>$ ${price}.00</h2>
              <button id='addToCartBtn_${i}'>Add to cart</button>
          </div>
      </div>`;
    })
    .join("");
}

var cart = [];

function plusMod(indexofFruit_mod) {
  let tempidd = "addToCartBtn_" + indexofFruit_mod;

  if (document.getElementById(tempidd).disabled) {
    cart.forEach((value, i) => {
      if (indexofFruit_mod == value.id) {
        value.amount++;
        totalquantity++;

        let idForLeft = "rough-count" + indexofFruit_mod;

        document.getElementById(idForLeft).innerText = value.amount;

        let idforAmRight = "amount-side_" + i;
        // console.log(
        //   "we are dealing with the fruit in the cart which has the index:",
        //   idforAmSide
        // );

        //amountIncart is :to get the value of amount for that fruit in amount
        let amountIncart = value.amount;

        // console.log("amountIncart:", amountIncart);
        document.getElementById(idforAmRight).innerText = amountIncart;
        document.getElementById("count").innerText = totalquantity;
        // console.log("cart.amount:", value.amount);
        displaySidebarcart();
      }
    });
  }
  //else tells if the fruit is not already in the cart
  else {
    let rof = ++modifiedFruitList[indexofFruit_mod].roughcount;

    let idOfDisplayOfBtn = "rough-count" + indexofFruit_mod;

    document.getElementById(idOfDisplayOfBtn).innerText = rof;
    displaySidebarcart();
  }
}
//-------------------
function minusMod(indexofFruit_mod) {
  if (modifiedFruitList[indexofFruit_mod].roughcount <= 0) {
    cart.forEach((value, index) => {
      if (value.id == indexofFruit_mod) {
        console.log("value:", value);
        if (value.amount >= 1) {
          value.amount--;
          totalquantity--;
          let tempid = "rough-count" + indexofFruit_mod;
          document.getElementById(tempid).innerText = 0;
          console.log("id:", tempid);
          displaySidebarcart();
        }
      }
    });
  } else {
    let rof = --modifiedFruitList[indexofFruit_mod].roughcount;
    console.log("index of the fruit:", indexofFruit_mod);
    console.log("roughcount of this fruit :", rof);
    let idOfDisplayOfBtn = "rough-count" + indexofFruit_mod;
    console.log("idOfDisplayOfBtn:", idOfDisplayOfBtn);
    document.getElementById(idOfDisplayOfBtn).innerText = rof;
    displaySidebarcart();
  }
}

//belw id:cart ,idforAmSide not handled properly
function addtocart(index) {
  var idOfFruit = index;
  if (modifiedFruitList[index].amount == 0) {
    if (modifiedFruitList[index].roughcount == 0) {
      modifiedFruitList[index].amount++;
      console.log(
        "modifiedFruitList[index].amount :",
        modifiedFruitList[index].amount
      );
      totalquantity++;

      cart.push({ ...modifiedFruitList[index] });

      displaySidebarcart();
      document.getElementById("count").innerText = totalquantity;

      // modifiedFruitList[index].amount

      console.log(
        "amount in modifiedfruitList:",
        modifiedFruitList[index].amount
      );

      let tempid = "addToCartBtn_" + index;
      document.getElementById(tempid).disabled = true;
      document.getElementById(tempid).style.display = "none";
    } else {
      modifiedFruitList[index].amount = modifiedFruitList[index].roughcount;

      console.log(
        "modifiedFruitList[index].amount :",
        modifiedFruitList[index].amount
      );
      totalquantity = totalquantity + modifiedFruitList[index].roughcount;

      cart.push({ ...modifiedFruitList[index] });

      displaySidebarcart();
      modifiedFruitList[index].roughcount = 0;
      let tempid = "rough-count" + index;
      document.getElementById(tempid).innerText =
        modifiedFruitList[index].amount;

      document.getElementById("count").innerText = totalquantity;

      // modifiedFruitList[index].amount

      console.log(
        "amount in modifiedfruitList:",
        modifiedFruitList[index].amount
      );
      let tempdaddy = "addToCartBtn_" + index;
      document.getElementById(tempdaddy).disabled = true;
      document.getElementById(tempdaddy).style.display = "none";
    }
  } else {
    if (modifiedFruitList[index].roughcount == 0) {
      cart.forEach((value, i) => {
        if (idOfFruit == value.id) {
          value.amount++;
          totalquantity++;
          let idforAmSide = "amount-side_" + i;
          console.log(
            "we are dealing with the fruit in the cart which has the index:",
            idforAmSide
          );

          //amountIncart is :to get the value of amount for that fruit in amount
          let amountIncart = value.amount;

          console.log("amountIncart:", amountIncart);
          document.getElementById(idforAmSide).innerText = amountIncart;
          document.getElementById("count").innerText = totalquantity;
          console.log("cart.amount:", value.amount);
        }
      });
    } else {
      cart.forEach((value, i) => {
        if (idOfFruit == value.id) {
          value.amount++;
          totalquantity++;
          let idforAmSide = "amount-side_" + i;
          console.log(
            "we are dealing with the fruit in the cart which has the index:",
            idforAmSide
          );

          //amountIncart is :to get the value of amount for that fruit in amount
          let amountIncart = value.amount;

          console.log("amountIncart:", amountIncart);
          document.getElementById(idforAmSide).innerText = amountIncart;
          document.getElementById("count").innerText = totalquantity;
          console.log("cart.amount:", value.amount);
        }
      });
    }
  }
}

function delElement(a) {
  console.log("cart to be deleted:", cart[a]);
  let tobeless = cart[a].amount;
  console.log("tobeLess:", cart[a].amount);
  totalquantity = totalquantity - tobeless;

  //also updating amount of this fruit in modified list

  let sourceId = cart[a].id;
  modifiedFruitList[sourceId].amount = 0;

  console.log(
    "fruit:",
    modifiedFruitList[sourceId].title,
    "amount is:",
    modifiedFruitList[sourceId].amount
  );
  let realId = cart[a].id;
  realId = "addToCartBtn_" + realId;
  //--------------
  document.getElementById(realId).disabled = false;
  document.getElementById(realId).style.display = "block";

  cart.splice(a, 1);
  displaySidebarcart();
  //console.log("delete button pressed");
}

//plus in right

function incrsAmm(i) {
  cart[i].amount++;
  totalquantity++;

  let tempId = "amount-side_" + i;
  document.getElementById(tempId).innerText = cart[i].amount;
  document.getElementById("count").innerText = totalquantity;
  displaySidebarcart();
}
//minus in right
function decrsAmm(i) {
  if (cart[i].amount <= 0) {
  } else {
    cart[i].amount--;
    totalquantity--;

    let tempId = "amount-side_" + i;
    document.getElementById(tempId).innerText = cart[i].amount;
    document.getElementById("count").innerText = totalquantity;
    displaySidebarcart();
  }
}

modifiedFruitList.forEach((item, index) => {
  document
    .getElementById(`addToCartBtn_${index}`)
    .addEventListener("click", () => addtocart(index));
  document
    .getElementById(`plus-mod${index}`)
    .addEventListener("click", () => plusMod(index));
  document
    .getElementById(`minus-mod${index}`)
    .addEventListener("click", () => minusMod(index));
});

function displaySidebarcart() {
  let total = 0;

  document.getElementById("count").innerHTML = totalquantity;
  if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ " + 0 + ".00";
  } else {
    document.getElementById("cartItem").innerHTML = cart
      .map((items, j) => {
        var { image, title, price, amount } = items;

        let totalPrice = price * amount;

        //change 2
        // total=total+price;
        total = total + totalPrice;

        document.getElementById("total").innerHTML = "$ " + total + ".00";
        return `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
               <div class="title_right small-div">${title}</div>
                <div class="right_adjust small-div"> <button class="oper-button" id="plus_rightBtn_${j}">+</button><span class="right_amount" id="amount-side_${j}">${amount}</span><button class="oper-button" id="minus_rightBtn_${j}">-</button>
                </div>
                <div class="price-right small-div"><h2 class="each-price_right">$ ${price}.00</h2></div>
                
               <div class="dlt-button small-div"> <button class="dltButton" id='deleteButton_${j}'>dlt</button></div>
                
                </div>`;
      })
      .join("");
    cart.forEach((item, index) => {
      document
        .getElementById(`deleteButton_${index}`)
        .addEventListener("click", () => delElement(index));

      document
        .getElementById(`plus_rightBtn_${index}`)
        .addEventListener("click", () => incrsAmm(index));

      document
        .getElementById(`minus_rightBtn_${index}`)
        .addEventListener("click", () => decrsAmm(index));
    });
  }
}
