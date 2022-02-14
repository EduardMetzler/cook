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

router.get("/one-recipe/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe0.find({ _id: req.params.id });

    if (recipe[0].ownerId == req.user.userId) {
      res.json(recipe[0]);
    } else {
      res.status(500).json({ message: "Private" });
    }
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.delete("/one-recipe-delete/:id", auth, async (req, res) => {
  try {
    Recipe0.findOneAndRemove(
      {
        _id: req.params.id,
      },
      (err, book) => {
        if (err) {
          res.send("error removing");
        } else {
          res.status(204);
        }
      }
    );

    res.json({ message: "deleted" });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.put("/one-recipe-update/:id", auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    const recipe = await Recipe0.findById(req.params.id);

    recipe.name = name;
    recipe.description = description;

    console.log(recipe);

    Recipe0.findByIdAndUpdate(req.params.id, recipe, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
      }
    });
    res.json({ message: "Updated" });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

module.exports = router;
