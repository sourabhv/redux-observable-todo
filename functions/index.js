const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const morgan = require("morgan");
const todosRouter = require("./todos");

const app = express();
app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/user", (req, res) => {
  res.status(200).send({
    id: "123",
    username: "John Doe",
    email: "foo@example.com"
  });
});

app.use("/todo", todosRouter);

exports.api = functions.https.onRequest(app);
