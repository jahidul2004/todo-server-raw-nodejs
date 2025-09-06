//Import http module

const http = require("http");

//Import path module
const path = require("path");

//Import fs module
const fs = require("fs");

//File path
const filePath = path.join(__dirname, "./db/todo.json");

//Creating server
const server = http.createServer((req, res) => {
    //Getting the url and method from request object
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathName = url.pathname;

    //Root route
    if (pathName === "/" && req.method === "GET") {
        //Set response header
        res.writeHead(200, {
            "content-type": "application/json",
        });

        //Send response
        res.end('{"message": "Server is up and running"}');
    }

    //Get all todos route
    else if (pathName === "/todos" && req.method === "GET") {
        //Read data from local db
        const data = fs.readFileSync(filePath, {
            encoding: "utf-8",
        });

        //Set response header
        res.writeHead(200, {
            "content-type": "application/json",
        });

        //Send response
        res.end(data);
    }

    //Add new todo route
    else if (pathName === "/todos/create-todo" && req.method === "POST") {
        //Set response header
        res.writeHead(201, {
            "content-type": "application/json",
        });

        //Collect request data
        let data = "";

        //Adding event listeners to request object
        req.on("data", (chunk) => {
            data = data + chunk.toString();
        });

        //When request ends
        req.on("end", () => {
            const todo = JSON.parse(data);

            //Read existing todos from local db
            const allTodos = JSON.parse(
                fs.readFileSync(filePath, {
                    encoding: "utf-8",
                })
            );

            //Push new todo to existing todos
            allTodos.push(todo);

            //Write updated todos to local db
            fs.writeFileSync(filePath, JSON.stringify(allTodos));

            //Send response
            res.end(JSON.stringify({ message: "Todo added successfully" }));
        });
    }

    //Get todo by id route
    else if (pathName === "/todo" && req.method === "GET") {
        //Get id from query params
        const id = url.searchParams.get("id");

        //Read existing todos from local db
        const allTodos = JSON.parse(
            fs.readFileSync(filePath, {
                encoding: "utf-8",
            })
        );

        //Find todo by id
        const todo = allTodos.find((t) => t.id === Number(id));

        //If todo not found
        if (!todo) {
            res.writeHead(404, {
                "content-type": "application/json",
            });
            res.end(JSON.stringify({ message: "Todo not found" }));
        } else {
            res.writeHead(200, {
                "content-type": "application/json",
            });
            res.end(JSON.stringify(todo));
        }
    }

    //Update todo by id route
    else if (pathName === "/todos/update-todo" && req.method === "PATCH") {
        const id = url.searchParams.get("id");

        let data = "";

        //Collect request data
        req.on("data", (chunk) => {
            data = data + chunk.toString();
        });

        //When request ends
        req.on("end", () => {
            const updatedTodo = JSON.parse(data);

            //Read existing todos from local db
            const allTodos = JSON.parse(
                fs.readFileSync(filePath, { encoding: "utf-8" })
            );

            //Find todo index by id
            const todoIndex = allTodos.findIndex((t) => t.id === Number(id));

            //If todo not found
            if (todoIndex === -1) {
                res.writeHead(404, {
                    "content-type": "application/json",
                });
                res.end(JSON.stringify({ message: "Todo not found" }));
            } else {
                //Update todo
                allTodos[todoIndex] = {
                    ...allTodos[todoIndex],
                    ...updatedTodo,
                };

                //Write updated todos to local db
                fs.writeFileSync(filePath, JSON.stringify(allTodos));

                //Send response
                res.writeHead(200, {
                    "content-type": "application/json",
                });
                res.end(
                    JSON.stringify({ message: "Todo updated successfully" })
                );
            }
        });
    }

    //Delete todo by id route
    else if (pathName === "/todos/delete-todo" && req.method === "DELETE") {
        const id = url.searchParams.get("id");

        //Read existing todos from local db
        const allTodos = JSON.parse(
            fs.readFileSync(filePath, { encoding: "utf-8" })
        );

        //Find todo index by id
        const todoIndex = allTodos.findIndex((t) => t.id === Number(id));

        //If todo not found
        if (todoIndex === -1) {
            res.writeHead(404, {
                "content-type": "application/json",
            });
            res.end(JSON.stringify({ message: "Todo not found" }));
        } else {
            //Remove todo from array
            allTodos.splice(todoIndex, 1);

            //Write updated todos to local db
            fs.writeFileSync(filePath, JSON.stringify(allTodos));

            //Send response
            res.writeHead(200, {
                "content-type": "application/json",
            });
            res.end(JSON.stringify({ message: "Todo deleted successfully" }));
        }
    }

    //If route not found
    else {
        res.writeHead(404, {
            "content-type": "application/json",
        });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

//Listening to server
server.listen(3000, () => {
    console.log("Server is listening on port 3000...");
});
