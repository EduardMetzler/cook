const { Router } = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const router = Router();


router.get("/get-user-data", auth, async (req, res) => {

  try {
    const user = await User.find({ _id: req.user.userId });


    res.json({persone:user[0].persone,role:user[0].role  });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});



module.exports = router;
