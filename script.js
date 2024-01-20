
const container = document.querySelector(".container");

let foodItems = [];

// Function to fetch the menu on page load
async function getMenu() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
    const menuItems = await response.json();
    
    foodItems = [];
    
    // Add the new items
    menuItems.forEach((item) => foodItems.push(item));
    
    displayMenu(menuItems);

    takeOrder();
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
}

// Function to display the menu
function displayMenu(menuItems) {
  menuItems.forEach((item) => {
    container.innerHTML += `
      <div id="item-${item.id}" class="card">
        <div class="card-body">
          <img src="${item.imgSrc}">
        </div>
        <div class="food-detail">
          <div class="name-price">
            <div>${item.name}</div>
            <div>$${item.price}</div>
          </div>
          <div class="add">
            <img src="./assets/plus (1) 1.svg" alt="">
          </div>
        </div>
      </div>
    `;

    const addButton = document.querySelector(`#item-${item.id} .add img`);
    addButton.addEventListener("click", addToCart);
  });
}

function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Choose any 3 burgers randomly and add them to the object
      const orderedItems = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * foodItems.length);
        orderedItems.push(foodItems[randomIndex]);
      }
      resolve(orderedItems);
    }, 2500);
  }).then((orderedItems) => {
    console.log('Order:', orderedItems);

    return orderPrep();
  });
}

// Function to simulate order preparation
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  }).then((orderStatus) => {
    console.log('Order Status:', orderStatus);

    // Start payment process
    return payOrder();
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  }).then((paymentStatus) => {
    console.log('Payment Status:', paymentStatus);

    thankyouFnc();
  });
}

function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

document.addEventListener("DOMContentLoaded", getMenu);

function addToCart(e) {
  let id = e.target.closest('.card').id;
  document.getElementById(id).style.border = "1px solid red";
  console.log("Food is added to cart. The food id is " + id);
}
