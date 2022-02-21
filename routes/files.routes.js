const { Router } = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const router = Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/file", auth, upload.single("file"), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.avatar = await `http://localhost:5000/${req.file.filename}`;

    User.findByIdAndUpdate(req.user.userId, user, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
      }
    });

    res.json({ message: "Avatar is changed" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/multifiles",auth, upload.array("files"),async (req, res) => {
  try {

    
    const images = []
    const files = req.files;
        if (Array.isArray(files) && files.length > 0) {
    files.forEach((file)=>{
 
      console.log(file)
        images.push(`http://localhost:5000/${file.filename}`)
    })

    }

    res.json(images);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }

  });

module.exports = router;
