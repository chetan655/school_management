# School Management API

## Overview

This is a RESTful API for managing schools, including adding new schools and retrieving a list of schools based on location.

## Features

Add a new school  
Retrieve a list of schools by location  
`Pagination support`

---

---

## Installation & Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/chetan655/school_management
    cd school_management
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file and add the following:

    ```
    PORT=8000
    DB_PORT=3306
    DB_HOST=
    DB_NAME=
    DB_USER=
    DB_PASSWORD=
    ```

4. Create db using Sequelize CLI:

    ```
    cd src
    ```

    ```
    npx sequelize-cli db:create
    ```

5. Run database migrations using Sequelize CLI:

    ```
    npx sequelize-cli db:migrate
    ```

6. Start the server(from root directory):

    ```sh
    npm run dev
    ```

---

## API Endpoints

### 1. Add a School

- **Method:** POST
- **Endpoint:** `/api/v1/addSchool`
- **Description:** Adds a new school to the database.
- **Request Body (JSON):**
    ```json
    {
        "name": "school1",
        "address": "address1",
        "latitude": 22.11,
        "longitude": 32.22
    }
    ```
- **Response:**

    ```json
    {
        "success": true,
        "message": "School created successfully.",
        "data": {
            "id": 20,
            "name": "school1",
            "address": "taddress1",
            "longitude": 33.47,
            "latitude": 22.99,
            "updatedAt": "2025-03-13T06:38:55.986Z",
            "createdAt": "2025-03-13T06:38:55.986Z"
        }
    }
    ```

### 2. List Schools by Location

- **Method:** GET
- **Endpoint:** `/api/v1/listSchools?latitude={lat}&longitude={long}&page={page}`
- **Description:** Retrieves a paginated list of schools based on location.
- **Example Request:**
    ```sh
    GET https://school-management-gemg.onrender.com/api/v1/listSchools?latitude=22.11&longitude=32.22&page=1
    ```
- **Sample Response:**
    ```json
    {
        "success": true,
        "message": "Schools found.",
        "data": [
            {
                "id": 1,
                "name": "school1",
                "address": "address1",
                "longitude": 33.33,
                "latitude": 22.22,
                "distance": 114.95777207117416
            }
        ]
    }
    ```
