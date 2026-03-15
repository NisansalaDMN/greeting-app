const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

let userName = "";

const server = http.createServer((req, res) => {

    // GET request - show form
    if (req.method === "GET" && req.url === "/") {
        fs.readFile("index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    // POST request - get name
    else if (req.method === "POST" && req.url === "/submit") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const parsedData = querystring.parse(body);
            userName = parsedData.username;

            // redirect to greeting page
            res.writeHead(302, { Location: "/greeting" });
            res.end();
        });
    }

    // GET request - display greeting
    else if (req.method === "GET" && req.url === "/greeting") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Hello, ${userName}!</h1><a href="/">Go Back</a>`);
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
