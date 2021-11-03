const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const connect = require("./models");
connect();
const infoRouter = require("./router/info");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/health", async (req, res) => {
    console.log("health check");
    res.send({ message: "ok" });
});

app.use("/api/v1", [infoRouter]);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
