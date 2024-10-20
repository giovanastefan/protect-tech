# E-commerce Security Learning Application

## Description

This is an educational e-commerce application developed to demonstrate the top ten vulnerabilities outlined by OWASP 2021. Built with **Node.js** for the backend and **React** for the frontend, this application allows users to register, log in, manage products, and use an interactive shopping cart. Each vulnerability is intentionally implemented to help developers learn about security flaws and improve their skills in secure web development.

## Features

- **User Registration & Login**: Users can create accounts and log in to the application.
- **Product Management**: Admins can add, update, and delete products.
- **Shopping Cart**: Users can add products to their cart and proceed to checkout.
- **Vulnerability Demonstrations**: Intentionally implemented vulnerabilities include:
  - Security Misconfiguration
  - SQL Injection
  - Authentication Issues
  - Cross-Site Scripting (XSS)
  - Insecure Direct Object References (IDOR)
  - Server-Side Request Forgery (SSRF)
  - And more...

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React
- **Database**: PostgreSQL
- **Authentication**: Custom authentication methods without tokens for educational purposes

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- PostgreSQL (version X.X.X)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-security-learning-app.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd ecommerce-security-learning-app/backend
   ```

3. Install the backend dependencies:
   ```bash
   npm install
   ```

4. Set up the PostgreSQL database and update the configuration in the `.env` file.

5. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

6. Install the frontend dependencies:
   ```bash
   npm install
   ```

7. Start the application:
   - Backend:
     ```bash
     npm start
     ```
   - Frontend:
     ```bash
     npm start
     ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.
