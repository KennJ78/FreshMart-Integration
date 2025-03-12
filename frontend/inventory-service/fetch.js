document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/v1/inventory")  // Correct ESB endpoint
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById("products");
            productList.innerHTML = "";
            data.forEach(product => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.stock}</td>
                    <td>$${product.price}</td>
                    <td>
                        <button onclick="reduceStock('${product.name}')">Reduce Stock</button>
                    </td>
                `;
                productList.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});

function reduceStock(productName) {
    fetch(`http://localhost:3000/api/v1/inventory/edit/${productName}`, {  // ESB endpoint
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sold: 1 })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(error => console.error("Error reducing stock:", error));
}

function addProduct() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const stock = document.getElementById("stock").value;
    const price = document.getElementById("price").value;

    fetch("http://localhost:3000/api/v1/inventory/add", {  // ESB endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, stock, price })
    })
    .then(response => response.json())
    .then(data => {
        alert("Product Added Successfully");
        location.reload();
    })
    .catch(error => console.error("Error adding product:", error));
}
