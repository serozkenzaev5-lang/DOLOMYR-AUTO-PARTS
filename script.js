const products = [
    {
        id: 1,
        name: "Опора двигателя левый Hyundai Solaris II / Kia Rio IV(акпп)(17-25) 21830 H5100",
        price: 4200,
        image: "img/photo_1_2025-12-24_16-52-10.jpg"
    },
    {
        id: 2,
        name: "Рулевой наконечник левый Hyundai Solaris II / Кио рио IV 56820 H8000",
        price: 700,
        image: "img/photo_1_2025-12-24_17-52-56.jpg"
    },
    {
        id: 3,
        name: "Катушка зажигания кия оптима IV объем двигателя 2.4 литра хундай саната VII 27300 2GGA0",
        price: 1700,
        image: "img/photo_2_2025-12-24_16-52-10.jpg"
    },
    {
        id: 4,
        name: "Стойка стабилизатора Hyundai Solaris / Кио рио 54830 0U000",
        price: 700,
        image: "img/photo_3_2025-12-24_16-52-10.jpg"
    },
    {
        id: 5,
        name: "Свеча зажигания Hyundai Solaris / Кио рио иридиевые 1884410060",
        price: 1500,
        image: "img/photo_4_2025-12-24_16-52-10.jpg"
    },
    {
        id: 6,
        name: "Катушка зажигания Hyundai Solaris / Кио рио 1.6L 27301-2B010",
        price: 800,
        image: "img/photo_5_2025-12-24_16-52-10.jpg"
    },
    {
        id: 7,
        name: "Колодки задний барабаный Hyundai Solaris  II / Кио рио IV 58350-H5A20",
        price: 1400,
        image: "img/photo_6_2025-12-24_16-52-10.jpg"
    },
    {
        id: 8,
        name: "Катушка зажигания Hyundai Solaris II / Кио рио IV  1.4L 27301-03200",
        price: 800,
        image: "img/photo_7_2025-12-24_16-52-10.jpg"
    },
    {
        id: 9,
        name: "Подшипник ступицы Hyundai Solaris II / Кио рио IV 51720-H5000",
        price: 1500,
        image: "img/photo_8_2025-12-24_16-52-10.jpg"
    },
    {
        id: 10,
        name: "Комплект колпаков на Hyundai Solaris II R15 / 2017-2025 / 52960 H5000",
        price: 4400,
        image: "img/photo_9_2025-12-24_16-52-10.jpg"
    },
    {
        id: 11,
        name: "Рулевой наконечник правый Hyundai Solaris II / Кио рио IV 56825 H8000",
        price: 700,
        image: "img/photo_10_2025-12-24_16-52-10.jpg"
    },
    {
        id: 12,
        name: "Амортизатор передний L Kia K5 / 54650-L2100",
        price: 7500,
        image: "img/photo_2026-01-07_23-26-53.jpg"
    },
    {
        id: 13,
        name: "Амортизатор задний Kia K5 / 55307-L2200",
        price: 6500,
        image: "img/photo_2026-01-07_23-27-04.jpg"
    },
    {
        id: 14,
        name: "Амортизатор передний R Kia K5 / 54651-L2100",
        price: 7500,
        image: "img/photo_2026-01-07_23-27-07.jpg"
    },
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
    
    // Формируем сообщение для WhatsApp
    let message = '🛒 *Новый заказ с сайта DOLOMYR AUTO PARTS*\n\n';
    message += '*Состав заказа:*\n';
    
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. ${item.name}\n`;
        message += `   ${item.price.toLocaleString()} ₽ × ${item.quantity} = ${itemTotal.toLocaleString()} ₽\n`;
    });
    
    message += `\n💰 *ИТОГО: ${total.toLocaleString()} ₽*`;
    
    // Добавляем текущую дату и время
    const now = new Date();
    const date = now.toLocaleDateString('ru-RU');
    const time = now.toLocaleTimeString('ru-RU');
    message += `\n📅 ${date} ${time}`;
    
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Номер телефона для WhatsApp (ваш номер)
    const phoneNumber = '79773998519'; // Ваш номер +79773998519 → 79773998519
    
    // Создаем URL для WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Показываем сообщение пользователю
    showMessage('Перенаправление в WhatsApp...');
    
    // Закрываем корзину
    closeCart();
    
    // Открываем WhatsApp в новой вкладке
    window.open(whatsappUrl, '_blank');
    
    // Очищаем корзину после оформления заказа
    cart = [];
    updateCart();
    
    checkoutBtn.classList.remove('pulse');
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
    const phoneNumber = '79773998519'; // Ваш номер
    const message = encodeURIComponent('Здравствуйте! Хочу узнать о наличии запчастей...');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Добавляем стили для новых анимаций
const style = document.createElement('style');
style.textContent = '.clicked { animation: shake 0.3s ease; }' +
                    '.rotate { animation: rotate 0.5s ease; }' +
                    '.shake { animation: shake 0.5s ease; }' +
                    '@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }';
document.head.appendChild(style);