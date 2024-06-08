const express: any = require("express");
const app: any = express();
const bodyParser: any = require("body-parser");
const mongoose: any = require("mongoose");
const notesRotes: any = require("./routes/notesRotes");
const folderRotes: any = require("./routes/folderRoutes");

///mongodb
mongoose.connect("mongodb://localhost:27017/notesDB");

const noteSchema: any = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  inFolderName: { type: String },
  date: { type: Date, default: Date.now() },
});

const folderSchema: any = new mongoose.Schema({
  name: { type: String, unique: true },
});
const Note: any = mongoose.model("Note", noteSchema);
const Folder: any = mongoose.model("Folder", folderSchema);
//// using middle wares
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/notes", notesRotes);
app.use("/folder", folderRotes);

app.get("/", (req: any, res: any) => {
  Folder.find().then((data: any) => {
    res.render("index", { folderData: data });
  });
});
app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
module.exports.Note = Note;
module.exports.Folder = Folder;
