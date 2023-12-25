import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const inputField = document.getElementById("input-field");
const buttEL = document.getElementById("add-button");

const appSettings = {
  databaseURL: "https://playground-bf4f0-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const ItemsInDatabase = ref(database, "Items");
const shoppingListEL = document.getElementById("shopping-list");

//This function retrieves snapshots from DB and puts it in the Ul
onValue(ItemsInDatabase, function (snapshot) {
  if (snapshot.exists()) {
    let snapShotItems = Object.entries(snapshot.val());
    shoppingListELClear();
    for (let i = 0; i < snapShotItems.length; i++) {
      let currentItem = snapShotItems[i];
      let currentItemID = currentItem;
      let currentItemValue = currentItem;

      appendToShoppingListEL(currentItemValue);
    }
  } else {
    shoppingListEL.innerHTML = "No items here yet...";
  }
});

// This clears the Ul element
function shoppingListELClear() {
  shoppingListEL.innerHTML = "";
}

function clear() {
  inputField.value = "";
}

//This function adds items to the ul element
function appendToShoppingListEL(item) {
  let itemId = item[0];
  let itemValue = item[1];

  // Creating and appending list to UL element
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  let exactLocationOfItem = ref(database, `Items/${itemId}`);
  newEl.addEventListener("click", () => {
    remove(exactLocationOfItem);
  });
  shoppingListEL.append(newEl);
}

//function to send items to DB
buttEL.addEventListener("click", () => {
  let input = inputField.value;
  clear();
  push(ItemsInDatabase, input);
  console.log(`${inputField.value} added to database`);
});
