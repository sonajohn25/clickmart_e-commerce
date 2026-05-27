package com.ecommerce.backend.config;

import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Create Categories
        Category electronics = new Category("Electronics", "Electronic devices and gadgets");
        Category clothing = new Category("Clothing", "Fashion and apparel");
        Category books = new Category("Books", "Books and literature");
        Category home = new Category("Home & Garden", "Home improvement and garden supplies");
        Category sports = new Category("Sports", "Sports and outdoor equipment");

        categoryRepository.save(electronics);
        categoryRepository.save(clothing);
        categoryRepository.save(books);
        categoryRepository.save(home);
        categoryRepository.save(sports);

        // Create Products
        // Electronics
        productRepository.save(new Product("iPhone 15", "Powerful performance, advanced cameras, and a sleek premium design packed into one smart device.", 
            new BigDecimal("60000.00"), 13, "https://i.pinimg.com/1200x/f2/42/a0/f242a096f258332ba96fa51f61360d39.jpg", electronics));
        
        productRepository.save(new Product("Philips Hair Straightener", "Smooth styling with fast heating and easy temperature control for everyday use.", 
            new BigDecimal("2450.00"), 45, "https://cdn.shopify.com/s/files/1/0576/5470/6314/files/a4add799-ae66-4c1c-8762-9b316fe463b0_1_480x480.jpg?v=1692133869", electronics));
        
        productRepository.save(new Product("Blender Mixer Grinder", "Powerful blending and grinding performance for quick and effortless kitchen preparation.", 
            new BigDecimal("5999.00"), 30, "https://glenindia.com/cdn/shop/files/1_46e7b309-ea01-4bdd-96e4-8949de2be531.jpg?v=1776920495&width=800", electronics));
        
        productRepository.save(new Product("Sony Headphones", "Premium noise-canceling headphones", 
            new BigDecimal("3999.00"), 75, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", electronics));

        // Clothing
        productRepository.save(new Product("Women's Activewear T-Shirt", "Comfortable and breathable activewear designed for everyday workouts and casual wear.", 
            new BigDecimal("499.00"), 100, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQgaq_bxegNDGHcYkA95CaSCt2r6HgJk6HbhMhX7bJpdKgPO2B3iPuvnPT9gLLbTIIaIGGjW6-FrU8iAXGDR-5Fbw5BYdl4efUCLtNL-7dKK6HedsoR1IiY8Q", clothing));
        
        productRepository.save(new Product("Denim Jeans", "Classic blue denim jeans", 
            new BigDecimal("1999.00"), 80, "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", clothing));
        
        productRepository.save(new Product("Leather Jacket", "Genuine leather jacket for style", 
            new BigDecimal("4999.00"), 25, "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", clothing));
        
        productRepository.save(new Product("Puma Running Shoes", "Comfortable athletic shoes for running", 
            new BigDecimal("1999.00"), 60, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRepAtmUZ6kyL_L9JJ2-TBmQmnZsIQ2ebFhZSMvMMh6sKSTPV1-zKOYZR9zdqlkUrhV05cce8-l2HGIqkORSRGlMUtfS9DiC3nb4MxtbbPQyswPaYalQqoK0w", clothing));

        // Books
        productRepository.save(new Product("The Great Gatsby", "Classic American novel by F. Scott Fitzgerald", 
            new BigDecimal("1499.00"), 200, "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", books));
        
        productRepository.save(new Product("To Kill a Mockingbird", "Timeless novel by Harper Lee", 
            new BigDecimal("1250.00"), 150, "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400", books));

        // Home & Garden
        productRepository.save(new Product("Coffee Maker", "Programmable drip coffee maker", 
            new BigDecimal("4999.00"), 40, "https://m.media-amazon.com/images/I/61A7XEiuKdL._SX679_.jpg", home));
        
        productRepository.save(new Product("Indoor Plant Set", "Set of 3 low-maintenance indoor plants", 
            new BigDecimal("499.00"), 35, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400", home));
        
        productRepository.save(new Product("Kitchen Knife Set", "Professional chef knife set", 
            new BigDecimal("3999.00"), 20, "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400", home));

        // Sports
        productRepository.save(new Product("Yoga Mat", "Non-slip exercise yoga mat", 
            new BigDecimal("1499.00"), 90, "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400", sports));
        
        productRepository.save(new Product("Cricket Bat", "Durable and well-balanced cricket bat designed for powerful shots and better control.", 
            new BigDecimal("2999.00"), 70, "https://www.sportskhel.com/media/catalog/product/cache/043ede78ff4c5057eb195e2154bf4b0a/p/o/power_vk_400_mrf_ew_pc_1_e.webp", sports));
        
        productRepository.save(new Product("Tennis Racket", "Professional badminton racket", 
            new BigDecimal("2449.00"), 15, "https://store.cosco.in/cdn/shop/files/Cosco_CBX_400_03.png?v=1762586378&width=3840", sports));

        // Create default admin user
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User("admin", "admin@ecommerce.com", 
                passwordEncoder.encode("admin123"), "Admin", "User");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
        }

        // Create default regular user
        if (!userRepository.existsByUsername("user")) {
            User user = new User("user", "user@ecommerce.com", 
                passwordEncoder.encode("user123"), "Sam", "Son");
            user.setAddress("123 Main St, TVM, Kerala 12345");
            user.setPhone("555-0123");
            userRepository.save(user);
        }
    }
}