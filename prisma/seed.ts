import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database... 🌱🔥');

  // Seed Categories
  await prisma.category.createMany({
    data: [
      { categoryId: 1, name: 'Electronics', slug: 'electronics' },
      { categoryId: 2, name: 'Men', slug: 'men' },
      { categoryId: 3, name: 'Women', slug: 'women' },
      { categoryId: 4, name: 'Kids', slug: 'kids' },
      { categoryId: 5, name: 'Furniture', slug: 'furniture' },
      { categoryId: 6, name: 'Sports', slug: 'sports' },
      { categoryId: 7, name: 'Stationary', slug: 'stationary' },
    ],
    skipDuplicates: true,
  });

  // Seed Products (All types in one table)
  await prisma.product.createMany({
    data: [
      // New Arrivals
      {
        productId: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 90.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759068889/group_files/WH-CH520-Blue-1-485x485-optimized.webp',
        description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
        categoryId: 1,
        weight: 0.25,
        onSale: true,
        inStock: true,
        rating_count: 4.5,
        productType: 'NEW_ARRIVAL'
      },
      {
        productId: 2,
        name: 'Casual Cotton T-Shirt',
        price: 24.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759068678/group_files/513JYGCLYpL.jpg',
        description: 'Comfortable cotton t-shirt available in multiple colors and sizes.',
        categoryId: 2,
        weight: 0.2,
        onSale: false,
        inStock: true,
        rating_count: 4.2,
        productType: 'NEW_ARRIVAL'
      },
      {
        productId: 3,
        name: 'Summer Floral Dress',
        price: 45.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759068666/group_files/71JW_-QkjZL__AC_SY550_.jpg', 
        description: 'Elegant floral dress perfect for summer occasions and casual outings.',
        categoryId: 3,
        weight: 0.3,
        onSale: true,
        inStock: true,
        rating_count: 4.7,
        productType: 'NEW_ARRIVAL'
      },
      {
        productId: 4,
        name: 'Kids Cartoon Backpack',
        price: 29.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759068550/group_files/61tlq95ApEL__SY879_.jpg',
        description: 'Colorful cartoon-themed backpack perfect for school and adventures.',
        categoryId: 4,
        weight: 0.5,
        onSale: false,
        inStock: true,
        rating_count: 4.3,
        productType: 'NEW_ARRIVAL'
      },
      {
        productId: 5,
        name: 'Ergonomic Office Chair',
        price: 299.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759068538/group_files/SE2_BLACK_BLACK_LICORICE_2_2000x.webp',
        description: 'Premium ergonomic office chair with lumbar support and adjustable height.',
        categoryId: 5,
        weight: 15.5,
        onSale: true,
        inStock: true,
        rating_count: 4.6,
        productType: 'NEW_ARRIVAL'
      },
      {
        productId: 6,
        name: 'Yoga Mat Premium',
        price: 39.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759068493/group_files/purple6mm-1-01_5f370d94-a81b-45d6-b3a3-2fdcfd2c6c61_720x.webp',
        description: 'Non-slip premium yoga mat with extra cushioning and carrying strap.',
        categoryId: 6,
        weight: 1.2,
        onSale: false,
        inStock: true,
        rating_count: 4.4,
        productType: 'NEW_ARRIVAL'
      },
      {
        productId: 7,
        name: 'Leather Bound Journal',
        price: 19.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759068451/group_files/71FEpLXGo5L__SL1400_.jpg',
        description: 'Premium leather-bound journal with lined pages perfect for writing.',
        categoryId: 7,
        weight: 0.4,
        onSale: true,
        inStock: true,
        rating_count: 4.1,
        productType: 'NEW_ARRIVAL'
      },
      {
        productId: 8,
        name: 'Smart Fitness Watch',
        price: 199.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759068404/group_files/m4-fitness-band-1000x1000.png', 
        description: 'Advanced fitness watch with heart rate monitoring and GPS tracking.',
        categoryId: 1,
        weight: 0.08,
        onSale: false,
        inStock: true,
        rating_count: 4.8,
        productType: 'NEW_ARRIVAL'
      },
      {
        productId: 9,
        name: 'Denim Slim Fit Jeans',
        price: 59.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759068357/group_files/20050852a.webp',
        description: 'Classic slim fit denim jeans in premium quality fabric.',
        categoryId: 2,
        weight: 0.6,
        onSale: true,
        inStock: true,
        rating_count: 4.0,
        productType: 'NEW_ARRIVAL'
      },
      {
        productId: 10,
        name: 'Designer Handbag',
        price: 89.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759056418/group_files/41-QJ7HaOXL.jpg', 
        description: 'Stylish designer handbag with multiple compartments and premium finish.',
        categoryId: 3,
        weight: 0.8,
        onSale: false,
        inStock: true,
        rating_count: 4.5,
        productType: 'NEW_ARRIVAL'
      },      
      {
        productId: 11,
        name: 'Women Latin Shoes',
        price: 100.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759071829/group_files/61Ok0qtcOkL__SY625_.jpg', 
        description: 'Elegant Latin dance shoes with comfortable fit and stylish design.',
        categoryId: 3,
        weight: 0.4,
        onSale: false,
        inStock: true,
        rating_count: 4.5,
        productType: 'NEW_ARRIVAL'
      },
      // Best Sellers
      {
        productId: 12,
        name: 'Gaming Mechanical Keyboard',
        price: 129.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759056393/group_files/DSM6FCV0aGJxbfED29cW0IpqcZ6sInlkFVjhBUgG.jpg',
        description: 'RGB mechanical gaming keyboard with tactile switches and programmable keys.',
        categoryId: 1,
        weight: 1.2,
        onSale: false,
        inStock: true,
        rating_count: 4.8,
        productType: 'BEST_SELLER'
      },
      {
        productId: 13,
        name: 'Premium Polo Shirt',
        price: 49.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759056366/group_files/4061938851979_fc0.jpg',
        description: 'Classic polo shirt made from premium cotton blend fabric.',
        categoryId: 2,
        weight: 0.25,
        onSale: true,
        inStock: true,
        rating_count: 4.4,
        productType: 'BEST_SELLER'
      },
      {
        productId: 14,
        name: 'Winter Wool Coat',
        price: 179.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759056178/group_files/3CcOB3xD_ee9d87b338a34be4b33b58fe91baca30.jpg',
        description: 'Elegant wool coat perfect for winter weather and formal occasions.',
        categoryId: 3,
        weight: 1.5,
        onSale: false,
        inStock: true,
        rating_count: 4.7,
        productType: 'BEST_SELLER'
      },
      {
        productId: 15,
        name: 'Educational Building Blocks',
        price: 34.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759056105/group_files/81e2x5ReV3L__AC_SL1500_.jpg',
        description: 'Colorful building blocks set that enhances creativity and motor skills.',
        categoryId: 4,
        weight: 2.0,
        onSale: true,
        inStock: true,
        rating_count: 4.6,
        productType: 'BEST_SELLER'
      },
      {
        productId: 16,
        name: 'Modern Coffee Table',
        price: 199.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759056036/group_files/52b72f438088489db6d90a66a3465064.jpg',
        description: 'Sleek modern coffee table with glass top and wooden legs.',
        categoryId: 5,
        weight: 25.0,
        onSale: false,
        inStock: true,
        rating_count: 4.3,
        productType: 'BEST_SELLER'
      },
      {
        productId: 17,
        name: 'Professional Tennis Racket',
        price: 89.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759056009/group_files/wilson_shift_99_pro_v1_tennis_racquet_315_g-1.jpg', 
        description: 'Professional-grade tennis racket with carbon fiber frame.',
        categoryId: 6,
        weight: 0.3,
        onSale: true,
        inStock: true,
        rating_count: 4.5,
        productType: 'BEST_SELLER'
      },
      {
        productId: 18,
        name: 'Fountain Pen Set',
        price: 79.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055974/group_files/60877d3wp08121_rev_1.webp', 
        description: 'Elegant fountain pen set with premium ink cartridges.',
        categoryId: 7,
        weight: 0.2,
        onSale: false,
        inStock: true,
        rating_count: 4.2,
        productType: 'BEST_SELLER'
      },
      {
        productId: 19,
        name: 'Wireless Mouse Gaming',
        price: 69.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055947/group_files/DARK-CORE.jpg',
        description: 'High-precision wireless gaming mouse with customizable RGB lighting.',
        categoryId: 1,
        weight: 0.12,
        onSale: true,
        inStock: true,
        rating_count: 4.7,
        productType: 'BEST_SELLER'
      },
      {
        productId: 20,
        name: 'Formal Business Suit',
        price: 299.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055716/group_files/formal-business-suits-1000x1000.jpg',
        description: 'Premium business suit tailored for professional occasions.',
        categoryId: 2,
        weight: 1.8,
        onSale: false,
        inStock: true,
        rating_count: 4.6,
        productType: 'BEST_SELLER'
      },
      {
        productId: 21,
        name: 'Silk Evening Gown',
        price: 249.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055670/group_files/beautiful-and-elegant-evening-women-s-dress-on-a-white-background-free-photo.jpg',
        description: 'Luxurious silk evening gown perfect for formal events and parties.',
        categoryId: 3,
        weight: 0.4,
        onSale: true,
        inStock: true,
        rating_count: 4.9,
        productType: 'BEST_SELLER'
      },      
      {
        productId: 22,
        name: 'Nike Red Shoes',
        price: 4267.00,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759071756/group_files/51wyhWcsr7L__SY695_.jpg',
        description: 'Iconic Nike red shoes featuring a bold design, comfortable fit, and durable sole. Perfect for sports, casual wear, and making a statement.',
        categoryId: 2,
        weight: 0.4,
        onSale: true,
        inStock: true,
        rating_count: 4.9,
        productType: 'BEST_SELLER'
      },
      // Trending Products
      {
        productId: 23,
        name: '4K Webcam Ultra HD',
        price: 149.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055637/group_files/1-______-14-1.png',
        description: '4K Ultra HD webcam with auto-focus and noise-canceling microphone.',
        categoryId: 1,
        weight: 0.15,
        onSale: true,
        inStock: true,
        rating_count: 4.6,
        productType: 'TRENDING'
      },
      {
        productId: 24,
        name: 'Leather Bomber Jacket',
        price: 189.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055500/group_files/stylish-brown-leather-bomber-jacket-with-shearling-collar-zippered-front-isolated-white_868783-68838.jpg',
        description: 'Classic leather bomber jacket with vintage styling and premium finish.',
        categoryId: 2,
        weight: 1.2,
        onSale: false,
        inStock: true,
        rating_count: 4.4,
        productType: 'TRENDING'
      },
      {
        productId: 25,
        name: 'Bohemian Maxi Dress',
        price: 79.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055375/group_files/71JW_-QkjZL__AC_SY741_.jpg',
        description: 'Flowing bohemian maxi dress with intricate patterns and comfortable fit.',
        categoryId: 3,
        weight: 0.35,
        onSale: true,
        inStock: true,
        rating_count: 4.3,
        productType: 'TRENDING'
      },
      {
        productId: 26,
        name: 'Remote Control Drone',
        price: 129.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055222/group_files/WhatsApp-Image-2025-01-07-at-6_52_31-PM-scaled.webp',
        description: 'Fun remote control drone with HD camera and stable flight controls.',
        categoryId: 1,
        weight: 0.8,
        onSale: false,
        inStock: true,
        rating_count: 4.5,
        productType: 'TRENDING'
      },
      {
        productId: 27,
        name: 'Scandinavian Bookshelf',
        price: 179.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055153/group_files/71wG4xHZCUL__SX679_.jpg',
        description: 'Minimalist Scandinavian-style bookshelf with clean lines and natural wood.',
        categoryId: 5,
        weight: 18.5,
        onSale: true,
        inStock: true,
        rating_count: 4.7,
        productType: 'TRENDING'
      },
      {
        productId: 28,
        name: 'Resistance Bands Set',
        price: 29.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055125/group_files/resistance_band_set.webp',
        description: 'Complete resistance bands set with multiple resistance levels and accessories.',
        categoryId: 6,
        weight: 1.5,
        onSale: false,
        inStock: true,
        rating_count: 4.2,
        productType: 'TRENDING'
      },
      {
        productId: 29,
        name: 'Calligraphy Pen Set',
        price: 45.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055086/group_files/artline-ergoline-calligraphy-pen-set-with-3-nib-sizes-pack-of-3-946194.webp',
        description: 'Professional calligraphy pen set with various nib sizes and ink colors.',
        categoryId: 7,
        weight: 0.3,
        onSale: true,
        inStock: true,
        rating_count: 4.4,
        productType: 'TRENDING'
      },
      {
        productId: 30,
        name: 'Portable Bluetooth Speaker',
        price: 79.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055065/group_files/81MjIZM2H9L__SX522_.jpg',
        description: 'Waterproof portable Bluetooth speaker with 360-degree sound.',
        categoryId: 1,
        weight: 0.6,
        onSale: false,
        inStock: true,
        rating_count: 4.6,
        productType: 'TRENDING'
      },
      {
        productId: 31,
        name: 'Athletic Running Shorts',
        price: 34.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759055028/group_files/f8b11fd8-f5a8-43a5-bd3c-a16d34490869_fd8e63137ea527fbb39ba2e48628b43a.webp', 
        description: 'Moisture-wicking athletic shorts perfect for running and workouts.',
        categoryId: 2,
        weight: 0.15,
        onSale: true,
        inStock: true,
        rating_count: 4.1,
        productType: 'TRENDING'
      },
      {
        productId: 32,
        name: 'Vintage Crossbody Bag',
        price: 65.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759054793/group_files/81RVaZ79_yL__SY695_.jpg',
        description: 'Vintage-style crossbody bag with adjustable strap and multiple pockets.',
        categoryId: 3,
        weight: 0.7,
        onSale: false,
        inStock: true,
        rating_count: 4.5,
        productType: 'TRENDING'
      },
      {
        productId: 33,
        name: 'PC Gaming Controller',
        price: 65.99,
        image: 'https://res.cloudinary.com/dzbfs1cx6/image/upload/v1759072000/group_files/s-l1200.jpg',
        description: 'Ergonomic PC gaming controller with customizable buttons and RGB lighting.',
        categoryId: 1,
        weight: 0.7,
        onSale: false,
        inStock: true,
        rating_count: 4.5,
        productType: 'TRENDING'
      }
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded! 🎉🔥🔥🔥');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });