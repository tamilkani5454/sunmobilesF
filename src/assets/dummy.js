const Products = [
    {
        id: 1,
        name: "Sun X Pro 5G",
        category: "Gadgets",
        subCategory: "Smartphones",
        brand: "Sun",
        price: 18999,
        offerPrice: 16999,
        description: "Powerful 5G smartphone with premium design and long battery life.",
        specifications: [
            "6.6 inch Full HD Display",
            "8GB RAM | 128GB Storage",
            "5000mAh Battery",
            "5G Support",
            "1 Year Warranty"
        ],
        stock: 0,
        image: "https://images.unsplash.com/photo-1598327105655-c27635c05f59?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1598327105655-c27635c05f59?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556656793-02715d8dd6f8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592899677712-a5a25450336b?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1598327105655-c27635c05f59?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 2,
        name: "Samsung Galaxy M14",
        category: "Mobiles",
        subCategory: "Smartphones",
        brand: "Samsung",
        price: 15999,
        offerPrice: 13999,
        description: "Samsung smartphone with reliable performance and strong battery.",
        specifications: [
            "6.5 inch Display",
            "6GB RAM | 128GB Storage",
            "6000mAh Battery",
            "5G Support",
            "1 Year Warranty"
        ],
        stock: 0,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573920111312-04f1d2a58448?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 3,
        name: "Redmi Note 13",
        category: "Mobiles",
        subCategory: "Smartphones",
        brand: "Redmi",
        price: 17999,
        offerPrice: 16499,
        description: "Stylish smartphone with AMOLED display and fast charging.",
        specifications: [
            "6.67 inch AMOLED",
            "8GB RAM | 128GB Storage",
            "5000mAh Battery",
            "33W Fast Charge",
            "1 Year Warranty"
        ],
        stock: 0,
        image: "https://images.unsplash.com/photo-1598327105655-c27635c05f59?q=80&w=800&auto=format&fit=crop",
         images: [
            "https://images.unsplash.com/photo-1598327105655-c27635c05f59?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1533228126398-bad9e1cd4a38?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580910051074-3eb6948d3ad3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1598327105655-c27635c05f59?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 4,
        name: "Nokia 105",
        category: "Mobiles",
        subCategory: "Feature Phones",
        brand: "Nokia",
        price: 1499,
        offerPrice: 1299,
        description: "Simple and durable phone for calling and SMS.",
        specifications: [
            "1.77 inch Display",
            "FM Radio",
            "Long Battery Life",
            "Dual SIM",
            "1 Year Warranty"
        ],
        stock: 10,
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523206485979-ba07c0a96f3c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580910051074-3eb6948d3ad3?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 5,
        name: "Fast Charger 33W",
        category: "Accessories",
        subCategory: "Chargers",
        brand: "Sun",
        price: 999,
        offerPrice: 799,
        description: "Fast charging adapter suitable for most smartphones.",
        specifications: [
            "33W Output",
            "Type-C Support",
            "Fast Charging",
            "Compact Design",
            "6 Months Warranty"
        ],
        stock: 60,
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1629471026049-d7790bdf672b?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 6,
        name: "Type-C Cable",
        category: "Accessories",
        subCategory: "Chargers",
        brand: "MI",
        price: 399,
        offerPrice: 299,
        description: "Durable Type-C cable for charging and data transfer.",
        specifications: [
            "Fast Charging",
            "1 Meter Length",
            "Strong Build",
            "Data Sync",
            "6 Months Warranty"
        ],
        stock: 80,
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1624619463567-27b233a7e583?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 7,
        name: "Wireless Earbuds S2",
        category: "Accessories",
        subCategory: "Earphones",
        brand: "Boat",
        price: 2499,
        offerPrice: 1999,
        description: "Wireless earbuds with deep bass and clear calls.",
        specifications: [
            "Bluetooth 5.3",
            "20 Hours Playback",
            "Fast Charging",
            "Built-in Mic",
            "1 Year Warranty"
        ],
        stock: 35,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1572569028738-411a0977d4aa?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1612297621921-b3bba0104975?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 8,
        name: "Neckband Pro",
        category: "Accessories",
        subCategory: "Earphones",
        brand: "Realme",
        price: 1999,
        offerPrice: 1599,
        description: "Comfortable neckband for long usage.",
        specifications: [
            "Bluetooth Support",
            "Magnetic Buds",
            "Long Battery Life",
            "Noise Isolation",
            "1 Year Warranty"
        ],
        stock: 28,
        image: "https://images.unsplash.com/photo-1572569028738-411a0977d4aa?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1572569028738-411a0977d4aa?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1572569028738-411a0977d4aa?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 9,
        name: "Power Bank 20000mAh",
        category: "Accessories",
        subCategory: "Power Banks",
        brand: "Ambrane",
        price: 2499,
        offerPrice: 2199,
        description: "High capacity power bank for multiple charges.",
        specifications: [
            "20000mAh Capacity",
            "Dual Output",
            "Fast Charging",
            "LED Indicator",
            "1 Year Warranty"
        ],
        stock: 22,
        image: "https://images.unsplash.com/photo-1609091839311-d536552cf24f?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1609091839311-d536552cf24f?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1609592424368-7c8702b85e05?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1629471026049-d7790bdf672b?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1609091839311-d536552cf24f?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 10,
        name: "Silicone Mobile Cover",
        category: "Accessories",
        subCategory: "Mobile Covers",
        brand: "Sun",
        price: 299,
        offerPrice: 199,
        description: "Soft silicone cover for daily protection.",
        specifications: [
            "Shock Resistant",
            "Slim Design",
            "Easy Grip",
            "Scratch Protection",
            "No Warranty"
        ],
        stock: 100,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1541877663-8a38ae8bed4c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 11,
        name: "Smart Watch Fit",
        category: "Gadgets",
        subCategory: "Smart Watches",
        brand: "Noise",
        price: 3499,
        offerPrice: 2999,
        description: "Fitness smartwatch with health tracking.",
        specifications: [
            "Heart Rate Monitor",
            "Sleep Tracking",
            "Touch Display",
            "Water Resistant",
            "1 Year Warranty"
        ],
        stock: 18,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 12,
        name: "Bluetooth Speaker Mini",
        category: "Gadgets",
        subCategory: "Bluetooth Speakers",
        brand: "JBL",
        price: 1999,
        offerPrice: 1699,
        description: "Portable speaker with powerful sound.",
        specifications: [
            "Wireless Bluetooth",
            "Deep Bass",
            "Compact Size",
            "Long Battery",
            "1 Year Warranty"
        ],
        stock: 15,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1570876050997-2fdefb00c004?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 13,
        name: "Smart LED Bulb",
        category: "Gadgets",
        subCategory: "Smart Home",
        brand: "Wipro",
        price: 1299,
        offerPrice: 999,
        description: "Smart bulb with app control.",
        specifications: [
            "WiFi Enabled",
            "Voice Control",
            "Energy Saving",
            "Multiple Colors",
            "1 Year Warranty"
        ],
        stock: 25,
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507473888900-52a11b2f32ac?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 14,
        name: "Remote Control Car",
        category: "Toys",
        subCategory: "Kids Toys",
        brand: "Funskool",
        price: 1499,
        offerPrice: 1199,
        description: "Remote control toy car for kids.",
        specifications: [
            "Rechargeable Battery",
            "Strong Build",
            "Easy Controls",
            "Kids Friendly",
            "No Warranty"
        ],
        stock: 20,
        image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1532330384815-51331643126c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1530325553241-4f6e7696cf7b?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 15,
        name: "Building Blocks Set",
        category: "Toys",
        subCategory: "Educational Toys",
        brand: "Lego",
        price: 999,
        offerPrice: 799,
        description: "Creative building blocks for kids learning.",
        specifications: [
            "Educational Toy",
            "Safe Material",
            "Multi Color",
            "Reusable Blocks",
            "No Warranty"
        ],
        stock: 22,
        image: "https://images.unsplash.com/photo-1587654780291-39c940483731?q=80&w=800&auto=format&fit=crop",
        images: [
             "https://images.unsplash.com/photo-1587654780291-39c940483731?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1611604548018-d56bb497bc9b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1587654780291-39c940483731?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 16,
        name: "Electric Kettle",
        category: "Home Needs",
        subCategory: "Kitchen",
        brand: "Prestige",
        price: 1999,
        offerPrice: 1799,
        description: "Electric kettle for quick boiling.",
        specifications: [
            "1.5 L Capacity",
            "Auto Cut Off",
            "Stainless Steel",
            "Fast Boil",
            "1 Year Warranty"
        ],
        stock: 16,
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1594213114663-d94db9b1712a?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1585834898144-87856c805eb5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 17,
        name: "Steam Iron",
        category: "Home Needs",
        subCategory: "Daily Essentials",
        brand: "Philips",
        price: 2499,
        offerPrice: 2199,
        description: "Steam iron for wrinkle-free clothes.",
        specifications: [
            "Steam Function",
            "Non-stick Soleplate",
            "Fast Heating",
            "Easy Grip",
            "1 Year Warranty"
        ],
        stock: 14,
        image: "https://images.unsplash.com/photo-1565557623197-01362095cc60?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1565557623197-01362095cc60?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544830248-c115783305cd?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1565557623197-01362095cc60?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 18,
        name: "Mixer Grinder",
        category: "Home Needs",
        subCategory: "Kitchen",
        brand: "Bajaj",
        price: 3499,
        offerPrice: 3199,
        description: "Mixer grinder for daily kitchen use.",
        specifications: [
            "3 Jars",
            "Powerful Motor",
            "Easy Cleaning",
            "Compact Design",
            "1 Year Warranty"
        ],
        stock: 10,
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584992236310-6eddd724a4cb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1588669462314-23ea23a2346e?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 19,
        name: "Floor Cleaning Mop",
        category: "Home Needs",
        subCategory: "Cleaning",
        brand: "Scotch-Brite",
        price: 999,
        offerPrice: 799,
        description: "Easy floor cleaning mop.",
        specifications: [
            "Easy Wring",
            "Light Weight",
            "Durable Handle",
            "Reusable",
            "No Warranty"
        ],
        stock: 30,
        image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1527515673516-75c4454b577f?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1580256081112-e49377338b7f?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 20,
        name: "LED Table Lamp",
        category: "Home Needs",
        subCategory: "Daily Essentials",
        brand: "Syska",
        price: 1299,
        offerPrice: 999,
        description: "LED table lamp for study and work.",
        specifications: [
            "Eye Protection",
            "Low Power",
            "Touch Control",
            "Adjustable Light",
            "1 Year Warranty"
        ],
        stock: 18,
        image: "https://images.unsplash.com/photo-1507473888900-52a11b2f32ac?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1507473888900-52a11b2f32ac?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1534073828943-f801091a7109?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1513506003013-1b6a211f06f8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514330101777-1d8820c85010?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1507473888900-52a11b2f32ac?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 21,
        name: "Soft Teddy Bear",
        category: "Toys",
        subCategory: "Kids Toys",
        brand: "FunTime",
        price: 899,
        offerPrice: 699,
        description: "Soft and cute teddy bear for kids.",
        specifications: [
            "Soft Fabric",
            "Safe for Kids",
            "Light Weight",
            "Washable",
            "No Warranty"
        ],
        stock: 35,
        image: "https://images.unsplash.com/photo-1559454403-b8fb87521bc7?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1559454403-b8fb87521bc7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1555449377-50a75d1f852e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1601004169727-462ebc2e7188?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1572242133282-3d88b48227b2?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1559454403-b8fb87521bc7?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 22,
        name: "Non-Stick Fry Pan",
        category: "Home Needs",
        subCategory: "Kitchen",
        brand: "Prestige",
        price: 1599,
        offerPrice: 1399,
        description: "Non-stick frying pan for everyday cooking.",
        specifications: [
            "Non-Stick Coating",
            "Easy Cleaning",
            "Heat Resistant",
            "Ergonomic Handle",
            "1 Year Warranty"
        ],
        stock: 22,
        image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2085?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2085?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584992236310-6eddd724a4cb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583722271822-19c29d3f1190?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1556910638-64fe787f7303?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2085?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 23,
        name: "Water Bottle Steel",
        category: "Home Needs",
        subCategory: "Daily Essentials",
        brand: "Milton",
        price: 799,
        offerPrice: 599,
        description: "Stainless steel water bottle for daily use.",
        specifications: [
            "Stainless Steel",
            "Leak Proof",
            "Easy Carry",
            "Eco Friendly",
            "No Warranty"
        ],
        stock: 40,
        image: "https://images.unsplash.com/photo-1602143407151-01114192003f?q=80&w=800&auto=format&fit=crop",
        images: [
             "https://images.unsplash.com/photo-1602143407151-01114192003f?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1536965158655-707172289cdd?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550505095-213501a35a61?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1602143407151-01114192003f?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 24,
        name: "Microfiber Cleaning Cloth",
        category: "Home Needs",
        subCategory: "Cleaning",
        brand: "Scotch-Brite",
        price: 299,
        offerPrice: 199,
        description: "Microfiber cloth for easy cleaning.",
        specifications: [
            "High Absorption",
            "Reusable",
            "Soft Material",
            "Multi Purpose",
            "No Warranty"
        ],
        stock: 60,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585834898144-87856c805eb5?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 25,
        name: "Phone Ring Holder",
        category: "Accessories",
        subCategory: "Mobile Covers",
        brand: "Sun",
        price: 199,
        offerPrice: 149,
        description: "Ring holder for better phone grip.",
        specifications: [
            "Strong Adhesive",
            "360 Degree Rotation",
            "Slim Design",
            "Easy Install",
            "No Warranty"
        ],
        stock: 90,
        image: "https://images.unsplash.com/photo-1629828556534-1cb81c0fb700?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1629828556534-1cb81c0fb700?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1629828556534-1cb81c0fb700?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 26,
        name: "Car Mobile Holder",
        category: "Accessories",
        subCategory: "Mobile Covers",
        brand: "Portronics",
        price: 899,
        offerPrice: 699,
        description: "Car mobile holder for safe driving.",
        specifications: [
            "Strong Grip",
            "Adjustable Angle",
            "Dashboard Mount",
            "Universal Fit",
            "6 Months Warranty"
        ],
        stock: 25,
        image: "https://images.unsplash.com/photo-1533558701576-23c65e0272fb?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1533558701576-23c65e0272fb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1533558701576-23c65e0272fb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1624619463567-27b233a7e583?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1533558701576-23c65e0272fb?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 27,
        name: "Feature Phone Dual SIM",
        category: "Mobiles",
        subCategory: "Feature Phones",
        brand: "Lava",
        price: 1699,
        offerPrice: 1499,
        description: "Basic feature phone with long battery life.",
        specifications: [
            "Dual SIM",
            "Long Battery",
            "FM Radio",
            "Torch Light",
            "1 Year Warranty"
        ],
        stock: 32,
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523206485979-ba07c0a96f3c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1580910051074-3eb6948d3ad3?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 28,
        name: "USB Extension Board",
        category: "Home Needs",
        subCategory: "Daily Essentials",
        brand: "Anchor",
        price: 1299,
        offerPrice: 1099,
        description: "Extension board with USB ports.",
        specifications: [
            "Multiple Sockets",
            "USB Ports",
            "Surge Protection",
            "Durable Build",
            "1 Year Warranty"
        ],
        stock: 18,
        image: "https://images.unsplash.com/photo-1579705745811-a32bef7856a3?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1579705745811-a32bef7856a3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1564424224827-cd24b8915874?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1586208958839-06c171953322?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585834898144-87856c805eb5?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1579705745811-a32bef7856a3?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 29,
        name: "Wireless Mouse",
        category: "Gadgets",
        subCategory: "Smart Home",
        brand: "Logitech",
        price: 1199,
        offerPrice: 999,
        description: "Wireless mouse for office and home use.",
        specifications: [
            "Wireless Connectivity",
            "Ergonomic Design",
            "Long Battery Life",
            "Smooth Tracking",
            "1 Year Warranty"
        ],
        stock: 20,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1615663245857-acda5b248795?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1586041828039-b8d193d6d1dc?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1588669462314-23ea23a2346e?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
        status: "active"
    },
    {
        id: 30,
        name: "Toy Train Set",
        category: "Toys",
        subCategory: "Kids Toys",
        brand: "PlayGo",
        price: 1799,
        offerPrice: 1499,
        description: "Toy train set for kids entertainment.",
        specifications: [
            "Battery Operated",
            "Colorful Design",
            "Safe Material",
            "Easy Assembly",
            "No Warranty"
        ],
        stock: 14,
        image: "https://images.unsplash.com/photo-1532330384815-51331643126c?q=80&w=800&auto=format&fit=crop",
        images: [
             "https://images.unsplash.com/photo-1532330384815-51331643126c?q=80&w=800&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
        ],
        originalImage: "https://images.unsplash.com/photo-1532330384815-51331643126c?q=80&w=800&auto=format&fit=crop",
        status: "active"
    }
];
const categories=[
  { "_id": "C1", "name": "Gadgets" },
  { "_id": "C2", "name": "Mobiles" },
  { "_id": "C3", "name": "Computers" },
  { "_id": "C4", "name": "Accessories" },
  { "_id": "C5", "name": "Appliances" },
  { "_id": "C6", "name": "Wearables" },
  { "_id": "C7", "name": "Gaming" },
  { "_id": "C8", "name": "Audio" },
  { "_id": "C9", "name": "Office" },
  { "_id": "C10", "name": "Smart Home" }
]

const subCategories=[
  { "_id": "SC1", "name": "Smart Devices", "category": "C1" },
  { "_id": "SC2", "name": "Feature Phones", "category": "C2" },
  { "_id": "SC3", "name": "Smartphones", "category": "C2" },
  { "_id": "SC4", "name": "Laptops", "category": "C3" },
  { "_id": "SC5", "name": "Keyboards", "category": "C4" },
  { "_id": "SC6", "name": "Refrigerators", "category": "C5" },
  { "_id": "SC7", "name": "Smart Watches", "category": "C6" },
  { "_id": "SC8", "name": "Consoles", "category": "C7" },
  { "_id": "SC9", "name": "Headphones", "category": "C8" },
  { "_id": "SC10", "name": "Printers", "category": "C9" }
]

const brands=[
  { "_id": "B1", "name": "Logitech", "subCategory": "SC5" },
  { "_id": "B2", "name": "Samsung", "subCategory": "SC3" },
  { "_id": "B3", "name": "Nokia", "subCategory": "SC2" },
  { "_id": "B4", "name": "Apple", "subCategory": "SC3" },
  { "_id": "B5", "name": "HP", "subCategory": "SC4" },
  { "_id": "B6", "name": "Dell", "subCategory": "SC4" },
  { "_id": "B7", "name": "Sony", "subCategory": "SC9" },
  { "_id": "B8", "name": "Boat", "subCategory": "SC9" },
  { "_id": "B9", "name": "LG", "subCategory": "SC6" },
  { "_id": "B10", "name": "Canon", "subCategory": "SC10" }
]
export { categories, subCategories, brands };
export default Products;