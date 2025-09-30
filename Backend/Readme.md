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
```markdown
```

---

## Rides Routes

All rides endpoints are mounted under `/rides` (see `routes/rides.routes.js`). These endpoints require an authenticated user or captain as noted.

### POST /rides/create
Create a new ride request (user-protected).

Request body:
```json
{
  "pickup": "221B Baker Street, London",
  "destination": "10 Downing St, London",
  "vehicleType": "car",
  "fare": 120
  ..
}
```

Success (200): returns the created ride object (OTP included server-side but not exposed to captains when broadcasting).
```json
{
  "id": 42,
  "userid": 1,
  "pickup": "221B Baker Street, London",
  "destination": "10 Downing St, London",
  "fare": 120,
  "status": "pending",
  "otp": null,
  "created_at": "2025-09-01T12:00:00.000Z"
}
```

Broadcast behaviour: server finds captains within a radius of the pickup coordinates and sends a socket event `new-ride` to each captain with ride + user info.

Errors:
- 400 — missing fields
  ```json
  { "Error": "All Fields are required" }
  ```
- 404 / 500 — geocoding, DB, or other server errors

---

### POST /rides/confirm
Accept a ride (captain action).

Request body:
```json
{
  "rideid": 42,
  "captainid": 10
}
```

Success (200): returns the updated ride record with captain assigned.
```json
{
  "id": 42,
  "userid": 1,
  "captainid": 10,
  "status": "accepted",
  "vehicletype": "sedan",
  "pickup": "221B Baker Street, London",
  "destination": "10 Downing St, London"
}
```

Side effect: server emits socket event `ride-confirmed` to the user containing ride + captain info.

Errors:
- 404 — captain not found, ride not found, or user not found

---

### POST /rides/start-ride
Mark an accepted ride as started (captain action). Requires ride object and OTP verification.

Request body:
```json
{
  "ride": { "id": 42, "userinfo": { "socketid": "user-socket-id" }, "otp": 123456 },
  "otp": "123456"

}
```

Success (200): returns the ride object and notifies the user via socket `ride-started`.
```json
{
  "id": 42,
  "status": "ongoing",
  "userid": 1,
  "captainid": 10
  ...
}
```

Errors:
- 400 — missing ride or OTP, incorrect OTP
- 404 — ride not found

---

### POST /rides/end-ride
Complete an ongoing ride (captain action).

Request body:
```json
{
  "rideid": 42,
  "ride": { "userinfo": { "socketid": "user-socket-id" } }
  ...
}
```

Success (200): returns the completed ride object and emits `ride-ended` to the user.
```json
{
  "id": 42,
  "status": "completed",
  "userid": 1,
  "captainid": 10,
  "fare": 120
}
```

Errors:
- 400 — ride not ongoing or missing data
- 403 — not authorized to end the ride (captain mismatch)
- 404 — ride not found

---

## Maps Routes

All map endpoints are mounted under `/maps` (see `routes/maps.routes.js`). These endpoints use the OLA Maps APIs via the server.

### POST /maps/getCoordinates
Geocode an address into latitude/longitude.

Request body:
```json
{
  "address": "221B Baker Street, London"
}
```

Success (200): returns coordinates (the controller returns an object with latitude and longitude).
```json
{
  "latitude": 51.523767,
  "longitude": -0.1585557
}
```

Errors:
- 400 — missing address
- 404 — no geocoding results
- 500 — external API or server error

---

### POST /maps/getFare
Estimate fare between two coordinates. Request body expects Lat1, Lng1, Lat2, Lng2.

Request body:
```json
{
  "Lat1": 51.523767,
  "Lng1": -0.1585557,
  "Lat2": 51.507351,
  "Lng2": -0.127758
}
```

Success (200): returns fare estimates per vehicle type.
```json
{
  "auto": 85,
  "car": 120,
  "moto": 60
}
```

Errors:
- 500 — failed to fetch routing/distance data from OLA Maps or server error

---

### POST /maps/getSuggestions
Autocomplete place suggestions.

Request body:
```json
{
  "input": "Baker St"
}
```

Success (200): returns suggestions array with display names and coordinates.
```json
{
  "suggestions": [
    {
      "display_name": "Baker Street, Marylebone, London, UK",
      "latitude": 51.523767,
      "longitude": -0.1585557
    },
    {
      "display_name": "Baker Street Station, London, UK",
      "latitude": 51.5226,
      "longitude": -0.1570
    }
  ]
}
```

Errors:
- 400 — missing input
- 404 — no suggestions found
- 500 — external API or server error

---

## Payment Routes

All payment endpoints are mounted under `/api/payments`. These endpoints handle Stripe payment integration for ride payments.

### POST /api/payments/create-checkout-session
Create a new Stripe checkout session for ride payment.

Request body:
```json
{
  "amount": number,       // Payment amount
  "currency": "string",   // Currency code (e.g., "usd")
  "transport": "string",  // Type of transport
  "rideId": "string"     // ID of the ride being paid for
}
```

Success (200):
```json
{
  "id": "cs_test_..." // Stripe checkout session ID
}
```

The success URL will include the transaction ID: `<CLIENT_URL>/payment-status?status=success&transaction_id={CHECKOUT_SESSION_ID}`
The cancel URL: `<CLIENT_URL>/payment-status?status=failed`

Errors:
- 500 — Stripe session creation failed
```json
{ "error": "Failed to create Stripe checkout session." }
```

### POST /api/payments/payment-confirm
Confirm a completed payment and update ride status.

Request body:
```json
{
  "transactionId": "cs_test_...", // Stripe checkout session ID
  "ride": {
    "id": "string",      // Ride ID
    "captaininfo": {     // Captain information
      "socketid": "string"
    },
    "userid": {          // User information
      "socketid": "string"
    }
  }
}
```

Success (200):
```json
{
  "message": "Payment confirmed and ride updated.",
  "ride": {
    // Updated ride object with payment information
    "id": "string",
    "paymentid": "string",
    "orderid": "string",
    "status": "completed"
    // ... other ride details
  }
}
```

Socket Events:
- Emits `ride-ended` event to both captain and user with the updated ride details

Errors:
- 400 — Missing required information
```json
{ "error": "Missing or invalid transactionId or ride information." }
```
- 500 — Payment confirmation failed
```json
{ "error": "Payment confirmation failed." }
```

## Where to look in the code
- Users: `controllers/auth.controller.js`
- Captains: `controllers/captainAuth.controller.js`
- Rides: `controllers/rides.controller.js`
- Maps: `controllers/map.controller.js`
- Payments: `controllers/payment.controller.js`
- Routes: `routes/*.js`
- Middleware: `middleware/protectRoute.js`

---
Completion: updated the README with Rides, Maps, and Payment endpoints and example requests/responses.