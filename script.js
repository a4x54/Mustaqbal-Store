// بيانات السلة
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const cartTotalPrice = document.querySelector('.cart-total-price');
const checkoutBtn = document.getElementById('checkoutBtn');
const whatsappNumber = "9647781456686";
const searchToggle = document.getElementById('searchToggle');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
const productsContainer = document.getElementById('products-container');
const offersContainer = document.getElementById('offers-container');
const productModal = document.getElementById('product-modal');
const productDetails = document.getElementById('product-details');
const closeModal = document.querySelector('.close-modal');


// تحديث تهيئة الموقع لاستدعاء التحسينات الجديدة
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
    loadProducts();
    loadOffers();
    
    // ضبط الارتفاع المناسب للجسم بناءً على ارتفاع mobile-nav
    const mobileNavHeight = document.querySelector('.mobile-nav').offsetHeight;
    document.body.style.paddingBottom = mobileNavHeight + 'px';
    
    // إضافة مستمعي الأحداث
    setupEventListeners();
    
    // تهيئة التحسينات الجديدة
    initEnhancements();
});

// تحميل المنتجات وعرضها
function loadProducts() {
    const products = productsData.products;
    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    productsContainer.innerHTML = '';
    productsContainer.appendChild(productsGrid);
}

// تحميل العروض وعرضها
function loadOffers() {
    const offers = productsData.products.filter(product => 
        productsData.offers.includes(product.id)
    );
    
    const offersGrid = document.createElement('div');
    offersGrid.className = 'products-grid';
    
    if (offers.length === 0) {
        offersGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-tags"></i>
                <p>لا توجد عروض حالياً</p>
            </div>
        `;
    } else {
        offers.forEach(product => {
            const productCard = createProductCard(product, true);
            offersGrid.appendChild(productCard);
        });
    }
    
    offersContainer.innerHTML = '';
    offersContainer.appendChild(offersGrid);
}

// إنشاء بطاقة منتج
function createProductCard(product, isOffer = false) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-category', product.category);
    productCard.setAttribute('data-id', product.id);
    
    let badgeHTML = '';
    if (product.badge) {
        const badgeClass = isOffer ? 'product-badge offer-badge' : 'product-badge';
        badgeHTML = `<span class="${badgeClass}">${product.badge}</span>`;
    }
    
    const originalPriceHTML = product.originalPrice ? 
        `<span class="original-price">${product.originalPrice.toLocaleString()} د.ع</span>` : '';
    
    productCard.innerHTML = `
        ${badgeHTML}
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">
                <div class="price">${product.price.toLocaleString()} د.ع ${originalPriceHTML}</div>
                <div class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                    <i class="fas fa-plus"></i>
                </div>
            </div>
            <button class="view-product-details" data-id="${product.id}">
                <i class="fas fa-eye"></i> عرض التفاصيل
            </button>
        </div>
    `;
    
    return productCard;
}

// الحصول على اسم الفئة بالعربية
function getCategoryName(categoryKey) {
    const categories = {
        'chargers': 'شواحن',
        'headphones': 'سماعات',
        'cables': 'كابلات',
        'covers': 'أغلفة هواتف',
        'tablets': 'أجهزة لوحية',
        'accessories': 'إكسسوارات'
    };
    
    return categories[categoryKey] || 'منتجات';
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // فتح وإغلاق سلة التسوق
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // فتح وإغلاق البحث
    searchToggle.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // إضافة منتج إلى السلة (باستخدام تفويض الأحداث)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            addToCart(button);
        }
        
        if (e.target.closest('.view-product-details')) {
            const button = e.target.closest('.view-product-details');
            const productId = button.getAttribute('data-id');
            showProductDetails(productId);
        }
    });

    // إرسال الطلب عبر واتساب
    checkoutBtn.addEventListener('click', sendOrderViaWhatsApp);

    // تفعيل أقسام الخدمات
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            showServiceDetails(service);
        });
    });

    // فلترة المنتجات حسب الفئة
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProductsByCategory(category, this);
        });
    });

    // وظيفة البحث
    searchInput.addEventListener('input', filterProductsBySearch);

    // تحسين تجربة mobile-nav
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('.mobile-nav a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // إغلاق نافذة تفاصيل المنتج
    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });
}


// عرض تفاصيل المنتج
function showProductDetails(productId) {
    const product = productsData.products.find(p => p.id == productId);
    if (!product) return;
    
    const originalPriceHTML = product.originalPrice ? 
        `<span class="original-price">${product.originalPrice.toLocaleString()} د.ع</span>` : '';
    
    let featuresHTML = '';
    if (product.features && product.features.length > 0) {
        featuresHTML = `
            <div class="product-features">
                <h4>الميزات:</h4>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    productDetails.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <div class="product-detail-category">${getCategoryName(product.category)}</div>
            <div class="product-detail-price">
                <span class="price">${product.price.toLocaleString()} د.ع</span>
                ${originalPriceHTML}
            </div>
            <p class="product-detail-description">${product.description}</p>
            ${featuresHTML}
            <div class="product-detail-actions">
                <div class="add-to-cart-large" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                    <i class="fas fa-cart-plus"></i> أضف إلى السلة
                </div>
            </div>
        </div>
    `;
    
    // إضافة مستحدث حدث لإضافة إلى السلة من داخل النافذة
    const addToCartBtn = productDetails.querySelector('.add-to-cart-large');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            addToCart(this);
        });
    }
    
    productModal.style.display = 'block';
}

// عرض تفاصيل الخدمة
function showServiceDetails(service) {
    // إخفاء جميع أقسام الخدمات التفصيلية
    document.querySelectorAll('.service-detail').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // إظهار القسم المطلوب
    document.getElementById(`${service}-detail`).classList.add('active');
    
    // التمرير إلى القسم
    window.scrollTo({
        top: document.getElementById(`${service}-detail`).offsetTop - 100,
        behavior: 'smooth'
    });
}

// تصفية المنتجات حسب الفئة
function filterProductsByCategory(category, clickedTab) {
    // تحديث التبويب النشط
    document.querySelectorAll('.category-tab').forEach(t => {
        t.classList.remove('active');
    });
    clickedTab.classList.add('active');
    
    const allProducts = document.querySelectorAll('.product-card');
    
    if (category === 'all') {
        allProducts.forEach(product => {
            product.style.display = 'block';
        });
    } else {
        allProducts.forEach(product => {
            if (product.getAttribute('data-category') === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
}

// تصفية المنتجات حسب البحث
function filterProductsBySearch() {
    const searchTerm = this.value.toLowerCase().trim();
    const allProducts = document.querySelectorAll('.product-card');
    
    if (searchTerm === '') {
        allProducts.forEach(product => {
            product.style.display = 'block';
        });
        return;
    }
    
    allProducts.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const category = product.querySelector('.product-category').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || category.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// في ملف script.js، أضف هذه الدوال للتحكم بالتبويبات
function setupRechargeTabs() {
    // تبويبات الخدمات الرئيسية
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            // تحديد التبويب النشط
            document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // إظهار المحتوى المناسب
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabType}-tab`).classList.add('active');
        });
    });
    
    // تبويبات الشركات
    document.querySelectorAll('.company-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const company = this.getAttribute('data-company');
            
            // تحديد التبويب النشط
            document.querySelectorAll('.company-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // إظهار العروض المناسبة
            document.querySelectorAll('.company-offers').forEach(offer => {
                offer.classList.remove('active');
            });
            document.querySelector(`.company-offers[data-company="${company}"]`).classList.add('active');
        });
    });
    
    // تبويبات الألعاب
    document.querySelectorAll('.game-category').forEach(category => {
        category.addEventListener('click', function() {
            const game = this.getAttribute('data-category');
            
            // تحديد التبويب النشط
            document.querySelectorAll('.game-category').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // إظهار العروض المناسبة
            document.querySelectorAll('.game-offers').forEach(offer => {
                offer.classList.remove('active');
            });
            document.querySelector(`.game-offers[data-category="${game}"]`).classList.add('active');
        });
    });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setupRechargeTabs();
});

