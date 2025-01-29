const foodOptions = ["Pizza", "Burger", "Pasta", "Sandwich", "Salad", "Fries", "Juice", "Coffee"];
const foodList = document.getElementById("foodList");
const selectedItemsDiv = document.getElementById("selectedItems");
const selectedFoodList = document.getElementById("selectedFoodList");

// Generate food item checkboxes dynamically
foodOptions.forEach(food => {
    const div = document.createElement("div");
    div.classList.add("flex", "items-center", "gap-2");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = food;
    checkbox.classList.add("food-checkbox");

    const label = document.createElement("label");
    label.textContent = food;

    div.appendChild(checkbox);
    div.appendChild(label);
    foodList.appendChild(div);
});

// Listen for checkbox selection
document.querySelectorAll(".food-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        updateSelectedItems();
    });
});

function updateSelectedItems() {
    const checkedBoxes = document.querySelectorAll(".food-checkbox:checked");
    selectedFoodList.innerHTML = ""; // Clear previous selection

    if (checkedBoxes.length > 0) {
        selectedItemsDiv.classList.remove("hidden");

        checkedBoxes.forEach(box => {
            const food = box.value;
            const div = document.createElement("div");
            div.classList.add("flex", "items-center", "gap-2", "mt-2");

            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.classList.add("input-box", "w-16");

            const label = document.createElement("span");
            label.textContent = food;

            div.appendChild(label);
            div.appendChild(quantityInput);
            selectedFoodList.appendChild(div);
        });
    } else {
        selectedItemsDiv.classList.add("hidden");
    }
}

function placeOrder() {
    const roomNumber = document.getElementById("roomNumber").value.trim();
    const guestName = document.getElementById("guestName").value.trim();
    const checkedBoxes = document.querySelectorAll(".food-checkbox:checked");

    if (!roomNumber || !guestName) {
        alert("Please enter your Room Number and Name.");
        return;
    }

    if (checkedBoxes.length === 0) {
        alert("Please select at least one food item.");
        return;
    }

    let orderDetails = {
        roomNumber,
        guestName,
        foodItems: []
    };

    checkedBoxes.forEach(box => {
        const food = box.value;
        const quantity = document.querySelector(`.input-box[value="${food}"]`)?.value || 1;
        orderDetails.foodItems.push({ food, quantity });
    });

    console.log("Order Placed:", orderDetails);
    alert(`Order placed successfully for Room ${roomNumber}!`);
}
