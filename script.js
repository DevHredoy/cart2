const modifiedFruitList = [
  {
    id: 0,
    image: "basket/grape.jpg",
    title: "grape fruit",
    price: 34,
    amount: 0,
    roughCount: 0,
    btnVisible: true,
  },
  {
    id: 1,
    image: "basket/Bubblegum.jpeg",
    title: "bubblegum fruit",
    price: 23,
    amount: 0,
    roughCount: 0,
    btnVisible: true,
  },
  {
    id: 2,
    image: "basket/lichu.jpg",
    title: "Lichi",
    price: 11,
    amount: 0,
    roughCount: 0,
    btnVisible: true,
  },
  {
    id: 3,
    image: "basket/Loquat.jpg",
    title: "Loquat",
    price: 23,
    amount: 0,
    roughCount: 0,
    btnVisible: true,
  },
];

const myfruits = document.querySelector("#body-contents");

let totalQuantity = 0;

displayCart();

function displayCart() {
  myfruits.innerHTML = modifiedFruitList
    .map((item, i) => {
      let { image, title, price } = item;

      return `<div class='box'>
      <div class="adjust-button"  ><button id="plus-mod${i}" class="oper-button">+</button><span class="adjust-amount" id="rough-count${i}"> ${
        (JSON.parse(localStorage.getItem("UpListFrt")) ?? []).find(
          (item) => item?.id === i
        )?.roughCount || "1"
      }</span><button class="oper-button" id="minus-mod${i}">-</button></div>
          <div class='img-box'>
              <img class='images' src=${image}></img>
          </div>
          <div class='bottom'>
              <p>${title}</p>
              <h2>$ ${price}.00</h2>

              
              <button id="addToCartBtn_${i}" style="${
        (JSON.parse(localStorage.getItem("UpListFrt")) ?? []).find(
          (item) => item?.id === i
        )?.btnVisible ?? modifiedFruitList[i]?.btnVisible
          ? ""
          : "display:none;"
      }"
              >Add to cart</button>
          </div>
      </div>`;
    })
    .join("");
}

let cart = [];

function plusMod(indexOfFrtOrig) {
  let tempidd = "addToCartBtn_" + indexOfFrtOrig;
  //if the product is on the cart already
  if (document.getElementById(tempidd).disabled) {
    cart.forEach((value, i) => {
      if (indexOfFrtOrig == value.id) {
        value.amount++;
        totalQuantity++;

        let idForLeft = "rough-count" + indexOfFrtOrig;

        document.getElementById(idForLeft).innerText = value.amount;

        let idforAmRight = "amount-side_" + i;

        let amountInCart = value.amount;

        document.getElementById(idforAmRight).innerText = amountInCart;
        document.getElementById("count").innerText = totalQuantity;

        displaySidebarCart();
        //lS

        // local set
        localStorage.setItem(
          "UpListFrt",
          JSON.stringify(
            JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
              item.id === indexOfFrtOrig
                ? { ...item, roughCount: item.roughCount + 1 }
                : item
            )
          )
        );
      }
    });
  }
  //else tells if the fruit is not already in the cart
  // ----------------------------------------------------------------------------------------------------------------
  else {
    //lS
    // if "UpListFrt" has any previous stored value
    if (
      localStorage.getItem("UpListFrt") &&
      localStorage.getItem("UpListFrt").length > 0
    ) {
      // from the storage item we have increased from the previous amount then inner html
      localStorage.setItem(
        "UpListFrt",
        JSON.stringify(
          JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
            item.id === indexOfFrtOrig
              ? { ...item, roughCount: item.roughCount + 1 }
              : item
          )
        )
      );
      console.log("rough count is:");
      const updatedData = JSON.parse(localStorage.getItem("UpListFrt"));

      // Find the item with the specified id
      const updatedItem = updatedData.find(
        (item) => item.id === indexOfFrtOrig
      );

      // Check if the item was found
      if (updatedItem) {
        // Access the updated roughCount
        const updatedRoughCount = updatedItem.roughCount;
        let idCount = "rough-count" + indexOfFrtOrig;

        document.getElementById(idCount).innerText = updatedRoughCount;
        console.log("Updated roughCount:", updatedRoughCount);
      } else {
        console.log("Item not found");
      }

      displaySidebarCart();
    } else {
      let rof = ++modifiedFruitList[indexOfFrtOrig].roughCount;

      let idCount = "rough-count" + indexOfFrtOrig;

      document.getElementById(idCount).innerText = rof;
      localStorage.setItem("UpListFrt", JSON.stringify(modifiedFruitList));
      displaySidebarCart();
    }
  }
}

//----------------------------- minus left button

