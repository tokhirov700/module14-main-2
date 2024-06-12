document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://6662ac4162966e20ef097175.mockapi.io/api/products/products';
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const productForm = document.getElementById('productForm');
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productImageInput = document.getElementById('productImage');
    const modalTitle = document.getElementById('modalTitle');
    const productsContainer = document.getElementById('productsContainer');

    const showModal = () => {
        productModal.style.display = 'block';
    };

    const hideModal = () => {
        productModal.style.display = 'none';
        productForm.reset();
        productIdInput.value = '';
    };

    closeModal.onclick = hideModal;

    window.onclick = (event) => {
        if (event.target == productModal) {
            hideModal();
        }
    };

    addProductBtn.onclick = () => {
        modalTitle.textContent = 'Yangi mahsulot qo\'shish';
        showModal();
    };
    const loadProducts = async () => {
        const response = await fetch(apiURL);
        const products = await response.json();
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.title}</h3>
                <p>${product.price} so'm</p>
                <button onclick="editProduct('${product.id}', '${product.name}', ${product.price}, '${product.image}')">Tahrirlash</button>
            `;
            productsContainer.appendChild(productCard);
        });
    };
    window.editProduct = (id, name, price, image) => {
        console.log('id:', id);
        console.log('name:', name);
        console.log('price:', price);
        console.log('image:', image);
        productIdInput.value = id;
        productNameInput.value = name;
        productPriceInput.value = price;
        productImageInput.value = image;
        modalTitle.textContent = 'Mahsulotni tahrirlash';
        showModal();
    };
    productForm.onsubmit = async (event) => {
        event.preventDefault();
        const id = productIdInput.value;
        const name = productNameInput.value;
        const price = productPriceInput.value;
        const image = productImageInput.value;
        const product = { name, price, image };

        if (id) {
        
            await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
        } else {
        
            await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
        }

        hideModal();
        loadProducts();
    };

    loadProducts();
});