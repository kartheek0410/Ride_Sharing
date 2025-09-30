# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## New Features and Updates

### Payment Integration
- Integrated Stripe payment gateway for secure ride payments
- Added payment flow in the Riding component
- New PaymentStatus component for handling payment outcomes
- Real-time payment status updates with socket events

Key Components:
1. **PaymentStatus.jsx**
   - Handles payment success/failure states
   - Shows transaction details and confirmation
   - Automatically redirects users after payment
   - Triggers ride completion through socket events
   - Styled payment status UI with success/failure indicators

2. **Payment Flow Updates**
   - Updated Riding.jsx to initiate Stripe payments
   - Added payment confirmation in the backend
   - Integrated socket events for ride completion
   - Added payment status route in App.jsx

### Environment Variables
Make sure to add these new variables to your frontend environment:
```plaintext
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
```

## Installation and Setup

Before running this project, follow these steps:

1. **Clone the repository**
```bash
git clone <repository-url>
cd Uber
```

2. **Set up environment variables**

Backend Environment Setup (`Backend/.env`):
```plaintext
PORT=3000
HOST=your_host
PASSWORD=your_db_password
DATABASE=your_database_name
DB_PORT=5432
USER=your_db_user
SECRET=your_jwt_secret_here
OLA_API_KEY=your_ola_api_key_here
```

Frontend Environment Setup (`frontend/.env`):
```plaintext
VITE_BASE_URL=http://localhost:3000
VITE_OLAMAPS_API_KEY=your_olamaps_api_key_here
```

3. **Install Dependencies**

For Backend:
```bash
cd Backend
npm install
```

For Frontend:
```bash
cd frontend
npm install
```

4. **Start the Applications**

Start Backend:
```bash
cd Backend
nodemon index.js
```

Start Frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

## Important Notes

- Ensure all environment variables are properly set before running the application
- Never commit `.env` files to version control
- Make sure your database is running before starting the backend
- The backend should be running before starting the frontend
- Default ports: Backend (3000), Frontend (5173)
- Stripe payment integration requires valid API keys
- Socket connection is required for real-time payment status updates

## Payment Flow

1. **Initiating Payment**
   - User completes ride
   - Clicks "Make a Payment" in the Riding component
   - Redirected to Stripe checkout

2. **Payment Processing**
   - Stripe handles payment securely
   - Success/failure redirect to PaymentStatus component
   - Transaction ID captured for verification

3. **Payment Confirmation**
   - Backend verifies payment with Stripe
   - Updates ride status to 'completed'
   - Notifies both user and captain through sockets
   - Auto-redirects to appropriate page

4. **Component Structure**
   ```
   Riding
   └── Payment Initiation
       └── Stripe Checkout
           └── PaymentStatus
               ├── Success State
               │   └── Redirect to Home
               └── Failure State
                   └── Return to Riding
   ```

## Available Plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
