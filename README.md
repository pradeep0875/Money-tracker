# Transaction Tracker

## Overview

Transaction Tracker is a web application designed to help users manage their financial transactions. This application allows users to add, view, and track expenses and income, providing a clear overview of their financial balance.

## Features

- **Add Transactions:** Users can easily input new transactions, specifying details such as name, date, time, description, and amount.
- **Real-time Balance Calculation:** The application automatically calculates the current balance based on the user's transactions.
- **Transaction History:** View a detailed list of all transactions with clear indicators for income and expenses.

## Technologies Used

- **Frontend:** The frontend is built using **React**. It leverages the use of hooks such as `useState` for managing state and `useEffect` for handling side effects like fetching data.
- **Backend:** The backend is powered by **Express.js**, providing RESTful API endpoints for managing transactions.
- **Database:** **MongoDB** is used to store transaction data, with **Mongoose** as an Object Data Modeling (ODM) library to interact with the database.
- **Environment Variables:** **dotenv** is utilized for managing environment-specific configurations.

## How It Works

1. **User Interface:** The user interacts with the app via a simple, intuitive interface to add transactions.
2. **Data Flow:** Upon submission, transaction data is sent to the backend server, which then stores it in the MongoDB database.
3. **Real-time Updates:** The frontend fetches the latest transactions from the backend and updates the balance accordingly.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: To run the server and frontend.
- **MongoDB**: To store your transaction data.

# Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

