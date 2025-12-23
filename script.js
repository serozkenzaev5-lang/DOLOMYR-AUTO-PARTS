const products = [
    {
        id: 1,
        name: "Радиатор охлаждения",
        price: 12500,
        image: "https://avatars.mds.yandex.net/i?id=fb6e70a9e4aa19f25d3e9dfd90261421c6978670-3794023-images-thumbs&n=13"
    },
    {
        id: 2,
        name: "Тормозные колодки",
        price: 4500,
        image: "https://avatars.mds.yandex.net/i?id=d96237b59fa6e6d8496a6d08332664cafa865fcb-5232515-images-thumbs&n=13"
    },
    {
        id: 3,
        name: "Масло моторное",
        price: 3200,
        image: "https://avatars.mds.yandex.net/i?id=288dc5df39f1dd684debc008efec27e2b62a2a0b-16456753-images-thumbs&n=13"
    },
    {
        id: 4,
        name: "Амортизаторы",
        price: 8500,
        image: "https://avatars.mds.yandex.net/i?id=b2b0fd14d318113abc75da25bb3b54e610608a91-4885523-images-thumbs&n=13"
    },
    {
        id: 5,
        name: "Аккумулятор",
        price: 12500,
        image: "https://avatars.mds.yandex.net/i?id=9ea8e22cf0e639601d6401e635c81d7628efac3b-8897302-images-thumbs&n=13"
    },
    {
        id: 6,
        name: "Свечи зажигания",
        price: 2800,
        image: "https://avatars.mds.yandex.net/i?id=955449fe1d8bab90764927b8e45fe8100c0768fb-8261187-images-thumbs&n=13"
    }
];

let cart = [];

window.onload = function() {
    renderProducts();
    loadCart();
    setupAnimations();
    setupTheme();
};

function setupAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });
    
    document.querySelectorAll('.product, section, .feature-item').forEach(function(el) {
        observer.observe(el);
    });
}

function setupTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
        updateThemeIcon(savedTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    
    document.querySelector('.theme-toggle i').classList.add('rotate');
    setTimeout(function() {
        document.querySelector('.theme-toggle i').classList.remove('rotate');
    }, 500);
    
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (theme === 'dark-mode') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function renderProducts(productsToShow) {
    if (!productsToShow) {
        productsToShow = products;
    }
    
    const container = document.getElementById('products');
    container.innerHTML = '';
    
    productsToShow.forEach(function(product, index) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.style.animationDelay = (index * 0.1) + 's';
        productDiv.innerHTML = '<img src="' + product.image + '" alt="' + product.name + '">' +
                               '<div class="product-info">' +
                               '<h3>' + product.name + '</h3>' +
                               '<div class="price">' + product.price.toLocaleString() + '</div>' +
                               '<button class="add-cart" onclick="addToCart(' + product.id + ')">' +
                               '<i class="fas fa-cart-plus"></i> В корзину</button>' +
                               '</div>';
        container.appendChild(productDiv);
    });
}
function searchProducts() {
    const searchInput = document.getElementById('search');
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
        renderProducts();
        return;
    }
    
    searchInput.classList.add('shake');
    setTimeout(function() {
        searchInput.classList.remove('shake');
    }, 500);
    
    const filtered = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchTerm);
    });
    
    renderProducts(filtered);
}

function addToCart(productId) {
    const product = products.find(function(p) {
        return p.id === productId;
    });
    
    const existingItem = cart.find(function(item) {
        return item.id === productId;
    });
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showMessage('Товар добавлен в корзину!');
    
    const button = event.target.closest('.add-cart');
    button.classList.add('clicked');
    setTimeout(function() {
        button.classList.remove('clicked');
    }, 300);
}

function removeFromCart(productId) {
    cart = cart.filter(function(item) {
        return item.id !== productId;
    });
    
    updateCart();
    showMessage('Товар удалён');
}

function updateCart() {
    const count = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);
    
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = count;
    
    cartCount.classList.add('bounce');
    setTimeout(function() {
        cartCount.classList.remove('bounce');
    }, 300);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    if (document.getElementById('cartModal').style.display === 'block') {
        renderCart();
    }
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        const count = cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);
        document.querySelector('.cart-count').textContent = count;
    }
}

document.querySelector('.cart-btn').onclick = function() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'block') {
        closeCart();
    } else {
        openCart();
    }
};

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
    renderCart();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('total');
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:40px; color: var(--text-color);">Корзина пуста</p>';
        totalElement.textContent = '0';
        return;
    }
    
    let total = 0;
    let html = '';
    
    cart.forEach(function(item, index) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += '<div class="cart-item" style="animation-delay: ' + (index * 0.1) + 's">' +
                '<div>' +
                '<h4>' + item.name + '</h4>' +
                '<p>' + item.price.toLocaleString() + ' ₽ × ' + item.quantity + '</p>' +
                '</div>' +
                '<div>' +
                '<p style="font-weight: 600;">' + itemTotal.toLocaleString() + ' ₽</p>' +
                '<button onclick="removeFromCart(' + item.id + ')" class="remove">' +
                '<i class="fas fa-trash"></i>' +
                '</button>' +
                '</div>' +
                '</div>';
    });
    
    container.innerHTML = html;
    totalElement.textContent = total.toLocaleString();
}
function checkout() {
    if (cart.length === 0) {
        showMessage('Корзина пуста!');
        return;
    }
    
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.classList.add('pulse');
    
    const total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);
    
    setTimeout(function() {
        if (confirm('Оформить заказ на сумму ' + total.toLocaleString() + ' ₽?')) {
            showMessage('Заказ оформлен! Номер заказа: #' + Math.floor(Math.random() * 10000));
            cart = [];
            updateCart();
            closeCart();
        }
        checkoutBtn.classList.remove('pulse');
    }, 1000);
}

function showMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'notification';
    msg.textContent = text;
    document.body.appendChild(msg);
    
    setTimeout(function() {
        msg.remove();
    }, 3000);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function openWhatsApp() {
    window.open('https://wa.me/7XXXXXXXXXX', '_blank');
}

// Добавляем стили для новых анимаций
const style = document.createElement('style');
style.textContent = '.clicked { animation: shake 0.3s ease; }' +
                    '.rotate { animation: rotate 0.5s ease; }' +
                    '.shake { animation: shake 0.5s ease; }' +
                    '@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }';
document.head.appendChild(style);