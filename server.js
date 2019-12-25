const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();
const mongo_url = "mongodb://localhost:27017";
const dataBase = "Rest-api";

app.use(bodyParser.json());

MongoClient.connect(mongo_url, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, "data base connexion failed");

  const db = client.db(dataBase);

  // app.get("/", (req, res) => {
  //   res.send("this is backend");
  // });

  app.post("/add_contact", (req, res) => {
    const newContact = req.body;

    db.collection("contactlist").insertOne(newContact, (err, data) => {
      if (err) res.send("error");
      else res.send("data is added");
    });
  });

  app.get("/getcontacts", (req, res) => {
    db.collection("contactlist")
      .find()
      .toArray((err, data) => {
        if (err) res.send("can't fetch ontact");
        else res.send(data);
      });
  });

  app.get("getoneContact/:id", (req, res) => {
    let searchContact = ObjectID(req.params.id);
    db.collection("contactlist").findOne(
      { _id: searchContact },
      (err, data) => {
        if (err) res.send("can't fetch contact");
        else res.send(data);
      }
    );
  });

  app.put("/modifyContact/:id", (req, res) => {
    let idContact = ObjectID(req.params.id);

    let modifiedContact = req.body;

    db.collection("contactlist").findOneAndUpdate(
      { _id: idContact },
      { $set: { ...modifiedContact } },
      (err, data) => {
        if (err) res.send("can't modify contact");
        else res.send("contact was modified");
      }
    );
  });
  app.delete("/delete_contact/:id", (req, res) => {
    let contactToremove = ObjectID(req.params.id);
    db.collection("contactlist").findOneAndDelete(
      { _id: contactToremove },
      (err, data) => {
        if (err) res.send("can't delete contact");
        else res.send("contact was deleted");
      }
    );
  });
});

app.listen(5000, err => {
  if (err) {
    console.log("server is not runnig");
  } else {
    console.log("server is runnig on port 5000");
  }
});
