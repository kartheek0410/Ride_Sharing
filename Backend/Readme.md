// ...existing code...
# Uber Backend API

Common
- Base URL (development): http://localhost:<PORT>
- Auth: JWT is set in an HttpOnly cookie named `jwt` on successful signup/login.
- All request/response bodies are JSON unless otherwise noted.
- CORS configured for http://localhost:5173 and cookies (credentials) are enabled.

## User Routes

### POST /users/signup
Registers a new user.

Request body:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "user@example.com",
  "password": "string (>= 6 chars)"
}
```

Success (200):
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com"
}
```
- A `jwt` cookie is set.

Errors:
- 400 — password too short
```json
{ "message": "password must be atleast 6 characters" }
```
- 400 — email exists
```json
{ "message": "Email already exists" }
```
- 500 — server/db/hash error
```json
{ "message": "internal server Error" }
```

---

### POST /users/login
Authenticate an existing user.

Request body:
```json
{
  "email": "user@example.com",
  "password": "string"
}
```

Success (200):
```json
{
  "user": {
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "user@example.com"
  }
}
```
- A `jwt` cookie is set.

Errors:
- 400 — user not found / invalid credentials
```json
{ "message": "User not exits signup or invalid credentials" }
```
or
```json
{ "message": "Invalid credentials" }
```
- 500 — server/db error
```json
{ "message": "internal server error in login controller" }
```

---

### POST /users/logout
Clears the auth cookie.

No body required.

Success (200):
```json
{ "message": "Logged out Succesfully" }
```

Error (500):
```json
{ "message": "Internal server error" }
```

---

### GET /users/check
Protected route — verifies JWT cookie and returns user.

Requires: valid `jwt` cookie.

Success (200):
```json
{
  "id": 1,
  "firstname": "John",
  "lastname": "Doe",
  "email": "user@example.com"
}
```

Errors:
- 401 — no token
```json
{ "message": "Unauthorized - No Token Provided" }
```
- 401 — invalid token
```json
{ "message": "Unauthorized- Invalid Token" }
```
- 404 — user not found
```json
{ "message": "User not found" }
```
- 500 — server error

---

## Captains Routes

### POST /captains/signup
Register a new captain.

Request body:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "captain@example.com",
  "password": "string (>= 6 chars)",
  "status": "string",
  "vehiclecolor": "string",
  "vehicleplate": "string",
  "vehiclecapacity": number,
  "vehicletype": "string",
  "lattitude": number,
  "longitude": number
}
```

Success (201):
```json
{
  "id": 10,
  "firstname": "Alice",
  "lastname": "Rider",
  "email": "captain@example.com",
  "status": "active",
  "vehiclecolor": "red",
  "vehicleplate": "ABC-123",
  "vehiclecapacity": 4,
  "vehicletype": "sedan",
  "latitude": 12.34567,
  "longitude": 76.54321,
  "password": "$2b$10$..." // stored hash present in DB row
}
```
- A `jwt` cookie is set.

Errors:
- 400 — missing fields
```json
{ "message": "All fields are required" }
```
- 400 — password short
```json
{ "message": "Password must be at least 6 characters long" }
```
- 400 — email exists
```json
{ "message": "Captain with this email already exists" }
```
- 500 — server error

---

### POST /captains/login
Authenticate a captain.

Request body:
```json
{
  "email": "captain@example.com",
  "password": "string"
}
```

Success (200):
```json
{
  "id": 10,
  "firstname": "Alice",
  "lastname": "Rider",
  "email": "captain@example.com",
  "status": "active",
  "vehiclecolor": "red",
  "vehicleplate": "ABC-123",
  "vehiclecapacity": 4,
  "vehicletype": "sedan",
  "latitude": 12.34567,
  "longitude": 76.54321
}
```
- A `jwt` cookie is set.

Errors:
- 400 — not found
```json
{ "message": "Captain not found" }
```
- 400 — invalid credentials
```json
{ "message": "Invalid credentials" }
```
- 500 — server error

---

### POST /captains/logout
Clears the captain auth cookie.

Success (200):
```json
{ "message": "Logged out successfully" }
```

Error (500):
```json
{ "message": "Internal Server Error" }
```

---

### GET /captains/check
Protected route — verifies captain JWT cookie (captainProtectRoute) and returns captain.

Requires: valid `jwt` cookie.

Success (200):
```json
{
  "id": 10,
  "firstname": "Alice",
  "lastname": "Rider",
  "email": "captain@example.com",
  "status": "active",
  "vehiclecolor": "red",
  "vehicleplate": "ABC-123",
  "vehiclecapacity": 4,
  "vehicletype": "sedan",
  "latitude": 12.34567,
  "longitude": 76.54321
}
```

Errors:
- 401 — no token / invalid token
- 404 — captain not found
- 500 — server error

---

Implementation notes
- Users controller: controllers/auth.controller.js
- Captains controller: controllers/captainAuth.controller.js
- Middleware: middleware/protectRoute.js (protectRoute, captainProtectRoute)
- Token helper: