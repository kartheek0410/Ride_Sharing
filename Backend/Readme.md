# Uber Backend API

## Endpoints

## User Routes

### `POST /users/signup`
Registers a new user.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

**Responses:**
- `200 OK`  
  Returns the created user object (without password) and sets a JWT cookie.
- `400 Bad Request`  
  - Password too short  
  - Email already exists
- `500 Internal Server Error`  
  Error in hashing or database.

---

### `POST /users/login`
Authenticates a user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**
- `200 OK`  
  Returns the user object and sets a JWT cookie.
- `400 Bad Request`  
  - User does not exist  
  - Invalid credentials
- `500 Internal Server Error`  
  Error in password comparison or database.

---

### `POST /users/logout`
Logs out the current user.

**Request:**  
No body required.

**Responses:**
- `200 OK`  
  JWT cookie is cleared.  
  ```json
  { "message": "Logged out Succesfully" }
  ```
- `500 Internal Server Error`  
  Error in logout process.

---

### `POST /users/check`
Checks if the user is authenticated.

**Request:**  
Requires a valid JWT cookie.

**Responses:**
- `200 OK`  
  Returns the authenticated user object.
- `401 Unauthorized`  
  No or invalid token.
- `404 Not Found`  
  User not found.
- `500 Internal Server Error`  
  Error in authentication check.

---

See [routes/user.routes.js](routes/user.routes.js) and [controllers/auth.controller.js](controllers/auth.controller.js)