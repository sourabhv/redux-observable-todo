const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Router } = require("express");

const todosRef = admin.firestore().collection("todos");
const router = new Router();

router.get("/", async (req, res) => {
  const todos = (await todosRef.get()).docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  res.status(200).send({ todos });
});

router.post("/", async (req, res) => {
  const doc = todosRef.doc();
  const data = {
    text: req.body.text,
    completed: !!req.body.completed || false
  };
  await doc.set(data);

  res.status(200).send({
    id: doc.id,
    ...data
  });
});

router.post("/:id/complete", async (req, res) => {
  const id = req.params.id;
  await todosRef.doc(id).update({ completed: true });
  res.status(200).send();
});

module.exports = router;
