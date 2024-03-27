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

        let idCount = "rough-count" + indexOfFrtOrig;

        document.getElementById(idCount).innerText = 1;
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
        } else {
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
      const updatedItem = updatedData.find(
        (item) => item.id === indexOfFrtOrig
      );

      const updatedAmount = updatedItem.amount;
      let idCount = "rough-count" + indexOfFrtOrig;

      document.getElementById(idCount).innerText = updatedAmount;

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

      cart.forEach((value, i) => {
        if (indexOfFrtOrig == value.id) {
          let idforAmRight = "amount-side_" + i;

          let amountInCart = value.amount;

          document.getElementById(idforAmRight).innerText = amountInCart;

          displaySidebarCart();
        }
      });
    }
  }

  // if there is no previous record of UpListFrt
  else {
    let rof = modifiedFruitList[indexOfFrtOrig].roughCount + 1;

    let idCount = "rough-count" + indexOfFrtOrig;

    document.getElementById(idCount).innerText = rof;
    localStorage.setItem("UpListFrt", JSON.stringify(modifiedFruitList));
    displaySidebarCart();
  }
}
// minus left button

function minusMod(indexOfFrtOrig) {
  const updatedData = JSON.parse(localStorage.getItem("UpListFrt"));

  if (
    updatedData[indexOfFrtOrig].roughCount > 1 ||
    updatedData[indexOfFrtOrig].amount > 1
  ) {
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
                  ? { ...item, roughCount: item.roughCount - 1 }
                  : item
              )
            )
          );

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
          } else {
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
                ? { ...item, amount: item.amount - 1 }
                : item
            )
          )
        );

        const updatedData = JSON.parse(localStorage.getItem("UpListFrt"));
        const updatedItem = updatedData.find(
          (item) => item.id === indexOfFrtOrig
        );

        const updatedAmount = updatedItem.amount;
        let idCount = "rough-count" + indexOfFrtOrig;

        document.getElementById(idCount).innerText = updatedAmount;

        // code for the right side , code to update the amount in right side, if indexOfFrtOrig matches with the id of the carts items,incremented

        localStorage.setItem(
          "basket",
          JSON.stringify(
            JSON.parse(localStorage.getItem("basket")).map((item) =>
              item.id === indexOfFrtOrig
                ? { ...item, amount: item.amount - 1 }
                : item
            )
          )
        );

        cart.forEach((value, i) => {
          if (indexOfFrtOrig == value.id) {
            let idforAmRight = "amount-side_" + i;

            let amountInCart = value.amount;

            document.getElementById(idforAmRight).innerText = amountInCart;

            displaySidebarCart();
          }
        });
      }
    }

    // if there is no previous record of UpListFrt
    else {
      let rof = modifiedFruitList[indexOfFrtOrig].roughCount - 1;

      let idCount = "rough-count" + indexOfFrtOrig;

      document.getElementById(idCount).innerText = rof;
      localStorage.setItem("UpListFrt", JSON.stringify(modifiedFruitList));
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

  // Save the updated or new data back to localStorage
  localStorage.setItem("UpListFrt", JSON.stringify(upListFrtData));
  let tempidy = "addToCartBtn_" + index;
  document.getElementById(tempidy).style.display = "none";

  let prevUpListFrtData = JSON.parse(localStorage.getItem("UpListFrt")) || [];

  // Check if the "amount" property of the item with index "index" is 0 or not
  if (prevUpListFrtData[index]?.amount == 0) {
    // Condition when the "amount" property is not 0
    if (prevUpListFrtData[index]?.roughCount == 0) {
      prevUpListFrtData[index].amount++;

      cart.push({ ...prevUpListFrtData[index] });
    } else {
      // when button is visible but there is rough count and addtocart pressed
      prevUpListFrtData[index].amount = prevUpListFrtData[index].roughCount;
      prevUpListFrtData[index].roughCount = 0;
      cart.push({ ...prevUpListFrtData[index] });

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
  let toBeLess = cart[a].amount;

  totalQuantity = totalQuantity - toBeLess;

  let sourceId = cart[a].id;

  localStorage.setItem(
    "UpListFrt",
    JSON.stringify(
      JSON.parse(localStorage.getItem("UpListFrt")).map((item) =>
        item.id === sourceId
          ? { ...item, roughCount: 0, amount: 0, btnVisible: true }
          : item
      )
    )
  );

  cart.splice(a, 1);
  localStorage.setItem("basket", JSON.stringify(cart));
  displaySidebarCart();
  displayCart();
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

  if (!updatedItem.btnVisible) {
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

    if (!updatedItem.btnVisible) {
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
  let totalAmount = 0;

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

        totalAmount = totalAmount + amount;
        document.getElementById("count").innerHTML = totalAmount;
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
