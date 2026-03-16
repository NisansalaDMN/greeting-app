const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const { exec } = require("child_process");

let userName = "";

const server = http.createServer((req, res) => {

    // Home page
    if (req.method === "GET" && req.url === "/") {
        fs.readFile("index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    // Handle POST request
    else if (req.method === "POST" && req.url === "/submit") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const parsedData = querystring.parse(body);
            userName = parsedData.username;

            // Redirect to greeting page
            res.writeHead(302, { Location: "/greeting" });
            res.end();
        });
    }

    // Greeting page
    else if (req.method === "GET" && req.url === "/greeting") {

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Hello, ${userName}!</h1><a href="/">Go Back</a>`);

    }

    else {
        res.writeHead(404);
        res.end("Page Not Found");
    }

});

server.listen(3000, () => {

    console.log("Server running at http://localhost:3000");

    // Open default browser automatically
    exec("start http://localhost:3000");

});