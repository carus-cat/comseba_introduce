import express from "express";

import path, { dirname } from "path";
import fs from "fs";

const _dirname = path.resolve();

const app = express();

app.use(express.static("frontend"));

const port = 8080;

app.get("/", (req, res) => {
  res.sendFile(_dirname + "/frontend/src/html/home.html");
});

app.get("/guest", (req, res) => {
  res.sendFile(_dirname + "/frontend/src/html/guestBook.html");
});

app.get("/comment", (req, res) => {
  const db = JSON.parse(fs.readFileSync("DB.json"));
  res.json(db);
});

app.get("/map", (req, res) => {
  res.sendFile(_dirname + "/frontend/src/html/map.html");
});

app.listen(port, () => {
  console.log(`server is listening at localhost: ${port}`);
});

app.use(express.static("frontend"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/createcomment", (req, res) => {
  const data = req.body;
  console.log(data);

  const db = JSON.parse(fs.readFileSync("DB.json"));

  db.commentList.unshift(data);
  fs.writeFileSync("DB.json", JSON.stringify(db));

  res.json(data);
});

app.delete("/deletecomment", (req, res) => {
  const idx = req.body.idx;
  console.log(idx);

  const db = JSON.parse(fs.readFileSync("DB.json"));

  const newAry = [];
  for (let i = 0; i < db.commentList.length; i++) {
    if (i === parseInt(idx)) continue;
    newAry.push(db.commentList[i]);
  }
  db.commentList = newAry;

  fs.writeFileSync("DB.json", JSON.stringify(db));

  const ret = {
    isDelete: true,
  };
  res.json(ret);
});
