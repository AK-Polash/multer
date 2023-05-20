const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const arr = file.originalname.split(".");

    cb(null, file.fieldname + "-" + uniqueSuffix + "." + arr[arr.length - 1]);
  },
});

const upload = multer({ storage: storage });
const app = express();

app.use("/uploads/", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.listen(8000);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/signup", upload.single("avatar"), (req, res, next) => {
  res.send("http://localhost:8000/" + req.file.path);
});