// تحديث السلة
function updateCart() {
    // تحديث عدد العناصر
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // تحديث قائمة العناصر
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <p style="text-align: center; padding: 40px 20px; color: var(--gray);">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
                    سلة التسوق فارغة
                </p>
            </div>
        `;
        cartTotalPrice.textContent = '0 د.ع';
        return;
    }
    
    // حساب المجموع الكلي
    let total = 0;
    
    // إضافة العناصر إلى السلة
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} د.ع × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // تحديث المجموع الكلي
    cartTotalPrice.textContent = `${total.toLocaleString()} د.ع`;
    
    // إضافة مستمعي الأحداث لأزرار الحذف
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            removeFromCart(id);
        });
    });
}

// إزالة منتج من السلة
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    saveCartToLocalStorage();
}

// حفظ السلة في localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// إرسال الطلب عبر واتساب
function sendOrderViaWhatsApp() {
    if (cart.length === 0) return;
    
    let message = "مرحبًا، أود طلب المنتجات التالية من مكتب المستقبل:\n\n";
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.quantity} × ${item.price.toLocaleString()} د.ع (المجموع: ${(item.quantity * item.price).toLocaleString()} د.ع)\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nالمجموع الكلي: ${total.toLocaleString()} د.ع\n\nشكرًا!`;
    
    // ترميز الرسالة لرابط واتساب
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}

