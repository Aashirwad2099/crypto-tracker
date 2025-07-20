# 📊 Full-Stack Crypto Tracker

A full-stack web application that tracks live cryptocurrency prices using data from the CoinGecko API. The app displays current prices, market caps, and 24-hour price changes, and stores historical data in a database using a background cron job.

---

## 🔧 Tech Stack

### 🖥️ Frontend
- React.js
- Tailwind CSS
- Axios

### 🌐 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- node-cron
- CoinGecko API

---

## 🚀 Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker
2. Set Up the Backend
cd backend
npm install
Create a .env file in the backend folder and add:
MONGO_URI=<your-mongodb-atlas-uri>
PORT=5000
3. Set Up the Frontend
cd ../frontend
npm install
npm start
