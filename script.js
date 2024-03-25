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
displaySidebarCart();

displayCart();
let one = "1";
function displayCart() {
  myfruits.innerHTML = modifiedFruitList
    .map((item, i) => {
      let { image, title, price } = item;

      return `<div class='box'>
      <div class="adjust-button"  ><button id="plus-mod${i}" class="oper-button">+</button><span class="adjust-amount" id="rough-count${i}"> ${
        (JSON.parse(localStorage.getItem("UpListFrt")) ?? []).find(
          (item) => item?.id === i
        )?.btnVisible
          ? (JSON.parse(localStorage.getItem("UpListFrt")) ?? []).find(
              (item) => item?.id === i
            )?.roughCount || 1 // Use 1 as the default value if roughCount is undefined
          : (JSON.parse(localStorage.getItem("UpListFrt")) ?? []).find(
              (item) => item?.id === i
            )?.amount || 1
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
}

let cart = JSON.parse(localStorage.getItem("basket")) || [];

function plusMod(indexOfFrtOrig) {
  // if there is previous record from UpListFrt
  if (
    localStorage.getItem("UpListFrt") &&
    localStorage.getItem("UpListFrt").length > 0
  ) {
    const updatedData = JSON.parse(localStorage.getItem("UpListFrt"));

    const updatedItem = updatedData.find((item) => item.id == indexOfFrtOrig);

    // UpListFrt :✔,button visible:✔,added in cart:❎;
    if (updatedItem.btnVisible == true) {
      //// UpListFrt :✔,button visible:✔,added in cart:❎,roughcount ==0;
      if (updatedItem.roughCount == 0) {
        localStorage.setItem(
          "UpListFrt",
          JSON.stringify(
            JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
              item.id === indexOfFrtOrig ? { ...item, roughCount: 1 } : item
            )
          )
        );
        const updatedRoughCount = updatedItem.roughCount;
        let idCount = "rough-count" + indexOfFrtOrig;

        document.getElementById(idCount).innerText = updatedRoughCount;
      }

      // UpListFrt :✔,button visible:✔,added in cart:❎,roughcount >0;
      else {
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
      }
    }

    // // UpListFrt :✔,button visible:❎,added in cart:✔;
    else {
      // code for the left side,code to update the amount in left side, 
      localStorage.setItem(
        "UpListFrt",
        JSON.stringify(
          JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
            item.id === indexOfFrtOrig
              ? { ...item, amount: item.amount + 1 }
              : item
          )
        )
      );

      const updatedData = JSON.parse(localStorage.getItem("UpListFrt"));
      const updatedItem=updatedData.find((item) => item.id === indexOfFrtOrig);
            console.log("updated item:",updatedItem)
      const updatedRoughCount = updatedItem.roughCount;
      let idCount = "rough-count" + indexOfFrtOrig;

      document.getElementById(idCount).innerText = updatedRoughCount;



      // code for the right side , code to update the amount in right side, if indexOfFrtOrig matches with the id of the carts items,incremented
      


      localStorage.setItem(
        "basket",
        JSON.stringify(
          JSON.parse(localStorage.getItem("basket")).map((item) =>
            item.id === indexOfFrtOrig
              ? { ...item, amount: item.amount + 1 }
              : item
          )
        )
      );

      //-------------------------------------------


    }
  }

  // if there is no previous record of UpListFrt
  else {
    let rof = modifiedFruitList[indexOfFrtOrig].roughCount + 1;

    console.log("rof in the item now is :", rof);

    let idCount = "rough-count" + indexOfFrtOrig;

    document.getElementById(idCount).innerText = rof;
    localStorage.setItem("UpListFrt", JSON.stringify(modifiedFruitList));
    displaySidebarCart();
  }
}
// minus left button

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
  }
  // else {
  //   // If the item doesn't exist, create a new item
  //   upListFrtData.push({ id: idOfFruit, btnVisible: false });
  // }

  // Save the updated or new data back to localStorage
  localStorage.setItem("UpListFrt", JSON.stringify(upListFrtData));
  let tempidy = "addToCartBtn_" + index;
  document.getElementById(tempidy).style.display = "none";

  //-----------in js codeinput fix gpt chat the latest problem has been placed
  //the below segment we have to change
  let prevUpListFrtData = JSON.parse(localStorage.getItem("UpListFrt")) || [];

  // Check if the "amount" property of the item with index "index" is 0 or not
  if (prevUpListFrtData[index]?.amount == 0) {
    // Condition when the "amount" property is not 0
    if (prevUpListFrtData[index]?.roughCount == 0) {
      prevUpListFrtData[index].amount++;
      //totalquantity++
      cart.push({ ...prevUpListFrtData[index] });
      //  displaySidebarCart();
      //  localStorage.setItem("UpListFrt", JSON.stringify(modifiedFruitList));
    } else {
      // when button is visible but there is rough count and addtocart pressed
      prevUpListFrtData[index].amount = prevUpListFrtData[index].roughCount;
      prevUpListFrtData[index].roughCount = 0;
      cart.push({ ...prevUpListFrtData[index] });
      console.log("first");
      localStorage.setItem(
        "UpListFrt",
        JSON.stringify(
          JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
            item.id === index
              ? { ...item, amount: prevUpListFrtData[index].amount }
              : item
          )
        )
      );

      localStorage.setItem(
        "UpListFrt",
        JSON.stringify(
          JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
            item.id === index ? { ...item, roughCount: 0 } : item
          )
        )
      );
      //displaySidebarCart();
    }
    localStorage.setItem("basket", JSON.stringify(cart));
    displaySidebarCart();
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
  // local
  localStorage.setItem(
    "basket",
    JSON.stringify(
      JSON.parse(localStorage.getItem("basket")).map((item, index) =>
        index === i ? { ...item, amount: item.amount + 1 } : item
      )
    )
  );

  let tempBasket = JSON.parse(localStorage.getItem("basket")) || [];

  let currentItem = tempBasket.find((item, index) => index === i);

  let idCount = "amount-side_" + i;

  document.getElementById(idCount).innerText = currentItem.amount;

  const sycWithLeftItm = JSON.parse(localStorage.getItem("UpListFrt"));

  const updatedItem = sycWithLeftItm.find((item) => item.id === cart[i].id);

  let tempId = updatedItem.id;

  // shall check if it syns or not
  let cartValue = currentItem.amount;
  console.log("updated item's id:", tempId);
  console.log("cart item's amount:", cartValue);

  if (!updatedItem.btnVisible) {
    console.log("btn is not visible");
    localStorage.setItem(
      "UpListFrt",
      JSON.stringify(
        JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
          item.id === tempId ? { ...item, amount: cartValue } : item
        )
      )
    );
  }

  let idforAmSide = "rough-count" + tempId;
  document.getElementById(idforAmSide).innerText = cartValue;

  displaySidebarCart();
}

//minus in right
function decrsAmInRight(i) {
  let tempBasket = JSON.parse(localStorage.getItem("basket")) || [];

  // Check if the item with indexOfFrtOrig exists in upListFrtData
  let currentItem = tempBasket.find((item, index) => index === i);
  if (currentItem.amount > 1) {
    localStorage.setItem(
      "basket",
      JSON.stringify(
        JSON.parse(localStorage.getItem("basket")).map((item, index) =>
          index === i ? { ...item, amount: item.amount - 1 } : item
        )
      )
    );

    let tempBasket = JSON.parse(localStorage.getItem("basket")) || [];

    // Check if the item with indexOfFrtOrig exists in upListFrtData
    let currentItem = tempBasket.find((item, index) => index === i);

    // let currentItem = cart.find((item, index) => index === i);
    let idCount = "amount-side_" + i;

    document.getElementById(idCount).innerText = currentItem.amount;

    const sycWithLeftItm = JSON.parse(localStorage.getItem("UpListFrt"));

    const updatedItem = sycWithLeftItm.find((item) => item.id === cart[i].id);

    let tempId = updatedItem.id;

    // shall check if it syns or not
    let cartValue = currentItem.amount;
    console.log("updated item's id:", tempId);
    console.log("cart item's amount:", cartValue);

    if (!updatedItem.btnVisible) {
      console.log("btn is not visible");
      localStorage.setItem(
        "UpListFrt",
        JSON.stringify(
          JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
            item.id === tempId ? { ...item, amount: cartValue } : item
          )
        )
      );
    }

    let idforAmSide = "rough-count" + tempId;
    document.getElementById(idforAmSide).innerText = cartValue;

    displaySidebarCart();
  }
}

function displaySidebarCart() {
  let total = 0;

  // Retrieve the cart data from local storage
  let cartFromLocalStorage = JSON.parse(localStorage.getItem("basket")) || [];

  document.getElementById("count").innerHTML = totalQuantity;

  if (cartFromLocalStorage.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ " + 0 + ".00";
  } else {
    document.getElementById("cartItem").innerHTML = cartFromLocalStorage
      .map((items, j) => {
        let { image, title, price, amount } = items;

        let totalPrice = price * amount;
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
    cartFromLocalStorage = JSON.parse(localStorage.getItem("basket")) || [];
    if (cartFromLocalStorage.length > 0) {
      cartFromLocalStorage.forEach((item, index) => {
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
}