function minusMod(indexOfFruitOrig) {
  let tempIdd = "addToCartBtn_" + indexOfFruitOrig;

  // if addto button is disabled
  if (document.getElementById(tempIdd).disabled) {
    cart.forEach((value, i) => {
      if (value.id == indexOfFruitOrig) {
        //if amount is greater than 0
        if (value.amount > 1) {
          value.amount--;
          totalQuantity--;
          //change in left
          let tempIdForLeft = "rough-count" + indexOfFruitOrig;
          document.getElementById(tempIdForLeft).innerText = value.amount;

          //change in right

          let tmpIdForRight = "amount-side_" + i;
          document.getElementById(tmpIdForRight).innerText = value.amount;

          //change in totalquantity
          document.getElementById("count").innerText = totalQuantity;
          displaySidebarCart();
        }
        //if amount is 0 or smaller
      }
    });
  }
  // if cart is empty
  else {
    const updatedData = JSON.parse(localStorage.getItem("UpListFrt"));

    const updatedItem = updatedData.find(
      (item) => item.id === indexOfFruitOrig
    );
    const updatedRoughCount = updatedItem.roughCount;
    if (updatedRoughCount > 1) {
      localStorage.setItem(
        "UpListFrt",
        JSON.stringify(
          JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
            item.id === indexOfFruitOrig
              ? { ...item, roughCount: item.roughCount - 1 }
              : item
          )
        )
      );
      const updatedData = JSON.parse(localStorage.getItem("UpListFrt"));

      // Find the item with the specified id
      const updatedItem = updatedData.find(
        (item) => item.id === indexOfFruitOrig
      );

      // Check if the item was found
      if (updatedItem) {
        // Access the updated roughCount
        const updatedRoughCount = updatedItem.roughCount;
        let idCount = "rough-count" + indexOfFruitOrig;

        document.getElementById(idCount).innerText = updatedRoughCount;
      } else {
        console.log("Item not found");
      }

      displaySidebarCart();
    }
  }
}

function addToCart(index) {
  let idOfFruit = index;

  // this below part could be written in localstorage. format
  let upListFrtData =
    JSON.parse(localStorage.getItem("UpListFrt")) || modifiedFruitList;

  // Check if the item with idOfFruit exists in upListFrtData
  let existingItemIndex = upListFrtData.findIndex(
    (item) => item.id === idOfFruit
  );

  if (existingItemIndex !== -1) {
    // If the item exists, update its btnVisible
    upListFrtData[existingItemIndex].btnVisible = false;
  } else {
    // If the item doesn't exist, create a new item
    upListFrtData.push({ id: idOfFruit, btnVisible: false });
  }

  // Save the updated or new data back to localStorage
  localStorage.setItem("UpListFrt", JSON.stringify(upListFrtData));
  let tempidy = "addToCartBtn_" + index;
  document.getElementById(tempidy).style.display = "none";

  //-----------in js codeinput fix gpt chat the latest problem has been placed
  //the below segment we have to change
  if (modifiedFruitList[index].amount == 0) {
  } else {
  }
}

function delElement(a) {
  console.log("cart to be deleted:", cart[a]);
  let toBeLess = cart[a].amount;
  console.log("tobeLess:", cart[a].amount);
  totalQuantity = totalQuantity - toBeLess;

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

  document.getElementById(realId).disabled = false;
  document.getElementById(realId).style.display = "block";

  cart.splice(a, 1);
  displaySidebarCart();
}

function incrsAmInRight(i) {
  cart[i].amount++;
  totalQuantity++;

  let tempId = "amount-side_" + i;
  document.getElementById(tempId).innerText = cart[i].amount;

  modifiedFruitList.forEach((value, j) => {
    if (cart[i].id == value.id) {
      let idforAmSide = "rough-count" + value.id;

      document.getElementById(idforAmSide).innerText = cart[i].amount;
    }
  });

  document.getElementById("count").innerText = totalQuantity;
  displaySidebarCart();
}
//minus in right
function decrsAmInRight(i) {
  if (cart[i].amount > 1) {
    cart[i].amount--;
    totalQuantity--;
    //finding that in left cart
    modifiedFruitList.forEach((value, j) => {
      if (cart[i].id == value.id) {
        let idforAmSide = "rough-count" + value.id;

        document.getElementById(idforAmSide).innerText = cart[i].amount;
      }
    });

    //---------------

    let tempId = "amount-side_" + i;
    document.getElementById(tempId).innerText = cart[i].amount;

    let temppId = (document.getElementById("count").innerText = totalQuantity);
    displaySidebarCart();
  }
}

modifiedFruitList.forEach((item, index) => {
  document
    .getElementById(`addToCartBtn_${index}`)
    .addEventListener("click", () => addToCart(index));
  document
    .getElementById(`plus-mod${index}`)
    .addEventListener("click", () => plusMod(index));
  document
    .getElementById(`minus-mod${index}`)
    .addEventListener("click", () => minusMod(index));
});

function displaySidebarCart() {
  let total = 0;

  document.getElementById("count").innerHTML = totalQuantity;
  if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ " + 0 + ".00";
  } else {
    document.getElementById("cartItem").innerHTML = cart
      .map((items, j) => {
        let { image, title, price, amount } = items;

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
                <div
                 class="right_adjust small-div"> <button class="oper-button" id="plus_rightBtn_${j}">+</button><span class="right_amount" id="amount-side_${j}">${amount}</span><button class="oper-button" id="minus_rightBtn_${j}">-</button>
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
        .addEventListener("click", () => incrsAmInRight(index));

      document
        .getElementById(`minus_rightBtn_${index}`)
        .addEventListener("click", () => decrsAmInRight(index));
    });
  }
}
