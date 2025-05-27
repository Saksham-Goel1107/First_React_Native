# Dine Out Finance Tracker

[![React Native](https://img.shields.io/badge/React_Native-0.79.2-blue.svg?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.9-black.svg?style=flat-square&logo=expo)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-lightgrey.svg?style=flat-square&logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-ISC-yellow.svg?style=flat-square)](LICENSE)
[![Neon DB](https://img.shields.io/badge/Neon_DB-PostgreSQL-blue.svg?style=flat-square&logo=postgresql)](https://neon.tech/)
[![Upstash Redis](https://img.shields.io/badge/Upstash-Redis-red.svg?style=flat-square&logo=redis)](https://upstash.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-purple.svg?style=flat-square)](https://clerk.com/)
[![Author](https://img.shields.io/badge/Author-Saksham_Goel-orange.svg?style=flat-square)](https://github.com/Saksham-Goel1107)

A comprehensive financial tracking application built with React Native and Expo. This mobile app helps users track their expenses and income, featuring secure authentication, transaction management, and real-time balance updates.

![App Screenshot](./mobile/assets/images/splash-icon.png)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
  - [Prerequisites](#prerequisites)
  - [Mobile App](#mobile-app)
  - [Backend Server](#backend-server)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Authentication Flow](#-authentication-flow)
- [Rate Limiting](#-rate-limiting)
- [Scheduled Tasks](#-scheduled-tasks)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🚀 Features

- **Secure User Authentication** - Implemented with Clerk for secure sign-up/sign-in
- **Transaction Management** - Add, view, and delete income and expense transactions
- **Financial Dashboard** - Real-time balance, income, and expense tracking
- **Category-based Tracking** - Organize transactions by category
- **Real-time Updates** - Instant reflection of transaction changes
- **Responsive UI** - Smooth and intuitive user experience
- **Data Persistence** - Backend storage with Neon PostgreSQL database
- **Rate Limiting** - Protection against API abuse using Upstash Redis
- **Scheduled Tasks** - Automated database maintenance with cron jobs

## 💻 Tech Stack

### Frontend (Mobile)
- **React Native** - Mobile application framework
- **Expo** - Development platform for React Native
- **Clerk** - Authentication and user management
- **React Navigation** - Navigation library for React Native
- **Expo Router** - File-based routing for Expo apps
- **TypeScript** - Static type checking

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Neon Database** - Serverless PostgreSQL database
- **Upstash Redis** - Rate limiting implementation
- **Cron** - Scheduled task management
- **dotenv** - Environment variable management

## 📁 Project Structure

```
First_React_Native/
├── backend/
│   ├── src/
│   │   ├── server.js               # Express server setup
│   │   ├── config/                 # Configuration files
│   │   ├── controllers/            # Request handlers
│   │   ├── middleware/             # Custom middleware
│   │   └── routes/                 # API route definitions
│   └── package.json
└── mobile/
    ├── app/                        # Expo Router application
    │   ├── (auth)/                 # Authentication routes
    │   └── (root)/                 # Main application routes
    ├── assets/                     # Images, fonts, and styles
    ├── components/                 # Reusable React components
    ├── constants/                  # App constants and themes
    ├── hooks/                      # Custom React hooks
    ├── lib/                        # Utility functions
    └── package.json
```

## 🔧 Installation

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Neon PostgreSQL database account
- Upstash Redis account
- Clerk account for authentication

### Mobile App

1. Clone the repository:
   ```bash
   git clone https://github.com/Saksham-Goel1107/First_React_Native.git
   cd First_React_Native/mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Backend Server

1. Navigate to the backend directory:
   ```bash
   cd First_React_Native/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on the provided example.

4. Start the server:
   ```bash
   node src/server.js
   ```

## 🔐 Environment Variables

### Backend (.env)

```
PORT=3000
DATABASE_URL=your_neon_database_url
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NODE_ENV=development
```

### Mobile (.env)

```
clerkPublishableKey: "your_clerk_publishable_key",
apiUrl: "http://your-backend-url:3000"
```

## 📱 Usage

1. **Authentication**:
   - Create an account or sign in using the authentication flow
   - Accept the terms of service and privacy policy

2. **Dashboard**:
   - View your current balance, income, and expenses
   - See a list of recent transactions

3. **Add Transaction**:
   - Tap the "+" button to create a new transaction
   - Enter transaction details including amount, title, and category
   - Select whether it's income (positive) or expense (negative)

4. **Delete Transaction**:
   - Swipe left on a transaction to delete it
   - Confirm deletion when prompted

## 📝 API Endpoints

| Endpoint                              | Method | Description                       |
|---------------------------------------|--------|-----------------------------------|
| `/api/transactions/:userid`           | GET    | Get all user transactions         |
| `/api/transactions/summary/:userid`   | GET    | Get financial summary for a user  |
| `/api/transactions`                   | POST   | Create a new transaction          |
| `/api/transactions/:id`               | DELETE | Delete a specific transaction     |

## 📊 Database Schema

### Transactions Table

```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);
```

## 🔒 Authentication Flow

This application uses Clerk for authentication, which provides:

1. User registration and login
2. Social authentication options
3. Secure session management
4. Protected routes in the application
5. User profile management

## 🛡️ Rate Limiting

API rate limiting is implemented using Upstash Redis to prevent abuse:

- Limited to 10 requests per 10 seconds per IP address
- Configurable in the rateLimiter middleware

## ⏰ Scheduled Tasks

The application uses cron jobs for scheduled maintenance tasks:

- Database cleanup operations
- These jobs run automatically in production environment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Saksham Goel - [GitHub](https://github.com/Saksham-Goel1107)

Project Link: [https://github.com/Saksham-Goel1107/First_React_Native](https://github.com/Saksham-Goel1107/First_React_Native)