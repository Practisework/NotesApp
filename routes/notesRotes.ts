const express: any = require("express");
const Note: any = require("../index");
const router: any = express.Router();

router.get("/", (req: any, res: any) => {
  Note.Note.find()
    .then((notes: any) => {
      res.render("notes", { data: notes });
    })
    .catch((err: any) => {
      res.send(err);
    });
});

router.get("/createNote", (req: any, res: any) => {
  res.render("createNote");
});
router.post("/createNote", (req: any, res: any) => {
  const newNote: any = new Note.Note({
    title: req.body.title,
    body: req.body.noteBody,
  });
  newNote
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err: any) => {
      res.send(err);
    });
});

router.get("/:id", (req: any, res: any) => {
  Note.Note.findById(req.params.id)
    .then((note: any) => {
      res.render("indeNote", { data: note });
    })
    .catch((err: any) => {
      res.send(err);
    });
});
module.exports = router;
