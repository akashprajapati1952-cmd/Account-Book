# Account Book

A full-stack personal account management application for managing
customers, money transactions, balances, and dashboard reports.

## Features

-   User authentication with JWT
-   Customer add, delete and search
-   Money to take and money to give management
-   Transaction edit and delete
-   Settlement tracking
-   Dashboard summary
-   Recent transactions
-   Redux Toolkit state management
-   Protected backend APIs

## Tech Stack

### Frontend

-   React + TypeScript
-   Vite
-   Redux Toolkit
-   React Redux connect()
-   React Router
-   Tailwind CSS
-   Formik + Yup
-   Axios

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT

## Frontend Structure

    src/
     ├── components
     ├── pages
     ├── reducers
     ├── selectors
     ├── store
     ├── models
     └── utils

## Backend Structure

    backend/
     ├── controllers
     ├── routes
     ├── middleware
     ├── models
     └── utils

## API Base URL

    https://account-book-backend-rma8.onrender.com/api

## Main APIs

### User APIs

    POST /user/register
    POST /user/login
    POST /user/forgot-password
    PUT /user/change-email

### Customer APIs

    GET /customer/all
    POST /customer/save
    GET /customer/:customerId
    DELETE /customer/:customerId

    POST /customer/:customerId/add-take
    POST /customer/:customerId/add-give

    PUT /customer/:customerId/transaction/:txId
    DELETE /customer/:customerId/transaction/:txId

    POST /customer/:customerId/settle

### Dashboard APIs

    GET /dashboard/summary
    GET /dashboard/recent-transactions

## Redux Flow

-   Redux Toolkit is used for global state.
-   Async API calls are handled using createAsyncThunk.
-   Components use React Redux connect().

Flow:

User Action → Dispatch → Async Thunk → API → Reducer Update → Component
Render

## Performance

-   Data is reused from Redux store.
-   API calls are avoided when required data already exists.
-   Search is handled separately using search results state.

## Transaction System

Each customer maintains:

-   moneyToTake
-   moneyToGive
-   settlements

Dashboard collects transactions from all customers and sorts recent
transactions by date/timestamp.

## Installation

Frontend:

    npm install
    npm run dev

Backend:

    npm install
    npm start

## Environment Variables

Backend:

    MONGO_URI=
    JWT_SECRET=
    PORT=

## Future Improvements

-   Pagination
-   Reports export
-   PDF generation
-   Charts and analytics
-   Voice assistant integration

## Author

Account Book Project
