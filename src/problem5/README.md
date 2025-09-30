# ExpressJS CRUD with TypeScript and Docker

This project provides a backend server built with Express.js and TypeScript. It exposes a set of CRUD (Create, Read, Update, Delete) endpoints to interact with a "resource" and uses a PostgreSQL database for data persistence. The entire application is containerized using Docker for easy setup and deployment.

## Prerequisites

*   Docker
*   Docker Compose

## Getting Started

1.  **Create a `.env` file** in the root of the project and add the following environment variables:

    ```
    PORT=3000
    DB_HOST=db
    DB_PORT=5432
    DB_USER=user
    DB_PASSWORD=password
    DB_DATABASE=express_ts_db
    ```

3.  **Build and run the application using Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker images for the Express.js application and the PostgreSQL database and then start the containers. The server will be accessible at `http://localhost:3000`.

## API Endpoints

The following endpoints are available to interact with the service:

### Resource

*   **`POST /api/resources`**: Create a new resource.
    *   **Request Body:**
        ```json
        {
          "name": "My Resource",
          "description": "This is a description of my resource."
        }
        ```
    *   **Response:**
        ```json
        {
          "id": 1,
          "name": "My Resource",
          "description": "This is a description of my resource.",
          "createdAt": "2025-09-27T20:00:00.000Z"
        }
        ```

*   **`GET /api/resources`**: List all resources with optional filtering.
    *   **Query Parameters:**
        *   `name` (optional): Filter resources by name.
    *   **Example Request:** `GET /api/resources?name=My`
    *   **Response:**
        ```json
        [
          {
            "id": 1,
            "name": "My Resource",
            "description": "This is a description of my resource.",
            "createdAt": "2025-09-27T20:00:00.000Z"
          }
        ]
        ```

*   **`GET /api/resources/:id`**: Get the details of a specific resource.
    *   **Example Request:** `GET /api/resources/1`
    *   **Response:**
        ```json
        {
          "id": 1,
          "name": "My Resource",
          "description": "This is a description of my resource.",
          "createdAt": "2025-09-27T20:00:00.000Z"
        }
        ```

*   **`PUT /api/resources/:id`**: Update the details of a specific resource.
    *   **Request Body:**
        ```json
        {
          "name": "Updated Resource Name",
          "description": "Updated description."
        }
        ```
    *   **Response:**
        ```json
        {
          "id": 1,
          "name": "Updated Resource Name",
          "description": "Updated description.",
          "createdAt": "2025-09-27T20:00:00.000Z"
        }
        ```

*   **`DELETE /api/resources/:id`**: Delete a specific resource.
    *   **Response:** `204 No Content`

## Project Structure

```
.
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── env.example
└── src
    ├── app.ts
    ├── routes
    │   └── resourceRoutes.ts
    ├── controllers
    │   └── resourceController.ts
    ├── services
    │   └── resourceService.ts
    ├── models
    │   └── resourceModel.ts
    └── config
        └── db.ts
```

## Development

To run the application in development mode:

1. Copy `env.example` to `.env` and update the values if needed
2. Install dependencies: `npm install`
3. Run in development mode: `npm run dev`

## Testing the API

You can test the API endpoints using tools like Postman, curl, or any HTTP client:

### Create a resource
```bash
curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Resource", "description": "A test resource"}'
```

### Get all resources
```bash
curl http://localhost:3000/api/resources
```

### Get a specific resource
```bash
curl http://localhost:3000/api/resources/1
```

### Update a resource
```bash
curl -X PUT http://localhost:3000/api/resources/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Resource", "description": "Updated description"}'
```

### Delete a resource
```bash
curl -X DELETE http://localhost:3000/api/resources/1
```
