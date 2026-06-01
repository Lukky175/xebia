const API_URL = '/api/products';

// DOM Elements
const productsBody = document.getElementById('productsBody');
const loadingIndicator = document.getElementById('loadingIndicator');
const emptyState = document.getElementById('emptyState');
const modalOverlay = document.getElementById('modalOverlay');
const addProductBtn = document.getElementById('addProductBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');

// Form Inputs
const productIdInput = document.getElementById('productId');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');

// State
let products = [];
let isEditing = false;

// Fetch and render products
async function fetchProducts() {
    try {
        loadingIndicator.classList.remove('hidden');
        productsBody.innerHTML = '';
        emptyState.classList.add('hidden');

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        
        products = await response.json();
        
        loadingIndicator.classList.add('hidden');
        
        if (products.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            renderProducts();
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        loadingIndicator.innerText = 'Error loading products. Please try again later.';
    }
}

function renderProducts() {
    productsBody.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${product.id}</td>
            <td><strong>${escapeHtml(product.name)}</strong></td>
            <td><span style="color: var(--text-secondary); font-size: 0.9em;">${escapeHtml(product.description || '-')}</span></td>
            <td>
                <span style="background: rgba(255,255,255,0.1); padding: 0.2rem 0.6rem; border-radius: 12px; font-weight: 500;">
                    ${product.quantity}
                </span>
            </td>
            <td>$${parseFloat(product.price).toFixed(2)}</td>
            <td>
                <button class="btn action-btn edit-btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn action-btn delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productsBody.appendChild(tr);
    });
}

// Modal logic
function openModal(editing = false) {
    isEditing = editing;
    modalTitle.innerText = editing ? 'Edit Product' : 'Add New Product';
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    productForm.reset();
    productIdInput.value = '';
}

// Form Submission
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const productData = {
        name: nameInput.value,
        description: descriptionInput.value,
        quantity: parseInt(quantityInput.value),
        price: parseFloat(priceInput.value)
    };

    try {
        if (isEditing) {
            const id = productIdInput.value;
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        }
        
        closeModal();
        fetchProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product');
    }
});

// Edit Product
window.editProduct = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    productIdInput.value = product.id;
    nameInput.value = product.name;
    descriptionInput.value = product.description;
    quantityInput.value = product.quantity;
    priceInput.value = product.price;

    openModal(true);
};

// Delete Product
window.deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
    }
};

// Utility
function escapeHtml(unsafe) {
    return (unsafe || '').toString()
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Event Listeners
addProductBtn.addEventListener('click', () => openModal(false));
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Close modal on outside click
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Init
fetchProducts();
