// بيانات المنتجات - يمكن تعديلها بسهولة لإدارة المحتوى
const productsData = {
    products: [
        {
            id: 1,
            name: "غطاء آيفون شفاف - خفيف",
            category: "covers",
            price: 25000,
            originalPrice: 30000,
            image: "https://images.unsplash.com/photo-1603349206295-dde20617cb6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "جديد",
            description: "غطاء آيفون شفاف عالي الجودة يحمي هاتفك مع الحفاظ على المظهر الأصلي. مصنوع من مواد متينة وشفافة لا تغير لونها مع الوقت.",
            features: ["حماية متينة", "شفافية عالية", "خفة الوزن", "منفذ شحن مفتوح"],
            inStock: true
        },
        {
            id: 2,
            name: "سماعات بلوتوث لاسلكية",
            category: "headphones",
            price: 89000,
            originalPrice: 120000,
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "عرض",
            description: "سماعات بلوتوث لاسلكية عالية الجودة مع صوت واضح وعزل للضوضاء. بطارية تدوم حتى 20 ساعة وتشحن سريعًا.",
            features: ["بلوتوث 5.0", "20 ساعة تشغيل", "مقاومة العرق", "جودة صوت عالية"],
            inStock: true
        },
        {
            id: 3,
            name: "شاحن سريع 30 واط",
            category: "chargers",
            price: 45000,
            originalPrice: 55000,
            image: "https://images.unsplash.com/photo-1606220588910-1de3b1f5049c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "",
            description: "شاحن سريع بقوة 30 واط يشحن أجهزتك بسرعة فائقة. متوافق مع معظم الهواتف الذكية والأجهزة اللوحية.",
            features: ["شحن سريع", "30 واط", "متوافق عالمي", "حماية من ارتفاع الحرارة"],
            inStock: true
        },
        {
            id: 4,
            name: "حامل سيارة مغناطيسي",
            category: "accessories",
            price: 35000,
            originalPrice: 45000,
            image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "",
            description: "حامل سيارة مغناطيسي قوي يثبت هاتفك بأمان أثناء القيادة. سهل التركيب والاستخدام.",
            features: ["مغناطيس قوي", "سهل التركيب", "زاوية قابلة للتعديل", "مناسب لجميع الهواتف"],
            inStock: true
        },
        {
            id: 5,
            name: "شاحن متنقل 10000 مللي أمبير",
            category: "chargers",
            price: 65000,
            originalPrice: 85000,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "عرض مميز",
            description: "شاحن متنقل بسعة 10000 مللي أمبير يمكنه شحن هاتفك عدة مرات. صغير الحجم وسهل الحمل.",
            features: ["10000 مللي أمبير", "شحن سريع", "حماية متعددة", "صغير الحجم"],
            inStock: true
        },
        {
            id: 6,
            name: "سماعات أذن لاسلكية",
            category: "headphones",
            price: 55000,
            originalPrice: 75000,
            image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "عرض حصري",
            description: "سماعات أذن لاسلكية مريحة مع صوت واضح وعزل ضوضاء. مثالية للرياضة والاستخدام اليومي.",
            features: ["مقاومة العرق", "بطارية طويلة الأمد", "حالة شحن显示", "صوت واضح"],
            inStock: true
        },
        {
            id: 7,
            name: "حافظة أجهزة متعددة الاستخدام",
            category: "accessories",
            price: 45000,
            originalPrice: 60000,
            image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "عرض خاص",
            description: "حافظة متعددة الاستخدامات تحمي أجهزتك من الخدوش والصدمات. تتسع للهاتف وسماعات الرأس والكابلات.",
            features: ["متعددة الاستخدام", "مادة متينة", "تخزين منظم", "حماية شاملة"],
            inStock: true
        },
        {
            id: 8,
            name: "قلم ستايلس للشاشات اللمسية",
            category: "accessories",
            price: 30000,
            originalPrice: 40000,
            image: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "عرض محدود",
            description: "قلم ستايلس دقيق للرسم والكتابة على الشاشات اللمسية. متوافق مع معظم الأجهزة اللوحية والهواتف.",
            features: ["دقة عالية", "متوافق مع معظم الشاشات", "بطارية طويلة الأمد", "تصميم مريح"],
            inStock: true
        },
        {
            id: 9,
            name: "تابلت سامسونج جالاكسي A8",
            category: "tablets",
            price: 650000,
            originalPrice: 750000,
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "جديد",
            description: "تابلت سامسونج جالاكسي A8 بشاشة 10.5 بوصة وأداء قوي. مثالي للعمل والترفيه.",
            features: ["شاشة 10.5 بوصة", "أداء قوي", "بطارية طويلة الأمد", "تصميم أنيق"],
            inStock: true
        },
        {
            id: 10,
            name: "كابل شحن سريع Type-C",
            category: "cables",
            price: 15000,
            originalPrice: 20000,
            image: "https://images.unsplash.com/photo-1583863788437-2a5a5d26a834?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            badge: "جديد",
            description: "كابل شحن سريع Type-C متين وسريع النقل. متوافق مع معظم الأجهزة الحديثة.",
            features: ["شحن سريع", "نقل بيانات سريع", "متانة عالية", "طول 1.5 متر"],
            inStock: true
        }
    ],
    offers: [5, 6, 7, 8] // IDs of products that are on offer
};