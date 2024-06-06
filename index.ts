const express: any = require("express");
const app: any = express();
const bodyParser: any = require("body-parser");
const mongoose: any = require("mongoose");
const notesRotes: any = require("./routes/notesRotes");

///mongodb
mongoose.connect("mongodb://localhost:27017/notesDB");

const noteSchema: any = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  date: { type: Date, default: Date.now() },
});

const Note: any = mongoose.model("Note", noteSchema);

//// using middle wares
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/notes", notesRotes);

app.get("/", (req: any, res: any) => {
  res.render("index");
});
app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
module.exports.Note = Note;
