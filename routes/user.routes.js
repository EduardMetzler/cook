const { Router } = require("express");
const User = require("../models/User");
const Recipe0 = require("../models/Recipe");

const auth = require("../middleware/auth.middleware");

const router = Router();

router.get("/get-user-data", auth, async (req, res) => {
  try {
    const user = await User.find({ _id: req.user.userId });
    const recipesArray = await Recipe0.find({ ownerId: req.user.userId });

    res.json({
      persone: user[0].persone,
      role: user[0].role,
      recipesArray: recipesArray,
    });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.post("/new-recipe-create", auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    const recipe = new Recipe0({
      ownerId: req.user.userId,
      name,
      description,
    });

    await recipe.save();

    res.json({ message: "ok" });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.get("/one-recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipe0.find({ _id: req.params.id });

    res.json(recipe[0]);
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.delete("/one-recipe-delete/:id", async (req, res) => {
  try {



    Recipe0.findOneAndRemove({
      _id: req.params.id
     }, (err, book) => {
      if(err) {
       res.send('error removing')
      } else {

       res.status(204);
     }
    })



    res.json({ message: "deleted"  });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

module.exports = router;
