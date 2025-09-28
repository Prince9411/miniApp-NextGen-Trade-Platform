# Global Market Tracker

A full-stack web application for tracking, analyzing, and visualizing stock market data. Built with **React**, **Node.js**, **Express**, and **MongoDB**, this platform provides real-time insights for investors and traders.



## Features

- **Track Stocks:** View live stock prices and historical trends.
- **Analytics Dashboard:** Interactive charts and visualizations.
- **Portfolio Management:** Add and monitor your stock investments.
- **Categorization:** Group stocks by sector, market cap, or performance.
- **Budgeting & Insights:** Track investments and analyze financial trends.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Recharts  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Deployment:** Optional (Heroku, Vercel, or MongoDB Atlas for DB)  

---

## Getting Started

Follow these instructions to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/global-market-tracker.git
cd global-market-tracker
2. Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file in the backend folder with the following:

ini
Copy code
MONGO_URI=your_mongo_connection_string
PORT=5000
Seed initial data (optional):

bash
Copy code
node seedProducts.js
Start the backend server:

bash
Copy code
npm start
Server will run on http://localhost:5000

3. Frontend Setup
bash
Copy code
cd ../frontend
npm install
npm start
Frontend will run on http://localhost:3000
