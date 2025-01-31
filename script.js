document.addEventListener("DOMContentLoaded", () => {
    const foodList = [
        { name: "Pizza", price: 300 },
        { name: "Burger", price: 150 },
        { name: "Pasta", price: 200 },
        { name: "Fries", price: 100 },
        { name: "Sandwich", price: 180 }
    ];

    const foodSelect = document.getElementById("food-select");
    foodList.forEach((food, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${food.name} - ₹${food.price}`;
        foodSelect.appendChild(option);
    });

    foodSelect.addEventListener("change", updatePrice);
    document.getElementById("quantity").addEventListener("input", updatePrice);
});

let orders = [];

function updatePrice() {
    const foodIndex = document.getElementById("food-select").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    if (foodIndex !== "" && quantity > 0) {
        const selectedFood = [
            { name: "Pizza", price: 300 },
            { name: "Burger", price: 150 },
            { name: "Pasta", price: 200 },
            { name: "Fries", price: 100 },
            { name: "Sandwich", price: 180 }
        ][foodIndex];
        document.getElementById("price").value = selectedFood.price * quantity;
    }
}

function addItem() {
    const foodIndex = document.getElementById("food-select").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    
    if (foodIndex === "" || quantity <= 0) {
        alert("Please select a food item and enter a valid quantity.");
        return;
    }

    const selectedFood = [
        { name: "Pizza", price: 300 },
        { name: "Burger", price: 150 },
        { name: "Pasta", price: 200 },
        { name: "Fries", price: 100 },
        { name: "Sandwich", price: 180 }
    ][foodIndex];

    orders.push({ name: selectedFood.name, quantity, price: selectedFood.price * quantity });
    renderOrders();
}

function renderOrders() {
    const table = document.getElementById("order-table");
    table.innerHTML = "";
    let total = 0;

    orders.forEach((order, index) => {
        total += order.price;
        table.innerHTML += `
            <tr class="text-center bg-gray-700">
                <td class="border border-gray-600 p-2">${index + 1}</td>
                <td class="border border-gray-600 p-2">${order.name}</td>
                <td class="border border-gray-600 p-2">${order.quantity}</td>
                <td class="border border-gray-600 p-2">₹${order.price}</td>
                <td class="border border-gray-600 p-2">
                    <button onclick="deleteItem(${index})" class="bg-white-500 hover:bg-white-600 text-white px-2 py-1 rounded">🗑️</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("total-price").textContent = total;
}

function deleteItem(index) {
    orders.splice(index, 1);
    renderOrders();
}

function clearItems() {
    orders = [];
    renderOrders();
}

function placeOrder() {
    alert("Order placed successfully!");
    clearItems();
}
