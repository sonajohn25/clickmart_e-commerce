# Clickmart E-Commerce Full Stack Project

## Description

A full-stack E-Commerce web application built using React, TypeScript, Spring Boot, and MySQL.

The platform allows users to:

* Browse products
* Manage cart items
* Register/Login securely
* Place orders
* Search and filter products

The application follows a clean architecture with a responsive UI and RESTful backend APIs.

---

# Features

## Backend (Spring Boot)

* RESTful API architecture
* Spring Security with JWT Authentication
* Role-Based Access Control (RBAC)
* Product Management
* Category Management
* Order Management
* MySQL Database Integration
* Spring Data JPA
* Pagination, Sorting & Filtering
* Database seeding using DataInitializer

---

## Frontend (React + TypeScript)

* Responsive UI using React Bootstrap
* TypeScript support
* React Router DOM
* Context API State Management
* Product Search & Filtering
* Shopping Cart Management
* Secure Login & Registration
* Checkout Workflow
* Dynamic Product Pages

---

# Tech Stack

## Backend

* Java 17
* Spring Boot 3
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven
* MySQL

## Frontend

* React 19
* TypeScript
* React Router DOM
* React Bootstrap
* Axios
* Context API

---

# Project Structure

```txt
eCommerce-Springboot-React/
│
├── ecommerce-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── ecommerce-backend/
│   ├── src/
│   └── pom.xml
│
├── .gitignore
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

## Navigate to backend folder

```bash
cd ecommerce-backend
```

## Run Spring Boot Application

```bash
mvn spring-boot:run
```

Backend runs on:

```txt
http://localhost:12000
```

---

# Frontend Setup

## Navigate to frontend folder

```bash
cd ecommerce-frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm start
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# Database Configuration

Update database credentials inside:

```txt
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

# Future Improvements

* Online Payment Integration
* Order Tracking
* Admin Dashboard Analytics
* Product Reviews & Ratings
* Deployment using Render & Vercel

---

# Demo Video
🎥 Project Demo Video:

[Watch Demo Video](https://drive.google.com/file/d/1ziwFnb16qc9jJ6S9Y1-ipIZglMkBMXhA/view?usp=sharing)


# Author

Sona John
