const express: any = require("express");
const Folder: any = require("../index.ts");
const router: any = express.Router();

router.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});
router.get("/new", (req: any, res: any) => {
  res.render("newFolder");
});

router.post("/new", (req: any, res: any) => {
  const newFolder: any = new Folder.Folder({ name: req.body.name });
  newFolder.save().then(() => {
    res.redirect("/");
  });
});
router.get("/:folderId", (req: any, res: any) => {
  Folder.Note.find({ inFolderName: req.params.folderId }).then((data: any) => {
    res.render("InFolder", { data: data });
  });
});
module.exports = router;
