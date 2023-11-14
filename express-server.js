const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h2>Welcome</h2>");
});

app.get("/movies", (req, res) => {
  fs.readFile("./data/db.json", (err, result) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Handle file not found
        res.status(404).send("File not found");
      } else {
        // Handle other errors
        throw err;
      }
    } else {
      res.send(JSON.parse(result));
    }
  });
});

app.get("/movies/:id", (req, res) => {
  console.log(req.params.id);
  fs.readFile("./data/db.json", (err, result) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Handle file not found
        res.status(404).send("File not found");
      } else {
        // Handle other errors
        throw err;
      }
    } else {
      if (req.params.id) {
        const data = JSON.parse(result);
        for (let i = 0; i < data.length; i++) {
          if (req.params.id === data[i]._id) {
            res.send(data[i]);
          }
        }
      }
    }
  });
});

app.listen(PORT, (err) => {
  console.log("server is running on port " + PORT);
});
