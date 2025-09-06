# Todo App Server

A simple Node.js server for managing a todo list using the built-in `http`, `fs`, and `path` modules. This project demonstrates how to build a RESTful API without any external frameworks, storing data in a local JSON file.

## Features

-   View all todos
-   Add a new todo
-   Get a todo by ID
-   Update a todo by ID
-   Delete a todo by ID

## Project Structure

```
todoAppServer/
├── app.js           # Main server file
├── db/
│   └── todo.json    # Local JSON database for todos
├── readme.md        # Project documentation
```

## Getting Started

### Prerequisites

-   Node.js installed on your system

### Running the Server

1. Open a terminal and navigate to the `todoAppServer` directory.
2. Run the following command:

    ```sh
    node app.js
    ```

3. The server will start on [http://localhost:3000](http://localhost:3000)

## API Endpoints

### 1. Root

-   **GET /**
-   **Description:** Check if the server is running.
-   **Response:** `{ "message": "Server is up and running" }`

### 2. Get All Todos

-   **GET /todos**
-   **Description:** Retrieve all todo items.
-   **Response:** Array of todo objects

### 3. Get Todo by ID

-   **GET /todo?id=ID**
-   **Description:** Retrieve a single todo by its ID.
-   **Response:** Todo object or 404 if not found

### 4. Create a New Todo

-   **POST /todos/create-todo**
-   **Description:** Add a new todo item.
-   **Request Body:** JSON object (e.g., `{ "id": 11, "task": "New Task", "completed": false }`)
-   **Response:** Success message

### 5. Update a Todo

-   **PATCH /todos/update-todo?id=ID**
-   **Description:** Update an existing todo by ID.
-   **Request Body:** JSON object with updated fields
-   **Response:** Success message or 404 if not found

### 6. Delete a Todo

-   **DELETE /todos/delete-todo?id=ID**
-   **Description:** Delete a todo by ID.
-   **Response:** Success message or 404 if not found

### 7. Not Found (Fallback)

-   **Any undefined route**
-   **Description:** If a request is made to an undefined route, the server responds with a 404 status and a message.
-   **Response:** `{ "message": "Route not found" }`

## Data Format

Each todo item in `db/todo.json` has the following structure:

```json
{
    "id": 1,
    "task": "Buy groceries",
    "completed": false
}
```

## Notes

-   All data is stored locally in `db/todo.json`.
-   This server is for learning/demo purposes and does not implement authentication or advanced error handling.

## Author

-   Written by Jahidul Islam Jihad

---

Feel free to modify and extend this project for your own needs!
