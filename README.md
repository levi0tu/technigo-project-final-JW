# Växla Upp
Växla Upp is a full-stack web application that helps users get a clearer overview of their debts, payments, and everyday financial choices. The app combines practical debt tracking with educational content and a payment simulator to support smarter financial decisions.

---

## Features
- Register and log in with a personal account
- View a dashboard with a debt overview
- Add and manage debts
- Register payments for individual debts
- View payment history
- Compare direct purchase vs installment payments in the simulator
- Read financial lessons and tips

## Tech Stack
- React
- React Router
- JavaScript
- CSS
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure
- `frontend/` – React client
- `backend/` – Express API and MongoDB models

## API Endpoints
- `POST /register`
- `POST /login`
- `GET /me`
- `GET /dashboard`
- `GET /debts`
- `POST /debts`
- `GET /debts/:id`
- `PATCH /debts/:id`
- `DELETE /debts/:id`
- `GET /payments/:debtId`
- `POST /payments`
- `GET /lessons`

## Security
Passwords are hashed with bcryptjs
Protected routes use JWT authentication
Users can only access their own debts and payments
Frontend and backend validation are used for safer input handling

## Process and Challenges
I built the project step by step, starting with the main functionality for authentication, debts, and payments. After that, I focused on improving the user experience with a dashboard, simulator, and learning content.

The biggest challenge was making authentication and route protection work properly across the whole app. Another challenge was making the interface feel clear and consistent while also improving validation, error handling, and responsiveness.

### Dependency Installation & Startup Development Server
The project is split into a `frontend` and a `backend`.

Start the backend:
```bash
cd backend
npm install
npm run dev

Start the frontend in a separate terminal:
cd frontend
npm install
npm run dev

Create a .env file in the backend folder with:
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8080

## View it live


