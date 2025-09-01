# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

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

## Available Plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