// عرض إشعار
function showNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; bottom: 80px; right: 20px; background: #27ae60; color: white; padding: 12px; border-radius: 8px; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center;">
            <i class="fas fa-check-circle" style="margin-left: 8px;"></i> ${message}
        </div>
    `;
    document.body.appendChild(notification);
    
    // إزالة الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// تحديث الروابط النشطة أثناء التمرير
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section, .service-detail, footer');
    const navLinks = document.querySelectorAll('.mobile-nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if(pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// دعم أفضل للشاشات ذات الشقوق (notch)
function updateSafeArea() {
    const safeTop = getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0px';
    const safeBottom = getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') || '0px';
    
    document.documentElement.style.setProperty('--safe-top', safeTop);
    document.documentElement.style.setProperty('--safe-bottom', safeBottom);
    
    // تحديث padding-bottom للجسم بناءً على safe area
    const mobileNavHeight = document.querySelector('.mobile-nav').offsetHeight;
    const safeBottomValue = parseFloat(safeBottom) || 0;
    document.body.style.paddingBottom = `calc(${mobileNavHeight}px + ${safeBottom})`;
}


// إضافة دوال جديدة للتحسينات

// شريط التقدم أثناء التمرير
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
}

// زر العودة للأعلى
function toggleScrollToTopButton() {
    const scrollToTopBtn = document.getElementById("scrollToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// قائمة الهاتف
function setupMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    
    menuToggle.addEventListener("click", function() {
        mobileMenu.classList.toggle("active");
        this.setAttribute("aria-expanded", mobileMenu.classList.contains("active"));
    });
    
    // إغلاق القائمة عند النقر على عنصر
    document.querySelectorAll(".mobile-menu-item").forEach(item => {
        item.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// الأسئلة الشائعة
function setupFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        
        question.addEventListener("click", () => {
            // إغلاق جميع العناصر الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector(".faq-answer").classList.remove("active");
                    otherItem.querySelector(".faq-question").classList.remove("active");
                }
            });
            
            // تبديل العنصر الحالي
            const answer = item.querySelector(".faq-answer");
            answer.classList.toggle("active");
            question.classList.toggle("active");
        });
    });
}

// تحميل الصور بطريقة كسولة محسنة
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add("loaded");
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback للمتصفحات التي لا تدعم IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// إشعار الإضافة للسلة
function showCartNotification(message) {
    const notification = document.getElementById("cart-notification");
    const notificationText = document.getElementById("notification-text");
    
    notificationText.textContent = message;
    notification.classList.add("show");
    
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// تحسين إضافة المنتج للسلة
function addToCart(button) {
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = button.getAttribute('data-image');
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
        });
    }
    
    updateCart();
    saveCartToLocalStorage();
    
    // عرض إشعار الإضافة
    showCartNotification(`تم إضافة "${name}" إلى السلة`);
}

// تهيئة جميع الميزات الجديدة
function initEnhancements() {
    // إعداد شريط التقدم
    window.onscroll = function() {
        updateProgressBar();
        toggleScrollToTopButton();
    };
    
    // زر العودة للأعلى
    document.getElementById("scrollToTop").addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    
    // إعداد قائمة الهاتف
    setupMobileMenu();
    
    // إعداد الأسئلة الشائعة
    setupFAQ();
    
    // إعداد التحميل الكسول للصور
    setupLazyLoading();
    
    // تحسينات إضافية للأداء
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}




// تحديث safe area عند تغيير حجم النافذة أو اتجاهها
window.addEventListener('resize', updateSafeArea);
window.addEventListener('orientationchange', updateSafeArea);

// التهيئة الأولية

updateSafeArea();

